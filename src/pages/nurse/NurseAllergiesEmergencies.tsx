import React, { useState } from 'react';
import { AlertTriangle, Plus, CheckCircle, Syringe } from 'lucide-react';
import { MOCK_PATIENTS, getPatientAllergies, getPatientEmergencies } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

const SEVERITY_STYLE = {
  'Life-threatening': 'bg-red-50 text-red-700 border-red-200',
  Severe: 'bg-orange-50 text-orange-700 border-orange-200',
  Moderate: 'bg-amber-50 text-amber-700 border-amber-200',
  Mild: 'bg-slate-50 text-slate-600 border-slate-200',
};

export const NurseAllergiesEmergencies: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');
  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newAllergy, setNewAllergy] = useState({ allergen: '', reaction: '', severity: 'Mild' });

  const allergies = getPatientAllergies(selectedPatientId);
  const emergencies = getPatientEmergencies(selectedPatientId);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3500);
    setShowAddAllergy(false);
    setNewAllergy({ allergen: '', reaction: '', severity: 'Mild' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Allergies & Emergency History</h1>
        <p className="text-xs text-slate-500">Clinical allergy records and previous emergency events</p>
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

      {saved && (
        <div className="flex items-center gap-2 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-700">
          <CheckCircle className="h-4 w-4" /> Allergy record saved. Must be reviewed and confirmed by the attending physician.
        </div>
      )}

      {/* Allergy Section */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            <h2 className="text-sm font-bold text-slate-800">Known Allergies ({allergies.length})</h2>
          </div>
          <button onClick={() => setShowAddAllergy(!showAddAllergy)}
            className="flex items-center gap-1 px-3 py-1.5 bg-cyan-600 text-white text-[10px] font-bold rounded-lg hover:bg-cyan-700">
            <Plus className="h-3 w-3" /> Add Allergy
          </button>
        </div>

        {showAddAllergy && (
          <form onSubmit={handleSave} className="px-5 py-4 border-b border-slate-100 bg-cyan-50/40 space-y-3">
            <h3 className="text-xs font-bold text-slate-700">Add New Allergy Record</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Allergen</label>
                <input required type="text" placeholder="e.g. Sulfonamides" value={newAllergy.allergen}
                  onChange={e => setNewAllergy(a => ({ ...a, allergen: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/20" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Reaction</label>
                <input required type="text" placeholder="e.g. Anaphylaxis" value={newAllergy.reaction}
                  onChange={e => setNewAllergy(a => ({ ...a, reaction: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400/20" />
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-600 block mb-1">Severity</label>
                <select value={newAllergy.severity} onChange={e => setNewAllergy(a => ({ ...a, severity: e.target.value }))}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white focus:outline-none">
                  {['Mild', 'Moderate', 'Severe', 'Life-threatening'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <p className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded">
              ⚠️ This allergy record requires attending physician confirmation before it becomes clinically active.
            </p>
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 bg-cyan-600 text-white text-xs font-semibold rounded-lg hover:bg-cyan-700">Save Record</button>
              <button type="button" onClick={() => setShowAddAllergy(false)} className="px-4 py-2 border border-slate-200 text-slate-600 text-xs font-semibold rounded-lg">Cancel</button>
            </div>
          </form>
        )}

        <div className="divide-y divide-slate-50">
          {allergies.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-sm">No recorded allergies for this patient.</div>
          ) : (
            allergies.map(a => (
              <div key={a.id} className="px-5 py-3 flex items-start gap-4">
                <AlertTriangle className={`h-4 w-4 shrink-0 mt-0.5 ${a.severity === 'Life-threatening' ? 'text-red-500 animate-pulse' : 'text-amber-400'}`} />
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm">{a.allergen}</div>
                  <div className="text-xs text-slate-500 mt-0.5">Reaction: {a.reaction} · Source: {a.source} · Recorded: {a.dateRecorded}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${SEVERITY_STYLE[a.severity]}`}>{a.severity}</span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Emergency History */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
          <Syringe className="h-4 w-4 text-slate-400" />
          <h2 className="text-sm font-bold text-slate-800">Previous Emergency Events ({emergencies.length})</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {emergencies.length === 0 ? (
            <div className="p-6 text-center text-slate-400 text-sm">No emergency history for this patient.</div>
          ) : (
            emergencies.map(e => (
              <div key={e.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="font-bold text-slate-900">{e.eventType}</div>
                  <div className="text-[10px] font-mono text-slate-400 shrink-0">{e.date}</div>
                </div>
                <div className="text-xs text-slate-600">{e.notes}</div>
                <div className="mt-2 flex items-center gap-3 text-[10px] text-slate-400">
                  <span>Dept: {e.department}</span>
                  <span className="text-emerald-600 font-semibold">Outcome: {e.outcome}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
