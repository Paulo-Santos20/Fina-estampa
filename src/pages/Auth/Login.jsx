// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext.jsx';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError('Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  // Login automático como admin
  const handleAdminLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await login('admin@finaestampa.com', 'admin123');
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao fazer login como admin');
    } finally {
      setLoading(false);
    }
  };

  // Login automático como usuário
  const handleUserLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      await login('usuario@finaestampa.com', 'user123');
      navigate('/dashboard');
    } catch (err) {
      setError('Erro ao fazer login como usuário');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          <div className={styles.loginHeader}>
            <h1 className={styles.loginTitle}>Entrar na sua conta</h1>
            <p className={styles.loginSubtitle}>
              Bem-vinda de volta à Fina Estampa
            </p>
          </div>

          {error && (
            <div className={styles.errorMessage}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.loginForm}>
            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder="seu@email.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password" className={styles.label}>
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder="Sua senha"
                required
              />
            </div>

            <div className={styles.formOptions}>
              <label className={styles.checkbox}>
                <input type="checkbox" />
                <span className={styles.checkmark}></span>
                Lembrar de mim
              </label>
              <Link to="/forgot-password" className={styles.forgotLink}>
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              className={styles.loginButton}
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          {/* Botões de login automático para desenvolvimento */}
          <div className={styles.devButtons}>
            <h3 className={styles.devTitle}>Acesso rápido (desenvolvimento)</h3>
            <div className={styles.devButtonsRow}>
              <button
                onClick={handleAdminLogin}
                className={styles.devButton}
                disabled={loading}
              >
                🔧 Entrar como Admin
              </button>
              <button
                onClick={handleUserLogin}
                className={styles.devButton}
                disabled={loading}
              >
                👤 Entrar como Usuário
              </button>
            </div>
          </div>

          <div className={styles.loginFooter}>
            <p className={styles.signupText}>
              Não tem uma conta?{' '}
              <Link to="/register" className={styles.signupLink}>
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;