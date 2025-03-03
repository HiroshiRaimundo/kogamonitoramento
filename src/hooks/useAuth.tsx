import { useState, useEffect, createContext, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useLocation } from "react-router-dom";

interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoginDialogOpen: boolean;
  setIsLoginDialogOpen: (value: boolean) => void;
  isLoggingIn: boolean;
  form: any;
  handleLogin: (data: LoginCredentials) => Promise<void>;
  handleLogout: () => void;
  navigate: (to: string) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const validateSession = () => {
  const auth = localStorage.getItem("isAuthenticated");
  const session = localStorage.getItem("sessionId");
  const lastActivity = localStorage.getItem("lastActivity");
  
  if (!auth || !session || !lastActivity) {
    return false;
  }

  // Verifica se a última atividade foi há menos de 24 horas
  const lastActivityTime = parseInt(lastActivity, 10);
  const now = Date.now();
  const hoursSinceLastActivity = (now - lastActivityTime) / (1000 * 60 * 60);
  
  if (hoursSinceLastActivity > 24) {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("lastActivity");
    return false;
  }

  return true;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isAuthenticated, setIsAuthenticated] = useState(validateSession);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const form = useForm<LoginCredentials>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  // Atualiza a última atividade quando há interação
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("lastActivity", Date.now().toString());
    }
  }, [location.pathname, isAuthenticated]);

  // Verifica autenticação periodicamente
  useEffect(() => {
    const checkAuth = () => {
      const isValid = validateSession();
      if (!isValid && isAuthenticated) {
        setIsAuthenticated(false);
        if (location.pathname.startsWith("/admin")) {
          navigate("/login", { replace: true });
        }
      }
    };
    
    const interval = setInterval(checkAuth, 1000 * 60); // Verifica a cada minuto
    return () => clearInterval(interval);
  }, [location, navigate, isAuthenticated]);

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoggingIn(true);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      if (data.email === "Rosemary@Hiroshi2025" && data.password === "koga@2025") {
        const sessionId = Date.now().toString();
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("sessionId", sessionId);
        localStorage.setItem("lastActivity", Date.now().toString());
        setIsAuthenticated(true);
        setIsLoginDialogOpen(false);
        
        const redirectTo = location.state?.from || "/admin";
        navigate(redirectTo, { replace: true });
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao painel administrativo."
        });
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Email ou senha incorretos.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Erro durante o login:", error);
      toast({
        title: "Erro no sistema",
        description: "Ocorreu um erro durante o login. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("sessionId");
    localStorage.removeItem("lastActivity");
    setIsAuthenticated(false);
    navigate("/", { replace: true });
    
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema."
    });
  };

  const value = {
    isAuthenticated,
    isLoginDialogOpen,
    setIsLoginDialogOpen,
    isLoggingIn,
    form,
    handleLogin,
    handleLogout,
    navigate
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
