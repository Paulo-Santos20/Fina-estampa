import React, { useState } from 'react';
import { 
  FaCog, FaStore, FaCreditCard, FaTruck, FaEnvelope, FaSave, 
  FaEdit, FaPlus, FaTrash, FaMapMarkerAlt, FaPhone, FaGlobe, 
  FaInstagram, FaWhatsapp, FaClock, FaCheck, FaTimes
} from 'react-icons/fa';
import { useToast } from '../../../components/ui/Toast'; // Assuming you have this
import styles from './SettingsPage.module.css';

const SettingsPage = () => {
  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState('store');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Store Settings State
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
      sunday: { open: '10:00', close: '14:00', closed: true }
    }
  });

  // Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 'pix', name: 'PIX', enabled: true, description: 'Pagamento instantâneo' },
    { id: 'credit', name: 'Cartão de Crédito', enabled: true, description: 'Visa, Mastercard, Elo' },
    { id: 'debit', name: 'Cartão de Débito', enabled: true, description: 'Débito online' },
    { id: 'boleto', name: 'Boleto Bancário', enabled: false, description: 'Vencimento em 3 dias' }
  ]);

  // Shipping Methods State
  const [shippingMethods, setShippingMethods] = useState([
    { 
      id: 'correios', name: 'Correios PAC', enabled: true, 
      price: 15.00, estimatedDays: '5-8 dias úteis', description: 'Entrega padrão'
    },
    { 
      id: 'sedex', name: 'Correios SEDEX', enabled: true, 
      price: 25.00, estimatedDays: '1-3 dias úteis', description: 'Entrega expressa'
    },
    { 
      id: 'local', name: 'Retirada na Loja', enabled: true, 
      price: 0.00, estimatedDays: 'Imediato', description: 'Retire em nossa loja física'
    }
  ]);

  // Email Settings State
  const [emailSettings, setEmailSettings] = useState({
    smtpHost: 'smtp.gmail.com',
    smtpPort: '587',
    smtpUser: 'contato@finaestampa.com.br',
    smtpPassword: '',
    fromName: 'Fina Estampa',
    fromEmail: 'contato@finaestampa.com.br',
    replyTo: 'contato@finaestampa.com.br'
  });

  // Handlers
  const handleStoreInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setStoreSettings(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setStoreSettings(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleBusinessHoursChange = (day, field, value) => {
    setStoreSettings(prev => ({
      ...prev,
      businessHours: {
        ...prev.businessHours,
        [day]: { ...prev.businessHours[day], [field]: value }
      }
    }));
  };

  const handlePaymentToggle = (id) => {
    if (!isEditing) return;
    setPaymentMethods(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const handleShippingToggle = (id) => {
    if (!isEditing) return;
    setShippingMethods(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  const handleShippingPriceChange = (id, price) => {
    setShippingMethods(prev => prev.map(m => m.id === id ? { ...m, price: parseFloat(price) || 0 } : m));
  };

  const handleEmailInputChange = (field, value) => {
    setEmailSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      // LocalStorage Sync
      localStorage.setItem('storeSettings', JSON.stringify(storeSettings));
      localStorage.setItem('paymentMethods', JSON.stringify(paymentMethods));
      localStorage.setItem('shippingMethods', JSON.stringify(shippingMethods));
      localStorage.setItem('emailSettings', JSON.stringify(emailSettings));
      
      showSuccess('Configurações salvas!');
      setIsEditing(false);
    } catch (error) {
      showError('Erro ao salvar.');
    } finally {
      setIsSaving(false);
    }
  };

  const dayLabels = {
    monday: 'Segunda', tuesday: 'Terça', wednesday: 'Quarta', thursday: 'Quinta',
    friday: 'Sexta', saturday: 'Sábado', sunday: 'Domingo'
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>
            <FaCog /> Configurações do Sistema
          </h2>
          <p className={styles.pageSubtitle}>
            Configure as informações gerais da sua loja
          </p>
        </div>
        
        <div className={styles.headerActions}>
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className={styles.editBtn}>
              <FaEdit /> Editar Configurações
            </button>
          ) : (
            <div className={styles.editGroup}>
              <button onClick={() => setIsEditing(false)} className={styles.cancelBtn} disabled={isSaving}>
                <FaTimes /> Cancelar
              </button>
              <button onClick={handleSave} className={styles.saveBtn} disabled={isSaving}>
                <FaSave /> {isSaving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsWrapper}>
        <button 
          onClick={() => setActiveTab('store')} 
          className={`${styles.tabBtn} ${activeTab === 'store' ? styles.activeTab : ''}`}
        >
          <FaStore /> Dados da Loja
        </button>
        <button 
          onClick={() => setActiveTab('payment')} 
          className={`${styles.tabBtn} ${activeTab === 'payment' ? styles.activeTab : ''}`}
        >
          <FaCreditCard /> Pagamentos
        </button>
        <button 
          onClick={() => setActiveTab('shipping')} 
          className={`${styles.tabBtn} ${activeTab === 'shipping' ? styles.activeTab : ''}`}
        >
          <FaTruck /> Envios
        </button>
        <button 
          onClick={() => setActiveTab('email')} 
          className={`${styles.tabBtn} ${activeTab === 'email' ? styles.activeTab : ''}`}
        >
          <FaEnvelope /> Email
        </button>
      </div>

      {/* --- TAB: DADOS DA LOJA --- */}
      {activeTab === 'store' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaStore /> Informações Básicas</h3>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Nome da Loja</label>
                <input 
                  type="text" 
                  value={storeSettings.name} 
                  onChange={(e) => handleStoreInputChange('name', e.target.value)} 
                  disabled={!isEditing} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Descrição</label>
                <input 
                  type="text" 
                  value={storeSettings.description} 
                  onChange={(e) => handleStoreInputChange('description', e.target.value)} 
                  disabled={!isEditing} 
                />
              </div>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaPhone /> Contato & Redes Sociais</h3>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label><FaEnvelope /> Email</label>
                <input 
                  type="email" 
                  value={storeSettings.email} 
                  onChange={(e) => handleStoreInputChange('email', e.target.value)} 
                  disabled={!isEditing} 
                />
              </div>
              <div className={styles.formGroup}>
                <label><FaPhone /> Telefone</label>
                <input 
                  type="tel" 
                  value={storeSettings.phone} 
                  onChange={(e) => handleStoreInputChange('phone', e.target.value)} 
                  disabled={!isEditing} 
                />
              </div>
              <div className={styles.formGroup}>
                <label><FaWhatsapp /> WhatsApp</label>
                <input 
                  type="text" 
                  value={storeSettings.whatsapp} 
                  onChange={(e) => handleStoreInputChange('whatsapp', e.target.value)} 
                  disabled={!isEditing} 
                />
              </div>
              <div className={styles.formGroup}>
                <label><FaInstagram /> Instagram</label>
                <input 
                  type="text" 
                  value={storeSettings.instagram} 
                  onChange={(e) => handleStoreInputChange('instagram', e.target.value)} 
                  disabled={!isEditing} 
                />
              </div>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaMapMarkerAlt /> Endereço</h3>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Rua</label>
                <input type="text" value={storeSettings.address.street} onChange={(e) => handleStoreInputChange('address.street', e.target.value)} disabled={!isEditing} />
              </div>
              <div className={styles.formGroup}>
                <label>Bairro</label>
                <input type="text" value={storeSettings.address.neighborhood} onChange={(e) => handleStoreInputChange('address.neighborhood', e.target.value)} disabled={!isEditing} />
              </div>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Cidade</label>
                  <input type="text" value={storeSettings.address.city} onChange={(e) => handleStoreInputChange('address.city', e.target.value)} disabled={!isEditing} />
                </div>
                <div className={styles.formGroup}>
                  <label>Estado</label>
                  <input type="text" value={storeSettings.address.state} onChange={(e) => handleStoreInputChange('address.state', e.target.value)} disabled={!isEditing} maxLength="2" />
                </div>
                <div className={styles.formGroup}>
                  <label>CEP</label>
                  <input type="text" value={storeSettings.address.zipCode} onChange={(e) => handleStoreInputChange('address.zipCode', e.target.value)} disabled={!isEditing} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaClock /> Horário de Funcionamento</h3>
            </div>
            <div className={styles.hoursGrid}>
              {Object.entries(storeSettings.businessHours).map(([day, hours]) => (
                <div key={day} className={styles.dayRow}>
                  <span className={styles.dayName}>{dayLabels[day]}</span>
                  <div className={styles.hoursControl}>
                    <label className={styles.checkboxLabel}>
                      <input 
                        type="checkbox" 
                        checked={hours.closed} 
                        onChange={(e) => handleBusinessHoursChange(day, 'closed', e.target.checked)} 
                        disabled={!isEditing} 
                      />
                      <span>Fechado</span>
                    </label>
                    {!hours.closed && (
                      <div className={styles.timeInputs}>
                        <input type="time" value={hours.open} onChange={(e) => handleBusinessHoursChange(day, 'open', e.target.value)} disabled={!isEditing} />
                        <span>às</span>
                        <input type="time" value={hours.close} onChange={(e) => handleBusinessHoursChange(day, 'close', e.target.value)} disabled={!isEditing} />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB: PAGAMENTOS --- */}
      {activeTab === 'payment' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaCreditCard /> Métodos de Pagamento</h3>
            </div>
            <div className={styles.listContainer}>
              {paymentMethods.map(method => (
                <div key={method.id} className={`${styles.listItem} ${!method.enabled ? styles.inactiveItem : ''}`}>
                  <div className={styles.listInfo}>
                    <h4>{method.name}</h4>
                    <p>{method.description}</p>
                  </div>
                  <div className={styles.listAction}>
                    <label className={styles.toggleSwitch}>
                      <input 
                        type="checkbox" 
                        checked={method.enabled} 
                        onChange={() => handlePaymentToggle(method.id)} 
                        disabled={!isEditing} 
                      />
                      <span className={styles.slider} />
                    </label>
                    <span className={styles.statusText}>{method.enabled ? 'Ativo' : 'Inativo'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB: ENVIOS --- */}
      {activeTab === 'shipping' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaTruck /> Métodos de Envio</h3>
            </div>
            <div className={styles.listContainer}>
              {shippingMethods.map(method => (
                <div key={method.id} className={`${styles.listItem} ${!method.enabled ? styles.inactiveItem : ''}`}>
                  <div className={styles.listInfo}>
                    <h4>{method.name}</h4>
                    <p>{method.description}</p>
                    <small>{method.estimatedDays}</small>
                  </div>
                  <div className={styles.shippingDetails}>
                    <div className={styles.priceInputGroup}>
                      <span>R$</span>
                      <input 
                        type="number" 
                        value={method.price} 
                        onChange={(e) => handleShippingPriceChange(method.id, e.target.value)} 
                        disabled={!isEditing}
                        step="0.01"
                      />
                    </div>
                    <label className={styles.toggleSwitch}>
                      <input 
                        type="checkbox" 
                        checked={method.enabled} 
                        onChange={() => handleShippingToggle(method.id)} 
                        disabled={!isEditing} 
                      />
                      <span className={styles.slider} />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB: EMAIL --- */}
      {activeTab === 'email' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionCard}>
            <div className={styles.cardHeader}>
              <h3><FaEnvelope /> Configurações SMTP</h3>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label>Servidor SMTP</label>
                <input 
                  type="text" 
                  value={emailSettings.smtpHost} 
                  onChange={(e) => handleEmailInputChange('smtpHost', e.target.value)} 
                  disabled={!isEditing} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Porta</label>
                <input 
                  type="number" 
                  value={emailSettings.smtpPort} 
                  onChange={(e) => handleEmailInputChange('smtpPort', e.target.value)} 
                  disabled={!isEditing} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Usuário</label>
                <input 
                  type="email" 
                  value={emailSettings.smtpUser} 
                  onChange={(e) => handleEmailInputChange('smtpUser', e.target.value)} 
                  disabled={!isEditing} 
                />
              </div>
              <div className={styles.formGroup}>
                <label>Senha</label>
                <input 
                  type="password" 
                  value={emailSettings.smtpPassword} 
                  onChange={(e) => handleEmailInputChange('smtpPassword', e.target.value)} 
                  disabled={!isEditing} 
                  placeholder="••••••••" 
                />
              </div>
            </div>
          </div>
          
          <div className={styles.noteBox}>
            <h4>ℹ️ Nota Importante</h4>
            <p>Estas configurações são usadas para enviar emails transacionais (recuperação de senha, confirmação de pedido).</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;