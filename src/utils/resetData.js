// Utilitário para resetar dados do localStorage
export const resetAllData = () => {
  try {
    // Limpar todos os dados relacionados
    localStorage.removeItem('products');
    localStorage.removeItem('categories');
    localStorage.removeItem('orders');
    localStorage.removeItem('customers');
    localStorage.removeItem('coupons');
    localStorage.removeItem('storeSettings');
    localStorage.removeItem('paymentMethods');
    localStorage.removeItem('shippingMethods');
    localStorage.removeItem('emailSettings');
    
    console.log('✅ Todos os dados foram resetados');
    
    // Recarregar a página para aplicar os dados iniciais
    window.location.reload();
  } catch (error) {
    console.error('❌ Erro ao resetar dados:', error);
  }
};

export const resetProducts = () => {
  try {
    localStorage.removeItem('products');
    console.log('✅ Produtos resetados');
    window.location.reload();
  } catch (error) {
    console.error('❌ Erro ao resetar produtos:', error);
  }
};

export const resetCategories = () => {
  try {
    localStorage.removeItem('categories');
    console.log('✅ Categorias resetadas');
    window.location.reload();
  } catch (error) {
    console.error('❌ Erro ao resetar categorias:', error);
  }
};