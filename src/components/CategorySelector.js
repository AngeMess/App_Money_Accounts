import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../config/colors';

const CategorySelector = ({ categories, selectedCategory, onSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categoría</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = selectedCategory?.id === category.id;
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                { 
                  backgroundColor: isSelected ? category.color : category.color + '20',
                  borderWidth: isSelected ? 2 : 0,
                  borderColor: category.color,
                }
              ]}
              onPress={() => onSelect(category)}
              activeOpacity={0.7}
            >
              <Ionicons 
                name={category.icon} 
                size={24} 
                color={isSelected ? '#fff' : category.color} 
              />
              <Text style={[
                styles.categoryName,
                { color: isSelected ? '#fff' : colors.textPrimary }
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  scrollContent: {
    paddingRight: 16,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginRight: 12,
    minWidth: 100,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryName: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CategorySelector;

