import React, { useState } from 'react';
import Modal from './Modal';
import { Resource, Permission } from '../types';

interface EditRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  resources: Resource[];
  roleData: {
    name: string;
    description: string;
    permissions: Record<string, Permission[]>;
  };
  onSubmit: (updatedRoleData: {
    name: string;
    description: string;
    permissions: Record<string, Permission[]>;
  }) => void;
}

export default function EditRoleModal({
  isOpen,
  onClose,
  resources,
  roleData,
  onSubmit,
}: EditRoleModalProps) {
  const [formData, setFormData] = useState(roleData);

  const handlePermissionChange = (
    resourceId: string,
    permission: Permission,
    checked: boolean
  ) => {
    setFormData((prev) => {
      const currentPermissions = prev.permissions[resourceId] || [];
      const newPermissions = checked
        ? [...currentPermissions, permission]
        : currentPermissions.filter((p) => p !== permission);

      return {
        ...prev,
        permissions: {
          ...prev.permissions,
          [resourceId]: newPermissions,
        },
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const permissions: Permission[] = ['create', 'read', 'update', 'delete'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Role">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Role Name
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={3}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Permissions
          </label>
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="border rounded-md p-4">
                <h4 className="font-medium mb-2">{resource.name}</h4>
                <div className="grid grid-cols-2 gap-2">
                  {permissions.map((permission) => (
                    <label
                      key={`${resource.id}-${permission}`}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="checkbox"
                        checked={
                          (formData.permissions[resource.id] || []).includes(
                            permission
                          )
                        }
                        onChange={(e) =>
                          handlePermissionChange(
                            resource.id,
                            permission,
                            e.target.checked
                          )
                        }
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {permission}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
