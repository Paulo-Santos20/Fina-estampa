// src/pages/Admin/Content/components/BannerSettingsPanel.jsx
import React from 'react';
import { FaImage, FaPlus, FaTrash, FaArrowUp, FaArrowDown, FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './SettingsPanel.module.css';

export default function BannerSettingsPanel({ settings, onChange }) {
  const updateSettings = (section, updates) => {
    onChange({
      ...settings,
      [section]: {
        ...settings[section],
        ...updates
      }
    });
  };

  const updatePromotionalBanner = (bannerId, updates) => {
    const banners = settings.promotional.map(banner =>
      banner.id === bannerId ? { ...banner, ...updates } : banner
    );
    updateSettings('promotional', banners);
  };

  const addPromotionalBanner = () => {
    const newBanner = {
      id: Date.now().toString(),
      title: 'Novo Banner',
      subtitle: 'Descrição do banner',
      image: 'https://picsum.photos/seed/new/600/400',
      link: '/categoria/nova',
      active: true,
      order: settings.promotional.length + 1
    };
    updateSettings('promotional', [...settings.promotional, newBanner]);
  };

  const removePromotionalBanner = (bannerId) => {
    const banners = settings.promotional.filter(banner => banner.id !== bannerId);
    updateSettings('promotional', banners);
  };

  return (
    <div className={styles.panel}>
      <h2 className={styles.panelTitle}>Configurações de Banners</h2>
      
      {/* Hero Banner */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={settings.hero.enabled}
              onChange={(e) => updateSettings('hero', { enabled: e.target.checked })}
            />
            Banner Principal (Hero)
          </label>
        </h3>

        {settings.hero.enabled && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Imagem de Fundo</label>
              <input
                type="url"
                value={settings.hero.backgroundImage}
                onChange={(e) => updateSettings('hero', { backgroundImage: e.target.value })}
                className={styles.input}
                placeholder="https://exemplo.com/imagem.jpg"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Título</label>
              <input
                type="text"
                value={settings.hero.title}
                onChange={(e) => updateSettings('hero', { title: e.target.value })}
                className={styles.input}
                placeholder="Moda Feminina Elegante"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Subtítulo</label>
              <input
                type="text"
                value={settings.hero.subtitle}
                onChange={(e) => updateSettings('hero', { subtitle: e.target.value })}
                className={styles.input}
                placeholder="Descubra as últimas tendências"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Texto do Botão</label>
                <input
                  type="text"
                  value={settings.hero.buttonText}
                  onChange={(e) => updateSettings('hero', { buttonText: e.target.value })}
                  className={styles.input}
                  placeholder="Ver Coleção"
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Link do Botão</label>
                <input
                  type="text"
                  value={settings.hero.buttonLink}
                  onChange={(e) => updateSettings('hero', { buttonLink: e.target.value })}
                  className={styles.input}
                  placeholder="/produtos"
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.toggleLabel}>
                <input
                  type="checkbox"
                  checked={settings.hero.overlay}
                  onChange={(e) => updateSettings('hero', { overlay: e.target.checked })}
                />
                Overlay escuro sobre a imagem
              </label>
            </div>

            {/* Preview */}
            <div className={styles.preview}>
              <h4>Preview:</h4>
              <div 
                className={styles.heroPreview}
                style={{
                  backgroundImage: `url(${settings.hero.backgroundImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              >
                {settings.hero.overlay && <div className={styles.heroOverlay} />}
                <div className={styles.heroContent}>
                  <h2>{settings.hero.title}</h2>
                  <p>{settings.hero.subtitle}</p>
                  <button className={styles.heroButton}>{settings.hero.buttonText}</button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Banner de Destaque */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>
          <label className={styles.toggleLabel}>
            <input
              type="checkbox"
              checked={settings.highlight.enabled}
              onChange={(e) => updateSettings('highlight', { enabled: e.target.checked })}
            />
            Banner de Destaque
          </label>
        </h3>

        {settings.highlight.enabled && (
          <>
            <div className={styles.formGroup}>
              <label className={styles.label}>Tipo</label>
              <select
                value={settings.highlight.type}
                onChange={(e) => updateSettings('highlight', { type: e.target.value })}
                className={styles.input}
              >
                <option value="frete">Frete Grátis</option>
                <option value="cupom">Cupom de Desconto</option>
                <option value="custom">Personalizado</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Texto</label>
              <input
                type="text"
                value={settings.highlight.text}
                onChange={(e) => updateSettings('highlight', { text: e.target.value })}
                className={styles.input}
                placeholder="FRETE GRÁTIS para compras acima de R$ 299"
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Cor de Fundo</label>
                <input
                  type="color"
                  value={settings.highlight.backgroundColor}
                  onChange={(e) => updateSettings('highlight', { backgroundColor: e.target.value })}
                  className={styles.colorInput}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Cor do Texto</label>
                <input
                  type="color"
                  value={settings.highlight.textColor}
                  onChange={(e) => updateSettings('highlight', { textColor: e.target.value })}
                  className={styles.colorInput}
                />
              </div>
            </div>

            {/* Preview */}
            <div className={styles.preview}>
              <h4>Preview:</h4>
              <div 
                className={styles.highlightPreview}
                style={{
                  backgroundColor: settings.highlight.backgroundColor,
                  color: settings.highlight.textColor
                }}
              >
                {settings.highlight.text}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Banners Promocionais */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>Banners Promocionais</h3>
          <button onClick={addPromotionalBanner} className={styles.addBtn}>
            <FaPlus /> Adicionar Banner
          </button>
        </div>

        <div className={styles.bannerList}>
          {settings.promotional.map((banner, index) => (
            <div key={banner.id} className={styles.bannerItem}>
              <div className={styles.bannerPreview}>
                <img src={banner.image} alt={banner.title} className={styles.bannerImage} />
                <div className={styles.bannerOverlay}>
                  <h4>{banner.title}</h4>
                  <p>{banner.subtitle}</p>
                </div>
              </div>

              <div className={styles.bannerContent}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Título</label>
                    <input
                      type="text"
                      value={banner.title}
                      onChange={(e) => updatePromotionalBanner(banner.id, { title: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Subtítulo</label>
                    <input
                      type="text"
                      value={banner.subtitle}
                      onChange={(e) => updatePromotionalBanner(banner.id, { subtitle: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Imagem</label>
                    <input
                      type="url"
                      value={banner.image}
                      onChange={(e) => updatePromotionalBanner(banner.id, { image: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Link</label>
                    <input
                      type="text"
                      value={banner.link}
                      onChange={(e) => updatePromotionalBanner(banner.id, { link: e.target.value })}
                      className={styles.input}
                    />
                  </div>
                </div>

                <div className={styles.bannerActions}>
                  <label className={styles.toggleLabel}>
                    <input
                      type="checkbox"
                      checked={banner.active}
                      onChange={(e) => updatePromotionalBanner(banner.id, { active: e.target.checked })}
                    />
                    {banner.active ? <FaEye /> : <FaEyeSlash />} Ativo
                  </label>
                  
                  <button
                    onClick={() => removePromotionalBanner(banner.id)}
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
    </div>
  );
}