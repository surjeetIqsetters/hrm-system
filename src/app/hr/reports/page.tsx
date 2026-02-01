'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Download, BarChart3, Users, Calendar, DollarSign, TrendingUp, Filter, RefreshCw } from 'lucide-react';

export default function HRReports() {
  const [reportDialog, setReportDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HR Portal - Reports</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">Back to Dashboard</Button>
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">HR Reports</h1>
          <p className="text-muted-foreground">Generate and download comprehensive HR reports</p>
        </div>

        <Tabs defaultValue="available-reports" className="space-y-6">
          <TabsList>
            <TabsTrigger value="available-reports">
              <FileSpreadsheet className="mr-2 h-4 w-4" />
              Available Reports
            </TabsTrigger>
            <TabsTrigger value="recent-reports">
              <FileText className="mr-2 h-4 w-4" />
              Recent Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available-reports">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Available Report Templates</CardTitle>
                  <CardDescription>Select and generate HR reports on-demand</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/20">
                      <h3 className="font-semibold mb-1">Employee Headcount Report</h3>
                      <p className="text-sm text-muted-foreground">Complete employee headcount with breakdown by department, designation, and location</p>
                    </div>
                    <Button className="w-full">Generate Report</Button>
                    </div>

                    <div className="p-4 border rounded-lg bg-green-50 dark:bg-green-950/20">
                      <h3 className="font-semibold mb-1">Attendance Summary</h3>
                      <p className="text-sm text-muted-foreground">Monthly attendance summary with present/absent/late statistics</p>
                    </div>
                    <Button className="w-full">Generate Report</Button>
                    </div>

                    <div className="p-4 border rounded-lg bg-purple-50 dark:bg-purple-950/20">
                      <h3 className="font-semibold mb-1">Leave Analytics</h3>
                      <p className="text-sm text-muted-foreground">Leave utilization analysis with department-wise breakdown</p>
                    </div>
                    <Button className="w-full">Generate Report</Button>
                    </div>

                    <div className="p-4 border rounded-lg bg-orange-50 dark:bg-orange-950/20">
                      <h3 className="font-semibold mb-1">Payroll Summary</h3>
                      <p className="text-sm text-muted-foreground">Monthly payroll summary with tax and deductions breakdown</p>
                    </div>
                    <Button className="w-full">Generate Report</Button>
                    </div>

                    <div className="p-4 border rounded-lg bg-pink-50 dark:bg-pink-950/20">
                      <h3 className="font-semibold mb-1">Performance Report</h3>
                      <p className="text-sm text-muted-foreground">Performance review summary with ratings and goal completion</p>
                    </div>
                    <Button className="w-full">Generate Report</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t mt-auto bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 HRM System. Enterprise Human Resource Management.</p>
        </div>
      </footer>
    </div>
  );
}
