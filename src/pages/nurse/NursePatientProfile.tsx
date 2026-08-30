import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { MOCK_PATIENTS, getPatientAllergies, getPatientVitals, getPatientPrescriptions } from '../../mock-data/clinicalData';
import { PriorityHeader } from '../../components/ui/Priority';

export const NursePatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patient = MOCK_PATIENTS.find(p => p.id === id);
  const allergies = id ? getPatientAllergies(id) : [];
  const vitals = id ? getPatientVitals(id) : [];
  const latest = vitals[0];
  const activePrescriptions = id ? getPatientPrescriptions(id).filter(rx => rx.status === 'Active') : [];

  if (!patient) return (
    <div className="text-center py-20 text-slate-400 text-sm">
      Patient not found. <Link to="/nurse/patients" className="text-cyan-600 underline">Go back</Link>
    </div>
  );

  const VITAL_ITEMS = [
    { label: 'SpO₂', value: latest ? `${latest.spo2}%` : '—', warn: latest ? latest.spo2 < 95 : false },
    { label: 'BP', value: latest ? `${latest.systolicBP}/${latest.diastolicBP} mmHg` : '—', warn: latest ? latest.systolicBP < 90 : false },
    { label: 'Heart Rate', value: latest ? `${latest.heartRate} bpm` : '—', warn: latest ? latest.heartRate > 100 : false },
    { label: 'RR', value: latest ? `${latest.respiratoryRate} /min` : '—', warn: latest ? latest.respiratoryRate > 20 : false },
    { label: 'Temp', value: latest ? `${latest.temperature} °C` : '—', warn: latest ? latest.temperature > 37.5 : false },
    { label: 'Blood Sugar', value: latest ? `${latest.bloodSugar} mg/dL` : '—', warn: latest ? latest.bloodSugar > 180 : false },
  ];

  return (
    <div className="space-y-5 pb-10">
      <Link to="/nurse/patients" className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Assigned Patients
      </Link>

      {/* Patient Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-cyan-100 flex items-center justify-center text-cyan-700 font-black text-lg border border-cyan-200">
            {patient.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{patient.name}</h1>
            <div className="text-xs text-slate-500 space-y-0.5 mt-1">
              <div className="font-mono">{patient.id} · MRN: {patient.mrn}</div>
              <div>{patient.age}y · {patient.gender} · {patient.department} · Room {patient.room}</div>
              <div>Assigned Doctor: <strong className="text-slate-700">{patient.assignedDoctor}</strong></div>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2">
          <span className="font-semibold">Diagnosis:</span> {patient.primaryDiagnosis}
        </div>

        {/* PRIORITY — Prominent */}
        <PriorityHeader priority={patient.priority} label="Patient Priority" />

        {/* Allergy Alert */}
        {allergies.length > 0 && (
          <div className="flex items-start gap-2 px-3 py-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
            <AlertTriangle className="h-3.5 w-3.5 mt-0.5 shrink-0 animate-pulse" />
            <div>
              <span className="font-black">ALLERGY ALERT: </span>
              {allergies.map(a => `${a.allergen} — ${a.reaction} (${a.severity})`).join(' | ')}
            </div>
          </div>
        )}
      </div>

      {/* Current Vitals */}
      <div className="bg-white rounded-xl border border-slate-200 p-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
          Latest Vitals {latest ? `— ${latest.timestamp} by ${latest.recordedBy}` : ''}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {VITAL_ITEMS.map(v => (
            <div key={v.label} className={`rounded-lg border p-3 ${v.warn ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>
              <div className="text-[10px] font-semibold text-slate-400 uppercase">{v.label}</div>
              <div className={`text-lg font-black font-mono mt-1 ${v.warn ? 'text-red-600' : 'text-slate-800'}`}>{v.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Prescriptions */}
      {activePrescriptions.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Doctor Prescription</h2>
          <div className="space-y-2">
            {activePrescriptions.map(rx => (
              <div key={rx.id} className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs">
                <span className="font-bold text-slate-800">{rx.medicine}</span>
                <span className="text-slate-400">{rx.dosage} · {rx.frequency}</span>
                <span className="ml-auto text-slate-400">{rx.instructions}</span>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[10px] text-slate-400">Prescribed by {activePrescriptions[0]?.prescribingDoctor}</p>
        </div>
      )}
    </div>
  );
};
