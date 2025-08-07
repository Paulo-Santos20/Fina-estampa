import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaGoogle, FaFacebook, FaCrown, FaUserTie } from 'react-icons/fa';
import styles from './Login.module.css';
import { useAuth } from '../../contexts/AuthContext.jsx';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading: authLoading, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // Contas de demonstração
  const demoAccounts = [
    {
      type: 'admin',
      name: 'Administrador',
      email: 'admin@finaestampa.com',
      password: 'admin123',
      icon: <FaCrown />,
      description: 'Acesso completo ao sistema',
      color: 'admin'
    },
    {
      type: 'customer',
      name: 'Cliente',
      email: 'maria@email.com',
      password: '123456',
      icon: <FaUserTie />,
      description: 'Experiência do cliente',
      color: 'customer'
    }
  ];

  // Handler para mudanças nos inputs
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // Toggle mostrar/esconder senha
  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // Validação do formulário
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.email) {
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

  // Login com conta de demonstração
  const handleDemoLogin = useCallback(async (account) => {
    setIsLoading(true);
    setErrors({});

    // Preencher os campos do formulário
    setFormData({
      email: account.email,
      password: account.password
    });

    try {
      const result = await login({
        email: account.email,
        password: account.password
      });

      if (result.success) {
        const redirectTo = account.type === 'admin' ? '/dashboard' : '/';
        navigate(redirectTo, { replace: true });
      } else {
        setErrors({
          general: result.error || 'Erro ao fazer login'
        });
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({
        general: 'Erro ao fazer login. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [login, navigate]);

  // Submit do formulário
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const result = await login(formData);

      if (result.success) {
        const redirectTo = result.user.role === 'admin' ? '/dashboard' : '/';
        navigate(redirectTo, { replace: true });
      } else {
        setErrors({
          general: result.error || 'Email ou senha incorretos'
        });
      }
    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({
        general: 'Erro interno. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  }, [formData, validateForm, login, navigate]);

  // Login com redes sociais
  const handleSocialLogin = useCallback((provider) => {
    console.log(`Login com ${provider} - Em desenvolvimento`);
    setErrors({
      general: `Login com ${provider} será implementado em breve!`
    });
  }, []);

  const isFormLoading = isLoading || authLoading;

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginCard}>
          {/* Header */}
          <div className={styles.loginHeader}>
            <Link to="/" className={styles.logoLink}>
              <span className={styles.logoText}>Fina</span>
              <span className={styles.logoAccent}>Estampa</span>
            </Link>
            <h1 className={styles.loginTitle}>Entrar na sua conta</h1>
            <p className={styles.loginSubtitle}>
              Bem-vinda de volta! Entre com seus dados
            </p>
          </div>

          {/* Contas de Demonstração */}
          <div className={styles.demoSection}>
            <h3 className={styles.demoTitle}>🚀 Acesso Rápido - Demonstração</h3>
            <div className={styles.demoAccounts}>
              {demoAccounts.map((account) => (
                <button
                  key={account.type}
                  onClick={() => handleDemoLogin(account)}
                  className={`${styles.demoButton} ${styles[account.color]}`}
                  disabled={isFormLoading}
                >
                  <div className={styles.demoIcon}>
                    {account.icon}
                  </div>
                  <div className={styles.demoInfo}>
                    <span className={styles.demoName}>{account.name}</span>
                    <span className={styles.demoDesc}>{account.description}</span>
                    <span className={styles.demoCredentials}>
                      {account.email}
                    </span>
                  </div>
                  <div className={styles.demoAction}>
                    {isFormLoading ? '⏳' : '→'}
                  </div>
                </button>
              ))}
            </div>
            <p className={styles.demoNote}>
              💡 Clique em qualquer botão acima para entrar automaticamente
            </p>
          </div>

          {/* Divisor */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>ou entre manualmente</span>
          </div>

          {/* Formulário */}
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            {/* Erro geral */}
            {errors.general && (
              <div className={styles.errorMessage}>
                {errors.general}
              </div>
            )}

            {/* Campo Email */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputLabel}>
                Email
              </label>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  disabled={isFormLoading}
                />
              </div>
              {errors.email && (
                <span className={styles.fieldError}>{errors.email}</span>
              )}
            </div>

            {/* Campo Senha */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>
                Senha
              </label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.inputIcon} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Sua senha"
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  disabled={isFormLoading}
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className={styles.passwordToggle}
                  disabled={isFormLoading}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <span className={styles.fieldError}>{errors.password}</span>
              )}
            </div>

            {/* Opções */}
            <div className={styles.loginOptions}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span className={styles.checkboxText}>Lembrar de mim</span>
              </label>
              <Link to="/esqueci-senha" className={styles.forgotPassword}>
                Esqueceu a senha?
              </Link>
            </div>

            {/* Botão Submit */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isFormLoading}
            >
              {isFormLoading ? (
                <span className={styles.loading}>Entrando...</span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Divisor */}
          <div className={styles.divider}>
            <span className={styles.dividerText}>ou continue com</span>
          </div>

          {/* Social Login */}
          <div className={styles.socialLogin}>
            <button
              type="button"
              onClick={() => handleSocialLogin('Google')}
              className={`${styles.socialButton} ${styles.googleButton}`}
              disabled={isFormLoading}
            >
              <FaGoogle />
              <span>Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin('Facebook')}
              className={`${styles.socialButton} ${styles.facebookButton}`}
              disabled={isFormLoading}
            >
              <FaFacebook />
              <span>Facebook</span>
            </button>
          </div>

          {/* Footer */}
          <div className={styles.loginFooter}>
            <p className={styles.signupText}>
              Não tem uma conta?{' '}
              <Link to="/register" className={styles.signupLink}>
                Criar conta
              </Link>
            </p>
            <p className={styles.backHome}>
              <Link to="/" className={styles.backHomeLink}>
                ← Voltar à página inicial
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;