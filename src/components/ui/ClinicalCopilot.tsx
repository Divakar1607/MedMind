import React, { useState } from 'react';
import { Bot, X, MessageSquare, Maximize2, Minimize2, Send } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export const ClinicalCopilot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: 'Hello! I am MediAI. How can I assist you clinically today?', timestamp: new Date() }
  ]);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    setInput('');
  };

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

      {/* Chat Body */}
      <div className="flex-1 bg-slate-50 p-4 overflow-y-auto flex flex-col gap-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-slate-200' : 'bg-brand-100 text-brand-600'}`}>
              {msg.role === 'user' ? <div className="w-5 h-5 bg-slate-400 rounded-full" /> : <Bot className="h-5 w-5" />}
            </div>
            <div className={`flex flex-col gap-1 ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
              <div className="flex items-center gap-2 px-1">
                <span className="text-xs font-medium text-slate-500">{msg.role === 'user' ? 'You' : 'MediAI'}</span>
                <span className="text-[10px] text-slate-400">{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === 'user' ? 'bg-brand-600 text-white rounded-tr-none shadow-md' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'}`}>
                {msg.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 bg-white border-t border-slate-100 shrink-0">
        <div className="relative flex items-center">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask anything about your patients..."
            className="flex-1 bg-slate-100 border-transparent focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-200 rounded-xl pl-4 pr-12 py-3 text-sm transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 p-2 text-brand-600 hover:bg-brand-50 rounded-lg disabled:opacity-50 transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
