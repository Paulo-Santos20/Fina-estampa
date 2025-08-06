import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--cinza-claro)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{
          background: 'var(--white-principal)',
          padding: '3rem',
          borderRadius: 'var(--radius-large)',
          boxShadow: '0 4px 15px rgba(114, 47, 55, 0.1)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <h2 style={{ color: 'var(--wine-destaque)', marginBottom: '1rem' }}>
            🔒 Acesso restrito
          </h2>
          <p style={{ color: 'var(--cinza-medio)', marginBottom: '2rem' }}>
            Você precisa fazer login para acessar esta página.
          </p>
          <Link to="/login" style={{
            background: 'var(--wine-destaque)',
            color: 'var(--white-principal)',
            padding: '1rem 2rem',
            textDecoration: 'none',
            borderRadius: 'var(--radius-medium)',
            fontWeight: '600'
          }}>
            Fazer Login
          </Link>
        </div>
      </div>
    );
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--cinza-claro)',
      padding: '2rem'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          background: 'var(--white-principal)',
          padding: '2rem',
          borderRadius: 'var(--radius-large)',
          marginBottom: '2rem',
          boxShadow: '0 4px 15px rgba(114, 47, 55, 0.1)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ color: 'var(--wine-destaque)', margin: '0 0 0.5rem 0' }}>
                👋 Olá, {user?.name}!
              </h1>
              <p style={{ color: 'var(--cinza-medio)', margin: 0 }}>
                Bem-vinda ao seu painel pessoal
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/" style={{
                color: 'var(--cinza-medio)',
                textDecoration: 'none'
              }}>
                ← Voltar à loja
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  color: 'var(--wine-destaque)',
                  border: '1px solid var(--wine-destaque)',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-medium)',
                  cursor: 'pointer'
                }}
              >
                Sair
              </button>
            </div>
          </div>
        </div>

        {/* Menu de opções */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'var(--white-principal)',
            padding: '2rem',
            borderRadius: 'var(--radius-large)',
            boxShadow: '0 4px 15px rgba(114, 47, 55, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👤</div>
            <h3 style={{ color: 'var(--wine-destaque)', marginBottom: '0.5rem' }}>Meus Dados</h3>
            <p style={{ color: 'var(--cinza-medio)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Gerencie suas informações pessoais
            </p>
            <button style={{
              background: 'var(--wine-destaque)',
              color: 'var(--white-principal)',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: 'var(--radius-medium)',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              Em breve
            </button>
          </div>

          <div style={{
            background: 'var(--white-principal)',
            padding: '2rem',
            borderRadius: 'var(--radius-large)',
            boxShadow: '0 4px 15px rgba(114, 47, 55, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
            <h3 style={{ color: 'var(--wine-destaque)', marginBottom: '0.5rem' }}>Meus Pedidos</h3>
            <p style={{ color: 'var(--cinza-medio)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Acompanhe seus pedidos e histórico
            </p>
            <button style={{
              background: 'var(--wine-destaque)',
              color: 'var(--white-principal)',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: 'var(--radius-medium)',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              Em breve
            </button>
          </div>

          <div style={{
            background: 'var(--white-principal)',
            padding: '2rem',
            borderRadius: 'var(--radius-large)',
            boxShadow: '0 4px 15px rgba(114, 47, 55, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
            <h3 style={{ color: 'var(--wine-destaque)', marginBottom: '0.5rem' }}>Favoritos</h3>
            <p style={{ color: 'var(--cinza-medio)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Seus produtos favoritos salvos
            </p>
            <button style={{
              background: 'var(--wine-destaque)',
              color: 'var(--white-principal)',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: 'var(--radius-medium)',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              Em breve
            </button>
          </div>

          <div style={{
            background: 'var(--white-principal)',
            padding: '2rem',
            borderRadius: 'var(--radius-large)',
            boxShadow: '0 4px 15px rgba(114, 47, 55, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📍</div>
            <h3 style={{ color: 'var(--wine-destaque)', marginBottom: '0.5rem' }}>Endereços</h3>
            <p style={{ color: 'var(--cinza-medio)', marginBottom: '1rem', fontSize: '0.9rem' }}>
              Gerencie seus endereços de entrega
            </p>
            <button style={{
              background: 'var(--wine-destaque)',
              color: 'var(--white-principal)',
              border: 'none',
              padding: '0.8rem 1.5rem',
              borderRadius: 'var(--radius-medium)',
              cursor: 'pointer',
              fontWeight: '500'
            }}>
              Em breve
            </button>
          </div>
        </div>

        {/* Informações do usuário */}
        <div style={{
          background: 'var(--white-principal)',
          padding: '2rem',
          borderRadius: 'var(--radius-large)',
          boxShadow: '0 4px 15px rgba(114, 47, 55, 0.1)'
        }}>
          <h3 style={{ color: 'var(--preto-secundario)', marginBottom: '1.5rem' }}>
            Suas informações
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div>
              <strong>Nome:</strong> {user?.name}
            </div>
            <div>
              <strong>Email:</strong> {user?.email}
            </div>
            <div>
              <strong>Tipo:</strong> {user?.type === 'admin' ? 'Administrador' : 'Cliente'}
            </div>
            {user?.phone && (
              <div>
                <strong>Telefone:</strong> {user.phone}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;