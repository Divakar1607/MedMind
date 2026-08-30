import React from 'react';
import { FlaskConical, Cpu, FileText, Clock } from 'lucide-react';
import { MOCK_LAB_TESTS, MOCK_EQUIPMENT, MOCK_LAB_REPORTS } from '../../mock-data/clinicalData';

export const LabDashboard: React.FC = () => {
  const available = MOCK_LAB_TESTS.filter(t => t.availability === 'Available').length;
  const inUse = MOCK_EQUIPMENT.filter(e => e.status === 'In Use').length;
  const maintenance = MOCK_EQUIPMENT.filter(e => e.status === 'Maintenance' || e.status === 'Offline').length;
  const pending = MOCK_LAB_REPORTS.filter(r => r.status === 'Pending').length;
  const completed = MOCK_LAB_REPORTS.filter(r => r.status === 'Completed').length;

  const STATS = [
    { label: 'Available Tests', value: available, color: 'text-rose-700 bg-rose-50 border-rose-100', icon: FlaskConical },
    { label: 'Equipment In Use', value: inUse, color: 'text-blue-700 bg-blue-50 border-blue-100', icon: Cpu },
    { label: 'Under Maintenance', value: maintenance, color: 'text-amber-700 bg-amber-50 border-amber-100', icon: Cpu },
    { label: 'Reports Pending', value: pending, color: 'text-orange-700 bg-orange-50 border-orange-100', icon: Clock },
  ];

  // Group tests by category
  const byCategory: Record<string, number> = {};
  MOCK_LAB_TESTS.forEach(t => { byCategory[t.category] = (byCategory[t.category] ?? 0) + 1; });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Laboratory Dashboard</h1>
        <p className="text-xs text-slate-500 mt-0.5">Clinical laboratory overview — tests, equipment, and reports</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(s => (
          <div key={s.label} className={`rounded-xl border p-4 ${s.color}`}>
            <div className="flex items-center gap-2 mb-2"><s.icon className="h-4 w-4" /><span className="text-xs font-semibold">{s.label}</span></div>
            <div className="text-3xl font-black">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Equipment Status */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Equipment Status</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {MOCK_EQUIPMENT.map(eq => (
            <div key={eq.id} className={`rounded-lg border p-3 text-xs ${
              eq.status === 'Available' ? 'bg-emerald-50 border-emerald-200' :
              eq.status === 'In Use' ? 'bg-blue-50 border-blue-200' :
              eq.status === 'Maintenance' ? 'bg-amber-50 border-amber-200' :
              'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-slate-900">{eq.name}</span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full border ${
                  eq.status === 'Available' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' :
                  eq.status === 'In Use' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                  eq.status === 'Maintenance' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                  'bg-slate-100 text-slate-500 border-slate-200'
                }`}>{eq.status}</span>
              </div>
              <div className="text-slate-500">{eq.type}</div>
              <div className="mt-1 text-slate-400">Tests: {eq.supportedTests.slice(0, 2).join(', ')}{eq.supportedTests.length > 2 ? '…' : ''}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Category Summary */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Tests by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {Object.entries(byCategory).map(([cat, count]) => (
            <div key={cat} className="bg-rose-50 border border-rose-100 rounded-lg px-3 py-2.5 text-xs">
              <div className="font-semibold text-rose-700">{cat}</div>
              <div className="text-2xl font-black text-rose-800 mt-1">{count}</div>
              <div className="text-rose-500 text-[10px]">tests</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Recent Results — Completed {completed} · Pending {pending}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50">
              <tr>
                {['Test', 'Patient', 'Result', 'Reference', 'Date', 'Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_LAB_REPORTS.slice(0, 5).map(r => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold text-slate-800">{r.testName}</td>
                  <td className="px-4 py-3 text-slate-500 font-mono">{r.patientId}</td>
                  <td className="px-4 py-3 font-mono font-bold text-slate-700">{r.result} {r.unit}</td>
                  <td className="px-4 py-3 text-slate-400 font-mono">{r.referenceRange}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{r.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      r.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      r.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>{r.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
