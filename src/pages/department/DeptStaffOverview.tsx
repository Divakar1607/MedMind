import React from 'react';
import { ClipboardList } from 'lucide-react';
import { MOCK_DOCTORS } from '../../mock-data/clinicalData';
import type { DoctorStaff } from '../../types/clinical';

const LEVELS: DoctorStaff['level'][] = ['Consultant', 'Senior Resident', 'Junior Resident', 'Intern'];
const LEVEL_CONFIG = {
  Consultant: { bg: 'bg-purple-50 border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-800 border-purple-200' },
  'Senior Resident': { bg: 'bg-brand-50 border-brand-200', text: 'text-brand-700', badge: 'bg-brand-100 text-brand-800 border-brand-200' },
  'Junior Resident': { bg: 'bg-cyan-50 border-cyan-200', text: 'text-cyan-700', badge: 'bg-cyan-100 text-cyan-800 border-cyan-200' },
  Intern: { bg: 'bg-slate-50 border-slate-200', text: 'text-slate-600', badge: 'bg-slate-100 text-slate-700 border-slate-200' },
};

export const DeptStaffOverview: React.FC = () => {
  const byLevel: Record<string, typeof MOCK_DOCTORS> = {};
  LEVELS.forEach(l => { byLevel[l] = MOCK_DOCTORS.filter(d => d.level === l); });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ClipboardList className="h-5 w-5 text-blue-500" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Staff Overview</h1>
          <p className="text-xs text-slate-500">Medical staff breakdown by seniority level</p>
        </div>
      </div>

      {/* Level Count Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {LEVELS.map(level => {
          const cfg = LEVEL_CONFIG[level];
          const count = byLevel[level].length;
          return (
            <div key={level} className={`rounded-xl border p-4 ${cfg.bg}`}>
              <p className={`text-xs font-bold ${cfg.text} mb-1`}>{level}</p>
              <p className={`text-4xl font-black ${cfg.text}`}>{count}</p>
              <p className="text-xs text-slate-400 mt-1">staff members</p>
            </div>
          );
        })}
      </div>

      {/* Per-level detail */}
      {LEVELS.map(level => {
        const staff = byLevel[level];
        const cfg = LEVEL_CONFIG[level];
        if (staff.length === 0) return null;
        return (
          <div key={level} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className={`px-5 py-3 border-b border-slate-100`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-sm font-bold ${cfg.text}`}>{level}s</h2>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.badge}`}>{staff.length}</span>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-slate-50">
                  <tr>
                    {['Name', 'Specialization', 'Department', 'Patients', 'Availability'].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 font-semibold text-slate-500">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {staff.map(d => (
                    <tr key={d.id} className="hover:bg-slate-50/50">
                      <td className="px-4 py-3 font-semibold text-slate-900">{d.name}</td>
                      <td className="px-4 py-3 text-slate-600">{d.specialization}</td>
                      <td className="px-4 py-3 text-slate-600">{d.department}</td>
                      <td className="px-4 py-3 text-slate-700 font-mono font-bold">{d.currentPatientCount}</td>
                      <td className="px-4 py-3">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          d.availability === 'Available' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                          d.availability === 'Assigned' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                          'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>{d.availability}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
};
