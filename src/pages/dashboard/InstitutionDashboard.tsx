import React from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';

const InstitutionDashboard: React.FC = () => {
  const { client } = useAuth();

  return (
    <DashboardLayout title="Dashboard da Instituição">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Relatórios Institucionais</h2>
          {client?.permissions.canViewReports && (
            <p>Relatórios e análises...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Gestão de Usuários</h2>
          {client?.permissions.canInviteUsers && (
            <p>Gerenciamento de equipe...</p>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Análise de Dados</h2>
          {client?.permissions.canAccessAnalytics && (
            <p>Análises e insights...</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InstitutionDashboard;
