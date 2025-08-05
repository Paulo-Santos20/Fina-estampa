import React from 'react';
import { FaCog, FaSave } from 'react-icons/fa';
import styles from '../Dashboard.module.css';

const SettingsPage = ({ user, timeRange }) => {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <FaCog className={styles.sectionIcon} />
          Configurações do Sistema
        </h2>
        <button className={styles.viewAllButton}>
          <FaSave /> Salvar Alterações
        </button>
      </div>
      
      <div className={styles.chartPlaceholder}>
        <FaCog className={styles.chartIcon} />
        <p>Configurações Gerais</p>
        <small>Implementação em desenvolvimento</small>
      </div>
    </section>
  );
};

export default SettingsPage;