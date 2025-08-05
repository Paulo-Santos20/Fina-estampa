import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/common/Layout/Layout';
import ProductCard from '../../components/product/ProductCard/ProductCard';
import CategoryFilters from '../../components/category/CategoryFilters/CategoryFilters';
import CategoryBreadcrumb from '../../components/category/CategoryBreadcrumb/CategoryBreadcrumb';
import { allProducts, getCategoryBySlug } from '../../data/products';
import styles from './Category.module.css';

const Category = () => {
  const params = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Debug detalhado dos parâmetros
  console.log('🔍 Category.jsx - Todos os params:', params);
  console.log('🔍 Category.jsx - categorySlug específico:', params.categorySlug);
  console.log('🔍 Category.jsx - Location:', location);
  console.log('🔍 Category.jsx - Pathname:', location.pathname);
  
  // Extrair categorySlug dos parâmetros
  const categorySlug = params.categorySlug;
  
  // Estados
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    sizes: [],
    colors: [],
    brands: [],
    sortBy: 'relevance',
    inStock: false,
    onSale: false,
    freeShipping: false,
    isNew: false,
    rating: 0
  });
  const [currentCategory, setCurrentCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  // Mapear slugs para categorias
  const categoryMapping = {
    'vestidos': ['Vestidos'],
    'blusas': ['Blusas'],
    'calcas': ['Calças'],
    'saias': ['Saias', 'Macacões'],
    'acessorios': ['Acessórios'],
    'blazers': ['Blazers'],
    'jaquetas': ['Jaquetas'],
    'calcados': ['Calçados']
  };

  // Buscar categoria atual - executar sempre que categorySlug mudar
  useEffect(() => {
    console.log('🔄 useEffect - Category slug recebido:', categorySlug);
    console.log('🔄 useEffect - Tipo do categorySlug:', typeof categorySlug);
    
    if (!categorySlug) {
      console.log('❌ categorySlug está vazio/undefined/null');
      
      // Tentar extrair da URL manualmente
      const pathParts = location.pathname.split('/');
      console.log('🔍 Partes da URL:', pathParts);
      
      if (pathParts.length >= 3 && pathParts[1] === 'categoria') {
        const extractedSlug = pathParts[2];
        console.log('🔧 Slug extraído manualmente:', extractedSlug);
        
        const category = getCategoryBySlug(extractedSlug);
        if (category) {
          setCurrentCategory(category);
          console.log('✅ Categoria definida via extração manual:', category.name);
          return;
        }
      }
      
      console.log('❌ Não foi possível extrair categoria, redirecionando');
      navigate('/', { replace: true });
      return;
    }
    
    const category = getCategoryBySlug(categorySlug);
    console.log('🔍 Categoria encontrada:', category);
    
    if (category) {
      setCurrentCategory(category);
      console.log('✅ Categoria definida:', category.name);
    } else {
      console.log('❌ Categoria não encontrada, redirecionando para home');
      navigate('/', { replace: true });
    }
  }, [categorySlug, navigate, location.pathname]);

  // Filtrar produtos - executar sempre que categoria mudar
  useEffect(() => {
    if (!currentCategory) {
      console.log('⏳ Aguardando categoria...');
      return;
    }

    console.log('🔄 Filtrando produtos para categoria:', currentCategory.name);
    setIsLoading(true);
    
    // Usar o slug da categoria atual para buscar produtos
    const slugToUse = currentCategory.slug;
    console.log('🔍 Usando slug para filtrar:', slugToUse);
    
    // Simular delay de carregamento
    const timer = setTimeout(() => {
      let products = allProducts.filter(product => {
        const categoryNames = categoryMapping[slugToUse] || [];
        const matches = categoryNames.includes(product.category);
        if (matches) {
          console.log('✅ Produto encontrado:', product.name, 'Categoria:', product.category);
        }
        return matches;
      });

      console.log('📊 Produtos encontrados antes dos filtros:', products.length);

      // Aplicar filtros
      products = products.filter(product => {
        // Filtro de preço
        const price = product.salePrice || product.price;
        if (price < filters.priceRange[0] || price > filters.priceRange[1]) {
          return false;
        }

        // Filtro de tamanhos
        if (filters.sizes.length > 0) {
          const hasSize = filters.sizes.some(size => product.sizes?.includes(size));
          if (!hasSize) return false;
        }

        // Filtro de cores
        if (filters.colors.length > 0) {
          const hasColor = filters.colors.some(color => product.colors?.includes(color));
          if (!hasColor) return false;
        }

        // Filtro de marcas
        if (filters.brands.length > 0) {
          if (!filters.brands.includes(product.brand || 'Fina Estampa')) return false;
        }

        // Filtro de estoque
        if (filters.inStock && !product.inStock) {
          return false;
        }

        // Filtro de promoção
        if (filters.onSale && !product.isPromo) {
          return false;
        }

        // Filtro de frete grátis
        if (filters.freeShipping && !product.freeShipping) {
          return false;
        }

        // Filtro de novidades
        if (filters.isNew && !product.isNew) {
          return false;
        }

        // Filtro de avaliação
        if (filters.rating > 0 && (product.rating || 0) < filters.rating) {
          return false;
        }

        return true;
      });

      // Aplicar ordenação
      switch (filters.sortBy) {
        case 'price-low':
          products.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
          break;
        case 'price-high':
          products.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
          break;
        case 'name':
          products.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'rating':
          products.sort((a, b) => (b.rating || 0) - (a.rating || 0));
          break;
        case 'newest':
          products.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
          break;
        default:
          // Relevância - manter ordem original
          break;
      }

      console.log('📊 Produtos encontrados após filtros:', products.length);
      setFilteredProducts(products);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [currentCategory, filters]);

  // Resetar filtros quando categoria mudar
  useEffect(() => {
    if (currentCategory) {
      console.log('🔄 Resetando filtros para nova categoria');
      setFilters({
        priceRange: [0, 1000],
        sizes: [],
        colors: [],
        brands: [],
        sortBy: 'relevance',
        inStock: false,
        onSale: false,
        freeShipping: false,
        isNew: false,
        rating: 0
      });
    }
  }, [currentCategory]);

  // Função para atualizar filtros
  const handleFilterChange = (newFilters) => {
    console.log('🔄 Atualizando filtros:', newFilters);
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  // Função para limpar filtros
  const clearFilters = () => {
    console.log('🧹 Limpando todos os filtros');
    setFilters({
      priceRange: [0, 1000],
      sizes: [],
      colors: [],
      brands: [],
      sortBy: 'relevance',
      inStock: false,
      onSale: false,
      freeShipping: false,
      isNew: false,
      rating: 0
    });
  };

  // Loading state
  if (!currentCategory) {
    return (
      <Layout>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Carregando categoria...</p>
          <div style={{ fontSize: '12px', marginTop: '10px' }}>
            Debug: categorySlug = {categorySlug || 'undefined'} | pathname = {location.pathname}
          </div>
        </div>
      </Layout>
    );
  }

  console.log('🎨 Renderizando página da categoria:', currentCategory.name);

  return (
    <Layout>
      <div className={styles.categoryPage}>
        <div className={styles.container}>
          {/* Debug Info */}
          <div style={{ 
            background: '#f0f0f0', 
            padding: '10px', 
            margin: '10px 0', 
            borderRadius: '5px',
            fontSize: '12px'
          }}>
            <strong>DEBUG:</strong> 
            Categoria: {categorySlug || 'undefined'} | 
            Nome: {currentCategory?.name} | 
            Produtos: {filteredProducts.length} | 
            Loading: {isLoading.toString()}
          </div>

          {/* Breadcrumb */}
          <CategoryBreadcrumb 
            category={currentCategory}
            className={styles.breadcrumb}
          />

          {/* Header da Categoria */}
          <div className={styles.categoryHeader}>
            <div className={styles.categoryInfo}>
              <h1 className={styles.categoryTitle}>{currentCategory.name}</h1>
              <p className={styles.categoryDescription}>
                {currentCategory.description}
              </p>
              <div className={styles.categoryStats}>
                <span className={styles.productCount}>
                  {isLoading ? 'Carregando...' : `${filteredProducts.length} produtos encontrados`}
                </span>
              </div>
            </div>
            
            <div className={styles.categoryImage}>
              <img 
                src={currentCategory.image} 
                alt={currentCategory.name}
                className={styles.headerImage}
              />
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className={styles.categoryContent}>
            {/* Sidebar com Filtros */}
            <aside className={styles.sidebar}>
              <CategoryFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={clearFilters}
                productCount={filteredProducts.length}
                categorySlug={currentCategory.slug}
                isLoading={isLoading}
              />
            </aside>

            {/* Área de Produtos */}
            <main className={styles.productsArea}>
              {/* Barra de Ferramentas */}
              <div className={styles.toolbar}>
                <div className={styles.toolbarLeft}>
                  <span className={styles.resultsCount}>
                    {isLoading ? 'Carregando...' : `${filteredProducts.length} produtos`}
                  </span>
                </div>
                
                <div className={styles.toolbarRight}>
                  {/* Ordenação */}
                  <select 
                    value={filters.sortBy}
                    onChange={(e) => handleFilterChange({ sortBy: e.target.value })}
                    className={styles.sortSelect}
                    disabled={isLoading}
                  >
                    <option value="relevance">Mais Relevantes</option>
                    <option value="price-low">Menor Preço</option>
                    <option value="price-high">Maior Preço</option>
                    <option value="name">Nome A-Z</option>
                    <option value="rating">Melhor Avaliados</option>
                    <option value="newest">Mais Novos</option>
                  </select>

                  {/* Modo de Visualização */}
                  <div className={styles.viewModeButtons}>
                    <button
                      className={`${styles.viewModeBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                      onClick={() => setViewMode('grid')}
                      aria-label="Visualização em grade"
                      disabled={isLoading}
                    >
                      ⊞
                    </button>
                    <button
                      className={`${styles.viewModeBtn} ${viewMode === 'list' ? styles.active : ''}`}
                      onClick={() => setViewMode('list')}
                      aria-label="Visualização em lista"
                      disabled={isLoading}
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid de Produtos */}
              {isLoading ? (
                <div className={styles.loading}>
                  <div className={styles.spinner}></div>
                  <p>Carregando produtos...</p>
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className={`${styles.productsGrid} ${styles[viewMode]}`}>
                  {filteredProducts.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              ) : (
                <div className={styles.noProducts}>
                  <div className={styles.noProductsIcon}>🔍</div>
                  <h3>Nenhum produto encontrado</h3>
                  <p>Tente ajustar os filtros ou explore outras categorias</p>
                  <button 
                    onClick={clearFilters}
                    className={styles.clearFiltersBtn}
                  >
                    Limpar Filtros
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;