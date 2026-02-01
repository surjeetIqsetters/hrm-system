'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchAttritionRisks } from '@/redux/slices/aiSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Brain, TrendingUp, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { mockAttritionRisks } from '@/lib/mock-data';

export default function HRAIInsights() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const auth = useAppSelector(state => state.auth);
  const ai = useAppSelector(state => state.ai);

  useEffect(() => {
    if (auth.status !== 'authenticated' || !auth.user) {
      router.push('/');
      return;
    }

    if (auth.user?.role !== 'hr' && auth.user?.role !== 'admin') {
      router.push('/dashboard');
    }

    // Fetch attrition risks
    dispatch(fetchAttritionRisks());
  }, [auth, dispatch, router]);

  const risks = ai.attritionRisks.length > 0 ? ai.attritionRisks : mockAttritionRisks;

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-orange-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'low': return <CheckCircle2 className="h-5 w-5" />;
      case 'medium': return <AlertTriangle className="h-5 w-5" />;
      case 'high': return <AlertTriangle className="h-5 w-5" />;
      case 'critical': return <AlertCircle className="h-5 w-5" />;
      default: return <TrendingUp className="h-5 w-5" />;
    }
  };

  const getRiskVariant = (level: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (level) {
      case 'critical': return 'destructive';
      case 'high': return 'outline';
      case 'medium': return 'secondary';
      default: return 'default';
    }
  };

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
              <Brain className="h-6 w-6 text-purple-600" />
              <h1 className="text-xl font-bold">AI Attrition Insights</h1>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline">AI-Powered</Badge>
            <span className="text-sm text-muted-foreground">
              {user.firstName} {user.lastName}
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-6">
        {/* Summary Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="border-red-200 bg-red-50 dark:bg-red-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Critical Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {risks.filter(r => r.riskLevel === 'critical').length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">High Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-600">
                {risks.filter(r => r.riskLevel === 'high').length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-200 bg-yellow-50 dark:bg-yellow-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Medium Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {risks.filter(r => r.riskLevel === 'medium').length}
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 bg-green-50 dark:bg-green-950">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Low Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {risks.filter(r => r.riskLevel === 'low').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attrition Risk List */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Attrition Risk Analysis</CardTitle>
            <p className="text-sm text-muted-foreground">
              AI-powered predictions based on attendance, performance, engagement, and market data
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {risks
                .sort((a, b) => b.riskScore - a.riskScore)
                .map((risk) => (
                  <div key={risk.employeeId} className={`p-4 border rounded-lg ${
                    risk.riskLevel === 'critical' ? 'bg-red-50 dark:bg-red-950 border-red-200' :
                    risk.riskLevel === 'high' ? 'bg-orange-50 dark:bg-orange-950 border-orange-200' :
                    risk.riskLevel === 'medium' ? 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200' :
                    'bg-green-50 dark:bg-green-950 border-green-200'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`h-12 w-12 rounded-full flex items-center justify-center font-bold text-lg ${getRiskColor(risk.riskLevel)} bg-white dark:bg-slate-900`}>
                            {risk.employeeName.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{risk.employeeName}</h3>
                            <p className="text-sm text-muted-foreground">{risk.department}</p>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="font-medium">Attrition Risk Score</span>
                            <span className={`${getRiskColor(risk.riskLevel)} font-bold`}>
                              {risk.riskScore}%
                            </span>
                          </div>
                          <Progress
                            value={risk.riskScore}
                            className="h-3"
                          />
                        </div>

                        <Badge variant={getRiskVariant(risk.riskLevel)} className="capitalize">
                          {getRiskIcon(risk.riskLevel)}
                          <span className="ml-1">{risk.riskLevel} Risk</span>
                        </Badge>
                      </div>

                      <div className="text-xs text-muted-foreground">
                        Last updated: {new Date(risk.lastUpdated).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          Risk Factors
                        </h4>
                        <ul className="space-y-1">
                          {risk.factors.map((factor, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground">• {factor}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <Brain className="h-4 w-4" />
                          AI Predictions
                        </h4>
                        <ul className="space-y-1">
                          {risk.predictions.map((prediction, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground">• {prediction}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-medium text-sm mb-2 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" />
                          Recommended Actions
                        </h4>
                        <ul className="space-y-1">
                          {risk.recommendedActions.map((action, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground">• {action}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm">Schedule 1:1</Button>
                      <Button size="sm" variant="outline">View Profile</Button>
                      <Button size="sm" variant="outline">Create Retention Plan</Button>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Model Info */}
        <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-purple-600" />
              About AI Attrition Prediction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Data Sources</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
                    <span>Attendance patterns and irregularities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
                    <span>Performance ratings and goal completion</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
                    <span>Engagement survey responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
                    <span>Leave and overtime patterns</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-600" />
                    <span>Market trends and salary benchmarks</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Model Accuracy</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Overall Accuracy</span>
                      <span className="font-bold">87%</span>
                    </div>
                    <Progress value={87} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>High Risk Prediction</span>
                      <span className="font-bold">92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Medium Risk Prediction</span>
                      <span className="font-bold">85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
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
