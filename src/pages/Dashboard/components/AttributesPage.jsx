import React, { useState } from 'react';
import { 
  FaPalette, 
  FaRulerCombined,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaTimes,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';
import { useAttributes } from '../../../hooks/useAttributes';
import { useToast } from '../../../components/ui/Toast';
import styles from './AttributesPage.module.css';

const AttributesPage = () => {
  const { 
    colors, 
    sizes, 
    loading, 
    addColor,
    updateColor,
    deleteColor,
    toggleColorStatus,
    addSize,
    updateSize,
    deleteSize,
    toggleSizeStatus
  } = useAttributes();

  const { showSuccess, showError } = useToast();

  const [activeTab, setActiveTab] = useState('colors');
  const [showColorModal, setShowColorModal] = useState(false);
  const [showSizeModal, setShowSizeModal] = useState(false);
  const [editingColor, setEditingColor] = useState(null);
  const [editingSize, setEditingSize] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [colorForm, setColorForm] = useState({
    name: '',
    hexCode: '#000000',
    description: ''
  });

  const [sizeForm, setSizeForm] = useState({
    name: '',
    abbreviation: '',
    description: '',
    order: 0
  });

  // Funções para Cores
  const openColorModal = (color = null) => {
    if (color) {
      setEditingColor(color);
      setColorForm({
        name: color.name,
        hexCode: color.hexCode,
        description: color.description || ''
      });
    } else {
      setEditingColor(null);
      setColorForm({
        name: '',
        hexCode: '#000000',
        description: ''
      });
    }
    setShowColorModal(true);
  };

  const closeColorModal = () => {
    setShowColorModal(false);
    setEditingColor(null);
    setIsSubmitting(false);
  };

  const handleColorSubmit = async (e) => {
    e.preventDefault();
    
    if (!colorForm.name.trim()) {
      showError('Por favor, preencha o nome da cor');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingColor) {
        const success = updateColor(editingColor.id, colorForm);
        if (success) {
          showSuccess('Cor atualizada com sucesso!');
          closeColorModal();
        } else {
          showError('Erro ao atualizar cor');
        }
      } else {
        const newColor = addColor(colorForm);
        if (newColor) {
          showSuccess('Cor adicionada com sucesso!');
          closeColorModal();
        } else {
          showError('Erro ao adicionar cor');
        }
      }
    } catch (err) {
      console.error('Erro ao salvar cor:', err);
      showError('Erro ao salvar cor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteColor = (colorId, colorName) => {
    if (window.confirm(`Tem certeza que deseja excluir a cor "${colorName}"?`)) {
      const success = deleteColor(colorId);
      if (success) {
        showSuccess('Cor excluída com sucesso!');
      } else {
        showError('Erro ao excluir cor');
      }
    }
  };

  const handleToggleColorStatus = (colorId) => {
    const success = toggleColorStatus(colorId);
    if (success) {
      const color = colors.find(c => c.id === colorId);
      const newStatus = !color.isActive;
      showSuccess(`Cor ${newStatus ? 'ativada' : 'desativada'} com sucesso!`);
    } else {
      showError('Erro ao alterar status da cor');
    }
  };

  // Funções para Tamanhos
  const openSizeModal = (size = null) => {
    if (size) {
      setEditingSize(size);
      setSizeForm({
        name: size.name,
        abbreviation: size.abbreviation,
        description: size.description || '',
        order: size.order || 0
      });
    } else {
      setEditingSize(null);
      setSizeForm({
        name: '',
        abbreviation: '',
        description: '',
        order: sizes.length
      });
    }
    setShowSizeModal(true);
  };

  const closeSizeModal = () => {
    setShowSizeModal(false);
    setEditingSize(null);
    setIsSubmitting(false);
  };

  const handleSizeSubmit = async (e) => {
    e.preventDefault();
    
    if (!sizeForm.name.trim() || !sizeForm.abbreviation.trim()) {
      showError('Por favor, preencha o nome e a abreviação do tamanho');
      return;
    }

    setIsSubmitting(true);

    try {
      const sizeData = {
        ...sizeForm,
        order: parseInt(sizeForm.order) || 0
      };

      if (editingSize) {
        const success = updateSize(editingSize.id, sizeData);
        if (success) {
          showSuccess('Tamanho atualizado com sucesso!');
          closeSizeModal();
        } else {
          showError('Erro ao atualizar tamanho');
        }
      } else {
        const newSize = addSize(sizeData);
        if (newSize) {
          showSuccess('Tamanho adicionado com sucesso!');
          closeSizeModal();
        } else {
          showError('Erro ao adicionar tamanho');
        }
      }
    } catch (err) {
      console.error('Erro ao salvar tamanho:', err);
      showError('Erro ao salvar tamanho');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSize = (sizeId, sizeName) => {
    if (window.confirm(`Tem certeza que deseja excluir o tamanho "${sizeName}"?`)) {
      const success = deleteSize(sizeId);
      if (success) {
        showSuccess('Tamanho excluído com sucesso!');
      } else {
        showError('Erro ao excluir tamanho');
      }
    }
  };

  const handleToggleSizeStatus = (sizeId) => {
    const success = toggleSizeStatus(sizeId);
    if (success) {
      const size = sizes.find(s => s.id === sizeId);
      const newStatus = !size.isActive;
      showSuccess(`Tamanho ${newStatus ? 'ativado' : 'desativado'} com sucesso!`);
    } else {
      showError('Erro ao alterar status do tamanho');
    }
  };

  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loadingState}>
          <FaPalette className={styles.loadingIcon} />
          <h3>Carregando atributos...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaPalette />
            Cores e Tamanhos
          </h2>
          <p className={styles.pageSubtitle}>
            Gerencie as cores e tamanhos disponíveis para seus produtos
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabsContainer}>
        <button
          onClick={() => setActiveTab('colors')}
          className={`${styles.tabBtn} ${activeTab === 'colors' ? styles.active : ''}`}
        >
          <FaPalette /> Cores ({colors.length})
        </button>
        <button
          onClick={() => setActiveTab('sizes')}
          className={`${styles.tabBtn} ${activeTab === 'sizes' ? styles.active : ''}`}
        >
          <FaRulerCombined /> Tamanhos ({sizes.length})
        </button>
      </div>

      {/* Conteúdo das Cores */}
      {activeTab === 'colors' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <FaPalette /> Gerenciar Cores
            </h3>
            <button 
              onClick={() => openColorModal()}
              className={styles.primaryBtn}
            >
              <FaPlus /> Nova Cor
            </button>
          </div>

          <div className={styles.itemsGrid}>
            {colors.map((color) => (
              <div key={color.id} className={styles.colorCard}>
                <div className={styles.colorHeader}>
                  <div 
                    className={styles.colorSwatch}
                    style={{ backgroundColor: color.hexCode }}
                  />
                  <div className={styles.colorInfo}>
                    <h4 className={styles.colorName}>{color.name}</h4>
                    <span className={styles.colorCode}>{color.hexCode}</span>
                    {color.description && (
                      <p className={styles.colorDescription}>{color.description}</p>
                    )}
                  </div>
                  {!color.isActive && (
                    <span className={styles.inactiveBadge}>Inativo</span>
                  )}
                </div>
                
                <div className={styles.itemActions}>
                  <button
                    onClick={() => handleToggleColorStatus(color.id)}
                    className={`${styles.actionBtn} ${color.isActive ? styles.activeBtn : styles.inactiveBtn}`}
                    title={color.isActive ? 'Desativar cor' : 'Ativar cor'}
                  >
                    {color.isActive ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <button
                    onClick={() => openColorModal(color)}
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    title="Editar cor"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteColor(color.id, color.name)}
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    title="Excluir cor"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            {colors.length === 0 && (
              <div className={styles.emptyState}>
                <FaPalette className={styles.emptyIcon} />
                <h3>Nenhuma cor cadastrada</h3>
                <p>Comece adicionando sua primeira cor</p>
                <button 
                  onClick={() => openColorModal()}
                  className={styles.primaryBtn}
                >
                  <FaPlus /> Adicionar Cor
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Conteúdo dos Tamanhos */}
      {activeTab === 'sizes' && (
        <div className={styles.tabContent}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>
              <FaRulerCombined /> Gerenciar Tamanhos
            </h3>
            <button 
              onClick={() => openSizeModal()}
              className={styles.primaryBtn}
            >
              <FaPlus /> Novo Tamanho
            </button>
          </div>

          <div className={styles.itemsGrid}>
            {sizes.sort((a, b) => a.order - b.order).map((size) => (
              <div key={size.id} className={styles.sizeCard}>
                <div className={styles.sizeHeader}>
                  <div className={styles.sizeDisplay}>
                    <span className={styles.sizeAbbr}>{size.abbreviation}</span>
                  </div>
                  <div className={styles.sizeInfo}>
                    <h4 className={styles.sizeName}>{size.name}</h4>
                    <span className={styles.sizeOrder}>Ordem: {size.order}</span>
                    {size.description && (
                      <p className={styles.sizeDescription}>{size.description}</p>
                    )}
                  </div>
                  {!size.isActive && (
                    <span className={styles.inactiveBadge}>Inativo</span>
                  )}
                </div>
                
                <div className={styles.itemActions}>
                  <button
                    onClick={() => handleToggleSizeStatus(size.id)}
                    className={`${styles.actionBtn} ${size.isActive ? styles.activeBtn : styles.inactiveBtn}`}
                    title={size.isActive ? 'Desativar tamanho' : 'Ativar tamanho'}
                  >
                    {size.isActive ? <FaEye /> : <FaEyeSlash />}
                  </button>
                  <button
                    onClick={() => openSizeModal(size)}
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    title="Editar tamanho"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteSize(size.id, size.name)}
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    title="Excluir tamanho"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}

            {sizes.length === 0 && (
              <div className={styles.emptyState}>
                <FaRulerCombined className={styles.emptyIcon} />
                <h3>Nenhum tamanho cadastrado</h3>
                <p>Comece adicionando seu primeiro tamanho</p>
                <button 
                  onClick={() => openSizeModal()}
                  className={styles.primaryBtn}
                >
                  <FaPlus /> Adicionar Tamanho
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Cor */}
      {showColorModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingColor ? '✏️ Editar Cor' : '🎨 Nova Cor'}
              </h3>
              <button
                onClick={closeColorModal}
                className={styles.modalCloseBtn}
                disabled={isSubmitting}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleColorSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Nome da Cor *</label>
                <input
                  type="text"
                  value={colorForm.name}
                  onChange={(e) => setColorForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  disabled={isSubmitting}
                  className={styles.formInput}
                  placeholder="Ex: Vermelho Vinho"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Código da Cor *</label>
                <div className={styles.colorInputGroup}>
                  <input
                    type="color"
                    value={colorForm.hexCode}
                    onChange={(e) => setColorForm(prev => ({ ...prev, hexCode: e.target.value }))}
                    disabled={isSubmitting}
                    className={styles.colorPicker}
                  />
                  <input
                    type="text"
                    value={colorForm.hexCode}
                    onChange={(e) => setColorForm(prev => ({ ...prev, hexCode: e.target.value }))}
                    disabled={isSubmitting}
                    className={styles.formInput}
                    placeholder="#000000"
                    pattern="^#[0-9A-Fa-f]{6}$"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Descrição</label>
                <textarea
                  value={colorForm.description}
                  onChange={(e) => setColorForm(prev => ({ ...prev, description: e.target.value }))}
                  disabled={isSubmitting}
                  rows="3"
                  className={styles.formTextarea}
                  placeholder="Descrição opcional da cor..."
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={closeColorModal}
                  disabled={isSubmitting}
                  className={styles.cancelBtn}
                >
                  ❌ Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  <FaSave /> {isSubmitting ? 'Salvando...' : (editingColor ? 'Atualizar' : 'Salvar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Tamanho */}
      {showSizeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingSize ? '✏️ Editar Tamanho' : '📏 Novo Tamanho'}
              </h3>
              <button
                onClick={closeSizeModal}
                className={styles.modalCloseBtn}
                disabled={isSubmitting}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSizeSubmit} className={styles.modalForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Nome do Tamanho *</label>
                  <input
                    type="text"
                    value={sizeForm.name}
                    onChange={(e) => setSizeForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                    disabled={isSubmitting}
                    className={styles.formInput}
                    placeholder="Ex: Pequeno"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Abreviação *</label>
                  <input
                    type="text"
                    value={sizeForm.abbreviation}
                    onChange={(e) => setSizeForm(prev => ({ ...prev, abbreviation: e.target.value.toUpperCase() }))}
                    required
                    disabled={isSubmitting}
                    className={styles.formInput}
                    placeholder="Ex: P"
                    maxLength="3"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ordem de Exibição</label>
                <input
                  type="number"
                  value={sizeForm.order}
                  onChange={(e) => setSizeForm(prev => ({ ...prev, order: e.target.value }))}
                  disabled={isSubmitting}
                  className={styles.formInput}
                  placeholder="0"
                  min="0"
                />
                <small className={styles.formHint}>
                  Ordem em que o tamanho aparecerá na lista (0 = primeiro)
                </small>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Descrição</label>
                <textarea
                  value={sizeForm.description}
                  onChange={(e) => setSizeForm(prev => ({ ...prev, description: e.target.value }))}
                  disabled={isSubmitting}
                  rows="3"
                  className={styles.formTextarea}
                  placeholder="Descrição opcional do tamanho..."
                />
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={closeSizeModal}
                  disabled={isSubmitting}
                  className={styles.cancelBtn}
                >
                  ❌ Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={styles.submitBtn}
                >
                  <FaSave /> {isSubmitting ? 'Salvando...' : (editingSize ? 'Atualizar' : 'Salvar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttributesPage;