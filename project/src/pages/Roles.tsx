// import React, { useState } from 'react';
// import RoleList from '../components/RoleList';
// import { roles } from '../data/mockData';
// import { Role } from '../types';
// import { Plus } from 'lucide-react';

// export default function Roles() {
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredRoles = roles.filter((role) =>
//     role.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleEdit = (role: Role) => {
//     // Implement edit functionality
//     console.log('Edit role:', role);
//   };

//   const handleDelete = (roleId: string) => {
//     // Implement delete functionality
//     console.log('Delete role:', roleId);
//   };

//   return (
//     <div className="p-6">
//       <div className="sm:flex sm:items-center sm:justify-between mb-6">
//         <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
//         <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
//           <button
//             type="button"
//             className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
//           >
//             <Plus className="h-4 w-4 mr-2" />
//             Add Role
//           </button>
//         </div>
//       </div>

//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Search roles..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
//         />
//       </div>

//       <div className="bg-white shadow rounded-lg">
//         <RoleList
//           roles={filteredRoles}
//           onEdit={handleEdit}
//           onDelete={handleDelete}
//         />
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import RoleList from '../components/RoleList';
import AddRoleModal from '../components/AddRoleModal';
import EditRoleModal from '../components/EditRoleModal';
import { Plus } from 'lucide-react';
import { useRoleStore } from '../store/roleStore';
import { Role } from '../types';

export default function Roles() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const { roles, addRole, updateRole, deleteRole } = useRoleStore();

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddRole = (roleData: Omit<Role, "id">) => {
    addRole(roleData);
    setIsAddModalOpen(false);
  };

  const handleEdit = (role: Role) => {
    setEditingRole(role);
  };

  const handleUpdate = (roleData: Partial<Role>) => {
    if (editingRole) {
      updateRole(editingRole.id, roleData);
      setEditingRole(null);
    }
  };

  const handleDelete = (roleId: string) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      deleteRole(roleId);
    }
  };

  return (
    <div className="p-6">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Roles</h1>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Role
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search roles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <div className="bg-white shadow rounded-lg">
        <RoleList
          roles={filteredRoles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <AddRoleModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddRole} resources={[]}      />

      {editingRole && (
        <EditRoleModal
          isOpen={!!editingRole}
          onClose={() => setEditingRole(null)}
          roleData={editingRole}
          onSubmit={handleUpdate} resources={[]}        />
      )}
    </div>
  );
}



