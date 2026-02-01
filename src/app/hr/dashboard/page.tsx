'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, DollarSign, Briefcase, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { fetchHRDashboardStats } from '@/redux/slices/hrSlice';

export default function HRDashboard() {
  const dispatch = useAppDispatch();
  const hr = useAppSelector(state => state.hr);

  useEffect(() => {
    dispatch(fetchHRDashboardStats());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HRM System - HR Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">HR Role</Badge>
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">HR Dashboard</h1>
          <p className="text-muted-foreground">Overview of your organization's human resources</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {hr.dashboardStats?.totalEmployees || 0}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                Active workforce
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {hr.dashboardStats?.presentToday || 0}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <CheckCircle2 className="h-3 w-3 mr-1" />
                Marked attendance
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {hr.dashboardStats?.onLeave || 0}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <Calendar className="h-3 w-3 mr-1" />
                Approved leaves
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {hr.dashboardStats?.pendingApprovals || 0}
              </div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Requires attention
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-blue-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                Employee Management
              </CardTitle>
              <CardDescription>View and manage employee directory</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Employees</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-green-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-500" />
                Leave Approvals
              </CardTitle>
              <CardDescription>Review and approve leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Requests</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-purple-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-purple-500" />
                Payroll Processing
              </CardTitle>
              <CardDescription>Process monthly payroll</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Run Payroll</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-orange-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-orange-500" />
                Hiring & Recruitment
              </CardTitle>
              <CardDescription>Manage job postings and applications</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Openings</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-pink-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-pink-500" />
                Performance Reviews
              </CardTitle>
              <CardDescription>Manage performance cycles</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Cycles</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-cyan-500">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-cyan-500" />
                AI Insights
              </CardTitle>
              <CardDescription>View AI-powered predictions and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">View Insights</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="h-10 w-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">5 new employees onboarded this month</p>
                  <p className="text-sm text-muted-foreground">HR Team • Today</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">12 leave requests pending approval</p>
                  <p className="text-sm text-muted-foreground">Leave Management • Today</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-3 border rounded-lg">
                <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <TrendingDown className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">2 employees at high attrition risk</p>
                  <p className="text-sm text-muted-foreground">AI Insights • Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
