import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt, FaHome, FaBuilding } from 'react-icons/fa';
import styles from './CheckoutForm.module.css';

const CheckoutForm = ({ title, data, onUpdate, type }) => {
  const [errors, setErrors] = useState({});

  // Validar CEP e buscar endereço
  const handleCepChange = async (cep) => {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length === 8) {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
        const addressData = await response.json();
        
        if (!addressData.erro) {
          onUpdate({
            cep: cleanCep,
            street: addressData.logradouro,
            neighborhood: addressData.bairro,
            city: addressData.localidade,
            state: addressData.uf
          });
        }
      } catch (error) {
        console.error('Erro ao buscar CEP:', error);
      }
    }
    
    onUpdate({ cep: cleanCep });
  };

  // Formatar telefone
  const formatPhone = (phone) => {
    const clean = phone.replace(/\D/g, '');
    if (clean.length <= 11) {
      return clean.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return phone;
  };

  // Formatar CPF
  const formatCpf = (cpf) => {
    const clean = cpf.replace(/\D/g, '');
    if (clean.length <= 11) {
      return clean.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
  };

  // Validar email
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Manipular mudanças nos campos
  const handleChange = (field, value) => {
    let formattedValue = value;
    
    // Aplicar formatações específicas
    if (field === 'phone') {
      formattedValue = formatPhone(value);
    } else if (field === 'cpf') {
      formattedValue = formatCpf(value);
    } else if (field === 'cep') {
      handleCepChange(value);
      return;
    }
    
    onUpdate({ [field]: formattedValue });
    
    // Limpar erro do campo
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  // Renderizar campos do cliente
  const renderCustomerFields = () => (
    <div className={styles.fieldsGrid}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <FaUser />
          Nome Completo *
        </label>
        <input
          type="text"
          value={data.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`${styles.fieldInput} ${errors.name ? styles.error : ''}`}
          placeholder="Seu nome completo"
          required
        />
        {errors.name && <span className={styles.errorMessage}>{errors.name}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <FaEnvelope />
          Email *
        </label>
        <input
          type="email"
          value={data.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`${styles.fieldInput} ${errors.email ? styles.error : ''}`}
          placeholder="seu@email.com"
          required
        />
        {errors.email && <span className={styles.errorMessage}>{errors.email}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <FaPhone />
          Telefone *
        </label>
        <input
          type="tel"
          value={data.phone || ''}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={`${styles.fieldInput} ${errors.phone ? styles.error : ''}`}
          placeholder="(11) 99999-9999"
          required
        />
        {errors.phone && <span className={styles.errorMessage}>{errors.phone}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <FaIdCard />
          CPF
        </label>
        <input
          type="text"
          value={data.cpf || ''}
          onChange={(e) => handleChange('cpf', e.target.value)}
          className={styles.fieldInput}
          placeholder="000.000.000-00"
        />
      </div>
    </div>
  );

  // Renderizar campos de endereço
  const renderAddressFields = () => (
    <div className={styles.fieldsGrid}>
      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <FaMapMarkerAlt />
          CEP *
        </label>
        <input
          type="text"
          value={data.cep || ''}
          onChange={(e) => handleCepChange(e.target.value)}
          className={`${styles.fieldInput} ${errors.cep ? styles.error : ''}`}
          placeholder="00000-000"
          maxLength="9"
          required
        />
        {errors.cep && <span className={styles.errorMessage}>{errors.cep}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <FaHome />
          Endereço *
        </label>
        <input
          type="text"
          value={data.street || ''}
          onChange={(e) => handleChange('street', e.target.value)}
          className={`${styles.fieldInput} ${errors.street ? styles.error : ''}`}
          placeholder="Rua, Avenida..."
          required
        />
        {errors.street && <span className={styles.errorMessage}>{errors.street}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          Número *
        </label>
        <input
          type="text"
          value={data.number || ''}
          onChange={(e) => handleChange('number', e.target.value)}
          className={`${styles.fieldInput} ${errors.number ? styles.error : ''}`}
          placeholder="123"
          required
        />
        {errors.number && <span className={styles.errorMessage}>{errors.number}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          <FaBuilding />
          Complemento
        </label>
        <input
          type="text"
          value={data.complement || ''}
          onChange={(e) => handleChange('complement', e.target.value)}
          className={styles.fieldInput}
          placeholder="Apto, Bloco..."
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          Bairro *
        </label>
        <input
          type="text"
          value={data.neighborhood || ''}
          onChange={(e) => handleChange('neighborhood', e.target.value)}
          className={`${styles.fieldInput} ${errors.neighborhood ? styles.error : ''}`}
          placeholder="Seu bairro"
          required
        />
        {errors.neighborhood && <span className={styles.errorMessage}>{errors.neighborhood}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          Cidade *
        </label>
        <input
          type="text"
          value={data.city || ''}
          onChange={(e) => handleChange('city', e.target.value)}
          className={`${styles.fieldInput} ${errors.city ? styles.error : ''}`}
          placeholder="Sua cidade"
          required
        />
        {errors.city && <span className={styles.errorMessage}>{errors.city}</span>}
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.fieldLabel}>
          Estado *
        </label>
        <select
          value={data.state || ''}
          onChange={(e) => handleChange('state', e.target.value)}
          className={`${styles.fieldInput} ${errors.state ? styles.error : ''}`}
          required
        >
          <option value="">Selecione</option>
          <option value="SP">São Paulo</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="MG">Minas Gerais</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="PR">Paraná</option>
          <option value="SC">Santa Catarina</option>
          <option value="BA">Bahia</option>
          <option value="GO">Goiás</option>
          <option value="ES">Espírito Santo</option>
          <option value="DF">Distrito Federal</option>
          {/* Adicionar outros estados conforme necessário */}
        </select>
        {errors.state && <span className={styles.errorMessage}>{errors.state}</span>}
      </div>
    </div>
  );

  return (
    <div className={styles.formContainer}>
      <h2 className={styles.formTitle}>{title}</h2>
      
      <div className={styles.formContent}>
        {type === 'customer' ? renderCustomerFields() : renderAddressFields()}
      </div>
    </div>
  );
};

export default CheckoutForm;