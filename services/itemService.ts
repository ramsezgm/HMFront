import apiClient from './apiClient';
import { Item, ItemSales } from '../types/item';

// Obtener todos los productos
export const getAllItems = async (): Promise<Item[]> => {
  const response = await apiClient.get('/items');
  return response.data;
};

// Obtener detalles de un producto
export const getItemById = async (itemId: number): Promise<Item> => {
  const response = await apiClient.get(`/items/${itemId}`);
  return response.data;
};

// Obtener ventas por producto
export const getSalesByItem = async (itemId: number): Promise<ItemSales> => {
  const response = await apiClient.get(`/items/${itemId}/sales`);
  return response.data;
};

// Obtener ventas de todos los productos
export const getSalesOfAllItems = async (): Promise<ItemSales[]> => {
  const response = await apiClient.get('/items/sales/order');
  return response.data;
};
