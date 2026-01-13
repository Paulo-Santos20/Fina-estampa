import React, { useState } from 'react';
import { 
  FaEnvelope, 
  FaGift, 
  FaCheck, 
  FaStar, 
  FaArrowRight
} from 'react-icons/fa';
import styles from './Newsletter.module.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState([]);

  // Opções de interesse simplificadas para o design
  const interests = [
    { id: 'vestidos', label: 'Vestidos' },
    { id: 'alfaiataria', label: 'Alfaiataria' },
    { id: 'acessorios', label: 'Acessórios' },
    { id: 'sale', label: 'Sale' }
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
    if (!email || !name) return;

    setIsLoading(true);
    // Simulação de API
    setTimeout(() => {
      console.log({ name, email, interests: selectedInterests });
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      setName('');
      setSelectedInterests([]);
      
      // Reset msg após 5s
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 1500);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.grid}>
          {/* LADO ESQUERDO: TEXTO E BENEFÍCIOS */}
          <div className={styles.contentSide}>
            <span className={styles.label}>Newsletter</span>
            <h2 className={styles.title}>Junte-se ao nosso universo.</h2>
            <p className={styles.description}>
              Inscreva-se para receber atualizações sobre novas coleções, 
              acesso antecipado a vendas e dicas exclusivas de estilo.
            </p>

            <div className={styles.benefitsGrid}>
              <div className={styles.benefitItem}>
                <FaGift className={styles.icon} />
                <span>10% OFF na 1ª compra</span>
              </div>
              <div className={styles.benefitItem}>
                <FaStar className={styles.icon} />
                <span>Conteúdo Exclusivo</span>
              </div>
            </div>
          </div>

          {/* LADO DIREITO: FORMULÁRIO */}
          <div className={styles.formSide}>
            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className={styles.form}>
                
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
                    placeholder="Seu e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.interestsWrapper}>
                  <p className={styles.interestsLabel}>Tenho interesse em:</p>
                  <div className={styles.interestsContainer}>
                    {interests.map((interest) => (
                      <button
                        key={interest.id}
                        type="button"
                        className={`${styles.interestTag} ${selectedInterests.includes(interest.id) ? styles.selected : ''}`}
                        onClick={() => handleInterestToggle(interest.id)}
                      >
                        {interest.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  className={styles.submitButton}
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Inscrever-se'}
                  {!isLoading && <FaArrowRight />}
                </button>
                
                <p className={styles.privacy}>
                  Ao se inscrever, você concorda com nossa Política de Privacidade.
                </p>
              </form>
            ) : (
              <div className={styles.successMessage}>
                <div className={styles.successIconBox}>
                  <FaCheck />
                </div>
                <h3>Bem-vinda!</h3>
                <p>Verifique seu e-mail para confirmar sua inscrição e resgatar seu presente.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Newsletter;