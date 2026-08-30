import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronRight, Calendar, Droplets, AlertTriangle } from 'lucide-react';
import { MOCK_PATIENTS } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

export const DoctorPatients: React.FC = () => {
  const [search, setSearch] = useState('');

  // Doctor sees only their assigned patients
  const myPatients = MOCK_PATIENTS.filter(p =>
    p.assignedDoctor === 'Dr. Arun Kumar' &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
  );

  const vitalStatusColor = (s: string) => {
    if (s === 'Deteriorating') return 'text-red-600 bg-red-50 border-red-200';
    if (s === 'Improving') return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    return 'text-slate-600 bg-slate-50 border-slate-200';
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Patients</h1>
          <p className="text-sm text-slate-500 mt-0.5">Patients assigned to Dr. Arun Kumar — {myPatients.length} active</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search name or ID…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-400/20 focus:border-brand-400 shadow-sm"
          />
        </div>
      </div>

      {/* Patient Cards */}
      <div className="space-y-3">
        {myPatients.map(patient => (
          <Link
            key={patient.id}
            to={`/doctor/patients/${patient.id}`}
            className="block bg-white rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-sm transition-all"
          >
            <div className="p-4">
              <div className="flex items-start justify-between gap-4">
                {/* Left: ID + Name + Demo */}
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-xs shrink-0">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-sm">{patient.name}</span>
                      <span className="text-xs text-slate-400 font-mono">{patient.id}</span>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">{patient.age}y · {patient.gender} · {patient.department} · Room {patient.room}</div>
                    <div className="text-xs text-slate-600 mt-0.5 truncate">{patient.primaryDiagnosis}</div>
                  </div>
                </div>

                {/* Right: Priority + Arrow */}
                <div className="flex items-center gap-3 shrink-0">
                  <PriorityBadge priority={patient.priority} />
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </div>
              </div>

              {/* Bottom row: status + dates */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-3 text-xs">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium ${vitalStatusColor(patient.latestVitalStatus)}`}>
                  Vitals: {patient.latestVitalStatus}
                </span>
                <span className="inline-flex items-center gap-1 text-slate-500">
                  <Calendar className="h-3 w-3" />
                  Next check-up: <strong className="text-slate-700">{patient.nextCheckup}</strong>
                </span>
                {patient.nextBloodReport && (
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border font-medium ${
                    patient.latestLabStatus === 'Results Pending'
                      ? 'text-orange-600 bg-orange-50 border-orange-200'
                      : 'text-slate-500 bg-slate-50 border-slate-200'
                  }`}>
                    <Droplets className="h-3 w-3" />
                    Blood: {patient.nextBloodReport}
                  </span>
                )}
                {patient.priority === 'CRITICAL' && (
                  <span className="inline-flex items-center gap-1 text-red-600 font-semibold">
                    <AlertTriangle className="h-3 w-3" /> Requires immediate attention
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {myPatients.length === 0 && (
        <div className="text-center py-16 text-slate-400 text-sm">No patients found matching your search.</div>
      )}
    </div>
  );
};
