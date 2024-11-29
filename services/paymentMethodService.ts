import apiClient from './apiClient';
import { PaymentMethodUsage } from '../types/paymentMethod';

// Obtener todos los métodos de pago
export const getAllPaymentMethods = async (): Promise<string[]> => {
  const response = await apiClient.get('/payment-methods');
  return response.data;
};

// Obtener estadísticas de uso de métodos de pago
export const getPaymentMethodUsage = async (): Promise<PaymentMethodUsage[]> => {
  const response = await apiClient.get('/payment-methods/usage');
  return response.data;
};
