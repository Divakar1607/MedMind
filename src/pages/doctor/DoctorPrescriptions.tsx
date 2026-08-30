import React, { useState } from 'react';
import { FileText, Plus, ChevronDown, ChevronUp, Download } from 'lucide-react';
import { MOCK_PATIENTS, MOCK_PRESCRIPTIONS } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

const STATUS_STYLE = {
  Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Completed: 'bg-slate-100 text-slate-500 border-slate-200',
  Discontinued: 'bg-red-50 text-red-600 border-red-200',
};

export const DoctorPrescriptions: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [form, setForm] = useState({ medicine: '', dosage: '', frequency: '', duration: '', instructions: '', nextReviewDate: '' });

  const myPatients = MOCK_PATIENTS.filter(p => p.assignedDoctor === 'Dr. Arun Kumar');
  const patient = myPatients.find(p => p.id === selectedPatientId);
  const rxList = MOCK_PRESCRIPTIONS.filter(p => p.patientId === selectedPatientId);
  const active = rxList.filter(r => r.status === 'Active');
  const previous = rxList.filter(r => r.status !== 'Active');

  const RxRow = ({ rx, bordered = false }: { rx: typeof rxList[0]; bordered?: boolean }) => (
    <div className={`bg-white rounded-lg border ${bordered ? 'border-slate-200' : 'border-slate-100'} overflow-hidden`}>
      <button
        onClick={() => setExpandedId(expandedId === rx.id ? null : rx.id)}
        className="w-full flex items-center justify-between px-4 py-3 text-xs text-left hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <FileText className="h-3.5 w-3.5 text-brand-500" />
          <span className="font-bold text-slate-800">{rx.medicine}</span>
          <span className="text-slate-400">{rx.dosage} · {rx.frequency}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLE[rx.status]}`}>{rx.status}</span>
          {expandedId === rx.id ? <ChevronUp className="h-3.5 w-3.5 text-slate-400" /> : <ChevronDown className="h-3.5 w-3.5 text-slate-400" />}
        </div>
      </button>
      {expandedId === rx.id && (
        <div className="px-4 pb-4 pt-1 border-t border-slate-100 grid grid-cols-2 gap-3 text-xs">
          <div><span className="text-slate-400">Duration</span><p className="font-semibold text-slate-700 mt-0.5">{rx.duration}</p></div>
          <div><span className="text-slate-400">Instructions</span><p className="font-semibold text-slate-700 mt-0.5">{rx.instructions}</p></div>
          <div><span className="text-slate-400">Prescribed by</span><p className="font-semibold text-slate-700 mt-0.5">{rx.prescribingDoctor}</p></div>
          <div><span className="text-slate-400">Date</span><p className="font-semibold text-slate-700 mt-0.5">{rx.prescriptionDate}</p></div>
          <div><span className="text-slate-400">Next Review</span><p className="font-semibold text-slate-700 mt-0.5">{rx.nextReviewDate}</p></div>
          <div className="flex items-end">
            <button className="flex items-center gap-1 text-brand-600 hover:text-brand-700 font-semibold">
              <Download className="h-3.5 w-3.5" /> Download PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Prescriptions</h1>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-1.5 px-3 py-2 bg-brand-700 text-white text-xs font-semibold rounded-lg hover:bg-brand-800 transition-colors"
        >
          <Plus className="h-3.5 w-3.5" /> New Prescription
        </button>
      </div>

      {/* Patient Selector */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-xs text-slate-400 font-semibold mb-3">SELECT PATIENT</p>
        <div className="flex flex-wrap gap-2">
          {myPatients.map(p => (
            <button
              key={p.id}
              onClick={() => setSelectedPatientId(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${selectedPatientId === p.id ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}
            >
              {p.name} <PriorityBadge priority={p.priority} showLabel={false} />
            </button>
          ))}
        </div>
      </div>

      {patient && (
        <div className="text-xs text-slate-500 flex items-center gap-2">
          <span className="font-semibold text-slate-800">{patient.name}</span>
          <span>·</span><span>{patient.primaryDiagnosis}</span>
        </div>
      )}

      {/* Add Prescription Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-brand-200 p-5 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800">New Prescription</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: 'Medicine', key: 'medicine', placeholder: 'e.g. Amoxicillin' },
              { label: 'Dosage', key: 'dosage', placeholder: 'e.g. 500mg' },
              { label: 'Frequency', key: 'frequency', placeholder: 'e.g. Three times daily' },
              { label: 'Duration', key: 'duration', placeholder: 'e.g. 7 days' },
              { label: 'Next Review Date', key: 'nextReviewDate', placeholder: 'YYYY-MM-DD' },
            ].map(field => (
              <div key={field.key}>
                <label className="text-xs font-semibold text-slate-600 block mb-1">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/20 focus:border-brand-400"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="text-xs font-semibold text-slate-600 block mb-1">Instructions</label>
              <textarea
                placeholder="Special instructions…"
                value={form.instructions}
                onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))}
                rows={2}
                className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/20 focus:border-brand-400 resize-none"
              />
            </div>
          </div>
          <div className="flex gap-2 pt-2">
            <button className="px-4 py-2 bg-brand-700 text-white text-xs font-semibold rounded-lg hover:bg-brand-800">Save Prescription</button>
            <button onClick={() => setShowAddForm(false)} className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg hover:bg-slate-50">Cancel</button>
          </div>
        </div>
      )}

      {/* Current / Active Prescriptions */}
      <div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Current Prescriptions ({active.length})</h2>
        <div className="space-y-2">
          {active.map(rx => <RxRow key={rx.id} rx={rx} bordered />)}
          {active.length === 0 && <p className="text-xs text-slate-400">No active prescriptions.</p>}
        </div>
      </div>

      {/* Previous Prescriptions */}
      {previous.length > 0 && (
        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Previous Prescriptions ({previous.length})</h2>
          <div className="space-y-2">
            {previous.map(rx => <RxRow key={rx.id} rx={rx} />)}
          </div>
        </div>
      )}
    </div>
  );
};
