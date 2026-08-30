import React, { useState } from 'react';
import { Calendar, Droplets, Edit3, Check } from 'lucide-react';
import { MOCK_PATIENTS, MOCK_FOLLOWUPS } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

const LAB_STATUS_STYLE = {
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

export const DoctorFollowUp: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');
  const [editingCheckup, setEditingCheckup] = useState(false);
  const [editingLab, setEditingLab] = useState(false);
  const myPatients = MOCK_PATIENTS.filter(p => p.assignedDoctor === 'Dr. Arun Kumar');
  const followUp = MOCK_FOLLOWUPS.find(f => f.patientId === selectedPatientId);
  const patient = myPatients.find(p => p.id === selectedPatientId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Follow-up & Deadlines</h1>
        <p className="text-xs text-slate-500 mt-0.5">Upcoming check-ups and laboratory test deadlines</p>
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

      {patient && followUp ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Next Check-up */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-brand-500" />
                <h2 className="text-sm font-bold text-slate-800">Next Check-up</h2>
              </div>
              <button onClick={() => setEditingCheckup(!editingCheckup)}
                className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1">
                {editingCheckup ? <><Check className="h-3.5 w-3.5" /> Save</> : <><Edit3 className="h-3.5 w-3.5" /> Edit</>}
              </button>
            </div>
            {editingCheckup ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold">Date</label>
                  <input type="date" defaultValue={followUp.nextCheckupDate}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/20" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold">Purpose / Note</label>
                  <textarea defaultValue={followUp.nextCheckupNote} rows={3}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/20 resize-none" />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-3xl font-black text-brand-700 font-mono">{followUp.nextCheckupDate}</div>
                <p className="text-xs text-slate-600">{followUp.nextCheckupNote}</p>
              </div>
            )}
          </div>

          {/* Next Lab Test */}
          <div className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-cyan-500" />
                <h2 className="text-sm font-bold text-slate-800">Next Laboratory Follow-up</h2>
              </div>
              <button onClick={() => setEditingLab(!editingLab)}
                className="text-xs text-brand-600 hover:text-brand-700 font-semibold flex items-center gap-1">
                {editingLab ? <><Check className="h-3.5 w-3.5" /> Save</> : <><Edit3 className="h-3.5 w-3.5" /> Edit</>}
              </button>
            </div>
            {editingLab ? (
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-slate-400 font-semibold">Required Test</label>
                  <input type="text" defaultValue={followUp.requiredTest}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/20" />
                </div>
                <div>
                  <label className="text-xs text-slate-400 font-semibold">Due Date</label>
                  <input type="date" defaultValue={followUp.nextLabTestDate}
                    className="mt-1 w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400/20" />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="text-sm font-bold text-slate-800">{followUp.requiredTest}</div>
                <div className="text-3xl font-black text-cyan-700 font-mono">{followUp.nextLabTestDate}</div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${LAB_STATUS_STYLE[followUp.labTestStatus]}`}>
                  {followUp.labTestStatus.toUpperCase()}
                </span>
              </div>
            )}
          </div>

          {/* All Upcoming — summary row */}
          <div className="md:col-span-2 bg-slate-50 rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">All Patients — Upcoming</h3>
            <div className="space-y-2">
              {MOCK_PATIENTS.filter(p => p.assignedDoctor === 'Dr. Arun Kumar').map(p => {
                const f = MOCK_FOLLOWUPS.find(fu => fu.patientId === p.id);
                return (
                  <div key={p.id} className="flex items-center gap-4 text-xs bg-white rounded-lg px-4 py-2.5 border border-slate-100">
                    <PriorityBadge priority={p.priority} />
                    <span className="font-semibold text-slate-800 w-36">{p.name}</span>
                    {f ? (
                      <>
                        <span className="text-slate-400">Check-up: <strong className="text-slate-700">{f.nextCheckupDate}</strong></span>
                        <span className="text-slate-400">Lab: <strong className="text-slate-700">{f.nextLabTestDate}</strong></span>
                        <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full border ${LAB_STATUS_STYLE[f.labTestStatus]}`}>{f.labTestStatus}</span>
                      </>
                    ) : <span className="text-slate-400">No follow-up scheduled</span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-400 text-sm">
          No follow-up data for this patient.
        </div>
      )}
    </div>
  );
};
