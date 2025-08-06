import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const TestAuth = () => {
  const { user, login, logout, isLoading } = useAuth();
  const [credentials, setCredentials] = useState({
    email: 'admin@finaestampa.com',
    password: 'admin123'
  });

  const handleLogin = async () => {
    const result = await login(credentials);
    if (result.success) {
      alert('Login realizado com sucesso!');
    } else {
      alert(`Erro: ${result.error}`);
    }
  };

  const handleLogout = () => {
    logout();
    alert('Logout realizado!');
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div style={{ padding: '2rem', background: '#f5f5f5', margin: '1rem', borderRadius: '8px' }}>
      <h3>🔐 Teste de Autenticação</h3>
      
      {user ? (
        <div>
          <p><strong>Usuário logado:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Tipo:</strong> {user.type}</p>
          <button 
            onClick={handleLogout}
            style={{
              background: '#722F37',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Fazer Logout
          </button>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              style={{ 
                padding: '0.5rem', 
                marginRight: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <input
              type="password"
              placeholder="Senha"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              style={{ 
                padding: '0.5rem',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
          </div>
          <button 
            onClick={handleLogin}
            style={{
              background: '#722F37',
              color: 'white',
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Fazer Login
          </button>
          <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
            <strong>Credenciais de teste:</strong><br />
            Admin: admin@finaestampa.com / admin123<br />
            Cliente: maria@email.com / 123456
          </div>
        </div>
      )}
    </div>
  );
};

export default TestAuth;