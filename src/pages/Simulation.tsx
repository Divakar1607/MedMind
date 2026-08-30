import React, { useState } from 'react';
import { PlayCircle, Users, Clock, ShieldCheck, ArrowRight, Bot, AlertTriangle, CheckCircle } from 'lucide-react';

export const Simulation: React.FC = () => {
  const [patientCount, setPatientCount] = useState<number>(100);
  const [doctorsCount, setDoctorsCount] = useState<number>(5);
  const [running, setRunning] = useState(false);
  const [simResults, setSimResults] = useState<any>(null);
  const [researchPrompt, setResearchPrompt] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyzePrompt = () => {
    if (!researchPrompt.trim()) return;
    setIsAnalyzing(true);
    
    // Simulate AI parsing the natural language
    setTimeout(() => {
      setIsAnalyzing(false);
      // Basic mock parsing based on regex for numbers
      const patientsMatch = researchPrompt.match(/(\d+)\s*patients/i);
      const doctorsMatch = researchPrompt.match(/(\d+)\s*doctors/i);
      
      if (patientsMatch) setPatientCount(parseInt(patientsMatch[1]));
      if (doctorsMatch) setDoctorsCount(parseInt(doctorsMatch[1]));
      
      // Auto-run simulation
      handleRunSimulation();
    }, 1500);
  };

  const handleRunSimulation = () => {
    setRunning(true);
    setTimeout(() => {
      setSimResults({
        fcfs: {
          avg_wait_mins: 42.5,
          high_risk_wait_mins: 38.1,
          max_wait_mins: 110,
          priority_inversions: 24
        },
        ai_priority: {
          avg_wait_mins: 18.2,
          high_risk_wait_mins: 4.5,
          max_wait_mins: 45,
          priority_inversions: 1
        },
        improvement_pct: 88.2
      });
      setRunning(false);
    }, 1500);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="border-b border-slate-200 pb-4">
        <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
          <PlayCircle className="h-6 w-6 text-brand-600" />
          Queue Workflow Simulation Studio
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Discrete-event queue workflow simulator contrasting First-Come-First-Served (FCFS) vs AI Risk-Aware Priority Queue.
        </p>
      </div>

      {/* Research Assistant Conversational UI */}
      <div className="bg-gradient-to-br from-slate-900 to-brand-950 rounded-xl p-6 shadow-xl border border-brand-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Bot className="w-32 h-32 text-brand-300" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-brand-500/20 p-2 rounded-lg text-brand-300 border border-brand-500/30">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Research Assistant</h2>
              <p className="text-sm text-brand-200">Configure simulations using natural language</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <input 
              type="text" 
              value={researchPrompt}
              onChange={(e) => setResearchPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAnalyzePrompt()}
              placeholder="e.g., Run a simulation with 500 patients and 12 doctors focusing on high-risk sepsis..."
              className="flex-1 bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
            />
            <button 
              onClick={handleAnalyzePrompt}
              disabled={isAnalyzing || !researchPrompt.trim()}
              className="bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-colors"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze'} <ArrowRight className="h-4 w-4" />
            </button>
          </div>
          
          {isAnalyzing && (
            <div className="mt-4 bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-brand-300 font-mono flex items-center gap-3">
               <div className="flex gap-1 items-center">
                 <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                 <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                 <div className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-bounce"></div>
               </div>
               <span>Agent is parsing natural language, configuring simulation parameters, and preparing environment...</span>
            </div>
          )}

          {!isAnalyzing && (
            <div className="mt-4 flex gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase">Try:</span>
              <button onClick={() => setResearchPrompt("Simulate a mass casualty event with 300 patients")} className="text-xs text-brand-300 hover:text-white transition-colors bg-brand-900/50 px-2 py-1 rounded border border-brand-800">"Simulate a mass casualty event with 300 patients"</button>
              <button onClick={() => setResearchPrompt("Optimize doctor count for 100 high-risk patients")} className="text-xs text-brand-300 hover:text-white transition-colors bg-brand-900/50 px-2 py-1 rounded border border-brand-800">"Optimize doctor count for 100 high-risk patients"</button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-surface rounded-lg shadow-sm border border-slate-200 p-5 space-y-4">
        <h2 className="text-base font-bold text-slate-900">Simulation Parameters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Simulated Patients</label>
            <input
              type="number"
              value={patientCount}
              onChange={(e) => setPatientCount(Number(e.target.value))}
              className="w-full rounded border-slate-300 py-1.5 px-3 text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">Attending Clinicians</label>
            <input
              type="number"
              value={doctorsCount}
              onChange={(e) => setDoctorsCount(Number(e.target.value))}
              className="w-full rounded border-slate-300 py-1.5 px-3 text-sm"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={handleRunSimulation}
              disabled={running}
              className="w-full bg-brand-600 hover:bg-brand-700 text-white font-semibold py-2 px-4 rounded text-sm transition-all"
            >
              {running ? 'Simulating Workflow...' : 'Execute Queue Simulation'}
            </button>
          </div>
        </div>
      </div>

      {simResults && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 p-3 rounded-lg border border-emerald-200">
            <CheckCircle className="h-5 w-5" />
            <span className="font-semibold text-sm">Simulation complete. AI Priority Queue reduced high-risk wait times by {simResults.improvement_pct}%.</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-700 uppercase mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4" /> Baseline: FCFS Queue
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-slate-600 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-slate-400" /> High-Risk Wait:</span>
                  <span className="font-bold text-red-600 text-lg">{simResults.fcfs.high_risk_wait_mins}m</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                  <span className="text-slate-600 flex items-center gap-2"><Users className="h-4 w-4 text-slate-400" /> Average Wait:</span>
                  <span className="font-semibold">{simResults.fcfs.avg_wait_mins}m</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-600">Priority Inversions:</span>
                  <span className="font-semibold">{simResults.fcfs.priority_inversions}</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-brand-50 to-emerald-50 border border-brand-200 rounded-lg p-5 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Bot className="w-24 h-24 text-brand-500" />
              </div>
              <h3 className="text-sm font-bold text-brand-900 uppercase mb-4 flex items-center gap-2 relative z-10">
                <ShieldCheck className="h-4 w-4 text-emerald-600" /> AI Risk-Aware Queue
              </h3>
              <div className="space-y-3 text-sm relative z-10">
                <div className="flex justify-between items-center border-b border-brand-200/60 pb-2">
                  <span className="text-brand-800 font-medium flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-brand-400" /> High-Risk Wait:</span>
                  <span className="font-bold text-emerald-700 text-lg">{simResults.ai_priority.high_risk_wait_mins}m</span>
                </div>
                <div className="flex justify-between items-center border-b border-brand-200/60 pb-2">
                  <span className="text-brand-800 font-medium flex items-center gap-2"><Users className="h-4 w-4 text-brand-400" /> Average Wait:</span>
                  <span className="font-semibold text-brand-900">{simResults.ai_priority.avg_wait_mins}m</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-brand-800 font-medium">Wait Reduction:</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">-{simResults.improvement_pct}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
