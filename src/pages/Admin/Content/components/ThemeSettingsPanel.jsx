// src/pages/Admin/Content/components/ThemeSettingsPanel.jsx
import React from 'react';
import { FaPalette, FaFont, FaRuler } from 'react-icons/fa';
import styles from './SettingsPanel.module.css';

export default function ThemeSettingsPanel({ settings, onChange }) {
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
      <h2 className={styles.panelTitle}>Configurações de Tema</h2>
      
      {/* Cores */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FaPalette /> Paleta de Cores
        </h3>

        <div className={styles.colorGrid}>
          <div className={styles.colorItem}>
            <label className={styles.label}>Cor Primária</label>
            <div className={styles.colorRow}>
              <input
                type="color"
                value={settings.colors.primary}
                onChange={(e) => updateSettings('colors', { primary: e.target.value })}
                className={styles.colorInput}
              />
              <input
                type="text"
                value={settings.colors.primary}
                onChange={(e) => updateSettings('colors', { primary: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.colorItem}>
            <label className={styles.label}>Cor Secundária</label>
            <div className={styles.colorRow}>
              <input
                type="color"
                value={settings.colors.secondary}
                onChange={(e) => updateSettings('colors', { secondary: e.target.value })}
                className={styles.colorInput}
              />
              <input
                type="text"
                value={settings.colors.secondary}
                onChange={(e) => updateSettings('colors', { secondary: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.colorItem}>
            <label className={styles.label}>Cor de Destaque</label>
            <div className={styles.colorRow}>
              <input
                type="color"
                value={settings.colors.accent}
                onChange={(e) => updateSettings('colors', { accent: e.target.value })}
                className={styles.colorInput}
              />
              <input
                type="text"
                value={settings.colors.accent}
                onChange={(e) => updateSettings('colors', { accent: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.colorItem}>
            <label className={styles.label}>Cor de Fundo</label>
            <div className={styles.colorRow}>
              <input
                type="color"
                value={settings.colors.background}
                onChange={(e) => updateSettings('colors', { background: e.target.value })}
                className={styles.colorInput}
              />
              <input
                type="text"
                value={settings.colors.background}
                onChange={(e) => updateSettings('colors', { background: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.colorItem}>
            <label className={styles.label}>Cor do Texto</label>
            <div className={styles.colorRow}>
              <input
                type="color"
                value={settings.colors.text}
                onChange={(e) => updateSettings('colors', { text: e.target.value })}
                className={styles.colorInput}
              />
              <input
                type="text"
                value={settings.colors.text}
                onChange={(e) => updateSettings('colors', { text: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.colorItem}>
            <label className={styles.label}>Cor Secundária do Texto</label>
            <div className={styles.colorRow}>
              <input
                type="color"
                value={settings.colors.muted}
                onChange={(e) => updateSettings('colors', { muted: e.target.value })}
                className={styles.colorInput}
              />
              <input
                type="text"
                value={settings.colors.muted}
                onChange={(e) => updateSettings('colors', { muted: e.target.value })}
                className={styles.input}
              />
            </div>
          </div>
        </div>

        {/* Preview das Cores */}
        <div className={styles.preview}>
          <h4>Preview das Cores:</h4>
          <div className={styles.colorPreview}>
            <div 
              className={styles.colorSwatch}
              style={{ backgroundColor: settings.colors.primary }}
            >
              <span style={{ color: settings.colors.background }}>Primária</span>
            </div>
            <div 
              className={styles.colorSwatch}
              style={{ backgroundColor: settings.colors.secondary }}
            >
              <span style={{ color: settings.colors.text }}>Secundária</span>
            </div>
            <div 
              className={styles.colorSwatch}
              style={{ backgroundColor: settings.colors.accent }}
            >
              <span style={{ color: settings.colors.background }}>Destaque</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tipografia */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FaFont /> Tipografia
        </h3>

        <div className={styles.formGroup}>
          <label className={styles.label}>Fonte Principal</label>
          <select
            value={settings.typography.fontFamily}
            onChange={(e) => updateSettings('typography', { fontFamily: e.target.value })}
            className={styles.input}
          >
            <option value="Inter, sans-serif">Inter (Sans-serif)</option>
            <option value="Roboto, sans-serif">Roboto (Sans-serif)</option>
            <option value="Open Sans, sans-serif">Open Sans (Sans-serif)</option>
            <option value="Lato, sans-serif">Lato (Sans-serif)</option>
            <option value="Montserrat, sans-serif">Montserrat (Sans-serif)</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Fonte para Títulos</label>
          <select
            value={settings.typography.headingFont}
            onChange={(e) => updateSettings('typography', { headingFont: e.target.value })}
            className={styles.input}
          >
            <option value="Playfair Display, serif">Playfair Display (Serif)</option>
            <option value="Merriweather, serif">Merriweather (Serif)</option>
            <option value="Lora, serif">Lora (Serif)</option>
            <option value="Crimson Text, serif">Crimson Text (Serif)</option>
            <option value="Inter, sans-serif">Inter (Sans-serif)</option>
          </select>
        </div>

        {/* Preview da Tipografia */}
        <div className={styles.preview}>
          <h4>Preview da Tipografia:</h4>
          <div className={styles.typographyPreview}>
            <h2 style={{ fontFamily: settings.typography.headingFont }}>
              Título Principal
            </h2>
            <p style={{ fontFamily: settings.typography.fontFamily }}>
              Este é um exemplo de texto usando a fonte principal selecionada. 
              Aqui você pode ver como ficará o texto do seu site.
            </p>
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <FaRuler /> Layout
        </h3>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Largura do Container (px)</label>
            <input
              type="number"
              min="1000"
              max="1400"
              value={settings.layout.containerWidth}
              onChange={(e) => updateSettings('layout', { containerWidth: parseInt(e.target.value) })}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Raio da Borda (px)</label>
            <input
              type="number"
              min="0"
              max="20"
              value={settings.layout.borderRadius}
              onChange={(e) => updateSettings('layout', { borderRadius: parseInt(e.target.value) })}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>Espaçamento Base (px)</label>
          <input
            type="number"
            min="8"
            max="32"
            value={settings.layout.spacing}
            onChange={(e) => updateSettings('layout', { spacing: parseInt(e.target.value) })}
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
}