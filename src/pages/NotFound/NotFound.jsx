import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
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
        padding: '4rem 3rem',
        borderRadius: 'var(--radius-large)',
        boxShadow: '0 4px 15px rgba(114, 47, 55, 0.1)',
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h1 style={{
          fontSize: '8rem',
          color: 'var(--wine-destaque)',
          margin: '0 0 1rem 0',
          fontWeight: '700',
          fontFamily: 'Playfair Display, serif'
        }}>
          404
        </h1>
        <h2 style={{
          color: 'var(--preto-secundario)',
          marginBottom: '1rem',
          fontSize: '2rem'
        }}>
          Página não encontrada
        </h2>
        <p style={{
          color: 'var(--cinza-medio)',
          marginBottom: '3rem',
          fontSize: '1.1rem',
          lineHeight: '1.6'
        }}>
          Ops! A página que você está procurando não existe ou foi movida. 
          Que tal dar uma olhada em nossos produtos incríveis?
        </p>
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link to="/" style={{
            background: 'var(--wine-destaque)',
            color: 'var(--white-principal)',
            padding: '1rem 2rem',
            textDecoration: 'none',
            borderRadius: 'var(--radius-medium)',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
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
            border: '2px solid var(--wine-destaque)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🛍️ Ver Produtos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;