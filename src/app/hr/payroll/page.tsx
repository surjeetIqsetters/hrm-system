'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, Calendar, Play, CheckCircle2, Download, FileText, Search, Filter, TrendingUp, TrendingDown } from 'lucide-react';

export default function HRPayroll() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock payroll runs
  const payrollRuns = [
    {
      id: '1',
      month: 'December 2024',
      processedDate: '2024-12-30',
      status: 'completed',
      totalEmployees: 150,
      totalPayout: 1850000,
      taxDeducted: 277500,
      errors: 0,
    },
    {
      id: '2',
      month: 'November 2024',
      processedDate: '2024-11-29',
      status: 'completed',
      totalEmployees: 148,
      totalPayout: 1820000,
      taxDeducted: 273000,
      errors: 0,
    },
    {
      id: '3',
      month: 'October 2024',
      processedDate: '2024-10-30',
      status: 'completed',
      totalEmployees: 145,
      totalPayout: 1790000,
      taxDeducted: 268500,
      errors: 2,
    },
  ];

  // Mock salary structures
  const salaryStructures = [
    {
      id: '1',
      designation: 'Software Engineer',
      level: 3,
      minSalary: 80000,
      maxSalary: 120000,
      grossSalary: 100000,
      components: ['Basic', 'HRA', 'DA', 'Special Allowance', 'Medical'],
    },
    {
      id: '2',
      designation: 'Senior Software Engineer',
      level: 4,
      minSalary: 120000,
      maxSalary: 160000,
      grossSalary: 140000,
      components: ['Basic', 'HRA', 'DA', 'Special Allowance', 'Medical', 'LTA'],
    },
    {
      id: '3',
      designation: 'HR Manager',
      level: 4,
      minSalary: 90000,
      maxSalary: 130000,
      grossSalary: 110000,
      components: ['Basic', 'HRA', 'DA', 'Special Allowance', 'Medical'],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HR Portal - Payroll</span>
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
          <h1 className="text-3xl font-bold mb-2">Payroll Management</h1>
          <p className="text-muted-foreground">Process payroll and manage salary structures</p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">150</div>
              <div className="flex items-center text-xs text-muted-foreground mt-2">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                +5 this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Last Payroll Payout</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                $1.85M
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                Dec 2024 • 150 employees
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">12</div>
              <div className="text-xs text-muted-foreground mt-2">
                Payslips awaiting approval
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Tax Collected (YTD)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                $3.3M
              </div>
              <div className="text-xs text-muted-foreground mt-2">
                FY 2024-25
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="payroll-run" className="space-y-6">
          <TabsList>
            <TabsTrigger value="payroll-run">
              <Play className="mr-2 h-4 w-4" />
              Payroll Run
            </TabsTrigger>
            <TabsTrigger value="structures">
              <FileText className="mr-2 h-4 w-4" />
              Salary Structures
            </TabsTrigger>
            <TabsTrigger value="payslips">
              <DollarSign className="mr-2 h-4 w-4" />
              Payslips
            </TabsTrigger>
            <TabsTrigger value="compliance">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Compliance
            </TabsTrigger>
          </TabsList>

          {/* Payroll Run Tab */}
          <TabsContent value="payroll-run">
            <Card>
              <CardHeader>
                <CardTitle>Run Payroll</CardTitle>
                <CardDescription>Process monthly payroll for all employees</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Payroll Month</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="jan2025">January 2025</SelectItem>
                        <SelectItem value="dec2024">December 2024</SelectItem>
                        <SelectItem value="nov2024">November 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Cut-off Date</label>
                    <Input type="date" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Payment Date</label>
                    <Input type="date" />
                  </div>
                </div>

                <div className="border rounded-lg p-4 space-y-3">
                  <h3 className="font-semibold">Payroll Preview</h3>
                  <div className="grid md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Active Employees</p>
                      <p className="font-semibold">150</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Gross Payroll</p>
                      <p className="font-semibold">$1,850,000</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deductions</p>
                      <p className="font-semibold">$277,500</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Net Payout</p>
                      <p className="font-semibold text-green-600">$1,572,500</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button className="flex-1">
                    <Play className="mr-2 h-4 w-4" />
                    Run Payroll
                  </Button>
                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Download Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Salary Structures Tab */}
          <TabsContent value="structures">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Salary Structures</CardTitle>
                    <CardDescription>Define salary ranges by designation</CardDescription>
                  </div>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    Create Structure
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salaryStructures.map((structure) => (
                    <Card key={structure.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h4 className="font-semibold text-lg">{structure.designation}</h4>
                            <p className="text-sm text-muted-foreground">Level {structure.level}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Gross Salary</p>
                            <p className="text-2xl font-bold">${structure.grossSalary.toLocaleString()}</p>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Min Salary</p>
                            <p className="font-medium">${structure.minSalary.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Max Salary</p>
                            <p className="font-medium">${structure.maxSalary.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Components</p>
                            <p className="font-medium">{structure.components.length} items</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Employees</p>
                            <p className="font-medium">~{Math.floor((structure.maxSalary + structure.minSalary) / 2)}</p>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View Details</Button>
                          <Button variant="outline" size="sm">Edit Structure</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payslips Tab */}
          <TabsContent value="payslips">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Payslips</CardTitle>
                    <CardDescription>Review and approve generated payslips</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
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
                        <SelectItem value="pending">Pending Approval</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="distributed">Distributed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select a payroll month to view payslips</p>
                  <div className="flex gap-2 justify-center mt-4">
                    <Button variant="outline">December 2024</Button>
                    <Button variant="outline">November 2024</Button>
                    <Button variant="outline">October 2024</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Statutory Compliance</CardTitle>
                <CardDescription>Manage PF, ESI, TDS, and other statutory compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">PF (Provident Fund)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Rate</span>
                          <span className="font-medium">12%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">YTD Collection</span>
                          <span className="font-medium">$1,980,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">YTD Payment</span>
                          <span className="font-medium text-green-600">$1,980,000</span>
                        </div>
                        <Button variant="outline" className="w-full" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">ESI (Insurance)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Rate</span>
                          <span className="font-medium">3.25%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">YTD Collection</span>
                          <span className="font-medium">$601,250</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">YTD Payment</span>
                          <span className="font-medium text-green-600">$601,250</span>
                        </div>
                        <Button variant="outline" className="w-full" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">TDS (Tax Deducted at Source)</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">YTD Deduction</span>
                          <span className="font-medium">$720,000</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Payments Made</span>
                          <span className="font-medium text-green-600">$720,000</span>
                        </div>
                        <Button variant="outline" className="w-full" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">Professional Tax</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">State</span>
                          <span className="font-medium">California</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">YTD Collection</span>
                          <span className="font-medium">$54,000</span>
                        </div>
                        <Button variant="outline" className="w-full" size="sm">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
