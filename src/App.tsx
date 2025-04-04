import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Admin pages
import Admin from '@/pages/Admin';
import ClientManagement from '@/pages/admin/ClientManagement';
import ContentManagement from '@/pages/admin/ContentManagement';
import MediaContactsManagement from '@/pages/admin/MediaContactsManagement';
import { AdminMonitoringDashboard } from '@/components/admin/monitoring/AdminMonitoringDashboard';

// Client pages
import ObservatoryClient from '@/pages/clients/ObservatoryClient';
import ResearcherClient from '@/pages/clients/ResearcherClient';
import PoliticianClient from '@/pages/clients/PoliticianClient';
import InstitutionClient from '@/pages/clients/InstitutionClient';
import JournalistClient from '@/pages/clients/JournalistClient';
import PressClient from '@/pages/clients/PressClient';

// Dashboards
import ObservatoryDashboard from '@/pages/dashboard/ObservatoryDashboard';
import ResearcherDashboard from '@/pages/dashboard/ResearcherDashboard';
import PoliticianDashboard from '@/pages/dashboard/PoliticianDashboard';
import InstitutionDashboard from '@/pages/dashboard/InstitutionDashboard';
import JournalistDashboard from '@/pages/dashboard/JournalistDashboard';
import PressDashboard from '@/pages/dashboard/PressDashboard';

// Other pages
import Index from '@/pages/Index';
import LoginPage from '@/pages/Login';
import ClientLoginPage from '@/pages/ClientLogin';
import ServiceLanding from '@/pages/ServiceLanding';
import ExampleClient from '@/pages/ExampleClient';
import Client from '@/pages/Client';
import Payment from '@/pages/Payment';
import Unauthorized from '@/pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Página inicial pública */}
          <Route path="/" element={<Index />} />

          {/* Rotas de login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/client-login" element={<ClientLoginPage />} />
          
          {/* Rotas de serviço */}
          <Route path="/service/:serviceId" element={<ServiceLanding />} />
          <Route path="/client" element={<Client />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/example-client" element={<ExampleClient />} />
          
          {/* Rota de erro de autorização */}
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Rotas administrativas */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedTypes={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />
          
          {/* Rota única para monitoramento */}
          <Route
            path="/admin/monitoring/*"
            element={
              <ProtectedRoute allowedTypes={['admin']}>
                <AdminMonitoringDashboard />
              </ProtectedRoute>
            }
          />

          {/* Rota para análise e relatórios */}
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute allowedTypes={['admin']}>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/clients"
            element={
              <ProtectedRoute allowedTypes={['admin']}>
                <ClientManagement />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/content"
            element={
              <ProtectedRoute allowedTypes={['admin']}>
                <ContentManagement />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/admin/contacts"
            element={
              <ProtectedRoute allowedTypes={['admin']}>
                <MediaContactsManagement />
              </ProtectedRoute>
            }
          />

          {/* Rotas específicas de cada tipo de cliente na área admin */}
          <Route
            path="/admin/client/:clientType"
            element={
              <ProtectedRoute allowedTypes={['admin']}>
                <ClientManagement />
              </ProtectedRoute>
            }
          />

          {/* Rotas dos clientes */}
          <Route
            path="/clients/observatory"
            element={
              <ProtectedRoute allowedTypes={['admin', 'observatory']}>
                <ObservatoryClient />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/clients/researcher"
            element={
              <ProtectedRoute allowedTypes={['admin', 'researcher']}>
                <ResearcherClient />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/clients/politician"
            element={
              <ProtectedRoute allowedTypes={['admin', 'politician']}>
                <PoliticianClient />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/clients/institution"
            element={
              <ProtectedRoute allowedTypes={['admin', 'institution']}>
                <InstitutionClient />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/clients/journalist"
            element={
              <ProtectedRoute allowedTypes={['admin', 'journalist']}>
                <JournalistClient />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/clients/press"
            element={
              <ProtectedRoute allowedTypes={['admin', 'press']}>
                <PressClient />
              </ProtectedRoute>
            }
          />

          {/* Rota 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
