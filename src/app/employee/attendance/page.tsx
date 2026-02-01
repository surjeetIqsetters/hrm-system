'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar, Clock, MapPin, ArrowUpRight, ArrowDownRight, Loader2 } from 'lucide-react';
import { checkIn, checkOut, fetchTodayAttendance } from '@/redux/slices/attendanceSlice';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Calendar },
  { name: 'Attendance', href: '/employee/attendance', icon: Clock },
  { name: 'Leave', href: '/employee/leave', icon: Calendar },
  { name: 'Payroll', href: '/employee/payroll', icon: ArrowUpRight },
  { name: 'Performance', href: '/employee/performance', icon: ArrowDownRight },
  { name: 'Profile', href: '/employee/profile', icon: MapPin },
];

export default function EmployeeAttendance() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const attendance = useAppSelector(state => state.attendance);

  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (auth.user) {
      dispatch(fetchTodayAttendance(auth.user.employeeId));
    }
  }, [auth.user, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCheckIn = async () => {
    if (!auth.user) return;
    setIsLoading(true);
    try {
      await dispatch(checkIn({ employeeId: auth.user.employeeId, location: 'Office' }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!auth.user) return;
    setIsLoading(true);
    try {
      await dispatch(checkOut({ employeeId: auth.user.employeeId, location: 'Office' }));
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (time: string | undefined) => {
    if (!time) return '--:--';
    return time;
  };

  return (
    <DashboardLayout
      title="Attendance"
      navigation={navigation}
    >
      <div className="space-y-6">
        {/* Current Time Card */}
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardHeader>
            <CardTitle className="text-lg">Current Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">
              {currentTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })}
            </div>
            <div className="text-sm opacity-80">
              {currentTime.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </CardContent>
        </Card>

        {/* Check-In/Out Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Check-In / Check-Out</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Check-In Time</span>
                </div>
                <div className="text-3xl font-bold">
                  {formatTime(attendance.todayAttendance?.checkInTime)}
                </div>
                {attendance.todayAttendance?.checkInTime && (
                  <Badge variant="outline">Checked In</Badge>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Check-Out Time</span>
                </div>
                <div className="text-3xl font-bold">
                  {formatTime(attendance.todayAttendance?.checkOutTime)}
                </div>
                {attendance.todayAttendance?.checkOutTime && (
                  <Badge variant="outline">Checked Out</Badge>
                )}
              </div>
            </div>

            <div className="mt-6 flex gap-4">
              {!attendance.todayAttendance?.checkInTime ? (
                <Button
                  onClick={handleCheckIn}
                  disabled={isLoading}
                  className="flex-1"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking In...
                    </>
                  ) : (
                    <>
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Check In
                    </>
                  )}
                </Button>
              ) : !attendance.todayAttendance?.checkOutTime ? (
                <Button
                  onClick={handleCheckOut}
                  disabled={isLoading}
                  variant="destructive"
                  className="flex-1"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Checking Out...
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="mr-2 h-4 w-4" />
                      Check Out
                    </>
                  )}
                </Button>
              ) : (
                <Alert>
                  <AlertDescription>
                    You have already completed your check-out for today. Thank you for your work!
                  </AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Today's Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Status</div>
                <Badge variant={
                  attendance.todayAttendance?.status === 'present'
                    ? 'default'
                    : attendance.todayAttendance?.status === 'late'
                    ? 'secondary'
                    : 'destructive'
                }>
                  {attendance.todayAttendance?.status?.toUpperCase() || 'NOT STARTED'}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Working Hours</div>
                <div className="text-xl font-semibold">
                  {attendance.todayAttendance?.workingHours || 0}h
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Shift</div>
                <div className="text-xl font-semibold">
                  {attendance.todayAttendance?.shiftStart || '09:00'} - {attendance.todayAttendance?.shiftEnd || '18:00'}
                </div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Overtime</div>
                <div className="text-xl font-semibold">
                  {attendance.todayAttendance?.overtimeHours || 0}h
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/employee/attendance/calendar')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Attendance Calendar
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View your monthly attendance calendar</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => router.push('/employee/attendance/regularization')}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Regularization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Request attendance regularization</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
