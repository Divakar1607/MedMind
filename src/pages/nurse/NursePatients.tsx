import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Clock, AlertTriangle } from 'lucide-react';
import { MOCK_PATIENTS } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

export const NursePatients: React.FC = () => {
  const [search, setSearch] = useState('');
  // Nurses see patients across all assigned nurses — all patients in scope
  const patients = MOCK_PATIENTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Assigned Patients</h1>
          <p className="text-xs text-slate-500 mt-0.5">Nurse Station — {patients.length} patients on your ward</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-cyan-400/20 shadow-sm" />
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Patient', 'Department', 'Priority', 'Latest Vitals', 'Assigned Doctor', 'Last Update', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {patients.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/50 group">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-bold text-[10px] shrink-0">
                        {p.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{p.name}</div>
                        <div className="text-slate-400 font-mono">{p.id} · Room {p.room}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.department}</td>
                  <td className="px-4 py-3"><PriorityBadge priority={p.priority} /></td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${p.latestVitalStatus === 'Deteriorating' ? 'text-red-600' : p.latestVitalStatus === 'Improving' ? 'text-emerald-600' : 'text-slate-600'}`}>
                      {p.latestVitalStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{p.assignedDoctor}</td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1 text-slate-400"><Clock className="h-3 w-3" />{p.lastUpdateTime}</span>
                  </td>
                  <td className="px-4 py-3">
                    <Link to={`/nurse/patients/${p.id}`} className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                      View <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {patients.some(p => p.priority === 'CRITICAL') && (
        <div className="flex items-start gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 animate-pulse" />
          <span><strong>Critical alert:</strong> One or more patients are at CRITICAL priority. Immediate nursing attention required.</span>
        </div>
      )}
    </div>
  );
};
