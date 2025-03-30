
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ResearchStudyFormData } from "@/types/research";

interface ResearchFormProps {
  form: UseFormReturn<ResearchStudyFormData>;
  onSubmit: (data: ResearchStudyFormData) => void;
}

const ResearchForm: React.FC<ResearchFormProps> = ({ form, onSubmit }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Registrar Estudo Acadêmico</CardTitle>
        <CardDescription>
          Adicione informações sobre artigos, dissertações e teses para visualização no mapa.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título do Estudo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Análise dos impactos ambientais no Amapá" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Autor Principal</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do autor principal" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="co_authors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Coautores</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome dos coautores (separados por vírgula)" {...field} />
                  </FormControl>
                  <FormDescription>
                    Separe os nomes dos coautores por vírgula
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resumo</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Breve resumo do estudo (até 600 caracteres)" 
                      className="resize-none"
                      maxLength={600}
                      rows={4}
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Máximo de 600 caracteres
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="repository_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link do Repositório</FormLabel>
                  <FormControl>
                    <Input placeholder="https://repositorio.exemplo.com/estudo" {...field} />
                  </FormControl>
                  <FormDescription>
                    URL onde o estudo completo pode ser acessado
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de Estudo</FormLabel>
                  <FormControl>
                    <select 
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="artigo">Artigo</option>
                      <option value="dissertacao">Dissertação</option>
                      <option value="tese">Tese</option>
                      <option value="livros">Livros</option>
                      <option value="ebooks">E-books</option>
                      <option value="outro">Outro</option>
                    </select>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Localização do Estudo</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input placeholder="Ex: Macapá, Santana, Laranjal do Jari..." {...field} />
                      <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Digite o nome do município no Amapá onde o estudo foi realizado
                  </FormDescription>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Adicionar ao Mapa</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ResearchForm;
