import { create } from 'zustand';
import { Role } from '../types';
import { roles as initialRoles } from '../data/mockData';

interface RoleState {
  roles: Role[];
  addRole: (roleData: Omit<Role, 'id'>) => void;
  updateRole: (id: string, roleData: Partial<Role>) => void;
  deleteRole: (id: string) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  roles: initialRoles,
  addRole: (roleData) => {
    set((state) => ({
      roles: [
        ...state.roles,
        {
          ...roleData,
          id: String(state.roles.length + 1),
        },
      ],
    }));
  },
  updateRole: (id, roleData) => {
    set((state) => ({
      roles: state.roles.map((role) =>
        role.id === id ? { ...role, ...roleData } : role
      ),
    }));
  },
  deleteRole: (id) => {
    set((state) => ({
      roles: state.roles.filter((role) => role.id !== id),
    }));
  },
}));
