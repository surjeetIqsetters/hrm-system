'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Shield, Plus, Edit, Trash2, Search, CheckCircle2, Lock, Key } from 'lucide-react';
import { fetchRoles } from '@/redux/slices/adminSlice';

export default function AdminRoles() {
  const dispatch = useAppDispatch();
  const admin = useAppSelector(state => state.admin);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const roles = [
    {
      id: '1',
      name: 'Employee',
      description: 'Standard employee with self-service access',
      permissions: [
        'View own attendance',
        'Apply for leave',
        'View payslips',
        'View goals',
        'Update profile',
      ],
      userCount: 120,
      isActive: true,
    },
    {
      id: '2',
      name: 'HR Manager',
      description: 'HR manager with people operations access',
      permissions: [
        'View all employees',
        'Approve attendance',
        'Approve leaves',
        'View all payslips',
        'Manage leave policies',
        'Run payroll',
        'View performance reviews',
        'Manage job postings',
        'View applicant data',
      ],
      userCount: 8,
      isActive: true,
    },
    {
      id: '3',
      name: 'Administrator',
      description: 'System administrator with full access',
      permissions: [
        'Full system access',
        'Manage users',
        'Manage roles and permissions',
        'System configuration',
        'View audit logs',
        'Manage integrations',
        'Configure AI features',
        'Security settings',
      ],
      userCount: 3,
      isActive: true,
    },
  ];

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const permissionsList = [
    { category: 'Attendance', permissions: ['View own attendance', 'View all attendance', 'Approve attendance', 'Regularize attendance'] },
    { category: 'Leave', permissions: ['Apply for leave', 'View own leaves', 'View all leaves', 'Approve leaves', 'Manage leave policies'] },
    { category: 'Payroll', permissions: ['View own payslips', 'View all payslips', 'Run payroll', 'Manage salary structure'] },
    { category: 'Performance', permissions: ['View goals', 'Create goals', 'View reviews', 'Submit self-review', 'View all reviews'] },
    { category: 'HR Operations', permissions: ['View employees', 'Manage employees', 'Create job postings', 'View applicants', 'Schedule interviews', 'Send offers'] },
    { category: 'System', permissions: ['System configuration', 'Manage roles', 'Manage permissions', 'View audit logs', 'Manage integrations'] },
    { category: 'AI Features', permissions: ['View attrition risks', 'View performance insights', 'Use resume scoring', 'Access policy chatbot'] },
    { category: 'Security', permissions: ['Security settings', 'View audit logs', 'Manage API keys', 'Configure alerts'] },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Admin Portal - Roles & Permissions</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">Back to Dashboard</Button>
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and access control</p>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {roles.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Roles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {roles.filter(r => r.isActive).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {permissionsList.reduce((acc, cat) => acc + cat.permissions.length, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create New Role
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role Name</label>
                  <Input placeholder="Enter role name" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Enter role description" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Permissions</label>
                  <ScrollArea className="h-64 border rounded-md p-4">
                    {permissionsList.map((category, idx) => (
                      <div key={idx} className="mb-4">
                        <h4 className="font-semibold text-sm mb-2">{category.category}</h4>
                        <div className="space-y-2">
                          {category.permissions.map((permission, permIdx) => (
                            <div key={permIdx} className="flex items-center justify-between p-2 border rounded">
                              <span className="text-sm">{permission}</span>
                              <Switch />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="text-sm">Active</span>
                  <Switch />
                </div>

                <div className="flex gap-2 justify-end">
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button>Create Role</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Roles List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredRoles.map((role) => (
              <Card key={role.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{role.name}</CardTitle>
                        {role.isActive && (
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            ACTIVE
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{role.description}</CardDescription>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {role.name !== 'Administrator' && (
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-muted-foreground">Users with this role</span>
                    <Badge variant="outline">{role.userCount}</Badge>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-2">Permissions ({role.permissions.length})</p>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.slice(0, 5).map((permission, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                      {role.permissions.length > 5 && (
                        <Badge variant="outline" className="text-xs">
                          +{role.permissions.length - 5} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Permissions Matrix */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                Permissions Matrix
              </CardTitle>
              <CardDescription>All available permissions by category</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <div className="space-y-4">
                  {permissionsList.map((category, idx) => (
                    <div key={idx} className="border rounded-lg p-3">
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        {category.category}
                      </h4>
                      <div className="space-y-1">
                        {category.permissions.map((permission, permIdx) => (
                          <div key={permIdx} className="text-xs p-2 bg-slate-50 dark:bg-slate-800 rounded">
                            {permission}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 HRM System. Enterprise Human Resource Management.</p>
        </div>
      </footer>
    </div>
  );
}
