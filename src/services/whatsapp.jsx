export const generateWhatsAppMessage = (orderDetails) => {
  const { customer, address, items, payment, totals, id, date } = orderDetails;
  
  let message = `🛍️ *NOVO PEDIDO - FINA ESTAMPA*\n\n`;
  
  // Dados do cliente
  message += `👤 *CLIENTE:*\n`;
  message += `• Nome: ${customer.name}\n`;
  message += `• Telefone: ${customer.phone}\n`;
  message += `• Email: ${customer.email}\n\n`;
  
  // Endereço de entrega
  message += `�� *ENDEREÇO DE ENTREGA:*\n`;
  message += `• ${address.street}, ${address.number}`;
  if (address.complement) message += `, ${address.complement}`;
  message += `\n• ${address.neighborhood} - ${address.city}/${address.state}\n`;
  message += `• CEP: ${address.cep}\n\n`;
  
  // Produtos
  message += `🛒 *PRODUTOS:*\n`;
  items.forEach(item => {
    const price = item.salePrice || item.price;
    message += `• ${item.name}\n`;
    message += `  Tam: ${item.selectedSize} | Cor: ${item.selectedColor} | Qtd: ${item.quantity}\n`;
    message += `  R\$ ${(price * item.quantity).toFixed(2)}\n\n`;
  });
  
  // Totais
  message += `💰 *RESUMO FINANCEIRO:*\n`;
  message += `• Subtotal: R\$ ${totals.subtotal.toFixed(2)}\n`;
  message += `• Frete: ${totals.shipping === 0 ? 'Grátis' : `R\$ ${totals.shipping.toFixed(2)}`}\n`;
  if (totals.discount > 0) {
    message += `• Desconto PIX: -R\$ ${totals.discount.toFixed(2)}\n`;
  }
  message += `• *TOTAL: R\$ ${totals.total.toFixed(2)}*\n\n`;
  
  // Forma de pagamento
  const paymentNames = {
    'pix': 'PIX',
    'credit': 'Cartão de Crédito',
    'debit': 'Cartão de Débito',
    'boleto': 'Boleto Bancário'
  };
  
  message += `💳 *PAGAMENTO:* ${paymentNames[payment.method]}\n`;
  if (payment.installments > 1) {
    message += `• ${payment.installments}x de R\$ ${(totals.total / payment.installments).toFixed(2)}\n`;
  }
  message += `\n`;
  
  // Informações do pedido
  message += `🕐 *DATA/HORA:* ${date}\n`;
  message += `🔗 *PEDIDO #:* ${id}\n\n`;
  
  message += `✅ *Aguardando confirmação da loja*`;
  
  return message;
};