import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LineChart, PieChart, BarChart } from 'react-native-chart-kit';
import Card from '../components/Card';
import colors from '../config/colors';
import { getCategoryById } from '../config/categories';

const { width } = Dimensions.get('window');

const StatsScreen = () => {
  const [period, setPeriod] = useState('month'); // week, month, year

  // Datos de ejemplo para gráficos
  const lineChartData = {
    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
    datasets: [
      {
        data: [2500, 2800, 2300, 3200, 2900, 3500],
        color: (opacity = 1) => colors.income,
        strokeWidth: 3,
      },
      {
        data: [1800, 2200, 1900, 2500, 2100, 2300],
        color: (opacity = 1) => colors.expense,
        strokeWidth: 3,
      },
    ],
    legend: ['Ingresos', 'Gastos'],
  };

  const expensesByCategory = [
    { name: 'Alimentación', amount: 450, color: '#FF6B6B', legendFontColor: colors.textPrimary },
    { name: 'Transporte', amount: 230, color: '#4ECDC4', legendFontColor: colors.textPrimary },
    { name: 'Vivienda', amount: 800, color: '#95E1D3', legendFontColor: colors.textPrimary },
    { name: 'Servicios', amount: 185, color: '#F38181', legendFontColor: colors.textPrimary },
    { name: 'Otros', amount: 335, color: '#95A5A6', legendFontColor: colors.textPrimary },
  ];

  const chartConfig = {
    backgroundGradientFrom: colors.surface,
    backgroundGradientTo: colors.surface,
    color: (opacity = 1) => `rgba(108, 99, 255, ${opacity})`,
    strokeWidth: 3,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
    propsForLabels: {
      fontSize: 12,
      fontWeight: '600',
    },
  };

  const topExpenses = [
    { id: 1, name: 'Alquiler', amount: 800, categoryId: 3, percentage: 40 },
    { id: 2, name: 'Supermercado', amount: 450, categoryId: 1, percentage: 22 },
    { id: 3, name: 'Servicios', amount: 185, categoryId: 4, percentage: 9 },
    { id: 4, name: 'Transporte', amount: 230, categoryId: 2, percentage: 11 },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estadísticas</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.periodSelector}>
        {['week', 'month', 'year'].map((p) => (
          <TouchableOpacity
            key={p}
            style={[
              styles.periodButton,
              period === p && styles.periodButtonActive,
            ]}
            onPress={() => setPeriod(p)}
          >
            <Text
              style={[
                styles.periodText,
                period === p && styles.periodTextActive,
              ]}
            >
              {p === 'week' ? 'Semana' : p === 'month' ? 'Mes' : 'Año'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Card style={styles.summaryCard}>
          <Text style={styles.cardTitle}>Resumen del Mes</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <View style={[styles.summaryIcon, { backgroundColor: colors.income + '20' }]}>
                <Ionicons name="trending-up" size={24} color={colors.income} />
              </View>
              <View style={styles.summaryInfo}>
                <Text style={styles.summaryLabel}>Total Ingresos</Text>
                <Text style={[styles.summaryValue, { color: colors.income }]}>
                  $3,700
                </Text>
              </View>
            </View>

            <View style={styles.summaryItem}>
              <View style={[styles.summaryIcon, { backgroundColor: colors.expense + '20' }]}>
                <Ionicons name="trending-down" size={24} color={colors.expense} />
              </View>
              <View style={styles.summaryInfo}>
                <Text style={styles.summaryLabel}>Total Gastos</Text>
                <Text style={[styles.summaryValue, { color: colors.expense }]}>
                  $2,000
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.savingsContainer}>
            <Text style={styles.savingsLabel}>Ahorro del Mes</Text>
            <Text style={styles.savingsValue}>$1,700</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '46%' }]} />
            </View>
            <Text style={styles.progressText}>46% de tus ingresos</Text>
          </View>
        </Card>

        <Card style={styles.chartCard}>
          <Text style={styles.cardTitle}>Flujo de Dinero</Text>
          <LineChart
            data={lineChartData}
            width={width - 80}
            height={200}
            chartConfig={chartConfig}
            bezier
            style={styles.chart}
            withInnerLines={false}
            withOuterLines={true}
            withVerticalLabels={true}
            withHorizontalLabels={true}
          />
        </Card>

        <Card style={styles.chartCard}>
          <Text style={styles.cardTitle}>Gastos por Categoría</Text>
          <PieChart
            data={expensesByCategory}
            width={width - 80}
            height={220}
            chartConfig={chartConfig}
            accessor="amount"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </Card>

        <Card style={styles.topExpensesCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Principales Gastos</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {topExpenses.map((expense, index) => {
            const category = getCategoryById(expense.categoryId);
            return (
              <View key={expense.id} style={styles.expenseItem}>
                <View style={styles.expenseLeft}>
                  <View style={[styles.expenseIcon, { backgroundColor: category?.color + '20' }]}>
                    <Ionicons name={category?.icon} size={20} color={category?.color} />
                  </View>
                  <View>
                    <Text style={styles.expenseName}>{expense.name}</Text>
                    <Text style={styles.expenseCategory}>{category?.name}</Text>
                  </View>
                </View>
                <View style={styles.expenseRight}>
                  <Text style={styles.expenseAmount}>
                    ${expense.amount.toLocaleString('es-ES')}
                  </Text>
                  <Text style={styles.expensePercentage}>{expense.percentage}%</Text>
                </View>
              </View>
            );
          })}
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.surface,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: colors.primary,
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  periodTextActive: {
    color: '#fff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  summaryCard: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  summaryItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  summaryInfo: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '700',
  },
  savingsContainer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  savingsLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  savingsValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: colors.textLight,
  },
  chartCard: {
    marginBottom: 16,
    alignItems: 'center',
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  topExpensesCard: {
    marginBottom: 24,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  expenseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  expenseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  expenseIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  expenseName: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  expenseCategory: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  expenseRight: {
    alignItems: 'flex-end',
  },
  expenseAmount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  expensePercentage: {
    fontSize: 12,
    color: colors.textLight,
  },
});

export default StatsScreen;

