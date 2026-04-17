import { create } from 'zustand';
import api from '../services/api';

export interface Category {
  id: number;
  name: string;
  slug: string;
  type: 'service' | 'product';
}

export interface Service {
  id: number;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  price_indicator: string;
  category?: Category;
}

interface ServiceState {
  services: Service[];
  isLoading: boolean;
  fetchServices: () => Promise<void>;
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  isLoading: false,

  fetchServices: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/services');
      set({ services: response.data.data || [], isLoading: false });
    } catch (error) {
      console.error('Fetch services error', error);
      set({ isLoading: false });
    }
  },
}));
