import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext.jsx'; // 💥 CORREÇÃO AQUI: Importa useAuth do AuthContext.jsx
import Layout from '../../components/common/Layout/Layout'; // Certifique-se de que o caminho está correto
import styles from './Register.module.css'; // Importa o módulo CSS

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para o loading do formulário
  const [errors, setErrors] = useState({}); // Mudar para objeto de erros para campos específicos

  const { register, isLoading: authLoading } = useAuth(); // Usar isLoading do useAuth
  const navigate = useNavigate();

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
    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefone é obrigatório';
    } else if (!/^\(?\d{2}\)?\s?\d{4,5}\-?\d{4}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Telefone inválido (ex: (11) 99999-9999)';
    }
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
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
      const result = await register(formData);
      
      if (result.success) {
        navigate('/dashboard', { replace: true });
      } else {
        setErrors({ general: result.error || 'Erro ao criar conta' });
      }
    } catch (error) {
      console.error('Erro no registro:', error);
      setErrors({ general: 'Erro interno do servidor. Tente novamente.' });
    } finally {
      setIsLoading(false); // Desativar loading local
    }
  }, [formData, validateForm, register, navigate]);

  const isFormLoading = isLoading || authLoading; // Combinar loadings

  return (
    <Layout>
      <div className={styles.registerPage}>
        <div className={styles.registerContainer}>
          <div className={styles.registerCard}>
            <div className={styles.registerHeader}>
              <h1 className={styles.registerTitle}>Criar Conta</h1>
              <p className={styles.registerSubtitle}>
                Junte-se à Fina Estampa
              </p>
            </div>

            {errors.general && (
              <div className={styles.errorMessage}>
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.registerForm}>
              <div className={styles.inputGroup}>
                <label htmlFor="name" className={styles.inputLabel}>
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  disabled={isFormLoading}
                  required
                />
                {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
              </div>

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
                <label htmlFor="phone" className={styles.inputLabel}>
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="(XX) XXXXX-XXXX"
                  className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                  disabled={isFormLoading}
                  required
                />
                {errors.phone && <span className={styles.fieldError}>{errors.phone}</span>}
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

              <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className={styles.inputLabel}>
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ''}`}
                  disabled={isFormLoading}
                  required
                />
                {errors.confirmPassword && <span className={styles.fieldError}>{errors.confirmPassword}</span>}
              </div>

              <button
                type="submit"
                disabled={isFormLoading}
                className={styles.submitButton}
              >
                {isFormLoading ? (
                  'Criando conta...'
                ) : (
                  <>
                    <FaUserPlus />
                    Criar Conta
                  </>
                )}
              </button>
            </form>

            <div className={styles.registerFooter}>
              <p className={styles.loginPrompt}>
                Já tem uma conta?
              </p>
              <Link
                to="/login"
                className={styles.loginLink}
              >
                Fazer login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;