import React, { useState, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaSignInAlt } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext.jsx'; // 💥 CORREÇÃO AQUI: Importa useAuth do AuthContext.jsx
import Layout from '../../components/common/Layout/Layout';
import styles from './Login.module.css'; // Importa o módulo CSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para o loading do formulário
  const [errors, setErrors] = useState({}); // Usar objeto para erros específicos e gerais

  const { login, isLoading: authLoading } = useAuth(); // Usar isLoading do useAuth
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpar erro específico do campo ao digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    // Limpar erro geral ao digitar
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: ''
      }));
    }
  }, [errors]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true); // Ativar loading local
    setErrors({}); // Limpar erros anteriores

    try {
      const result = await login(formData);
      
      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrors({ general: result.error || 'Email ou senha incorretos' });
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({ general: 'Erro interno do servidor. Tente novamente.' });
    } finally {
      setIsLoading(false); // Desativar loading local
    }
  }, [formData, validateForm, login, from, navigate]);

  const isFormLoading = isLoading || authLoading; // Combinar loadings

  return (
    <Layout>
      <div className={styles.loginPage}>
        <div className={styles.loginContainer}>
          <div className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <h1 className={styles.loginTitle}>Entrar</h1>
              <p className={styles.loginSubtitle}>
                Acesse sua conta na Fina Estampa
              </p>
            </div>

            {errors.general && (
              <div className={styles.errorMessage}>
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.inputGroup}>
                <label htmlFor="email" className={styles.inputLabel}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  disabled={isFormLoading}
                  required
                />
                {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password" className={styles.inputLabel}>
                  Senha
                </label>
                <div className={styles.inputWithIcon}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                    disabled={isFormLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className={styles.passwordToggleButton}
                    disabled={isFormLoading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
              </div>

              <button
                type="submit"
                disabled={isFormLoading}
                className={styles.submitButton}
              >
                {isFormLoading ? (
                  'Entrando...'
                ) : (
                  <>
                    <FaSignInAlt />
                    Entrar
                  </>
                )}
              </button>
            </form>

            <div className={styles.loginFooter}>
              <p className={styles.signupPrompt}>
                Ainda não tem uma conta?
              </p>
              <Link
                to="/register"
                className={styles.signupLink}
              >
                Criar conta
              </Link>
            </div>

            {/* Credenciais de teste */}
            <div className={styles.testCredentials}>
              <strong>Credenciais de teste:</strong><br />
              <strong>Admin:</strong> admin@finaestampa.com / admin123<br />
              <strong>Cliente:</strong> maria@email.com / 123456
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;