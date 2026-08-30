import React, { useState } from 'react';
import { HeartPulse, CheckCircle } from 'lucide-react';
import { MOCK_PATIENTS } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

const defaultForm = { spo2: '', systolicBP: '', diastolicBP: '', heartRate: '', respiratoryRate: '', temperature: '', bloodSugar: '', observationDateTime: '' };

export const NurseRecordVitals: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');
  const [form, setForm] = useState(defaultForm);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm(defaultForm);
  };

  const FIELDS = [
    { label: 'SpO₂', key: 'spo2', unit: '%', placeholder: '95–100' },
    { label: 'Systolic BP', key: 'systolicBP', unit: 'mmHg', placeholder: '90–140' },
    { label: 'Diastolic BP', key: 'diastolicBP', unit: 'mmHg', placeholder: '60–90' },
    { label: 'Heart Rate', key: 'heartRate', unit: 'bpm', placeholder: '60–100' },
    { label: 'Respiratory Rate', key: 'respiratoryRate', unit: '/min', placeholder: '12–20' },
    { label: 'Temperature', key: 'temperature', unit: '°C', placeholder: '36.1–37.2' },
    { label: 'Blood Sugar', key: 'bloodSugar', unit: 'mg/dL', placeholder: '70–140' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <HeartPulse className="h-5 w-5 text-cyan-500" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Record Vitals</h1>
          <p className="text-xs text-slate-500">Add new vital observations for assigned patients</p>
        </div>
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

      {/* Success Banner */}
      {submitted && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700">
          <CheckCircle className="h-4 w-4 shrink-0" />
          <strong>Vital observation recorded successfully.</strong> This is a clinical record — not a diagnosis.
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
        <h2 className="text-sm font-bold text-slate-800">New Observation</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FIELDS.map(f => (
            <div key={f.key}>
              <label className="text-xs font-semibold text-slate-600 block mb-1">{f.label} <span className="text-slate-400 font-normal">({f.unit})</span></label>
              <input type="number" step="0.1" placeholder={f.placeholder}
                value={form[f.key]}
                onChange={e => setForm(v => ({ ...v, [f.key]: e.target.value }))}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400 font-mono" />
            </div>
          ))}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="text-xs font-semibold text-slate-600 block mb-1">Observation Date/Time</label>
            <input type="datetime-local" value={form.observationDateTime}
              onChange={e => setForm(v => ({ ...v, observationDateTime: e.target.value }))}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/20 focus:border-cyan-400" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 bg-slate-50 px-3 py-2 rounded-lg border border-slate-100">
          Recorded by: Nurse Divya · Station: ICU Ward · Recorded values are clinical observations, not AI interpretations.
        </div>
        <button type="submit" className="px-5 py-2.5 bg-cyan-600 text-white text-xs font-bold rounded-lg hover:bg-cyan-700 transition-colors">
          Submit Vital Observation
        </button>
      </form>
    </div>
  );
};
