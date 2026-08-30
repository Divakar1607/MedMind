import React from 'react';
import { Cpu, Calendar } from 'lucide-react';
import { MOCK_EQUIPMENT } from '../../mock-data/clinicalData';

const STATUS_CONFIG = {
  Available: { bg: 'bg-emerald-50 border-emerald-200', badge: 'bg-emerald-100 text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
  'In Use': { bg: 'bg-blue-50 border-blue-200', badge: 'bg-blue-100 text-blue-700 border-blue-200', dot: 'bg-blue-500' },
  Maintenance: { bg: 'bg-amber-50 border-amber-200', badge: 'bg-amber-100 text-amber-700 border-amber-200', dot: 'bg-amber-500 animate-pulse' },
  Offline: { bg: 'bg-slate-50 border-slate-200', badge: 'bg-slate-100 text-slate-500 border-slate-200', dot: 'bg-slate-400' },
};

export const LabEquipment: React.FC = () => {
  const statusCounts = { Available: 0, 'In Use': 0, Maintenance: 0, Offline: 0 };
  MOCK_EQUIPMENT.forEach(e => { statusCounts[e.status] = (statusCounts[e.status] ?? 0) + 1; });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Cpu className="h-5 w-5 text-rose-500" />
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Laboratory Equipment</h1>
          <p className="text-xs text-slate-500">{MOCK_EQUIPMENT.length} instruments tracked</p>
        </div>
      </div>

      {/* Status Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {(Object.entries(statusCounts) as [keyof typeof STATUS_CONFIG, number][]).map(([status, count]) => {
          const cfg = STATUS_CONFIG[status];
          return (
            <div key={status} className={`rounded-xl border p-4 ${cfg.bg}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                <span className="text-xs font-semibold text-slate-600">{status}</span>
              </div>
              <div className="text-3xl font-black text-slate-800">{count}</div>
            </div>
          );
        })}
      </div>

      {/* Equipment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {MOCK_EQUIPMENT.map(eq => {
          const cfg = STATUS_CONFIG[eq.status];
          return (
            <div key={eq.id} className={`bg-white rounded-xl border p-4 ${cfg.bg}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-slate-400" />
                    <span className="font-bold text-slate-900">{eq.name}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{eq.type}</div>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.badge}`}>{eq.status}</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="text-slate-400">Supported Tests</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {eq.supportedTests.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-100 text-[10px] font-semibold">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Calendar className="h-3 w-3" />
                  Last maintenance: <strong className="text-slate-700">{eq.lastMaintenance}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
