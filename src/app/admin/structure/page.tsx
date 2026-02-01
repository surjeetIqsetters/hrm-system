'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Users, Briefcase, MapPin, Plus, Edit, Trash2, Search, ArrowRight } from 'lucide-react';

export default function AdminStructure() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock departments data
  const departments = [
    {
      id: '1',
      name: 'Engineering',
      code: 'ENG',
      head: 'Sarah Williams',
      location: 'San Francisco',
      employeeCount: 45,
      budget: 2500000,
    },
    {
      id: '2',
      name: 'Human Resources',
      code: 'HR',
      head: 'Jane Smith',
      location: 'San Francisco',
      employeeCount: 12,
      budget: 500000,
    },
    {
      id: '3',
      name: 'Sales',
      code: 'SAL',
      head: 'Mike Johnson',
      location: 'New York',
      employeeCount: 30,
      budget: 1800000,
    },
    {
      id: '4',
      name: 'Marketing',
      code: 'MKT',
      head: 'Lisa Brown',
      location: 'New York',
      employeeCount: 18,
      budget: 1200000,
    },
  ];

  // Mock designations data
  const designations = [
    {
      id: '1',
      title: 'Software Engineer',
      level: 3,
      department: 'Engineering',
      minSalary: 80000,
      maxSalary: 120000,
      employeeCount: 25,
    },
    {
      id: '2',
      title: 'Senior Software Engineer',
      level: 4,
      department: 'Engineering',
      minSalary: 120000,
      maxSalary: 160000,
      employeeCount: 15,
    },
    {
      id: '3',
      title: 'HR Manager',
      level: 4,
      department: 'Human Resources',
      minSalary: 90000,
      maxSalary: 130000,
      employeeCount: 3,
    },
    {
      id: '4',
      title: 'Sales Executive',
      level: 2,
      department: 'Sales',
      minSalary: 50000,
      maxSalary: 80000,
      employeeCount: 20,
    },
  ];

  // Mock locations data
  const locations = [
    {
      id: '1',
      name: 'San Francisco HQ',
      address: '123 Main St, San Francisco, CA 94105',
      type: 'Headquarters',
      employeeCount: 50,
    },
    {
      id: '2',
      name: 'New York Office',
      address: '456 Oak Ave, New York, NY 10001',
      type: 'Branch',
      employeeCount: 48,
    },
    {
      id: '3',
      name: 'Remote',
      address: 'Worldwide',
      type: 'Remote',
      employeeCount: 7,
    },
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Admin Portal - Organization Structure</span>
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
          <h1 className="text-3xl font-bold mb-2">Organization Structure</h1>
          <p className="text-muted-foreground">Manage departments, designations, and locations</p>
        </div>

        {/* Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {departments.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Designations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {designations.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Locations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {locations.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {departments.reduce((acc, dept) => acc + dept.employeeCount, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="departments" className="space-y-6">
          <TabsList>
            <TabsTrigger value="departments">
              <Building2 className="mr-2 h-4 w-4" />
              Departments
            </TabsTrigger>
            <TabsTrigger value="designations">
              <Briefcase className="mr-2 h-4 w-4" />
              Designations
            </TabsTrigger>
            <TabsTrigger value="locations">
              <MapPin className="mr-2 h-4 w-4" />
              Locations
            </TabsTrigger>
          </TabsList>

          {/* Departments Tab */}
          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Departments</CardTitle>
                    <CardDescription>Organizational departments and their heads</CardDescription>
                  </div>
                  <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Department
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Department</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Department Name</label>
                          <Input placeholder="Enter department name" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Department Code</label>
                          <Input placeholder="Enter department code (e.g., ENG)" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Department Head</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select department head" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">Sarah Williams</SelectItem>
                              <SelectItem value="2">Jane Smith</SelectItem>
                              <SelectItem value="3">Mike Johnson</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Location</label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">San Francisco HQ</SelectItem>
                              <SelectItem value="2">New York Office</SelectItem>
                              <SelectItem value="3">Remote</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Budget</label>
                          <Input type="number" placeholder="Enter annual budget" />
                        </div>
                        <div className="flex gap-2 justify-end">
                          <Button variant="outline" onClick={() => setDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button>Create Department</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search departments..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {filteredDepartments.map((dept) => (
                    <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{dept.name}</h4>
                              <Badge variant="outline">{dept.code}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              <Users className="inline h-4 w-4 mr-1" />
                              Head: {dept.head}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Location</p>
                            <p className="font-medium">{dept.location}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Employees</p>
                            <p className="font-medium">{dept.employeeCount}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Annual Budget</p>
                            <p className="font-medium">${dept.budget.toLocaleString()}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Designations Tab */}
          <TabsContent value="designations">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Designations</CardTitle>
                    <CardDescription>Job titles and salary ranges</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Designation
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {designations.map((desig) => (
                    <Card key={desig.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{desig.title}</h4>
                              <Badge variant="outline">Level {desig.level}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{desig.department}</p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Min Salary</p>
                            <p className="font-medium">${desig.minSalary.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Max Salary</p>
                            <p className="font-medium">${desig.maxSalary.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Employees</p>
                            <p className="font-medium">{desig.employeeCount}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Locations</CardTitle>
                    <CardDescription>Office locations and remote work setup</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Location
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {locations.map((loc) => (
                    <Card key={loc.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="pt-6">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-lg">{loc.name}</h4>
                              <Badge variant={loc.type === 'Headquarters' ? 'default' : 'outline'}>
                                {loc.type.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              <MapPin className="inline h-4 w-4 mr-1" />
                              {loc.address}
                            </p>
                          </div>
                          <div className="flex gap-2 ml-4">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Employees: </span>
                            <span className="font-medium">{loc.employeeCount}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
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
