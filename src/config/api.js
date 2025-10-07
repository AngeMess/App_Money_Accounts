import axios from 'axios';

// Configuración de la API de MongoDB
// Opciones:
// 1. Backend local con Node.js (recomendado) - Ver carpeta backend/
// 2. MongoDB Atlas Data API (requiere configuración en Atlas)

const API_CONFIG = {
  // Backend local configurado
  BASE_URL: 'http://192.168.1.27:3000/api',
  
  DATA_SOURCE: 'Cluster1B',
  DATABASE: 'MoneyAccounts',
  COLLECTION: 'Account',
};

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Agrega tu API Key de MongoDB Atlas aquí
    // 'api-key': 'YOUR_API_KEY',
  },
});

// Servicios de transacciones para backend Node.js
export const transactionService = {
  // Obtener todas las transacciones
  async getAll() {
    try {
      const response = await api.get('/transactions');
      return response.data.data || [];
    } catch (error) {
      console.error('Error al obtener transacciones:', error);
      throw error;
    }
  },

  // Crear una nueva transacción
  async create(transaction) {
    try {
      const response = await api.post('/transactions', transaction);
      return response.data;
    } catch (error) {
      console.error('Error al crear transacción:', error);
      throw error;
    }
  },

  // Actualizar una transacción
  async update(id, transaction) {
    try {
      const response = await api.put(`/transactions/${id}`, transaction);
      return response.data;
    } catch (error) {
      console.error('Error al actualizar transacción:', error);
      throw error;
    }
  },

  // Eliminar una transacción
  async delete(id) {
    try {
      const response = await api.delete(`/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al eliminar transacción:', error);
      throw error;
    }
  },

  // Obtener transacciones por rango de fechas
  async getByDateRange(startDate, endDate) {
    try {
      const response = await api.get(`/transactions/range/${startDate}/${endDate}`);
      return response.data.data || [];
    } catch (error) {
      console.error('Error al obtener transacciones por rango:', error);
      throw error;
    }
  },

  // Obtener estadísticas
  async getStats() {
    try {
      const response = await api.get('/stats');
      return response.data.data || {
        income: 0,
        expenses: 0,
        balance: 0,
        totalTransactions: 0,
      };
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  },
};

export default api;

