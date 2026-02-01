'use client';

import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, CheckCircle2, XCircle, Clock, Search, Filter, Download, AlertTriangle, Alert } from 'lucide-react';
import { Alert } from '@/components/ui/alert';

export default function HRAttendance() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('today');

  // Mock attendance data
  const attendanceData = [
    {
      id: '1',
      employeeName: 'John Doe',
      employeeId: 'EMP001',
      department: 'Engineering',
      date: '2025-01-06',
      checkInTime: '09:00',
      checkOutTime: '18:00',
      status: 'present',
      workingHours: 9,
    },
    {
      id: '2',
      employeeName: 'Jane Smith',
      employeeId: 'EMP002',
      department: 'HR',
      date: '2025-01-06',
      checkInTime: '09:15',
      checkOutTime: '18:30',
      status: 'late',
      workingHours: 9.25,
    },
    {
      id: '3',
      employeeName: 'Mike Johnson',
      employeeId: 'EMP004',
      department: 'Engineering',
      date: '2025-01-06',
      checkInTime: undefined,
      checkOutTime: undefined,
      status: 'absent',
      workingHours: 0,
    },
    {
      id: '4',
      employeeName: 'Sarah Williams',
      employeeId: 'EMP005',
      department: 'HR',
      date: '2025-01-06',
      checkInTime: undefined,
      checkOutTime: undefined,
      status: 'on-leave',
      workingHours: 0,
    },
  ];

  const filteredData = attendanceData.filter(record => {
    const matchesSearch = record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'present': 'default',
      'late': 'secondary',
      'absent': 'destructive',
      'on-leave': 'outline',
    };
    const icons: Record<string, any> = {
      'present': CheckCircle2,
      'late': Clock,
      'absent': XCircle,
      'on-leave': Calendar,
    };
    const Icon = icons[status] || CheckCircle2;
    return (
      <Badge variant={variants[status] || 'outline'}>
        <Icon className="h-3 w-3 mr-1" />
        {status.replace('-', ' ').toUpperCase()}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HR Portal - Attendance</span>
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
          <h1 className="text-3xl font-bold mb-2">Attendance Management</h1>
          <p className="text-muted-foreground">Monitor and manage employee attendance</p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Present Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {attendanceData.filter(r => r.status === 'present').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Late Arrivals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {attendanceData.filter(r => r.status === 'late').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Absent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {attendanceData.filter(r => r.status === 'absent').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">On Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {attendanceData.filter(r => r.status === 'on-leave').length}
              </div>
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

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="on-leave">On Leave</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Table */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>Today's attendance summary for all employees</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-3 font-medium text-sm">Employee</th>
                    <th className="text-left p-3 font-medium text-sm">Employee ID</th>
                    <th className="text-left p-3 font-medium text-sm">Department</th>
                    <th className="text-left p-3 font-medium text-sm">Check-In</th>
                    <th className="text-left p-3 font-medium text-sm">Check-Out</th>
                    <th className="text-left p-3 font-medium text-sm">Status</th>
                    <th className="text-left p-3 font-medium text-sm">Working Hours</th>
                    <th className="text-left p-3 font-medium text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-8 text-muted-foreground">
                        No attendance records found
                      </td>
                    </tr>
                  ) : (
                    filteredData.map((record) => (
                      <tr key={record.id} className="border-b hover:bg-slate-50 dark:hover:bg-slate-800">
                        <td className="p-3">
                          <div className="font-medium">{record.employeeName}</div>
                        </td>
                        <td className="p-3 text-sm text-muted-foreground">
                          {record.employeeId}
                        </td>
                        <td className="p-3 text-sm">
                          {record.department}
                        </td>
                        <td className="p-3 text-sm">
                          {record.checkInTime || '--:--'}
                        </td>
                        <td className="p-3 text-sm">
                          {record.checkOutTime || '--:--'}
                        </td>
                        <td className="p-3">
                          {getStatusBadge(record.status)}
                        </td>
                        <td className="p-3 font-medium">
                          {record.workingHours}h
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Alerts Section */}
        {attendanceData.some(r => r.status === 'absent' || r.status === 'late') && (
          <Card className="mt-6 border-orange-200 dark:border-orange-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="h-5 w-5" />
                Attention Required
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendanceData.filter(r => r.status === 'absent').length > 0 && (
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <span className="ml-2">
                      {attendanceData.filter(r => r.status === 'absent').length} employee(s) are absent without leave approval
                    </span>
                  </Alert>
                )}
                {attendanceData.filter(r => r.status === 'late').length > 0 && (
                  <Alert>
                    <Clock className="h-4 w-4" />
                    <span className="ml-2">
                      {attendanceData.filter(r => r.status === 'late').length} employee(s) arrived late today
                    </span>
                  </Alert>
                )}
              </div>
            </CardContent>
          </Card>
        )}
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
