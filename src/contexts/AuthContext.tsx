import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for different roles
const demoUsers: Record<string, User> = {
  'admin@college.edu': {
    id: '1',
    email: 'admin@college.edu',
    name: 'System Administrator',
    role: 'admin',
  },
  'storekeeper@college.edu': {
    id: '2',
    email: 'storekeeper@college.edu',
    name: 'John Bekele',
    role: 'store_keeper',
  },
  'head@college.edu': {
    id: '3',
    email: 'head@college.edu',
    name: 'Dr. Alemu Tadesse',
    role: 'department_head',
    department: 'Chemistry Department',
  },
  'staff@college.edu': {
    id: '4',
    email: 'staff@college.edu',
    name: 'Meron Hailu',
    role: 'staff',
    department: 'Physics Department',
  },
  'management@college.edu': {
    id: '5',
    email: 'management@college.edu',
    name: 'Dean Kebede',
    role: 'management',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('msms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const foundUser = demoUsers[email.toLowerCase()];
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      localStorage.setItem('msms_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('msms_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading, 
      login, 
      logout, 
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
