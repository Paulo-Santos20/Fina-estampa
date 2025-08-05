import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaArrowLeft, FaHeart } from 'react-icons/fa';
import Layout from '../../components/common/Layout/Layout';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const popularCategories = [
    { name: 'Vestidos', link: '/categoria/vestidos', icon: '👗' },
    { name: 'Blusas', link: '/categoria/blusas', icon: '👚' },
    { name: 'Calças', link: '/categoria/calcas', icon: '👖' },
    { name: 'Acessórios', link: '/categoria/acessorios', icon: '👜' }
  ];

  return (
    <Layout>
      <div className={styles.notFoundPage}>
        <div className={styles.container}>
          <div className={styles.notFoundContent}>
            {/* Ilustração 404 */}
            <div className={styles.illustration}>
              <div className={styles.number404}>
                <span className={styles.digit}>4</span>
                <span className={styles.digit}>0</span>
                <span className={styles.digit}>4</span>
              </div>
              <div className={styles.fashionIcons}>
                <span className={styles.icon}>👗</span>
                <span className={styles.icon}>👠</span>
                <span className={styles.icon}>👜</span>
                <span className={styles.icon}>💄</span>
              </div>
            </div>

            {/* Conteúdo Principal */}
            <div className={styles.mainContent}>
              <h1 className={styles.title}>Ops! Página não encontrada</h1>
              <p className={styles.subtitle}>
                Parece que a página que você está procurando saiu de moda ou não existe mais.
              </p>
              <p className={styles.description}>
                Mas não se preocupe! Temos muitas outras peças incríveis esperando por você.
              </p>

              {/* Botões de Ação */}
              <div className={styles.actionButtons}>
                <button 
                  onClick={handleGoBack}
                  className={styles.backButton}
                >
                  <FaArrowLeft />
                  Voltar
                </button>
                
                <Link to="/" className={styles.homeButton}>
                  <FaHome />
                  Ir para Home
                </Link>
              </div>

              {/* Barra de Busca */}
              <div className={styles.searchSection}>
                <h3 className={styles.searchTitle}>
                  <FaSearch />
                  Que tal procurar algo específico?
                </h3>
                <div className={styles.searchBox}>
                  <input
                    type="text"
                    placeholder="Buscar por vestidos, blusas, acessórios..."
                    className={styles.searchInput}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && e.target.value.trim()) {
                        navigate(`/busca?q=${encodeURIComponent(e.target.value)}`);
                      }
                    }}
                  />
                  <button className={styles.searchButton}>
                    <FaSearch />
                  </button>
                </div>
              </div>

              {/* Categorias Populares */}
              <div className={styles.categoriesSection}>
                <h3 className={styles.categoriesTitle}>Ou explore nossas categorias mais populares:</h3>
                <div className={styles.categoriesGrid}>
                  {popularCategories.map((category, index) => (
                    <Link 
                      key={index}
                      to={category.link} 
                      className={styles.categoryCard}
                    >
                      <span className={styles.categoryIcon}>{category.icon}</span>
                      <span className={styles.categoryName}>{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Informações de Contato */}
              <div className={styles.helpSection}>
                <h3 className={styles.helpTitle}>Precisa de ajuda?</h3>
                <p className={styles.helpText}>
                  Nossa equipe está sempre pronta para te ajudar a encontrar a peça perfeita!
                </p>
                <div className={styles.helpButtons}>
                  <Link to="/contato" className={styles.contactButton}>
                    Fale Conosco
                  </Link>
                  <a 
                    href="https://wa.me/5511999999999?text=Olá! Preciso de ajuda para encontrar um produto."
                    
                    rel="noopener noreferrer"
                    className={styles.whatsappButton}
                  >
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Elementos Decorativos */}
          <div className={styles.decorativeElements}>
            <div className={styles.circle1}></div>
            <div className={styles.circle2}></div>
            <div className={styles.circle3}></div>
          </div>
        </div>

        {/* Rodapé da Página 404 */}
        <div className={styles.notFoundFooter}>
          <p>
            Feito com <FaHeart className={styles.heartIcon} /> pela equipe Fina Estampa
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;