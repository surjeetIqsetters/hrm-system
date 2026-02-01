'use client';

import { useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Plus, Search, Filter, Clock, CheckCircle2, AlertTriangle, Send, FileText } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: MessageSquare },
  { name: 'Attendance', href: '/employee/attendance', icon: Clock },
  { name: 'Leave', href: '/employee/leave', icon: MessageSquare },
  { name: 'Payroll', href: '/employee/payroll', icon: CheckCircle2 },
  { name: 'Performance', href: '/employee/performance', icon: MessageSquare },
  { name: 'Profile', href: '/employee/profile', icon: MessageSquare },
];

export default function EmployeeHelpdesk() {
  const auth = useAppSelector(state => state.auth);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formData, setFormData] = useState({
    category: '',
    subject: '',
    description: '',
    priority: '',
  });

  // Mock tickets data
  const tickets = [
    {
      id: '1',
      employeeId: auth.user?.employeeId || 'EMP001',
      employeeName: auth.user ? `${auth.user.firstName} ${auth.user.lastName}` : 'John Doe',
      category: 'Payroll',
      subject: 'Incorrect payslip amount',
      description: 'The December payslip shows an incorrect basic salary. Expected $8,000 but shows $7,500. Please correct this.',
      status: 'open',
      priority: 'high',
      assignedTo: 'Jane Smith',
      createdAt: '2025-01-05T10:30:00Z',
      updatedAt: '2025-01-06T09:00:00Z',
      resolution: null,
    },
    {
      id: '2',
      employeeId: auth.user?.employeeId || 'EMP001',
      employeeName: auth.user ? `${auth.user.firstName} ${auth.user.lastName}` : 'John Doe',
      category: 'Leave',
      subject: 'Leave not reflected in balance',
      description: 'Applied for 2 days casual leave on January 2nd. Leave was approved but balance still shows the old count.',
      status: 'in-progress',
      priority: 'medium',
      assignedTo: 'HR Support Team',
      createdAt: '2025-01-04T14:20:00Z',
      updatedAt: '2025-01-05T11:00:00Z',
      resolution: null,
    },
    {
      id: '3',
      employeeId: auth.user?.employeeId || 'EMP001',
      employeeName: auth.user ? `${auth.user.firstName} ${auth.user.lastName}` : 'John Doe',
      category: 'Technical',
      subject: 'Unable to access self-service portal',
      description: 'Getting error "Access Denied" when trying to access attendance module. Please check my access permissions.',
      status: 'resolved',
      priority: 'high',
      assignedTo: 'IT Support',
      createdAt: '2025-01-03T09:15:00Z',
      updatedAt: '2025-01-03T16:00:00Z',
      resolution: 'Permissions corrected. Issue resolved.',
    },
    {
      id: '4',
      employeeId: auth.user?.employeeId || 'EMP001',
      employeeName: auth.user ? `${auth.user.firstName} ${auth.user.lastName}` : 'John Doe',
      category: 'General',
      subject: 'Request for tax declaration form',
      description: 'Need assistance with filling out the new tax declaration form. The previous year\'s form format has changed.',
      status: 'open',
      priority: 'low',
      assignedTo: 'HR Support Team',
      createdAt: '2025-01-02T11:45:00Z',
      updatedAt: null,
      resolution: null,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'open': 'destructive',
      'in-progress': 'default',
      'resolved': 'secondary',
      'closed': 'outline',
    };
    return variants[status] || 'outline';
  };

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, any> = {
      'low': 'secondary',
      'medium': 'default',
      'high': 'default',
      'urgent': 'destructive',
    };
    return variants[priority] || 'outline';
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit ticket logic would go here
    console.log('Submitting ticket:', formData);
    setDialogOpen(false);
    setFormData({ category: '', subject: '', description: '', priority: '' });
  };

  return (
    <DashboardLayout
      title="Helpdesk"
      navigation={navigation}
    >
      <div className="space-y-6">
        {/* Create Ticket */}
        <Card>
          <CardHeader>
            <CardTitle>Raise a Support Ticket</CardTitle>
            <CardDescription>Get help with HR, Payroll, or Technical issues</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Ticket
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Support Ticket</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Payroll">Payroll</SelectItem>
                        <SelectItem value="Leave">Leave</SelectItem>
                        <SelectItem value="Attendance">Attendance</SelectItem>
                        <SelectItem value="Performance">Performance</SelectItem>
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Policy">Policy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject</label>
                    <Input
                      placeholder="Brief description of your issue"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      placeholder="Provide detailed information about your issue"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex gap-2 justify-end">
                    <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      <Send className="mr-2 h-4 w-4" />
                      Submit Ticket
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* My Tickets */}
        <Card>
          <CardHeader>
            <CardTitle>My Tickets</CardTitle>
            <CardDescription>View and track your support requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search tickets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {filteredTickets.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No tickets found matching your criteria</p>
                <Button variant="outline" className="mt-4">
                  Create Your First Ticket
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-lg">{ticket.subject}</h4>
                            <Badge>{ticket.category}</Badge>
                            <Badge variant={getPriorityBadge(ticket.priority)}>
                              {ticket.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Ticket #{ticket.id} • Created {new Date(ticket.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={getStatusBadge(ticket.status)}>
                          {ticket.status.replace('-', ' ').toUpperCase()}
                        </Badge>
                      </div>

                      <p className="text-sm mb-3">{ticket.description}</p>

                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            Updated: {ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleString() : 'Not yet'}
                          </span>
                          {ticket.assignedTo && (
                            <span>Assigned to: {ticket.assignedTo}</span>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>

                      {ticket.resolution && (
                        <div className="mt-3 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                          <div className="flex items-center gap-2 mb-1">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span className="font-medium text-green-800 dark:text-green-100">Resolution</span>
                          </div>
                          <p className="text-sm">{ticket.resolution}</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links & FAQ */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Links</CardTitle>
              <CardDescription>Common resources and help</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Employee Handbook
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Company Policies
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  HR Contact Information
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  IT Support Portal
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>Frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">How do I reset my password?</h4>
                  <p className="text-sm text-muted-foreground">
                    Click on "Forgot Password" on the login page and follow the instructions sent to your email.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">How do I check my attendance?</h4>
                  <p className="text-sm text-muted-foreground">
                    Go to the Attendance section and click "Check In" when you arrive at work.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">When are payslips available?</h4>
                  <p className="text-sm text-muted-foreground">
                    Payslips are typically available by the 25th of each month for the previous month's payroll.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">How do I apply for leave?</h4>
                  <p className="text-sm text-muted-foreground">
                    Navigate to the Leave section and click "Apply for Leave". Select the dates and submit your request.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
