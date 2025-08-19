import React, { useState } from 'react';
import { 
  FaCog, 
  FaStore,
  FaCreditCard,
  FaTruck,
  FaEnvelope,
  FaSave,
  FaEdit,
  FaPlus,
  FaTrash,
  FaMapMarkerAlt,
  FaPhone,
  FaGlobe,
  FaInstagram,
  FaWhatsapp
} from 'react-icons/fa';
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('store');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Configurações da loja
  const [storeSettings, setStoreSettings] = useState({
    name: 'Fina Estampa',
    description: 'Moda feminina com elegância e sofisticação',
    email: 'contato@finaestampa.com.br',
    phone: '(11) 99999-9999',
    whatsapp: '5511999999999',
    instagram: '@finaestampa',
    website: 'https://finaestampa.com.br',
    address: {
      street: 'Rua das Flores, 123',
      neighborhood: 'Centro',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    businessHours: {
      monday: { open: '09:00', close: '18:00', closed: false },
      tuesday: { open: '09:00', close: '18:00', closed: false },
      wednesday: { open: '09:00', close: '18:00', closed: false },
      thursday: { open: '09:00', close: '18:00', closed: false },
      friday: { open: '09:00', close: '18:00', closed: false },
      saturday: { open: '09:00', close: '16:00', closed: false },
      sunday: { open: '10:00', close: '14:00', closed: false }
    }
  });

  // Formas de pagamento
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'pix', name: 'PIX', enabled: true, description: 'Pagamento instantâneo' },
    { id: 'credit', name: 'Cartão de Crédito', enabled: true, description: 'Visa, Mastercard, Elo' },
    { id: 'debit', name: 'Cartão de Débito', enabled: true, description: 'Débito online' },
    { id: 'boleto', name: 'Boleto Bancário', enabled: false, description: 'Vencimento em 3 dias' }
  ]);

  // Formas de envio
  const [shippingMethods, setShippingMethods] = useState([
    { 
      id: 'correios', 
      name: 'Correios PAC', 
      enabled: true, 
      price: 15.00, 
      estimatedDays: '5-8 dias úteis',
      description: 'Entrega padrão dos Correios'
    },
    { 
      id: 'sedex', 
      name: 'Correios SEDEX', 
      enabled: true, 
      price: 25.00, 
      estimatedDays: '1-3 dias úteis',
      description: 'Entrega expressa dos Correios'
    },
    { 
      id: 'local', 
      name: 'Retirada na Loja', 
      enabled: true, 
      price: 0.00, 
      estimatedDays: 'Imediato',
      description: 'Retire em nossa loja física'
    }
  ]);

  // Configurações de email
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'contato@finaestampa.com.br',
    smtpPassword: '',
    fromName: 'Fina Estampa',
    fromEmail: 'contato@finaestampa.com.br',
    replyTo: 'contato@finaestampa.com.br'
  });

  const handleStoreInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setStoreSettings(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setStoreSettings(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setStoreSettings(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: {
          ...prev.businessHours[day],
          [field]: value
        }
      }
    }));
  };

  const handlePaymentToggle = (paymentId) => {
    setPaymentMethods(prev => prev.map(method => 
      method.id === paymentId 
        ? { ...method, enabled: !method.enabled }
        : method
    ));
  };

  const handleShippingToggle = (shippingId) => {
    setShippingMethods(prev => prev.map(method => 
      method.id === shippingId 
        ? { ...method, enabled: !method.enabled }
        : method
    ));
  };

  const handleShippingPriceChange = (shippingId, price) => {
    setShippingMethods(prev => prev.map(method => 
      method.id === shippingId 
        ? { ...method, price: parseFloat(price) || 0 }
        : method
    ));
  };

  const handleEmailInputChange = (field, value) => {
    setEmailSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Salvar no localStorage
      localStorage.setItem('storeSettings', JSON.stringify(storeSettings));
      localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
      localStorage.setItem('shippingMethods', JSON.stringify(shippingMethods));
      localStorage.setItem('emailSettings', JSON.stringify(emailSettings));
      
      alert('✅ Configurações salvas com sucesso!');
      setIsEditing(false);
    } catch (error) {
      alert('❌ Erro ao salvar configurações');
    } finally {
      setIsSaving(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const dayLabels = {
    monday: 'Segunda-feira',
    tuesday: 'Terça-feira',
    wednesday: 'Quarta-feira',
    thursday: 'Quinta-feira',
    friday: 'Sexta-feira',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

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
            Configure as informações gerais da sua loja
          </p>
        </div>
        
        <div className={styles.headerActions}>
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className={styles.editBtn}
            >
              <FaEdit /> Editar Configurações
            </button>
          ) : (
            <div className={styles.editActions}>
              <button 
                onClick={() => setIsEditing(false)}
                className={styles.cancelBtn}
                disabled={isSaving}
              >
                Cancelar
              </button>
              <button 
                onClick={handleSave}
                className={styles.saveBtn}
                disabled={isSaving}
              >
                <FaSave /> {isSaving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab('store')}
          className={`${styles.tab} ${activeTab === 'store' ? styles.activeTab : ''}`}
        >
          <FaStore /> Dados da Loja
        </button>
        <button
          onClick={() => setActiveTab('payment')}
          className={`${styles.tab} ${activeTab === 'payment' ? styles.activeTab : ''}`}
        >
          <FaCreditCard /> Formas de Pagamento
        </button>
        <button
          onClick={() => setActiveTab('shipping')}
          className={`${styles.tab} ${activeTab === 'shipping' ? styles.activeTab : ''}`}
        >
          <FaTruck /> Formas de Envio
        </button>
        <button
          onClick={() => setActiveTab('email')}
          className={`${styles.tab} ${activeTab === 'email' ? styles.activeTab : ''}`}
        >
          <FaEnvelope /> Configurações de Email
        </button>
      </div>

      {/* Conteúdo das Abas */}
      <div className={styles.tabContent}>
        {activeTab === 'store' && (
          <div className={styles.storeSettings}>
            {/* Informações Básicas */}
            <div className={styles.settingsSection}>
              <h3 className={styles.sectionTitle}>
                <FaStore /> Informações Básicas
              </h3>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Nome da Loja</label>
                  <input
                    type="text"
                    value={storeSettings.name}
                    onChange={(e) => handleStoreInputChange('name', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Descrição</label>
                  <textarea
                    value={storeSettings.description}
                    onChange={(e) => handleStoreInputChange('description', e.target.value)}
                    disabled={!isEditing}
                    rows="3"
                    className={styles.formTextarea}
                  />
                </div>
              </div>
            </div>

            {/* Contato */}
            <div className={styles.settingsSection}>
              <h3 className={styles.sectionTitle}>
                <FaPhone /> Informações de Contato
              </h3>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaEnvelope /> Email
                  </label>
                  <input
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) => handleStoreInputChange('email', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaPhone /> Telefone
                  </label>
                  <input
                    type="tel"
                    value={storeSettings.phone}
                    onChange={(e) => handleStoreInputChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaWhatsapp /> WhatsApp
                  </label>
                  <input
                    type="text"
                    value={storeSettings.whatsapp}
                    onChange={(e) => handleStoreInputChange('whatsapp', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="5511999999999"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaInstagram /> Instagram
                  </label>
                  <input
                    type="text"
                    value={storeSettings.instagram}
                    onChange={(e) => handleStoreInputChange('instagram', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="@usuario"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaGlobe /> Website
                  </label>
                  <input
                    type="url"
                    value={storeSettings.website}
                    onChange={(e) => handleStoreInputChange('website', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className={styles.settingsSection}>
              <h3 className={styles.sectionTitle}>
                <FaMapMarkerAlt /> Endereço da Loja
              </h3>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Rua e Número</label>
                  <input
                    type="text"
                    value={storeSettings.address.street}
                    onChange={(e) => handleStoreInputChange('address.street', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Bairro</label>
                  <input
                    type="text"
                    value={storeSettings.address.neighborhood}
                    onChange={(e) => handleStoreInputChange('address.neighborhood', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Cidade</label>
                  <input
                    type="text"
                    value={storeSettings.address.city}
                    onChange={(e) => handleStoreInputChange('address.city', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Estado</label>
                  <input
                    type="text"
                    value={storeSettings.address.state}
                    onChange={(e) => handleStoreInputChange('address.state', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    maxLength="2"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>CEP</label>
                  <input
                    type="text"
                    value={storeSettings.address.zipCode}
                    onChange={(e) => handleStoreInputChange('address.zipCode', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>
              </div>
            </div>

            {/* Horário de Funcionamento */}
            <div className={styles.settingsSection}>
              <h3 className={styles.sectionTitle}>
                �� Horário de Funcionamento
              </h3>
              
              <div className={styles.businessHours}>
                {Object.entries(storeSettings.businessHours).map(([day, hours]) => (
                  <div key={day} className={styles.daySchedule}>
                    <div className={styles.dayName}>
                      {dayLabels[day]}
                    </div>
                    
                    <div className={styles.dayControls}>
                      <label className={styles.closedLabel}>
                        <input
                          type="checkbox"
                          checked={hours.closed}
                          onChange={(e) => handleBusinessHoursChange(day, 'closed', e.target.checked)}
                          disabled={!isEditing}
                        />
                        Fechado
                      </label>
                      
                      {!hours.closed && (
                        <>
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)}
                            disabled={!isEditing}
                            className={styles.timeInput}
                          />
                          <span>às</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)}
                            disabled={!isEditing}
                            className={styles.timeInput}
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payment' && (
          <div className={styles.paymentSettings}>
            <div className={styles.settingsSection}>
              <h3 className={styles.sectionTitle}>
                <FaCreditCard /> Formas de Pagamento Aceitas
              </h3>
              
              <div className={styles.paymentMethods}>
                {paymentMethods.map((method) => (
                  <div key={method.id} className={styles.paymentMethod}>
                    <div className={styles.methodInfo}>
                      <h4 className={styles.methodName}>{method.name}</h4>
                      <p className={styles.methodDescription}>{method.description}</p>
                    </div>
                    
                    <div className={styles.methodControls}>
                      <label className={styles.toggleLabel}>
                        <input
                          type="checkbox"
                          checked={method.enabled}
                          onChange={() => handlePaymentToggle(method.id)}
                          disabled={!isEditing}
                          className={styles.toggleInput}
                        />
                        <span className={styles.toggleSlider}></span>
                      </label>
                      <span className={styles.toggleText}>
                        {method.enabled ? 'Ativo' : 'Inativo'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shipping' && (
          <div className={styles.shippingSettings}>
            <div className={styles.settingsSection}>
              <h3 className={styles.sectionTitle}>
                <FaTruck /> Formas de Envio Disponíveis
              </h3>
              
              <div className={styles.shippingMethods}>
                {shippingMethods.map((method) => (
                                   <div key={method.id} className={styles.shippingMethod}>
                    <div className={styles.methodHeader}>
                      <div className={styles.methodInfo}>
                        <h4 className={styles.methodName}>{method.name}</h4>
                        <p className={styles.methodDescription}>{method.description}</p>
                      </div>
                      
                      <div className={styles.methodControls}>
                        <label className={styles.toggleLabel}>
                          <input
                            type="checkbox"
                            checked={method.enabled}
                            onChange={() => handleShippingToggle(method.id)}
                            disabled={!isEditing}
                            className={styles.toggleInput}
                          />
                          <span className={styles.toggleSlider}></span>
                        </label>
                        <span className={styles.toggleText}>
                          {method.enabled ? 'Ativo' : 'Inativo'}
                        </span>
                      </div>
                    </div>
                    
                    <div className={styles.methodDetails}>
                      <div className={styles.methodField}>
                        <label className={styles.fieldLabel}>Preço:</label>
                        <input
                          type="number"
                          value={method.price}
                          onChange={(e) => handleShippingPriceChange(method.id, e.target.value)}
                          disabled={!isEditing}
                          step="0.01"
                          min="0"
                          className={styles.priceInput}
                        />
                        <span className={styles.currency}>R$</span>
                      </div>
                      
                      <div className={styles.methodField}>
                        <label className={styles.fieldLabel}>Prazo:</label>
                        <span className={styles.fieldValue}>{method.estimatedDays}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'email' && (
          <div className={styles.emailSettings}>
            <div className={styles.settingsSection}>
              <h3 className={styles.sectionTitle}>
                <FaEnvelope /> Configurações de Email
              </h3>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Servidor SMTP</label>
                  <input
                    type="text"
                    value={emailSettings.smtpHost}
                    onChange={(e) => handleEmailInputChange('smtpHost', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="smtp.gmail.com"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Porta SMTP</label>
                  <input
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) => handleEmailInputChange('smtpPort', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="587"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Usuário SMTP</label>
                  <input
                    type="email"
                    value={emailSettings.smtpUser}
                    onChange={(e) => handleEmailInputChange('smtpUser', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Senha SMTP</label>
                  <input
                    type="password"
                    value={emailSettings.smtpPassword}
                    onChange={(e) => handleEmailInputChange('smtpPassword', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                    placeholder="••••••••"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Nome do Remetente</label>
                  <input
                    type="text"
                    value={emailSettings.fromName}
                    onChange={(e) => handleEmailInputChange('fromName', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email do Remetente</label>
                  <input
                    type="email"
                    value={emailSettings.fromEmail}
                    onChange={(e) => handleEmailInputChange('fromEmail', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Email de Resposta</label>
                  <input
                    type="email"
                    value={emailSettings.replyTo}
                    onChange={(e) => handleEmailInputChange('replyTo', e.target.value)}
                    disabled={!isEditing}
                    className={styles.formInput}
                  />
                </div>
              </div>

              <div className={styles.emailNote}>
                <h4>📝 Importante:</h4>
                <p>
                  Essas configurações são usadas para envio de emails automáticos como:
                  confirmação de pedidos, recuperação de senha, newsletters, etc.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;