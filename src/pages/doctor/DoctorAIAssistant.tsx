import React, { useState } from 'react';
import { BrainCircuit, Send, AlertTriangle, Sparkles } from 'lucide-react';
import { MOCK_PATIENTS } from '../../mock-data/clinicalData';
import { PriorityBadge } from '../../components/ui/Priority';

interface Message { role: 'user' | 'ai'; content: string }

const AI_RESPONSES: Record<string, string> = {
  'P-1001': `AI-GENERATED SUMMARY — Based on available patient records for Rajesh Mehta (P-1001).\n\n**Major Events:**\n• 20 Aug 2026: Admitted via Emergency following ST-elevation MI (STEMI). Code Blue activated at 14:32. ROSC achieved after 3 min CPR. Transferred to Cath Lab.\n• Nov 2024: Hypotensive episode during dialysis — resolved with IV fluids.\n\n**Relevant Conditions:** Known ischaemic heart disease, CKD Stage 3, Type 2 Diabetes Mellitus.\n\n**Allergy History:** Penicillin (Anaphylaxis — Life-threatening). Contrast dye / Iodine (Hives — Moderate). ⚠️ Contrast allergy relevant for any imaging procedures.\n\n**Current Medications of Note:** Aspirin 75mg, Atorvastatin 40mg, Metoprolol 25mg (all active). Clopidogrel previously completed.\n\n**Laboratory Trends:** Troponin I rising (2.11 → 4.82 ng/mL). CK-MB elevated (44 → 68 U/L). Creatinine trending up (1.6 → 1.8 mg/dL) — monitor renal function. BNP pending.\n\n**Important Note:** Patient has a critically elevated AI-estimated deterioration risk (93%). Close monitoring required.`,
  'P-1002': `AI-GENERATED SUMMARY — Based on available patient records for Priya Nair (P-1002).\n\n**Major Events:**\n• 22 Aug 2026: Admitted with acute ischaemic stroke (right MCA territory). Right-sided weakness and aphasia. CT confirmed ischaemic stroke. tPA administered within 3h window. Stabilised and transferred to Neurology ward.\n\n**Allergy History:** Aspirin (Bronchospasm — Severe). NSAIDs contraindicated. Current management does not include NSAIDs.\n\n**Current Medications:** Enoxaparin 40mg SC (active). Alteplase course completed.\n\n**Laboratory Trends:** PT/INR improving (1.6 → 1.4). Platelet count stable at 182 K/µL.\n\n**AI Priority:** HIGH (78% estimated risk). Neurological monitoring ongoing.`,
};

export const DoctorAIAssistant: React.FC = () => {
  const [selectedPatientId, setSelectedPatientId] = useState('P-1001');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const myPatients = MOCK_PATIENTS.filter(p => p.assignedDoctor === 'Dr. Arun Kumar');
  const patient = myPatients.find(p => p.id === selectedPatientId);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      const response = AI_RESPONSES[selectedPatientId] ?? 'Limited records available for this patient. Please refer to the clinical notes.';
      setMessages(m => [...m, { role: 'ai', content: response }]);
      setIsTyping(false);
    }, 1400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const quickPrompts = [
    'Give me a simple summary of this patient\'s previous medical history.',
    'What are the key allergy alerts for this patient?',
    'Summarise the recent laboratory trends.',
    'What are the most important things to review today?',
  ];

  return (
    <div className="space-y-5 h-full flex flex-col">
      <div>
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-brand-500" />
          <h1 className="text-2xl font-bold text-slate-900">AI Medical History Assistant</h1>
        </div>
        <p className="text-xs text-slate-500 mt-0.5">Ask questions about this patient's previous medical history and clinical records.</p>
      </div>

      {/* Safety Banner */}
      <div className="flex items-start gap-2.5 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
        <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
        <div>
          <strong>AI-Generated Summary</strong> — Based on available patient records. This assistant summarises existing records only.
          It does NOT diagnose, prescribe, or claim certainty. <strong>Doctor verification required.</strong>
        </div>
      </div>

      {/* Patient selector */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <p className="text-xs text-slate-400 font-bold mb-3">SELECT PATIENT</p>
        <div className="flex flex-wrap gap-2">
          {myPatients.map(p => (
            <button key={p.id} onClick={() => { setSelectedPatientId(p.id); setMessages([]); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${selectedPatientId === p.id ? 'border-brand-400 bg-brand-50 text-brand-700' : 'border-slate-200 text-slate-600'}`}>
              {p.name} <PriorityBadge priority={p.priority} showLabel={false} />
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white rounded-xl border border-slate-200 flex flex-col min-h-[400px]">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100">
          <Sparkles className="h-3.5 w-3.5 text-brand-500 animate-pulse" />
          <span className="text-xs font-bold text-slate-600">
            {patient?.name ?? 'Patient'} — Medical History Assistant
          </span>
          <span className="ml-auto text-[10px] text-slate-400 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full font-semibold text-amber-700">
            AI-ASSISTED · NOT A DIAGNOSIS
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">Quick prompts:</p>
              {quickPrompts.map(prompt => (
                <button key={prompt} onClick={() => { setInput(prompt); }}
                  className="block w-full text-left px-4 py-2.5 rounded-lg border border-slate-200 text-xs text-slate-600 hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700 transition-colors">
                  {prompt}
                </button>
              ))}
            </div>
          )}
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                msg.role === 'user'
                  ? 'bg-brand-700 text-white rounded-br-none'
                  : 'bg-slate-50 border border-slate-200 text-slate-700 rounded-bl-none'
              }`}>
                {msg.role === 'ai' && (
                  <div className="flex items-center gap-1.5 mb-2 text-[10px] font-bold text-brand-600">
                    <Sparkles className="h-3 w-3" /> AI-GENERATED SUMMARY · DOCTOR VERIFICATION REQUIRED
                  </div>
                )}
                {msg.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-50 border border-slate-200 rounded-xl rounded-bl-none px-4 py-3">
                <div className="flex gap-1">
                  {[0,1,2].map(i => <span key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-slate-100 p-3 flex gap-2">
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about this patient's medical history…"
            rows={2}
            className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-brand-400/20 focus:border-brand-400"
          />
          <button onClick={sendMessage} disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-brand-700 text-white rounded-lg hover:bg-brand-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1.5 text-xs font-semibold self-end">
            <Send className="h-3.5 w-3.5" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};
