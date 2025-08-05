import React from 'react';
import { FaTag, FaCopy } from 'react-icons/fa';
import styles from '../Dashboard.module.css';

const CouponsPage = ({ user, timeRange }) => {
  const coupons = [
    {
      id: 1,
      title: 'FRETE GRÁTIS',
      description: 'Frete grátis em compras acima de R\$ 199,90',
      code: 'FINAFRETE',
      discount: 'Frete Grátis',
      expiry: '2024-12-31',
      used: false
    },
    {
      id: 2,
      title: '15% OFF',
      description: 'Desconto em toda a coleção de vestidos',
      code: 'VESTIDO15',
      discount: '15%',
      expiry: '2024-12-25',
      used: false
    },
    {
      id: 3,
      title: '10% OFF',
      description: 'Desconto para primeira compra',
      code: 'BEMVINDA10',
      discount: '10%',
      expiry: '2024-12-30',
      used: true
    }
  ];

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Cupom ${code} copiado!`);
  };

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <FaTag className={styles.sectionIcon} />
          Meus Cupons de Desconto
        </h2>
      </div>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {coupons.map((coupon) => (
          <div key={coupon.id} style={{
            background: coupon.used ? 'var(--cinza-claro)' : 'linear-gradient(135deg, var(--wine-destaque), var(--preto-secundario))',
            color: coupon.used ? 'var(--cinza-medio)' : 'var(--white-principal)',
            borderRadius: 'var(--radius-medium)',
            padding: '1.5rem',
            position: 'relative',
            opacity: coupon.used ? 0.6 : 1
          }}>
            {coupon.used && (
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: '#EF4444',
                color: 'white',
                padding: '0.3rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.7rem',
                fontWeight: '600'
              }}>
                USADO
              </div>
            )}
            
            <h4 style={{ 
              margin: '0 0 0.8rem 0', 
              fontSize: '1.3rem',
              fontWeight: '700'
            }}>
              {coupon.title}
            </h4>
            
            <p style={{ 
              margin: '0 0 1.2rem 0', 
              fontSize: '1rem',
              opacity: 0.9,
              lineHeight: '1.5'
            }}>
              {coupon.description}
            </p>
            
            <div style={{
              background: coupon.used ? 'var(--white-principal)' : 'var(--white-principal)',
              color: 'var(--wine-destaque)',
              padding: '0.8rem 1.2rem',
              borderRadius: 'var(--radius-medium)',
              marginBottom: '1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '1.1rem',
                fontWeight: '700',
                letterSpacing: '1px'
              }}>
                {coupon.code}
              </span>
              
              {!coupon.used && (
                               <button
                  onClick={() => copyToClipboard(coupon.code)}
                  style={{
                    background: 'var(--wine-destaque)',
                    border: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-medium)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem'
                  }}
                  title="Copiar código"
                >
                  <FaCopy />
                </button>
              )}
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              fontSize: '0.9rem',
              opacity: 0.8
            }}>
              <span>Desconto: {coupon.discount}</span>
              <span>Válido até: {new Date(coupon.expiry).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        ))}
      </div>
      
      {coupons.filter(c => !c.used).length === 0 && (
        <div style={{ 
          textAlign: 'center', 
          padding: '3rem', 
          color: 'var(--cinza-medio)' 
        }}>
          <FaTag style={{ fontSize: '3rem', marginBottom: '1rem' }} />
          <p>Você não possui cupons disponíveis no momento</p>
        </div>
      )}
    </section>
  );
};

export default CouponsPage;