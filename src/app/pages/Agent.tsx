import { useState, useEffect } from 'react';
import { 
  Brain, 
  Lock, 
  LogOut, 
  Activity,
  CheckCircle2,
  XCircle,
  Clock,
  Briefcase,
  DollarSign,
  MapPin,
  ExternalLink,
  RefreshCw,
  TrendingUp,
  Eye,
  EyeOff,
  Zap,
  Search,
  ChevronDown,
  ChevronUp,
  Mail,
  Copy,
  Sparkles,
  BarChart3,
  Filter,
  Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '/utils/supabase/info';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Progress } from '@/app/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/app/components/ui/tooltip';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/app/components/ui/collapsible';
import { toast } from 'sonner';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

interface Job {
  id: string;
  source: string;
  title: string;
  company: string;
  location: string;
  salary_min_usd: number;
  salary_max_usd: number;
  salary_original: string;
  tech_stack: string[];
  remote_type: string;
  experience_level: string;
  job_url: string;
  description: string;
  score: number;
  score_reason: string;
  is_emailed: boolean;
  created_at: string;
}

interface AgentRun {
  id: string;
  run_date: string;
  jobs_scraped: number;
  jobs_inserted: number;
  jobs_scored: number;
  high_matches: number;
  emails_sent: number;
  status: string;
  error_message: string;
}

interface AgentStats {
  total_jobs: number;
  high_matches: number;
  pending_review: number;
  last_run: string;
}

interface EmailHistory {
  id: string;
  subject: string;
  sent_at: string;
  job_count: number;
  preview: string;
  body: string;
}

export function Agent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const [jobs, setJobs] = useState<Job[]>([]);
  const [runs, setRuns] = useState<AgentRun[]>([]);
  const [stats, setStats] = useState<AgentStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  // Demo access state
  const [isGeneratingDemo, setIsGeneratingDemo] = useState(false);
  const [demoPassword, setDemoPassword] = useState('');
  const [demoExpiresAt, setDemoExpiresAt] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [minScore, setMinScore] = useState(0);
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [minSalary, setMinSalary] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');

  // UI State
  const [expandedRun, setExpandedRun] = useState<string | null>(null);
  const [selectedEmail, setSelectedEmail] = useState<EmailHistory | null>(null);
  const [sortColumn, setSortColumn] = useState<keyof Job>('score');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const savedPassword = sessionStorage.getItem('agentPassword');
    if (savedPassword) {
      setPassword(savedPassword);
      handleLogin(savedPassword);
    }
  }, []);

  // Countdown timer for demo password
  useEffect(() => {
    if (demoExpiresAt) {
      const interval = setInterval(() => {
        const expiresTime = new Date(demoExpiresAt).getTime();
        const now = Date.now();
        const remaining = Math.max(0, Math.floor((expiresTime - now) / 1000));
        setTimeRemaining(remaining);
        
        if (remaining === 0) {
          setDemoPassword('');
          setDemoExpiresAt('');
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [demoExpiresAt]);

  const handleGenerateDemoAccess = async () => {
    setIsGeneratingDemo(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/agent/generate-demo-access`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      // First check if response is ok
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error response:', errorText);
        toast.error('Failed to generate demo access');
        return;
      }

      // Get response text first
      const responseText = await response.text();
      console.log('Response text:', responseText);

      // Try to parse JSON
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (parseError) {
        console.error('JSON parse error:', parseError);
        console.error('Response was:', responseText);
        toast.error('Invalid response from server');
        return;
      }

      setDemoPassword(result.password);
      setDemoExpiresAt(result.expiresAt);
      setPassword(result.password); // Auto-fill the password field
      toast.success('Demo access generated!');
    } catch (error) {
      console.error('Error generating demo access:', error);
      toast.error('Failed to generate demo access');
    } finally {
      setIsGeneratingDemo(false);
    }
  };

  const handleCopyDemoPassword = () => {
    // Fallback method for clipboard API restrictions
    const textArea = document.createElement('textarea');
    textArea.value = demoPassword;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      toast.success('Password copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy password');
    } finally {
      textArea.remove();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleLogin = async (pwd?: string) => {
    const passwordToUse = pwd || password;
    setIsAuthenticating(true);
    setAuthError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/agent/verify`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ password: passwordToUse }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setAuthError(result.error || 'Invalid password');
        sessionStorage.removeItem('agentPassword');
        return;
      }

      sessionStorage.setItem('agentPassword', passwordToUse);
      setIsAuthenticated(true);
      await loadDashboardData(passwordToUse);
    } catch (error) {
      console.error('Authentication error:', error);
      setAuthError('Authentication failed. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const loadDashboardData = async (pwd: string) => {
    setIsLoading(true);
    setError('');

    try {
      const [jobsRes, runsRes, statsRes] = await Promise.all([
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/agent/jobs`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({ password: pwd }),
          }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/agent/runs`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({ password: pwd }),
          }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/agent/stats`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${publicAnonKey}`,
            },
            body: JSON.stringify({ password: pwd }),
          }
        ),
      ]);

      const jobsData = await jobsRes.json();
      const runsData = await runsRes.json();
      const statsData = await statsRes.json();

      if (jobsRes.ok) setJobs(jobsData.jobs || []);
      if (runsRes.ok) setRuns(runsData.runs || []);
      if (statsRes.ok) setStats(statsData.stats || null);
    } catch (error) {
      console.error('Error loading dashboard:', error);
      setError('Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunAgent = async () => {
    if (!password) return;

    setIsRunning(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/agent/run`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ password }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.error || 'Failed to run agent');
        toast.error('Agent run failed');
        return;
      }

      toast.success('Agent run completed successfully');
      await loadDashboardData(password);
    } catch (error) {
      console.error('Error running agent:', error);
      setError('Failed to run agent');
      toast.error('Agent run failed');
    } finally {
      setIsRunning(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('agentPassword');
    setIsAuthenticated(false);
    setPassword('');
    setJobs([]);
    setRuns([]);
    setStats(null);
  };

  const handleCopyLink = (url: string) => {
    // Fallback method for clipboard API restrictions
    const textArea = document.createElement('textarea');
    textArea.value = url;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      toast.success('Apply link copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
      toast.error('Failed to copy link');
    } finally {
      textArea.remove();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'bg-emerald-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-gray-400';
  };

  const getScoreBadgeClass = (score: number) => {
    if (score >= 85) return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
    if (score >= 75) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    if (score >= 60) return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
    return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
  };

  const getStatusInfo = () => {
    if (isRunning) return { color: 'bg-yellow-500', text: '🟡 Running', label: 'Running' };
    if (stats?.last_run) {
      const hoursSinceRun = (Date.now() - new Date(stats.last_run).getTime()) / (1000 * 60 * 60);
      if (hoursSinceRun < 24) return { color: 'bg-green-500', text: '🟢 Active', label: 'Active' };
    }
    return { color: 'bg-red-500', text: '🔴 Idle', label: 'Idle' };
  };

  // Filtered and sorted jobs
  const filteredJobs = jobs.filter(job => {
    if (minScore > 0 && job.score < minScore) return false;
    if (remoteOnly && job.remote_type !== 'fully_remote') return false;
    if (minSalary && job.salary_min_usd < parseInt(minSalary)) return false;
    if (selectedSource !== 'all' && job.source !== selectedSource) return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.tech_stack.some(tech => tech.toLowerCase().includes(query))
      );
    }
    return true;
  }).sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    const direction = sortDirection === 'asc' ? 1 : -1;
    if (aValue < bValue) return -1 * direction;
    if (aValue > bValue) return 1 * direction;
    return 0;
  });

  const highMatchJobs = filteredJobs.filter(job => job.score >= 75);
  const sources = ['all', ...Array.from(new Set(jobs.map(j => j.source)))];

  // Calculate today's stats
  const todayRun = runs[0];
  const todayStats = {
    scraped: todayRun?.jobs_scraped || 0,
    scored: todayRun?.jobs_scored || 0,
    highMatches: todayRun?.high_matches || 0,
    emailsSent: todayRun?.emails_sent || 0,
    avgScore: jobs.length > 0 ? Math.round(jobs.reduce((acc, j) => acc + j.score, 0) / jobs.length) : 0,
  };

  // Analytics data
  const scoreDistribution = [
    { range: '0-25', count: jobs.filter(j => j.score < 25).length },
    { range: '25-50', count: jobs.filter(j => j.score >= 25 && j.score < 50).length },
    { range: '50-75', count: jobs.filter(j => j.score >= 50 && j.score < 75).length },
    { range: '75-100', count: jobs.filter(j => j.score >= 75).length },
  ];

  const sourceDistribution = Array.from(new Set(jobs.map(j => j.source))).map(source => ({
    source: source,
    count: jobs.filter(j => j.source === source).length
  }));

  const last7DaysScores = runs.slice(0, 7).reverse().map(run => ({
    date: new Date(run.run_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    avgScore: run.jobs_scored > 0 ? Math.round((run.high_matches / run.jobs_scored) * 100) : 0
  }));

  const handleSort = (column: keyof Job) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('desc');
    }
  };

  const statusInfo = getStatusInfo();

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <div className="flex items-center justify-center mb-6">
              <div className="p-4 bg-blue-500/10 rounded-full ring-2 ring-blue-500/20">
                <Brain className="w-8 h-8 text-blue-400" />
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-center mb-2 text-white">
              AI Agent Control Center
            </h1>
            <p className="text-slate-400 text-center mb-2">
              Access your autonomous job intelligence system
            </p>
            <p className="text-slate-500 text-center text-xs mb-8">
              Private Autonomous System • Powered by Supabase + OpenAI
            </p>

            {authError && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-red-300">{authError}</p>
              </div>
            )}

            {/* Demo Password Display */}
            {demoPassword && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-semibold text-emerald-400">Demo Access Generated</h3>
                </div>
                <p className="text-xs text-slate-400 mb-3">Your guest password (expires in 15 minutes):</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded font-mono text-white text-sm">
                    {demoPassword}
                  </div>
                  <Button
                    size="sm"
                    onClick={handleCopyDemoPassword}
                    className="bg-slate-700 hover:bg-slate-600"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span>Time remaining: {formatTime(timeRemaining)}</span>
                </div>
              </motion.div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="password" className="text-slate-300">Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                    placeholder="Enter agent password"
                    className="pr-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                onClick={() => handleLogin()}
                disabled={isAuthenticating || !password}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Access Dashboard
                  </>
                )}
              </Button>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-slate-500">Or</span>
                </div>
              </div>

              {/* Request Demo Access Button */}
              <Button
                onClick={handleGenerateDemoAccess}
                disabled={isGeneratingDemo}
                variant="outline"
                className="w-full bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700"
              >
                {isGeneratingDemo ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Request Demo Access
                  </>
                )}
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-[1800px] mx-auto px-4 py-8 space-y-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg shadow-blue-500/20">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  🧠 AI Job Intelligence Agent
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge className={`${statusInfo.color} text-white border-0 px-3 py-1`}>
                {statusInfo.text}
              </Badge>
              <Button
                onClick={handleRunAgent}
                disabled={isRunning}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isRunning ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Run Agent Now
                  </>
                )}
              </Button>
              <Button onClick={handleLogout} variant="outline" className="bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Last run: {stats?.last_run ? new Date(stats.last_run).toLocaleString() : 'Never'}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Next run: Tomorrow 7:00 AM
            </div>
          </div>
        </motion.div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-3"
          >
            <XCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-red-300">{error}</p>
          </motion.div>
        )}

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-4"
        >
          <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <div className="text-3xl mb-2">📥</div>
            <div className="text-4xl font-bold text-white mb-1">
              {todayStats.scraped}
            </div>
            <div className="text-sm text-slate-400">Jobs Scraped Today</div>
          </Card>

          <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <div className="text-3xl mb-2">🧠</div>
            <div className="text-4xl font-bold text-white mb-1">
              {todayStats.scored}
            </div>
            <div className="text-sm text-slate-400">Jobs Scored</div>
          </Card>

          <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-4xl font-bold text-emerald-400 mb-1">
              {todayStats.highMatches}
            </div>
            <div className="text-sm text-slate-400">High Matches (75%+)</div>
          </Card>

          <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <div className="text-3xl mb-2">📧</div>
            <div className="text-4xl font-bold text-white mb-1">
              {todayStats.emailsSent}
            </div>
            <div className="text-sm text-slate-400">Emails Sent</div>
          </Card>

          <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-4xl font-bold text-blue-400 mb-1">
              {todayStats.avgScore}%
            </div>
            <div className="text-sm text-slate-400">Average Score Today</div>
          </Card>
        </motion.div>

        {/* High-Match Jobs */}
        {highMatchJobs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                🔥 High-Match Opportunities
                <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                  {highMatchJobs.length} jobs
                </Badge>
              </h2>

              <div className="space-y-4">
                {highMatchJobs.map((job, idx) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 bg-slate-800/50 border border-slate-700 rounded-xl hover:border-blue-500/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold text-white">
                            {job.company} | {job.title}
                          </h3>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger>
                                <Badge className={getScoreBadgeClass(job.score)}>
                                  Score: {job.score}%
                                </Badge>
                              </TooltipTrigger>
                              <TooltipContent className="bg-slate-800 border-slate-700 text-white">
                                <p className="text-xs max-w-xs">{job.score_reason || 'Score based on match criteria'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          {job.is_emailed && (
                            <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
                              <Mail className="w-3 h-3 mr-1" />
                              Emailed
                            </Badge>
                          )}
                        </div>

                        {/* Score Progress Bar */}
                        <div className="mb-3">
                          <Progress value={job.score} className="h-2" />
                        </div>

                        <div className="flex items-center gap-4 text-sm text-slate-400 mb-3">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            <span className="text-white font-medium">{job.salary_original}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className="text-white">{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-white">{job.remote_type.replace('_', ' ')}</span>
                          </div>
                        </div>

                        {job.tech_stack && job.tech_stack.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="text-sm text-slate-400">Stack:</span>
                            {job.tech_stack.map((tech, idx) => (
                              <Badge key={idx} variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {job.score_reason && (
                          <div className="p-3 bg-slate-900/50 rounded-lg border border-slate-700 flex items-start gap-2">
                            <Sparkles className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <p className="text-sm text-slate-300 italic">
                              Why it matched: "{job.score_reason}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <a
                        href={job.job_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="outline" size="sm" className="bg-slate-700/50 border-slate-600 text-slate-300 hover:bg-slate-600 hover:text-white">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View Job
                        </Button>
                      </a>
                      <Button 
                        size="sm" 
                        className="bg-blue-600 hover:bg-blue-700"
                        onClick={() => handleCopyLink(job.job_url)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Link
                      </Button>
                      <Button size="sm" variant="outline" className="bg-emerald-600/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-600/20">
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Mark Applied
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* All Jobs Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                📋 All Jobs
                <Badge className="bg-slate-800 text-slate-300 border-slate-700">
                  {filteredJobs.length} jobs
                </Badge>
              </h2>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Search jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
                />
              </div>

              <select
                value={minScore}
                onChange={(e) => setMinScore(Number(e.target.value))}
                className="px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-white text-sm"
              >
                <option value={0}>All Scores</option>
                <option value={60}>Score ≥ 60%</option>
                <option value={75}>Score ≥ 75%</option>
                <option value={85}>Score ≥ 85%</option>
              </select>

              <select
                value={selectedSource}
                onChange={(e) => setSelectedSource(e.target.value)}
                className="px-3 py-2 bg-slate-900/50 border border-slate-700 rounded-md text-white text-sm"
              >
                {sources.map(source => (
                  <option key={source} value={source}>
                    {source === 'all' ? 'All Sources' : source}
                  </option>
                ))}
              </select>

              <Input
                type="number"
                placeholder="Min Salary (USD)"
                value={minSalary}
                onChange={(e) => setMinSalary(e.target.value)}
                className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500"
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="remoteOnly"
                  checked={remoteOnly}
                  onChange={(e) => setRemoteOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-800"
                />
                <Label htmlFor="remoteOnly" className="text-slate-300 cursor-pointer text-sm">
                  Remote Only
                </Label>
              </div>
            </div>

            {/* Jobs Table */}
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No jobs found matching your filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-800">
                      <th 
                        className="text-left py-3 px-4 text-sm font-semibold text-slate-300 cursor-pointer hover:text-white"
                        onClick={() => handleSort('title')}
                      >
                        Title {sortColumn === 'title' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="text-left py-3 px-4 text-sm font-semibold text-slate-300 cursor-pointer hover:text-white"
                        onClick={() => handleSort('company')}
                      >
                        Company {sortColumn === 'company' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Source</th>
                      <th 
                        className="text-left py-3 px-4 text-sm font-semibold text-slate-300 cursor-pointer hover:text-white"
                        onClick={() => handleSort('salary_min_usd')}
                      >
                        Salary (USD) {sortColumn === 'salary_min_usd' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Remote</th>
                      <th 
                        className="text-left py-3 px-4 text-sm font-semibold text-slate-300 cursor-pointer hover:text-white"
                        onClick={() => handleSort('score')}
                      >
                        Score {sortColumn === 'score' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </th>
                      <th 
                        className="text-left py-3 px-4 text-sm font-semibold text-slate-300 cursor-pointer hover:text-white"
                        onClick={() => handleSort('created_at')}
                      >
                        Created {sortColumn === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="text-left py-3 px-4 text-sm font-semibold text-slate-300">Emailed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                        <td className="py-3 px-4">
                          <div className="text-sm font-medium text-white">{job.title}</div>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-300">{job.company}</td>
                        <td className="py-3 px-4">
                          <Badge variant="secondary" className="bg-slate-800 text-slate-400 text-xs border-slate-700">
                            {job.source}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-300">{job.salary_original}</td>
                        <td className="py-3 px-4 text-sm text-slate-300">
                          {job.remote_type === 'fully_remote' ? '✓' : '—'}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getScoreColor(job.score)}`} />
                            <span className="text-sm text-white font-medium">{job.score}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-slate-300">
                          {new Date(job.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4">
                          {job.is_emailed ? (
                            <CheckCircle2 className="w-4 h-4 text-blue-400" />
                          ) : (
                            <span className="text-slate-600">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Analytics Charts */}
            {jobs.length > 0 && (
              <div className="grid md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-800">
                {/* Score Distribution */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Score Distribution
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={scoreDistribution}>
                      <XAxis dataKey="range" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                        {scoreDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={
                            entry.range === '75-100' ? '#10b981' :
                            entry.range === '50-75' ? '#3b82f6' :
                            entry.range === '25-50' ? '#eab308' : '#6b7280'
                          } />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Source Distribution */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Jobs by Source
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={sourceDistribution}>
                      <XAxis dataKey="source" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Scores over time */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Avg Score (7 Days)
                  </h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={last7DaysScores}>
                      <XAxis dataKey="date" stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <YAxis stroke="#94a3b8" style={{ fontSize: '12px' }} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1e293b',
                          border: '1px solid #334155',
                          borderRadius: '8px',
                          color: '#fff'
                        }}
                      />
                      <Line type="monotone" dataKey="avgScore" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Agent Run Logs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Activity className="w-6 h-6" />
              Agent Run History
            </h2>

            {runs.length === 0 ? (
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400">No runs yet. Click "Run Agent Now" to start.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {runs.map((run) => (
                  <Collapsible key={run.id}>
                    <div className="p-5 bg-slate-800/50 border border-slate-700 rounded-xl">
                      <CollapsibleTrigger className="w-full">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            {run.status === 'success' ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                            <span className="text-sm font-medium text-white">
                              {new Date(run.run_date).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              className={run.status === 'success'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                              }
                            >
                              {run.status}
                            </Badge>
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedRun === run.id ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </CollapsibleTrigger>

                      <div className="grid grid-cols-5 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{run.jobs_scraped}</div>
                          <div className="text-xs text-slate-400 mt-1">Scraped</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{run.jobs_inserted}</div>
                          <div className="text-xs text-slate-400 mt-1">Inserted</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white">{run.jobs_scored}</div>
                          <div className="text-xs text-slate-400 mt-1">Scored</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-emerald-400">{run.high_matches}</div>
                          <div className="text-xs text-slate-400 mt-1">High Matches</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400">{run.emails_sent}</div>
                          <div className="text-xs text-slate-400 mt-1">Emails</div>
                        </div>
                      </div>

                      <CollapsibleContent>
                        <div className="pt-4 border-t border-slate-700 space-y-2">
                          <div className="text-sm text-slate-400">
                            <span className="text-slate-300">Duration:</span> ~2.5s
                          </div>
                          {run.error_message && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-300">
                              <span className="font-semibold">Error:</span> {run.error_message}
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Email History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6 bg-slate-900/50 border-slate-800 backdrop-blur-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6" />
              Email History
            </h2>

            <div className="text-center py-12">
              <Mail className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">No emails sent yet</p>
            </div>
          </Card>
        </motion.div>

      </div>

      {/* Email Detail Modal */}
      <Dialog open={!!selectedEmail} onOpenChange={() => setSelectedEmail(null)}>
        <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedEmail?.subject}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Sent {selectedEmail && new Date(selectedEmail.sent_at).toLocaleString()} • {selectedEmail?.job_count} jobs
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg">
            <p className="text-sm text-slate-300 whitespace-pre-wrap">
              {selectedEmail?.body || 'Email content would be displayed here...'}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}