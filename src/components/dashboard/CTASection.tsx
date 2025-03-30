
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const CTASection: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-green-600 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Uma Única Plataforma. Infinitas Possibilidades.
        </h2>
        <p className="text-xl max-w-3xl mx-auto mb-8">
          Simplifique sua estratégia de comunicação e monitoramento com nossa solução integrada 
          que se adapta às necessidades do seu negócio, independente do setor.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button 
            onClick={() => navigate("/client")}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100"
          >
            Começar Agora
          </Button>
          <Button 
            onClick={() => navigate("/help")}
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white/20"
          >
            Solicitar Demonstração
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
