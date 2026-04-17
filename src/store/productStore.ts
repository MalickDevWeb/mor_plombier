import { create } from 'zustand';
import api from '../services/api';

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  price: number;
  stock: number;
  category?: any;
}

interface ProductState {
  products: Product[];
  isLoading: boolean;
  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/products');
      set({ products: response.data.data || [], isLoading: false });
    } catch (error) {
      console.error('Fetch products error', error);
      set({ isLoading: false });
    }
  },
}));
