import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { 
  Eye, 
  EyeOff, 
  RefreshCw, 
  Download, 
  Mail, 
  Building2, 
  Calendar,
  MessageSquare,
  Lock,
  LogOut,
  CheckCircle2,
  Clock,
  XCircle,
  Tag,
  Lightbulb
} from 'lucide-react';
import { motion } from 'motion/react';
import { projectId, publicAnonKey } from '/utils/supabase/info';

interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  updatedAt?: string;
}

interface Feedback {
  id: string;
  name: string;
  email: string;
  category: string;
  message: string;
  submittedAt: string;
  status: 'new' | 'reviewed' | 'resolved' | 'closed';
  updatedAt?: string;
}

type TabType = 'leads' | 'feedback';

export function Admin() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const [activeTab, setActiveTab] = useState<TabType>('leads');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Try to get password from session storage on mount
  useEffect(() => {
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      setPassword(savedPassword);
      handleLogin(savedPassword);
    }
  }, []);

  const handleLogin = async (pwd?: string) => {
    const passwordToUse = pwd || password;
    setIsAuthenticating(true);
    setAuthError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/admin/leads`,
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
        sessionStorage.removeItem('adminPassword');
        return;
      }

      // Save password to session storage
      sessionStorage.setItem('adminPassword', passwordToUse);
      setIsAuthenticated(true);
      setLeads(result.leads || []);
      
      // Also fetch feedback
      fetchFeedback(passwordToUse);
    } catch (err) {
      console.error('Authentication error:', err);
      setAuthError('Failed to authenticate. Please try again.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminPassword');
    setIsAuthenticated(false);
    setPassword('');
    setLeads([]);
    setFeedback([]);
  };

  const fetchLeads = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/admin/leads`,
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
        if (response.status === 401) {
          handleLogout();
          return;
        }
        throw new Error(result.error || 'Failed to fetch leads');
      }

      setLeads(result.leads || []);
    } catch (err) {
      console.error('Error fetching leads:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch leads');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFeedback = async (pwd?: string) => {
    const passwordToUse = pwd || password;
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/admin/feedback`,
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
        if (response.status === 401) {
          handleLogout();
          return;
        }
        throw new Error(result.error || 'Failed to fetch feedback');
      }

      setFeedback(result.feedback || []);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch feedback');
    } finally {
      setIsLoading(false);
    }
  };

  const updateLeadStatus = async (leadId: string, newStatus: Lead['status']) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/admin/update-lead`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ 
            password,
            leadId,
            status: newStatus 
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update lead');
      }

      // Update local state
      setLeads(leads.map(lead => 
        lead.id === leadId 
          ? { ...lead, status: newStatus, updatedAt: new Date().toISOString() }
          : lead
      ));
    } catch (err) {
      console.error('Error updating lead:', err);
      alert('Failed to update lead status');
    }
  };

  const updateFeedbackStatus = async (feedbackId: string, newStatus: Feedback['status']) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-1bf47000/admin/update-feedback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ 
            password,
            feedbackId,
            status: newStatus 
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update feedback');
      }

      // Update local state
      setFeedback(feedback.map(fb => 
        fb.id === feedbackId 
          ? { ...fb, status: newStatus, updatedAt: new Date().toISOString() }
          : fb
      ));
    } catch (err) {
      console.error('Error updating feedback:', err);
      alert('Failed to update feedback status');
    }
  };

  const exportToCSV = () => {
    const filteredLeads = filterStatus === 'all' 
      ? leads 
      : leads.filter(lead => lead.status === filterStatus);

    const headers = ['Name', 'Email', 'Company', 'Message', 'Status', 'Submitted At'];
    const rows = filteredLeads.map(lead => [
      lead.name,
      lead.email,
      lead.company,
      lead.message,
      lead.status,
      new Date(lead.submittedAt).toLocaleString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'contacted':
        return <Mail className="w-4 h-4 text-yellow-600" />;
      case 'qualified':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'closed':
        return <XCircle className="w-4 h-4 text-neutral-400" />;
    }
  };

  const getStatusColor = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'contacted':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'qualified':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'closed':
        return 'bg-neutral-50 text-neutral-600 border-neutral-200';
    }
  };

  const getFeedbackStatusColor = (status: Feedback['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'reviewed':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'resolved':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'closed':
        return 'bg-neutral-50 text-neutral-600 border-neutral-200';
    }
  };

  const filteredLeads = filterStatus === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filterStatus);

  const statusCounts = {
    all: leads.length,
    new: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    closed: leads.filter(l => l.status === 'closed').length,
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-neutral-100 px-4">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-white border border-neutral-200 shadow-lg p-8 rounded-lg">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-2xl font-semibold text-center mb-2 tracking-tight">
              Admin Access
            </h1>
            <p className="text-sm text-neutral-600 text-center mb-6">
              Enter your admin password to view and manage leads
            </p>

            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 border border-neutral-300 rounded focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                    placeholder="Enter admin password"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {authError && (
                  <p className="text-red-600 text-sm mt-2">{authError}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isAuthenticating || !password}
                className="w-full px-4 py-2.5 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAuthenticating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  'Access Dashboard'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate('/')}
                className="text-sm text-neutral-600 hover:text-neutral-900"
              >
                ← Back to Home
              </button>
            </div>
          </div>

          <p className="text-xs text-neutral-500 text-center mt-4">
            Default password: admin123 (configure ADMIN_PASSWORD in environment)
          </p>
        </motion.div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight mb-2">Admin Dashboard</h1>
          <p className="text-neutral-600">Manage demo requests, feedback, and track status</p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-2 rounded"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => { setActiveTab('leads'); setFilterStatus('all'); }}
          className={`px-6 py-2.5 border rounded-lg transition-all font-medium ${
            activeTab === 'leads'
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
          }`}
        >
          Demo Requests ({leads.length})
        </button>
        <button
          onClick={() => { setActiveTab('feedback'); setFilterStatus('all'); }}
          className={`px-6 py-2.5 border rounded-lg transition-all font-medium ${
            activeTab === 'feedback'
              ? 'border-blue-600 bg-blue-50 text-blue-700'
              : 'border-neutral-200 hover:border-neutral-300 bg-white text-neutral-700'
          }`}
        >
          Feedback ({feedback.length})
        </button>
      </div>

      {/* Stats Cards */}
      {activeTab === 'leads' && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {(['all', 'new', 'contacted', 'qualified', 'closed'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`p-4 border rounded-lg transition-all ${
                filterStatus === status
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-neutral-200 hover:border-neutral-300 bg-white'
              }`}
            >
              <div className="text-2xl font-bold mb-1">
                {statusCounts[status]}
              </div>
              <div className="text-sm text-neutral-600 capitalize">
                {status === 'all' ? 'Total Leads' : status}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={activeTab === 'leads' ? fetchLeads : fetchFeedback}
          disabled={isLoading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
        {activeTab === 'leads' && (
          <button
            onClick={exportToCSV}
            className="px-4 py-2 border border-neutral-300 text-neutral-700 rounded hover:bg-neutral-50 transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Leads Table */}
      {activeTab === 'leads' && (
        filteredLeads.length === 0 ? (
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-12 text-center">
            <p className="text-neutral-600">
              {leads.length === 0 
                ? 'No leads yet. When users request demo access, they will appear here.'
                : `No ${filterStatus} leads found.`
              }
            </p>
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <Mail className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-neutral-900">{lead.name}</div>
                            <a 
                              href={`mailto:${lead.email}`}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {lead.email}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                          <span className="text-sm text-neutral-700">
                            {lead.company || '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2 max-w-xs">
                          <MessageSquare className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-neutral-700 line-clamp-2">
                            {lead.message || 'No message'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                          <span className="text-sm text-neutral-700">
                            {new Date(lead.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={lead.status}
                          onChange={(e) => updateLeadStatus(lead.id, e.target.value as Lead['status'])}
                          className={`px-3 py-1.5 border rounded-full text-xs font-medium cursor-pointer ${getStatusColor(lead.status)}`}
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="qualified">Qualified</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}

      {/* Feedback Table */}
      {activeTab === 'feedback' && (
        feedback.length === 0 ? (
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-12 text-center">
            <p className="text-neutral-600">
              {feedback.length === 0 
                ? 'No feedback yet. When users submit feedback, it will appear here.'
                : `No ${filterStatus} feedback found.`
              }
            </p>
          </div>
        ) : (
          <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Message
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-neutral-700 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {feedback.map((fb) => (
                    <tr key={fb.id} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2">
                          <Mail className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <div className="font-medium text-neutral-900">{fb.name}</div>
                            <a 
                              href={`mailto:${fb.email}`}
                              className="text-sm text-blue-600 hover:underline"
                            >
                              {fb.email}
                            </a>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                          <span className="text-sm text-neutral-700">
                            {fb.category || '—'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-start gap-2 max-w-xs">
                          <MessageSquare className="w-4 h-4 text-neutral-400 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-neutral-700 line-clamp-2">
                            {fb.message || 'No message'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                          <span className="text-sm text-neutral-700">
                            {new Date(fb.submittedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={fb.status}
                          onChange={(e) => updateFeedbackStatus(fb.id, e.target.value as Feedback['status'])}
                          className={`px-3 py-1.5 border rounded-full text-xs font-medium cursor-pointer ${getFeedbackStatusColor(fb.status)}`}
                        >
                          <option value="new">New</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )
      )}
    </div>
  );
}