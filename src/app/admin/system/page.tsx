'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Server, Database, Shield, Activity, CheckCircle2, AlertTriangle, Users, Clock } from 'lucide-react';

export default function AdminSystem() {
  const router = useRouter();
  const auth = useAppSelector(state => state.auth);

  useEffect(() => {
    if (auth.status !== 'authenticated' || !auth.user) {
      router.push('/');
      return;
    }

    if (auth.user?.role !== 'admin') {
      router.push('/dashboard');
    }
  }, [auth, router]);

  if (auth.status !== 'authenticated') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const user = auth.user!;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-bold">Admin Console</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="destructive">Admin</Badge>
            <span className="text-sm text-muted-foreground">
              {user.firstName} {user.lastName}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* System Health */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              System Health Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">API Server</span>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-600">Healthy</p>
                <p className="text-xs text-muted-foreground">Uptime: 99.99%</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Database</span>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-600">Connected</p>
                <p className="text-xs text-muted-foreground">Response: 12ms</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Redis Cache</span>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-600">Active</p>
                <p className="text-xs text-muted-foreground">Hit Rate: 95%</p>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">AI Service</span>
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                </div>
                <p className="text-2xl font-bold text-green-600">Online</p>
                <p className="text-xs text-muted-foreground">Models Loaded</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>System Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Total Users</p>
                    <p className="text-sm text-muted-foreground">Active accounts</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">150</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Server className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">API Requests</p>
                    <p className="text-sm text-muted-foreground">Last 24 hours</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">12.5K</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Database className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Database Size</p>
                    <p className="text-sm text-muted-foreground">Total storage</p>
                  </div>
                </div>
                <span className="text-2xl font-bold">2.4 GB</span>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Avg Response Time</p>
                    <p className="text-sm text-muted-foreground">Last hour</p>
                  </div>
                </div>
                <span className="text-2xl font-bold text-green-600">45ms</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { type: 'warning', message: 'High API latency detected (150ms)', time: '2 minutes ago' },
                { type: 'info', message: 'Database backup completed successfully', time: '1 hour ago' },
                { type: 'success', message: 'AI model retraining completed', time: '3 hours ago' },
                { type: 'info', message: 'New user registration: employee@example.com', time: '5 hours ago' },
                { type: 'warning', message: 'Disk usage at 85% - consider cleanup', time: '1 day ago' },
              ].map((alert, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className={`mt-0.5 ${
                    alert.type === 'warning' ? 'text-yellow-500' :
                    alert.type === 'success' ? 'text-green-500' :
                    'text-blue-500'
                  }`}>
                    {alert.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> :
                     alert.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> :
                     <Activity className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-20 flex-col" onClick={() => router.push('/admin/roles')}>
                <Shield className="h-6 w-6 mb-2" />
                <span>Manage Roles</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => router.push('/admin/structure')}>
                <Database className="h-6 w-6 mb-2" />
                <span>Organization Setup</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => router.push('/admin/integrations')}>
                <Server className="h-6 w-6 mb-2" />
                <span>Integrations</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col" onClick={() => router.push('/admin/security')}>
                <Activity className="h-6 w-6 mb-2" />
                <span>Audit Logs</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* System Info */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Application</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Version</span>
                    <span>2.0.1</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Environment</span>
                    <Badge>Production</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Framework</span>
                    <span>Next.js 16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Runtime</span>
                    <span>Node.js 20</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">AI Services</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LLM Model</span>
                    <span>GPT-4 Turbo</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">VLM Model</span>
                    <span>GPT-4 Vision</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Attrition Model</span>
                    <span>Custom XGBoost</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resume Model</span>
                    <span>BERT-based</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Security</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">SSL Certificate</span>
                    <span className="text-green-600">Valid</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">MFA Enabled</span>
                    <span className="text-green-600">Yes</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">RBAC</span>
                    <span className="text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Audit Log</span>
                    <span className="text-green-600">Enabled</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
