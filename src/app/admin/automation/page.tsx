'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Workflow, Settings, Bell, Plus, Search, Edit, Trash2, ArrowRight, Play, Pause } from 'lucide-react';

export default function AdminAutomation() {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock workflows
  const workflows = [
    {
      id: '1',
      name: 'Leave Approval Workflow',
      trigger: 'Leave Request Submitted',
      steps: [
        { name: 'Manager Review', type: 'approval', role: 'HR Manager' },
        { name: 'Notification', type: 'notification', recipient: 'Employee' },
        { name: 'Calendar Update', type: 'system', action: 'Update Leave Balance' },
      ],
      status: 'active',
      lastRun: '2025-01-06T09:30:00Z',
      totalExecutions: 156,
    },
    {
      id: '2',
      name: 'New Employee Onboarding',
      trigger: 'Employee Created',
      steps: [
        { name: 'Send Welcome Email', type: 'notification', recipient: 'Employee' },
        { name: 'Create IT Account', type: 'system', action: 'Provision Account' },
        { name: 'Assign Manager', type: 'assignment', role: 'Reporting Manager' },
        { name: 'Schedule Orientation', type: 'calendar', action: 'Add to Calendar' },
      ],
      status: 'active',
      lastRun: '2025-01-05T14:20:00Z',
      totalExecutions: 8,
    },
    {
      id: '3',
      name: 'Attendance Anomaly Alert',
      trigger: 'Attendance Pattern Detected',
      steps: [
        { name: 'Send Alert', type: 'notification', recipient: 'HR Manager' },
        { name: 'Create Ticket', type: 'ticket', category: 'HR' },
      ],
      status: 'active',
      lastRun: '2025-01-04T11:45:00Z',
      totalExecutions: 3,
    },
  ];

  // Mock approval rules
  const approvalRules = [
    {
      id: '1',
      name: 'Leave Approval Matrix',
      description: 'Define approvers based on leave type and duration',
      rules: [
        '1-3 days: Direct Manager',
        '4-7 days: Manager + HR Manager',
        '8+ days: Manager + HR Director',
      ],
      status: 'active',
    },
    {
      id: '2',
      name: 'Attendance Regularization Rules',
      description: 'Rules for attendance regularization approvals',
      rules: [
        'Late arrivals (>30 min): Requires Manager Approval',
        'Early departures (>30 min): Requires Manager Approval',
        'Multiple late in month: Auto-alert HR',
      ],
      status: 'active',
    },
  ];

  // Mock notification templates
  const notificationTemplates = [
    {
      id: '1',
      name: 'Leave Approval Email',
      type: 'email',
      event: 'Leave Approved',
      isActive: true,
      lastModified: '2025-01-03',
    },
    {
      id: '2',
      name: 'Leave Rejection SMS',
      type: 'sms',
      event: 'Leave Rejected',
      isActive: true,
      lastModified: '2025-01-03',
    },
    {
      id: '3',
      name: 'Payroll Generated Notification',
      type: 'push',
      event: 'Payroll Processed',
      isActive: true,
      lastModified: '2024-12-30',
    },
    {
      id: '4',
      name: 'Onboarding Welcome Email',
      type: 'email',
      event: 'Employee Onboarded',
      isActive: false,
      lastModified: '2024-12-15',
    },
  ];

  const getStepTypeBadge = (type: string) => {
    const variants: Record<string, any> = {
      'approval': 'default',
      'notification': 'secondary',
      'system': 'outline',
      'assignment': 'default',
      'calendar': 'secondary',
      'ticket': 'outline',
    };
    return variants[type] || 'outline';
  };

  const filteredWorkflows = workflows.filter(wf =>
    wf.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    wf.trigger.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Workflow className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Admin Portal - Automation</span>
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
          <h1 className="text-3xl font-bold mb-2">Workflow Automation</h1>
          <p className="text-muted-foreground">Configure automated workflows, approval rules, and notifications</p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {workflows.filter(w => w.status === 'active').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Executions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {workflows.reduce((acc, w) => acc + w.totalExecutions, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Notification Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {notificationTemplates.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Approval Rules</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {approvalRules.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="workflows" className="space-y-6">
          <TabsList>
            <TabsTrigger value="workflows">
              <Workflow className="mr-2 h-4 w-4" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="approvals">
              <Settings className="mr-2 h-4 w-4" />
              Approval Rules
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notification Templates
            </TabsTrigger>
          </TabsList>

          {/* Workflows Tab */}
          <TabsContent value="workflows">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Automated Workflows</CardTitle>
                    <CardDescription>Create and manage process automation</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Workflow
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search workflows..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredWorkflows.map((workflow) => (
                    <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{workflow.name}</h4>
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                {workflow.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Trigger: <span className="font-medium">{workflow.trigger}</span>
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            {workflow.status === 'active' ? (
                              <Button variant="outline" size="sm">
                                <Pause className="h-4 w-4" />
                              </Button>
                            ) : (
                              <Button variant="outline" size="sm">
                                <Play className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <p className="text-sm font-medium">Workflow Steps ({workflow.steps.length})</p>
                          <div className="space-y-2">
                            {workflow.steps.map((step, idx) => (
                              <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full text-sm font-bold">
                                  {idx + 1}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-sm">{step.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    {step.type} • {step.role && `Role: ${step.role}`}
                                  </p>
                                </div>
                                <Badge variant={getStepTypeBadge(step.type)}>
                                  {step.type}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-xs text-muted-foreground">
                            Total Executions: {workflow.totalExecutions} • Last Run: {new Date(workflow.lastRun).toLocaleString()}
                          </div>
                          <Button variant="outline" size="sm">
                            View Logs
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Approval Rules Tab */}
          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Approval Rules</CardTitle>
                    <CardDescription>Configure approval matrices and routing</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Rule
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {approvalRules.map((rule) => (
                    <Card key={rule.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{rule.name}</h4>
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                {rule.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{rule.description}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-2">Rules Configuration</p>
                          <div className="space-y-1">
                            {rule.rules.map((ruleItem, idx) => (
                              <div key={idx} className="text-sm p-2 bg-slate-50 dark:bg-slate-800 rounded">
                                {ruleItem}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Templates Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Notification Templates</CardTitle>
                    <CardDescription>Manage email, SMS, and push notification templates</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notificationTemplates.map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{template.name}</h4>
                              <Badge variant={template.type === 'email' ? 'default' : template.type === 'sms' ? 'secondary' : 'outline'}>
                                {template.type.toUpperCase()}
                              </Badge>
                              {template.isActive ? (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                  ACTIVE
                                </Badge>
                              ) : (
                                <Badge variant="outline">INACTIVE</Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Event: <span className="font-medium">{template.event}</span>
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Last Modified: {new Date(template.lastModified).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              {template.isActive ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
