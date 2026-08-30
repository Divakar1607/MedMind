import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, FlaskConical, BookOpen, Activity, BrainCircuit,
  Users, History, ShieldCheck, PlayCircle, Stethoscope, FileText,
  HeartPulse, Droplets, Pill, Building2, UserCheck, ClipboardList,
  TestTube, Cpu, BarChart3, Bell, ArrowLeftRight, Calendar, Syringe,
  AlertTriangle, Package, Factory, FlaskRound
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

type Role = 'super-admin' | 'doctor' | 'nurse' | 'department' | 'pharmacy' | 'laboratory';

interface NavItem { name: string; href: string; icon: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }> }

const NAV_BY_ROLE: Record<Role, { section: string; items: NavItem[] }[]> = {
  'super-admin': [
    { section: 'AI Research', items: [
      { name: 'Research Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { name: 'Model Laboratory', href: '/model-lab', icon: FlaskConical },
      { name: 'Experiment Registry', href: '/experiments', icon: BookOpen },
      { name: 'Model Monitoring', href: '/model-monitoring', icon: Activity },
      { name: 'SHAP & Explainability', href: '/ai-explain', icon: BrainCircuit },
      { name: 'Queue Simulation', href: '/simulation', icon: PlayCircle },
      { name: 'Research Analytics', href: '/research', icon: BarChart3 },
    ]},
    { section: 'Clinical Overview', items: [
      { name: 'Patient Roster', href: '/patients', icon: Users },
      { name: 'Patient Timeline', href: '/timeline', icon: History },
      { name: 'Alert Center', href: '/alerts', icon: Bell },
      { name: 'Handover', href: '/handover', icon: ArrowLeftRight },
      { name: 'Settings', href: '/settings', icon: ShieldCheck },
    ]},
  ],
  'doctor': [
    { section: 'My Workspace', items: [
      { name: 'My Patients', href: '/doctor/patients', icon: Users },
      { name: 'Follow-up & Deadlines', href: '/doctor/followup', icon: Calendar },
      { name: 'AI Medical History', href: '/doctor/ai-assistant', icon: BrainCircuit },
    ]},
    { section: 'Patient Record', items: [
      { name: 'Prescriptions', href: '/doctor/prescriptions', icon: FileText },
      { name: 'Vital Reports', href: '/doctor/vitals', icon: HeartPulse },
      { name: 'Laboratory Reports', href: '/doctor/lab-reports', icon: TestTube },
    ]},
  ],
  'nurse': [
    { section: 'My Workspace', items: [
      { name: 'Assigned Patients', href: '/nurse/patients', icon: Users },
    ]},
    { section: 'Patient Care', items: [
      { name: 'Record Vitals', href: '/nurse/vitals', icon: HeartPulse },
      { name: 'Blood Sample Records', href: '/nurse/blood-samples', icon: Droplets },
      { name: 'Prescription Updates', href: '/nurse/prescriptions', icon: Pill },
      { name: 'Allergies', href: '/nurse/allergies', icon: AlertTriangle },
      { name: 'Emergency History', href: '/nurse/emergencies', icon: Syringe },
    ]},
  ],
  'department': [
    { section: 'Department', items: [
      { name: 'Department Dashboard', href: '/department/dashboard', icon: LayoutDashboard },
      { name: 'Patient List', href: '/department/patients', icon: Users },
      { name: 'Doctor Availability', href: '/department/doctors', icon: Stethoscope },
      { name: 'Patient Assignments', href: '/department/assignments', icon: UserCheck },
      { name: 'Staff Overview', href: '/department/staff', icon: ClipboardList },
    ]},
  ],
  'pharmacy': [
    { section: 'Pharmacy', items: [
      { name: 'Pharmacy Dashboard', href: '/pharmacy/dashboard', icon: LayoutDashboard },
      { name: 'Medicine Inventory', href: '/pharmacy/medicines', icon: Package },
      { name: 'Manufacturer Info', href: '/pharmacy/manufacturers', icon: Factory },
      { name: 'Patient Medication Context', href: '/pharmacy/patient-context', icon: ClipboardList },
      { name: 'Allergy Alerts', href: '/pharmacy/allergy-alerts', icon: AlertTriangle },
    ]},
  ],
  'laboratory': [
    { section: 'Laboratory', items: [
      { name: 'Laboratory Dashboard', href: '/lab/dashboard', icon: LayoutDashboard },
      { name: 'Available Tests', href: '/lab/tests', icon: FlaskRound },
      { name: 'Equipment', href: '/lab/equipment', icon: Cpu },
      { name: 'Patient Reports', href: '/lab/reports', icon: FileText },
      { name: 'Report History', href: '/lab/history', icon: History },
    ]},
  ],
};

const ROLE_ACCENT: Record<Role, string> = {
  'super-admin': 'text-purple-700 bg-purple-50 border-purple-100',
  'doctor':      'text-brand-700 bg-brand-50 border-brand-100',
  'nurse':       'text-cyan-700 bg-cyan-50 border-cyan-100',
  'department':  'text-blue-700 bg-blue-50 border-blue-100',
  'pharmacy':    'text-emerald-700 bg-emerald-50 border-emerald-100',
  'laboratory':  'text-rose-700 bg-rose-50 border-rose-100',
};

interface SidebarProps { userRole: string }

export const Sidebar: React.FC<SidebarProps> = ({ userRole }) => {
  const role = (userRole || 'doctor') as Role;
  const sections = NAV_BY_ROLE[role] ?? NAV_BY_ROLE['doctor'];
  const accent = ROLE_ACCENT[role] ?? ROLE_ACCENT['doctor'];

  return (
    <div className="w-64 bg-surface border-r border-slate-200 flex flex-col shadow-sm z-10 hidden md:flex">
      <div className="h-16 flex items-center px-6 border-b border-slate-200">
        <div className="flex items-center gap-2.5 text-slate-900">
          <img src="/logo.jpg" alt="MedMind AI" className="h-7 w-7 rounded-md object-cover border border-slate-200" />
          <div className="flex flex-col">
            <span className="text-base font-bold tracking-tight leading-none">MedMind AI</span>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5">Clinical Intelligence</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-3">
        {sections.map((section) => (
          <div key={section.section} className="mb-3">
            <div className="px-4 mb-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{section.section}</p>
            </div>
            <nav className="space-y-0.5 px-3">
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) => cn(
                    'group flex items-center px-3 py-2 text-xs font-semibold rounded-md transition-colors',
                    isActive ? `${accent} border` : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  <item.icon className="mr-2.5 h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <ShieldCheck className="h-4 w-4 text-emerald-600 flex-shrink-0" />
          <span>GroupKFold Leakage-Free</span>
        </div>
      </div>
    </div>
  );
};
