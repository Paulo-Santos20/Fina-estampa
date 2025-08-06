import React, { createContext, useContext, useState, useEffect } from 'react';

// Criar o contexto
const AuthContext = createContext(null);

// Hook para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

// Provider do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage ao inicializar
  useEffect(() => {
    const loadUser = () => {
      try {
        const savedUser = localStorage.getItem('finaEstampaUser');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          if (userData && typeof userData === 'object') {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('finaEstampaUser');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Função de login
  const login = async (credentials) => {
    try {
      const { email, password } = credentials;

      // Validação básica
      if (!email || !password) {
        return { success: false, error: 'Email e senha são obrigatórios' };
      }

      // Usuários de exemplo
      const users = [
        {
          id: 1,
          name: 'Administrador',
          email: 'admin@finaestampa.com',
          password: 'admin123',
          type: 'admin',
          phone: '(11) 99999-9999'
        },
        {
          id: 2,
          name: 'Maria Silva',
          email: 'maria@email.com',
          password: '123456',
          type: 'customer',
          phone: '(11) 98888-8888'
        },
        {
          id: 3,
          name: 'João Santos',
          email: 'joao@email.com',
          password: '123456',
          type: 'customer',
          phone: '(11) 97777-7777'
        }
      ];

      // Buscar usuário
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        // Remover senha do objeto do usuário
        const userWithoutPassword = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email,
          type: foundUser.type,
          phone: foundUser.phone,
          avatar: null,
          loginAt: new Date().toISOString()
        };

        // Salvar usuário no estado e localStorage
        setUser(userWithoutPassword);
        localStorage.setItem('finaEstampaUser', JSON.stringify(userWithoutPassword));

        return { success: true, user: userWithoutPassword };
      } else {
        return { success: false, error: 'Email ou senha incorretos' };
      }
    } catch (error) {
      console.error('Erro no login:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  };

  // Função de registro
  const register = async (userData) => {
    try {
      const { name, email, password, phone } = userData;

      // Validação básica
      if (!name || !email || !password) {
        return { success: false, error: 'Todos os campos são obrigatórios' };
      }

      // Verificar se email já existe (simulado)
      const existingUsers = JSON.parse(localStorage.getItem('finaEstampaUsers') || '[]');
      const emailExists = existingUsers.some(u => u.email === email);

      if (emailExists) {
        return { success: false, error: 'Este email já está cadastrado' };
      }

      // Criar novo usuário
      const newUser = {
        id: Date.now(),
        name: name.trim(),
        email: email.toLowerCase().trim(),
        phone: phone || '',
        type: 'customer',
        avatar: null,
        createdAt: new Date().toISOString()
      };

      // Salvar na lista de usuários (com senha)
      const userWithPassword = { ...newUser, password };
      existingUsers.push(userWithPassword);
      localStorage.setItem('finaEstampaUsers', JSON.stringify(existingUsers));

      // Fazer login automático (sem senha)
      setUser(newUser);
      localStorage.setItem('finaEstampaUser', JSON.stringify(newUser));

      return { success: true, user: newUser };
    } catch (error) {
      console.error('Erro no registro:', error);
      return { success: false, error: 'Erro interno do servidor' };
    }
  };

  // Função de logout
  const logout = () => {
    try {
      setUser(null);
      localStorage.removeItem('finaEstampaUser');
    } catch (error) {
      console.error('Erro no logout:', error);
    }
  };

  // Função para atualizar usuário
  const updateUser = (updatedData) => {
    try {
      if (user && updatedData) {
        const updatedUser = { ...user, ...updatedData, updatedAt: new Date().toISOString() };
        setUser(updatedUser);
        localStorage.setItem('finaEstampaUser', JSON.stringify(updatedUser));

        // Atualizar também na lista de usuários
        const existingUsers = JSON.parse(localStorage.getItem('finaEstampaUsers') || '[]');
        const updatedUsers = existingUsers.map(u => 
          u.id === user.id ? { ...u, ...updatedData, updatedAt: new Date().toISOString() } : u
        );
        localStorage.setItem('finaEstampaUsers', JSON.stringify(updatedUsers));

        return true;
      }
      return false;
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      return false;
    }
  };

  // Propriedades derivadas
  const isAuthenticated = !!user;
  const isAdmin = user?.type === 'admin';
  const isCustomer = user?.type === 'customer';

  // Valor do contexto
  const contextValue = {
    // Estado
    user,
    isLoading,
    isAuthenticated,
    isAdmin,
    isCustomer,
    
    // Funções
    login,
    register,
    logout,
    updateUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
