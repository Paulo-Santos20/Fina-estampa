import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaInstagram, 
  FaFacebook, 
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaHeart,
  FaCreditCard,
  FaTruck,
  FaShieldAlt,
  FaArrowRight
} from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      {/* Newsletter Miniatura (Opcional, bom para UX) */}
      <div className={styles.miniNewsletter}>
        <div className={styles.container}>
          <div className={styles.newsletterRow}>
            <span>Cadastre-se para receber novidades e ofertas exclusivas</span>
            <div className={styles.newsletterInputGroup}>
              <input type="email" placeholder="Seu e-mail" />
              <button><FaArrowRight /></button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.container}>
          
          <div className={styles.topGrid}>
            
            {/* 1. Marca & Sobre */}
            <div className={styles.brandColumn}>
              <Link to="/" className={styles.brandLogo}>Fina Estampa.</Link>
              <p className={styles.brandText}>
                Moda feminina com elegância e sofisticação. Há mais de 10 anos vestindo mulheres autênticas com peças atemporais.
              </p>
              <div className={styles.socialRow}>
                <a href="#" aria-label="Instagram"><FaInstagram /></a>
                <a href="#" aria-label="Facebook"><FaFacebook /></a>
                <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
              </div>
            </div>

            {/* 2. Links Institucionais */}
            <div className={styles.linksColumn}>
              <h4>Institucional</h4>
              <ul>
                <li><Link to="/sobre">Sobre Nós</Link></li>
                <li><Link to="/contato">Contato</Link></li>
                <li><Link to="/blog">Blog de Moda</Link></li>
                <li><Link to="/trabalhe-conosco">Trabalhe Conosco</Link></li>
              </ul>
            </div>

            {/* 3. Ajuda & Suporte */}
            <div className={styles.linksColumn}>
              <h4>Ajuda</h4>
              <ul>
                <li><Link to="/trocas">Trocas e Devoluções</Link></li>
                <li><Link to="/entregas">Prazos e Entregas</Link></li>
                <li><Link to="/tamanhos">Guia de Medidas</Link></li>
                <li><Link to="/privacidade">Política de Privacidade</Link></li>
              </ul>
            </div>

            {/* 4. Contato */}
            <div className={styles.contactColumn}>
              <h4>Fale Conosco</h4>
              <div className={styles.contactItem}>
                <FaPhone className={styles.icon} />
                <div>
                  <strong>(11) 9999-9999</strong>
                  <span>Seg-Sex: 9h às 18h</span>
                </div>
              </div>
              <div className={styles.contactItem}>
                <FaEnvelope className={styles.icon} />
                <span>contato@finaestampa.com</span>
              </div>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.icon} />
                <span>São Paulo - SP</span>
              </div>
            </div>

          </div>

          <div className={styles.divider} />

          {/* Garantias (Ícones Horizontais) */}
          <div className={styles.guaranteesRow}>
            <div className={styles.guaranteeItem}>
              <FaTruck />
              <span>Frete Grátis acima de R$299</span>
            </div>
            <div className={styles.guaranteeItem}>
              <FaCreditCard />
              <span>Em até 10x sem juros</span>
            </div>
            <div className={styles.guaranteeItem}>
              <FaShieldAlt />
              <span>Site 100% Seguro</span>
            </div>
            <div className={styles.guaranteeItem}>
              <FaHeart />
              <span>Primeira Troca Grátis</span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Copyright & Pagamentos */}
          <div className={styles.bottomRow}>
            <p className={styles.copyText}>
              © {currentYear} Fina Estampa. Todos os direitos reservados. 
              <span className={styles.madeWith}>Feito com <FaHeart /></span>
            </p>
            <div className={styles.paymentMethods}>
              <span className={styles.paymentTag}>PIX</span>
              <span className={styles.paymentTag}>VISA</span>
              <span className={styles.paymentTag}>MASTER</span>
              <span className={styles.paymentTag}>ELO</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;