import apiClient from './apiClient';
import { Customer } from '../types/customer';

// Obtener todos los clientes
export const getAllCustomers = async (): Promise<Customer[]> => {
  const response = await apiClient.get('/customers');
  return response.data;
};

// Obtener un cliente por ID
export const getCustomerById = async (customerId: number): Promise<Customer> => {
  const response = await apiClient.get(`/customers/${customerId}`);
  return response.data;
};

// Eliminar un cliente
export const deleteCustomer = async (customerId: number): Promise<void> => {
  await apiClient.delete(`/customers/${customerId}`);
};
