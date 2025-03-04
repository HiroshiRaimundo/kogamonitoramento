import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Admin pages
import Admin from '@/pages/Admin';
import ClientManagement from '@/pages/admin/ClientManagement';
import ContentManagement from '@/pages/admin/ContentManagement';
import MediaContactsManagement from '@/pages/admin/MediaContactsManagement';

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

          {/* Rotas de clientes */}
          <Route path="/clients/observatory" element={<ObservatoryClient />} />
          <Route path="/clients/researcher" element={<ResearcherClient />} />
          <Route path="/clients/politician" element={<PoliticianClient />} />
          <Route path="/clients/institution" element={<InstitutionClient />} />
          <Route path="/clients/journalist" element={<JournalistClient />} />
          <Route path="/clients/press" element={<PressClient />} />

          {/* Rotas protegidas dos dashboards */}
          <Route
            path="/dashboard/observatory"
            element={
              <ProtectedRoute allowedTypes={['observatory']}>
                <ObservatoryDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/researcher"
            element={
              <ProtectedRoute allowedTypes={['researcher']}>
                <ResearcherDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/politician"
            element={
              <ProtectedRoute allowedTypes={['politician']}>
                <PoliticianDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/institution"
            element={
              <ProtectedRoute allowedTypes={['institution']}>
                <InstitutionDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/journalist"
            element={
              <ProtectedRoute allowedTypes={['journalist']}>
                <JournalistDashboard />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/dashboard/press"
            element={
              <ProtectedRoute allowedTypes={['press']}>
                <PressDashboard />
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
