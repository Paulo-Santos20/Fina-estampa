import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUser, FaLock, FaGoogle } from 'react-icons/fa';
import styles from './Login.module.css';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // 1. Redirecionar se já estiver logado
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  // 2. Manipular Inputs
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpa erros ao digitar
    if (errors[name] || errors.general) {
      setErrors(prev => ({ ...prev, [name]: '', general: '' }));
    }
  }, [errors]);

  // 3. Alternar visibilidade da senha
  const toggleShowPassword = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  // 4. Validação (Agora com Regex de Email)
  const validateForm = useCallback(() => {
    const newErrors = {};
    const emailRegex = /\S+@\S+\.\S+/;

    if (!formData.email) {
      newErrors.email = 'Email é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Digite um email válido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter no mínimo 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  // 5. Tradutor de Erros do Firebase
  const handleFirebaseError = (errorCode) => {
    switch (errorCode) {
      case 'auth/invalid-email':
        return 'O email informado é inválido.';
      case 'auth/user-disabled':
        return 'Esta conta foi desativada.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Email ou senha incorretos.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Aguarde alguns instantes.';
      default:
        return 'Ocorreu um erro inesperado. Tente novamente.';
    }
  };

  // 6. Login com Email/Senha
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await login(formData.email, formData.password);
      // Redirecionamento é tratado pelo useEffect
    } catch (error) {
      console.error('Erro no login:', error.code);
      setErrors({ general: handleFirebaseError(error.code) });
      setIsSubmitting(false);
    }
  }, [formData, validateForm, login]);

  // 7. Login com Google
  const handleSocialLogin = useCallback(async () => {
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      // Redirecionamento é tratado pelo useEffect
    } catch (error) {
      console.error('Erro no Google Login:', error);
      // Popup closed by user não é um erro crítico para exibir
      if (error.code !== 'auth/popup-closed-by-user') {
        setErrors({ general: 'Não foi possível conectar com o Google.' });
      }
      setIsSubmitting(false);
    }
  }, [loginWithGoogle]);

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

          {/* Formulário */}
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            
            {/* Mensagem de Erro Geral */}
            {errors.general && (
              <div className={styles.errorMessage}>
                {errors.general}
              </div>
            )}

            {/* Input Email */}
            <div className={styles.inputGroup}>
              <label htmlFor="email" className={styles.inputLabel}>Email</label>
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
                  disabled={isSubmitting}
                  autoComplete="email"
                />
              </div>
              {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
            </div>

            {/* Input Senha */}
            <div className={styles.inputGroup}>
              <label htmlFor="password" className={styles.inputLabel}>Senha</label>
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
                  disabled={isSubmitting}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className={styles.passwordToggle}
                  disabled={isSubmitting}
                  tabIndex="-1" // Evita foco ao dar tab
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
            </div>

            {/* Opções Extras */}
            <div className={styles.loginOptions}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" className={styles.checkbox} />
                <span>Lembrar de mim</span>
              </label>
              <Link to="/esqueci-senha" className={styles.forgotPassword}>
                Esqueceu a senha?
              </Link>
            </div>

            {/* Botão de Entrar */}
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
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
              onClick={handleSocialLogin}
              className={`${styles.socialButton} ${styles.googleButton}`}
              disabled={isSubmitting}
            >
              <FaGoogle />
              <span>Google</span>
            </button>
          </div>

          {/* Footer do Card */}
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