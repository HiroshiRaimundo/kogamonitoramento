
import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ClientType } from "@/components/client/ClientTypes";
import { getColorClasses } from "@/components/service/utils/colorUtils";

interface ReleasesSectionProps {
  clientType: ClientType;
}

const ReleasesSection: React.FC<ReleasesSectionProps> = ({ clientType }) => {
  const colorClasses = getColorClasses(clientType);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Criar Novo Release</CardTitle>
          <CardDescription>
            Preencha os dados para criar um novo release para envio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="release-title">Título do Release</Label>
                <Input id="release-title" placeholder="Digite o título do release" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client-name">Cliente</Label>
                <Input id="client-name" defaultValue="Observatório Nacional" readOnly />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Conteúdo</Label>
              <Textarea 
                id="content"
                className="min-h-[200px]" 
                placeholder="Digite o conteúdo do release"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-media">Veículo Alvo</Label>
                <Input id="target-media" placeholder="Ex: G1, Folha de SP" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pub-date">Data de Publicação</Label>
                <Input id="pub-date" type="date" />
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button className={colorClasses.bg}>
                Enviar para Aprovação
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Jornalistas e Veículos</CardTitle>
          <CardDescription>
            Contatos de jornalistas e veículos para distribuição de releases
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto">
            <table className="w-full border-collapse">
              <thead className="bg-muted">
                <tr>
                  <th className="p-2 text-left">Nome</th>
                  <th className="p-2 text-left">Veículo</th>
                  <th className="p-2 text-left">Contato</th>
                  <th className="p-2 text-left">Área</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Ana Silva</td>
                  <td className="p-2">Folha de SP</td>
                  <td className="p-2">ana.silva@folha.com</td>
                  <td className="p-2">Política</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Carlos Santos</td>
                  <td className="p-2">G1</td>
                  <td className="p-2">carlos.santos@g1.com</td>
                  <td className="p-2">Economia</td>
                </tr>
                <tr className="border-b">
                  <td className="p-2">Maria Oliveira</td>
                  <td className="p-2">UOL</td>
                  <td className="p-2">maria.oliveira@uol.com</td>
                  <td className="p-2">Saúde</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReleasesSection;
