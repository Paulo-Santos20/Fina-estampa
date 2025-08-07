import React, { useState } from 'react';
import { FaTag, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaArrowUp, FaArrowDown, FaSave, FaTimes } from 'react-icons/fa';
import { useCategories } from '../../../hooks/useCategories';
import styles from './CategoriesPage.module.css';

const CategoriesPage = () => {
  const { 
    categories, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    toggleCategoryHeader,
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

  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);

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
        description: category.description,
        showInHeader: category.showInHeader,
        isActive: category.isActive
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        showInHeader: false,
        isActive: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      showInHeader: false,
      isActive: true
    });
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
        order: editingCategory.order
      });
      alert('✅ Categoria atualizada com sucesso!');
    } else {
      addCategory(formData);
      alert('✅ Categoria adicionada com sucesso!');
    }

    closeModal();
  };

  const handleDelete = (categoryId, categoryName) => {
    if (window.confirm(`Tem certeza que deseja excluir a categoria "${categoryName}"?`)) {
      deleteCategory(categoryId);
      alert('✅ Categoria excluída com sucesso!');
    }
  };

  const handleToggleHeader = (categoryId) => {
    toggleCategoryHeader(categoryId);
  };

  const handleMoveUp = (category) => {
    if (category.order > 1) {
      updateCategoryOrder(category.id, category.order - 1);
      const previousCategory = categories.find(c => c.order === category.order - 1);
      if (previousCategory) {
        updateCategoryOrder(previousCategory.id, category.order);
      }
    }
  };

  const handleMoveDown = (category) => {
    const maxOrder = Math.max(...categories.map(c => c.order));
    if (category.order < maxOrder) {
      updateCategoryOrder(category.id, category.order + 1);
      const nextCategory = categories.find(c => c.order === category.order + 1);
      if (nextCategory) {
        updateCategoryOrder(nextCategory.id, category.order);
      }
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <div className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <h2 className={styles.pageTitle}>
            <FaTag />
            Gerenciar Categorias ({categories.length})
          </h2>
          <p className={styles.pageSubtitle}>
            Organize as categorias dos produtos e defina quais aparecem no menu
          </p>
        </div>
        
        <div className={styles.headerActions}>
          <button 
            onClick={() => openModal()}
            className={styles.primaryBtn}
          >
            <FaPlus /> Nova Categoria
          </button>
        </div>
      </div>

      {/* Dica */}
      <div className={styles.tipCard}>
        <h4 className={styles.tipTitle}>💡 Dica sobre Categorias no Header</h4>
        <p className={styles.tipText}>
          As categorias marcadas como "Mostrar no Header" aparecerão no menu principal do site. 
          Use a ordem para definir a sequência de exibição.
        </p>
      </div>

      {/* Lista de Categorias */}
      <div className={styles.categoriesSection}>
        {sortedCategories.length > 0 ? (
          <div className={styles.categoriesList}>
            {sortedCategories.map((category) => (
              <div key={category.id} className={styles.categoryCard}>
                <div className={styles.categoryLeft}>
                  <div 
                    className={styles.orderBadge}
                    style={{
                      backgroundColor: category.showInHeader ? '#722F37' : '#6B7280'
                    }}
                  >
                    {category.order}
                  </div>
                  
                  <div className={styles.categoryInfo}>
                    <div className={styles.categoryHeader}>
                      <h4 className={styles.categoryName}>{category.name}</h4>
                      
                      <div className={styles.categoryBadges}>
                        {category.showInHeader && (
                          <span className={styles.headerBadge}>NO HEADER</span>
                        )}
                        
                        {!category.isActive && (
                          <span className={styles.inactiveBadge}>INATIVA</span>
                        )}
                      </div>
                    </div>
                    
                    <p className={styles.categoryDescription}>
                      {category.description || 'Sem descrição'}
                    </p>
                  </div>
                </div>

                <div className={styles.categoryActions}>
                  {/* Controles de Ordem */}
                  <div className={styles.orderControls}>
                    <button
                      onClick={() => handleMoveUp(category)}
                      disabled={category.order === 1}
                      className={`${styles.orderBtn} ${category.order === 1 ? styles.disabled : ''}`}
                      title="Mover para cima"
                    >
                      <FaArrowUp />
                    </button>
                    <button
                      onClick={() => handleMoveDown(category)}
                      disabled={category.order === Math.max(...categories.map(c => c.order))}
                      className={`${styles.orderBtn} ${category.order === Math.max(...categories.map(c => c.order)) ? styles.disabled : ''}`}
                      title="Mover para baixo"
                    >
                      <FaArrowDown />
                    </button>
                  </div>

                  {/* Toggle Header */}
                  <button
                    onClick={() => handleToggleHeader(category.id)}
                    className={`${styles.actionBtn} ${category.showInHeader ? styles.headerActive : styles.headerInactive}`}
                    title={category.showInHeader ? 'Remover do header' : 'Adicionar ao header'}
                  >
                    {category.showInHeader ? <FaEye /> : <FaEyeSlash />}
                  </button>

                  {/* Editar */}
                  <button
                    onClick={() => openModal(category)}
                    className={`${styles.actionBtn} ${styles.editBtn}`}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>

                  {/* Excluir */}
                  <button
                    onClick={() => handleDelete(category.id, category.name)}
                    className={`${styles.actionBtn} ${styles.deleteBtn}`}
                    title="Excluir"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <FaTag className={styles.emptyIcon} />
            <h3>Nenhuma categoria encontrada</h3>
            <p>Comece criando sua primeira categoria</p>
            <button 
              onClick={() => openModal()}
              className={styles.primaryBtn}
            >
              <FaPlus /> Criar Primeira Categoria
            </button>
          </div>
        )}
      </div>

      {/* Modal de Categoria */}
      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContainer}>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>
                {editingCategory ? '✏️ Editar Categoria' : '🏷️ Nova Categoria'}
              </h3>
              <button
                onClick={closeModal}
                className={styles.modalCloseBtn}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  📝 Nome da Categoria *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className={styles.formInput}
                  placeholder="Ex: Vestidos"
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  📄 Descrição
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className={styles.formTextarea}
                  placeholder="Descreva a categoria..."
                />
              </div>

              <div className={styles.formOptions}>
                <label className={styles.optionLabel}>
                  <input
                    type="checkbox"
                    name="showInHeader"
                    checked={formData.showInHeader}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>👁️ Mostrar no Header do Site</span>
                    <span className={styles.optionDescription}>
                      A categoria aparecerá no menu principal
                    </span>
                  </div>
                </label>
                
                <label className={styles.optionLabel}>
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  <div className={styles.optionContent}>
                    <span className={styles.optionTitle}>✅ Categoria Ativa</span>
                    <span className={styles.optionDescription}>
                      Categoria disponível para uso
                    </span>
                  </div>
                </label>
              </div>

              <div className={styles.modalActions}>
                <button
                  type="button"
                  onClick={closeModal}
                  className={styles.cancelBtn}
                >
                  ❌ Cancelar
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                >
                  <FaSave /> {editingCategory ? 'Atualizar' : 'Salvar'}
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