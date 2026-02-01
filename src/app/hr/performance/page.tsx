'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Calendar, Users, Play, Plus, Search, CheckCircle2, Star, TrendingUp, Award } from 'lucide-react';

export default function HRPerformance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock performance cycles
  const performanceCycles = [
    {
      id: '1',
      name: 'Q4 2024 Performance Review',
      period: 'Q4 2024',
      startDate: '2025-01-01',
      endDate: '2025-01-31',
      status: 'in-progress',
      totalEmployees: 150,
      completedReviews: 98,
      selfReviewsSubmitted: 95,
      managerReviewsSubmitted: 65,
    },
    {
      id: '2',
      name: 'Q3 2024 Performance Review',
      period: 'Q3 2024',
      startDate: '2024-10-01',
      endDate: '2024-10-31',
      status: 'completed',
      totalEmployees: 145,
      completedReviews: 145,
      selfReviewsSubmitted: 145,
      managerReviewsSubmitted: 145,
    },
    {
      id: '3',
      name: 'Q2 2024 Performance Review',
      period: 'Q2 2024',
      startDate: '2024-07-01',
      endDate: '2024-07-31',
      status: 'completed',
      totalEmployees: 140,
      completedReviews: 140,
      selfReviewsSubmitted: 140,
      managerReviewsSubmitted: 140,
    },
  ];

  // Mock goals tracking
  const goalsData = [
    {
      department: 'Engineering',
      totalGoals: 45,
      onTrack: 32,
      atRisk: 8,
      behind: 5,
      averageProgress: 72,
    },
    {
      department: 'HR',
      totalGoals: 12,
      onTrack: 9,
      atRisk: 2,
      behind: 1,
      averageProgress: 68,
    },
    {
      department: 'Sales',
      totalGoals: 30,
      onTrack: 20,
      atRisk: 6,
      behind: 4,
      averageProgress: 65,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'in-progress': 'default',
      'completed': 'outline',
      'upcoming': 'secondary',
    };
    return variants[status] || 'outline';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HR Portal - Performance Management</span>
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
          <h1 className="text-3xl font-bold mb-2">Performance Management</h1>
          <p className="text-muted-foreground">Manage performance cycles, goals, and reviews</p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Cycle</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">Q4 2024</div>
              <div className="text-xs text-muted-foreground mt-2">
                In progress • 65% complete
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Reviews Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {150 - 98}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Manager reviews needed
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Goals On Track</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {goalsData.reduce((acc, dept) => acc + dept.onTrack, 0)}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                {goalsData.reduce((acc, dept) => acc + dept.totalGoals, 0)} total goals
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Goals at Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {goalsData.reduce((acc, dept) => acc + dept.atRisk + dept.behind, 0)}
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Needs attention
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="cycles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="cycles">
              <Calendar className="mr-2 h-4 w-4" />
              Performance Cycles
            </TabsTrigger>
            <TabsTrigger value="goals">
              <Target className="mr-2 h-4 w-4" />
              Goals Tracking
            </TabsTrigger>
            <TabsTrigger value="reviews">
              <Star className="mr-2 h-4 w-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="feedback">
              <Users className="mr-2 h-4 w-4" />
              360 Feedback
            </TabsTrigger>
          </TabsList>

          {/* Performance Cycles Tab */}
          <TabsContent value="cycles">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Performance Cycles</CardTitle>
                    <CardDescription>Manage performance review periods</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Cycle
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {performanceCycles.map((cycle) => (
                    <Card key={cycle.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{cycle.name}</h4>
                              <Badge variant={getStatusBadge(cycle.status)}>
                                {cycle.status.replace('-', ' ').toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Period: {cycle.startDate} to {cycle.endDate}
                            </p>
                          </div>
                          {cycle.status === 'in-progress' && (
                            <Button>
                              <Play className="mr-2 h-4 w-4" />
                              View Progress
                            </Button>
                          )}
                        </div>

                        <div className="grid md:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                            <p className="text-2xl font-bold">{cycle.totalEmployees}</p>
                            <p className="text-xs text-muted-foreground">Total Employees</p>
                          </div>
                          <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{cycle.completedReviews}</p>
                            <p className="text-xs text-muted-foreground">Completed</p>
                          </div>
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{cycle.selfReviewsSubmitted}</p>
                            <p className="text-xs text-muted-foreground">Self Reviews</p>
                          </div>
                          <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                            <p className="text-2xl font-bold text-purple-600">{cycle.managerReviewsSubmitted}</p>
                            <p className="text-xs text-muted-foreground">Manager Reviews</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Goals Tracking Tab */}
          <TabsContent value="goals">
            <Card>
              <CardHeader>
                <CardTitle>Goals Tracking by Department</CardTitle>
                <CardDescription>Monitor goal progress across departments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {goalsData.map((dept, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-lg mb-1">{dept.department}</h4>
                            <p className="text-sm text-muted-foreground">
                              {dept.totalGoals} total goals • {dept.averageProgress}% average progress
                            </p>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                            <p className="text-2xl font-bold text-green-600">{dept.onTrack}</p>
                            <p className="text-xs text-muted-foreground">On Track</p>
                          </div>
                          <div className="text-center p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                            <p className="text-2xl font-bold text-orange-600">{dept.atRisk}</p>
                            <p className="text-xs text-muted-foreground">At Risk</p>
                          </div>
                          <div className="text-center p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                            <p className="text-2xl font-bold text-red-600">{dept.behind}</p>
                            <p className="text-xs text-muted-foreground">Behind</p>
                          </div>
                          <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{dept.averageProgress}%</p>
                            <p className="text-xs text-muted-foreground">Avg Progress</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Performance Reviews</CardTitle>
                <CardDescription>View and manage individual performance reviews</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search employee..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Users className="mr-2 h-4 w-4" />
                    Assign Reviews
                  </Button>
                </div>

                <div className="text-center py-8 text-muted-foreground">
                  <Star className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select an employee to view their performance review</p>
                  <Button variant="outline" className="mt-4">
                    Browse All Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 360 Feedback Tab */}
          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>360-Degree Feedback</CardTitle>
                    <CardDescription>Manage 360-degree feedback requests and responses</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Request Feedback
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Active Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-blue-600">24</div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-green-600">156</div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Pending Responses</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold text-orange-600">38</div>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Feedback Requests</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">360 Feedback for John Doe</h4>
                          <Badge>Engineering</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Requested by: Sarah Williams • 3 responses received / 5 requested
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">View Progress</Button>
                          <Button size="sm">Send Reminder</Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">360 Feedback for Mike Johnson</h4>
                          <Badge>Engineering</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Requested by: Sarah Williams • 5 responses received / 5 requested
                        </p>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">View Report</Button>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            COMPLETE
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
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
