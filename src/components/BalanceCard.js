import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

const BalanceCard = ({ balance, income, expenses }) => {
  return (
    <LinearGradient
      colors={colors.gradient.blue}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <Text style={styles.label}>Balance Total</Text>
      <Text style={styles.balance}>
        ${balance.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
      </Text>
      
      <View style={styles.divider} />
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Ionicons name="arrow-down-circle" size={24} color="#fff" />
          </View>
          <View>
            <Text style={styles.statLabel}>Ingresos</Text>
            <Text style={styles.statValue}>
              ${income.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>
        
        <View style={styles.statItem}>
          <View style={styles.statIconContainer}>
            <Ionicons name="arrow-up-circle" size={24} color="#fff" />
          </View>
          <View>
            <Text style={styles.statLabel}>Gastos</Text>
            <Text style={styles.statValue}>
              ${expenses.toLocaleString('es-ES', { minimumFractionDigits: 2 })}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  label: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
    fontWeight: '500',
  },
  balance: {
    fontSize: 42,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statIconContainer: {
    marginRight: 12,
    opacity: 0.9,
  },
  statLabel: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
  },
});

export default BalanceCard;

