import React, { useState } from 'react';
import { AlertTriangle, ClipboardList } from 'lucide-react';
import { MOCK_PATIENTS, getPatientPrescriptions, getPatientAllergies } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

export const PharmPatientContext: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');
  const patient = MOCK_PATIENTS.find(p => p.id === selectedPatientId);
  const activePrescriptions = getPatientPrescriptions(selectedPatientId).filter(rx => rx.status === 'Active');
  const previousPrescriptions = getPatientPrescriptions(selectedPatientId).filter(rx => rx.status !== 'Active');
  const allergies = getPatientAllergies(selectedPatientId);
  const lifeThreateningAllergies = allergies.filter(a => a.severity === 'Life-threatening');
  const severeAllergies = allergies.filter(a => a.severity === 'Severe');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <ClipboardList className="h-5 w-5 text-emerald-500" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Medication Context</h1>
          <p className="text-xs text-slate-500">Prescription and allergy context for medication preparation</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-xs text-slate-400 font-bold mb-3">SELECT PATIENT</p>
        <div className="flex flex-wrap gap-2">
          {MOCK_PATIENTS.map(p => (
            <button key={p.id} onClick={() => setSelectedPatientId(p.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${selectedPatientId === p.id ? 'border-emerald-400 bg-emerald-50 text-emerald-700' : 'border-slate-200 text-slate-600'}`}>
              {p.name} <PriorityBadge priority={p.priority} showLabel={false} />
            </button>
          ))}
        </div>
      </div>

      {patient && (
        <>
          {/* Patient Info */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 text-xs flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-black">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="font-bold text-slate-900">{patient.name} <span className="font-mono text-slate-400">{patient.id}</span></div>
              <div className="text-slate-500">{patient.age}y · {patient.gender} · {patient.primaryDiagnosis}</div>
            </div>
            <div className="ml-auto"><PriorityBadge priority={patient.priority} /></div>
          </div>

          {/* Life-threatening Allergy Alerts */}
          {lifeThreateningAllergies.length > 0 && (
            <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border-2 border-red-400 rounded-xl text-xs text-red-800">
              <AlertTriangle className="h-5 w-5 shrink-0 text-red-600 animate-pulse" />
              <div>
                <div className="font-black text-sm mb-1">⚠️ LIFE-THREATENING ALLERGY — DO NOT ADMINISTER</div>
                {lifeThreateningAllergies.map(a => (
                  <div key={a.id}><strong>{a.allergen}</strong> → {a.reaction}</div>
                ))}
              </div>
            </div>
          )}

          {severeAllergies.length > 0 && (
            <div className="flex items-start gap-3 px-4 py-3 bg-orange-50 border border-orange-300 rounded-xl text-xs text-orange-800">
              <AlertTriangle className="h-4 w-4 shrink-0 text-orange-500 mt-0.5" />
              <div>
                <div className="font-bold mb-1">Severe Allergy Alert</div>
                {severeAllergies.map(a => (
                  <div key={a.id}><strong>{a.allergen}</strong> → {a.reaction}</div>
                ))}
              </div>
            </div>
          )}

          {/* Active Prescriptions */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Current Prescriptions ({activePrescriptions.length})</h2>
            </div>
            <div className="divide-y divide-slate-50">
              {activePrescriptions.map(rx => (
                <div key={rx.id} className="px-5 py-3 text-xs">
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="font-bold text-slate-900">{rx.medicine}</span>
                    <span className="font-mono text-slate-600">{rx.dosage}</span>
                    <span className="text-slate-400">{rx.frequency}</span>
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">Active</span>
                  </div>
                  <div className="text-slate-400">{rx.instructions} · Next review: {rx.nextReviewDate} · By: {rx.prescribingDoctor}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Previous Prescriptions */}
          {previousPrescriptions.length > 0 && (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-5 py-3 border-b border-slate-100">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Previous Prescriptions ({previousPrescriptions.length})</h2>
              </div>
              <div className="divide-y divide-slate-50">
                {previousPrescriptions.map(rx => (
                  <div key={rx.id} className="px-5 py-3 text-xs flex items-center gap-3 text-slate-400">
                    <span className="font-semibold text-slate-600">{rx.medicine}</span>
                    <span className="font-mono">{rx.dosage}</span>
                    <span>{rx.frequency}</span>
                    <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 border border-slate-200">{rx.status}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
