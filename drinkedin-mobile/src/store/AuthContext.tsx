import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import api from '../services/api';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const token = await SecureStore.getItemAsync('userToken');
      if (token) {
        const response = await api.get('/users/me');
        setUser(response.data);
      }
    } catch (e) {
      console.log('Failed to restore session:', e);
      await SecureStore.deleteItemAsync('userToken');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // FastAPI expects form-data for OAuth2PasswordRequestForm
      const response = await api.post('/auth/login', {
        username: email,
        password: password,
      }, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      });
      const { access_token } = response.data;
      await SecureStore.setItemAsync('userToken', access_token);
      
      const userResponse = await api.get('/users/me', {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      setUser(userResponse.data);
      router.replace('/feed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const register = async (data: any) => {
    try {
      await api.post('/auth/register', data);
      await login(data.email, data.password);
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUser(null);
    router.replace('/auth/login');
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
