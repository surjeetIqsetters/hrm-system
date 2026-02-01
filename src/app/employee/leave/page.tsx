'use client';

import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Plus, Clock, CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { fetchLeaveBalances, fetchLeaveRequests, applyLeave } from '@/redux/slices/leaveSlice';
import { format } from 'date-fns';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Calendar },
  { name: 'Attendance', href: '/employee/attendance', icon: Clock },
  { name: 'Leave', href: '/employee/leave', icon: Calendar },
  { name: 'Payroll', href: '/employee/payroll', icon: Clock },
  { name: 'Performance', href: '/employee/performance', icon: CheckCircle2 },
  { name: 'Profile', href: '/employee/profile', icon: XCircle },
];

export default function EmployeeLeave() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const leave = useAppSelector(state => state.leave);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: '',
  });

  useEffect(() => {
    if (auth.user) {
      dispatch(fetchLeaveBalances(auth.user.employeeId));
      dispatch(fetchLeaveRequests(auth.user.employeeId));
    }
  }, [auth.user, dispatch]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth.user) return;

    setIsLoading(true);
    try {
      await dispatch(applyLeave({
        employeeId: auth.user.employeeId,
        employeeName: `${auth.user.firstName} ${auth.user.lastName}`,
        leaveType: formData.leaveType as any,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
      }));
      setDialogOpen(false);
      setFormData({ leaveType: '', startDate: '', endDate: '', reason: '' });
    } finally {
      setIsLoading(false);
    }
  };

  const getLeaveTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'casual': 'Casual Leave',
      'sick': 'Sick Leave',
      'earned': 'Earned Leave',
      'maternity': 'Maternity Leave',
      'paternity': 'Paternity Leave',
      'compensatory': 'Compensatory Leave',
      'without-pay': 'Without Pay',
    };
    return labels[type] || type;
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'pending': 'secondary',
      'approved': 'default',
      'rejected': 'destructive',
      'cancelled': 'outline',
    };
    return variants[status] || 'outline';
  };

  return (
    <DashboardLayout
      title="Leave Management"
      navigation={navigation}
    >
      <div className="space-y-6">
        {/* Leave Balances */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
          {leave.balances.map((balance) => (
            <Card key={balance.leaveType}>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">{getLeaveTypeLabel(balance.leaveType)}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">
                  {balance.balance}
                </div>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <div>Total: {balance.total} days</div>
                  <div>Used: {balance.used} days</div>
                  {balance.pending > 0 && (
                    <div className="text-orange-600">Pending: {balance.pending} days</div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Apply for Leave
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply for Leave</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Leave Type</Label>
                  <Select value={formData.leaveType} onValueChange={(value) => setFormData({ ...formData, leaveType: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select leave type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual Leave</SelectItem>
                      <SelectItem value="sick">Sick Leave</SelectItem>
                      <SelectItem value="earned">Earned Leave</SelectItem>
                      <SelectItem value="maternity">Maternity Leave</SelectItem>
                      <SelectItem value="paternity">Paternity Leave</SelectItem>
                      <SelectItem value="compensatory">Compensatory Leave</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Reason</Label>
                  <Textarea
                    placeholder="Enter reason for leave"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Request'
                    )}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Calendar className="mr-2 h-4 w-4" />
            View Holidays
          </Button>
        </div>

        {/* Leave History */}
        <Card>
          <CardHeader>
            <CardTitle>Leave History</CardTitle>
            <CardDescription>Your recent leave requests</CardDescription>
          </CardHeader>
          <CardContent>
            {leave.requests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No leave requests found
              </div>
            ) : (
              <div className="space-y-4">
                {leave.requests.map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="font-medium">{getLeaveTypeLabel(request.leaveType)}</div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(request.startDate), 'MMM dd, yyyy')} - {format(new Date(request.endDate), 'MMM dd, yyyy')}
                      </div>
                      <div className="text-sm text-muted-foreground">{request.days} day(s)</div>
                    </div>
                    <div className="text-right">
                      <Badge variant={getStatusBadge(request.status)}>
                        {request.status.toUpperCase()}
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {format(new Date(request.appliedAt), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
