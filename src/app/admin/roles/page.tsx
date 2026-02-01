'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Shield, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const PERMISSIONS = [
  {
    category: 'Employees',
    permissions: [
      { id: 'employees:read', label: 'View Employees' },
      { id: 'employees:create', label: 'Create Employees' },
      { id: 'employees:update', label: 'Edit Employees' },
      { id: 'employees:delete', label: 'Delete Employees' },
    ],
  },
  {
    category: 'Attendance',
    permissions: [
      { id: 'attendance:read', label: 'View Attendance' },
      { id: 'attendance:approve', label: 'Approve Attendance' },
    ],
  },
  {
    category: 'Leave',
    permissions: [
      { id: 'leave:read', label: 'View Leave' },
      { id: 'leave:approve', label: 'Approve Leave' },
    ],
  },
  {
    category: 'Payroll',
    permissions: [
      { id: 'payroll:read', label: 'View Payroll' },
      { id: 'payroll:process', label: 'Process Payroll' },
    ],
  },
  {
    category: 'Settings',
    permissions: [
      { id: 'settings:read', label: 'View Settings' },
      { id: 'settings:update', label: 'Edit Settings' },
    ],
  },
];

interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault: boolean;
  userCount: number;
}

export default function RoleManagement() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [] as string[],
  });

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch('/api/admin/roles');
      const data = await response.json();
      if (data.success) {
        setRoles(data.data);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const url = editingRole ? `/api/admin/roles/${editingRole.id}` : '/api/admin/roles';
    const method = editingRole ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(editingRole ? 'Role updated successfully' : 'Role created successfully');
        setIsDialogOpen(false);
        setEditingRole(null);
        setFormData({ name: '', description: '', permissions: [] });
        fetchRoles();
      } else {
        toast.error(data.error?.message || 'Failed to save role');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (roleId: string) => {
    if (!confirm('Are you sure you want to delete this role?')) return;

    try {
      const response = await fetch(`/api/admin/roles/${roleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast.success('Role deleted successfully');
        fetchRoles();
      }
    } catch (error) {
      toast.error('Failed to delete role');
    }
  };

  const togglePermission = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const openCreateDialog = () => {
    setEditingRole(null);
    setFormData({ name: '', description: '', permissions: [] });
    setIsDialogOpen(true);
  };

  const openEditDialog = (role: Role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: role.permissions,
    });
    setIsDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Role Management</h1>
          <p className="text-muted-foreground">Manage user roles and permissions</p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="mr-2 h-4 w-4" />
          Create Role
        </Button>
      </div>

      {/* Roles List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="icon" onClick={() => openEditDialog(role)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  {!role.isDefault && (
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(role.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {role.description || 'No description'}
              </p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{role.permissions.length} permissions</span>
                <span className="text-muted-foreground">{role.userCount} users</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                {role.permissions.slice(0, 3).map((perm) => (
                  <Badge key={perm} variant="secondary" className="text-xs">
                    {perm.split(':')[0]}
                  </Badge>
                ))}
                {role.permissions.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{role.permissions.length - 3}
                  </Badge>
                )}
              </div>
              {role.isDefault && (
                <Badge variant="outline" className="mt-3">
                  Default Role
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingRole ? 'Edit Role' : 'Create New Role'}</DialogTitle>
            <DialogDescription>Define role permissions and access levels</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Role Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., HR Manager"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief description of this role"
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Permissions</Label>
              {PERMISSIONS.map((category) => (
                <div key={category.category} className="border rounded-lg p-4">
                  <h4 className="font-medium mb-3">{category.category}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {category.permissions.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={permission.id}
                          checked={formData.permissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                        <Label htmlFor={permission.id} className="text-sm">
                          {permission.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingRole ? 'Update Role' : 'Create Role'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
