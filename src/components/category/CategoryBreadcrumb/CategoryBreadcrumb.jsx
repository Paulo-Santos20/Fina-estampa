import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import styles from './CategoryBreadcrumb.module.css';

const CategoryBreadcrumb = ({ category, className = '' }) => {
  if (!category) {
    return null;
  }

  return (
    <nav className={`${styles.breadcrumb} ${className}`} aria-label="Navegação estrutural">
      <ol className={styles.breadcrumbList}>
        {/* Home */}
        <li className={styles.breadcrumbItem}>
          <Link to="/" className={styles.breadcrumbLink}>
            <FaHome className={styles.homeIcon} />
            <span>Início</span>
          </Link>
        </li>
        
        <li className={styles.breadcrumbSeparator} aria-hidden="true">
          <FaChevronRight />
        </li>
        
        {/* Categorias */}
        <li className={styles.breadcrumbItem}>
          <Link to="/categorias" className={styles.breadcrumbLink}>
            Categorias
          </Link>
        </li>
        
        <li className={styles.breadcrumbSeparator} aria-hidden="true">
          <FaChevronRight />
        </li>
        
        {/* Categoria atual */}
        <li className={`${styles.breadcrumbItem} ${styles.current}`}>
          <span className={styles.breadcrumbCurrent} aria-current="page">
            {category.name}
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumb;