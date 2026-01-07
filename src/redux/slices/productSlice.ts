import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductFormData, FilterState } from '../../types';

// Mock data
const mockProducts: Product[] = [
  {
    id: '1234567',
    name: 'Product Name',
    description: 'This is product description, Nike Air Rage will show you the detail about them. Running Shoe, but the Runner and the Brand both call this Model both runners, if you put a small description here, people can scan your ads to see more info, and you can test this ads on your test profile, then choose the best one for your ads to see more info, and you can test this ads on your test profile.',
    category: 'Footwear',
    price: 122,
    purchasingPrice: 80,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    vendor: 'Nike',
    status: 'active',
    colors: ['Green', 'Yellow', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: '1234568',
    name: 'Item Name',
    description: 'Premium running shoes with excellent cushioning.',
    category: 'Footwear',
    price: 89,
    purchasingPrice: 60,
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    vendor: 'Adidas',
    status: 'active',
    colors: ['Blue', 'White'],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: '1234569',
    name: 'Item Name',
    description: 'Stylish casual sneakers for everyday wear.',
    category: 'Footwear',
    price: 95,
    purchasingPrice: 65,
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    vendor: 'Puma',
    status: 'active',
    colors: ['Pink', 'Gray'],
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: '1234570',
    name: 'Item Name',
    description: 'High-performance athletic shoes.',
    category: 'Footwear',
    price: 110,
    purchasingPrice: 75,
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400',
    vendor: 'Nike',
    status: 'active',
    colors: ['Green', 'Black'],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: '1234571',
    name: 'Item Name',
    description: 'Comfortable walking shoes.',
    category: 'Footwear',
    price: 78,
    purchasingPrice: 50,
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400',
    vendor: 'Reebok',
    status: 'inactive',
    colors: ['White', 'Blue'],
    sizes: ['M', 'L'],
  },
  {
    id: '1234572',
    name: 'Product Name',
    description: 'Lightweight running shoes.',
    category: 'Footwear',
    price: 99,
    purchasingPrice: 70,
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=400',
    vendor: 'Nike',
    status: 'active',
    colors: ['Red', 'Yellow'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: '1234573',
    name: 'Product Name',
    description: 'Training shoes for gym.',
    category: 'Footwear',
    price: 85,
    purchasingPrice: 55,
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400',
    vendor: 'Adidas',
    status: 'active',
    colors: ['Black', 'White'],
    sizes: ['M', 'L', 'XL'],
  },
  {
    id: '1234574',
    name: 'Product Name',
    description: 'Sport shoes with great support.',
    category: 'Footwear',
    price: 105,
    purchasingPrice: 72,
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400',
    vendor: 'Puma',
    status: 'active',
    colors: ['Purple', 'Pink'],
    sizes: ['S', 'M', 'L'],
  },
];

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  filters: FilterState;
  filteredProducts: Product[];
}

const initialState: ProductState = {
  products: mockProducts,
  selectedProduct: null,
  filters: {
    categories: [],
    priceRange: [0, 5000],
    vendors: [],
  },
  filteredProducts: mockProducts,
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductFormData>) => {
      const newProduct: Product = {
        id: Math.random().toString().slice(2, 9),
        name: action.payload.name,
        description: action.payload.description,
        category: action.payload.category,
        price: action.payload.price,
        purchasingPrice: action.payload.purchasingPrice,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        vendor: 'Unknown',
        status: 'active',
        colors: ['Green', 'Yellow'],
        sizes: ['M', 'L', 'XL'],
      };
      state.products.push(newProduct);
      state.filteredProducts = state.products;
    },
    selectProduct: (state, action: PayloadAction<Product | null>) => {
      state.selectedProduct = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
      // Apply filters
      state.filteredProducts = state.products.filter((product) => {
        const categoryMatch =
          state.filters.categories.length === 0 ||
          state.filters.categories.includes(product.category);
        const priceMatch =
          product.price >= state.filters.priceRange[0] &&
          product.price <= state.filters.priceRange[1];
        const vendorMatch =
          state.filters.vendors.length === 0 ||
          state.filters.vendors.includes(product.vendor);
        return categoryMatch && priceMatch && vendorMatch;
      });
    },
    clearFilters: (state) => {
      state.filters = {
        categories: [],
        priceRange: [0, 5000],
        vendors: [],
      };
      state.filteredProducts = state.products;
    },
  },
});

export const { addProduct, selectProduct, setFilters, clearFilters } =
  productSlice.actions;
export default productSlice.reducer;
