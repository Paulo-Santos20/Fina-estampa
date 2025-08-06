import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();

  if (cartItems.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'var(--cinza-claro)',
        display: 'flex',
        flexDirection: 'column',
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
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
          <h2 style={{ color: 'var(--wine-destaque)', marginBottom: '1rem' }}>
            Seu carrinho está vazio
          </h2>
          <p style={{ color: 'var(--cinza-medio)', marginBottom: '2rem' }}>
            Que tal dar uma olhada em nossos produtos incríveis?
          </p>
          <Link to="/catalog" style={{
            background: 'var(--wine-destaque)',
            color: 'var(--white-principal)',
            padding: '1rem 2rem',
            textDecoration: 'none',
            borderRadius: 'var(--radius-medium)',
            fontWeight: '600',
            display: 'inline-block'
          }}>
            Ver Produtos
          </Link>
        </div>
      </div>
    );
  }

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
            <h1 style={{ color: 'var(--wine-destaque)', margin: 0 }}>
              🛒 Meu Carrinho
            </h1>
            <Link to="/" style={{
              color: 'var(--cinza-medio)',
              textDecoration: 'none'
            }}>
              ← Continuar comprando
            </Link>
          </div>
          <p style={{ color: 'var(--cinza-medio)', margin: '0.5rem 0 0 0' }}>
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
          {/* Items do carrinho */}
          <div>
            {cartItems.map(item => (
              <div key={item.id} style={{
                background: 'var(--white-principal)',
                padding: '1.5rem',
                borderRadius: 'var(--radius-large)',
                marginBottom: '1rem',
                boxShadow: '0 4px 15px rgba(114, 47, 55, 0.1)',
                display: 'grid',
                gridTemplateColumns: '100px 1fr auto',
                gap: '1rem',
                alignItems: 'center'
              }}>
                {/* Imagem */}
                <div style={{
                  width: '100px',
                  height: '120px',
                  background: 'var(--cinza-claro)',
                  borderRadius: 'var(--radius-medium)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-medium)'
                      }}
                    />
                  ) : (
                    <span style={{ fontSize: '2rem' }}>👗</span>
                  )}
                </div>

                {/* Informações */}
                <div>
                  <h3 style={{ color: 'var(--preto-secundario)', margin: '0 0 0.5rem 0' }}>
                    {item.name}
                  </h3>
                  <p style={{ color: 'var(--cinza-medio)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                    {item.category}
                  </p>
                  {item.size && (
                    <p style={{ color: 'var(--cinza-medio)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                      Tamanho: {item.size}
                    </p>
                  )}
                  {item.color && (
                    <p style={{ color: 'var(--cinza-medio)', margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                      Cor: {item.color}
                    </p>
                  )}
                  <p style={{ color: 'var(--wine-destaque)', margin: 0, fontWeight: '600', fontSize: '1.1rem' }}>
                    R\$ {item.price.toFixed(2).replace('.', ',')}
                  </p>
                </div>

                {/* Controles */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        background: 'var(--cinza-claro)',
                        border: 'none',
                        borderRadius: 'var(--radius-small)',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      minWidth: '40px', 
                      textAlign: 'center',
                      fontWeight: '600'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        background: 'var(--cinza-claro)',
                        border: 'none',
                        borderRadius: 'var(--radius-small)',
                        width: '30px',
                        height: '30px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{
                      background: 'transparent',
                      color: '#DC2626',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button
                onClick={clearCart}
                style={{
                  background: 'transparent',
                  color: 'var(--cinza-medio)',
                  border: '1px solid var(--cinza-medio)',
                  padding: '0.8rem 1.5rem',
                  borderRadius: 'var(--radius-medium)',
                  cursor: 'pointer'
                }}
              >
                Limpar carrinho
              </button>
            </div>
          </div>

          {/* Resumo */}
          <div style={{
            background: 'var(--white-principal)',
            padding: '2rem',
            borderRadius: 'var(--radius-large)',
            boxShadow: '0 4px 15px rgba(114, 47, 55, 0.1)',
            height: 'fit-content'
          }}>
            <h3 style={{ color: 'var(--preto-secundario)', marginBottom: '1.5rem' }}>
              Resumo do pedido
            </h3>

            <div style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Subtotal:</span>
                <span>R\$ {getCartTotal().toFixed(2).replace('.', ',')}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Frete:</span>
                <span style={{ color: '#059669' }}>Grátis</span>
              </div>
              <hr style={{ border: 'none', borderTop: '1px solid var(--cinza-claro)', margin: '1rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '1.2rem' }}>
                <span>Total:</span>
                <span style={{ color: 'var(--wine-destaque)' }}>
                  R\$ {getCartTotal().toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {isAuthenticated ? (
              <Link to="/checkout" style={{
                display: 'block',
                background: 'var(--wine-destaque)',
                color: 'var(--white-principal)',
                padding: '1rem',
                textDecoration: 'none',
                borderRadius: 'var(--radius-medium)',
                fontWeight: '600',
                textAlign: 'center',
                marginBottom: '1rem'
              }}>
                Finalizar compra
              </Link>
            ) : (
              <div>
                <Link to="/login" style={{
                  display: 'block',
                  background: 'var(--wine-destaque)',
                  color: 'var(--white-principal)',
                  padding: '1rem',
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-medium)',
                  fontWeight: '600',
                  textAlign: 'center',
                  marginBottom: '0.5rem'
                }}>
                  Fazer login para finalizar
                </Link>
                <p style={{ fontSize: '0.9rem', color: 'var(--cinza-medio)', textAlign: 'center', margin: 0 }}>
                  ou{' '}
                  <Link to="/register" style={{ color: 'var(--wine-destaque)' }}>
                    criar uma conta
                  </Link>
                </p>
              </div>
            )}

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--cinza-claro)', borderRadius: 'var(--radius-medium)' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>💳 Formas de pagamento</h4>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--cinza-medio)' }}>
                PIX, Cartão de crédito, Débito ou Boleto
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;