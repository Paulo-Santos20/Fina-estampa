import { useState, useEffect } from 'react';

// Dados iniciais simulados
const INITIAL_CUSTOMERS = [
  {
    id: 1,
    name: 'Maria Silva',
    email: 'maria.silva@email.com',
    phone: '(11) 98765-4321',
    birthDate: '1990-05-15',
    gender: 'Feminino',
    cpf: '123.456.789-00',
    address: {
      street: 'Rua das Flores, 123',
      neighborhood: 'Jardins',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    totalOrders: 15,
    totalSpent: 4500.50,
    lastOrder: '2025-01-10T14:30:00',
    status: 'Ativo',
    createdAt: '2023-01-15T10:00:00'
  },
  {
    id: 2,
    name: 'João Souza',
    email: 'joao.souza@email.com',
    phone: '(21) 99876-5432',
    birthDate: '1985-10-20',
    gender: 'Masculino',
    cpf: '987.654.321-11',
    address: {
      street: 'Av. Atlântica, 500',
      neighborhood: 'Copacabana',
      city: 'Rio de Janeiro',
      state: 'RJ',
      zipCode: '22000-000'
    },
    totalOrders: 3,
    totalSpent: 450.00,
    lastOrder: '2024-12-05T09:15:00',
    status: 'Ativo',
    createdAt: '2024-05-20T11:30:00'
  },
  {
    id: 3,
    name: 'Ana Pereira',
    email: 'ana.pereira@email.com',
    phone: '(31) 91234-5678',
    birthDate: '1995-03-08',
    gender: 'Feminino',
    cpf: '456.789.123-22',
    address: {
      street: 'Rua da Bahia, 1000',
      neighborhood: 'Centro',
      city: 'Belo Horizonte',
      state: 'MG',
      zipCode: '30000-000'
    },
    totalOrders: 8,
    totalSpent: 1200.00,
    lastOrder: '2025-01-08T16:45:00',
    status: 'Ativo',
    createdAt: '2023-11-10T14:20:00'
  }
];

export const useCustomers = () => {
  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('sana_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('sana_customers', JSON.stringify(customers));
  }, [customers]);

  const addCustomer = (customerData) => {
    setLoading(true);
    try {
      const newCustomer = {
        ...customerData,
        id: Date.now(),
        totalOrders: 0,
        totalSpent: 0,
        lastOrder: null,
        status: 'Ativo',
        createdAt: new Date().toISOString()
      };
      setCustomers(prev => [newCustomer, ...prev]);
      setLoading(false);
      return newCustomer;
    } catch (error) {
      setLoading(false);
      return null;
    }
  };

  const updateCustomer = (id, updatedData) => {
    try {
      setCustomers(prev => prev.map(c => c.id === id ? { ...c, ...updatedData } : c));
      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteCustomer = (id) => {
    try {
      setCustomers(prev => prev.filter(c => c.id !== id));
      return true;
    } catch (error) {
      return false;
    }
  };

  const searchCustomers = (query) => {
    if (!query) return customers;
    const lowerQuery = query.toLowerCase();
    return customers.filter(c => 
      c.name.toLowerCase().includes(lowerQuery) || 
      c.email.toLowerCase().includes(lowerQuery)
    );
  };

  const getCustomerStats = () => {
    const total = customers.length;
    const active = customers.filter(c => c.status === 'Ativo').length;
    const totalRevenue = customers.reduce((acc, curr) => acc + (curr.totalSpent || 0), 0);
    const averageSpent = total > 0 ? totalRevenue / total : 0;

    return { total, active, totalRevenue, averageSpent };
  };

  return {
    customers,
    loading,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    getCustomerStats
  };
};