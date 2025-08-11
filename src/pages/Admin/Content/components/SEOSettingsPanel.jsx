// src/pages/Admin/Content/components/SEOSettingsPanel.jsx
import React from 'react';
import { FaSearch, FaShareAlt, FaChartLine } from 'react-icons/fa';
import styles from './SettingsPanel.module.css';

export default function SEOSettingsPanel({ settings, onChange }) {
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
      <h2 className={styles.panelTitle}>Configurações de SEO</h2>
      
      {/* SEO Geral */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FaSearch /> SEO Geral
        </h3>

        <div className={styles.formGroup}>
          <label className={styles.label}>Título do Site</label>
          <input
            type="text"
            value={settings.general.title}
            onChange={(e) => updateSettings('general', { title: e.target.value })}
            className={styles.input}
            placeholder="Fina Estampa | Moda Feminina Elegante"
          />
          <small className={styles.hint}>Máximo 60 caracteres recomendado</small>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descrição</label>
          <textarea
            value={settings.general.description}
            onChange={(e) => updateSettings('general', { description: e.target.value })}
            className={styles.textarea}
            rows="3"
            placeholder="Descubra as últimas tendências em moda feminina..."
          />
          <small className={styles.hint}>Máximo 160 caracteres recomendado</small>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Palavras-chave</label>
          <input
            type="text"
            value={settings.general.keywords}
            onChange={(e) => updateSettings('general', { keywords: e.target.value })}
            className={styles.input}
            placeholder="moda feminina, vestidos, blusas, elegante"
          />
          <small className={styles.hint}>Separe as palavras-chave por vírgulas</small>
        </div>
      </div>

      {/* Open Graph / Redes Sociais */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FaShareAlt /> Redes Sociais (Open Graph)
        </h3>

        <div className={styles.formGroup}>
          <label className={styles.label}>Título para Redes Sociais</label>
          <input
            type="text"
            value={settings.social.ogTitle}
            onChange={(e) => updateSettings('social', { ogTitle: e.target.value })}
            className={styles.input}
            placeholder="Fina Estampa - Moda Feminina"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Descrição para Redes Sociais</label>
          <textarea
            value={settings.social.ogDescription}
            onChange={(e) => updateSettings('social', { ogDescription: e.target.value })}
            className={styles.textarea}
            rows="3"
            placeholder="Moda feminina elegante e sofisticada"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Imagem para Compartilhamento</label>
          <input
            type="url"
            value={settings.social.ogImage}
            onChange={(e) => updateSettings('social', { ogImage: e.target.value })}
            className={styles.input}
            placeholder="https://exemplo.com/imagem-compartilhamento.jpg"
          />
          <small className={styles.hint}>Tamanho recomendado: 1200x630 pixels</small>
        </div>

        {/* Preview */}
        {settings.social.ogImage && (
          <div className={styles.preview}>
            <h4>Preview do Compartilhamento:</h4>
            <div className={styles.socialPreview}>
              <img src={settings.social.ogImage} alt="Preview" className={styles.socialImage} />
              <div className={styles.socialContent}>
                <h5>{settings.social.ogTitle}</h5>
                <p>{settings.social.ogDescription}</p>
                <span>finaestampa.com.br</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Analytics */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FaChartLine /> Analytics e Rastreamento
        </h3>

        <div className={styles.formGroup}>
          <label className={styles.label}>Google Analytics ID</label>
          <input
            type="text"
            value={settings.analytics.googleAnalytics}
            onChange={(e) => updateSettings('analytics', { googleAnalytics: e.target.value })}
            className={styles.input}
            placeholder="G-XXXXXXXXXX"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Facebook Pixel ID</label>
          <input
            type="text"
            value={settings.analytics.facebookPixel}
            onChange={(e) => updateSettings('analytics', { facebookPixel: e.target.value })}
            className={styles.input}
            placeholder="123456789012345"
          />
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Google Tag Manager ID</label>
          <input
            type="text"
            value={settings.analytics.googleTagManager}
            onChange={(e) => updateSettings('analytics', { googleTagManager: e.target.value })}
            className={styles.input}
            placeholder="GTM-XXXXXXX"
          />
        </div>
      </div>
    </div>
  );
}