import React, { useState } from 'react';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { MOCK_PATIENTS, getPatientVitals } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

export const DoctorVitalReports: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');
  const myPatients = MOCK_PATIENTS.filter(p => p.assignedDoctor === 'Dr. Arun Kumar');
  const vitals = getPatientVitals(selectedPatientId);
  const latest = vitals[0];
  const previous = vitals[1];

  const trend = (curr: number, prev: number | undefined) => {
    if (!prev) return null;
    if (curr > prev) return <ArrowUp className="h-3 w-3 text-red-500" />;
    if (curr < prev) return <ArrowDown className="h-3 w-3 text-emerald-500" />;
    return <Minus className="h-3 w-3 text-slate-400" />;
  };

  const VITAL_FIELDS = [
    { label: 'SpO₂', key: 'spo2' as const, unit: '%', normal: (v: number) => v >= 95 },
    { label: 'Systolic BP', key: 'systolicBP' as const, unit: 'mmHg', normal: (v: number) => v >= 90 && v <= 140 },
    { label: 'Diastolic BP', key: 'diastolicBP' as const, unit: 'mmHg', normal: (v: number) => v >= 60 && v <= 90 },
    { label: 'Heart Rate', key: 'heartRate' as const, unit: 'bpm', normal: (v: number) => v >= 60 && v <= 100 },
    { label: 'Respiratory Rate', key: 'respiratoryRate' as const, unit: '/min', normal: (v: number) => v >= 12 && v <= 20 },
    { label: 'Temperature', key: 'temperature' as const, unit: '°C', normal: (v: number) => v >= 36.1 && v <= 37.2 },
    { label: 'Blood Sugar', key: 'bloodSugar' as const, unit: 'mg/dL', normal: (v: number) => v >= 70 && v <= 140 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Vital Reports</h1>
        <p className="text-xs text-slate-500 mt-0.5">Historical vital observations — latest first</p>
      </div>

      {/* Patient selector */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-xs text-slate-400 font-bold mb-3">SELECT PATIENT</p>
        <div className="flex flex-wrap gap-2">
          {myPatients.map(p => (
            <button key={p.id} onClick={() => setSelectedPatientId(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${selectedPatientId === p.id ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
              {p.name} <PriorityBadge priority={p.priority} showLabel={false} />
            </button>
          ))}
        </div>
      </div>

      {/* Latest vs Previous comparison */}
      {latest && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Current vs Previous</h2>
            <span className="text-xs text-slate-400">Recorded by {latest.recordedBy} at {latest.timestamp}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-5 py-3 font-semibold text-slate-500">Vital Sign</th>
                  <th className="text-right px-5 py-3 font-semibold text-slate-500">Previous</th>
                  <th className="text-right px-5 py-3 font-semibold text-slate-500">Current</th>
                  <th className="text-center px-5 py-3 font-semibold text-slate-500">Trend</th>
                  <th className="text-center px-5 py-3 font-semibold text-slate-500">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {VITAL_FIELDS.map(f => {
                  const curr = latest[f.key];
                  const prev = previous?.[f.key];
                  const isNormal = f.normal(curr);
                  return (
                    <tr key={f.label} className="hover:bg-slate-50/50">
                      <td className="px-5 py-3 font-semibold text-slate-700">{f.label}</td>
                      <td className="px-5 py-3 text-right font-mono text-slate-400">{prev ?? '—'} {prev ? f.unit : ''}</td>
                      <td className={`px-5 py-3 text-right font-mono font-bold ${isNormal ? 'text-slate-800' : 'text-red-600'}`}>
                        {curr} {f.unit}
                      </td>
                      <td className="px-5 py-3 flex justify-center">{trend(curr, prev)}</td>
                      <td className="px-5 py-3 text-center">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${isNormal ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                          {isNormal ? 'Normal' : 'Abnormal'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Full history table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Vital History ({vitals.length} records)</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs whitespace-nowrap">
            <thead className="bg-slate-50">
              <tr>
                {['Date/Time', 'SpO₂', 'BP (Sys/Dia)', 'HR', 'RR', 'Temp', 'Blood Sugar', 'Recorded By'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {vitals.map((v, i) => (
                <tr key={v.id} className={`${i === 0 ? 'bg-brand-50/30' : ''} hover:bg-slate-50/50`}>
                  <td className="px-4 py-3 font-mono text-slate-600">{v.timestamp}</td>
                  <td className={`px-4 py-3 font-mono font-bold ${v.spo2 < 95 ? 'text-red-600' : 'text-slate-800'}`}>{v.spo2}%</td>
                  <td className="px-4 py-3 font-mono text-slate-700">{v.systolicBP}/{v.diastolicBP}</td>
                  <td className={`px-4 py-3 font-mono font-bold ${v.heartRate > 100 ? 'text-red-600' : 'text-slate-800'}`}>{v.heartRate}</td>
                  <td className={`px-4 py-3 font-mono ${v.respiratoryRate > 20 ? 'text-orange-600' : 'text-slate-700'}`}>{v.respiratoryRate}</td>
                  <td className={`px-4 py-3 font-mono ${v.temperature > 37.2 ? 'text-orange-600' : 'text-slate-700'}`}>{v.temperature}°C</td>
                  <td className="px-4 py-3 font-mono text-slate-700">{v.bloodSugar} mg/dL</td>
                  <td className="px-4 py-3 text-slate-500">{v.recordedBy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
