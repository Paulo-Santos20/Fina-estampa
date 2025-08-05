import React, { useState } from 'react';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaWhatsapp,
  FaClock,
  FaInstagram,
  FaFacebook,
  FaPaperPlane,
  FaUser,
  FaComment
} from 'react-icons/fa';
import Layout from '../../components/common/Layout/Layout';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Gerar mensagem para WhatsApp
      const whatsappMessage = `
*CONTATO - FINA ESTAMPA*

*Nome:* ${formData.name}
*Email:* ${formData.email}
*Telefone:* ${formData.phone}
*Assunto:* ${formData.subject}

*Mensagem:*
${formData.message}

_Enviado através do site_
      `.trim();

      // Abrir WhatsApp
      const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });

    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Endereço',
      details: [
        'Rua da Moda, 123',
        'Centro - São Paulo, SP',
        'CEP: 01234-567'
      ],
      color: '#722F37'
    },
    {
      icon: FaPhone,
      title: 'Telefone',
      details: [
        '(11) 9999-9999',
        'Segunda a Sexta: 9h às 18h',
        'Sábado: 9h às 14h'
      ],
      color: '#D4AF37'
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      details: [
        'contato@finaestampa.com.br',
        'vendas@finaestampa.com.br',
        'Respondemos em até 24h'
      ],
      color: '#722F37'
    },
    {
      icon: FaWhatsapp,
      title: 'WhatsApp',
      details: [
        '(11) 9999-9999',
        'Atendimento rápido',
        'Segunda a Sábado'
      ],
      color: '#25D366'
    }
  ];

  const subjects = [
    'Dúvidas sobre produtos',
    'Informações de entrega',
    'Trocas e devoluções',
    'Problemas com pedido',
    'Sugestões',
    'Outros'
  ];

  return (
    <Layout>
      <div className={styles.contactPage}>
        {/* Hero Section */}
        <div className={styles.heroSection}>
          <div className={styles.container}>
            <div className={styles.heroContent}>
              <h1 className={styles.pageTitle}>Fale Conosco</h1>
              <p className={styles.pageSubtitle}>
                Estamos aqui para te ajudar! Entre em contato conosco através dos canais abaixo 
                ou envie uma mensagem. Responderemos o mais rápido possível.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.container}>
          {/* Informações de Contato */}
          <div className={styles.contactInfo}>
            <div className={styles.infoGrid}>
              {contactInfo.map((info, index) => (
                <div key={index} className={styles.infoCard}>
                  <div 
                    className={styles.infoIcon}
                    style={{ backgroundColor: info.color }}
                  >
                    <info.icon />
                  </div>
                  <div className={styles.infoContent}>
                    <h3 className={styles.infoTitle}>{info.title}</h3>
                    <div className={styles.infoDetails}>
                      {info.details.map((detail, idx) => (
                        <p key={idx}>{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className={styles.mainContent}>
            {/* Formulário de Contato */}
            <div className={styles.contactForm}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Envie sua Mensagem</h2>
                <p className={styles.formSubtitle}>
                  Preencha o formulário abaixo e entraremos em contato em breve
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <FaUser />
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="Seu nome completo"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <FaEnvelope />
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="seu@email.com"
                      required
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      <FaPhone />
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={styles.formInput}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Assunto *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={styles.formSelect}
                      required
                    >
                      <option value="">Selecione um assunto</option>
                      {subjects.map((subject, index) => (
                        <option key={index} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>
                    <FaComment />
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    placeholder="Escreva sua mensagem aqui..."
                    rows="6"
                    required
                  />
                </div>

                {/* Status do envio */}
                {submitStatus && (
                  <div className={`${styles.submitStatus} ${styles[submitStatus]}`}>
                    {submitStatus === 'success' ? (
                      <>
                        ✅ Mensagem enviada com sucesso! Redirecionando para o WhatsApp...
                      </>
                    ) : (
                      <>
                        ❌ Erro ao enviar mensagem. Tente novamente ou entre em contato pelo WhatsApp.
                      </>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className={styles.loading}>
                      <div className={styles.spinner}></div>
                      Enviando...
                    </div>
                  ) : (
                    <>
                      <FaPaperPlane />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Sidebar com Informações Extras */}
            <div className={styles.sidebar}>
              {/* Horário de Funcionamento */}
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>
                  <FaClock />
                  Horário de Funcionamento
                </h3>
                <div className={styles.scheduleList}>
                  <div className={styles.scheduleItem}>
                    <span>Segunda a Sexta</span>
                    <span>9h às 18h</span>
                  </div>
                  <div className={styles.scheduleItem}>
                    <span>Sábado</span>
                    <span>9h às 14h</span>
                  </div>
                  <div className={styles.scheduleItem}>
                    <span>Domingo</span>
                    <span>Fechado</span>
                  </div>
                </div>
              </div>

              {/* Redes Sociais */}
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Siga-nos</h3>
                <p className={styles.socialText}>
                  Acompanhe nossas novidades e promoções exclusivas
                </p>
                <div className={styles.socialLinks}>
                  <a 
                    href="https://instagram.com/finaestampa" 
                     
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <FaInstagram />
                    Instagram
                  </a>
                  <a 
                    href="https://facebook.com/finaestampa" 
                     
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <FaFacebook />
                    Facebook
                  </a>
                  <a 
                    href="https://wa.me/5511999999999" 
                     
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                  >
                    <FaWhatsapp />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* FAQ Rápido */}
              <div className={styles.sidebarCard}>
                <h3 className={styles.sidebarTitle}>Perguntas Frequentes</h3>
                <div className={styles.faqList}>
                  <div className={styles.faqItem}>
                    <strong>Qual o prazo de entrega?</strong>
                    <p>5 a 10 dias úteis para todo o Brasil</p>
                  </div>
                  <div className={styles.faqItem}>
                    <strong>Posso trocar um produto?</strong>
                    <p>Sim, até 30 dias após a compra</p>
                  </div>
                  <div className={styles.faqItem}>
                    <strong>Frete é grátis?</strong>
                    <p>Sim, para compras acima de R\$ 199</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;