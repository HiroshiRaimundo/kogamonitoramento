
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Varredura</h3>
            <p className="text-gray-400">
              Plataforma integrada de gestão de comunicação e monitoramento inteligente para diversos setores.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li><Link to="/login" className="text-gray-400 hover:text-white">Login</Link></li>
              <li><Link to="/service/demo" className="text-gray-400 hover:text-white">Demonstração</Link></li>
              <li><Link to="/client" className="text-gray-400 hover:text-white">Área do Cliente</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Contato</h3>
            <p className="text-gray-400">contato@varredura.com.br</p>
            <p className="text-gray-400">+55 (XX) XXXX-XXXX</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Varredura. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
