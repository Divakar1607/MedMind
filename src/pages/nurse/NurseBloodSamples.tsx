import React, { useState } from 'react';
import { Droplets, Plus, CheckCircle2 } from 'lucide-react';
import { MOCK_PATIENTS, getPatientBloodSamples } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

const STATUS_STYLES = {
  Requested: 'bg-slate-100 text-slate-500 border-slate-200',
  Collected: 'bg-blue-50 text-blue-700 border-blue-200',
  'Sent to Lab': 'bg-amber-50 text-amber-700 border-amber-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const STATUS_ORDER = ['Requested', 'Collected', 'Sent to Lab', 'Completed'] as const;

export const NurseBloodSamples: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState({ testName: '', sampleType: 'Venous Blood', collectionDateTime: '' });

  const samples = getPatientBloodSamples(selectedPatientId);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-cyan-500" />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Blood Sample Records</h1>
            <p className="text-xs text-slate-500">Sample collection and send-to-lab tracker</p>
          </div>
        </div>
        <button onClick={() => setShowAdd(!showAdd)}
          className="flex items-center gap-1.5 px-3 py-2 bg-cyan-600 text-white text-xs font-semibold rounded-lg hover:bg-cyan-700">
          <Plus className="h-3.5 w-3.5" /> Log Sample
        </button>
      </div>

      {/* Patient selector */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-xs text-slate-400 font-bold mb-3">SELECT PATIENT</p>
        <div className="flex flex-wrap gap-2">
          {MOCK_PATIENTS.map(p => (
            <button key={p.id} onClick={() => setSelectedPatientId(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${selectedPatientId === p.id ? 'border-cyan-400 bg-cyan-50 text-cyan-700' : 'border-slate-200 text-slate-600'}`}>
              {p.name} <PriorityBadge priority={p.priority} showLabel={false} />
            </button>
          ))}
        </div>
      </div>

      {/* Add Log Form */}
      {showAdd && (
        <div className="bg-white rounded-xl border border-cyan-200 p-5 space-y-4">
          <h3 className="text-sm font-bold text-slate-800">Log New Sample Collection</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Test Name</label>
              <input type="text" placeholder="e.g. Troponin I, CBC" value={form.testName}
                onChange={e => setForm(f => ({ ...f, testName: e.target.value }))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/20" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Sample Type</label>
              <select value={form.sampleType} onChange={e => setForm(f => ({ ...f, sampleType: e.target.value }))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white">
                {['Venous Blood', 'Arterial Blood', 'Capillary Blood', 'Mid-stream Urine', 'Other'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-600 block mb-1">Collection Date/Time</label>
              <input type="datetime-local" value={form.collectionDateTime}
                onChange={e => setForm(f => ({ ...f, collectionDateTime: e.target.value }))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none" />
            </div>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-cyan-600 text-white text-xs font-semibold rounded-lg hover:bg-cyan-700">Record Collection</button>
            <button onClick={() => setShowAdd(false)} className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg">Cancel</button>
          </div>
        </div>
      )}

      {/* Sample Records with Progress Tracker */}
      <div className="space-y-3">
        {samples.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-sm">No blood samples recorded for this patient.</div>
        ) : (
          samples.map(s => (
            <div key={s.id} className="bg-white rounded-xl border border-slate-200 p-4">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <div className="font-bold text-slate-900 text-sm">{s.testName}</div>
                  <div className="text-xs text-slate-400 mt-0.5 font-mono">Sample: {s.sampleType} · Collected: {s.collectionDateTime}</div>
                  <div className="text-xs text-slate-400">Collected by: {s.collectedBy}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${STATUS_STYLES[s.status]}`}>{s.status}</span>
              </div>
              {/* Progress bar */}
              <div className="flex items-center gap-1">
                {STATUS_ORDER.map((step, i) => {
                  const currentIdx = STATUS_ORDER.indexOf(s.status);
                  const done = i <= currentIdx;
                  return (
                    <React.Fragment key={step}>
                      <div className="flex flex-col items-center">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${done ? 'bg-cyan-600 text-white' : 'bg-slate-100 border border-slate-200'}`}>
                          {done ? <CheckCircle2 className="h-3 w-3" /> : <span className="text-[8px] text-slate-400">{i + 1}</span>}
                        </div>
                        <span className="text-[9px] text-slate-400 mt-1 text-center w-16">{step}</span>
                      </div>
                      {i < STATUS_ORDER.length - 1 && <div className={`flex-1 h-0.5 mt-[-10px] ${i < currentIdx ? 'bg-cyan-400' : 'bg-slate-100'}`} />}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
