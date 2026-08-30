import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Stethoscope, AlertTriangle } from 'lucide-react';
import { MOCK_PATIENTS, getPatientAllergies, getPatientPrescriptions } from '../../mock-data/clinicalData';
import { PriorityHeader, ClinicalDisclaimer } from '../../components/ui/Priority';

const TABS = ['Overview', 'Prescriptions', 'Vitals', 'Lab Reports', 'Follow-up', 'AI Assistant'] as const;
type Tab = typeof TABS[number];

export const DoctorPatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<Tab>('Overview');

  const patient = MOCK_PATIENTS.find(p => p.id === id);
  const allergies = id ? getPatientAllergies(id) : [];
  const prescriptions = id ? getPatientPrescriptions(id) : [];

  if (!patient) return (
    <div className="flex flex-col items-center justify-center h-64 gap-3 text-slate-400">
      <Stethoscope className="h-10 w-10" />
      <p className="text-sm">Patient not found.</p>
      <Link to="/doctor/patients" className="text-brand-600 text-xs underline">Back to My Patients</Link>
    </div>
  );

  const activePrescriptions = prescriptions.filter(p => p.status === 'Active');

  return (
    <div className="space-y-5 pb-10">
      {/* Breadcrumb */}
      <Link to="/doctor/patients" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 transition-colors">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to My Patients
      </Link>

      {/* Patient Identity Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-brand-100 flex items-center justify-center text-brand-700 font-black text-lg border border-brand-200">
              {patient.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-slate-900">{patient.name}</h1>
                <span className="text-xs font-mono text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{patient.id}</span>
                <span className="text-xs text-slate-400">MRN: {patient.mrn}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1 space-y-0.5">
                <div>{patient.age}y · {patient.gender} · Admitted: {patient.admissionDate}</div>
                <div>{patient.department} · Room {patient.room} · {patient.codeStatus}</div>
                <div>Assigned: {patient.assignedDoctor}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Diagnosis */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Primary Diagnosis</span>
          <p className="text-sm font-semibold text-slate-800 mt-0.5">{patient.primaryDiagnosis}</p>
        </div>

        {/* Priority — Prominent */}
        <div className="mt-4">
          <PriorityHeader priority={patient.priority} />
        </div>

        {/* AI Score */}
        <div className="mt-3 flex items-center gap-2 text-xs text-slate-500">
          <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-700 font-semibold">
            AI Risk Score: {(patient.aiPriorityScore * 100).toFixed(0)}%
          </span>
          <span className="text-slate-400">· Model-estimated deterioration risk · Doctor verification required</span>
        </div>

        {/* Allergies banner */}
        {allergies.length > 0 && (
          <div className="mt-3 flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold">ALLERGY ALERT: </span>
              {allergies.map(a => `${a.allergen} (${a.severity})`).join(' · ')}
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-1 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-brand-500 text-brand-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'Overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Active Prescriptions</h3>
            {activePrescriptions.length === 0 ? (
              <p className="text-xs text-slate-400">None</p>
            ) : (
              <ul className="space-y-2">
                {activePrescriptions.map(rx => (
                  <li key={rx.id} className="flex items-center gap-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-500 shrink-0" />
                    <span className="font-semibold text-slate-800">{rx.medicine}</span>
                    <span className="text-slate-400">{rx.dosage} · {rx.frequency}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Known Allergies</h3>
            {allergies.length === 0 ? (
              <p className="text-xs text-slate-400">No recorded allergies</p>
            ) : (
              <ul className="space-y-2">
                {allergies.map(a => (
                  <li key={a.id} className="flex items-start gap-2 text-xs">
                    <AlertTriangle className="h-3 w-3 text-red-500 mt-0.5 shrink-0" />
                    <span className="font-semibold text-slate-800">{a.allergen}</span>
                    <span className="text-slate-400">{a.reaction} · {a.severity}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Scheduled Dates</h3>
            <div className="flex gap-6 text-xs">
              <div>
                <span className="text-slate-400">Next Check-up</span>
                <p className="font-bold text-slate-800 mt-0.5">{patient.nextCheckup}</p>
              </div>
              <div>
                <span className="text-slate-400">Blood Report Due</span>
                <p className="font-bold text-slate-800 mt-0.5">{patient.nextBloodReport}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'Overview' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 text-center text-sm text-slate-400">
          Navigate to the dedicated <strong className="text-slate-600">{activeTab}</strong> section from the sidebar.
        </div>
      )}

      <ClinicalDisclaimer />
    </div>
  );
};
