import React from 'react';
import { Factory, Package } from 'lucide-react';
import { MOCK_MEDICINES } from '../../mock-data/clinicalData';

export const PharmManufacturers: React.FC = () => {
  // Group by manufacturer
  const byMfr: Record<string, typeof MOCK_MEDICINES> = {};
  MOCK_MEDICINES.forEach(m => {
    if (!byMfr[m.manufacturer]) byMfr[m.manufacturer] = [];
    byMfr[m.manufacturer].push(m);
  });
  const manufacturers = Object.entries(byMfr);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Factory className="h-5 w-5 text-emerald-500" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Manufacturer Information</h1>
          <p className="text-xs text-slate-500">{manufacturers.length} manufacturers · {MOCK_MEDICINES.length} total medicines</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {manufacturers.map(([mfr, medicines]) => (
          <div key={mfr} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Factory className="h-4 w-4 text-emerald-500" />
                <h2 className="text-sm font-bold text-slate-800">{mfr}</h2>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                {medicines.length} {medicines.length === 1 ? 'medicine' : 'medicines'}
              </span>
            </div>
            <div className="divide-y divide-slate-50">
              {medicines.map(m => (
                <div key={m.id} className="px-5 py-3 flex items-start justify-between text-xs gap-3">
                  <div>
                    <div className="font-semibold text-slate-900">{m.name} {m.strength}</div>
                    <div className="text-slate-400 mt-0.5">{m.composition}</div>
                    <div className="flex gap-3 mt-1 text-slate-400">
                      <span>Batch: <strong className="text-slate-600">{m.batchNumber}</strong></span>
                      <span>Expiry: <strong className="text-slate-600">{m.expiryDate}</strong></span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Package className="h-3 w-3" />
                      <span className={`font-bold ${m.availableQuantity < 30 ? 'text-red-600' : 'text-slate-700'}`}>
                        {m.availableQuantity} {m.unit}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-200">{m.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
