'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Users, FileText, Plus, Search, Filter, Download, Calendar, MapPin, DollarSign, Star, ExternalLink } from 'lucide-react';

export default function HRHiring() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock job postings
  const jobPostings = [
    {
      id: '1',
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'San Francisco',
      type: 'Full-time',
      vacancies: 2,
      experience: '4-6 years',
      salaryRange: '120K - 150K',
      applications: 45,
      status: 'open',
      postedDate: '2025-01-01',
    },
    {
      id: '2',
      title: 'Product Manager',
      department: 'Product',
      location: 'Remote',
      type: 'Full-time',
      vacancies: 1,
      experience: '3-5 years',
      salaryRange: '130K - 160K',
      applications: 62,
      status: 'open',
      postedDate: '2024-12-28',
    },
    {
      id: '3',
      title: 'UX Designer',
      department: 'Design',
      location: 'New York',
      type: 'Full-time',
      vacancies: 1,
      experience: '2-4 years',
      salaryRange: '90K - 120K',
      applications: 28,
      status: 'open',
      postedDate: '2025-01-05',
    },
  ];

  // Mock applicants
  const applicants = [
    {
      id: '1',
      name: 'Alex Turner',
      jobId: '1',
      jobTitle: 'Senior Software Engineer',
      appliedDate: '2025-01-04',
      status: 'screening',
      experience: '5 years',
      matchScore: 92,
    },
    {
      id: '2',
      name: 'Sarah Chen',
      jobId: '1',
      jobTitle: 'Senior Software Engineer',
      appliedDate: '2025-01-03',
      status: 'interview-scheduled',
      experience: '4 years',
      matchScore: 88,
    },
    {
      id: '3',
      name: 'Michael Brown',
      jobId: '2',
      jobTitle: 'Product Manager',
      appliedDate: '2025-01-05',
      status: 'shortlisted',
      experience: '5 years',
      matchScore: 85,
    },
  ];

  const filteredJobs = jobPostings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'open': 'default',
      'closed': 'secondary',
      'on-hold': 'outline',
    };
    return variants[status] || 'outline';
  };

  const getApplicantStatusBadge = (status: string) => {
    const variants: Record<string, any> = {
      'screening': 'secondary',
      'shortlisted': 'default',
      'interview-scheduled': 'outline',
      'offered': 'default',
      'rejected': 'destructive',
    };
    return variants[status] || 'outline';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HR Portal - Hiring</span>
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
          <h1 className="text-3xl font-bold mb-2">Hiring & Recruitment</h1>
          <p className="text-muted-foreground">Manage job postings and applicant tracking</p>
        </div>

        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Open Positions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {jobPostings.filter(j => j.status === 'open').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {applicants.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Interviews Scheduled</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {applicants.filter(a => a.status === 'interview-scheduled').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Offers Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">3</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="jobs" className="space-y-6">
          <TabsList>
            <TabsTrigger value="jobs">
              <Briefcase className="mr-2 h-4 w-4" />
              Job Postings
            </TabsTrigger>
            <TabsTrigger value="applicants">
              <Users className="mr-2 h-4 w-4" />
              Applicants
            </TabsTrigger>
            <TabsTrigger value="interviews">
              <Calendar className="mr-2 h-4 w-4" />
              Interviews
            </TabsTrigger>
          </TabsList>

          {/* Job Postings Tab */}
          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Job Postings</CardTitle>
                    <CardDescription>Active job listings and vacancies</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    New Job Posting
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search jobs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="on-hold">On Hold</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>

                {/* Job Cards */}
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredJobs.map((job) => (
                    <Card key={job.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant={getStatusBadge(job.status)}>
                            {job.status.toUpperCase()}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Posted: {new Date(job.postedDate).toLocaleDateString()}
                          </span>
                        </div>
                        <CardTitle className="text-xl">{job.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">{job.department}</Badge>
                          <Badge variant="outline">{job.type}</Badge>
                          <Badge variant="outline">{job.location}</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{job.vacancies} position(s)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{job.experience}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                            <span>{job.salaryRange}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span>{job.applications} applications</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" className="flex-1">
                            <FileText className="mr-2 h-4 w-4" />
                            View Details
                          </Button>
                          <Button variant="outline" className="flex-1">
                            <Users className="mr-2 h-4 w-4" />
                            Applicants ({job.applications})
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applicants Tab */}
          <TabsContent value="applicants">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Applicants</CardTitle>
                    <CardDescription>Review and track candidate applications</CardDescription>
                  </div>
                  <Button>
                    <FileText className="mr-2 h-4 w-4" />
                    AI Resume Scoring
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicants.map((applicant) => (
                    <div key={applicant.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-lg">{applicant.name}</h4>
                            <Badge variant={getApplicantStatusBadge(applicant.status)}>
                              {applicant.status.replace('-', ' ').toUpperCase()}
                            </Badge>
                          </div>

                          <div className="grid md:grid-cols-4 gap-4 mb-3">
                            <div>
                              <p className="text-sm text-muted-foreground">Applied For</p>
                              <p className="font-medium">{applicant.jobTitle}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Applied On</p>
                              <p className="font-medium">{new Date(applicant.appliedDate).toLocaleDateString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Experience</p>
                              <p className="font-medium">{applicant.experience}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">AI Match Score</p>
                              <p className="font-medium flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                                {applicant.matchScore}%
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            <FileText className="mr-1 h-4 w-4" />
                            Resume
                          </Button>
                          <Button size="sm">
                            View Profile
                            <ExternalLink className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interviews Tab */}
          <TabsContent value="interviews">
            <Card>
              <CardHeader>
                <CardTitle>Interviews</CardTitle>
                <CardDescription>Upcoming interviews and interview scheduling</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No interviews scheduled yet</p>
                  <Button className="mt-4" variant="outline">
                    Schedule New Interview
                  </Button>
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
