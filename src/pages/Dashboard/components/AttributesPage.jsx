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

  // Forms State
  const [colorForm, setColorForm] = useState({ name: '', hexCode: '#000000', description: '' });
  const [sizeForm, setSizeForm] = useState({ name: '', abbreviation: '', description: '', order: 0 });

  // --- FUNÇÕES DE CORES ---
  const openColorModal = (color = null) => {
    if (color) {
      setEditingColor(color);
      setColorForm({ name: color.name, hexCode: color.hexCode, description: color.description || '' });
    } else {
      setEditingColor(null);
      setColorForm({ name: '', hexCode: '#000000', description: '' });
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
    if (!colorForm.name.trim()) { showError('Preencha o nome da cor'); return; }
    setIsSubmitting(true);
    try {
      if (editingColor) {
        await updateColor(editingColor.id, colorForm);
        showSuccess('Cor atualizada!');
      } else {
        await addColor(colorForm);
        showSuccess('Cor criada!');
      }
      closeColorModal();
    } catch (err) { showError('Erro ao salvar cor'); }
    finally { setIsSubmitting(false); }
  };

  const handleDeleteColor = (id, name) => {
    if (window.confirm(`Excluir cor "${name}"?`)) {
      deleteColor(id);
      showSuccess('Cor excluída.');
    }
  };

  // --- FUNÇÕES DE TAMANHOS ---
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
      const nextOrder = sizes.length > 0 ? Math.max(...sizes.map(s => s.order)) + 1 : 1;
      setEditingSize(null);
      setSizeForm({ name: '', abbreviation: '', description: '', order: nextOrder });
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
      showError('Preencha nome e abreviação'); return;
    }
    setIsSubmitting(true);
    try {
      const data = { ...sizeForm, order: parseInt(sizeForm.order) || 0 };
      if (editingSize) {
        await updateSize(editingSize.id, data);
        showSuccess('Tamanho atualizado!');
      } else {
        await addSize(data);
        showSuccess('Tamanho criado!');
      }
      closeSizeModal();
    } catch (err) { showError('Erro ao salvar tamanho'); }
    finally { setIsSubmitting(false); }
  };

  const handleDeleteSize = (id, name) => {
    if (window.confirm(`Excluir tamanho "${name}"?`)) {
      deleteSize(id);
      showSuccess('Tamanho excluído.');
    }
  };

  if (loading) return <div className={styles.loading}>Carregando atributos...</div>;

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Atributos do Produto</h2>
          <p className={styles.pageSubtitle}>Gerencie variações de cores e tamanhos para seu catálogo.</p>
        </div>
      </div>

      {/* Tabs de Navegação */}
      <div className={styles.tabsWrapper}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'colors' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('colors')}
        >
          <FaPalette /> Cores ({colors.length})
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'sizes' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('sizes')}
        >
          <FaRulerCombined /> Tamanhos ({sizes.length})
        </button>
      </div>

      {/* --- CONTEÚDO TAB: CORES --- */}
      {activeTab === 'colors' && (
        <div className={styles.tabContent}>
          <div className={styles.tabHeader}>
            <h3>Gerenciar Cores</h3>
            <button className={styles.primaryBtn} onClick={() => openColorModal()}>
              <FaPlus /> Nova Cor
            </button>
          </div>

          <div className={styles.gridList}>
            {colors.length > 0 ? (
              colors.map(color => (
                <div key={color.id} className={`${styles.attributeCard} ${!color.isActive ? styles.inactive : ''}`}>
                  <div className={styles.colorPreview} style={{ backgroundColor: color.hexCode }} />
                  
                  <div className={styles.cardInfo}>
                    <h4 className={styles.cardTitle}>{color.name}</h4>
                    <span className={styles.cardSubtitle}>{color.hexCode}</span>
                  </div>

                  <div className={styles.cardActions}>
                    <button 
                      onClick={() => toggleColorStatus(color.id)} 
                      className={styles.iconBtn} 
                      title={color.isActive ? 'Desativar' : 'Ativar'}
                    >
                      {color.isActive ? <FaEye /> : <FaEyeSlash />}
                    </button>
                    <button onClick={() => openColorModal(color)} className={styles.iconBtn} title="Editar">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteColor(color.id, color.name)} className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Excluir">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>Nenhuma cor cadastrada.</div>
            )}
          </div>
        </div>
      )}

      {/* --- CONTEÚDO TAB: TAMANHOS --- */}
      {activeTab === 'sizes' && (
        <div className={styles.tabContent}>
          <div className={styles.tabHeader}>
            <h3>Gerenciar Tamanhos</h3>
            <button className={styles.primaryBtn} onClick={() => openSizeModal()}>
              <FaPlus /> Novo Tamanho
            </button>
          </div>

          <div className={styles.gridList}>
            {sizes.length > 0 ? (
              sizes.sort((a, b) => a.order - b.order).map(size => (
                <div key={size.id} className={`${styles.attributeCard} ${!size.isActive ? styles.inactive : ''}`}>
                  <div className={styles.sizeBadge}>{size.abbreviation}</div>
                  
                  <div className={styles.cardInfo}>
                    <h4 className={styles.cardTitle}>{size.name}</h4>
                    <span className={styles.cardSubtitle}>Ordem: {size.order}</span>
                  </div>

                  <div className={styles.cardActions}>
                    <button 
                      onClick={() => toggleSizeStatus(size.id)} 
                      className={styles.iconBtn}
                      title={size.isActive ? 'Desativar' : 'Ativar'}
                    >
                      {size.isActive ? <FaEye /> : <FaEyeSlash />}
                    </button>
                    <button onClick={() => openSizeModal(size)} className={styles.iconBtn} title="Editar">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDeleteSize(size.id, size.name)} className={`${styles.iconBtn} ${styles.deleteBtn}`} title="Excluir">
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>Nenhum tamanho cadastrado.</div>
            )}
          </div>
        </div>
      )}

      {/* --- MODAL DE COR --- */}
      {showColorModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{editingColor ? 'Editar Cor' : 'Nova Cor'}</h3>
              <button onClick={closeColorModal} className={styles.closeBtn}><FaTimes /></button>
            </div>
            <form onSubmit={handleColorSubmit} className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Nome da Cor *</label>
                <input type="text" value={colorForm.name} onChange={e => setColorForm({...colorForm, name: e.target.value})} required placeholder="Ex: Azul Marinho" />
              </div>
              <div className={styles.formGroup}>
                <label>Código Hexadecimal *</label>
                <div className={styles.colorInputWrapper}>
                  <input type="color" value={colorForm.hexCode} onChange={e => setColorForm({...colorForm, hexCode: e.target.value})} className={styles.colorPicker} />
                  <input type="text" value={colorForm.hexCode} onChange={e => setColorForm({...colorForm, hexCode: e.target.value})} className={styles.colorText} pattern="^#[0-9A-Fa-f]{6}$" />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Descrição</label>
                <textarea rows="2" value={colorForm.description} onChange={e => setColorForm({...colorForm, description: e.target.value})} placeholder="Opcional" />
              </div>
              <div className={styles.modalFooter}>
                <button type="button" onClick={closeColorModal} className={styles.cancelBtn}>Cancelar</button>
                <button type="submit" className={styles.saveBtn} disabled={isSubmitting}><FaSave /> Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL DE TAMANHO --- */}
      {showSizeModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{editingSize ? 'Editar Tamanho' : 'Novo Tamanho'}</h3>
              <button onClick={closeSizeModal} className={styles.closeBtn}><FaTimes /></button>
            </div>
            <form onSubmit={handleSizeSubmit} className={styles.modalBody}>
              <div className={styles.row}>
                <div className={styles.formGroup}>
                  <label>Nome *</label>
                  <input type="text" value={sizeForm.name} onChange={e => setSizeForm({...sizeForm, name: e.target.value})} required placeholder="Ex: Médio" />
                </div>
                <div className={styles.formGroup}>
                  <label>Sigla *</label>
                  <input type="text" value={sizeForm.abbreviation} onChange={e => setSizeForm({...sizeForm, abbreviation: e.target.value.toUpperCase()})} required maxLength="3" placeholder="M" />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label>Ordem de Exibição</label>
                <input type="number" value={sizeForm.order} onChange={e => setSizeForm({...sizeForm, order: e.target.value})} min="0" />
                <small className={styles.hint}>Define a ordem na lista (0, 1, 2...)</small>
              </div>
              <div className={styles.formGroup}>
                <label>Descrição</label>
                <textarea rows="2" value={sizeForm.description} onChange={e => setSizeForm({...sizeForm, description: e.target.value})} placeholder="Opcional" />
              </div>
              <div className={styles.modalFooter}>
                <button type="button" onClick={closeSizeModal} className={styles.cancelBtn}>Cancelar</button>
                <button type="submit" className={styles.saveBtn} disabled={isSubmitting}><FaSave /> Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttributesPage;