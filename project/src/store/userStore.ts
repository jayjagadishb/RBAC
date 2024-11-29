import { create } from 'zustand';
import { User } from '../types';
import { users as initialUsers } from '../data/mockData';

interface UserState {
  users: User[];
  addUser: (user: Omit<User, 'id' | 'avatar'>) => void;
  updateUser: (id: string, userData: Partial<User>) => void;
  deleteUser: (id: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: initialUsers,
  addUser: (userData) => {
    set((state) => ({
      users: [
        ...state.users,
        {
          ...userData,
          id: String(state.users.length + 1),
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            userData.name
          )}&background=random`,
        },
      ],
    }));
  },
  updateUser: (id, userData) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.id === id ? { ...user, ...userData } : user
      ),
    }));
  },
  deleteUser: (id) => {
    set((state) => ({
      users: state.users.filter((user) => user.id !== id),
    }));
  },
}));