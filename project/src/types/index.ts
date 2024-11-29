export type Permission = 'create' | 'read' | 'update' | 'delete';

export interface Resource {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Record<string, Permission[]>;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar: string;
  roleId: string;
  status: 'active' | 'inactive';
}

export interface AuthUser extends Omit<User, 'password'> {
  isAuthenticated: boolean;
}