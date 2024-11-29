import React from 'react';
import { Users, Shield, Layout, LogOut, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const getNavigationItems = (roleId: string) => {
  if (roleId === '1') {
    return [
      { name: 'Dashboard', href: '/', icon: Layout },
      { name: 'Users', href: '/users', icon: Users },
      { name: 'Roles', href: '/roles', icon: Shield },
    ];
  } else if (roleId === '2') {
    return [
      { name: 'Dashboard', href: '/', icon: Layout },
      { name: 'Users', href: '/users', icon: Users },
    ];
  } else {
    return [{ name: 'Profile', href: '/profile', icon: User }];
  }
};

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);

  const navigation = getNavigationItems(user?.roleId || '3');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center justify-center">
        <h1 className="text-xl font-bold text-white">RBAC</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`${
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } group flex items-center rounded-md px-2 py-2 text-sm font-medium`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className="px-2 py-4 border-t border-gray-700">
        <div className="flex items-center px-2 py-2 mb-4">
          <img
            src={user?.avatar}
            alt={user?.name}
            className="h-8 w-8 rounded-full mr-3"
          />
          <div>
            <p className="text-sm font-medium text-white">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white group"
        >
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}