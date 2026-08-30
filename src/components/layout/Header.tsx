import React from 'react';
import { Bell, Search, User, ShieldAlert, Sparkles, LogOut } from 'lucide-react';

interface HeaderProps {
  userRole?: string;
  userName?: string;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userRole = 'Doctor',
  userName = 'Dr. Arun Kumar',
  onLogout
}) => {
  return (
    <header className="h-16 bg-surface border-b border-slate-200 flex items-center justify-between px-6 z-10 shadow-xs">
      <div className="flex items-center gap-4 flex-1">
        <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-bold text-slate-900 shadow-2xs">
          <img src="/logo.jpg" alt="MedMind AI Logo" className="h-4 w-4 rounded-xs object-contain" />
          <span>MedMind AI Clinical Intelligence</span>
        </div>
        <div className="relative w-full max-w-xs hidden lg:block">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-slate-900 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-brand-500 sm:text-sm bg-slate-50 transition-shadow"
            placeholder="Search patient ID (e.g. P0001)..."
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200 rounded text-xs text-amber-800">
          <ShieldAlert className="h-3.5 w-3.5 text-amber-600" />
          <span>Research Prototype — Human Review Required</span>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-slate-500 transition-colors rounded-full hover:bg-slate-100">
          <span className="sr-only">View notifications</span>
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-risk-critical ring-2 ring-white" />
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 pl-4 ml-2">
          <div className="flex flex-col items-end hidden sm:flex">
            <span className="text-sm font-semibold text-slate-900 leading-none">{userName}</span>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200 mt-1">
              {userRole}
            </span>
          </div>
          <div className="h-8 w-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600 border border-brand-200">
            <User className="h-4 w-4" />
          </div>

          {onLogout && (
            <button
              onClick={onLogout}
              title="Sign Out"
              className="flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-red-700 hover:bg-red-50 p-1.5 rounded border border-slate-200 hover:border-red-200 transition-colors ml-1"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden lg:inline">Sign Out</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
