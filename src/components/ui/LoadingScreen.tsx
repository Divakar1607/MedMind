import React from 'react';
import { useLoading } from '../../context/LoadingContext';
import { Activity } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const { isLoading, loadingText } = useLoading();

  if (!isLoading) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] backdrop-blur-md bg-slate-900/60 flex items-center justify-center transition-opacity duration-500"
      aria-live="assertive"
      aria-busy="true"
    >
      <div className="flex flex-col items-center justify-center text-center p-8 max-w-lg w-full">
        
        {/* Branding */}
        <div className="mb-12 space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Medi<span className="text-brand-400">AI</span>
          </h1>
          <h2 className="text-sm font-medium tracking-widest text-slate-300 uppercase">
            Clinical Intelligence Platform
          </h2>
        </div>

        {/* Central Animation Area */}
        <div className="relative w-64 h-32 mb-12 flex items-center justify-center">
          
          {/* ECG Waveform Loop */}
          <div className="absolute inset-0 flex items-center overflow-hidden">
            <svg className="ecg-line w-[200%] h-full opacity-70" viewBox="0 0 200 100" preserveAspectRatio="none">
              <path 
                d="M 0,50 L 80,50 L 85,30 L 90,70 L 95,50 L 180,50 L 185,30 L 190,70 L 195,50 L 200,50" 
                fill="none" 
                stroke="#60a5fa" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>

          {/* AI Data Flow Particles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
          </div>

          {/* Central AI Node */}
          <div className="relative z-10 ai-node-pulse flex items-center justify-center w-12 h-12 rounded-full bg-brand-900 border border-brand-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
            <Activity className="h-6 w-6 text-brand-300" />
            <div className="absolute inset-0 rounded-full border border-brand-400 opacity-50 medical-cross-spin"></div>
          </div>
          
        </div>

        {/* Loading Text */}
        <div className="h-8 mb-6">
          <p className="text-base font-medium text-slate-200 loading-text-fade">
            {loadingText}
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="w-48 h-[2px] bg-slate-700 relative overflow-hidden rounded-full">
          <div className="absolute top-0 bottom-0 left-0 bg-brand-500 w-full progress-line-anim rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
