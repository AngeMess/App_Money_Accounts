export const expenseCategories = [
  { id: 1, name: 'Alimentación', icon: 'food', color: '#FF6B6B' },
  { id: 2, name: 'Transporte', icon: 'car', color: '#4ECDC4' },
  { id: 3, name: 'Vivienda', icon: 'home', color: '#95E1D3' },
  { id: 4, name: 'Servicios', icon: 'flash', color: '#F38181' },
  { id: 5, name: 'Salud', icon: 'medical', color: '#51CF66' },
  { id: 6, name: 'Educación', icon: 'school', color: '#6C63FF' },
  { id: 7, name: 'Entretenimiento', icon: 'game-controller', color: '#FFA502' },
  { id: 8, name: 'Compras', icon: 'cart', color: '#FF6348' },
  { id: 9, name: 'Ropa', icon: 'shirt', color: '#A29BFE' },
  { id: 10, name: 'Tecnología', icon: 'laptop', color: '#74B9FF' },
  { id: 11, name: 'Mascotas', icon: 'paw', color: '#FDCB6E' },
  { id: 12, name: 'Otros', icon: 'ellipsis-horizontal', color: '#95A5A6' },
];

export const incomeCategories = [
  { id: 13, name: 'Salario', icon: 'wallet', color: '#51CF66' },
  { id: 14, name: 'Bonus', icon: 'gift', color: '#FFB74D' },
  { id: 15, name: 'Freelance', icon: 'briefcase', color: '#6C63FF' },
  { id: 16, name: 'Inversiones', icon: 'trending-up', color: '#4ECDC4' },
  { id: 17, name: 'Venta', icon: 'cash', color: '#51CF66' },
  { id: 18, name: 'Otros Ingresos', icon: 'add-circle', color: '#95A5A6' },
];

export const getAllCategories = () => {
  return [...expenseCategories, ...incomeCategories];
};

export const getCategoryById = (id) => {
  return getAllCategories().find(cat => cat.id === id);
};

