'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, MessageSquare, Plus, Search, Filter, Megaphone, ClipboardList, Send } from 'lucide-react';

export default function HREngagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Mock announcements
  const announcements = [
    {
      id: '1',
      title: 'Annual Performance Review Cycle',
      content: 'The annual performance review cycle will start from February 1st, 2025. Please complete your self-assessments by January 31st.',
      priority: 'high',
      category: 'policy',
      targetRoles: ['employee', 'hr'],
      targetDepartments: [],
      createdBy: 'Sarah Williams',
      createdAt: '2025-01-05T10:00:00Z',
      expiryDate: '2025-02-01T00:00:00Z',
      views: 1420,
    },
    {
      id: '2',
      title: 'New Health Insurance Benefits',
      content: 'We are excited to announce enhanced health insurance benefits starting from March 2025. Check your portal for detailed coverage information.',
      priority: 'high',
      category: 'event',
      targetRoles: ['employee', 'hr'],
      targetDepartments: [],
      createdBy: 'Jane Smith',
      createdAt: '2025-01-04T14:00:00Z',
      expiryDate: '2025-03-01T00:00:00Z',
      views: 1235,
    },
    {
      id: '3',
      title: 'Q4 All Hands Meeting',
      content: 'Join us for the Q4 all hands meeting on January 20th at 2:00 PM. Venue: Main Conference Room + Virtual.',
      priority: 'medium',
      category: 'event',
      targetRoles: ['employee', 'hr', 'admin'],
      targetDepartments: [],
      createdBy: 'Admin User',
      createdAt: '2025-01-03T09:00:00Z',
      expiryDate: '2025-01-20T14:00:00Z',
      views: 987,
    },
  ];

  // Mock surveys
  const surveys = [
    {
      id: '1',
      title: 'Employee Satisfaction Survey 2024',
      description: 'Share your feedback about your experience at the company',
      status: 'active',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      responseCount: 87,
      totalEmployees: 150,
      targetAudience: ['employee', 'hr'],
    },
    {
      id: '2',
      title: 'Manager Effectiveness Survey',
      description: 'Evaluate your manager\'s leadership and effectiveness',
      status: 'active',
      startDate: '2025-01-10',
      endDate: '2025-01-25',
      responseCount: 45,
      totalEmployees: 120,
      targetAudience: ['employee'],
    },
    {
      id: '3',
      title: 'Work-Life Balance Check',
      description: 'Quick pulse check on work-life balance and stress levels',
      status: 'active',
      startDate: '2025-01-05',
      endDate: '2025-01-15',
      responseCount: 62,
      totalEmployees: 150,
      targetAudience: ['employee', 'hr', 'admin'],
    },
  ];

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, any> = {
      'low': 'outline',
      'medium': 'secondary',
      'high': 'default',
      'urgent': 'destructive',
    };
    return variants[priority] || 'outline';
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      'general': 'General',
      'policy': 'Policy',
      'event': 'Event',
      'achievement': 'Achievement',
      'other': 'Other',
    };
    return labels[category] || category;
  };

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ann.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || ann.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HR Portal - Engagement</span>
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
          <h1 className="text-3xl font-bold mb-2">Engagement & Communication</h1>
          <p className="text-muted-foreground">Manage announcements, surveys, and company communications</p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {announcements.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Surveys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {surveys.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {surveys.reduce((acc, s) => acc + s.responseCount, 0)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Open Tickets</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">23</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="announcements" className="space-y-6">
          <TabsList>
            <TabsTrigger value="announcements">
              <Megaphone className="mr-2 h-4 w-4" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="surveys">
              <ClipboardList className="mr-2 h-4 w-4" />
              Surveys & Pulse Checks
            </TabsTrigger>
            <TabsTrigger value="helpdesk">
              <MessageSquare className="mr-2 h-4 w-4" />
              Helpdesk & Tickets
            </TabsTrigger>
          </TabsList>

          {/* Announcements Tab */}
          <TabsContent value="announcements">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Company Announcements</CardTitle>
                    <CardDescription>Create and manage company-wide communications</CardDescription>
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Create Announcement
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Announcement</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Title</label>
                          <Input placeholder="Enter announcement title" />
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Content</label>
                          <Textarea
                            placeholder="Enter announcement content"
                            rows={4}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Priority</label>
                            <Select>
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

                          <div className="space-y-2">
                            <label className="text-sm font-medium">Category</label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="general">General</SelectItem>
                                <SelectItem value="policy">Policy</SelectItem>
                                <SelectItem value="event">Event</SelectItem>
                                <SelectItem value="achievement">Achievement</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Target Audience</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Employees</SelectItem>
                              <SelectItem value="employee">Employees Only</SelectItem>
                              <SelectItem value="hr">HR Only</SelectItem>
                              <SelectItem value="admin">Admin Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <label className="text-sm font-medium">Expiry Date</label>
                          <Input type="date" />
                        </div>

                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button>Publish Announcement</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search announcements..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="policy">Policy</SelectItem>
                      <SelectItem value="event">Event</SelectItem>
                      <SelectItem value="achievement">Achievement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {filteredAnnouncements.map((ann) => (
                    <Card key={ann.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{ann.title}</h4>
                              <Badge variant={getPriorityBadge(ann.priority)}>
                                {ann.priority.toUpperCase()}
                              </Badge>
                              <Badge variant="outline">{getCategoryLabel(ann.category)}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{ann.content}</p>
                            <div className="text-xs text-muted-foreground">
                              Created: {new Date(ann.createdAt).toLocaleDateString()} • 
                              Views: {ann.views} • 
                              Expires: {new Date(ann.expiryDate).toLocaleDateString()}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Surveys Tab */}
          <TabsContent value="surveys">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Surveys & Pulse Checks</CardTitle>
                    <CardDescription>Create and manage employee surveys</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Survey
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {surveys.map((survey) => (
                    <Card key={survey.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            ACTIVE
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Ends {new Date(survey.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="text-lg">{survey.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">{survey.description}</p>

                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Responses</p>
                            <p className="text-2xl font-bold">
                              {survey.responseCount}/{survey.totalEmployees}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Completion Rate</p>
                            <p className="text-2xl font-bold text-blue-600">
                              {Math.round((survey.responseCount / survey.totalEmployees) * 100)}%
                            </p>
                          </div>
                        </div>

                        <Button variant="outline" className="w-full">
                          View Results
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Helpdesk Tab */}
          <TabsContent value="helpdesk">
            <Card>
              <CardHeader>
                <CardTitle>Helpdesk & Support Tickets</CardTitle>
                <CardDescription>Manage employee support requests and issues</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="mb-4">23 open tickets requiring attention</p>
                  <div className="flex gap-2 justify-center">
                    <Button>View All Tickets</Button>
                    <Button variant="outline">
                      <Send className="mr-2 h-4 w-4" />
                      Create Ticket
                    </Button>
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
