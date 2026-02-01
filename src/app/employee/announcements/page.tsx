'use client';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Bell, Search, Filter, Calendar, AlertTriangle, CheckCircle2, Star } from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Bell },
  { name: 'Attendance', href: '/employee/attendance', icon: Calendar },
  { name: 'Leave', href: '/employee/leave', icon: Bell },
  { name: 'Payroll', href: '/employee/payroll', icon: Star },
  { name: 'Performance', href: '/employee/performance', icon: CheckCircle2 },
  { name: 'Profile', href: '/employee/profile', icon: Bell },
];

export default function EmployeeAnnouncements() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');

  // Mock announcements data
  const announcements = [
    {
      id: '1',
      title: 'Annual Performance Review Cycle',
      content: 'The annual performance review cycle will start from February 1st, 2025. Please complete your self-assessments by January 31st. Your manager will schedule review meetings soon.',
      priority: 'high',
      category: 'policy',
      type: 'event',
      attachments: ['Performance_Review_Guide_2025.pdf'],
      createdBy: 'HR Team',
      createdAt: '2025-01-05T10:00:00Z',
      expiryDate: '2025-02-01T00:00:00Z',
      views: 1420,
      read: false,
    },
    {
      id: '2',
      title: 'New Health Insurance Benefits',
      content: 'We are excited to announce enhanced health insurance benefits starting from March 2025. The new plan includes expanded coverage, higher limits, and more network hospitals. Check your portal for detailed coverage information.',
      priority: 'high',
      category: 'general',
      type: 'event',
      attachments: ['Health_Insurance_Benefits_2025.pdf', 'Network_Hospitals_List.pdf'],
      createdBy: 'Jane Smith',
      createdAt: '2025-01-04T14:00:00Z',
      expiryDate: '2025-03-01T00:00:00Z',
      views: 1235,
      read: true,
    },
    {
      id: '3',
      title: 'Q4 All Hands Meeting',
      content: 'Join us for the Q4 all hands meeting on January 20th at 2:00 PM. The meeting will be held in the Main Conference Room and will also be available via Zoom. We\'ll be discussing Q4 achievements, Q1 goals, and company updates.',
      priority: 'medium',
      category: 'event',
      type: 'event',
      attachments: ['All_Hands_Agenda_Q4.pdf', 'Zoom_Meeting_Link.txt'],
      createdBy: 'Admin User',
      createdAt: '2025-01-03T09:00:00Z',
      expiryDate: '2025-01-20T14:00:00Z',
      views: 987,
      read: false,
    },
    {
      id: '4',
      title: 'Updated Holiday Calendar for 2025',
      content: 'The holiday calendar for 2025 has been updated with additional state holidays. Please review the new dates and plan your leave accordingly. The updated calendar is now available in the Leave section.',
      priority: 'medium',
      category: 'policy',
      type: 'general',
      attachments: ['Holiday_Calendar_2025.pdf'],
      createdBy: 'HR Team',
      createdAt: '2025-01-02T11:00:00Z',
      expiryDate: '2025-12-31T00:00:00Z',
      views: 1156,
      read: true,
    },
    {
      id: '5',
      title: 'New Employee Recognition Program',
      content: 'We\'re launching a new employee recognition program! Starting this month, you can nominate colleagues for their outstanding work. Monthly winners will receive special recognition and rewards. Let\'s celebrate excellence together!',
      priority: 'low',
      category: 'achievement',
      type: 'general',
      attachments: ['Recognition_Program_Guide.pdf'],
      createdBy: 'HR Team',
      createdAt: '2025-01-01T08:00:00Z',
      expiryDate: '2025-02-01T00:00:00Z',
      views: 1345,
      read: false,
    },
    {
      id: '6',
      title: 'Office Closure - New Year',
      content: 'Please note that the office will be closed from December 31st, 2024 to January 2nd, 2025 for the New Year holidays. Normal operations will resume on January 3rd, 2025.',
      priority: 'high',
      category: 'event',
      type: 'event',
      attachments: [],
      createdBy: 'Admin User',
      createdAt: '2024-12-28T15:00:00Z',
      expiryDate: '2025-01-02T00:00:00Z',
      views: 1523,
      read: true,
    },
  ];

  const getPriorityBadge = (priority: string) => {
    const variants: Record<string, any> = {
      'low': 'secondary',
      'medium': 'default',
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
    const matchesPriority = priorityFilter === 'all' || ann.priority === priorityFilter;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  return (
    <DashboardLayout
      title="Announcements"
      navigation={navigation}
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex gap-4">
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
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="policy">Policy</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="achievement">Achievement</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Pinned/Important Announcements */}
        {announcements.filter(a => a.priority === 'high' || a.priority === 'urgent').length > 0 && (
          <Card className="border-orange-200 dark:border-orange-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Important Announcements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {announcements.filter(a => a.priority === 'high' || a.priority === 'urgent').slice(0, 2).map((ann) => (
                  <div key={ann.id} className={`p-4 border rounded-lg ${ann.read ? 'bg-slate-50 dark:bg-slate-800' : 'bg-white dark:bg-slate-950'}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{ann.title}</h4>
                          <Badge variant={getPriorityBadge(ann.priority)}>
                            {ann.priority.toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Posted by {ann.createdBy} • {new Date(ann.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline">
                        {getCategoryLabel(ann.category)}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{ann.content}</p>
                    {ann.attachments && ann.attachments.length > 0 && (
                      <div className="flex gap-2">
                        {ann.attachments.map((file, idx) => (
                          <Button key={idx} variant="outline" size="sm">
                            <Star className="h-3 w-3 mr-1" />
                            {file}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* All Announcements */}
        <Card>
          <CardHeader>
            <CardTitle>All Announcements</CardTitle>
            <CardDescription>Stay updated with company news and events</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredAnnouncements.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No announcements found matching your criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAnnouncements.map((ann) => (
                  <div key={ann.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg">{ann.title}</h4>
                          <Badge variant={getPriorityBadge(ann.priority)}>
                            {ann.priority.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">
                            {getCategoryLabel(ann.category)}
                          </Badge>
                          {!ann.read && (
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                              NEW
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          By {ann.createdBy} • {new Date(ann.createdAt).toLocaleDateString()} • 
                          {ann.views} views
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>

                    <p className="text-sm mb-3">{ann.content}</p>

                    {ann.attachments && ann.attachments.length > 0 && (
                      <div className="flex gap-2 mb-3">
                        <span className="text-sm text-muted-foreground">Attachments:</span>
                        {ann.attachments.map((file, idx) => (
                          <Button key={idx} variant="outline" size="sm">
                            <Star className="h-3 w-3 mr-1" />
                            {file}
                          </Button>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                      <span>Expires: {new Date(ann.expiryDate).toLocaleDateString()}</span>
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Calendar className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Holiday Calendar</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                View all holidays for 2025
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <Bell className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Company Policies</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Access all company policies and documents
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="h-8 w-8 text-primary" />
                <h3 className="font-semibold">Help Center</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Get help with HR-related questions
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
