
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileDown, Filter } from "lucide-react";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface MonitoringReportsProps {}

export const MonitoringReports: React.FC<MonitoringReportsProps> = () => {
  const [date, setDate] = useState<DateRange | undefined>();
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [exportFormat, setExportFormat] = useState<string>("pdf");

  const sources = [
    { id: "1", name: "Portal de Notícias" },
    { id: "2", name: "Blog Corporativo" },
    { id: "3", name: "Redes Sociais" },
    // Fontes dinâmicas carregadas da API
  ];

  const metrics = [
    { id: "uptime", name: "Uptime", description: "Tempo de atividade do serviço" },
    { id: "response_time", name: "Tempo de Resposta", description: "Latência média" },
    { id: "error_rate", name: "Taxa de Erro", description: "Percentual de falhas" },
    { id: "availability", name: "Disponibilidade", description: "Percentual de tempo online" },
    { id: "success_rate", name: "Taxa de Sucesso", description: "Percentual de requisições bem-sucedidas" }
  ];

  const exportFormats = [
    { value: "pdf", label: "PDF" },
    { value: "excel", label: "Excel" },
    { value: "csv", label: "CSV" },
    { value: "json", label: "JSON" }
  ];

  const handleExport = async () => {
    if (!date?.from || !date?.to) {
      toast("Erro: Selecione um período para gerar o relatório", {
        description: "É necessário definir um intervalo de datas.",
        action: {
          label: "OK",
          onClick: () => console.log("Fechado")
        }
      });
      return;
    }

    if (selectedSources.length === 0) {
      toast("Erro: Selecione ao menos uma fonte", {
        description: "É necessário selecionar pelo menos uma fonte para o relatório.",
        action: {
          label: "OK",
          onClick: () => console.log("Fechado")
        }
      });
      return;
    }

    if (selectedMetrics.length === 0) {
      toast("Erro: Selecione ao menos uma métrica", {
        description: "É necessário selecionar pelo menos uma métrica para o relatório.",
        action: {
          label: "OK",
          onClick: () => console.log("Fechado")
        }
      });
      return;
    }

    try {
      // Aqui você faria a chamada para a API
      console.log("Exportando relatório:", {
        dateRange: date,
        sources: selectedSources,
        metrics: selectedMetrics,
        format: exportFormat
      });

      toast("Relatório gerado com sucesso!", {
        description: "O relatório foi gerado e está disponível para download."
      });
    } catch (error) {
      toast("Erro ao gerar relatório", {
        description: "Ocorreu um erro ao gerar o relatório. Tente novamente mais tarde.",
        action: {
          label: "OK",
          onClick: () => console.log("Fechado")
        }
      });
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

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Período do Relatório</CardTitle>
          </CardHeader>
          <CardContent>
            <DatePickerWithRange date={date} setDate={setDate} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Formato de Exportação</CardTitle>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Fontes Monitoradas</CardTitle>
            <Button variant="outline" size="sm">
              <Filter className="mr-2 h-4 w-4" />
              Filtrar
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {sources.map((source) => (
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
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Métricas Disponíveis</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Métrica</TableHead>
                  <TableHead>Descrição</TableHead>
                  <TableHead className="w-24">Incluir</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {metrics.map((metric) => (
                  <TableRow key={metric.id}>
                    <TableCell>{metric.name}</TableCell>
                    <TableCell>{metric.description}</TableCell>
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

      <div className="flex justify-end">
        <Button onClick={handleExport}>
          <FileDown className="mr-2 h-4 w-4" />
          Gerar Relatório
        </Button>
      </div>
    </div>
  );
}
