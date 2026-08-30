import React, { useState } from 'react';
import { Search, Calendar } from 'lucide-react';
import { MOCK_PATIENTS } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';
import type { PriorityLevel } from '../../types/clinical';

export const DeptPatients: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState<PriorityLevel | 'ALL'>('ALL');

  const patients = MOCK_PATIENTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase());
    const matchPriority = filterPriority === 'ALL' || p.priority === filterPriority;
    return matchSearch && matchPriority;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Patient List</h1>
        <p className="text-xs text-slate-500 mt-0.5">All patients across departments — {MOCK_PATIENTS.length} total</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search patient name or ID…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-400/20" />
        </div>
        <div className="flex gap-1">
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(p => (
            <button key={p} onClick={() => setFilterPriority(p)}
              className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all ${filterPriority === p ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'}`}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Patient', 'Department', 'Room', 'Priority', 'Assigned Doctor', 'Next Check-up', 'Lab Status'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {patients.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-900">{p.name}</div>
                    <div className="text-slate-400 font-mono">{p.id} · {p.age}y {p.gender[0]}</div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.department}</td>
                  <td className="px-4 py-3 text-slate-600 font-mono">{p.room}</td>
                  <td className="px-4 py-3"><PriorityBadge priority={p.priority} /></td>
                  <td className="px-4 py-3 text-slate-600">{p.assignedDoctor}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-slate-500"><Calendar className="h-3 w-3" />{p.nextCheckup}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      p.latestLabStatus === 'Results Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>{p.latestLabStatus}</span>
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
