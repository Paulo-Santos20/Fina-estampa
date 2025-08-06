import React, { useState } from 'react';
import { FaTag, FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash, FaArrowUp, FaArrowDown, FaSave, FaTimes } from 'react-icons/fa';
import { useCategories } from '../../../hooks/useCategories';
import styles from '../Dashboard.module.css';

const CategoriesPage = ({ user, timeRange }) => {
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
      alert('Categoria atualizada com sucesso!');
    } else {
      addCategory(formData);
      alert('Categoria adicionada com sucesso!');
    }

    closeModal();
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      deleteCategory(categoryId);
      alert('Categoria excluída com sucesso!');
    }
  };

  const handleToggleHeader = (categoryId) => {
    toggleCategoryHeader(categoryId);
  };

  const handleMoveUp = (category) => {
    if (category.order > 1) {
      updateCategoryOrder(category.id, category.order - 1);
      // Atualizar a categoria que estava na posição anterior
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
      // Atualizar a categoria que estava na posição posterior
      const nextCategory = categories.find(c => c.order === category.order + 1);
      if (nextCategory) {
        updateCategoryOrder(nextCategory.id, category.order);
      }
    }
  };

  return (
    <>
      {/* Header */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <FaTag className={styles.sectionIcon} />
            Gerenciar Categorias ({categories.length})
          </h2>
          <button 
            className={styles.viewAllButton}
            onClick={() => openModal()}
          >
            <FaPlus /> Nova Categoria
          </button>
        </div>

        <div style={{ 
          background: 'var(--rosa-suave)', 
          padding: '1rem', 
          borderRadius: 'var(--radius-medium)',
          marginBottom: '1.5rem',
          border: '1px solid var(--wine-destaque)'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--wine-destaque)' }}>
            💡 Dica sobre Categorias no Header
          </h4>
          <p style={{ margin: 0, color: 'var(--preto-secundario)', fontSize: '0.9rem' }}>
            As categorias marcadas como "Mostrar no Header" aparecerão no menu principal do site. 
            Use a ordem para definir a sequência de exibição.
          </p>
        </div>
      </section>

      {/* Lista de Categorias */}
      <section className={styles.section}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {sortedCategories.map((category) => (
            <div key={category.id} className={styles.orderRow} style={{ alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <div style={{
                  width: '3rem',
                  height: '3rem',
                  background: category.showInHeader ? 'var(--wine-destaque)' : 'var(--cinza-medio)',
                  color: 'var(--white-principal)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1rem',
                  fontWeight: '700'
                }}>
                  {category.order}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.3rem' }}>
                    <h4 style={{ margin: 0, color: 'var(--preto-secundario)', fontSize: '1.1rem' }}>
                      {category.name}
                    </h4>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {category.showInHeader && (
                        <span style={{
                          background: 'var(--dourado-sutil)',
                          color: 'var(--preto-secundario)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-small)',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}>
                          NO HEADER
                        </span>
                      )}
                      
                      {!category.isActive && (
                        <span style={{
                          background: '#EF4444',
                          color: 'var(--white-principal)',
                          padding: '0.2rem 0.5rem',
                          borderRadius: 'var(--radius-small)',
                          fontSize: '0.7rem',
                          fontWeight: '600'
                        }}>
                          INATIVA
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p style={{ margin: 0, color: 'var(--cinza-medio)', fontSize: '0.9rem' }}>
                    {category.description}
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {/* Controles de Ordem */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <button
                    onClick={() => handleMoveUp(category)}
                    disabled={category.order === 1}
                    style={{
                      background: category.order === 1 ? 'var(--cinza-claro)' : 'var(--cinza-medio)',
                      border: 'none',
                      color: category.order === 1 ? 'var(--cinza-medio)' : 'var(--white-principal)',
                      padding: '0.3rem',
                      borderRadius: 'var(--radius-small)',
                      cursor: category.order === 1 ? 'not-allowed' : 'pointer',
                      fontSize: '0.7rem'
                    }}
                    title="Mover para cima"
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    onClick={() => handleMoveDown(category)}
                    disabled={category.order === Math.max(...categories.map(c => c.order))}
                    style={{
                      background: category.order === Math.max(...categories.map(c => c.order)) ? 'var(--cinza-claro)' : 'var(--cinza-medio)',
                      border: 'none',
                      color: category.order === Math.max(...categories.map(c => c.order)) ? 'var(--cinza-medio)' : 'var(--white-principal)',
                      padding: '0.3rem',
                      borderRadius: 'var(--radius-small)',
                      cursor: category.order === Math.max(...categories.map(c => c.order)) ? 'not-allowed' : 'pointer',
                      fontSize: '0.7rem'
                    }}
                    title="Mover para baixo"
                  >
                    <FaArrowDown />
                  </button>
                </div>

                {/* Toggle Header */}
                <button
                  onClick={() => handleToggleHeader(category.id)}
                  style={{
                    background: category.showInHeader ? 'var(--dourado-sutil)' : 'var(--cinza-claro)',
                    border: 'none',
                    color: category.showInHeader ? 'var(--preto-secundario)' : 'var(--cinza-medio)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-medium)',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                  title={category.showInHeader ? 'Remover do header' : 'Adicionar ao header'}
                >
                  {category.showInHeader ? <FaEye /> : <FaEyeSlash />}
                </button>

                {/* Editar */}
                <button
                  onClick={() => openModal(category)}
                  style={{
                    background: 'var(--wine-destaque)',
                    border: 'none',
                    color: 'var(--white-principal)',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-medium)',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                  title="Editar"
                >
                  <FaEdit />
                </button>

                {/* Excluir */}
                <button
                  onClick={() => handleDelete(category.id)}
                  style={{
                    background: '#EF4444',
                    border: 'none',
                    color: 'white',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-medium)',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                  title="Excluir"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'var(--cinza-medio)' 
          }}>
            <FaTag style={{ fontSize: '3rem', marginBottom: '1rem' }} />
            <p>Nenhuma categoria encontrada</p>
          </div>
        )}
      </section>

      {/* Modal de Categoria */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '1rem'
        }}>
          <div style={{
            background: 'var(--white-principal)',
            borderRadius: 'var(--radius-large)',
            padding: '2rem',
            width: '100%',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(114, 47, 55, 0.3)',
            border: '1px solid var(--cinza-claro)'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: '2rem',
              paddingBottom: '1rem',
              borderBottom: '2px solid var(--cinza-claro)'
            }}>
              <h3 style={{ 
                margin: 0, 
                color: 'var(--preto-secundario)',
                fontSize: '1.5rem',
                fontWeight: '600'
              }}>
                {editingCategory ? '✏️ Editar Categoria' : '🏷️ Nova Categoria'}
              </h3>
              <button
                onClick={closeModal}
                style={{
                  background: 'var(--cinza-claro)',
                  border: 'none',
                  color: 'var(--wine-destaque)',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-medium)',
                  transition: 'all var(--transition-normal)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--wine-destaque)';
                  e.target.style.color = 'var(--white-principal)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'var(--cinza-claro)';
                  e.target.style.color = 'var(--wine-destaque)';
                }}
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {/* Nome */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: 'var(--preto-secundario)',
                    fontSize: '0.95rem'
                  }}>
                    📝 Nome da Categoria *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid var(--cinza-claro)',
                      borderRadius: 'var(--radius-medium)',
                      fontSize: '0.9rem',
                      color: 'var(--preto-secundario)',
                      background: 'var(--white-principal)',
                      transition: 'border-color var(--transition-normal)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--wine-destaque)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--cinza-claro)'}
                  />
                </div>

                {/* Descrição */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: 'var(--preto-secundario)',
                    fontSize: '0.95rem'
                  }}>
                    📄 Descrição
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid var(--cinza-claro)',
                      borderRadius: 'var(--radius-medium)',
                      fontSize: '0.9rem',
                      resize: 'vertical',
                      color: 'var(--preto-secundario)',
                      background: 'var(--white-principal)',
                      transition: 'border-color var(--transition-normal)'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--wine-destaque)'}
                    onBlur={(e) => e.target.style.borderColor = 'var(--cinza-claro)'}
                  />
                </div>

                {/* Configurações */}
                <div style={{ 
                  display: 'grid', 
                  gap: '1rem',
                  padding: '1rem',
                  background: 'var(--cinza-claro)',
                  borderRadius: 'var(--radius-medium)'
                }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.8rem', 
                    cursor: 'pointer',
                    color: 'var(--preto-secundario)',
                    fontWeight: '500'
                  }}>
                    <input
                      type="checkbox"
                      name="showInHeader"
                      checked={formData.showInHeader}
                      onChange={handleInputChange}
                      style={{ 
                        accentColor: 'var(--dourado-sutil)',
                        transform: 'scale(1.2)'
                      }}
                    />
                    👁️ Mostrar no Header do Site
                  </label>
                  
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.8rem', 
                    cursor: 'pointer',
                    color: 'var(--preto-secundario)',
                    fontWeight: '500'
                  }}>
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={formData.isActive}
                      onChange={handleInputChange}
                      style={{ 
                        accentColor: 'var(--wine-destaque)',
                        transform: 'scale(1.2)'
                      }}
                    />
                    ✅ Categoria Ativa
                  </label>
                </div>

                {/* Botões */}
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  justifyContent: 'flex-end', 
                  marginTop: '1rem'
                }}>
                  <button
                    type="button"
                    onClick={closeModal}
                    style={{
                      padding: '0.8rem 1.5rem',
                      background: 'var(--cinza-claro)',
                      border: '2px solid var(--cinza-claro)',
                      color: 'var(--preto-secundario)',
                      borderRadius: 'var(--radius-medium)',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      transition: 'all var(--transition-normal)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--cinza-medio)';
                      e.target.style.color = 'var(--white-principal)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'var(--cinza-claro)';
                      e.target.style.color = 'var(--preto-secundario)';
                    }}
                  >
                    ❌ Cancelar
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '0.8rem 1.5rem',
                      background: 'var(--wine-destaque)',
                      border: '2px solid var(--wine-destaque)',
                      color: 'var(--white-principal)',
                      borderRadius: 'var(--radius-medium)',
                      cursor: 'pointer',
                      fontWeight: '600',
                      fontSize: '0.9rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      transition: 'all var(--transition-normal)'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'var(--preto-secundario)';
                      e.target.style.borderColor = 'var(--preto-secundario)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'var(--wine-destaque)';
                      e.target.style.borderColor = 'var(--wine-destaque)';
                    }}
                  >
                    <FaSave /> {editingCategory ? '💾 Atualizar' : '💾 Salvar'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoriesPage;