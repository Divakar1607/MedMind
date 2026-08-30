import React, { useState } from 'react';
import { Search, FlaskConical } from 'lucide-react';
import { MOCK_LAB_TESTS } from '../../mock-data/clinicalData';

const AVAIL_STYLE = {
  Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Limited: 'bg-amber-50 text-amber-700 border-amber-200',
  Unavailable: 'bg-red-50 text-red-600 border-red-200',
};

const categories = ['All', ...Array.from(new Set(MOCK_LAB_TESTS.map(t => t.category)))];

export const LabAvailableTests: React.FC = () => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const tests = MOCK_LAB_TESTS.filter(t =>
    (category === 'All' || t.category === category) &&
    (t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Available Laboratory Tests</h1>
        <p className="text-xs text-slate-500 mt-0.5">{MOCK_LAB_TESTS.filter(t => t.availability === 'Available').length} tests available</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input type="text" placeholder="Search test or category…" value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-rose-400/20" />
        </div>
        <select value={category} onChange={e => setCategory(e.target.value)}
          className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {tests.map(t => (
          <div key={t.id} className={`bg-white rounded-xl border p-4 ${t.availability === 'Unavailable' ? 'border-red-200 opacity-60' : 'border-slate-200 hover:border-rose-300'} transition-all`}>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <FlaskConical className="h-4 w-4 text-rose-500 shrink-0" />
                <span className="font-bold text-slate-900 text-sm leading-tight">{t.name}</span>
              </div>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${AVAIL_STYLE[t.availability]}`}>{t.availability}</span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100">{t.category}</span>
              </div>
              <div className="text-slate-500">Sample: <strong className="text-slate-700">{t.sampleType}</strong></div>
              <div className="text-slate-500">Turnaround: <strong className="text-slate-700">{t.estimatedTurnaround}</strong></div>
            </div>
          </div>
        ))}
      </div>

      {tests.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm">No tests found matching your search.</div>
      )}
    </div>
  );
};
