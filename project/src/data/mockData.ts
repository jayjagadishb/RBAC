import { Role, User, Resource } from '../types';

export const resources: Resource[] = [
  { id: 'users', name: 'Users' },
  { id: 'roles', name: 'Roles' },
  { id: 'products', name: 'Products' },
  { id: 'orders', name: 'Orders' },
];

export const roles: Role[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full system access',
    permissions: {
      users: ['create', 'read', 'update', 'delete'],
      roles: ['create', 'read', 'update', 'delete'],
      
    },
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can manage content',
    permissions: {
      users: ['create', 'read', 'update', 'delete'],
      roles: [ 'read'],
    },
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Read-only access',
    permissions: {
      profile: ['read','update'],
      
    },
  },
];

export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces',
    roleId: '1',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
    roleId: '2',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Wilson',
    email: 'bob@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces',
    roleId: '3',
    status: 'inactive',
  },
];