import { useState, useEffect } from 'react';

// Dados iniciais de pedidos
const INITIAL_ORDERS = [
  {
    id: 'order-001',
    orderNumber: '#001',
    customer: {
      name: 'Maria Silva',
      email: 'maria@email.com',
      phone: '(11) 99999-9999',
      address: {
        street: 'Rua das Flores, 123',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01234-567'
      }
    },
    items: [
      {
        productId: 'p1',
        name: 'Vestido Florido Verão',
        price: 89.90,
        quantity: 2,
        size: 'M',
        color: 'Floral Rosa'
      }
    ],
    subtotal: 179.80,
    shipping: 15.00,
    total: 194.80,
    status: 'Pendente',
    paymentMethod: 'PIX',
    createdAt: '2025-01-08T14:30:00Z',
    updatedAt: '2025-01-08T14:30:00Z'
  },
  {
    id: 'order-002',
    orderNumber: '#002',
    customer: {
      name: 'Ana Costa',
      email: 'ana@email.com',
      phone: '(11) 88888-8888',
      address: {
        street: 'Av. Paulista, 456',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100'
      }
    },
    items: [
      {
        productId: 'p2',
        name: 'Blusa de Seda Elegance',
        price: 159.90,
        quantity: 1,
        size: 'P',
        color: 'Branco'
      }
    ],
    subtotal: 159.90,
    shipping: 15.00,
    total: 174.90,
    status: 'Confirmado',
    paymentMethod: 'Cartão de Crédito',
    createdAt: '2025-01-08T13:15:00Z',
    updatedAt: '2025-01-08T15:20:00Z'
  }
];

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar pedidos do localStorage
  useEffect(() => {
    try {
      const savedOrders = localStorage.getItem('orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders(INITIAL_ORDERS);
        localStorage.setItem('orders', JSON.stringify(INITIAL_ORDERS));
      }
    } catch (err) {
      console.error('Erro ao carregar pedidos:', err);
      setOrders(INITIAL_ORDERS);
      setError('Erro ao carregar pedidos');
    } finally {
      setLoading(false);
    }
  }, []);

  // Salvar pedidos no localStorage
  const saveOrders = (newOrders) => {
    try {
      localStorage.setItem('orders', JSON.stringify(newOrders));
      setOrders(newOrders);
    } catch (err) {
      console.error('Erro ao salvar pedidos:', err);
      setError('Erro ao salvar pedidos');
    }
  };

  // Atualizar status do pedido
  const updateOrderStatus = (orderId, newStatus) => {
    try {
      const updatedOrders = orders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            status: newStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return order;
      });

      saveOrders(updatedOrders);
      return true;
    } catch (err) {
      console.error('Erro ao atualizar status do pedido:', err);
      setError('Erro ao atualizar status');
      return false;
    }
  };

  // Obter pedido por ID
  const getOrderById = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  // Obter pedidos por status
  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  // Obter pedidos pendentes
  const getPendingOrders = () => {
    return orders.filter(order => order.status === 'Pendente');
  };

  // Obter estatísticas de pedidos
  const getOrderStats = () => {
    const today = new Date().toDateString();
    const todayOrders = orders.filter(order => 
      new Date(order.createdAt).toDateString() === today
    );

    return {
      total: orders.length,
      today: todayOrders.length,
      pending: orders.filter(order => order.status === 'Pendente').length,
      confirmed: orders.filter(order => order.status === 'Confirmado').length,
      shipped: orders.filter(order => order.status === 'Enviado').length,
      delivered: orders.filter(order => order.status === 'Entregue').length
    };
  };

  return {
    orders,
    loading,
    error,
    updateOrderStatus,
    getOrderById,
    getOrdersByStatus,
    getPendingOrders,
    getOrderStats
  };
};