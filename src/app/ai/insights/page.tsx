'use client';

import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Brain, TrendingUp, AlertTriangle, FileText, Target, MessageSquare, Zap } from 'lucide-react';
import { fetchAttritionRisks, fetchPerformanceInsights, fetchAttendanceAnomalies } from '@/redux/slices/aiSlice';

export default function AIInsights() {
  const dispatch = useAppDispatch();
  const ai = useAppSelector(state => state.ai);

  useEffect(() => {
    dispatch(fetchAttritionRisks());
    dispatch(fetchPerformanceInsights());
    dispatch(fetchAttendanceAnomalies());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b bg-gradient-to-r from-purple-500/10 to-blue-500/10 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">HRM AI Insights</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-gradient-to-r from-purple-500 to-blue-500">AI Powered</Badge>
            <Button variant="outline" size="sm">Back to Dashboard</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI-Powered Insights</h1>
          <p className="text-muted-foreground">Intelligent predictions and recommendations for better HR decisions</p>
        </div>

        {/* AI Features Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-200 dark:border-purple-900 bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-slate-900">
            <CardHeader>
              <Brain className="h-8 w-8 text-purple-500 mb-2" />
              <CardTitle className="text-lg">Attrition Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Predict employee attrition risk and get retention recommendations
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-900 bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-900">
            <CardHeader>
              <TrendingUp className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle className="text-lg">Performance Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Generate comprehensive performance analytics and recommendations
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-900 bg-gradient-to-br from-orange-50 to-white dark:from-orange-950/20 dark:to-slate-900">
            <CardHeader>
              <AlertTriangle className="h-8 w-8 text-orange-500 mb-2" />
              <CardTitle className="text-lg">Anomaly Detection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detect unusual attendance patterns and get automated alerts
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-900 bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-slate-900">
            <CardHeader>
              <FileText className="h-8 w-8 text-green-500 mb-2" />
              <CardTitle className="text-lg">Resume Ranking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                AI-powered resume scoring to identify best candidates
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Attrition Risks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-500" />
                Attrition Risk Analysis
              </CardTitle>
              <CardDescription>Employees at risk of leaving</CardDescription>
            </CardHeader>
            <CardContent>
              {ai.attritionRisks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No attrition risks detected
                </div>
              ) : (
                <div className="space-y-4">
                  {ai.attritionRisks.map((risk) => (
                    <div
                      key={risk.employeeId}
                      className={`p-4 border rounded-lg ${
                        risk.riskLevel === 'critical'
                          ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                          : risk.riskLevel === 'high'
                          ? 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                          : risk.riskLevel === 'medium'
                          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20'
                          : 'border-green-500 bg-green-50 dark:bg-green-950/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{risk.employeeName}</h4>
                          <p className="text-sm text-muted-foreground">{risk.department}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            variant={
                              risk.riskLevel === 'critical'
                                ? 'destructive'
                                : risk.riskLevel === 'high'
                                ? 'secondary'
                                : 'outline'
                            }
                          >
                            {risk.riskLevel.toUpperCase()} RISK
                          </Badge>
                          <div className="text-2xl font-bold mt-1">{risk.riskScore}%</div>
                        </div>
                      </div>

                      <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Risk Factors:</strong> {risk.factors.join(', ')}
                        </AlertDescription>
                      </Alert>

                      <div className="mt-3 space-y-2">
                        <p className="text-sm">
                          <strong>Predictions:</strong> {risk.predictions[0]}
                        </p>
                        <p className="text-sm">
                          <strong>Recommended Actions:</strong> {risk.recommendedActions[0]}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Performance Analytics
              </CardTitle>
              <CardDescription>AI-generated performance insights</CardDescription>
            </CardHeader>
            <CardContent>
              {ai.performanceInsights.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No performance insights available
                </div>
              ) : (
                <div className="space-y-4">
                  {ai.performanceInsights.map((insight) => (
                    <div key={insight.employeeId} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold">{insight.employeeName}</h4>
                          <p className="text-sm text-muted-foreground">{insight.department}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">
                            {insight.overallRating}/5.0
                          </div>
                          <div className="text-xs text-muted-foreground">{insight.period}</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 mb-3">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Attendance:</span>
                          <span className="font-medium ml-1">{insight.trends.attendance}%</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Productivity:</span>
                          <span className="font-medium ml-1">{insight.trends.productivity}%</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Goal Completion:</span>
                          <span className="font-medium ml-1">{insight.trends.goalCompletion}%</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Peer Rating:</span>
                          <span className="font-medium ml-1">{insight.trends.peerRating}/5</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium mb-1">Strengths</p>
                          <div className="flex flex-wrap gap-1">
                            {insight.strengths.map((strength, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {strength}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-sm font-medium mb-1">Achievements</p>
                          <div className="flex flex-wrap gap-1">
                            {insight.achievements.map((achievement, i) => (
                              <Badge key={i} className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                                {achievement}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Attendance Anomalies */}
        {ai.attendanceAnomalies.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                Attendance Anomalies Detected
              </CardTitle>
              <CardDescription>Unusual attendance patterns requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {ai.attendanceAnomalies.map((anomaly) => (
                  <div
                    key={anomaly.id}
                    className={`p-4 border rounded-lg ${
                      anomaly.severity === 'high'
                        ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                        : 'border-orange-500 bg-orange-50 dark:bg-orange-950/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{anomaly.employeeName}</h4>
                      <Badge
                        variant={anomaly.severity === 'high' ? 'destructive' : 'secondary'}
                      >
                        {anomaly.severity.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p>
                        <strong>Anomaly Type:</strong> {anomaly.anomalyType.replace('-', ' ')}
                      </p>
                      <p>
                        <strong>Count:</strong> {anomaly.count} occurrence(s)
                      </p>
                      <p>
                        <strong>Period:</strong> {anomaly.dateRange}
                      </p>
                      <p className="text-muted-foreground">{anomaly.description}</p>

                      {anomaly.recommendations.length > 0 && (
                        <div className="mt-2">
                          <strong>Recommendations:</strong>
                          <ul className="list-disc list-inside mt-1 text-muted-foreground">
                            {anomaly.recommendations.map((rec, i) => (
                              <li key={i}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* HR Policy Chatbot */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              HR Policy Chatbot
            </CardTitle>
            <CardDescription>Ask questions about HR policies and get instant answers</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Zap className="h-4 w-4" />
              <AlertDescription>
                AI-powered chatbot to answer HR policy questions. Available 24/7 for quick assistance.
              </AlertDescription>
            </Alert>
            <div className="mt-4 flex gap-4">
              <Button className="flex-1">
                <MessageSquare className="mr-2 h-4 w-4" />
                Start Chat
              </Button>
              <Button variant="outline">
                View Chat History
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t mt-auto bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2025 HRM System. AI-Powered Human Resource Management.</p>
        </div>
      </footer>
    </div>
  );
}
