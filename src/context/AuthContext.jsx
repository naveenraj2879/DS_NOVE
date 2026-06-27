import React, { createContext, useContext, useState, useEffect } from 'react';
import dharaniImg from '../assets/team/dharani.jpeg';
import avatarClientImg from '../assets/brand/avatar-client.svg';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for existing session
    const savedUser = localStorage.getItem('dsnove_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        localStorage.removeItem('dsnove_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password, type = 'client') => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Admin Login Checks
        if (type === 'admin') {
          if (email === 'admin@dsnove.com' && password === 'admin123') {
            const adminUser = {
              id: 'admin-01',
              name: 'Dharani D',
              email: 'admin@dsnove.com',
              role: 'admin',
              avatar: dharaniImg,
              token: 'mock-jwt-admin-token-12345'
            };
            setUser(adminUser);
            localStorage.setItem('dsnove_user', JSON.stringify(adminUser));
            resolve(adminUser);
          } else {
            reject(new Error('Invalid admin credentials. Use admin@dsnove.com / admin123'));
          }
        } else {
          // Client Login Checks
          // Check registered clients in localStorage
          const clients = JSON.parse(localStorage.getItem('dsnove_clients') || '[]');
          const existingClient = clients.find(c => c.email === email && c.password === password);
          
          if (existingClient) {
            const clientUser = {
              id: existingClient.id,
              name: existingClient.name,
              email: existingClient.email,
              company: existingClient.company,
              phone: existingClient.phone,
              role: 'client',
              avatar: existingClient.avatar || avatarClientImg,
              token: `mock-jwt-client-token-${existingClient.id}`
            };
            setUser(clientUser);
            localStorage.setItem('dsnove_user', JSON.stringify(clientUser));
            resolve(clientUser);
          } else if (email === 'client@company.com' && password === 'client123') {
            // Default demo client
            const defaultClient = {
              id: 'client-demo',
              name: 'John Doe',
              email: 'client@company.com',
              company: 'MediCore Solutions',
              phone: '+91 (987) 654-3210',
              role: 'client',
              avatar: avatarClientImg,
              token: 'mock-jwt-client-demo-token'
            };
            setUser(defaultClient);
            localStorage.setItem('dsnove_user', JSON.stringify(defaultClient));
            resolve(defaultClient);
          } else {
            reject(new Error('Invalid email or password. Use client@company.com / client123 or Register.'));
          }
        }
      }, 800); // Simulate network delay
    });
  };

  const register = async (name, email, password, company, phone) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const clients = JSON.parse(localStorage.getItem('dsnove_clients') || '[]');
        if (clients.find(c => c.email === email) || email === 'client@company.com' || email === 'admin@dsnove.com') {
          reject(new Error('Email is already registered.'));
          return;
        }

        const newClient = {
          id: `client-${Date.now()}`,
          name,
          email,
          password, // stored as plain-text mock
          company,
          phone,
          avatar: avatarClientImg
        };

        clients.push(newClient);
        localStorage.setItem('dsnove_clients', JSON.stringify(clients));

        // Auto login after registration
        const clientSession = {
          id: newClient.id,
          name: newClient.name,
          email: newClient.email,
          company: newClient.company,
          phone: newClient.phone,
          role: 'client',
          avatar: newClient.avatar,
          token: `mock-jwt-client-token-${newClient.id}`
        };
        setUser(clientSession);
        localStorage.setItem('dsnove_user', JSON.stringify(clientSession));
        resolve(clientSession);
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dsnove_user');
  };

  const updateProfile = (updatedData) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('dsnove_user', JSON.stringify(updatedUser));

    // Update in stored clients list if it's a registered client
    if (user.role === 'client' && user.id !== 'client-demo') {
      const clients = JSON.parse(localStorage.getItem('dsnove_clients') || '[]');
      const clientIndex = clients.findIndex(c => c.id === user.id);
      if (clientIndex !== -1) {
        clients[clientIndex] = { ...clients[clientIndex], ...updatedData };
        localStorage.setItem('dsnove_clients', JSON.stringify(clients));
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
