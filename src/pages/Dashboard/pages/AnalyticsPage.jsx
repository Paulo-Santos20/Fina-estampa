import React from 'react';
import { FaFileAlt, FaChartLine } from 'react-icons/fa';
import styles from '../Dashboard.module.css';

const AnalyticsPage = ({ user, timeRange }) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <FaFileAlt className={styles.sectionIcon} />
          Relatórios e Analytics
        </h2>
      </div>
      
      <div className={styles.chartPlaceholder}>
        <FaChartLine className={styles.chartIcon} />
        <p>Relatórios Detalhados</p>
        <small>Implementação em desenvolvimento</small>
      </div>
    </section>
  );
};

export default AnalyticsPage;