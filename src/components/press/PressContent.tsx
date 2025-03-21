import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Send, Clock, CheckCircle, XCircle } from 'lucide-react';
import ContentCreator, { ContentData } from './ContentCreator';
import { pressMonitoringService } from '@/services/pressMonitoring';

interface Content {
  id: string;
  type: 'release' | 'reportagem';
  title: string;
  subtitle: string;
  category: string;
  status: string;
  date: string;
  tags: string[];
  monitoringStatus?: {
    lastCheck: string;
    publications: number;
  };
}

interface PressContentProps {
  clientType: string;
}

const PressContent: React.FC<PressContentProps> = ({ clientType }) => {
  const [contents, setContents] = useState<Content[]>([
    {
      id: '1',
      type: 'release',
      title: 'Nova Política de Sustentabilidade',
      subtitle: 'Empresa anuncia metas ambiciosas para 2026',
      category: 'sustentabilidade',
      status: 'approved',
      date: '2025-03-01',
      tags: ['sustentabilidade', 'meio ambiente', 'ESG'],
      monitoringStatus: {
        lastCheck: '2025-03-05T12:00:00',
        publications: 3
      }
    },
    {
      id: '2',
      type: 'reportagem',
      title: 'Impacto da IA no Mercado de Trabalho',
      subtitle: 'Como a inteligência artificial está mudando as profissões',
      category: 'tecnologia',
      status: 'pending',
      date: '2025-03-04',
      tags: ['tecnologia', 'ia', 'mercado de trabalho']
    },
    {
      id: '3',
      type: 'release',
      title: 'Resultados do Primeiro Trimestre',
      subtitle: 'Empresa supera expectativas do mercado',
      category: 'financeiro',
      status: 'draft',
      date: '2025-03-05',
      tags: ['resultados', 'financeiro', 'mercado']
    }
  ]);

  const handleContentSubmit = (content: ContentData) => {
    const newContent: Content = {
      id: Date.now().toString(),
      type: content.type,
      title: content.title,
      subtitle: content.subtitle,
      category: content.category,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      tags: content.tags
    };

    setContents(prev => [newContent, ...prev]);
  };

  const handleSendContent = (id: string) => {
    setContents(prev => 
      prev.map(content => 
        content.id === id 
          ? { ...content, status: 'pending' } 
          : content
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap = {
      approved: 'Aprovado',
      pending: 'Em análise',
      rejected: 'Rejeitado',
      draft: 'Rascunho',
      distributed: 'Distribuído',
      published: 'Publicado'
    };
    return statusMap[status] || status;
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="new" className="w-full">
        <TabsList>
          <TabsTrigger value="new">Criar Conteúdo</TabsTrigger>
          <TabsTrigger value="my">Meus Conteúdos</TabsTrigger>
          <TabsTrigger value="published">Publicados</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Criar Novo Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              <ContentCreator onSubmit={handleContentSubmit} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contents.map((content) => (
              <Card key={content.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{content.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{content.subtitle}</p>
                    </div>
                    <Badge 
                      variant={content.status === 'approved' ? 'default' : 'secondary'}
                      className="flex items-center gap-1"
                    >
                      {getStatusIcon(content.status)}
                      <span>{getStatusText(content.status)}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="outline">{content.type}</Badge>
                      <span>•</span>
                      <span>{content.category}</span>
                      <span>•</span>
                      <span>{new Date(content.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {content.tags.map(tag => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {content.monitoringStatus && (
                      <div className="text-sm text-muted-foreground">
                        <p>Última verificação: {new Date(content.monitoringStatus.lastCheck).toLocaleString()}</p>
                        <p>Publicações encontradas: {content.monitoringStatus.publications}</p>
                      </div>
                    )}
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                      {content.status === 'draft' && (
                        <Button size="sm" onClick={() => handleSendContent(content.id)}>
                          <Send className="h-4 w-4 mr-2" />
                          Enviar
                        </Button>
                      )}
                      {(content.status === 'distributed' || content.status === 'published') && (
                        <Button variant="outline" size="sm">
                          Ver publicações
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contents
              .filter(content => content.status === 'published' || content.status === 'distributed')
              .map((content) => (
                <Card key={content.id}>
                  <CardHeader className="pb-3">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{content.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{content.subtitle}</p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="outline">{content.type}</Badge>
                        <span>•</span>
                        <span>{content.category}</span>
                        <span>•</span>
                        <span>{new Date(content.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {content.tags.map(tag => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      {content.monitoringStatus && (
                        <div className="text-sm text-muted-foreground">
                          <p>Última verificação: {new Date(content.monitoringStatus.lastCheck).toLocaleString()}</p>
                          <p>Publicações encontradas: {content.monitoringStatus.publications}</p>
                        </div>
                      )}
                      <div className="flex justify-end">
                        <Button variant="outline" size="sm">
                          Ver publicações
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PressContent;
