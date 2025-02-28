import React, { createContext, useContext, useState, useEffect } from 'react';
import { userApi } from '../lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  isGuest?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  guestLogin: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, we'll use mock data instead of actual API calls
      // This prevents "Failed to fetch" errors when the server isn't running
      // In a real app, you would use: await userApi.login({ email, password });
      
      // Mock successful login
      const mockUserData = {
        id: '65f1a2b3c4d5e6f7a8b9c0d1',
        name: email.split('@')[0],
        email: email
      };
      
      setUser(mockUserData);
      localStorage.setItem('user', JSON.stringify(mockUserData));
    } catch (err: any) {
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // For demo purposes, we'll use mock data instead of actual API calls
      // This prevents "Failed to fetch" errors when the server isn't running
      // In a real app, you would use: await userApi.register({ name, email, password });
      
      // Mock successful registration
      const mockUserData = {
        id: '65f1a2b3c4d5e6f7a8b9c0d1',
        name: name,
        email: email
      };
      
      setUser(mockUserData);
      localStorage.setItem('user', JSON.stringify(mockUserData));
    } catch (err: any) {
      setError(err.message || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const guestLogin = () => {
    const guestUser = {
      id: 'guest',
      name: 'Guest User',
      email: 'guest@example.com',
      isGuest: true
    };
    setUser(guestUser);
    localStorage.setItem('user', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, guestLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};