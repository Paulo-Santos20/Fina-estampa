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
  FaShieldAlt
} from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Seção Principal do Footer */}
        <div className={styles.footerMain}>
          {/* Coluna 1 - Sobre a Loja */}
          <div className={styles.footerColumn}>
            <div className={styles.brand}>
              <h3 className={styles.brandName}>Fina Estampa</h3>
              <p className={styles.brandTagline}>
                Moda feminina com elegância e sofisticação
              </p>
            </div>
            
            <p className={styles.brandDescription}>
              Há mais de 10 anos oferecendo as melhores peças de moda feminina, 
              sempre priorizando qualidade, estilo e o melhor atendimento para nossas clientes.
            </p>

            {/* Redes Sociais */}
            <div className={styles.socialMedia}>
              <h4>Siga-nos</h4>
              <div className={styles.socialLinks}>
                <a 
                  href="https://instagram.com/finaestampa" 
                   
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="https://facebook.com/finaestampa" 
                   
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a 
                  href="https://wa.me/5511999999999" 
                   
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          </div>

          {/* Coluna 2 - Links Rápidos */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Links Rápidos</h4>
            <ul className={styles.linksList}>
              <li>
                <Link to="/" className={styles.footerLink}>
                  Início
                </Link>
              </li>
              <li>
                <Link to="/categoria/vestidos" className={styles.footerLink}>
                  Vestidos
                </Link>
              </li>
              <li>
                <Link to="/categoria/blusas" className={styles.footerLink}>
                  Blusas & Camisas
                </Link>
              </li>
              <li>
                <Link to="/categoria/calcas" className={styles.footerLink}>
                  Calças & Shorts
                </Link>
              </li>
              <li>
                <Link to="/categoria/acessorios" className={styles.footerLink}>
                  Acessórios
                </Link>
              </li>
              <li>
                <Link to="/ofertas" className={styles.footerLink}>
                  Ofertas Especiais
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3 - Atendimento */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Atendimento</h4>
            <ul className={styles.linksList}>
              <li>
                <Link to="/sobre" className={styles.footerLink}>
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className={styles.footerLink}>
                  Fale Conosco
                </Link>
              </li>
              <li>
                <Link to="/trocas-devolucoes" className={styles.footerLink}>
                  Trocas e Devoluções
                </Link>
              </li>
              <li>
                <Link to="/guia-tamanhos" className={styles.footerLink}>
                  Guia de Tamanhos
                </Link>
              </li>
              <li>
                <Link to="/perguntas-frequentes" className={styles.footerLink}>
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link to="/politica-privacidade" className={styles.footerLink}>
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4 - Contato */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Contato</h4>
            
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt className={styles.contactIcon} />
                <div>
                  <p>Rua da Moda, 123</p>
                  <p>Centro - São Paulo, SP</p>
                  <p>CEP: 01234-567</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <div>
                  <p>(11) 9999-9999</p>
                  <p>Segunda a Sexta: 9h às 18h</p>
                  <p>Sábado: 9h às 14h</p>
                </div>
              </div>

              <div className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <div>
                  <p>contato@finaestampa.com.br</p>
                  <p>Respondemos em até 24h</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Garantias */}
        <div className={styles.guarantees}>
          <div className={styles.guarantee}>
            <FaTruck className={styles.guaranteeIcon} />
            <div>
              <h5>Frete Grátis</h5>
              <p>Acima de R\$ 199</p>
            </div>
          </div>
          
          <div className={styles.guarantee}>
            <FaShieldAlt className={styles.guaranteeIcon} />
            <div>
              <h5>Compra Segura</h5>
              <p>Site protegido</p>
            </div>
          </div>
          
          <div className={styles.guarantee}>
            <FaCreditCard className={styles.guaranteeIcon} />
            <div>
              <h5>Parcelamento</h5>
              <p>Até 12x sem juros</p>
            </div>
          </div>
          
          <div className={styles.guarantee}>
            <FaHeart className={styles.guaranteeIcon} />
            <div>
              <h5>Troca Fácil</h5>
              <p>30 dias para trocar</p>
            </div>
          </div>
        </div>

        {/* Rodapé Final */}
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            <p>
              © {currentYear} Fina Estampa. Todos os direitos reservados.
            </p>
            <p>
              Desenvolvido com <FaHeart className={styles.heartIcon} /> para mulheres que amam moda.
            </p>
          </div>
          
          <div className={styles.paymentMethods}>
            <span>Formas de pagamento:</span>
            <div className={styles.paymentIcons}>
              <span className={styles.paymentMethod}>PIX</span>
              <span className={styles.paymentMethod}>Cartão</span>
              <span className={styles.paymentMethod}>Boleto</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;