import React, { useState } from 'react';
import { 
  FaCog, 
  FaSave, 
  FaStore, 
  FaCreditCard, 
  FaTruck, 
  FaEnvelope, 
  FaWhatsapp,
  FaEdit,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaGlobe,
  FaPalette
} from 'react-icons/fa';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('store');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    // Configurações da Loja
    storeName: 'Fina Estampa',
    storeDescription: 'Moda feminina elegante e sofisticada',
    storeEmail: 'contato@finaestampa.com.br',
    storePhone: '(11) 99999-9999',
    storeWhatsapp: '5511999999999',
    storeAddress: 'Rua das Flores, 123 - Vila Madalena, São Paulo - SP',
    storeCNPJ: '12.345.678/0001-90',
    
    // Configurações de Pagamento
    pixKey: 'contato@finaestampa.com.br',
    pixKeyType: 'email',
    bankAccount: '12345-6',
    bankAgency: '1234',
    bankName: 'Banco do Brasil',
    
    // Configurações de Frete
    freeShippingValue: 250.00,
    defaultShippingCost: 15.00,
    shippingDays: '5-10',
    
    // Configurações de Email
    emailHost: 'smtp.gmail.com',
    emailPort: '587',
    emailUser: 'contato@finaestampa.com.br',
    emailPassword: '',
    
    // Configurações Gerais
    siteName: 'Fina Estampa',
    siteUrl: 'https://finaestampa.com.br',
    primaryColor: '#722F37',
    secondaryColor: '#D4AF37',
    
    // Configurações de Segurança
    enableTwoFactor: false,
    sessionTimeout: 60,
    maxLoginAttempts: 5
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = (section) => {
    alert(`✅ Configurações de ${section} salvas com sucesso!`);
  };

  const tabs = [
    { id: 'store', label: 'Loja', icon: FaStore },
    { id: 'payment', label: 'Pagamento', icon: FaCreditCard },
    { id: 'shipping', label: 'Frete', icon: FaTruck },
    { id: 'email', label: 'Email', icon: FaEnvelope },
    { id: 'general', label: 'Geral', icon: FaGlobe },
    { id: 'security', label: 'Segurança', icon: FaShieldAlt }
  ];

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaCog />
            Configurações do Sistema
          </h2>
          <p className={styles.pageSubtitle}>
            Configure todas as opções da sua loja
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <div className={styles.tabsList}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`${styles.tab} ${activeTab === tab.id ? styles.tabActive : ''}`}
            >
              <tab.icon />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className={styles.tabContent}>
        {/* Configurações da Loja */}
        {activeTab === 'store' && (
          <div className={styles.settingsSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaStore /> Informações da Loja
              </h3>
              <button 
                onClick={() => handleSave('Loja')}
                className={styles.saveBtn}
              >
                <FaSave /> Salvar
              </button>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nome da Loja</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email de Contato</label>
                <input
                  type="email"
                  name="storeEmail"
                  value={formData.storeEmail}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Telefone</label>
                <input
                  type="tel"
                  name="storePhone"
                  value={formData.storePhone}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>WhatsApp (com código do país)</label>
                <input
                  type="text"
                  name="storeWhatsapp"
                  value={formData.storeWhatsapp}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="5511999999999"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>CNPJ</label>
                <input
                  type="text"
                  name="storeCNPJ"
                  value={formData.storeCNPJ}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.formLabel}>Descrição da Loja</label>
                <textarea
                  name="storeDescription"
                  value={formData.storeDescription}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  rows="3"
                />
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.formLabel}>Endereço Completo</label>
                <textarea
                  name="storeAddress"
                  value={formData.storeAddress}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  rows="2"
                />
              </div>
            </div>
          </div>
        )}

        {/* Configurações de Pagamento */}
        {activeTab === 'payment' && (
          <div className={styles.settingsSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaCreditCard /> Configurações de Pagamento
              </h3>
              <button 
                onClick={() => handleSave('Pagamento')}
                className={styles.saveBtn}
              >
                <FaSave /> Salvar
              </button>
            </div>

            <div className={styles.paymentSections}>
              <div className={styles.paymentCard}>
                <h4 className={styles.cardTitle}>PIX</h4>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Tipo de Chave PIX</label>
                    <select
                      name="pixKeyType"
                      value={formData.pixKeyType}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                    >
                      <option value="email">Email</option>
                      <option value="phone">Telefone</option>
                      <option value="cpf">CPF</option>
                      <option value="cnpj">CNPJ</option>
                      <option value="random">Chave Aleatória</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Chave PIX</label>
                    <input
                      type="text"
                      name="pixKey"
                      value={formData.pixKey}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.paymentCard}>
                <h4 className={styles.cardTitle}>Dados Bancários</h4>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Banco</label>
                    <input
                      type="text"
                      name="bankName"
                      value={formData.bankName}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Agência</label>
                    <input
                      type="text"
                      name="bankAgency"
                      value={formData.bankAgency}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Conta</label>
                    <input
                      type="text"
                      name="bankAccount"
                      value={formData.bankAccount}
                      onChange={handleInputChange}
                      className={styles.formInput}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configurações de Frete */}
        {activeTab === 'shipping' && (
          <div className={styles.settingsSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaTruck /> Configurações de Frete
              </h3>
              <button 
                onClick={() => handleSave('Frete')}
                className={styles.saveBtn}
              >
                <FaSave /> Salvar
              </button>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Valor para Frete Grátis (R\$)</label>
                <input
                  type="number"
                  name="freeShippingValue"
                  value={formData.freeShippingValue}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Custo Padrão de Frete (R\$)</label>
                <input
                  type="number"
                  name="defaultShippingCost"
                  value={formData.defaultShippingCost}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  min="0"
                  step="0.01"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Prazo de Entrega (dias)</label>
                <input
                  type="text"
                  name="shippingDays"
                  value={formData.shippingDays}
                  onChange={handleInputChange}
                  className={styles.formInput}
                  placeholder="5-10"
                />
              </div>
            </div>

            <div className={styles.infoCard}>
              <h4>ℹ️ Informações sobre Frete</h4>
              <ul>
                <li>Pedidos acima de R\$ {formData.freeShippingValue?.toFixed(2)} têm frete grátis</li>
                <li>Custo padrão: R\$ {formData.defaultShippingCost?.toFixed(2)}</li>
                <li>Prazo de entrega: {formData.shippingDays} dias úteis</li>
              </ul>
            </div>
          </div>
        )}

        {/* Configurações de Email */}
        {activeTab === 'email' && (
          <div className={styles.settingsSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaEnvelope /> Configurações de Email
              </h3>
              <button 
                onClick={() => handleSave('Email')}
                className={styles.saveBtn}
              >
                <FaSave /> Salvar
              </button>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Servidor SMTP</label>
                <input
                  type="text"
                  name="emailHost"
                  value={formData.emailHost}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Porta</label>
                <input
                  type="text"
                  name="emailPort"
                  value={formData.emailPort}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email de Envio</label>
                <input
                  type="email"
                  name="emailUser"
                  value={formData.emailUser}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Senha do Email</label>
                <div className={styles.passwordGroup}>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="emailPassword"
                    value={formData.emailPassword}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={styles.passwordToggle}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className={styles.testEmailSection}>
              <button className={styles.testBtn}>
                <FaEnvelope /> Testar Configuração de Email
              </button>
            </div>
          </div>
        )}

        {/* Configurações Gerais */}
        {activeTab === 'general' && (
          <div className={styles.settingsSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaGlobe /> Configurações Gerais
              </h3>
              <button 
                onClick={() => handleSave('Geral')}
                className={styles.saveBtn}
              >
                <FaSave /> Salvar
              </button>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nome do Site</label>
                <input
                  type="text"
                  name="siteName"
                  value={formData.siteName}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>URL do Site</label>
                <input
                  type="url"
                  name="siteUrl"
                  value={formData.siteUrl}
                  onChange={handleInputChange}
                  className={styles.formInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Cor Primária</label>
                <div className={styles.colorGroup}>
                  <input
                    type="color"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleInputChange}
                    className={styles.colorInput}
                  />
                  <input
                    type="text"
                    name="primaryColor"
                    value={formData.primaryColor}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Cor Secundária</label>
                <div className={styles.colorGroup}>
                  <input
                    type="color"
                    name="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={handleInputChange}
                    className={styles.colorInput}
                  />
                  <input
                    type="text"
                    name="secondaryColor"
                    value={formData.secondaryColor}
                    onChange={handleInputChange}
                    className={styles.formInput}
                  />
                </div>
              </div>
            </div>

            <div className={styles.previewSection}>
              <h4>🎨 Preview das Cores</h4>
              <div className={styles.colorPreview}>
                <div 
                  className={styles.colorSample}
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  Cor Primária
                </div>
                <div 
                  className={styles.colorSample}
                  style={{ backgroundColor: formData.secondaryColor }}
                >
                  Cor Secundária
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Configurações de Segurança */}
        {activeTab === 'security' && (
          <div className={styles.settingsSection}>
            <div className={styles.sectionHeader}>
              <h3 className={styles.sectionTitle}>
                <FaShieldAlt /> Configurações de Segurança
              </h3>
              <button 
                onClick={() => handleSave('Segurança')}
                className={styles.saveBtn}
              >
                <FaSave /> Salvar
              </button>
            </div>

            <div className={styles.securityOptions}>
              <div className={styles.securityCard}>
                <div className={styles.securityHeader}>
                  <h4>🔐 Autenticação de Dois Fatores</h4>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      name="enableTwoFactor"
                      checked={formData.enableTwoFactor}
                      onChange={handleInputChange}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <p>Adicione uma camada extra de segurança à sua conta</p>
              </div>

              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Timeout de Sessão (minutos)</label>
                  <input
                    type="number"
                    name="sessionTimeout"
                    value={formData.sessionTimeout}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    min="5"
                    max="480"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Máximo de Tentativas de Login</label>
                  <input
                    type="number"
                    name="maxLoginAttempts"
                    value={formData.maxLoginAttempts}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    min="3"
                    max="10"
                  />
                </div>
              </div>

              <div className={styles.securityActions}>
                <button className={styles.dangerBtn}>
                  🔄 Forçar Logout em Todos os Dispositivos
                </button>
                <button className={styles.dangerBtn}>
                  🗑️ Limpar Logs de Segurança
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;