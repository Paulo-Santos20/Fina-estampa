import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Inicializa como true

  // Verificar se há usuário logado no localStorage ao inicializar
  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const savedUser = localStorage.getItem('finaEstampaUser');
        const savedAuth = localStorage.getItem('finaEstampaAuth');
        
        if (savedUser && savedAuth === 'true') {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setIsAuthenticated(true);
          console.log('Usuário autenticado encontrado:', userData);
        } else {
          console.log('Nenhum usuário autenticado encontrado');
        }
      } catch (error) {
        console.error('Erro ao verificar status de autenticação:', error);
        // Limpar dados corrompidos
        localStorage.removeItem('finaEstampaUser');
        localStorage.removeItem('finaEstampaAuth');
      } finally {
        setIsLoading(false);
      }
    };

    // Pequeno delay para evitar flash de conteúdo
    const timer = setTimeout(checkAuthStatus, 100);
    return () => clearTimeout(timer);
  }, []);

  const login = async (credentials) => {
    setIsLoading(true);
    
    try {
      console.log('Tentativa de login:', credentials);
      
      // Simular validação de credenciais
      const validCredentials = [
        {
          email: 'admin@finaestampa.com',
          password: 'admin123',
          user: {
            id: 1,
            name: 'Administradora',
            email: 'admin@finaestampa.com',
            role: 'admin',
            avatar: null
          }
        },
        {
          email: 'maria@email.com',
          password: '123456',
          user: {
            id: 2,
            name: 'Maria Silva',
            email: 'maria@email.com',
            role: 'customer',
            avatar: null
          }
        }
      ];

      const validUser = validCredentials.find(
        cred => cred.email === credentials.email && cred.password === credentials.password
      );

      if (validUser) {
        // Login bem-sucedido
        setUser(validUser.user);
        setIsAuthenticated(true);
        
        // Salvar no localStorage
        localStorage.setItem('finaEstampaUser', JSON.stringify(validUser.user));
        localStorage.setItem('finaEstampaAuth', 'true');
        
        console.log('Login bem-sucedido:', validUser.user);
        
        return {
          success: true,
          user: validUser.user
        };
      } else {
        // Credenciais inválidas
        console.log('Credenciais inválidas');
        return {
          success: false,
          error: 'Email ou senha incorretos'
        };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return {
        success: false,
        error: 'Erro interno. Tente novamente.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('Fazendo logout...');
    setUser(null);
    setIsAuthenticated(false);
    
    // Limpar localStorage
    localStorage.removeItem('finaEstampaUser');
    localStorage.removeItem('finaEstampaAuth');
    
    console.log('Logout realizado com sucesso');
  };

  const register = async (userData) => {
    setIsLoading(true);
    
    try {
      console.log('Tentativa de registro:', userData);
      
      // Simular registro (em um app real, isso seria uma chamada para API)
      const newUser = {
        id: Date.now(),
        name: userData.name,
        email: userData.email,
        role: 'customer',
        avatar: null
      };

      setUser(newUser);
      setIsAuthenticated(true);
      
      // Salvar no localStorage
      localStorage.setItem('finaEstampaUser', JSON.stringify(newUser));
      localStorage.setItem('finaEstampaAuth', 'true');
      
      console.log('Registro bem-sucedido:', newUser);
      
      return {
        success: true,
        user: newUser
      };
    } catch (error) {
      console.error('Erro no registro:', error);
      return {
        success: false,
        error: 'Erro ao criar conta. Tente novamente.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (userData) => {
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('finaEstampaUser', JSON.stringify(updatedUser));
    console.log('Usuário atualizado:', updatedUser);
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
    updateUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};