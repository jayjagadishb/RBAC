import React, { useState } from 'react';
import UserList from '../components/UserList';
import AddUserModal from '../components/AddUserModal';
import EditUserModal from '../components/EditUserModal';
import { roles } from '../data/mockData';
import { User } from '../types';
import { Plus } from 'lucide-react';
import { useUserStore } from '../store/userStore';
import { useAuthStore } from '../store/authStore';

export default function Users() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { users, addUser, updateUser, deleteUser } = useUserStore();
  const currentUser = useAuthStore((state) => state.user);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddUser = (userData: {
    name: string;
    email: string;
    password: string;
    roleId: string;
  }) => {
    addUser({
      ...userData,
      status: 'active',
    });
    setIsAddModalOpen(false);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdate = (userData: Partial<User>) => {
    if (editingUser) {
      updateUser(editingUser.id, userData);
      setEditingUser(null);
    }
  };

  const handleDelete = (userId: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      deleteUser(userId);
    }
  };

  // Show only the current user's profile for viewers
  if (currentUser?.roleId === '3') {
    const currentUserData = users.find((u) => u.id === currentUser.id);
    if (!currentUserData) return null;

    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">My Profile</h1>
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center mb-6">
            <img
              src={currentUserData.avatar}
              alt={currentUserData.name}
              className="h-20 w-20 rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-semibold">{currentUserData.name}</h2>
              <p className="text-gray-600">{currentUserData.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                Role: {roles.find((r) => r.id === currentUserData.roleId)?.name}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
        {currentUser?.roleId === '1' && (
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add User
            </button>
          </div>
        )}
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="bg-white shadow rounded-lg">
        <UserList
          users={filteredUsers}
          roles={roles}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentUserRole={currentUser?.roleId}
        />
      </div>

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        roles={roles}
        onSubmit={handleAddUser}
      />

      {editingUser && (
        <EditUserModal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          user={editingUser}
          roles={roles}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
}