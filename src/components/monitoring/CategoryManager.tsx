
import React, { useState } from "react";
import { FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ClientType, getDefaultCategories } from "./utils/clientTypeUtils";

interface CategoryManagerProps {
  clientType?: ClientType;
  onCategoryAdded: (newCategories: string[]) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({ clientType, onCategoryAdded }) => {
  console.log("CategoryManager rendering with clientType:", clientType);
  
  // Use Observatory as default client type if none is provided
  const effectiveClientType = clientType || "observatory";
  
  const [newCategory, setNewCategory] = useState("");
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  
  const handleAddCategory = () => {
    const defaultCategories = getDefaultCategories(effectiveClientType);
    const allCategories = [...defaultCategories, ...customCategories];
    
    if (newCategory && !allCategories.includes(newCategory)) {
      const updatedCustomCategories = [...customCategories, newCategory];
      setCustomCategories(updatedCustomCategories);
      setNewCategory("");
      onCategoryAdded([...defaultCategories, ...updatedCustomCategories]);
      console.log("Added new category:", newCategory);
    }
  };

  return (
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
  );
};

export default CategoryManager;
