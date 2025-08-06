import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Register = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await register(formData);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setError(result.error || 'Erro ao criar conta');
      }
    } catch (error) {
      setError('Erro interno. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--cinza-claro)'
      }}>
        <div>Carregando...</div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, var(--rosa-suave) 0%, var(--white-principal) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'var(--white-principal)',
        padding: '3rem',
        borderRadius: 'var(--radius-large)',
        boxShadow: '0 10px 30px rgba(114, 47, 55, 0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <Link to="/" style={{
            fontSize: '2rem',
            fontWeight: '700',
            color: 'var(--wine-destaque)',
            textDecoration: 'none',
            fontFamily: 'Playfair Display, serif'
          }}>
            Fina Estampa
          </Link>
          <h2 style={{
            color: 'var(--preto-secundario)',
            marginTop: '1rem',
            marginBottom: '0.5rem'
          }}>
            Crie sua conta
          </h2>
          <p style={{ color: 'var(--cinza-medio)', margin: 0 }}>
            Junte-se à nossa comunidade
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--preto-secundario)',
              fontWeight: '500'
            }}>
              Nome completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid var(--cinza-claro)',
                borderRadius: 'var(--radius-medium)',
                fontSize: '1rem',
                transition: 'border-color var(--transition-normal)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--wine-destaque)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--cinza-claro)'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--preto-secundario)',
              fontWeight: '500'
            }}>
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid var(--cinza-claro)',
                borderRadius: 'var(--radius-medium)',
                fontSize: '1rem',
                transition: 'border-color var(--transition-normal)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--wine-destaque)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--cinza-claro)'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--preto-secundario)',
              fontWeight: '500'
            }}>
              Telefone (opcional)
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(11) 99999-9999"
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid var(--cinza-claro)',
                borderRadius: 'var(--radius-medium)',
                fontSize: '1rem',
                transition: 'border-color var(--transition-normal)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--wine-destaque)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--cinza-claro)'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--preto-secundario)',
              fontWeight: '500'
            }}>
              Senha
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="6"
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid var(--cinza-claro)',
                borderRadius: 'var(--radius-medium)',
                fontSize: '1rem',
                transition: 'border-color var(--transition-normal)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--wine-destaque)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--cinza-claro)'}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              color: 'var(--preto-secundario)',
              fontWeight: '500'
            }}>
              Confirmar senha
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1rem',
                border: '2px solid var(--cinza-claro)',
                borderRadius: 'var(--radius-medium)',
                fontSize: '1rem',
                transition: 'border-color var(--transition-normal)'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--wine-destaque)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--cinza-claro)'}
            />
          </div>

          {error && (
            <div style={{
              background: '#FEE2E2',
              color: '#DC2626',
              padding: '1rem',
              borderRadius: 'var(--radius-medium)',
              marginBottom: '1.5rem',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              background: isSubmitting ? 'var(--cinza-medio)' : 'var(--wine-destaque)',
              color: 'var(--white-principal)',
              padding: '1rem',
              border: 'none',
              borderRadius: 'var(--radius-medium)',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              transition: 'background var(--transition-normal)'
            }}
          >
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p style={{ color: 'var(--cinza-medio)', margin: 0 }}>
            Já tem uma conta?{' '}
            <Link to="/login" style={{
              color: 'var(--wine-destaque)',
              textDecoration: 'none',
              fontWeight: '500'
            }}>
              Faça login
            </Link>
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/" style={{
            color: 'var(--cinza-medio)',
            textDecoration: 'none',
            fontSize: '0.9rem'
          }}>
            ← Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;