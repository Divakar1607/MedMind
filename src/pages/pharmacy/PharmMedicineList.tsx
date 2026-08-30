import React, { useState } from 'react';
import { Search, Package, TrendingDown } from 'lucide-react';
import { MOCK_MEDICINES } from '../../mock-data/clinicalData';

const categories = ['All', ...Array.from(new Set(MOCK_MEDICINES.map(m => m.category)))];

export const PharmMedicineList: React.FC = () => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [selectedMedicine, setSelectedMedicine] = useState<string | null>(null);

  const medicines = MOCK_MEDICINES.filter(m => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.composition.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === 'All' || m.category === filterCategory;
    return matchSearch && matchCat;
  });

  const selected = MOCK_MEDICINES.find(m => m.id === selectedMedicine);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Medicine Inventory</h1>
        <p className="text-xs text-slate-500 mt-0.5">{MOCK_MEDICINES.length} medicines in inventory</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search medicine or composition…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-400/20" />
        </div>
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Detail Panel */}
      {selected && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 relative">
          <button onClick={() => setSelectedMedicine(null)} className="absolute top-3 right-4 text-xs text-slate-400 hover:text-slate-600">✕ Close</button>
          <h3 className="text-sm font-bold text-emerald-800 mb-3">{selected.name} {selected.strength} — Detail View</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            {[
              { label: 'Composition', value: selected.composition },
              { label: 'Strength', value: selected.strength },
              { label: 'Category', value: selected.category },
              { label: 'Manufacturer', value: selected.manufacturer },
              { label: 'Quantity', value: `${selected.availableQuantity} ${selected.unit}` },
              { label: 'Batch Number', value: selected.batchNumber },
              { label: 'Expiry Date', value: selected.expiryDate },
              { label: 'Unit Type', value: selected.unit },
            ].map(item => (
              <div key={item.label} className="bg-white rounded-lg px-3 py-2 border border-emerald-100">
                <span className="text-emerald-600 font-semibold block mb-0.5">{item.label}</span>
                <span className="text-slate-700 font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Inventory Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                {['Name', 'Composition', 'Strength', 'Category', 'Manufacturer', 'Qty', 'Expiry', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {medicines.map(m => {
                const isLow = m.availableQuantity < 30;
                return (
                  <tr key={m.id} className={`hover:bg-slate-50/50 ${selectedMedicine === m.id ? 'bg-emerald-50/50' : ''}`}>
                    <td className="px-4 py-3 font-bold text-slate-900">{m.name}</td>
                    <td className="px-4 py-3 text-slate-500">{m.composition}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{m.strength}</td>
                    <td className="px-4 py-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">{m.category}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-500">{m.manufacturer}</td>
                    <td className={`px-4 py-3 font-mono font-bold ${isLow ? 'text-red-600' : 'text-slate-700'}`}>
                      {isLow && <TrendingDown className="inline h-3 w-3 mr-1" />}
                      {m.availableQuantity} {m.unit}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-400">{m.expiryDate}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => setSelectedMedicine(selectedMedicine === m.id ? null : m.id)}
                        className="text-emerald-600 hover:text-emerald-700 font-semibold text-[10px]">Detail</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
