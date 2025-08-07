import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate, useLocation } from 'react-router-dom'; // Importa useParams e useNavigate
// REMOVER: import Layout from '../../components/common/Layout/Layout'; // REMOVA esta linha
import ProductGrid from '../../components/product/ProductGrid/ProductGrid';
import ProductFilters from '../../components/product/ProductFilters/ProductFilters';
import { useProducts } from '../../hooks/useProducts'; // Certifique-se que este hook retorna todos os produtos
import { useCategories } from '../../hooks/useCategories'; // Certifique-se que este hook retorna as categorias
import { FaFilter, FaTimes, FaSort, FaThLarge, FaList } from 'react-icons/fa';
import styles from './Catalog.module.css';

const Catalog = () => {
  const { products } = useProducts(); // Assume que useProducts retorna a lista COMPLETA de produtos
  const { categories, getCategoryBySlug } = useCategories(); // Assume que useCategories retorna as categorias
  
  const { categorySlug: paramCategorySlug } = useParams(); // NOVO: Pega o slug da categoria do PATH da URL
  const [searchParams, setSearchParams] = useSearchParams(); // Para query params como ?search=
  const navigate = useNavigate(); // Para navegar quando um filtro de categoria muda
  const location = useLocation(); // Para obter a query string de busca (q)

  // Estados do componente
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [isLoading, setIsLoading] = useState(true); // Inicializa como true para mostrar loading ao carregar
  
  // Inicializar filtros com base nos parâmetros da URL (PATH e QUERY)
  const initialFilters = useMemo(() => {
    const querySearch = searchParams.get('q') || ''; // Usando 'q' para termo de busca
    const querySortBy = searchParams.get('sort') || 'name';
    const queryOnlyPromo = searchParams.get('promo') === 'true';
    const queryOnlyNew = searchParams.get('new') === 'true';
    // Outros filtros (sizes, colors, priceRange) podem ser inicializados via query params se você desejar
    // Por enquanto, vamos deixá-los como vazios/padrão

    return {
      category: paramCategorySlug || '', // Categoria vem do PATH
      search: querySearch, // Busca vem da QUERY
      priceRange: [0, products ? Math.max(...products.map(p => p.salePrice || p.price)) : 1000], // Valor dinâmico
      sizes: searchParams.getAll('size') || [], // Exemplo: ?size=P&size=M
      colors: searchParams.getAll('color') || [],
      sortBy: querySortBy,
      onlyPromo: queryOnlyPromo,
      onlyNew: queryOnlyNew
    };
  }, [paramCategorySlug, searchParams, products]); // Depende de products para maxPrice

  const [filters, setFilters] = useState(initialFilters);

  // Efeito para sincronizar os filtros internos com as mudanças na URL
  // e para lidar com o estado de loading dos produtos
  useEffect(() => {
    // Atualiza o estado interno de filters sempre que paramCategorySlug ou searchParams mudarem
    setFilters(prevFilters => {
      const newSearch = searchParams.get('q') || '';
      const newSortBy = searchParams.get('sort') || 'name';
      const newOnlyPromo = searchParams.get('promo') === 'true';
      const newOnlyNew = searchParams.get('new') === 'true';
      const newSizes = searchParams.getAll('size') || [];
      const newColors = searchParams.getAll('color') || [];

      // Certifique-se de que os valores numéricos para priceRange são tratados corretamente
      const minPriceParam = parseFloat(searchParams.get('minPrice'));
      const maxPriceParam = parseFloat(searchParams.get('maxPrice'));

      const newPriceRange = [
        isNaN(minPriceParam) ? 0 : minPriceParam,
        isNaN(maxPriceParam) ? (products ? Math.max(...products.map(p => p.salePrice || p.price)) : 1000) : maxPriceParam
      ];

      return {
        ...prevFilters,
        category: paramCategorySlug || '',
        search: newSearch,
        sortBy: newSortBy,
        onlyPromo: newOnlyPromo,
        onlyNew: newOnlyNew,
        sizes: newSizes,
        colors: newColors,
        priceRange: newPriceRange
      };
    });

    // Simula o carregamento dos produtos. Na vida real, o `useProducts` poderia ter um estado de loading.
    if (products.length > 0) { // Se products já carregou, simula a finalização do loading
      const timer = setTimeout(() => setIsLoading(false), 300); // Pequeno delay para UX
      return () => clearTimeout(timer);
    } else { // Se products ainda está vazio (não carregado), mantém loading
      setIsLoading(true);
    }
  }, [paramCategorySlug, searchParams, products]);


  // Obter categoria atual formatada
  const currentCategory = useMemo(() => {
    if (filters.category) {
      // Prioriza a busca por slug, depois por nome
      return getCategoryBySlug(filters.category) ||
             categories.find(cat => cat.name.toLowerCase().replace(/ /g, '-') === filters.category.toLowerCase());
    }
    return null;
  }, [filters.category, categories, getCategoryBySlug]);

  // Filtrar e ordenar produtos (agora usa o estado `filters` que é sincronizado com a URL)
  const filteredProducts = useMemo(() => {
    let filtered = [...products]; // Começa com a lista completa de produtos

    // Filtro por busca (termos de search da URL)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        (product.category && product.category.toLowerCase().includes(searchTerm)) ||
        (product.description && product.description.toLowerCase().includes(searchTerm))
      );
    }

    // Filtro por categoria (do PATH da URL ou do filtro selecionado)
    if (filters.category) {
      // Garante que compara com o slug formatado para a categoria do produto
      filtered = filtered.filter(product =>
        product.category &&
        product.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') === filters.category.toLowerCase()
      );
    }

    // Filtro por tamanhos
    if (filters.sizes && filters.sizes.length > 0) {
      filtered = filtered.filter(product =>
        product.sizes && product.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Filtro por cores
    if (filters.colors && filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        product.colors && product.colors.some(color => filters.colors.includes(color))
      );
    }

    // Filtro por faixa de preço
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.price;
      return price >= filters.priceRange[0] && price <= filters.priceRange[1];
    });

    // Filtro por promoção
    if (filters.onlyPromo) {
      filtered = filtered.filter(product => product.isPromo && product.salePrice);
    }

    // Filtro por novidades
    if (filters.onlyNew) {
      filtered = filtered.filter(product => product.isNew);
    }

    // Ordenação
    filtered.sort((a, b) => {
      const priceA = a.salePrice || a.price;
      const priceB = b.salePrice || b.price;
      switch (filters.sortBy) {
        case 'price-low':
          return priceA - priceB;
        case 'price-high':
          return priceB - priceA;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    return filtered;
  }, [products, filters]); // Depende da lista completa de produtos e do estado `filters`


  // Obter todas as opções de filtro disponíveis (ex: todos os tamanhos, cores existentes nos produtos)
  const filterOptions = useMemo(() => {
    const allSizes = new Set();
    const allColors = new Set();
    let maxPrice = 1000; // Valor padrão

    if (products && products.length > 0) {
      products.forEach(p => {
        p.sizes?.forEach(s => allSizes.add(s));
        p.colors?.forEach(c => allColors.add(c));
        maxPrice = Math.max(maxPrice, p.salePrice || p.price);
      });
    }

    return {
      sizes: Array.from(allSizes).sort(),
      colors: Array.from(allColors).sort(),
      maxPrice: Math.ceil(maxPrice / 100) * 100 // Arredonda para cima para múltiplos de 100
    };
  }, [products]);


  // Handler genérico para mudança de filtros
  const handleFilterChange = useCallback((newFilterValues) => {
    // Se a categoria muda e é diferente do paramCategorySlug atual, navega para a nova rota de categoria
    if (newFilterValues.category && newFilterValues.category !== paramCategorySlug) {
      navigate(`/categoria/${newFilterValues.category}`);
      // Limpa os searchParams existentes ao navegar para uma nova categoria
      setSearchParams({});
      // O useEffect lidará com a atualização do estado `filters` ao reconhecer a nova URL
      return;
    }

    // Atualiza o estado `filters` localmente
    setFilters(prevFilters => ({ ...prevFilters, ...newFilterValues }));

    // Atualiza os searchParams da URL
    const newSearchParams = new URLSearchParams();

    // Mantém o termo de busca na URL se existir
    if (newFilterValues.search) newSearchParams.set('q', newFilterValues.search);
    if (newFilterValues.sortBy && newFilterValues.sortBy !== 'name') newSearchParams.set('sort', newFilterValues.sortBy);
    if (newFilterValues.onlyPromo) newSearchParams.set('promo', 'true');
    if (newFilterValues.onlyNew) newSearchParams.set('new', 'true');

    // Adiciona tamanhos e cores como múltiplos search params
    newFilterValues.sizes?.forEach(size => newSearchParams.append('size', size));
    newFilterValues.colors?.forEach(color => newSearchParams.append('color', color));

    // Adiciona faixa de preço
    if (newFilterValues.priceRange && (newFilterValues.priceRange[0] > 0 || newFilterValues.priceRange[1] < filterOptions.maxPrice)) {
      newSearchParams.set('minPrice', newFilterValues.priceRange[0].toString());
      newSearchParams.set('maxPrice', newFilterValues.priceRange[1].toString());
    }

    setSearchParams(newSearchParams); // Atualiza a URL
  }, [paramCategorySlug, navigate, setSearchParams, filterOptions.maxPrice]);


  const clearFilters = useCallback(() => {
    // Resetar para os valores iniciais, mas mantendo a categoria do path
    const clearedFilters = {
      category: paramCategorySlug || '', // Mantém a categoria do path
      search: '',
      priceRange: [0, filterOptions.maxPrice],
      sizes: [],
      colors: [],
      sortBy: 'name',
      onlyPromo: false,
      onlyNew: false
    };
    setFilters(clearedFilters);
    // Limpar todos os query parameters da URL
    setSearchParams({});
  }, [paramCategorySlug, setSearchParams, filterOptions.maxPrice]);

  const toggleMobileFilters = useCallback(() => {
    setIsMobileFiltersOpen(prev => !prev);
  }, []);

  // Título da página baseado nos filtros ativos
  const pageTitle = useMemo(() => {
    if (filters.search) {
      return `Resultados para "${filters.search}"`;
    }
    if (currentCategory) {
      return currentCategory.name;
    }
    // Formata o categorySlug se houver e nenhuma categoria for encontrada no data
    if (paramCategorySlug) {
      return paramCategorySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }
    return 'Todos os Produtos';
  }, [filters.search, currentCategory, paramCategorySlug]);

  // Subtítulo da página
  const pageSubtitle = useMemo(() => {
    const count = filteredProducts.length;
    const itemText = count === 1 ? 'produto encontrado' : 'produtos encontrados';
    
    if (filters.search) {
      return `${count} ${itemText}`;
    }
    if (currentCategory) {
      return `${count} ${itemText} • ${currentCategory.description || 'Confira nossa seleção'}`;
    }
    if (paramCategorySlug) {
      return `${count} ${itemText} • Produtos em ${pageTitle}`;
    }
    return `${count} ${itemText} • Confira toda nossa coleção`;
  }, [filteredProducts.length, filters.search, currentCategory, paramCategorySlug, pageTitle]);

  return (
    // REMOVER: <Layout> // REMOVA esta tag
    <div className={styles.catalog}>
      <div className={styles.container}>
        {/* Header da página de catálogo */}
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <div className={styles.titleSection}>
              <h1 className={styles.title}>{pageTitle}</h1>
              <p className={styles.subtitle}>{pageSubtitle}</p>
            </div>

            {/* Controles do header (Ordenação, View Mode, Botão Mobile Filters) */}
            <div className={styles.headerControls}>
              {/* Ordenação */}
              <div className={styles.sortContainer}>
                <label className={styles.sortLabel}>
                  <FaSort className={styles.sortIcon} />
                  Ordenar por:
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) => handleFilterChange({ ...filters, sortBy: e.target.value })}
                  className={styles.sortSelect}
                >
                  <option value="name">Nome (A-Z)</option>
                  <option value="price-low">Menor preço</option>
                  <option value="price-high">Maior preço</option>
                </select>
              </div>

              {/* Modo de visualização */}
              <div className={styles.viewModeContainer}>
                <button
                  className={`${styles.viewModeButton} ${viewMode === 'grid' ? styles.active : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Visualização em grade"
                >
                  <FaThLarge />
                </button>
                <button
                  className={`${styles.viewModeButton} ${viewMode === 'list' ? styles.active : ''}`}
                  onClick={() => setViewMode('list')}
                  title="Visualização em lista"
                >
                  <FaList />
                </button>
              </div>

              {/* Botão de filtros mobile */}
              <button
                className={styles.mobileFiltersButton}
                onClick={toggleMobileFilters}
              >
                <FaFilter />
                Filtros
              </button>
            </div>
          </div>

          {/* Tags de filtros ativos */}
          {(filters.search || filters.category || filters.sizes.length > 0 || filters.colors.length > 0 || filters.onlyPromo || filters.onlyNew) && (
            <div className={styles.activeFilters}>
              <div className={styles.filterTags}>
                {filters.search && (
                  <span className={styles.filterTag}>
                    Busca: "{filters.search}"
                    <button onClick={() => handleFilterChange({ ...filters, search: '' })}>
                      <FaTimes />
                    </button>
                  </span>
                )}

                {filters.category && (
                  <span className={styles.filterTag}>
                    Categoria: {currentCategory?.name || filters.category}
                    <button onClick={() => handleFilterChange({ ...filters, category: '' })}>
                      <FaTimes />
                    </button>
                  </span>
                )}

                {filters.sizes.map(size => (
                  <span key={size} className={styles.filterTag}>
                    Tamanho: {size}
                    <button onClick={() => handleFilterChange({
                      ...filters,
                      sizes: filters.sizes.filter(s => s !== size)
                    })}>
                      <FaTimes />
                    </button>
                  </span>
                ))}

                {filters.colors.map(color => (
                  <span key={color} className={styles.filterTag}>
                    Cor: {color}
                    <button onClick={() => handleFilterChange({
                      ...filters,
                      colors: filters.colors.filter(c => c !== color)
                    })}>
                      <FaTimes />
                    </button>
                  </span>
                ))}

                {filters.onlyPromo && (
                  <span className={styles.filterTag}>
                    Apenas promoções
                    <button onClick={() => handleFilterChange({ ...filters, onlyPromo: false })}>
                      <FaTimes />
                    </button>
                  </span>
                )}

                {filters.onlyNew && (
                  <span className={styles.filterTag}>
                    Apenas novidades
                    <button onClick={() => handleFilterChange({ ...filters, onlyNew: false })}>
                      <FaTimes />
                    </button>
                  </span>
                )}

                 {/* Tags para preço mínimo/máximo */}
                {filters.priceRange[0] > 0 && (
                  <span className={styles.filterTag}>
                    Preço Min: R\$ {filters.priceRange[0].toFixed(2).replace('.', ',')}
                    <button onClick={() => handleFilterChange({ ...filters, priceRange: [0, filters.priceRange[1]] })}>
                      <FaTimes />
                    </button>
                  </span>
                )}
                {filters.priceRange[1] < filterOptions.maxPrice && (
                  <span className={styles.filterTag}>
                    Preço Max: R\$ {filters.priceRange[1].toFixed(2).replace('.', ',')}
                    <button onClick={() => handleFilterChange({ ...filters, priceRange: [filters.priceRange[0], filterOptions.maxPrice] })}>
                      <FaTimes />
                    </button>
                  </span>
                )}
              </div>

              <button className={styles.clearFiltersButton} onClick={clearFilters}>
                Limpar filtros
              </button>
            </div>
          )}
        </div>

        {/* Conteúdo principal */}
        <div className={styles.content}>
          {/* Sidebar com filtros */}
          <aside className={`${styles.sidebar} ${isMobileFiltersOpen ? styles.sidebarOpen : ''}`}>
            <div className={styles.filtersHeader}>
              <h3 className={styles.filtersTitle}>
                <FaFilter />
                Filtros
              </h3>
              <button
                className={styles.closeMobileFilters}
                onClick={() => setIsMobileFiltersOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              filterOptions={filterOptions}
              categories={categories}
            />
          </aside>

          {/* Overlay para filtros mobile */}
          {isMobileFiltersOpen && (
            <div
              className={styles.mobileFiltersOverlay}
              onClick={() => setIsMobileFiltersOpen(false)}
            />
          )}

          {/* Grid de produtos */}
          <main className={styles.main}>
            {isLoading || !products ? ( // Verifica se products ainda está sendo carregado pelo hook
              <div className={styles.loading}>
                <div className={styles.loadingSpinner}></div>
                <p>Carregando produtos...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <ProductGrid
                products={filteredProducts}
                viewMode={viewMode}
              />
            ) : (
              <div className={styles.noResults}>
                <div className={styles.noResultsIcon}>🔍</div>
                <h3>Nenhum produto encontrado</h3>
                <p>
                  {filters.search
                    ? `Não encontramos produtos para "${filters.search}"`
                    : 'Não há produtos que correspondam aos filtros selecionados'
                  }
                </p>
                <div className={styles.noResultsActions}>
                  <button onClick={clearFilters} className={styles.clearFiltersBtn}>
                    Limpar filtros
                  </button>
                  <a href="/catalogo" className={styles.viewAllBtn}>
                    Ver todos os produtos
                  </a>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
            </div>

  );
};

export default Catalog;