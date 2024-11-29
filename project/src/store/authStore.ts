import { create } from 'zustand';
import { AuthUser, User } from '../types';
import { users } from '../data/mockData';

interface AuthState {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: {
    name: string;
    email: string;
    password: string;
    roleId: string;
  }) => Promise<boolean>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (email: string, password: string) => {
    // Simulate API call
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      const { password: _, ...authUser } = user;
      set({ user: { ...authUser, isAuthenticated: true } });
      return true;
    }
    return false;
  },
  logout: () => {
    set({ user: null });
  },
  signup: async (userData) => {
    // Simulate API call
    const newUser: User = {
      id: String(users.length + 1),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      roleId: userData.roleId,
      status: 'active',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        userData.name
      )}&background=random`,
    };

    // In a real app, this would be an API call
    users.push(newUser);
    return true;
  },
}));