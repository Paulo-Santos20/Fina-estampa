import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaCheckCircle, FaWhatsapp, FaHome, FaShoppingBag } from 'react-icons/fa';
import Layout from '../../components/common/Layout/Layout';
import styles from './OrderSuccess.module.css';

const OrderSuccess = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  useEffect(() => {
    // Scroll para o topo quando a página carregar
    window.scrollTo(0, 0);
  }, []);

  if (!orderDetails) {
    return (
      <Layout>
        <div className={styles.successPage}>
          <div className={styles.container}>
            <div className={styles.errorContent}>
              <h1>Pedido não encontrado</h1>
              <p>Não foi possível encontrar os detalhes do seu pedido.</p>
              <Link to="/" className={styles.homeButton}>
                <FaHome />
                Voltar para Home
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className={styles.successPage}>
        <div className={styles.container}>
          <div className={styles.successContent}>
            {/* Ícone de sucesso */}
            <div className={styles.successIcon}>
              <FaCheckCircle />
            </div>

            {/* Título e mensagem */}
            <h1 className={styles.successTitle}>Pedido Enviado com Sucesso!</h1>
            <p className={styles.successMessage}>
              Seu pedido foi enviado para nossa equipe via WhatsApp e será processado em breve.
            </p>

            {/* Detalhes do pedido */}
            <div className={styles.orderDetails}>
              <h2 className={styles.orderTitle}>Detalhes do Pedido</h2>
              
              <div className={styles.orderInfo}>
                <div className={styles.orderRow}>
                  <span>Número do Pedido:</span>
                  <span className={styles.orderNumber}>{orderDetails.id}</span>
                </div>
                <div className={styles.orderRow}>
                  <span>Data:</span>
                  <span>{orderDetails.date}</span>
                </div>
                <div className={styles.orderRow}>
                  <span>Total:</span>
                  <span className={styles.orderTotal}>R$ {orderDetails.totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Próximos passos */}
            <div className={styles.nextSteps}>
              <h3 className={styles.stepsTitle}>Próximos Passos:</h3>
              <div className={styles.stepsList}>
                <div className={styles.step}>
                  <span className={styles.stepNumber}>1</span>
                  <div className={styles.stepContent}>
                    <strong>Confirmação</strong>
                    <p>Nossa equipe entrará em contato via WhatsApp para confirmar seu pedido</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <span className={styles.stepNumber}>2</span>
                  <div className={styles.stepContent}>
                    <strong>Pagamento</strong>
                    <p>Você receberá as instruções de pagamento conforme a forma escolhida</p>
                  </div>
                </div>
                <div className={styles.step}>
                  <span className={styles.stepNumber}>3</span>
                  <div className={styles.stepContent}>
                    <strong>Envio</strong>
                    <p>Após a confirmação do pagamento, seu pedido será preparado e enviado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className={styles.actionButtons}>
              <a 
                href={`https://wa.me/5511999999999?text=Olá! Gostaria de acompanhar meu pedido ${orderDetails.id}`}
                
                rel="noopener noreferrer"
                className={styles.whatsappButton}
              >
                <FaWhatsapp />
                Falar no WhatsApp
              </a>
              
              <Link to="/" className={styles.homeButton}>
                <FaHome />
                Voltar para Home
              </Link>
              
              <Link to="/categoria/vestidos" className={styles.shopButton}>
                <FaShoppingBag />
                Continuar Comprando
              </Link>
            </div>

            {/* Informações adicionais */}
            <div className={styles.additionalInfo}>
              <div className={styles.infoCard}>
                <h4>📱 Acompanhe seu Pedido</h4>
                <p>Você receberá atualizações sobre seu pedido diretamente no WhatsApp</p>
              </div>
              <div className={styles.infoCard}>
                <h4>🚚 Prazo de Entrega</h4>
                <p>5 a 10 dias úteis para todo o Brasil</p>
              </div>
              <div className={styles.infoCard}>
                <h4>🔄 Trocas e Devoluções</h4>
                <p>30 dias para trocar ou devolver produtos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccess;