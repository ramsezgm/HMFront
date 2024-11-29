import apiClient from './apiClient';
import { Purchase } from '../types/purchase';

// Obtener todas las compras
export const getAllPurchases = async (): Promise<Purchase[]> => {
  const response = await apiClient.get('/purchases');
  return response.data;
};

// Obtener una compra por ID
export const getPurchaseById = async (purchaseId: number): Promise<Purchase> => {
  const response = await apiClient.get(`/purchases/${purchaseId}`);
  return response.data;
};

// Eliminar una compra
export const deletePurchase = async (purchaseId: number): Promise<void> => {
  await apiClient.delete(`/purchases/${purchaseId}`);
};
