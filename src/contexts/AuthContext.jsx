// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

// Usuários mock para desenvolvimento
const MOCK_USERS = {
  'admin@finaestampa.com': {
    id: 1,
    name: 'Administrador',
    email: 'admin@finaestampa.com',
    role: 'admin',
    avatar: null,
    password: 'admin123'
  },
  'usuario@finaestampa.com': {
    id: 2,
    name: 'Usuário Teste',
    email: 'usuario@finaestampa.com',
    role: 'user',
    avatar: null,
    password: 'user123'
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se há usuário logado no localStorage ao carregar
  useEffect(() => {
    const checkAuthState = () => {
      try {
        const savedUser = localStorage.getItem('finaEstampaUser');
        const authToken = localStorage.getItem('finaEstampaToken');
        
        if (savedUser && authToken) {
          const userData = JSON.parse(savedUser);
          console.log('Usuário encontrado no localStorage:', userData);
          setUser(userData);
          setIsAuthenticated(true);
        } else {
          console.log('Nenhum usuário salvo encontrado');
        }
      } catch (error) {
        console.error('Erro ao carregar usuário salvo:', error);
        localStorage.removeItem('finaEstampaUser');
        localStorage.removeItem('finaEstampaToken');
      } finally {
        setLoading(false);
      }
    };

    checkAuthState();
  }, []);

  const login = async (email, password) => {
    console.log('Tentando fazer login com:', { email, password });
    setLoading(true);
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Verificar credenciais
      const foundUser = MOCK_USERS[email];
      
      if (!foundUser || foundUser.password !== password) {
        throw new Error('Email ou senha incorretos');
      }

      // Criar dados do usuário (sem a senha)
      const userData = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        role: foundUser.role,
        avatar: foundUser.avatar
      };

      // Gerar token mock
      const authToken = `token_${userData.id}_${Date.now()}`;

      // Salvar no localStorage
      localStorage.setItem('finaEstampaUser', JSON.stringify(userData));
      localStorage.setItem('finaEstampaToken', authToken);
      
      // Atualizar estado
      setUser(userData);
      setIsAuthenticated(true);
      
      console.log('Login realizado com sucesso:', userData);
      return userData;
      
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    console.log('Fazendo logout...');
    localStorage.removeItem('finaEstampaUser');
    localStorage.removeItem('finaEstampaToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

const isLoggedIn = () => {
  return isAuthenticated && !!user && !!localStorage.getItem('finaEstampaToken');
};

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    isAdmin,
    isLoggedIn
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '16px',
        color: '#722F37'
      }}>
        Carregando...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};

export default AuthContext;