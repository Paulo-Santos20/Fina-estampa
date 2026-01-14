import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhone, 
  FaHeart, FaCreditCard, FaTruck, FaShieldAlt, FaArrowRight,
  FaChevronDown, FaChevronUp // Novos ícones
} from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Estado para controlar quais seções estão abertas no mobile
  const [openSection, setOpenSection] = useState('');

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? '' : section);
  };

  return (
    <footer className={styles.footer}>
      {/* Newsletter Compacta */}
      <div className={styles.miniNewsletter}>
        <div className={styles.container}>
          <div className={styles.newsletterContent}>
            <span className={styles.newsletterTitle}>GANHE 10% OFF NA PRIMEIRA COMPRA</span>
            <div className={styles.newsletterInputGroup}>
              <input type="email" placeholder="Digite seu e-mail..." />
              <button><FaArrowRight /></button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.container}>
          
          <div className={styles.topGrid}>
            
            {/* 1. Marca (Sempre visível) */}
            <div className={styles.brandColumn}>
              <Link to="/" className={styles.brandLogo}>Fina Estampa.</Link>
              <p className={styles.brandText}>
                Elegância e sofisticação para mulheres autênticas.
              </p>
              <div className={styles.socialRow}>
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="Facebook"><FaFacebook /></a>
                <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
              </div>
            </div>

            {/* 2. Institucional (Acordeão no Mobile) */}
            <div className={`${styles.linksColumn} ${openSection === 'institucional' ? styles.open : ''}`}>
              <h4 onClick={() => toggleSection('institucional')}>
                Institucional
                <span className={styles.accordionIcon}>
                  {openSection === 'institucional' ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </h4>
              <ul>
                <li><Link to="/sobre">Sobre Nós</Link></li>
                <li><Link to="/blog">Blog de Moda</Link></li>
                <li><Link to="/lojas">Nossas Lojas</Link></li>
                <li><Link to="/trabalhe-conosco">Trabalhe Conosco</Link></li>
              </ul>
            </div>

            {/* 3. Ajuda (Acordeão no Mobile) */}
            <div className={`${styles.linksColumn} ${openSection === 'ajuda' ? styles.open : ''}`}>
              <h4 onClick={() => toggleSection('ajuda')}>
                Ajuda & Suporte
                <span className={styles.accordionIcon}>
                  {openSection === 'ajuda' ? <FaChevronUp /> : <FaChevronDown />}
                </span>
              </h4>
              <ul>
                <li><Link to="/trocas">Trocas e Devoluções</Link></li>
                <li><Link to="/entregas">Frete e Entregas</Link></li>
                <li><Link to="/tamanhos">Guia de Medidas</Link></li>
                <li><Link to="/privacidade">Política de Privacidade</Link></li>
              </ul>
            </div>

            {/* 4. Contato (Sempre visível, mas compacto) */}
            <div className={styles.contactColumn}>
              <h4>Atendimento</h4>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <FaWhatsapp className={styles.icon} />
                  <div>
                    <strong>(11) 99999-9999</strong>
                    <span>Seg a Sex: 9h às 18h</span>
                  </div>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope className={styles.icon} />
                  <span>contato@finaestampa.com</span>
                </div>
              </div>
            </div>

          </div>

          <div className={styles.divider} />

          {/* Garantias (Grid 2x2 no mobile) */}
          <div className={styles.guaranteesRow}>
            <div className={styles.guaranteeItem}>
              <FaTruck /> <span>Frete Grátis > R$299</span>
            </div>
            <div className={styles.guaranteeItem}>
              <FaCreditCard /> <span>10x sem juros</span>
            </div>
            <div className={styles.guaranteeItem}>
              <FaShieldAlt /> <span>Site Seguro</span>
            </div>
            <div className={styles.guaranteeItem}>
              <FaHeart /> <span>1ª Troca Grátis</span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Copyright */}
          <div className={styles.bottomRow}>
            <p className={styles.copyText}>© {currentYear} Fina Estampa. CNPJ: 00.000.000/0001-00</p>
            <div className={styles.paymentMethods}>
              <span className={styles.paymentTag}>PIX</span>
              <span className={styles.paymentTag}>CARD</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;