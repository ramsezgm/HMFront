import apiClient from './apiClient';
import { Location, LocationSales } from '../types/location';

// Obtener todas las ubicaciones
export const getAllLocations = async (): Promise<Location[]> => {
  const response = await apiClient.get('/locations');
  return response.data;
};

// Obtener ventas por ubicación
export const getSalesByLocation = async (locationId: number): Promise<LocationSales> => {
  const response = await apiClient.get(`/locations/${locationId}/sales`);
  return response.data;
};

// Obtener ventas de todas las ubicaciones
export const getSalesOfAllLocations = async (): Promise<LocationSales[]> => {
  const response = await apiClient.get('/locations/sales/all');
  return response.data;
};
