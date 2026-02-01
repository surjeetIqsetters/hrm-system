'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, BookOpen, MessageSquare, Plus, TrendingUp, Award } from 'lucide-react';
import { fetchGoals, fetchTrainings } from '@/redux/slices/performanceSlice';
import { format } from 'date-fns';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Target },
  { name: 'Attendance', href: '/employee/attendance', icon: TrendingUp },
  { name: 'Leave', href: '/employee/leave', icon: BookOpen },
  { name: 'Payroll', href: '/employee/payroll', icon: TrendingUp },
  { name: 'Performance', href: '/employee/performance', icon: Target },
  { name: 'Profile', href: '/employee/profile', icon: MessageSquare },
];

export default function EmployeePerformance() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const performance = useAppSelector(state => state.performance);

  useEffect(() => {
    if (auth.user) {
      dispatch(fetchGoals(auth.user.employeeId));
      dispatch(fetchTrainings(auth.user.employeeId));
    }
  }, [auth.user, dispatch]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'not-started': 'secondary',
      'in-progress': 'default',
      'completed': 'outline',
      'on-hold': 'destructive',
    };
    return variants[status] || 'outline';
  };

  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <DashboardLayout
      title="Performance & Growth"
      navigation={navigation}
    >
      <div className="space-y-6">
        {/* Performance Summary */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {performance.goals.filter(g => g.status === 'in-progress').length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {performance.goals.length} total goals
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Completed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {performance.goals.filter(g => g.status === 'completed').length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Goals achieved
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Trainings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {performance.trainings.length}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Enrolled courses
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>My Goals</CardTitle>
                <CardDescription>Track your performance goals and progress</CardDescription>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Goal
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {performance.goals.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No goals set yet. Create your first goal to start tracking!
              </div>
            ) : (
              <div className="space-y-4">
                {performance.goals.map((goal) => (
                  <div key={goal.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{goal.title}</h4>
                          <Badge variant={getStatusBadge(goal.status)}>
                            {goal.status.replace('-', ' ').toUpperCase()}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{goal.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Target className="h-3 w-3" />
                            {goal.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            {goal.weightage}% weightage
                          </span>
                          <span>Due: {format(new Date(goal.dueDate), 'MMM dd, yyyy')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trainings Section */}
        <Card>
          <CardHeader>
            <CardTitle>Learning & Training</CardTitle>
            <CardDescription>Enhance your skills with training programs</CardDescription>
          </CardHeader>
          <CardContent>
            {performance.trainings.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No trainings enrolled yet. Browse available courses to start learning!
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {performance.trainings.map((training) => (
                  <div key={training.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{training.title}</h4>
                        <p className="text-sm text-muted-foreground">{training.description}</p>
                      </div>
                      <Badge variant={getStatusBadge(training.status)}>
                        {training.status.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{training.progress}%</span>
                      </div>
                      <Progress value={training.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {training.duration} hours
                      </span>
                      <span className="capitalize">{training.mode}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Self Review & Feedback */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Self Review
              </CardTitle>
              <CardDescription>Submit your self-assessment</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                Start Self Review
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Manager Feedback
              </CardTitle>
              <CardDescription>View feedback from your manager</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                View Feedback
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
