'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DollarSign, Download, FileText, TrendingUp } from 'lucide-react';
import { fetchPayslips } from '@/redux/slices/payrollSlice';
import { format } from 'date-fns';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: DollarSign },
  { name: 'Attendance', href: '/employee/attendance', icon: TrendingUp },
  { name: 'Leave', href: '/employee/leave', icon: FileText },
  { name: 'Payroll', href: '/employee/payroll', icon: DollarSign },
  { name: 'Performance', href: '/employee/performance', icon: TrendingUp },
  { name: 'Profile', href: '/employee/profile', icon: FileText },
];

export default function EmployeePayroll() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const payroll = useAppSelector(state => state.payroll);

  useEffect(() => {
    if (auth.user) {
      dispatch(fetchPayslips(auth.user.employeeId));
    }
  }, [auth.user, dispatch]);

  const latestPayslip = payroll.payslips[0];

  return (
    <DashboardLayout
      title="Payroll"
      navigation={navigation}
    >
      <div className="space-y-6">
        {/* Salary Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Salary Overview</CardTitle>
            <CardDescription>Your current salary information</CardDescription>
          </CardHeader>
          <CardContent>
            {latestPayslip ? (
              <div className="grid md:grid-cols-4 gap-6">
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Gross Salary</div>
                  <div className="text-3xl font-bold text-green-600">
                    ${latestPayslip.grossSalary.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Net Salary</div>
                  <div className="text-3xl font-bold">
                    ${latestPayslip.netSalary.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Total Deductions</div>
                  <div className="text-3xl font-bold text-red-600">
                    ${latestPayslip.totalDeductions.toLocaleString()}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">Working Days</div>
                  <div className="text-3xl font-bold">
                    {latestPayslip.daysWorked}/{latestPayslip.totalDays}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No payslip data available
              </div>
            )}
          </CardContent>
        </Card>

        {/* Latest Payslip Detail */}
        {latestPayslip && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Payslip - {latestPayslip.month} {latestPayslip.year}</CardTitle>
                  <CardDescription>Generated on {format(new Date(latestPayslip.generatedAt), 'MMM dd, yyyy')}</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Earnings */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Earnings</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Basic Salary</span>
                      <span className="font-medium">${latestPayslip.earnings.basic.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">House Rent Allowance</span>
                      <span className="font-medium">${latestPayslip.earnings.hra.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dearness Allowance</span>
                      <span className="font-medium">${latestPayslip.earnings.da.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Special Allowance</span>
                      <span className="font-medium">${latestPayslip.earnings.specialAllowance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medical Allowance</span>
                      <span className="font-medium">${latestPayslip.earnings.medicalAllowance.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conveyance</span>
                      <span className="font-medium">${latestPayslip.earnings.conveyance.toLocaleString()}</span>
                    </div>
                    {latestPayslip.earnings.overtime > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Overtime</span>
                        <span className="font-medium">+${latestPayslip.earnings.overtime.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Earnings</span>
                      <span>${latestPayslip.earnings.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div>
                  <h3 className="font-semibold mb-4 text-lg">Deductions</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">EPF (Provident Fund)</span>
                      <span className="font-medium">-${latestPayslip.deductions.epf.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ESI (Insurance)</span>
                      <span className="font-medium">-${latestPayslip.deductions.esi.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Professional Tax</span>
                      <span className="font-medium">-${latestPayslip.deductions.pt.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">TDS (Income Tax)</span>
                      <span className="font-medium">-${latestPayslip.deductions.tds.toLocaleString()}</span>
                    </div>
                    {latestPayslip.deductions.lossOfPay > 0 && (
                      <div className="flex justify-between text-red-600">
                        <span>Loss of Pay</span>
                        <span className="font-medium">-${latestPayslip.deductions.lossOfPay.toLocaleString()}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Deductions</span>
                      <span className="text-red-600">-${latestPayslip.deductions.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Net Salary Summary */}
              <div className="flex justify-between items-center p-6 bg-primary/5 rounded-lg">
                <div>
                  <div className="text-sm text-muted-foreground">Net Salary</div>
                  <div className="text-sm text-muted-foreground">Gross Earnings - Total Deductions</div>
                </div>
                <div className="text-4xl font-bold text-primary">
                  ${latestPayslip.netSalary.toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Past Payslips */}
        <Card>
          <CardHeader>
            <CardTitle>Payslips History</CardTitle>
            <CardDescription>Your previous payslips</CardDescription>
          </CardHeader>
          <CardContent>
            {payroll.payslips.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No payslips found
              </div>
            ) : (
              <div className="space-y-3">
                {payroll.payslips.map((payslip) => (
                  <div key={payslip.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <div>
                      <div className="font-medium">
                        {payslip.month} {payslip.year}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {format(new Date(payslip.generatedAt), 'MMM dd, yyyy')}
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold">${payslip.netSalary.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">
                          {payslip.daysWorked} days worked
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Tax Declarations */}
        <Card>
          <CardHeader>
            <CardTitle>Tax Declarations</CardTitle>
            <CardDescription>Manage your tax declarations and proofs</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">
              <FileText className="mr-2 h-4 w-4" />
              Manage Tax Declarations
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
