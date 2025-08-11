// src/pages/Admin/Content/components/CategoriesSettingsPanel.jsx
import React from 'react';
import { FaHome, FaPlus, FaTrash, FaImage, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './SettingsPanel.module.css';

export default function CategoriesSettingsPanel({ settings, onChange, allCategories }) {
  const updateSettings = (section, updates) => {
    onChange({
      ...settings,
      [section]: {
        ...settings[section],
        ...updates
      }
    });
  };

  const updateCategory = (categoryId, updates) => {
    const categories = settings.homepage.categories.map(cat =>
      cat.id === categoryId ? { ...cat, ...updates } : cat
    );
    updateSettings('homepage', { categories });
  };

  const addCategory = () => {
    const newCategory = {
      id: Date.now().toString(),
      name: 'Nova Categoria',
      image: 'https://picsum.photos/seed/new/300/200',
      link: '/categoria/nova'
    };
    updateSettings('homepage', {
      categories: [...settings.homepage.categories, newCategory]
    });
  };

  const removeCategory = (categoryId) => {
    const categories = settings.homepage.categories.filter(cat => cat.id !== categoryId);
    updateSettings('homepage', { categories });
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Configurações de Categorias</h2>
      
      {/* Categorias da Homepage */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>
            <label className={styles.toggleLabel}>
              <input
                type="checkbox"
                checked={settings.homepage.enabled}
                onChange={(e) => updateSettings('homepage', { enabled: e.target.checked })}
              />
              <FaHome /> Categorias na Página Inicial
            </label>
          </h3>
          {settings.homepage.enabled && (
            <button onClick={addCategory} className={styles.addBtn}>
              <FaPlus /> Adicionar Categoria
            </button>
          )}
        </div>

        {settings.homepage.enabled && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Título da Seção</label>
              <input
                type="text"
                value={settings.homepage.title}
                onChange={(e) => updateSettings('homepage', { title: e.target.value })}
                className={styles.input}
                placeholder="Categorias"
              />
            </div>

            <div className={styles.categoryGrid}>
              {settings.homepage.categories.map((category) => (
                <div key={category.id} className={styles.categoryCard}>
                  <div className={styles.categoryImageContainer}>
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className={styles.categoryImage}
                    />
                    <div className={styles.imageOverlay}>
                      <button className={styles.changeImageBtn}>
                        <FaImage />
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.categoryContent}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Nome</label>
                      <input
                        type="text"
                        value={category.name}
                        onChange={(e) => updateCategory(category.id, { name: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Imagem URL</label>
                      <input
                        type="url"
                        value={category.image}
                        onChange={(e) => updateCategory(category.id, { image: e.target.value })}
                        className={styles.input}
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Link</label>
                      <input
                        type="text"
                        value={category.link}
                        onChange={(e) => updateCategory(category.id, { link: e.target.value })}
                        className={styles.input}
                        placeholder="/categoria/nome"
                      />
                    </div>
                    
                    <div className={styles.categoryActions}>
                      <button
                        onClick={() => removeCategory(category.id)}
                        className={styles.deleteBtn}
                      >
                        <FaTrash /> Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}