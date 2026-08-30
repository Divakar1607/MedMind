import React from 'react';
import { Users, UserCheck, AlertTriangle, Activity } from 'lucide-react';
import { MOCK_PATIENTS, MOCK_DOCTORS, MOCK_ASSIGNMENTS } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';
import type { PriorityLevel } from '../../types/clinical';

export const DeptDashboard: React.FC = () => {
  const priorityCounts: Record<PriorityLevel, number> = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };
  MOCK_PATIENTS.forEach(p => priorityCounts[p.priority]++);

  const availableDoctors = MOCK_DOCTORS.filter(d => d.availability === 'Available').length;
  const assignedDoctors = MOCK_DOCTORS.filter(d => d.availability === 'Assigned').length;
  const unassignedPts = MOCK_ASSIGNMENTS.filter(a => !a.assignedDoctor).length;
  const aiMismatches = MOCK_ASSIGNMENTS.filter(a => a.assignedDoctor !== a.aiRecommendedDoctor && a.aiRecommendedDoctor).length;

  const STATS = [
    { label: 'Total Patients', value: MOCK_PATIENTS.length, icon: Users, color: 'text-blue-600 bg-blue-50 border-blue-100' },
    { label: 'Doctors Available', value: availableDoctors, icon: UserCheck, color: 'text-emerald-600 bg-emerald-50 border-emerald-100' },
    { label: 'Doctors Assigned', value: assignedDoctors, icon: Activity, color: 'text-brand-600 bg-brand-50 border-brand-100' },
    { label: 'AI Mismatch Alerts', value: aiMismatches, icon: AlertTriangle, color: 'text-amber-600 bg-amber-50 border-amber-100' },
  ];

  const PRIORITY_CONFIG = [
    { level: 'CRITICAL' as PriorityLevel, color: 'bg-red-500', label: 'Critical' },
    { level: 'HIGH' as PriorityLevel, color: 'bg-orange-500', label: 'High' },
    { level: 'MEDIUM' as PriorityLevel, color: 'bg-amber-500', label: 'Medium' },
    { level: 'LOW' as PriorityLevel, color: 'bg-emerald-500', label: 'Low' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Department Dashboard</h1>
        <p className="text-xs text-slate-500 mt-0.5">ICU Operations — Cardiology, Neurology, General Medicine, Pulmonology, Orthopedics</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className={`rounded-xl border p-4 ${s.color}`}>
            <div className="flex items-center gap-2 mb-2">
              <s.icon className="h-4 w-4" />
              <span className="text-xs font-semibold">{s.label}</span>
            </div>
            <div className="text-3xl font-black">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Priority Breakdown */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Priority Breakdown</h2>
        <div className="space-y-2.5">
          {PRIORITY_CONFIG.map(({ level, color, label }) => (
            <div key={level} className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-600 w-16">{label}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div className={`h-full rounded-full ${color} transition-all`}
                  style={{ width: `${(priorityCounts[level] / MOCK_PATIENTS.length) * 100}%` }} />
              </div>
              <span className="text-xs font-black text-slate-700 w-4 text-right">{priorityCounts[level]}</span>
              <PriorityBadge priority={level} />
            </div>
          ))}
        </div>
      </div>

      {/* AI Assignment Alerts */}
      {aiMismatches > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <h3 className="text-sm font-bold text-amber-800">AI Recommends Reassignment</h3>
          </div>
          {MOCK_ASSIGNMENTS.filter(a => a.assignedDoctor !== a.aiRecommendedDoctor && a.aiRecommendedDoctor).map(a => (
            <div key={a.patientId} className="bg-white rounded-lg border border-amber-200 px-4 py-3 text-xs">
              <div className="flex items-center gap-2 mb-1">
                <PriorityBadge priority={a.priority} />
                <span className="font-bold text-slate-800">{a.patientName}</span>
              </div>
              <div className="text-slate-500">Currently: <strong className="text-slate-700">{a.assignedDoctor ?? 'Unassigned'}</strong></div>
              <div className="text-amber-700">AI Recommends: <strong>{a.aiRecommendedDoctor}</strong> <span className="text-slate-400">(based on specialty match)</span></div>
            </div>
          ))}
          <p className="text-[10px] text-amber-700">AI-Assisted recommendations. All assignments must be approved by department head.</p>
        </div>
      )}

      {/* Recent Patients */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Patient Overview</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50">
              <tr>
                {['Patient', 'Department', 'Priority', 'Assigned Doctor', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_PATIENTS.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold text-slate-800">{p.name} <span className="font-mono text-slate-400">{p.id}</span></td>
                  <td className="px-4 py-3 text-slate-600">{p.department}</td>
                  <td className="px-4 py-3"><PriorityBadge priority={p.priority} /></td>
                  <td className="px-4 py-3 text-slate-600">{p.assignedDoctor}</td>
                  <td className="px-4 py-3 text-slate-600">{p.latestVitalStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
