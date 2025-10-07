import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from './Card';
import colors from '../config/colors';
import { getCategoryById } from '../config/categories';

const TransactionCard = ({ transaction, onPress }) => {
  const category = getCategoryById(transaction.categoryId);
  const isIncome = transaction.type === 'income';
  const amount = transaction.amount;
  const date = new Date(transaction.date);
  
  const formattedDate = date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  const formattedTime = date.toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <Card style={styles.card} onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.iconContainer, { backgroundColor: category?.color + '20' }]}>
          <Ionicons 
            name={category?.icon || 'help'} 
            size={24} 
            color={category?.color || colors.textSecondary} 
          />
        </View>
        
        <View style={styles.infoContainer}>
          <Text style={styles.category}>{category?.name || 'Sin categoría'}</Text>
          <Text style={styles.description}>
            {transaction.description || 'Sin descripción'}
          </Text>
          <Text style={styles.date}>{formattedDate} • {formattedTime}</Text>
        </View>

        <View style={styles.amountContainer}>
          <Text style={[
            styles.amount,
            { color: isIncome ? colors.income : colors.expense }
          ]}>
            {isIncome ? '+' : '-'} ${amount.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  category: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: colors.textLight,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default TransactionCard;

