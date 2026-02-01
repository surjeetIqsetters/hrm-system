'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Key, Database, Plus, RefreshCw, FileSpreadsheet } from 'lucide-react';

export default function AdminIntegrations() {
  const [searchTerm, setSearchTerm] = useState('');

  const integrations = [
    {
      id: '1',
      name: 'Slack',
      type: 'Communication',
      status: 'connected',
      features: ['Announcements', 'Leave Notifications'],
      lastSync: '2025-01-06',
    },
    {
      id: '2',
      name: 'Google Workspace',
      type: 'Productivity',
      status: 'connected',
      features: ['User Sync', 'Calendar Sync'],
      lastSync: '2025-01-06',
    },
    {
      id: '3',
      name: 'QuickBooks',
      type: 'Accounting',
      status: 'connected',
      features: ['Payroll Export'],
      lastSync: '2025-01-06',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Admin Portal - Integrations</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">Back to Dashboard</Button>
            <Button variant="outline" size="sm">Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Integrations & API</h1>
          <p className="text-muted-foreground">Manage third-party integrations and API access</p>
        </div>

        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Active Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {integrations.filter(i => i.status === 'connected').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">API Keys</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {integrations.length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">API Calls Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                12,458
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Sync Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                <CheckCircle2 className="inline h-6 w-6 mr-2 text-green-600" />
                All Good
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Report Templates</CardTitle>
          <CardDescription>Select and generate HR reports on-demand</CardDescription>
        </CardHeader>
        </Card>
      </div>
      </main>

      <footer className="border-t mt-auto bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 HRM System. Enterprise Human Resource Management.</p>
        </div>
      </footer>
    </div>
  );
}
