import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Minus, Download, Clock } from 'lucide-react';
import { MOCK_PATIENTS, getPatientLabReports } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

const TREND_ICON = { UP: <ArrowUp className="h-3 w-3 text-red-500" />, DOWN: <ArrowDown className="h-3 w-3 text-emerald-500" />, STABLE: <Minus className="h-3 w-3 text-slate-400" /> };
const STATUS_STYLE = { Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200', Pending: 'bg-amber-50 text-amber-700 border-amber-200', Processing: 'bg-blue-50 text-blue-700 border-blue-200' };

export const DoctorLabReports: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');
  const myPatients = MOCK_PATIENTS.filter(p => p.assignedDoctor === 'Dr. Arun Kumar');
  const reports = getPatientLabReports(selectedPatientId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Laboratory Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">Patient diagnostic test results — latest first</p>
        </div>
        <button className="flex items-center gap-1.5 px-3 py-2 border border-slate-200 text-xs font-semibold text-slate-600 rounded-lg hover:bg-slate-50">
          <Download className="h-3.5 w-3.5" /> Download Complete History
        </button>
      </div>

      {/* Patient selector */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-xs text-slate-400 font-bold mb-3">SELECT PATIENT</p>
        <div className="flex flex-wrap gap-2">
          {myPatients.map(p => (
            <button key={p.id} onClick={() => setSelectedPatientId(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${selectedPatientId === p.id ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600'}`}>
              {p.name} <PriorityBadge priority={p.priority} showLabel={false} />
            </button>
          ))}
        </div>
      </div>

      {/* Results table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">{reports.length} Reports</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50">
              <tr>
                {['Test Name', 'Date', 'Previous', 'Result', 'Unit', 'Reference', 'Trend', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {reports.map(r => (
                <tr key={r.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold text-slate-800">{r.testName}</td>
                  <td className="px-4 py-3 font-mono text-slate-500">{r.date}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{r.previousResult ?? '—'}</td>
                  <td className={`px-4 py-3 font-mono font-bold ${r.status === 'Pending' ? 'text-slate-400 italic' : 'text-slate-900'}`}>{r.result}</td>
                  <td className="px-4 py-3 text-slate-500">{r.unit}</td>
                  <td className="px-4 py-3 font-mono text-slate-400">{r.referenceRange}</td>
                  <td className="px-4 py-3">{r.status !== 'Pending' ? TREND_ICON[r.trend] : <Clock className="h-3 w-3 text-amber-400" />}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLE[r.status]}`}>{r.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    {r.status === 'Completed' && (
                      <button className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold text-[10px]">
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
