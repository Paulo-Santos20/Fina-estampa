// Coordenadas de Olinda (Bultrins) - PE
const ORIGIN_COORDS = {
  lat: -7.99658,
  lng: -34.84884
};

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Proteção: se algum valor for inválido, retorna null
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;

  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; 
};

export const calculateShippingCost = (distance) => {
  // Se a distância for inválida (null), retorna null para usarmos fallback depois
  if (distance === null || isNaN(distance)) return null;

  const basePrice = 10.00;
  const pricePerKm = 0.50;
  
  if (distance <= 5) return 5.00; // Frete local (Bultrins/Olinda vizinhança)
  
  const cost = basePrice + (distance * pricePerKm);
  return Math.min(cost, 150.00); 
};

export const getOriginCoords = () => ORIGIN_COORDS;