import React from 'react';
import type { PriorityLevel } from '../../types/clinical';

const PRIORITY_CONFIG: Record<PriorityLevel, { label: string; bg: string; text: string; border: string; dot: string }> = {
  CRITICAL: { label: 'CRITICAL', bg: 'bg-red-50',    text: 'text-red-700',    border: 'border-red-300',    dot: 'bg-red-500' },
  HIGH:     { label: 'HIGH',     bg: 'bg-orange-50',  text: 'text-orange-700', border: 'border-orange-300', dot: 'bg-orange-500' },
  MEDIUM:   { label: 'MEDIUM',   bg: 'bg-amber-50',   text: 'text-amber-700',  border: 'border-amber-300',  dot: 'bg-amber-500' },
  LOW:      { label: 'LOW',      bg: 'bg-emerald-50', text: 'text-emerald-700',border: 'border-emerald-300',dot: 'bg-emerald-500' },
};

interface PriorityBadgeProps {
  priority: PriorityLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
}

/** Compact inline priority badge — used in patient list rows */
export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, size = 'sm', showLabel = true }) => {
  const cfg = PRIORITY_CONFIG[priority];
  const textSize = size === 'lg' ? 'text-xs' : 'text-[10px]';
  const padding  = size === 'lg' ? 'px-2.5 py-1' : 'px-2 py-0.5';
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-bold ${textSize} ${padding} ${cfg.bg} ${cfg.text} ${cfg.border}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${cfg.dot} ${priority === 'CRITICAL' ? 'animate-pulse' : ''}`} />
      {showLabel && cfg.label}
    </span>
  );
};

interface PriorityHeaderProps {
  priority: PriorityLevel;
  label?: string;
}

/** Prominent priority block shown at top of every patient profile */
export const PriorityHeader: React.FC<PriorityHeaderProps> = ({ priority, label = 'AI-Assisted Patient Priority' }) => {
  const cfg = PRIORITY_CONFIG[priority];
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${cfg.bg} ${cfg.border}`}>
      <div className={`flex items-center gap-2`}>
        <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot} ${priority === 'CRITICAL' ? 'animate-pulse' : ''}`} />
        <span className={`text-[10px] font-bold uppercase tracking-widest ${cfg.text}`}>{label}</span>
      </div>
      <span className={`text-xl font-black tracking-wider ${cfg.text}`}>{priority}</span>
    </div>
  );
};

/** Clinical disclaimer footer */
export const ClinicalDisclaimer: React.FC = () => (
  <div className="mt-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
    This system is an experimental clinical decision-support research prototype using synthetic/de-identified data.
    AI outputs are not clinically validated and must not be used independently for diagnosis or treatment.
    Clinical decisions remain with qualified healthcare professionals.
  </div>
);
