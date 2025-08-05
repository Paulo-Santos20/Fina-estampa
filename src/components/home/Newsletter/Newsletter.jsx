import React, { useState } from 'react';
import { 
  FaEnvelope, 
  FaGift, 
  FaCheck, 
  FaStar,
  FaHeart,
  FaTags,
  FaCrown,
  FaGem // Substituindo FaSparkles por FaGem
} from 'react-icons/fa';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  const interests = [
    { id: 'vestidos', label: 'Vestidos', icon: FaCrown },
    { id: 'blusas', label: 'Blusas', icon: FaHeart },
    { id: 'acessorios', label: 'Acessórios', icon: FaGem }, // Corrigido
    { id: 'promocoes', label: 'Promoções', icon: FaTags }
  ];

  const benefits = [
    {
      icon: FaGift,
      title: '10% de Desconto',
      description: 'Na sua primeira compra'
    },
    {
      icon: FaStar,
      title: 'Acesso Exclusivo',
      description: 'Às novidades antes de todos'
    },
    {
      icon: FaTags,
      title: 'Ofertas Especiais',
      description: 'Promoções só para assinantes'
    },
    {
      icon: FaCrown,
      title: 'Conteúdo VIP',
      description: 'Dicas de moda e styling'
    }
  ];

  const handleInterestToggle = (interestId) => {
    setSelectedInterests(prev => 
      prev.includes(interestId)
        ? prev.filter(id => id !== interestId)
        : [...prev, interestId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !name) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setIsLoading(true);

    // Simular envio (substituir por integração real)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui você integraria com seu serviço de email
      console.log('Newsletter subscription:', {
        name,
        email,
        interests: selectedInterests
      });
      
      setIsSubscribed(true);
      setEmail('');
      setName('');
      setSelectedInterests([]);
      
      // Reset após 5 segundos
      setTimeout(() => {
        setIsSubscribed(false);
      }, 5000);
      
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.newsletterSection}>
      <div className={styles.container}>
        <div className={styles.newsletterContent}>
          {/* Lado Esquerdo - Informações */}
          <div className={styles.infoSide}>
            <div className={styles.headerContent}>
              <FaEnvelope className={styles.mainIcon} />
              <h2 className={styles.title}>
                Fique por Dentro das Novidades
              </h2>
              <p className={styles.subtitle}>
                Receba em primeira mão as últimas tendências da moda feminina, 
                ofertas exclusivas e dicas de styling direto no seu email.
              </p>
            </div>

            {/* Benefícios */}
            <div className={styles.benefits}>
              {benefits.map((benefit, index) => (
                <div key={index} className={styles.benefit}>
                  <div className={styles.benefitIcon}>
                    <benefit.icon />
                  </div>
                  <div className={styles.benefitContent}>
                    <h4>{benefit.title}</h4>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Estatísticas */}
            <div className={styles.stats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>15k+</span>
                <span className={styles.statLabel}>Assinantes</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4.9</span>
                <span className={styles.statLabel}>Avaliação</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>98%</span>
                <span className={styles.statLabel}>Satisfação</span>
              </div>
            </div>
          </div>

          {/* Lado Direito - Formulário */}
          <div className={styles.formSide}>
            <div className={styles.formContainer}>
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h3 className={styles.formTitle}>
                    Cadastre-se Gratuitamente
                  </h3>
                  
                  {/* Campos do formulário */}
                  <div className={styles.inputGroup}>
                    <input
                      type="text"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={styles.input}
                      required
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <input
                      type="email"
                      placeholder="Seu melhor email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={styles.input}
                      required
                    />
                  </div>

                  {/* Interesses */}
                  <div className={styles.interestsSection}>
                    <label className={styles.interestsLabel}>
                      Seus interesses (opcional):
                    </label>
                    <div className={styles.interests}>
                      {interests.map((interest) => (
                        <button
                          key={interest.id}
                          type="button"
                          className={`${styles.interestBtn} ${
                            selectedInterests.includes(interest.id) ? styles.selected : ''
                          }`}
                          onClick={() => handleInterestToggle(interest.id)}
                        >
                          <interest.icon />
                          {interest.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Botão de envio */}
                  <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className={styles.loading}>
                        <div className={styles.spinner}></div>
                        Cadastrando...
                      </div>
                    ) : (
                      <>
                        <FaGift />
                        Quero Meu Desconto
                      </>
                    )}
                  </button>

                  {/* Disclaimer */}
                  <p className={styles.disclaimer}>
                    Ao se cadastrar, você concorda em receber emails promocionais. 
                    Você pode cancelar a qualquer momento.
                  </p>
                </form>
              ) : (
                <div className={styles.successMessage}>
                  <FaCheck className={styles.successIcon} />
                  <h3>Bem-vinda à Fina Estampa!</h3>
                  <p>
                    Cadastro realizado com sucesso! Verifique seu email para 
                    receber seu cupom de 10% de desconto.
                  </p>
                  <div className={styles.successBadge}>
                    <FaGift />
                    Cupom enviado!
                  </div>
                </div>
              )}
            </div>

            {/* Depoimento */}
            <div className={styles.testimonial}>
              <div className={styles.testimonialContent}>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p>
                  "Adoro receber as novidades da Fina Estampa! 
                  Sempre fico sabendo das promoções primeiro."
                </p>
                <span className={styles.author}>- Maria Silva</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className={styles.decorativeElements}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
      </div>
    </section>
  );
};

export default Newsletter;