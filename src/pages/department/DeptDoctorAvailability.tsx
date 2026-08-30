import React from 'react';
import { Stethoscope, Users } from 'lucide-react';
import { MOCK_DOCTORS } from '../../mock-data/clinicalData';

const AVAIL_STYLE = {
  Available: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Assigned: 'bg-blue-50 text-blue-700 border-blue-200',
  Unavailable: 'bg-slate-100 text-slate-500 border-slate-200',
};
const LEVEL_STYLE = {
  Consultant: 'bg-purple-50 text-purple-700 border-purple-200',
  'Senior Resident': 'bg-brand-50 text-brand-700 border-brand-200',
  'Junior Resident': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  Intern: 'bg-slate-50 text-slate-600 border-slate-200',
};

export const DeptDoctorAvailability: React.FC = () => {
  const available = MOCK_DOCTORS.filter(d => d.availability === 'Available');
  const assigned = MOCK_DOCTORS.filter(d => d.availability === 'Assigned');
  const unavailable = MOCK_DOCTORS.filter(d => d.availability === 'Unavailable');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Doctor Availability</h1>
        <p className="text-xs text-slate-500 mt-0.5">{available.length} available · {assigned.length} assigned · {unavailable.length} unavailable</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Available', count: available.length, color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
          { label: 'Assigned', count: assigned.length, color: 'bg-blue-50 border-blue-200 text-blue-700' },
          { label: 'Unavailable', count: unavailable.length, color: 'bg-slate-50 border-slate-200 text-slate-600' },
        ].map(c => (
          <div key={c.label} className={`rounded-xl border p-4 ${c.color}`}>
            <p className="text-xs font-semibold mb-1">{c.label}</p>
            <p className="text-3xl font-black">{c.count}</p>
          </div>
        ))}
      </div>

      {/* Doctor Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-100 flex items-center gap-2">
          <Stethoscope className="h-4 w-4 text-slate-400" />
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">Medical Staff Availability</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead className="bg-slate-50">
              <tr>
                {['Name', 'Specialization', 'Level', 'Department', 'Patients', 'Availability'].map(h => (
                  <th key={h} className="text-left px-4 py-3 font-semibold text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_DOCTORS.map(d => (
                <tr key={d.id} className="hover:bg-slate-50/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold text-[10px]">
                        {d.name.replace('Dr. ', '').split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-slate-900">{d.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{d.specialization}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${LEVEL_STYLE[d.level]}`}>{d.level}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{d.department}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-slate-600">
                      <Users className="h-3 w-3" /> {d.currentPatientCount}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${AVAIL_STYLE[d.availability]}`}>{d.availability}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
