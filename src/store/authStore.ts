import { create } from 'zustand';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'client';
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('auth_token'),
  isLoading: false,

  login: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/login', credentials);
      const { user, token } = response.data;
      localStorage.setItem('auth_token', token);
      set({ user, token, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  register: async (data) => {
    set({ isLoading: true });
    try {
      const response = await api.post('/register', data);
      const { user, token } = response.data;
      localStorage.setItem('auth_token', token);
      set({ user, token, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post('/logout');
    } catch (error) {
      console.error('Logout error', error);
    } finally {
      localStorage.removeItem('auth_token');
      set({ user: null, token: null });
    }
  },

  checkAuth: async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) return;
    
    set({ isLoading: true });
    try {
      const response = await api.get('/user');
      set({ user: response.data, isLoading: false });
    } catch (error) {
      localStorage.removeItem('auth_token');
      set({ user: null, token: null, isLoading: false });
    }
  },
}));
