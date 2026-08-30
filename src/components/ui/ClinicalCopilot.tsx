import React, { useState } from 'react';
import { Bot, X, MessageSquare, Maximize2, Minimize2 } from 'lucide-react';

export const ClinicalCopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-brand-600 text-white rounded-full shadow-lg hover:bg-brand-700 transition-all z-50 flex items-center justify-center group"
      >
        <Bot className="h-6 w-6 group-hover:scale-110 transition-transform" />
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all duration-300 ${isExpanded ? 'w-[600px] h-[800px] max-h-[90vh]' : 'w-[400px] h-[600px] max-h-[80vh]'}`}>
      
      {/* Header */}
      <div className="bg-brand-900 text-white p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-800 rounded-full flex items-center justify-center">
            <Bot className="h-5 w-5 text-brand-300" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">Clinical Copilot</h3>
            <p className="text-xs text-brand-300">MediAI Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-brand-300">
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-1.5 hover:bg-brand-800 rounded-md transition-colors">
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </button>
          <button onClick={() => setIsOpen(false)} className="p-1.5 hover:bg-brand-800 rounded-md transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Body Placeholder */}
      <div className="flex-1 bg-slate-50 p-4 overflow-y-auto">
        <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3">
          <MessageSquare className="h-8 w-8 opacity-50" />
          <p className="text-sm">How can I assist you clinically today?</p>
        </div>
      </div>

      {/* Footer Placeholder */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Ask anything about your patients..."
            className="w-full bg-slate-100 border-transparent focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 rounded-xl pl-4 pr-12 py-3 text-sm transition-all"
            disabled
          />
        </div>
      </div>
    </div>
  );
};
