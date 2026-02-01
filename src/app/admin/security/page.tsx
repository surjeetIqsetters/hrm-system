'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Search, Filter, Download, Lock, Key, AlertTriangle, CheckCircle2, Eye, EyeOff, Settings } from 'lucide-react';

export default function AdminSecurity() {
  const [searchTerm, setSearchTerm] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  // Mock audit logs
  const auditLogs = [
    {
      id: '1',
      userId: '1',
      userName: 'Admin User',
      action: 'Login',
      module: 'Authentication',
      details: 'Successful login from IP 192.168.1.100',
      ipAddress: '192.168.1.100',
      timestamp: '2025-01-06T10:30:00Z',
    },
    {
      id: '2',
      userId: '2',
      userName: 'Jane Smith',
      action: 'Role Update',
      module: 'Users',
      details: 'Updated role for user EMP001 from Employee to Senior Employee',
      ipAddress: '192.168.1.105',
      timestamp: '2025-01-06T09:45:00Z',
    },
    {
      id: '3',
      userId: '1',
      userName: 'Admin User',
      action: 'API Key Generated',
      module: 'Integrations',
      details: 'Generated new API key for Mobile App',
      ipAddress: '192.168.1.100',
      timestamp: '2025-01-06T09:00:00Z',
    },
    {
      id: '4',
      userId: '2',
      userName: 'Jane Smith',
      action: 'Leave Approved',
      module: 'Leave Management',
      details: 'Approved leave request LEAVE-0042 for EMP001',
      ipAddress: '192.168.1.105',
      timestamp: '2025-01-06T08:30:00Z',
    },
    {
      id: '5',
      userId: '1',
      userName: 'Admin User',
      action: 'System Config Updated',
      module: 'System',
      details: 'Updated system email configuration',
      ipAddress: '192.168.1.100',
      timestamp: '2025-01-05T16:20:00Z',
    },
    {
      id: '6',
      userId: '3',
      userName: 'John Doe',
      action: 'Failed Login',
      module: 'Authentication',
      details: 'Failed login attempt - Invalid password',
      ipAddress: '192.168.1.110',
      timestamp: '2025-01-05T15:00:00Z',
    },
    {
      id: '7',
      userId: '2',
      userName: 'Jane Smith',
      action: 'Payroll Processed',
      module: 'Payroll',
      details: 'Processed payroll for December 2024 - 150 employees',
      ipAddress: '192.168.1.105',
      timestamp: '2025-01-05T14:00:00Z',
    },
  ];

  // Mock security settings
  const securitySettings = {
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumber: true,
      requireSpecial: true,
      passwordExpiry: 90,
    },
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    lockoutDuration: 15,
    twoFactorEnabled: true,
    ipWhitelist: ['192.168.1.0/24'],
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.module.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === 'all' || log.action.toLowerCase() === actionFilter;
    const matchesModule = moduleFilter === 'all' || log.module.toLowerCase() === moduleFilter;
    return matchesSearch && matchesAction && matchesModule;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Admin Portal - Security</span>
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
          <h1 className="text-3xl font-bold mb-2">Security & Audit Logs</h1>
          <p className="text-muted-foreground">Monitor system activity and configure security settings</p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">142</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Failed Logins (24h)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">23</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">API Calls Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                12,458
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Security Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">A+</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="audit-logs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="audit-logs">
              <Shield className="mr-2 h-4 w-4" />
              Audit Logs
            </TabsTrigger>
            <TabsTrigger value="security-settings">
              <Settings className="mr-2 h-4 w-4" />
              Security Settings
            </TabsTrigger>
            <TabsTrigger value="activity-monitoring">
              <Eye className="mr-2 h-4 w-4" />
              Activity Monitoring
            </TabsTrigger>
          </TabsList>

          {/* Audit Logs Tab */}
          <TabsContent value="audit-logs">
            <Card>
              <CardHeader>
                <CardTitle>Audit Logs</CardTitle>
                <CardDescription>Complete system activity trail</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <Input
                      type="date"
                      placeholder="Filter by date"
                      value={dateFilter}
                      onChange={(e) => setDateFilter(e.target.value)}
                    />
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={actionFilter}
                      onChange={(e) => setActionFilter(e.target.value)}
                    >
                      <option value="all">All Actions</option>
                      <option value="login">Login</option>
                      <option value="role update">Role Update</option>
                      <option value="api key generated">API Key Generated</option>
                      <option value="leave approved">Leave Approved</option>
                      <option value="payroll processed">Payroll Processed</option>
                    </select>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={moduleFilter}
                      onChange={(e) => setModuleFilter(e.target.value)}
                    >
                      <option value="all">All Modules</option>
                      <option value="authentication">Authentication</option>
                      <option value="users">Users</option>
                      <option value="integrations">Integrations</option>
                      <option value="leave management">Leave Management</option>
                      <option value="payroll">Payroll</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium text-sm">Timestamp</th>
                        <th className="text-left p-3 font-medium text-sm">User</th>
                        <th className="text-left p-3 font-medium text-sm">Action</th>
                        <th className="text-left p-3 font-medium text-sm">Module</th>
                        <th className="text-left p-3 font-medium text-sm">Details</th>
                        <th className="text-left p-3 font-medium text-sm">IP Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLogs.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center py-8 text-muted-foreground">
                            No logs found matching criteria
                          </td>
                        </tr>
                      ) : (
                        filteredLogs.map((log) => (
                          <tr key={log.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                            <td className="p-3 text-sm">
                              {new Date(log.timestamp).toLocaleString()}
                            </td>
                            <td className="p-3 text-sm font-medium">{log.userName}</td>
                            <td className="p-3 text-sm">
                              <Badge variant="outline">{log.action}</Badge>
                            </td>
                            <td className="p-3 text-sm">{log.module}</td>
                            <td className="p-3 text-sm max-w-xs truncate">{log.details}</td>
                            <td className="p-3 text-sm text-muted-foreground">{log.ipAddress}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings Tab */}
          <TabsContent value="security-settings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Key className="h-5 w-5" />
                    Password Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium">Minimum Length</label>
                      <span className="text-sm">{securitySettings.passwordPolicy.minLength} characters</span>
                    </div>
                    <input
                      type="range"
                      min="6"
                      max="16"
                      defaultValue={securitySettings.passwordPolicy.minLength}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center justify-between text-sm">
                      <span>Require Uppercase</span>
                      <input type="checkbox" defaultChecked={securitySettings.passwordPolicy.requireUppercase} />
                    </label>
                    <label className="flex items-center justify-between text-sm">
                      <span>Require Lowercase</span>
                      <input type="checkbox" defaultChecked={securitySettings.passwordPolicy.requireLowercase} />
                    </label>
                    <label className="flex items-center justify-between text-sm">
                      <span>Require Numbers</span>
                      <input type="checkbox" defaultChecked={securitySettings.passwordPolicy.requireNumber} />
                    </label>
                    <label className="flex items-center justify-between text-sm">
                      <span>Require Special Characters</span>
                      <input type="checkbox" defaultChecked={securitySettings.passwordPolicy.requireSpecial} />
                    </label>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-2">Password Expiry (Days)</label>
                    <Input type="number" defaultValue={securitySettings.passwordPolicy.passwordExpiry} />
                  </div>

                  <Button className="w-full">Save Password Policy</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5" />
                    Session Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2">Session Timeout (Minutes)</label>
                    <Input type="number" defaultValue={securitySettings.sessionTimeout} />
                    <p className="text-xs text-muted-foreground mt-1">Users will be logged out after inactivity</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2">Max Login Attempts</label>
                      <Input type="number" defaultValue={securitySettings.maxLoginAttempts} />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2">Lockout Duration (Minutes)</label>
                      <Input type="number" defaultValue={securitySettings.lockoutDuration} />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted-foreground">Require 2FA for all admin logins</p>
                    </div>
                    <input type="checkbox" defaultChecked={securitySettings.twoFactorEnabled} />
                  </div>

                  <Button className="w-full">Save Session Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Activity Monitoring Tab */}
          <TabsContent value="activity-monitoring">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <Eye className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                  <h3 className="font-semibold text-lg mb-2">Real-Time Monitoring</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Monitor user activity in real-time
                  </p>
                  <Button variant="outline" className="w-full">
                    View Activity
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                  <h3 className="font-semibold text-lg mb-2">Anomaly Alerts</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get alerted for suspicious activities
                  </p>
                  <Button variant="outline" className="w-full">
                    Configure Alerts
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <Shield className="h-12 w-12 mx-auto mb-4 text-green-600" />
                  <h3 className="font-semibold text-lg mb-2">Security Reports</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Generate detailed security reports
                  </p>
                  <Button variant="outline" className="w-full">
                    Generate Report
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Security Overview</CardTitle>
                <CardDescription>Current security posture and alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                      <span className="font-semibold">All Systems Secure</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      No security threats detected in the last 24 hours
                    </p>
                  </div>

                  <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                      <span className="font-semibold">2 Warnings</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      2 employees with multiple failed login attempts
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold">5 API Keys Active</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      3 keys expiring within 30 days
                    </p>
                  </div>

                  <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Eye className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold">142 Active Sessions</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      23 sessions idle for more than 1 hour
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
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
