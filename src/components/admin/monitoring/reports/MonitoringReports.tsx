import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileDown, Filter, LineChart, AlertTriangle, Clock } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface MonitoringReportsProps {}

type ReportType = "summary" | "detailed" | "technical";

interface ReportData {
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

export const MonitoringReports: React.FC<MonitoringReportsProps> = () => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState<string>("pdf");
  const [reportType, setReportType] = useState<ReportType>("summary");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulação de dados do monitoramento
  const monitoringData: ReportData[] = [
    {
      id: "1",
      type: "site",
      name: "Portal Principal",
      metrics: {
        uptime: 99.8,
        responseTime: 245,
        errorRate: 0.2,
        availability: 99.9,
        successRate: 99.7
      },
      alerts: {
        critical: 0,
        warning: 2,
        info: 5
      },
      performance: {
        cpu: 45,
        memory: 60,
        disk: 30
      },
      content: {
        totalItems: 1250,
        newItems: 25,
        sentiment: 0.8
      }
    },
    // Adicione mais dados conforme necessário
  ];

  const sources = [
    { id: "1", name: "Portal Principal", type: "site" },
    { id: "2", name: "API de Pagamentos", type: "api" },
    { id: "3", name: "Redes Sociais", type: "social" },
    { id: "4", name: "Blog Corporativo", type: "site" },
  ];

  const metrics = [
    { id: "performance", name: "Performance", items: ["cpu", "memory", "disk"] },
    { id: "availability", name: "Disponibilidade", items: ["uptime", "errorRate"] },
    { id: "content", name: "Conteúdo", items: ["totalItems", "sentiment"] },
    { id: "alerts", name: "Alertas", items: ["critical", "warning", "info"] }
  ];

  const reportTypes = [
    { value: "summary", label: "Resumo Executivo" },
    { value: "detailed", label: "Relatório Detalhado" },
    { value: "technical", label: "Relatório Técnico" }
  ];

  const exportFormats = [
    { value: "pdf", label: "PDF" },
    { value: "excel", label: "Excel" },
    { value: "json", label: "JSON" }
  ];

  useEffect(() => {
    if (isGenerating) {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setIsGenerating(false);
            return 100;
          }
          return prev + 10;
        });
      }, 500);
      return () => clearInterval(timer);
    }
  }, [isGenerating]);

  const validateExport = () => {
    if (!date?.from || !date?.to) {
      toast({
        title: "Erro",
        description: "Selecione um período para gerar o relatório",
        variant: "destructive"
      });
      return false;
    }

    if (selectedSources.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma fonte para o relatório",
        variant: "destructive"
      });
      return false;
    }

    if (selectedMetrics.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma métrica para o relatório",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleExport = async () => {
    if (!validateExport()) return;

    setIsGenerating(true);
    setProgress(0);

    try {
      // Simula processamento dos dados
      await new Promise(resolve => setTimeout(resolve, 3000));

      const reportConfig = {
        dateRange: date,
        sources: selectedSources,
        metrics: selectedMetrics,
        format: exportFormat,
        type: reportType
      };

      console.log("Configuração do relatório:", reportConfig);

      // Aqui você chamaria a API para gerar o relatório
      toast({
        title: "Sucesso",
        description: "Relatório gerado com sucesso!"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao gerar relatório. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      setProgress(100);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Relatórios de Monitoramento</h2>
        <p className="text-muted-foreground">
          Gere relatórios técnicos detalhados dos seus monitoramentos
        </p>
      </div>

      <Tabs defaultValue="config" className="space-y-4">
        <TabsList>
          <TabsTrigger value="config">Configuração</TabsTrigger>
          <TabsTrigger value="preview">Pré-visualização</TabsTrigger>
        </TabsList>

        <TabsContent value="config" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Período e Tipo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <DatePickerWithRange date={date} setDate={setDate} />
                <Select value={reportType} onValueChange={(value: ReportType) => setReportType(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de relatório" />
                  </SelectTrigger>
                  <SelectContent>
                    {reportTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Formato de Exportação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select value={exportFormat} onValueChange={setExportFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o formato" />
                  </SelectTrigger>
                  <SelectContent>
                    {exportFormats.map((format) => (
                      <SelectItem key={format.value} value={format.value}>
                        {format.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {isGenerating && (
                  <div className="space-y-2">
                    <Progress value={progress} />
                    <p className="text-sm text-muted-foreground">
                      Gerando relatório... {progress}%
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Fontes Monitoradas</CardTitle>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar por Tipo
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(sources.reduce((acc, source) => ({
                    ...acc,
                    [source.type]: [...(acc[source.type] || []), source]
                  }), {} as Record<string, typeof sources>)).map(([type, items]) => (
                    <div key={type} className="space-y-2">
                      <h4 className="font-medium capitalize">{type}</h4>
                      <div className="flex flex-wrap gap-2">
                        {items.map((source) => (
                          <Badge
                            key={source.id}
                            variant={selectedSources.includes(source.id) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedSources((prev) =>
                                prev.includes(source.id)
                                  ? prev.filter((id) => id !== source.id)
                                  : [...prev, source.id]
                              );
                            }}
                          >
                            {source.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Métricas e Indicadores</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Grupo</TableHead>
                      <TableHead>Métricas Incluídas</TableHead>
                      <TableHead className="w-24">Incluir</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {metrics.map((metric) => (
                      <TableRow key={metric.id}>
                        <TableCell className="font-medium">{metric.name}</TableCell>
                        <TableCell>{metric.items.join(", ")}</TableCell>
                        <TableCell>
                          <Badge
                            variant={selectedMetrics.includes(metric.id) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedMetrics((prev) =>
                                prev.includes(metric.id)
                                  ? prev.filter((id) => id !== metric.id)
                                  : [...prev, metric.id]
                              );
                            }}
                          >
                            {selectedMetrics.includes(metric.id) ? "Selecionada" : "Selecionar"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              onClick={handleExport}
              disabled={isGenerating}
              className="gap-2"
            >
              <FileDown className="h-4 w-4" />
              {isGenerating ? "Gerando..." : "Gerar Relatório"}
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pré-visualização do Relatório</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {selectedSources.length > 0 ? (
                  selectedSources.map(sourceId => {
                    const source = sources.find(s => s.id === sourceId);
                    const data = monitoringData.find(d => d.id === sourceId);
                    
                    if (!source || !data) return null;

                    return (
                      <div key={sourceId} className="space-y-4">
                        <h3 className="text-lg font-medium">{source.name}</h3>
                        
                        {selectedMetrics.includes("performance") && (
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <LineChart className="h-4 w-4" />
                              Performance
                            </h4>
                            <div className="grid gap-4 md:grid-cols-3">
                              <div>
                                <p className="text-sm text-muted-foreground">CPU</p>
                                <Progress value={data.performance.cpu} className="mt-2" />
                                <p className="text-sm mt-1">{data.performance.cpu}%</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Memória</p>
                                <Progress value={data.performance.memory} className="mt-2" />
                                <p className="text-sm mt-1">{data.performance.memory}%</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Disco</p>
                                <Progress value={data.performance.disk} className="mt-2" />
                                <p className="text-sm mt-1">{data.performance.disk}%</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {selectedMetrics.includes("alerts") && (
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <AlertTriangle className="h-4 w-4" />
                              Alertas
                            </h4>
                            <div className="flex gap-4">
                              <Badge variant="destructive">
                                {data.alerts.critical} Críticos
                              </Badge>
                              <Badge variant="warning">
                                {data.alerts.warning} Avisos
                              </Badge>
                              <Badge variant="secondary">
                                {data.alerts.info} Informativos
                              </Badge>
                            </div>
                          </div>
                        )}

                        {selectedMetrics.includes("availability") && (
                          <div className="space-y-2">
                            <h4 className="font-medium flex items-center gap-2">
                              <Clock className="h-4 w-4" />
                              Disponibilidade
                            </h4>
                            <div className="grid gap-4 md:grid-cols-2">
                              <div>
                                <p className="text-sm text-muted-foreground">Uptime</p>
                                <Progress value={data.metrics.uptime} className="mt-2" />
                                <p className="text-sm mt-1">{data.metrics.uptime}%</p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">Taxa de Erro</p>
                                <Progress value={data.metrics.errorRate * 100} className="mt-2" />
                                <p className="text-sm mt-1">{data.metrics.errorRate}%</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Selecione fontes e métricas para visualizar o relatório
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
