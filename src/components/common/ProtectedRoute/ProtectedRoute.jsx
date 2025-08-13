// src/components/common/ProtectedRoute/ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext.jsx';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isLoggedIn } = useAuth();
  const location = useLocation();

  console.log('ProtectedRoute - Estado:', { 
    user, 
    loading, 
    isLoggedIn: isLoggedIn(), 
    pathname: location.pathname 
  });

  // Mostrar loading enquanto verifica autenticação
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
        <div>Verificando permissões...</div>
      </div>
    );
  }

  // Verificar se o usuário está logado
  if (!isLoggedIn()) {
    console.log('Usuário não logado, redirecionando para login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar se requer admin e o usuário não é admin
  if (requireAdmin && user?.role !== 'admin') {
    console.log('Usuário não é admin, redirecionando para dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  console.log('Acesso autorizado para:', location.pathname);
  return children;
};

export default ProtectedRoute;