import React from 'react';
import { Package, AlertTriangle, TrendingDown } from 'lucide-react';
import { MOCK_MEDICINES, MOCK_PATIENTS, getPatientAllergies, MOCK_PRESCRIPTIONS } from '../../mock-data/clinicalData';

export const PharmDashboard: React.FC = () => {
  const lowStock = MOCK_MEDICINES.filter(m => m.availableQuantity < 50);
  const criticalStock = MOCK_MEDICINES.filter(m => m.availableQuantity < 30);
  const allergyAlerts = MOCK_PATIENTS.filter(p => getPatientAllergies(p.id).length > 0);
  const activePrescriptions = MOCK_PRESCRIPTIONS.filter(rx => rx.status === 'Active');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Pharmacy Dashboard</h1>
        <p className="text-xs text-slate-500 mt-0.5">Medication inventory, patient context, and allergy awareness</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Medicines', value: MOCK_MEDICINES.length, color: 'text-emerald-700 bg-emerald-50 border-emerald-100', icon: Package },
          { label: 'Low Stock', value: lowStock.length, color: 'text-amber-700 bg-amber-50 border-amber-100', icon: TrendingDown },
          { label: 'Critical Stock', value: criticalStock.length, color: 'text-red-700 bg-red-50 border-red-100', icon: AlertTriangle },
          { label: 'Active Rx', value: activePrescriptions.length, color: 'text-brand-700 bg-brand-50 border-brand-100', icon: Package },
        ].map(s => (
          <div key={s.label} className={`rounded-xl border p-4 ${s.color}`}>
            <div className="flex items-center gap-2 mb-2"><s.icon className="h-4 w-4" /><span className="text-xs font-semibold">{s.label}</span></div>
            <div className="text-3xl font-black">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Critical Stock Warning */}
      {criticalStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-600 animate-pulse" />
            <h3 className="text-sm font-bold text-red-800">Critical Stock Levels</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {criticalStock.map(m => (
              <div key={m.id} className="bg-white rounded-lg border border-red-200 px-3 py-2.5 text-xs">
                <div className="font-bold text-red-800">{m.name} {m.strength}</div>
                <div className="text-slate-500">{m.category} · Qty: <strong className="text-red-700">{m.availableQuantity} {m.unit}</strong></div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Allergy Alert Summary */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Patients with Allergy Records ({allergyAlerts.length})</h2>
        </div>
        <div className="divide-y divide-slate-50">
          {allergyAlerts.map(p => {
            const allergies = getPatientAllergies(p.id);
            return (
              <div key={p.id} className="px-5 py-3 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-slate-900">{p.name}</span>
                  <span className="text-slate-400 font-mono">{p.id}</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {allergies.map(a => (
                    <span key={a.id} className={`px-2 py-0.5 rounded-full border text-[10px] font-bold ${
                      a.severity === 'Life-threatening' ? 'bg-red-50 text-red-700 border-red-200' :
                      a.severity === 'Severe' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                      'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>{a.allergen} ({a.severity})</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Prescriptions */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Active Prescriptions ({activePrescriptions.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50">
              <tr>
                {['Medicine', 'Dosage', 'Frequency', 'Prescribing Doctor', 'Review Date'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {activePrescriptions.map(rx => (
                <tr key={rx.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-semibold text-slate-900">{rx.medicine}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">{rx.dosage}</td>
                  <td className="px-4 py-3 text-slate-600">{rx.frequency}</td>
                  <td className="px-4 py-3 text-slate-600">{rx.prescribingDoctor}</td>
                  <td className="px-4 py-3 font-mono text-slate-500">{rx.nextReviewDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
