import React, { useState } from 'react';
import { Pill, CheckCircle } from 'lucide-react';
import { MOCK_PATIENTS, getPatientPrescriptions, MOCK_PRESCRIPTION_ADMIN } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

const ADMIN_STATUS_STYLE = {
  Administered: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Scheduled: 'bg-blue-50 text-blue-700 border-blue-200',
  Pending: 'bg-amber-50 text-amber-700 border-amber-200',
  Missed: 'bg-red-50 text-red-600 border-red-200',
};

export const NursePrescriptions: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');
  const [adminStatuses, setAdminStatuses] = useState<Record<string, 'Administered' | 'Pending' | 'Missed'>>({});
  const [justMarked, setJustMarked] = useState<string | null>(null);

  const activePrescriptions = getPatientPrescriptions(selectedPatientId).filter(rx => rx.status === 'Active');

  const markAdministered = (rxId: string) => {
    setAdminStatuses(s => ({ ...s, [rxId]: 'Administered' }));
    setJustMarked(rxId);
    setTimeout(() => setJustMarked(null), 2500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Pill className="h-5 w-5 text-cyan-500" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Prescription Updates</h1>
          <p className="text-xs text-slate-500">Review doctor prescriptions and update administration status</p>
        </div>
      </div>

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

      {/* Active Prescriptions with Admin Status */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Prescriptions — Administration Tracking</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {activePrescriptions.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">No active prescriptions for this patient.</div>
          ) : (
            activePrescriptions.map(rx => {
              const adminEntry = MOCK_PRESCRIPTION_ADMIN.find(a => a.prescriptionId === rx.id);
              const status = adminStatuses[rx.id] ?? adminEntry?.status ?? 'Scheduled';
              const isMarked = justMarked === rx.id;

              return (
                <div key={rx.id} className="px-5 py-4 flex items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{rx.medicine}</span>
                      <span className="text-xs text-slate-400">{rx.dosage} · {rx.frequency}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">{rx.instructions} · Dr: {rx.prescribingDoctor}</div>
                    {adminEntry && (
                      <div className="text-[10px] text-slate-400 mt-1">
                        Scheduled: {adminEntry.scheduledTime}
                        {adminEntry.updatedBy && ` · Last update by ${adminEntry.updatedBy} at ${adminEntry.updatedAt}`}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${ADMIN_STATUS_STYLE[status as keyof typeof ADMIN_STATUS_STYLE] ?? ''}`}>
                      {status}
                    </span>
                    {status !== 'Administered' && (
                      <button onClick={() => markAdministered(rx.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-cyan-600 text-white text-[10px] font-bold rounded-lg hover:bg-cyan-700 transition-colors">
                        <CheckCircle className="h-3 w-3" /> Mark Given
                      </button>
                    )}
                    {isMarked && (
                      <span className="text-[10px] text-emerald-600 font-semibold animate-pulse">✓ Recorded</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
