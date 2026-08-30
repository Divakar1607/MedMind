import React, { useState } from 'react';
import { 
  Shield, 
  Stethoscope, 
  Building2, 
  Pill, 
  TestTube, 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Lock, 
  User, 
  Activity,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

interface LoginProps {
  onLogin: (role: string, user: string) => void;
}

interface RoleConfig {
  id: string;
  badge: string;
  title: string;
  loginHeading: string;
  defaultUsername: string;
  roleTitle: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  color: string;
  badgeBg: string;
}

const ROLES: RoleConfig[] = [
  {
    id: 'super-admin',
    badge: 'SUPER ADMIN',
    title: 'Super Admin',
    loginHeading: 'Super Admin Login',
    defaultUsername: 'admin.governance',
    roleTitle: 'Platform Administration & AI Governance',
    icon: Shield,
    description: 'Platform administration, model governance, system monitoring and access control.',
    color: 'text-purple-700 bg-purple-50 border-purple-200 hover:border-purple-300',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    id: 'doctor',
    badge: 'DOCTOR',
    title: 'Doctor',
    loginHeading: 'Doctor Login',
    defaultUsername: 'dr.arunkumar',
    roleTitle: 'ICU & Attending Physician Intelligence',
    icon: Stethoscope,
    description: 'Patient intelligence, clinical trends, AI predictions, explanations and AI-assisted clinical review.',
    color: 'text-brand-700 bg-brand-50 border-brand-200 hover:border-brand-300',
    badgeBg: 'bg-brand-100 text-brand-800 border-brand-200'
  },
  {
    id: 'department',
    badge: 'DEPARTMENT',
    title: 'Department',
    loginHeading: 'Department Login',
    defaultUsername: 'icu.operations',
    roleTitle: 'Department Workload & Clinical Coordination',
    icon: Building2,
    description: 'Department-level patient intelligence, workload and cross-department clinical coordination.',
    color: 'text-blue-700 bg-blue-50 border-blue-200 hover:border-blue-300',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    id: 'pharmacy',
    badge: 'PHARMACY',
    title: 'Pharmacy',
    loginHeading: 'Pharmacy Login',
    defaultUsername: 'pharmacy.lead',
    roleTitle: 'Medication Context & Clinical Orders',
    icon: Pill,
    description: 'Medication-related records, pharmacy information and AI-assisted clinical context.',
    color: 'text-emerald-700 bg-emerald-50 border-emerald-200 hover:border-emerald-300',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  },
  {
    id: 'laboratory',
    badge: 'LABORATORY',
    title: 'Laboratory',
    loginHeading: 'Laboratory Login',
    defaultUsername: 'lab.biomarkers',
    roleTitle: 'Diagnostic Observations & Lab Baselines',
    icon: TestTube,
    description: 'Laboratory observations, results, trends and integration with patient intelligence.',
    color: 'text-rose-700 bg-rose-50 border-rose-200 hover:border-rose-300',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200'
  }
];

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'SELECT_ROLE' | 'ENTER_CREDENTIALS'>('SELECT_ROLE');
  const [selectedRole, setSelectedRole] = useState<RoleConfig | null>(null);
  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSelectRole = (role: RoleConfig) => {
    setSelectedRole(role);
    setUsername(role.defaultUsername);
    setPassword('password123');
    setErrorMsg(null);
    setStep('ENTER_CREDENTIALS');
  };

  const handleBackToRoles = () => {
    setStep('SELECT_ROLE');
    setErrorMsg(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!username.trim()) {
      setErrorMsg('Username is required.');
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Password is required.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (selectedRole) {
        onLogin(selectedRole.title, username);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col justify-center py-10 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-900">
      
      {/* Branding Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-xl text-center">
        <div className="flex justify-center items-center gap-2 text-slate-900">
          <Activity className="h-8 w-8 text-brand-600" />
          <span className="text-2xl font-bold tracking-tight text-slate-900">MediAI</span>
        </div>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 mt-0.5">
          Clinical Intelligence Platform
        </p>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
          Secure Clinical Access
        </h1>
        <p className="mt-1 text-xs text-slate-600">
          Select your role to continue to the AI-powered clinical intelligence environment.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className="bg-white py-7 px-6 shadow-sm border border-slate-200 sm:rounded-xl sm:px-8">
          
          {/* STEP 1: SELECT YOUR ROLE */}
          {step === 'SELECT_ROLE' && (
            <div className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h2 className="text-base font-bold text-slate-900">Select Your Role</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Choose your authorized clinical access portal below.
                </p>
              </div>

              <div className="space-y-2.5">
                {ROLES.map((r) => {
                  const Icon = r.icon;
                  return (
                    <button
                      key={r.id}
                      type="button"
                      onClick={() => handleSelectRole(r)}
                      className="w-full flex items-center gap-3.5 p-3.5 rounded-lg border border-slate-200 hover:border-brand-500 bg-white hover:bg-slate-50/80 transition-all text-left group shadow-2xs"
                    >
                      <div className={`p-2.5 rounded-md border ${r.color} shrink-0`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-brand-700 transition-colors">
                            {r.title}
                          </h3>
                          <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-brand-600 transition-colors" />
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 leading-snug">
                          {r.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-200 text-center">
                <p className="text-[11px] text-slate-500 font-mono">
                  Secure • Role-based • Clinical Intelligence
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: USERNAME + PASSWORD LOGIN FORM */}
          {step === 'ENTER_CREDENTIALS' && selectedRole && (
            <div className="space-y-5">
              <button
                type="button"
                onClick={handleBackToRoles}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-700 hover:text-brand-800 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Change role</span>
              </button>

              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold tracking-wider border mb-1 ${selectedRole.badgeBg}`}>
                    {selectedRole.badge}
                  </span>
                  <h2 className="text-lg font-bold text-slate-900 leading-tight">
                    {selectedRole.loginHeading}
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Sign in to Clinical Intelligence
                  </p>
                </div>
                <div className={`p-2.5 rounded-lg border ${selectedRole.color}`}>
                  <selectedRole.icon className="h-6 w-6" />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200 text-xs font-medium text-red-700">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-xs font-semibold text-slate-700 mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      className="block w-full rounded-md border border-slate-300 py-2 pl-9 pr-3 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-xs font-semibold text-slate-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-4 w-4 text-slate-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="block w-full rounded-md border border-slate-300 py-2 pl-9 pr-9 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 bg-white font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-3.5 w-3.5"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => alert("Password reset requested. Please contact system administrator.")}
                    className="text-brand-700 hover:text-brand-800 font-semibold"
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-xs text-sm font-bold text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors disabled:opacity-50"
                >
                  {isLoading ? 'Signing in...' : 'SIGN IN'}
                </button>
              </form>

              <div className="pt-3 border-t border-slate-200 text-center space-y-1">
                <p className="text-xs font-bold text-slate-800 flex items-center justify-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  Authorized Access Only
                </p>
                <p className="text-[11px] text-slate-500">
                  Access to patient and AI-generated clinical information is restricted according to user role and permissions.
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
