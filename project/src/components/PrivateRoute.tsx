import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

export default function PrivateRoute({ children, requiredRole }: PrivateRouteProps) {
  const user = useAuthStore((state) => state.user);

  if (!user?.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && !requiredRole.includes(user.roleId)) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}