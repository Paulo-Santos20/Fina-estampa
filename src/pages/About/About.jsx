import React from 'react';
import Layout from '../../components/common/Layout/Layout';
import { FaHeart, FaHandsHelping, FaLightbulb, FaLeaf } from 'react-icons/fa'; // FaHandHeart REMOVIDO, FaHeart ADICIONADO (ou outro ícone)
import styles from './About.module.css'; // Supondo que você moverá os estilos para cá

const About = () => {
  return (
    <Layout>
      <div className={styles.aboutPage}>
        <div className={styles.aboutContainer}>
          <h1 className={styles.aboutTitle}>Sobre a Fina Estampa</h1>
          <p className={styles.aboutSubtitle}>Moda com paixão, elegância e propósito.</p>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><FaHeart className={styles.icon} /> Nossa História</h2>
            <p className={styles.sectionText}>
              A Fina Estampa nasceu de um sonho de trazer para a mulher moderna peças que unam elegância, conforto e as últimas tendências da moda. Desde nossa fundação em 2023, nos dedicamos a selecionar roupas que valorizem a beleza feminina em todas as suas formas, tornando cada mulher mais confiante e inspirada.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><FaLightbulb className={styles.icon} /> Nossa Missão</h2>
            <p className={styles.sectionText}>
              Oferecer uma experiência de compra única e personalizada, com roupas de alta qualidade que empoderem nossas clientes a expressarem sua individualidade e estilo, sempre com um toque de sofisticação e glamour. Buscamos ser mais que uma loja, mas uma fonte de inspiração para o guarda-roupa feminino.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}><FaHandsHelping className={styles.icon} /> Nossos Valores</h2>
            <ul className={styles.valuesList}>
              <li>
                <strong>Elegância:</strong> Priorizamos peças que exalam sofisticação e bom gosto.
              </li>
              <li>
                <strong>Qualidade:</strong> Comprometimento com materiais e acabamentos de excelência.
              </li>
              <li>
                <strong>Originalidade:</strong> Buscamos sempre coleções únicas e diferenciadas.
              </li>
              <li>
                <strong>Atendimento Excepcional:</strong> Nossas clientes são nossa prioridade.
              </li>
              <li>
                <strong>Sustentabilidade:</strong> Consciência e práticas que respeitam o meio ambiente (Exemplo: <FaLeaf className={styles.inlineIcon} />).
              </li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Venha nos Conhecer!</h2>
            <p className={styles.sectionText}>
              Explore nossas coleções e descubra a peça perfeita para cada ocasião. Seja para o dia a dia, trabalho ou eventos especiais, a Fina Estampa tem o que você precisa para brilhar.
            </p>
            <Link to="/catalog" className={styles.callToAction}>Ver Coleção</Link>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default About;