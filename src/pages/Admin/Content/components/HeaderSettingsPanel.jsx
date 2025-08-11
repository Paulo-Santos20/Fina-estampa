// src/pages/Admin/Content/components/HeaderSettingsPanel.jsx
import React from 'react';
import { FaImage, FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './SettingsPanel.module.css';

export default function HeaderSettingsPanel({ settings, onChange, allCategories }) {
  const updateSettings = (section, updates) => {
    onChange({
      ...settings,
      [section]: {
        ...settings[section],
        ...updates
      }
    });
  };

  const updateNavCategory = (categoryId, updates) => {
    const categories = settings.navigation.categories.map(cat =>
      cat.id === categoryId ? { ...cat, ...updates } : cat
    );
    updateSettings('navigation', { categories });
  };

  const addNavCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      name: 'Nova Categoria',
      slug: '/categoria/nova',
      order: settings.navigation.categories.length + 1,
      active: true
    };
    updateSettings('navigation', {
      categories: [...settings.navigation.categories, newCategory]
    });
  };

  const removeNavCategory = (categoryId) => {
    const categories = settings.navigation.categories.filter(cat => cat.id !== categoryId);
    updateSettings('navigation', { categories });
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Configurações do Cabeçalho</h2>
      
      {/* Logo */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Logo</h3>
        
        <div className={styles.formGroup}>
          <label className={styles.label}>Tipo de Logo</label>
          <div className={styles.radioGroup}>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="text"
                checked={settings.logo.type === 'text'}
                onChange={(e) => updateSettings('logo', { type: e.target.value })}
              />
              Texto
            </label>
            <label className={styles.radioLabel}>
              <input
                type="radio"
                value="image"
                checked={settings.logo.type === 'image'}
                onChange={(e) => updateSettings('logo', { type: e.target.value })}
              />
              Imagem
            </label>
          </div>
        </div>

        {settings.logo.type === 'text' ? (
          <div className={styles.formGroup}>
            <label className={styles.label}>Texto do Logo</label>
            <input
              type="text"
              value={settings.logo.text}
              onChange={(e) => updateSettings('logo', { text: e.target.value })}
              className={styles.input}
              placeholder="Fina Estampa"
            />
          </div>
        ) : (
          <div className={styles.formGroup}>
            <label className={styles.label}>URL da Imagem</label>
            <input
              type="url"
              value={settings.logo.imageUrl}
              onChange={(e) => updateSettings('logo', { imageUrl: e.target.value })}
              className={styles.input}
              placeholder="https://exemplo.com/logo.png"
            />
          </div>
        )}

        <div className={styles.formGroup}>
          <label className={styles.label}>Altura (px)</label>
          <input
            type="number"
            value={settings.logo.height}
            onChange={(e) => updateSettings('logo', { height: parseInt(e.target.value) })}
            className={styles.input}
            min="20"
            max="80"
          />
        </div>
      </div>

      {/* Barra Superior */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={settings.topBar.enabled}
              onChange={(e) => updateSettings('topBar', { enabled: e.target.checked })}
            />
            Barra Superior
          </label>
        </h3>

        {settings.topBar.enabled && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Texto</label>
              <input
                type="text"
                value={settings.topBar.text}
                onChange={(e) => updateSettings('topBar', { text: e.target.value })}
                className={styles.input}
                placeholder="Frete grátis acima de R$ 299"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Cor de Fundo</label>
                <input
                  type="color"
                  value={settings.topBar.backgroundColor}
                  onChange={(e) => updateSettings('topBar', { backgroundColor: e.target.value })}
                  className={styles.colorInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Cor do Texto</label>
                <input
                  type="color"
                  value={settings.topBar.textColor}
                  onChange={(e) => updateSettings('topBar', { textColor: e.target.value })}
                  className={styles.colorInput}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Navegação */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Navegação</h3>
          <button onClick={addNavCategory} className={styles.addBtn}>
            <FaPlus /> Adicionar Categoria
          </button>
        </div>

        <div className={styles.categoryList}>
          {settings.navigation.categories.map((category, index) => (
            <div key={category.id} className={styles.categoryItem}>
              <div className={styles.categoryContent}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Nome</label>
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) => updateNavCategory(category.id, { name: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Link</label>
                    <input
                      type="text"
                      value={category.slug}
                      onChange={(e) => updateNavCategory(category.id, { slug: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.categoryActions}>
                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={category.active}
                      onChange={(e) => updateNavCategory(category.id, { active: e.target.checked })}
                    />
                    {category.active ? <FaEye /> : <FaEyeSlash />}
                  </label>
                  
                  <button
                    onClick={() => removeNavCategory(category.id)}
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

      {/* WhatsApp */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={settings.whatsapp.enabled}
              onChange={(e) => updateSettings('whatsapp', { enabled: e.target.checked })}
            />
            WhatsApp
          </label>
        </h3>

        {settings.whatsapp.enabled && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Número</label>
              <input
                type="tel"
                value={settings.whatsapp.number}
                onChange={(e) => updateSettings('whatsapp', { number: e.target.value })}
                className={styles.input}
                placeholder="+55 (11) 99999-9999"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Mensagem Padrão</label>
              <textarea
                value={settings.whatsapp.message}
                onChange={(e) => updateSettings('whatsapp', { message: e.target.value })}
                className={styles.textarea}
                rows="3"
                placeholder="Olá! Gostaria de saber mais sobre..."
              />
            </div>
          </>
        )}
      </div>

      {/* Busca */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={settings.search.enabled}
              onChange={(e) => updateSettings('search', { enabled: e.target.checked })}
            />
            Campo de Busca
          </label>
        </h3>

        {settings.search.enabled && (
          <div className={styles.formGroup}>
            <label className={styles.label}>Placeholder</label>
            <input
              type="text"
              value={settings.search.placeholder}
              onChange={(e) => updateSettings('search', { placeholder: e.target.value })}
              className={styles.input}
              placeholder="Buscar produtos..."
            />
          </div>
        )}
      </div>
    </div>
  );
}