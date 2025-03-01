
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";

interface MonitoringItem {
  name: string;
  url: string;
  api_url?: string;
  frequency: string;
  category: string;
  keywords?: string;
  responsible?: string;
  notes?: string;
}

interface MonitoringFormInputsProps {
  form: UseFormReturn<MonitoringItem>;
  onSubmit: (data: MonitoringItem) => void;
  clientType?: "observatory" | "researcher" | "politician" | "institution" | "journalist";
}

const MonitoringFormInputs: React.FC<MonitoringFormInputsProps> = ({ form, onSubmit, clientType }) => {
  const [newCategory, setNewCategory] = useState("");
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  
  // Define default categories based on client type
  const getDefaultCategories = () => {
    const baseCategories = ["governo", "indicadores", "legislacao", "api"];
    
    switch (clientType) {
      case "observatory":
        return [...baseCategories, "ambiental", "social"];
      case "researcher":
        return [...baseCategories, "acadêmico", "publicações"];
      case "politician":
        return [...baseCategories, "votações", "projetos", "orçamento"];
      case "institution":
        return [...baseCategories, "relatórios", "auditorias"];
      case "journalist":
        return [...baseCategories, "pautas", "entrevistas", "fontes"];
      default:
        return baseCategories;
    }
  };
  
  const allCategories = [...getDefaultCategories(), ...customCategories];
  
  const handleAddCategory = () => {
    if (newCategory && !allCategories.includes(newCategory)) {
      setCustomCategories([...customCategories, newCategory]);
      setNewCategory("");
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Monitoramento</FormLabel>
              <FormControl>
                <Input placeholder="Ex: Índice de Desmatamento - Amazônia Legal" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da Fonte</FormLabel>
              <FormControl>
                <Input placeholder="https://dados.gov.br/exemplo" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="api_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL da API (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="https://api.exemplo.com/dados" {...field} />
              </FormControl>
              <FormDescription>
                Insira o endpoint da API para monitoramento via integração direta
              </FormDescription>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    {...field}
                  >
                    <option value="">Selecione uma categoria</option>
                    {allCategories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </FormControl>
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel>Adicionar Nova Categoria</FormLabel>
            <div className="flex items-center gap-2">
              <Input
                placeholder="Nova categoria..."
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={handleAddCategory}
              >
                <PlusCircle className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
          </div>
        </div>

        <FormField
          control={form.control}
          name="frequency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Frequência de Atualização</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  {...field}
                >
                  <option value="">Selecione uma frequência</option>
                  <option value="diario">Diário</option>
                  <option value="semanal">Semanal</option>
                  <option value="quinzenal">Quinzenal</option>
                  <option value="mensal">Mensal</option>
                </select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="keywords"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Palavras-chave (opcional)</FormLabel>
              <FormControl>
                <Input placeholder="Desmatamento, meio ambiente, amazônia" {...field} />
              </FormControl>
              <FormDescription>
                Separe as palavras-chave por vírgula
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="responsible"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Responsável</FormLabel>
              <FormControl>
                <Input placeholder="Nome do pesquisador ou responsável" {...field} />
              </FormControl>
              <FormDescription>
                Informe o nome do pesquisador responsável por este monitoramento
              </FormDescription>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Anotações (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Observações relevantes sobre este monitoramento..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Adicionar Monitoramento</Button>
      </form>
    </Form>
  );
};

export default MonitoringFormInputs;
