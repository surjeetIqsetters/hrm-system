'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, CheckCircle2, XCircle, Clock, Search, Filter, Download, AlertTriangle, Check, Settings } from 'lucide-react';
import { fetchPendingApprovals, approveLeave, rejectLeave } from '@/redux/slices/leaveSlice';

export default function HRLeave() {
  const dispatch = useAppDispatch();
  const leave = useAppSelector(state => state.leave);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [rejectDialog, setRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    dispatch(fetchPendingApprovals());
  }, [dispatch]);

  const pendingRequests = [
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'John Doe',
      department: 'Engineering',
      leaveType: 'casual',
      startDate: '2025-01-20',
      endDate: '2025-01-22',
      days: 3,
      reason: 'Family vacation',
      status: 'pending',
      appliedAt: '2025-01-06T10:00:00Z',
    },
    {
      id: '2',
      employeeId: 'EMP004',
      employeeName: 'Mike Johnson',
      department: 'Engineering',
      leaveType: 'sick',
      startDate: '2025-01-10',
      endDate: '2025-01-10',
      days: 1,
      reason: 'Medical appointment',
      status: 'pending',
      appliedAt: '2025-01-06T11:00:00Z',
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'Admin User',
      department: 'IT',
      leaveType: 'earned',
      startDate: '2025-01-15',
      endDate: '2025-01-17',
      days: 3,
      reason: 'Personal work',
      status: 'pending',
      appliedAt: '2025-01-06T09:00:00Z',
    },
  ];

  const filteredRequests = pendingRequests.filter(request => {
    const matchesSearch = request.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getLeaveTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'casual': 'Casual Leave',
      'sick': 'Sick Leave',
      'earned': 'Earned Leave',
      'maternity': 'Maternity Leave',
      'paternity': 'Paternity Leave',
      'compensatory': 'Compensatory Leave',
    };
    return labels[type] || type;
  };

  const handleApprove = async (requestId: string) => {
    await dispatch(approveLeave({ requestId, comments: 'Approved' }));
  };

  const handleReject = async () => {
    if (selectedRequest && rejectReason) {
      await dispatch(rejectLeave({ requestId: selectedRequest.id, reason: rejectReason }));
      setRejectDialog(false);
      setRejectReason('');
      setSelectedRequest(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HR Portal - Leave Management</span>
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
          <h1 className="text-3xl font-bold mb-2">Leave Management</h1>
          <p className="text-muted-foreground">Review and manage leave requests</p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {pendingRequests.filter(r => r.status === 'pending').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Approved Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">5</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Rejected Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">1</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">On Leave Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or employee ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Requests</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Leave Requests Table */}
        <Card>
          <CardHeader>
            <CardTitle>Leave Requests</CardTitle>
            <CardDescription>Review and action leave requests from employees</CardDescription>
          </CardHeader>
          <CardContent>
            {filteredRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No leave requests found
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div key={request.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg">{request.employeeName}</h4>
                          <Badge variant="outline">{request.department}</Badge>
                          <Badge variant="outline">{request.employeeId}</Badge>
                          {request.status === 'pending' && (
                            <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100">
                              <Clock className="h-3 w-3 mr-1" />
                              PENDING
                            </Badge>
                          )}
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Leave Type</p>
                            <p className="font-medium">{getLeaveTypeLabel(request.leaveType)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Duration</p>
                            <p className="font-medium">{request.days} day(s)</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Date Range</p>
                            <p className="font-medium">
                              {new Date(request.startDate).toLocaleDateString()} - {new Date(request.endDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Applied On</p>
                            <p className="font-medium text-sm">
                              {new Date(request.appliedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Reason</p>
                          <p className="text-sm">{request.reason}</p>
                        </div>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            onClick={() => handleApprove(request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="mr-1 h-4 w-4" />
                            Approve
                          </Button>
                          <Dialog open={rejectDialog} onOpenChange={setRejectDialog}>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setSelectedRequest(request)}
                              >
                                <XCircle className="mr-1 h-4 w-4" />
                                Reject
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Reject Leave Request</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <p className="text-sm mb-2">
                                    Rejecting leave for <strong>{selectedRequest?.employeeName}</strong>
                                  </p>
                                  <p className="text-sm mb-2">
                                    <strong>Leave Type:</strong> {selectedRequest ? getLeaveTypeLabel(selectedRequest.leaveType) : ''}
                                  </p>
                                  <p className="text-sm">
                                    <strong>Duration:</strong> {selectedRequest?.days} day(s)
                                  </p>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-sm font-medium">Reason for Rejection</label>
                                  <Textarea
                                    placeholder="Enter reason for rejecting this leave request..."
                                    value={rejectReason}
                                    onChange={(e) => setRejectReason(e.target.value)}
                                    required
                                  />
                                </div>
                                <div className="flex gap-2 justify-end">
                                  <Button
                                    variant="outline"
                                    onClick={() => {
                                      setRejectDialog(false);
                                      setRejectReason('');
                                      setSelectedRequest(null);
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    onClick={handleReject}
                                    disabled={!rejectReason.trim()}
                                  >
                                    Reject Leave
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Leave Policy Management */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Leave Policies</CardTitle>
            <CardDescription>Manage organization leave policies</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Manage Leave Policies
            </Button>
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
