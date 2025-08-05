import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';
import styles from './CategoryBreadcrumb.module.css';

const CategoryBreadcrumb = ({ category, className = '' }) => {
  return (
    <nav className={`${styles.breadcrumb} ${className}`} aria-label="Navegação">
      <ol className={styles.breadcrumbList}>
        <li className={styles.breadcrumbItem}>
          <Link to="/" className={styles.breadcrumbLink}>
            <FaHome />
            Início
          </Link>
        </li>
        
        <li className={styles.breadcrumbSeparator}>
          <FaChevronRight />
        </li>
        
        <li className={styles.breadcrumbItem}>
          <Link to="/categorias" className={styles.breadcrumbLink}>
            Categorias
          </Link>
        </li>
        
        <li className={styles.breadcrumbSeparator}>
          <FaChevronRight />
        </li>
        
        <li className={`${styles.breadcrumbItem} ${styles.current}`}>
          <span className={styles.breadcrumbCurrent}>
            {category.name}
          </span>
        </li>
      </ol>
    </nav>
  );
};

export default CategoryBreadcrumb;a