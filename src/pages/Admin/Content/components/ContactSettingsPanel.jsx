// src/pages/Admin/Content/components/ContactSettingsPanel.jsx
import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import styles from './SettingsPanel.module.css';

export default function ContactSettingsPanel({ settings, onChange }) {
  const updateSettings = (section, updates) => {
    onChange({
      ...settings,
      [section]: {
        ...settings[section],
        ...updates
      }
    });
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Configurações de Contato</h2>
      
      {/* Informações de Contato */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FaPhone /> Informações de Contato
        </h3>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FaPhone /> Telefone
          </label>
          <input
            type="tel"
            value={settings.info.phone}
            onChange={(e) => updateSettings('info', { phone: e.target.value })}
            className={styles.input}
            placeholder="(11) 99999-9999"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FaEnvelope /> E-mail
          </label>
          <input
            type="email"
            value={settings.info.email}
            onChange={(e) => updateSettings('info', { email: e.target.value })}
            className={styles.input}
            placeholder="contato@finaestampa.com.br"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FaMapMarkerAlt /> Endereço
          </label>
          <textarea
            value={settings.info.address}
            onChange={(e) => updateSettings('info', { address: e.target.value })}
            className={styles.textarea}
            rows="3"
            placeholder="Rua das Flores, 123 - Vila Madalena, São Paulo - SP"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FaClock /> Horário de Funcionamento
          </label>
          <input
            type="text"
            value={settings.info.workingHours}
            onChange={(e) => updateSettings('info', { workingHours: e.target.value })}
            className={styles.input}
            placeholder="Segunda a Sexta: 9h às 18h | Sábado: 9h às 14h"
          />
        </div>
      </div>

      {/* Redes Sociais */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Redes Sociais</h3>

        <div className={styles.formGroup}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={settings.social.showInFooter}
              onChange={(e) => updateSettings('social', { showInFooter: e.target.checked })}
            />
            Exibir redes sociais no rodapé
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FaFacebook /> Facebook
          </label>
          <input
            type="url"
            value={settings.social.facebook}
            onChange={(e) => updateSettings('social', { facebook: e.target.value })}
            className={styles.input}
            placeholder="https://facebook.com/finaestampa"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FaInstagram /> Instagram
          </label>
          <input
            type="url"
            value={settings.social.instagram}
            onChange={(e) => updateSettings('social', { instagram: e.target.value })}
            className={styles.input}
            placeholder="https://instagram.com/finaestampa"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            <FaWhatsapp /> WhatsApp (apenas números)
          </label>
          <input
            type="text"
            value={settings.social.whatsapp}
            onChange={(e) => updateSettings('social', { whatsapp: e.target.value })}
            className={styles.input}
            placeholder="5511999999999"
          />
        </div>
      </div>
    </div>
  );
}