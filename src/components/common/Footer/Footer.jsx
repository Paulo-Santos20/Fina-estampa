import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaInstagram, 
  FaWhatsapp, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCreditCard,
  FaShieldAlt,
  FaTruck,
  FaHeart
} from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Seção Principal do Footer */}
      <div className={styles.footerMain}>
        <div className={styles.container}>
          <div className={styles.footerGrid}>
            {/* Informações da Empresa */}
            <div className={styles.footerSection}>
              <div className={styles.footerLogo}>
                <span className={styles.logoText}>Fina</span>
                <span className={styles.logoAccent}>Estampa</span>
              </div>
              <p className={styles.footerDescription}>
                Sua loja de moda feminina com as últimas tendências e peças exclusivas. 
                Elegância e sofisticação em cada detalhe.
              </p>
              <div className={styles.socialLinks}>
                <a href="#" className={styles.socialLink} aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="#" className={styles.socialLink} aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="#" className={styles.socialLink} aria-label="WhatsApp">
                  <FaWhatsapp />
                </a>
              </div>
            </div>

            {/* Links Rápidos */}
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Links Rápidos</h3>
              <ul className={styles.footerLinks}>
                <li><Link to="/sobre">Sobre Nós</Link></li>
                <li><Link to="/contato">Contato</Link></li>
                <li><Link to="/politica-privacidade">Política de Privacidade</Link></li>
                <li><Link to="/termos-uso">Termos de Uso</Link></li>
                <li><Link to="/trocas-devolucoes">Trocas e Devoluções</Link></li>
                <li><Link to="/guia-tamanhos">Guia de Tamanhos</Link></li>
              </ul>
            </div>

            {/* Categorias */}
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Categorias</h3>
              <ul className={styles.footerLinks}>
                <li><Link to="/categoria/vestidos">Vestidos</Link></li>
                <li><Link to="/categoria/blusas">Blusas & Camisas</Link></li>
                <li><Link to="/categoria/calcas">Calças & Shorts</Link></li>
                <li><Link to="/categoria/saias">Saias & Macacões</Link></li>
                <li><Link to="/categoria/acessorios">Acessórios</Link></li>
                <li><Link to="/categoria/colecoes">Coleções Especiais</Link></li>
              </ul>
            </div>

            {/* Contato */}
            <div className={styles.footerSection}>
              <h3 className={styles.footerTitle}>Contato</h3>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <FaMapMarkerAlt className={styles.contactIcon} />
                  <span>Rua da Moda, 123 - Centro<br />São Paulo, SP - CEP: 01234-567</span>
                </div>
                <div className={styles.contactItem}>
                  <FaPhone className={styles.contactIcon} />
                  <span>(11) 99999-9999</span>
                </div>
                <div className={styles.contactItem}>
                  <FaEnvelope className={styles.contactIcon} />
                  <span>contato@finaestampa.com.br</span>
                </div>
              </div>

              {/* Newsletter */}
              <div className={styles.newsletter}>
                <h4 className={styles.newsletterTitle}>Newsletter</h4>
                <p className={styles.newsletterText}>
                  Receba novidades e ofertas exclusivas
                </p>
                <form className={styles.newsletterForm}>
                  <input
                    type="email"
                    placeholder="Seu e-mail"
                    className={styles.newsletterInput}
                  />
                  <button type="submit" className={styles.newsletterButton}>
                    Inscrever
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Benefícios */}
      <div className={styles.benefitsSection}>
        <div className={styles.container}>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitItem}>
              <FaTruck className={styles.benefitIcon} />
              <div className={styles.benefitContent}>
                <h4 className={styles.benefitTitle}>Frete Grátis</h4>
                <p className={styles.benefitText}>Acima de R\$ 199,90</p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <FaShieldAlt className={styles.benefitIcon} />
              <div className={styles.benefitContent}>
                <h4 className={styles.benefitTitle}>Compra Segura</h4>
                <p className={styles.benefitText}>Site 100% protegido</p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <FaCreditCard className={styles.benefitIcon} />
              <div className={styles.benefitContent}>
                <h4 className={styles.benefitTitle}>Parcelamento</h4>
                <p className={styles.benefitText}>Em até 12x sem juros</p>
              </div>
            </div>
            <div className={styles.benefitItem}>
              <FaHeart className={styles.benefitIcon} />
              <div className={styles.benefitContent}>
                <h4 className={styles.benefitTitle}>Atendimento</h4>
                <p className={styles.benefitText}>Especializado</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé Final */}
      <div className={styles.footerBottom}>
        <div className={styles.container}>
          <div className={styles.footerBottomContent}>
            <p className={styles.copyright}>
              © 2024 Fina Estampa. Todos os direitos reservados.
            </p>
            <div className={styles.paymentMethods}>
              <span className={styles.paymentText}>Formas de pagamento:</span>
              <div className={styles.paymentIcons}>
                <img src="/assets/icons/visa.png" alt="Visa" className={styles.paymentIcon} />
                <img src="/assets/icons/mastercard.png" alt="Mastercard" className={styles.paymentIcon} />
                <img src="/assets/icons/pix.png" alt="PIX" className={styles.paymentIcon} />
                <img src="/assets/icons/boleto.png" alt="Boleto" className={styles.paymentIcon} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;