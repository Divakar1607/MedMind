import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, AlertCircle, ChevronRight, Activity } from 'lucide-react';
import type { Patient } from '../types/patient';
import { api } from '../services/api';
import { Skeleton } from '../components/ui/Skeleton';

export const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getPatients().then(data => {
      setPatients(data);
      setIsLoading(false);
    });
  }, []);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
    const priorityOrder: Record<string, number> = {
      'Critical': 0,
      'High': 1,
      'Moderate': 2,
      'Stable': 3
    };
    return (priorityOrder[a.priority] ?? 4) - (priorityOrder[b.priority] ?? 4);
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Stable': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient List</h1>
          <p className="text-sm text-slate-500">Manage and monitor all admitted patients.</p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name or MRN..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all shadow-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* AI Triage Banner */}
      <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 flex items-center justify-between relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-100/50 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        <div className="flex items-center gap-3 relative z-10">
          <div className="bg-brand-600 text-white p-2 rounded-lg relative">
            <Activity className="h-5 w-5" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-brand-50 animate-pulse" />
          </div>
          <div>
            <h3 className="text-brand-900 font-semibold text-sm flex items-center gap-2">
              Autonomous Triage Agent is active
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </h3>
            <p className="text-brand-700 text-xs">Patients are automatically sorted by AI-predicted clinical deterioration risk.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
              <tr>
                <th className="px-6 py-4">Patient</th>
                <th className="px-6 py-4">Room</th>
                <th className="px-6 py-4">Diagnosis</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Vitals Summary</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                Array.from({ length: 4 }).map((_, idx) => (
                  <tr key={idx} className="bg-white">
                    <td className="px-6 py-4"><Skeleton className="h-10 w-48" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-16" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-5 w-32" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-6 w-20 rounded-full" /></td>
                    <td className="px-6 py-4"><Skeleton className="h-8 w-40" /></td>
                    <td className="px-6 py-4 text-right"><Skeleton className="h-8 w-8 ml-auto" /></td>
                  </tr>
                ))
              ) : (
                filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-bold">
                        {patient.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{patient.name}</div>
                        <div className="text-xs text-slate-500">{patient.mrn} • {patient.age}yo {patient.gender.charAt(0)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{patient.room}</td>
                  <td className="px-6 py-4 text-slate-600 truncate max-w-[200px]" title={patient.primaryDiagnosis}>
                    {patient.primaryDiagnosis}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${getPriorityColor(patient.priority)}`}>
                      {patient.priority === 'Critical' && <AlertCircle className="w-3 h-3 mr-1" />}
                      {patient.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <div className="flex flex-col">
                        <span className="text-slate-400">HR</span>
                        <span className={`font-medium ${patient.vitals.heartRate > 100 || patient.vitals.heartRate < 60 ? 'text-red-600' : 'text-slate-900'}`}>{patient.vitals.heartRate}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400">BP</span>
                        <span className={`font-medium ${(patient.vitals.bloodPressure.systolic > 140 || patient.vitals.bloodPressure.systolic < 90) ? 'text-red-600' : 'text-slate-900'}`}>{patient.vitals.bloodPressure.systolic}/{patient.vitals.bloodPressure.diastolic}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-slate-400">SpO2</span>
                        <span className={`font-medium ${patient.vitals.oxygenSaturation < 92 ? 'text-red-600' : 'text-slate-900'}`}>{patient.vitals.oxygenSaturation}%</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to={`/patients/${patient.id}`} className="inline-flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 transition-colors">
                      <ChevronRight className="w-5 h-5" />
                    </Link>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
          {!isLoading && filteredPatients.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              <Activity className="w-12 h-12 mx-auto mb-3 text-slate-300" />
              <p>No patients found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
