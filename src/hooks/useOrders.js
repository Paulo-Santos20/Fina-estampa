import { useState, useEffect } from 'react';

// Mock Data for Orders
const INITIAL_ORDERS = [
  {
    id: 1,
    orderNumber: '#1001',
    customer: {
      name: 'Maria Silva',
      email: 'maria.silva@example.com',
      phone: '(11) 99999-1111',
      address: { street: 'Rua das Flores, 123', city: 'São Paulo', state: 'SP', zipCode: '01234-567' }
    },
    items: [
      { name: 'Vestido Floral', size: 'M', color: 'Rosa', quantity: 1, price: 159.90 },
      { name: 'Cinto de Couro', size: 'U', color: 'Marrom', quantity: 1, price: 49.90 }
    ],
    subtotal: 209.80,
    shipping: 15.00,
    total: 224.80,
    paymentMethod: 'Cartão de Crédito',
    status: 'Pendente',
    createdAt: '2023-10-25T10:30:00',
    updatedAt: '2023-10-25T10:30:00'
  },
  {
    id: 2,
    orderNumber: '#1002',
    customer: {
      name: 'Ana Costa',
      email: 'ana.costa@example.com',
      phone: '(21) 98888-2222',
      address: { street: 'Av. Atlântica, 500', city: 'Rio de Janeiro', state: 'RJ', zipCode: '22000-000' }
    },
    items: [
      { name: 'Blusa de Seda', size: 'P', color: 'Branca', quantity: 2, price: 89.90 }
    ],
    subtotal: 179.80,
    shipping: 0.00,
    total: 179.80,
    paymentMethod: 'PIX',
    status: 'Enviado',
    createdAt: '2023-10-24T15:45:00',
    updatedAt: '2023-10-25T09:00:00'
  },
  {
    id: 3,
    orderNumber: '#1003',
    customer: {
      name: 'Carlos Pereira',
      email: 'carlos.p@example.com',
      phone: '(31) 97777-3333',
      address: { street: 'Rua da Bahia, 1000', city: 'Belo Horizonte', state: 'MG', zipCode: '30000-000' }
    },
    items: [
      { name: 'Calça Jeans', size: '42', color: 'Azul', quantity: 1, price: 129.90 }
    ],
    subtotal: 129.90,
    shipping: 20.00,
    total: 149.90,
    paymentMethod: 'Boleto',
    status: 'Entregue',
    createdAt: '2023-10-20T08:00:00',
    updatedAt: '2023-10-23T14:20:00'
  }
];

export const useOrders = () => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('sana_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('sana_orders', JSON.stringify(orders));
  }, [orders]);

  const updateOrderStatus = (orderId, newStatus) => {
    try {
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } 
          : order
      ));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const getOrdersByStatus = (status) => {
    return orders.filter(order => order.status === status);
  };

  return {
    orders,
    loading,
    updateOrderStatus,
    getOrdersByStatus
  };
};