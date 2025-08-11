// src/pages/Admin/Content/components/PaymentSettingsPanel.jsx
import React from 'react';
import { FaCreditCard, FaPlus, FaTrash, FaShieldAlt } from 'react-icons/fa';
import styles from './SettingsPanel.module.css';

export default function PaymentSettingsPanel({ settings, onChange }) {
  const updateSettings = (section, updates) => {
    onChange({
      ...settings,
      [section]: {
        ...settings[section],
        ...updates
      }
    });
  };

  const updateMethod = (methodId, updates) => {
    const methods = settings.methods.map(method =>
      method.id === methodId ? { ...method, ...updates } : method
    );
    onChange({ ...settings, methods });
  };

  const addMethod = () => {
    const newMethod = {
      id: Date.now().toString(),
      name: 'Novo Método',
      icon: 'credit-card',
      active: true
    };
    onChange({
      ...settings,
      methods: [...settings.methods, newMethod]
    });
  };

  const removeMethod = (methodId) => {
    const methods = settings.methods.filter(method => method.id !== methodId);
    onChange({ ...settings, methods });
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Configurações de Pagamento</h2>
      
      {/* Métodos de Pagamento */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <FaCreditCard /> Métodos de Pagamento
          </h3>
          <button onClick={addMethod} className={styles.addBtn}>
            <FaPlus /> Adicionar Método
          </button>
        </div>

        <div className={styles.methodsList}>
          {settings.methods.map((method) => (
            <div key={method.id} className={styles.methodCard}>
              <div className={styles.methodInfo}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nome</label>
                  <input
                    type="text"
                    value={method.name}
                    onChange={(e) => updateMethod(method.id, { name: e.target.value })}
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Ícone</label>
                  <select
                    value={method.icon}
                    onChange={(e) => updateMethod(method.id, { icon: e.target.value })}
                    className={styles.input}
                  >
                    <option value="pix">PIX</option>
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="boleto">Boleto</option>
                    <option value="credit-card">Cartão Genérico</option>
                  </select>
                </div>

                <div className={styles.methodActions}>
                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={method.active}
                      onChange={(e) => updateMethod(method.id, { active: e.target.checked })}
                    />
                    Ativo
                  </label>
                  
                  <button
                    onClick={() => removeMethod(method.id)}
                    className={styles.deleteBtn}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parcelamento */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={settings.installments.enabled}
              onChange={(e) => updateSettings('installments', { enabled: e.target.checked })}
            />
            Parcelamento
          </label>
        </h3>

        {settings.installments.enabled && (
          <>
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Máximo de Parcelas</label>
                <input
                  type="number"
                  min="1"
                  max="24"
                  value={settings.installments.maxInstallments}
                  onChange={(e) => updateSettings('installments', { maxInstallments: parseInt(e.target.value) })}
                  className={styles.input}
                />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Valor Mínimo por Parcela (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={settings.installments.minValue}
                  onChange={(e) => updateSettings('installments', { minValue: parseFloat(e.target.value) })}
                  className={styles.input}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Segurança */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FaShieldAlt /> Segurança
        </h3>

        <div className={styles.securityOptions}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={settings.security.ssl}
              onChange={(e) => updateSettings('security', { ssl: e.target.checked })}
            />
            Certificado SSL
          </label>

          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={settings.security.securePayment}
              onChange={(e) => updateSettings('security', { securePayment: e.target.checked })}
            />
            Pagamento Seguro
          </label>

          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={settings.security.showBadges}
              onChange={(e) => updateSettings('security', { showBadges: e.target.checked })}
            />
            Exibir Selos de Segurança
          </label>
        </div>

        {settings.security.showBadges && (
          <div className={styles.preview}>
            <h4>Preview dos Selos:</h4>
            <div className={styles.securityBadges}>
              {settings.security.ssl && (
                <div className={styles.securityBadge}>🔒 SSL</div>
              )}
              {settings.security.securePayment && (
                <div className={styles.securityBadge}>🛡️ Seguro</div>
              )}
              <div className={styles.securityBadge}>✅ Confiável</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}