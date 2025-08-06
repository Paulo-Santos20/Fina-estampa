import React from 'react';
import { Link } from 'react-router-dom';

const Contact = () => {
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
        maxWidth: '600px'
      }}>
        <h1 style={{ color: 'var(--wine-destaque)', marginBottom: '1rem' }}>
          📞 Entre em Contato
        </h1>
        <h2 style={{ color: 'var(--preto-secundario)', marginBottom: '1rem' }}>
          Estamos aqui para ajudar!
        </h2>
        <p style={{ color: 'var(--cinza-medio)', marginBottom: '2rem' }}>
          Nossa equipe está sempre pronta para atender você da melhor forma possível.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          <div style={{
            padding: '1.5rem',
            background: 'var(--cinza-claro)',
            borderRadius: 'var(--radius-medium)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>��</div>
            <h3 style={{ color: 'var(--wine-destaque)', marginBottom: '0.5rem' }}>WhatsApp</h3>
            <p style={{ color: 'var(--preto-secundario)', fontWeight: '600', margin: 0 }}>
              (11) 99999-9999
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'var(--cinza-claro)',
            borderRadius: 'var(--radius-medium)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📧</div>
            <h3 style={{ color: 'var(--wine-destaque)', marginBottom: '0.5rem' }}>Email</h3>
            <p style={{ color: 'var(--preto-secundario)', fontWeight: '600', margin: 0 }}>
              contato@finaestampa.com.br
            </p>
          </div>

          <div style={{
            padding: '1.5rem',
            background: 'var(--cinza-claro)',
            borderRadius: 'var(--radius-medium)'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📍</div>
            <h3 style={{ color: 'var(--wine-destaque)', marginBottom: '0.5rem' }}>Localização</h3>
            <p style={{ color: 'var(--preto-secundario)', fontWeight: '600', margin: 0 }}>
              São Paulo - SP
            </p>
          </div>
        </div>

        <div style={{
          background: 'var(--rosa-suave)',
          padding: '2rem',
          borderRadius: 'var(--radius-medium)',
          marginBottom: '2rem'
        }}>
          <h3 style={{ color: 'var(--wine-destaque)', marginBottom: '1rem' }}>
            💬 Atendimento via WhatsApp
          </h3>
          <p style={{ color: 'var(--preto-secundario)', marginBottom: '1rem' }}>
            Nosso atendimento é personalizado e todos os pedidos são finalizados via WhatsApp 
            para garantir o melhor suporte.
          </p>
          <a
            href="https://wa.me/5511999999999"
            
            rel="noopener noreferrer"
            style={{
              background: '#25D366',
              color: 'white',
              padding: '1rem 2rem',
              textDecoration: 'none',
              borderRadius: 'var(--radius-medium)',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            📱 Conversar no WhatsApp
          </a>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/" style={{
            background: 'var(--wine-destaque)',
            color: 'var(--white-principal)',
            padding: '1rem 2rem',
            textDecoration: 'none',
            borderRadius: 'var(--radius-medium)',
            fontWeight: '600'
          }}>
            🏠 Página Inicial
          </Link>
          <Link to="/catalog" style={{
            background: 'transparent',
            color: 'var(--wine-destaque)',
            padding: '1rem 2rem',
            textDecoration: 'none',
            borderRadius: 'var(--radius-medium)',
            fontWeight: '600',
            border: '2px solid var(--wine-destaque)'
          }}>
            🛍️ Ver Produtos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Contact;