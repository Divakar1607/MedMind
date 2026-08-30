import React, { useState } from 'react';
import { UserCheck, AlertTriangle, BrainCircuit } from 'lucide-react';
import { MOCK_ASSIGNMENTS, MOCK_DOCTORS } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

export const DeptAssignments: React.FC = () => {
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS.map(a => ({ ...a, editing: false, draft: a.assignedDoctor ?? '' })));

  const applyRecommendation = (idx: number) => {
    setAssignments(prev => prev.map((a, i) => i === idx ? { ...a, assignedDoctor: a.aiRecommendedDoctor ?? a.assignedDoctor, draft: a.aiRecommendedDoctor ?? a.assignedDoctor ?? '' } : a));
  };

  const saveAssignment = (idx: number) => {
    setAssignments(prev => prev.map((a, i) => i === idx ? { ...a, assignedDoctor: a.draft, editing: false } : a));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <UserCheck className="h-5 w-5 text-blue-500" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Assignments</h1>
          <p className="text-xs text-slate-500">Manage doctor-patient assignments with AI specialty recommendations</p>
        </div>
      </div>

      <div className="flex items-start gap-2 px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg text-xs text-blue-800">
        <BrainCircuit className="h-3.5 w-3.5 shrink-0 mt-0.5" />
        AI recommendations are based on specialty match and current patient load. All assignments require department head approval.
      </div>

      <div className="space-y-3">
        {assignments.map((a, idx) => {
          const isMismatch = a.assignedDoctor !== a.aiRecommendedDoctor && a.aiRecommendedDoctor;
          return (
            <div key={a.patientId} className={`bg-white rounded-xl border p-4 ${isMismatch ? 'border-amber-200' : 'border-slate-200'}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <PriorityBadge priority={a.priority} />
                    <span className="font-bold text-slate-900">{a.patientName}</span>
                    <span className="text-xs text-slate-400 font-mono">{a.patientId}</span>
                  </div>
                  <div className="text-xs text-slate-500 mb-3">Required specialty: <strong className="text-slate-700">{a.requiredSpecialty}</strong></div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Current Assignment */}
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Currently Assigned</p>
                      {a.editing ? (
                        <div className="flex gap-1">
                          <select
                            value={a.draft}
                            onChange={e => setAssignments(prev => prev.map((x, i) => i === idx ? { ...x, draft: e.target.value } : x))}
                            className="flex-1 px-2 py-1.5 text-xs border border-slate-200 rounded bg-white focus:outline-none"
                          >
                            {MOCK_DOCTORS.filter(d => d.availability !== 'Unavailable').map(d => (
                              <option key={d.id} value={d.name}>{d.name} ({d.specialization})</option>
                            ))}
                          </select>
                          <button onClick={() => saveAssignment(idx)} className="px-2.5 py-1.5 bg-blue-600 text-white text-[10px] font-bold rounded hover:bg-blue-700">Save</button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-slate-800">{a.assignedDoctor ?? 'Unassigned'}</span>
                          <button onClick={() => setAssignments(prev => prev.map((x, i) => i === idx ? { ...x, editing: true } : x))}
                            className="text-[10px] text-blue-600 underline">Change</button>
                        </div>
                      )}
                    </div>

                    {/* AI Recommendation */}
                    {a.aiRecommendedDoctor && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-amber-500 mb-1 flex items-center gap-1">
                          <BrainCircuit className="h-3 w-3" /> AI Recommends
                        </p>
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${isMismatch ? 'text-amber-700' : 'text-slate-800'}`}>{a.aiRecommendedDoctor}</span>
                          {isMismatch && (
                            <button onClick={() => applyRecommendation(idx)}
                              className="text-[10px] px-2 py-0.5 bg-amber-100 text-amber-700 border border-amber-200 rounded hover:bg-amber-200 font-semibold">
                              Apply
                            </button>
                          )}
                          {!isMismatch && <span className="text-[10px] text-emerald-600 font-semibold">✓ Matches</span>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {isMismatch && (
                  <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-1" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
