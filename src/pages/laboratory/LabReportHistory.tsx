import React, { useState } from 'react';
import { History, Search, ArrowUp, ArrowDown, Minus, Download } from 'lucide-react';
import { MOCK_LAB_REPORTS, MOCK_PATIENTS } from '../../mock-data/clinicalData';

const TREND_ICON = { UP: <ArrowUp className="h-3 w-3 text-red-500" />, DOWN: <ArrowDown className="h-3 w-3 text-emerald-500" />, STABLE: <Minus className="h-3 w-3 text-slate-400" /> };

export const LabReportHistory: React.FC = () => {
  const [search, setSearch] = useState('');
  const allReports = MOCK_LAB_REPORTS.filter(r =>
    r.testName.toLowerCase().includes(search.toLowerCase()) ||
    r.patientId.toLowerCase().includes(search.toLowerCase())
  );

  const getPatientName = (id: string) => MOCK_PATIENTS.find(p => p.id === id)?.name ?? id;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-rose-500" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Report History</h1>
            <p className="text-xs text-slate-500">Complete chronological laboratory report log</p>
          </div>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-xs font-semibold text-slate-600 rounded-lg hover:bg-slate-50">
          <Download className="h-3.5 w-3.5" /> Export CSV
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input type="text" placeholder="Search test name or patient ID…" value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-rose-400/20" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">{allReports.length} Records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50">
              <tr>
                {['Date', 'Patient', 'Test', 'Previous', 'Current', 'Unit', 'Ref Range', 'Trend', 'Status', 'Reporter', 'Action'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {allReports.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-mono text-slate-400">{r.date}</td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-slate-800">{getPatientName(r.patientId)}</div>
                    <div className="text-slate-400 font-mono">{r.patientId}</div>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-700">{r.testName}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{r.previousResult ?? '—'}</td>
                  <td className={`px-4 py-3 font-mono font-black ${r.status === 'Pending' ? 'text-slate-300' : 'text-slate-900'}`}>{r.result}</td>
                  <td className="px-4 py-3 text-slate-400">{r.unit}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{r.referenceRange}</td>
                  <td className="px-4 py-3">{r.status !== 'Pending' ? TREND_ICON[r.trend] : null}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      r.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      r.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{r.reportedBy || '—'}</td>
                  <td className="px-4 py-3">
                    {r.status === 'Completed' && (
                      <button className="text-rose-600 text-[10px] font-semibold flex items-center gap-1 hover:text-rose-700">
                        <Download className="h-3 w-3" /> PDF
                      </button>
                    )}
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
