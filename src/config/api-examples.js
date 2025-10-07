/**
 * Ejemplos de uso de la API de MongoDB
 * 
 * Este archivo contiene ejemplos de cómo usar el servicio de transacciones
 * en tus componentes de React Native.
 */

import { transactionService } from './api';

// ===================================
// EJEMPLO 1: Cargar todas las transacciones
// ===================================
export const loadAllTransactions = async () => {
  try {
    const transactions = await transactionService.getAll();
    console.log('Transacciones cargadas:', transactions);
    return transactions;
  } catch (error) {
    console.error('Error al cargar transacciones:', error);
    return [];
  }
};

// ===================================
// EJEMPLO 2: Crear una nueva transacción
// ===================================
export const createNewTransaction = async () => {
  try {
    const newTransaction = {
      type: 'expense', // o 'income'
      amount: 45.50,
      categoryId: 1, // ID de la categoría
      description: 'Compras en el supermercado',
      date: new Date().toISOString(),
    };

    const result = await transactionService.create(newTransaction);
    console.log('Transacción creada:', result);
    return result;
  } catch (error) {
    console.error('Error al crear transacción:', error);
    throw error;
  }
};

// ===================================
// EJEMPLO 3: Actualizar una transacción
// ===================================
export const updateExistingTransaction = async (transactionId) => {
  try {
    const updates = {
      amount: 50.00,
      description: 'Actualizado: Compras mensuales',
    };

    const result = await transactionService.update(transactionId, updates);
    console.log('Transacción actualizada:', result);
    return result;
  } catch (error) {
    console.error('Error al actualizar transacción:', error);
    throw error;
  }
};

// ===================================
// EJEMPLO 4: Eliminar una transacción
// ===================================
export const deleteTransaction = async (transactionId) => {
  try {
    const result = await transactionService.delete(transactionId);
    console.log('Transacción eliminada:', result);
    return result;
  } catch (error) {
    console.error('Error al eliminar transacción:', error);
    throw error;
  }
};

// ===================================
// EJEMPLO 5: Obtener estadísticas
// ===================================
export const loadStats = async () => {
  try {
    const stats = await transactionService.getStats();
    console.log('Estadísticas:', stats);
    // stats = { income, expenses, balance, totalTransactions }
    return stats;
  } catch (error) {
    console.error('Error al cargar estadísticas:', error);
    return { income: 0, expenses: 0, balance: 0, totalTransactions: 0 };
  }
};

// ===================================
// EJEMPLO 6: Obtener transacciones por rango de fechas
// ===================================
export const loadTransactionsByDateRange = async () => {
  try {
    const startDate = new Date('2025-10-01').toISOString();
    const endDate = new Date('2025-10-31').toISOString();

    const transactions = await transactionService.getByDateRange(startDate, endDate);
    console.log('Transacciones del mes:', transactions);
    return transactions;
  } catch (error) {
    console.error('Error al cargar transacciones por rango:', error);
    return [];
  }
};

// ===================================
// EJEMPLO 7: Uso en un componente React
// ===================================
/*
import React, { useState, useEffect } from 'react';
import { transactionService } from '../config/api';

const MyComponent = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudieron cargar las transacciones');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTransaction = async (transactionData) => {
    setLoading(true);
    try {
      await transactionService.create(transactionData);
      await loadData(); // Recargar datos
      Alert.alert('Éxito', 'Transacción creada correctamente');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'No se pudo crear la transacción');
    } finally {
      setLoading(false);
    }
  };

  return (
    // Tu JSX aquí
  );
};
*/

// ===================================
// EJEMPLO 8: Calcular totales por categoría
// ===================================
export const calculateTotalsByCategory = (transactions) => {
  const totals = {};

  transactions.forEach(transaction => {
    const categoryId = transaction.categoryId;
    if (!totals[categoryId]) {
      totals[categoryId] = {
        categoryId,
        total: 0,
        count: 0,
      };
    }
    totals[categoryId].total += transaction.amount;
    totals[categoryId].count += 1;
  });

  return Object.values(totals);
};

// ===================================
// EJEMPLO 9: Filtrar transacciones
// ===================================
export const filterTransactions = (transactions, filters) => {
  let filtered = [...transactions];

  // Filtrar por tipo
  if (filters.type && filters.type !== 'all') {
    filtered = filtered.filter(t => t.type === filters.type);
  }

  // Filtrar por categoría
  if (filters.categoryId) {
    filtered = filtered.filter(t => t.categoryId === filters.categoryId);
  }

  // Filtrar por búsqueda de texto
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(t =>
      t.description.toLowerCase().includes(searchLower)
    );
  }

  // Filtrar por rango de fechas
  if (filters.startDate && filters.endDate) {
    filtered = filtered.filter(t => {
      const transactionDate = new Date(t.date);
      return transactionDate >= filters.startDate && transactionDate <= filters.endDate;
    });
  }

  return filtered;
};

// ===================================
// EJEMPLO 10: Ordenar transacciones
// ===================================
export const sortTransactions = (transactions, sortBy = 'date', order = 'desc') => {
  const sorted = [...transactions];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        comparison = new Date(a.date) - new Date(b.date);
        break;
      case 'amount':
        comparison = a.amount - b.amount;
        break;
      case 'description':
        comparison = a.description.localeCompare(b.description);
        break;
      default:
        comparison = 0;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
};

// ===================================
// EJEMPLO 11: Obtener resumen del mes actual
// ===================================
export const getCurrentMonthSummary = (transactions) => {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

  const monthTransactions = transactions.filter(t => {
    const transactionDate = new Date(t.date);
    return transactionDate >= startOfMonth && transactionDate <= endOfMonth;
  });

  const income = monthTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = monthTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    income,
    expenses,
    balance: income - expenses,
    count: monthTransactions.length,
  };
};

// ===================================
// NOTAS IMPORTANTES
// ===================================

/*
1. Asegúrate de configurar tu API Key de MongoDB en src/config/api.js

2. Para desarrollo local, puedes usar datos de prueba (mock data) sin conectar
   a MongoDB. Simplemente comenta las llamadas a la API y usa datos locales.

3. Maneja siempre los errores con try-catch para evitar crashes.

4. Usa estados de carga (loading) para mejorar la experiencia de usuario.

5. Considera implementar caché local con AsyncStorage para modo offline.

6. Para producción, implementa autenticación y autorización.
*/

export default {
  loadAllTransactions,
  createNewTransaction,
  updateExistingTransaction,
  deleteTransaction,
  loadStats,
  loadTransactionsByDateRange,
  calculateTotalsByCategory,
  filterTransactions,
  sortTransactions,
  getCurrentMonthSummary,
};

