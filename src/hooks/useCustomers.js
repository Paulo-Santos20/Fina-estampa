import { useState, useEffect } from 'react';

// Dados iniciais de clientes (exemplo)
const INITIAL_CUSTOMERS = [
  {
    id: 'c1',
    name: 'Maria Silva Santos',
    email: 'maria.silva@email.com',
    phone: '(11) 99999-1111',
    birthDate: '1985-03-15',
    gender: 'Feminino',
    cpf: '123.456.789-00',
    address: {
      street: 'Rua das Flores, 123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    status: 'Ativo',
    totalOrders: 15,
    totalSpent: 2450.00,
    lastOrder: '2024-01-15',
    createdAt: '2023-06-10'
  },
  {
    id: 'c2',
    name: 'Ana Carolina Oliveira',
    email: 'ana.oliveira@email.com',
    phone: '(11) 99999-2222',
    birthDate: '1990-07-22',
    gender: 'Feminino',
    cpf: '987.654.321-00',
    address: {
      street: 'Av. Paulista, 456',
      neighborhood: 'Bela Vista',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    status: 'Ativo',
    totalOrders: 8,
    totalSpent: 1200.00,
    lastOrder: '2024-01-10',
    createdAt: '2023-08-20'
  },
  {
    id: 'c3',
    name: 'Juliana Costa',
    email: 'juliana.costa@email.com',
    phone: '(11) 99999-3333',
    birthDate: '1988-12-05',
    gender: 'Feminino',
    address: {
      street: 'Rua Augusta, 789',
      neighborhood: 'Consolação',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-000'
    },
    status: 'Ativo',
    totalOrders: 3,
    totalSpent: 450.00,
    lastOrder: '2023-12-20',
    createdAt: '2023-11-15'
  }
];

export const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar clientes do localStorage
  useEffect(() => {
    try {
      const savedCustomers = localStorage.getItem('customers');
      if (savedCustomers) {
        const parsedCustomers = JSON.parse(savedCustomers);
        if (parsedCustomers.length === 0) {
          setCustomers(INITIAL_CUSTOMERS);
          localStorage.setItem('customers', JSON.stringify(INITIAL_CUSTOMERS));
        } else {
          setCustomers(parsedCustomers);
        }
      } else {
        setCustomers(INITIAL_CUSTOMERS);
        localStorage.setItem('customers', JSON.stringify(INITIAL_CUSTOMERS));
      }
    } catch (err) {
      console.error('Erro ao carregar clientes:', err);
      setCustomers(INITIAL_CUSTOMERS);
      setError('Erro ao carregar clientes');
    } finally {
      setLoading(false);
    }
  }, []);

  // Salvar clientes no localStorage
  const saveCustomers = (newCustomers) => {
    try {
      localStorage.setItem('customers', JSON.stringify(newCustomers));
      setCustomers(newCustomers);
      
      // Disparar evento para notificar outros componentes
      window.dispatchEvent(new CustomEvent('customersUpdated', {
        detail: { customers: newCustomers }
      }));
    } catch (err) {
      console.error('Erro ao salvar clientes:', err);
      setError('Erro ao salvar clientes');
    }
  };

  // Adicionar cliente
  const addCustomer = (customerData) => {
    try {
      const newCustomer = {
        id: `c${Date.now()}`,
        ...customerData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const updatedCustomers = [...customers, newCustomer];
      saveCustomers(updatedCustomers);
      return newCustomer;
    } catch (err) {
      console.error('Erro ao adicionar cliente:', err);
      setError('Erro ao adicionar cliente');
      return null;
    }
  };

  // Atualizar cliente
  const updateCustomer = (customerId, updateData) => {
    try {
      const updatedCustomers = customers.map(customer => {
        if (customer.id === customerId) {
          return {
            ...customer,
            ...updateData,
            updatedAt: new Date().toISOString()
          };
        }
        return customer;
      });

      saveCustomers(updatedCustomers);
      return true;
    } catch (err) {
      console.error('Erro ao atualizar cliente:', err);
      setError('Erro ao atualizar cliente');
      return false;
    }
  };

  // Excluir cliente
  const deleteCustomer = (customerId) => {
    try {
      const updatedCustomers = customers.filter(customer => customer.id !== customerId);
      saveCustomers(updatedCustomers);
      return true;
    } catch (err) {
      console.error('Erro ao excluir cliente:', err);
      setError('Erro ao excluir cliente');
      return false;
    }
  };

  // Buscar clientes
  const searchCustomers = (query) => {
    if (!query || !query.trim()) return customers;
    
    const searchTerm = query.toLowerCase().trim();
    return customers.filter(customer =>
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.phone.includes(searchTerm)
    );
  };

  // Obter cliente por ID
  const getCustomerById = (customerId) => {
    return customers.find(customer => customer.id === customerId);
  };

  // Obter estatísticas dos clientes
  const getCustomerStats = () => {
    const total = customers.length;
    const active = customers.filter(customer => customer.status === 'Ativo').length;
    const totalRevenue = customers.reduce((sum, customer) => sum + customer.totalSpent, 0);
    const averageSpent = total > 0 ? totalRevenue / total : 0;

    return {
      total,
      active,
      totalRevenue,
      averageSpent
    };
  };

  return {
    customers,
    loading,
    error,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    searchCustomers,
    getCustomerById,
    getCustomerStats
  };
};