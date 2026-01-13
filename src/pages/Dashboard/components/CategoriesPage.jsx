import React, { useState } from 'react';
import { 
  FaTag, FaPlus, FaEdit, FaTrash, FaEye, 
  FaEyeSlash, FaArrowUp, FaArrowDown, FaSave, 
  FaTimes, FaGripVertical
} from 'react-icons/fa';
import { useCategories } from '../../../hooks/useCategories';
import { useToast } from '../../../components/ui/Toast'; // Supondo que exista, opcional
import styles from './CategoriesPage.module.css';

const CategoriesPage = () => {
  const { 
    categories, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    toggleCategoryHeader, // Função para alternar visualização no header
    updateCategoryOrder 
  } = useCategories();

  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    showInHeader: false,
    isActive: true
  });

  // Garante que a lista esteja sempre ordenada visualmente
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

  // --- LÓGICA DE REORDENAÇÃO CORRIGIDA ---
  const moveCategory = (index, direction) => {
    // index: posição atual no array visual (sortedCategories)
    // direction: -1 (subir) ou 1 (descer)
    
    const newIndex = index + direction;

    // Proteção para não sair dos limites do array
    if (newIndex < 0 || newIndex >= sortedCategories.length) return;

    const currentItem = sortedCategories[index];
    const swapItem = sortedCategories[newIndex];

    // Troca as ordens
    const newOrderCurrent = swapItem.order;
    const newOrderSwap = currentItem.order;

    // Atualiza ambos (chamando a função do hook)
    updateCategoryOrder(currentItem.id, newOrderCurrent);
    updateCategoryOrder(swapItem.id, newOrderSwap);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description || '',
        showInHeader: category.showInHeader || false,
        isActive: category.isActive !== undefined ? category.isActive : true
      });
    } else {
      setEditingCategory(null);
      // Ao criar, define a ordem como o último + 1
      const maxOrder = categories.length > 0 ? Math.max(...categories.map(c => c.order)) : 0;
      setFormData({
        name: '', description: '', showInHeader: false, isActive: true, order: maxOrder + 1
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      alert('Por favor, preencha o nome da categoria');
      return;
    }

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        ...formData,
        order: editingCategory.order // Mantém a ordem original ao editar
      });
    } else {
      addCategory(formData);
    }
    closeModal();
  };

  const handleDelete = (categoryId, categoryName) => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${categoryName}"?`)) {
      deleteCategory(categoryId);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header da Página */}
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>Gerenciar Categorias</h2>
          <p className={styles.pageSubtitle}>
            {categories.length} categorias cadastradas. Use as setas para definir a ordem no menu.
          </p>
        </div>
        <button onClick={() => openModal()} className={styles.primaryBtn}>
          <FaPlus /> Nova Categoria
        </button>
      </div>

      {/* Lista de Categorias */}
      <div className={styles.categoriesList}>
        {sortedCategories.length > 0 ? (
          sortedCategories.map((category, index) => (
            <div key={category.id} className={`${styles.categoryCard} ${!category.isActive ? styles.inactiveCard : ''}`}>
              
              {/* Esquerda: Ordem e Infos */}
              <div className={styles.cardMain}>
                <div className={styles.dragHandle}>
                  <FaGripVertical />
                  <span className={styles.orderNumber}>{index + 1}º</span>
                </div>
                
                <div className={styles.cardInfo}>
                  <div className={styles.cardHeaderRow}>
                    <h3 className={styles.categoryName}>{category.name}</h3>
                    <div className={styles.badges}>
                      {category.showInHeader && <span className={styles.badgeHeader}>No Menu</span>}
                      {!category.isActive && <span className={styles.badgeInactive}>Oculta</span>}
                    </div>
                  </div>
                  <p className={styles.categoryDesc}>
                    {category.description || 'Sem descrição.'}
                  </p>
                </div>
              </div>

              {/* Direita: Ações */}
              <div className={styles.cardActions}>
                
                {/* Botões de Ordem (Subir/Descer) */}
                <div className={styles.orderActions}>
                  <button 
                    onClick={() => moveCategory(index, -1)} 
                    disabled={index === 0}
                    className={styles.iconBtn}
                    title="Mover para cima"
                  >
                    <FaArrowUp />
                  </button>
                  <button 
                    onClick={() => moveCategory(index, 1)} 
                    disabled={index === sortedCategories.length - 1}
                    className={styles.iconBtn}
                    title="Mover para baixo"
                  >
                    <FaArrowDown />
                  </button>
                </div>

                <div className={styles.separator} />

                {/* Botão Ocultar/Mostrar no Menu (Olho) */}
                <button 
                  onClick={() => toggleCategoryHeader(category.id)}
                  className={`${styles.iconBtn} ${category.showInHeader ? styles.activeEye : ''}`}
                  title={category.showInHeader ? "Ocultar do Menu" : "Mostrar no Menu"}
                >
                  {category.showInHeader ? <FaEye /> : <FaEyeSlash />}
                </button>
                
                <button 
                  onClick={() => openModal(category)}
                  className={styles.iconBtn}
                  title="Editar"
                >
                  <FaEdit />
                </button>
                
                <button 
                  onClick={() => handleDelete(category.id, category.name)}
                  className={`${styles.iconBtn} ${styles.deleteBtn}`}
                  title="Excluir"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.emptyState}>
            <FaTag />
            <h3>Nenhuma categoria encontrada</h3>
            <p>Crie categorias para organizar seus produtos.</p>
          </div>
        )}
      </div>

      {/* Modal de Criação/Edição */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h3>{editingCategory ? 'Editar Categoria' : 'Nova Categoria'}</h3>
              <button onClick={closeModal} className={styles.closeBtn}><FaTimes /></button>
            </div>
            
            <form onSubmit={handleSubmit} className={styles.modalBody}>
              <div className={styles.formGroup}>
                <label>Nome da Categoria *</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  placeholder="Ex: Vestidos" 
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label>Descrição</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange} 
                  rows="3" 
                  placeholder="Descrição interna ou para SEO..." 
                />
              </div>

              {/* CORREÇÃO DOS CHECKBOXES AQUI */}
              <div className={styles.checkboxContainer}>
                
                {/* Checkbox 1: Mostrar no Header */}
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="showInHeader" 
                    checked={formData.showInHeader} 
                    onChange={handleInputChange} 
                    className={styles.checkboxInput}
                  />
                  <div className={styles.checkboxText}>
                    <span className={styles.cbTitle}>Mostrar no Menu Principal</span>
                    <span className={styles.cbDesc}>Aparecerá no header do site para os clientes</span>
                  </div>
                </label>
                
                {/* Checkbox 2: Ativa/Inativa */}
                <label className={styles.checkboxLabel}>
                  <input 
                    type="checkbox" 
                    name="isActive" 
                    checked={formData.isActive} 
                    onChange={handleInputChange} 
                    className={styles.checkboxInput}
                  />
                  <div className={styles.checkboxText}>
                    <span className={styles.cbTitle}>Categoria Ativa</span>
                    <span className={styles.cbDesc}>Se desmarcado, a categoria fica oculta em todo o site</span>
                  </div>
                </label>

              </div>

              <div className={styles.modalFooter}>
                <button type="button" onClick={closeModal} className={styles.cancelBtn}>Cancelar</button>
                <button type="submit" className={styles.saveBtn}>
                  <FaSave /> Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;