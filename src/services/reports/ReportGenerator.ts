import puppeteer from 'puppeteer';
import { DateRange } from "react-day-picker";

export interface ReportConfig {
  dateRange: DateRange;
  sources: string[];
  metrics: string[];
  format: string;
  type: 'summary' | 'detailed' | 'technical';
}

export interface ReportData {
  id: string;
  type: string;
  name: string;
  metrics: {
    uptime: number;
    responseTime: number;
    errorRate: number;
    availability: number;
    successRate: number;
  };
  alerts: {
    critical: number;
    warning: number;
    info: number;
  };
  performance: {
    cpu: number;
    memory: number;
    disk: number;
  };
  content: {
    totalItems: number;
    newItems: number;
    sentiment: number;
  };
}

export class ReportGenerator {
  private async generateHTML(data: ReportData[], config: ReportConfig): Promise<string> {
    const title = this.getReportTitle(config.type);
    const styles = this.getStyles();
    const content = this.generateContent(data, config);

    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>${title}</title>
          <style>${styles}</style>
        </head>
        <body>
          <div class="report">
            <h1>${title}</h1>
            <div class="report-info">
              <p>Período: ${config.dateRange.from?.toLocaleDateString()} a ${config.dateRange.to?.toLocaleDateString()}</p>
              <p>Fontes: ${data.length}</p>
              <p>Métricas: ${config.metrics.join(", ")}</p>
            </div>
            ${content}
          </div>
        </body>
      </html>
    `;
  }

  private getReportTitle(type: string): string {
    switch (type) {
      case 'summary':
        return 'Resumo Executivo de Monitoramento';
      case 'detailed':
        return 'Relatório Detalhado de Monitoramento';
      case 'technical':
        return 'Relatório Técnico de Monitoramento';
      default:
        return 'Relatório de Monitoramento';
    }
  }

  private getStyles(): string {
    return `
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 20px;
      }
      .report {
        max-width: 1200px;
        margin: 0 auto;
      }
      h1 {
        color: #1a365d;
        border-bottom: 2px solid #e2e8f0;
        padding-bottom: 10px;
      }
      .report-info {
        background: #f7fafc;
        padding: 15px;
        border-radius: 8px;
        margin: 20px 0;
      }
      .source {
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        padding: 20px;
        margin: 20px 0;
      }
      .source h2 {
        color: #2d3748;
        margin-top: 0;
      }
      .metrics {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 20px;
        margin-top: 15px;
      }
      .metric {
        background: #fff;
        padding: 15px;
        border-radius: 6px;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      .metric h3 {
        color: #4a5568;
        margin-top: 0;
      }
      .value {
        font-size: 24px;
        font-weight: bold;
        color: #2b6cb0;
      }
      .alert {
        display: inline-block;
        padding: 4px 8px;
        border-radius: 4px;
        margin-right: 8px;
      }
      .alert.critical { background: #fed7d7; color: #c53030; }
      .alert.warning { background: #fefcbf; color: #b7791f; }
      .alert.info { background: #e6fffa; color: #2c7a7b; }
    `;
  }

  private generateContent(data: ReportData[], config: ReportConfig): string {
    return data.map(source => {
      let content = `
        <div class="source">
          <h2>${source.name}</h2>
      `;

      if (config.metrics.includes('performance')) {
        content += `
          <div class="metrics">
            <div class="metric">
              <h3>CPU</h3>
              <div class="value">${source.performance.cpu}%</div>
            </div>
            <div class="metric">
              <h3>Memória</h3>
              <div class="value">${source.performance.memory}%</div>
            </div>
            <div class="metric">
              <h3>Disco</h3>
              <div class="value">${source.performance.disk}%</div>
            </div>
          </div>
        `;
      }

      if (config.metrics.includes('alerts')) {
        content += `
          <div class="metrics">
            <div class="metric">
              <h3>Alertas</h3>
              <div>
                <span class="alert critical">${source.alerts.critical} Críticos</span>
                <span class="alert warning">${source.alerts.warning} Avisos</span>
                <span class="alert info">${source.alerts.info} Info</span>
              </div>
            </div>
          </div>
        `;
      }

      if (config.metrics.includes('availability')) {
        content += `
          <div class="metrics">
            <div class="metric">
              <h3>Uptime</h3>
              <div class="value">${source.metrics.uptime}%</div>
            </div>
            <div class="metric">
              <h3>Taxa de Erro</h3>
              <div class="value">${source.metrics.errorRate}%</div>
            </div>
          </div>
        `;
      }

      content += '</div>';
      return content;
    }).join('');
  }

  public async generatePDF(data: ReportData[], config: ReportConfig): Promise<Buffer> {
    const html = await this.generateHTML(data, config);

    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '20mm',
        right: '20mm',
        bottom: '20mm',
        left: '20mm'
      }
    });

    await browser.close();
    return pdf;
  }

  public generateExcel(data: ReportData[], config: ReportConfig): any {
    // TODO: Implementar exportação para Excel
    throw new Error('Exportação para Excel ainda não implementada');
  }

  public generateJSON(data: ReportData[], config: ReportConfig): string {
    return JSON.stringify({
      config,
      data,
      generatedAt: new Date().toISOString()
    }, null, 2);
  }
}
