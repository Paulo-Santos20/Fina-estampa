import React, { useState, useMemo, useEffect } from 'react';
import { FaBox, FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaSave, FaTimes, FaImage } from 'react-icons/fa';
import { allProducts } from '../../../data/products';
import styles from '../Dashboard.module.css';

const ProductsPage = ({ user, timeRange }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    salePrice: '',
    description: '',
    image: '',
    sizes: [],
    colors: [],
    isNew: false,
    isPromo: false
  });

  // Carregar produtos do localStorage ou usar dados padrão
  useEffect(() => {
    const savedProducts = localStorage.getItem('finaEstampaProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      // Inicializar com produtos padrão e salvar no localStorage
      setProducts(allProducts);
      localStorage.setItem('finaEstampaProducts', JSON.stringify(allProducts));
    }
  }, []);

  // Salvar produtos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem('finaEstampaProducts', JSON.stringify(products));
    }
  }, [products]);

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category))];
    return ['all', ...cats];
  }, [products]);

  const availableSizes = ['PP', 'P', 'M', 'G', 'GG', 'XG'];
  const availableColors = ['Preto', 'Branco', 'Azul', 'Vermelho', 'Rosa', 'Verde', 'Amarelo', 'Roxo', 'Marrom', 'Cinza'];

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.category === filterCategory);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return (a.salePrice || a.price) - (b.salePrice || b.price);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, filterCategory, sortBy]);

  // Handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSizeChange = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size) 
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleColorChange = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color) 
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        salePrice: product.salePrice ? product.salePrice.toString() : '',
        description: product.description || '',
        image: product.image,
        sizes: product.sizes || [],
        colors: product.colors || [],
        isNew: product.isNew || false,
        isPromo: product.isPromo || false
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        price: '',
        salePrice: '',
        description: '',
        image: '',
        sizes: [],
        colors: [],
        isNew: false,
        isPromo: false
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setFormData({
      name: '',
      category: '',
      price: '',
      salePrice: '',
      description: '',
      image: '',
      sizes: [],
      colors: [],
      isNew: false,
      isPromo: false
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price) {
      alert('Por favor, preencha todos os campos obrigatórios');
      return;
    }

    const productData = {
      id: editingProduct ? editingProduct.id : Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
      description: formData.description,
      image: formData.image || "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LXNpemU9IjgwIj7wn5GXPC90ZXh0Pgo8dGV4dCB4PSIxNTAiIHk9IjI0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0IiBmb250LXdlaWdodD0iNjAwIj5GaW5hIEVzdGFtcGE8L3RleHQ+Cjwvc3ZnPgo=",
      sizes: formData.sizes,
      colors: formData.colors,
      isNew: formData.isNew,
      isPromo: formData.isPromo
    };

    if (editingProduct) {
      // Editar produto existente
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? productData : p));
      alert('Produto atualizado com sucesso!');
    } else {
      // Adicionar novo produto
      setProducts(prev => [...prev, productData]);
      alert('Produto adicionado com sucesso!');
    }

    closeModal();
  };

  const handleDelete = (productId) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
      alert('Produto excluído com sucesso!');
    }
  };

  return (
    <>
      {/* Header com Ações */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>
            <FaBox className={styles.sectionIcon} />
            Gerenciar Produtos ({filteredProducts.length})
          </h2>
          <button 
            className={styles.viewAllButton}
            onClick={() => openModal()}
          >
            <FaPlus /> Novo Produto
          </button>
        </div>

        {/* Filtros e Busca */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem',
                border: '2px solid var(--cinza-claro)',
                borderRadius: 'var(--radius-medium)',
                fontSize: '0.9rem'
              }}
            />
          </div>
          
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            style={{
              padding: '0.8rem',
              border: '2px solid var(--cinza-claro)',
              borderRadius: 'var(--radius-medium)',
              fontSize: '0.9rem',
              minWidth: '150px'
            }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'Todas Categorias' : cat}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.8rem',
              border: '2px solid var(--cinza-claro)',
              borderRadius: 'var(--radius-medium)',
              fontSize: '0.9rem',
              minWidth: '120px'
            }}
          >
            <option value="name">Nome</option>
            <option value="price">Preço</option>
            <option value="category">Categoria</option>
          </select>
        </div>
      </section>

      {/* Lista de Produtos */}
      <section className={styles.section}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.orderRow} style={{ alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1 }}>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: 'var(--radius-medium)',
                    border: '2px solid var(--cinza-claro)'
                  }}
                  onError={(e) => {
                    e.target.src = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjhGOUZBIi8+Cjx0ZXh0IHg9IjMwIiB5PSIzNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzcyMkYzNyIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmb250LXdlaWdodD0iNjAwIj7wn5GXPC90ZXh0Pgo8L3N2Zz4K";
                  }}
                />
                <div>
                  <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--preto-secundario)', fontSize: '1rem' }}>
                    {product.name}
                  </h4>
                  <p style={{ margin: '0', color: 'var(--cinza-medio)', fontSize: '0.9rem' }}>
                    {product.category}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.3rem' }}>
                    {product.isNew && (
                      <span style={{
                        background: 'var(--dourado-sutil)',
                        color: 'var(--preto-secundario)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-small)',
                        fontSize: '0.7rem',
                        fontWeight: '600'
                      }}>
                        NOVO
                      </span>
                    )}
                    {product.isPromo && (
                      <span style={{
                        background: 'var(--wine-destaque)',
                        color: 'var(--white-principal)',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-small)',
                        fontSize: '0.7rem',
                        fontWeight: '600'
                      }}>
                        PROMOÇÃO
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {product.salePrice ? (
                    <>
                      <span style={{ 
                        textDecoration: 'line-through', 
                        color: 'var(--cinza-medio)', 
                        fontSize: '0.9rem' 
                      }}>
                        R\$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                      <span style={{ 
                        color: 'var(--wine-destaque)', 
                        fontWeight: '700', 
                        fontSize: '1.1rem' 
                      }}>
                        R\$ {product.salePrice.toFixed(2).replace('.', ',')}
                      </span>
                    </>
                  ) : (
                    <span style={{ 
                      color: 'var(--preto-secundario)', 
                      fontWeight: '700', 
                      fontSize: '1.1rem' 
                    }}>
                      R\$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => openModal(product)}
                    style={{
                      background: 'var(--dourado-sutil)',
                      border: 'none',
                      color: 'var(--preto-secundario)',
                      padding: '0.5rem',
                      borderRadius: 'var(--radius-medium)',
                      cursor: 'pointer',
                      fontSize: '0.9rem'
                    }}
                    title="Editar"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
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
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem', 
            color: 'var(--cinza-medio)' 
          }}>
            <FaBox style={{ fontSize: '3rem', marginBottom: '1rem' }} />
            <p>Nenhum produto encontrado</p>
          </div>
        )}
      </section>

      {/* Modal de Produto - CSS CORRIGIDO */}
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
            maxWidth: '700px',
            maxHeight: '90vh',
            overflow: 'auto',
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
                {editingProduct ? '✏️ Editar Produto' : '➕ Novo Produto'}
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
                    📝 Nome do Produto *
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

                {/* Categoria */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: 'var(--preto-secundario)',
                    fontSize: '0.95rem'
                  }}>
                    🏷️ Categoria *
                  </label>
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    placeholder="Ex: Vestidos, Blusas, Calças..."
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

                {/* Preços */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '600',
                      color: 'var(--preto-secundario)',
                      fontSize: '0.95rem'
                    }}>
                      💰 Preço *
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      required
                      min="0"
                      step="0.01"
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
                  <div>
                    <label style={{ 
                      display: 'block', 
                      marginBottom: '0.5rem', 
                      fontWeight: '600',
                      color: 'var(--preto-secundario)',
                      fontSize: '0.95rem'
                    }}>
                      🏷️ Preço Promocional
                    </label>
                    <input
                      type="number"
                      name="salePrice"
                      value={formData.salePrice}
                      onChange={handleInputChange}
                      min="0"
                      step="0.01"
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

                {/* URL da Imagem */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.5rem', 
                    fontWeight: '600',
                    color: 'var(--preto-secundario)',
                    fontSize: '0.95rem'
                  }}>
                    🖼️ URL da Imagem
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://exemplo.com/imagem.jpg"
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

                {/* Tamanhos */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.8rem', 
                    fontWeight: '600',
                    color: 'var(--preto-secundario)',
                    fontSize: '0.95rem'
                  }}>
                    📏 Tamanhos Disponíveis
                  </label>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                    gap: '0.8rem' 
                  }}>
                    {availableSizes.map(size => (
                      <label key={size} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        background: formData.sizes.includes(size) ? 'var(--rosa-suave)' : 'var(--cinza-claro)',
                        borderRadius: 'var(--radius-medium)',
                        border: formData.sizes.includes(size) ? '2px solid var(--wine-destaque)' : '2px solid transparent',
                        transition: 'all var(--transition-normal)',
                        color: 'var(--preto-secundario)',
                        fontWeight: '500'
                      }}>
                        <input
                          type="checkbox"
                          checked={formData.sizes.includes(size)}
                          onChange={() => handleSizeChange(size)}
                          style={{ accentColor: 'var(--wine-destaque)' }}
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Cores */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '0.8rem', 
                    fontWeight: '600',
                    color: 'var(--preto-secundario)',
                    fontSize: '0.95rem'
                  }}>
                    🎨 Cores Disponíveis
                  </label>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', 
                    gap: '0.8rem' 
                  }}>
                    {availableColors.map(color => (
                      <label key={color} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        background: formData.colors.includes(color) ? 'var(--rosa-suave)' : 'var(--cinza-claro)',
                        borderRadius: 'var(--radius-medium)',
                        border: formData.colors.includes(color) ? '2px solid var(--wine-destaque)' : '2px solid transparent',
                        transition: 'all var(--transition-normal)',
                        color: 'var(--preto-secundario)',
                        fontWeight: '500'
                      }}>
                        <input
                          type="checkbox"
                          checked={formData.colors.includes(color)}
                          onChange={() => handleColorChange(color)}
                          style={{ accentColor: 'var(--wine-destaque)' }}
                        />
                        {color}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Flags */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
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
                      name="isNew"
                      checked={formData.isNew}
                      onChange={handleInputChange}
                      style={{ 
                        accentColor: 'var(--dourado-sutil)',
                        transform: 'scale(1.2)'
                      }}
                    />
                    ✨ Produto Novo
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
                      name="isPromo"
                      checked={formData.isPromo}
                      onChange={handleInputChange}
                      style={{ 
                        accentColor: 'var(--wine-destaque)',
                        transform: 'scale(1.2)'
                      }}
                    />
                    🔥 Em Promoção
                  </label>
                </div>

                {/* Botões */}
                <div style={{ 
                  display: 'flex', 
                  gap: '1rem', 
                  justifyContent: 'flex-end', 
                  marginTop: '2rem',
                  paddingTop: '1rem',
                  borderTop: '1px solid var(--cinza-claro)'
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
                    <FaSave /> {editingProduct ? '💾 Atualizar' : '💾 Salvar'}
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

export default ProductsPage;