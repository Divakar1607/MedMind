import React, { createContext, useContext, useState, ReactNode } from 'react';

type LoadingType = 'app' | 'auth' | 'patient' | 'ai_processing' | 'prediction' | 'ai_summary';

interface LoadingContextType {
  isLoading: boolean;
  loadingText: string;
  showLoading: (text?: string, type?: LoadingType) => void;
  hideLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingText, setLoadingText] = useState('Initializing Clinical Intelligence...');

  const showLoading = (text?: string, type?: LoadingType) => {
    let defaultText = 'Initializing Clinical Intelligence...';
    if (type === 'auth') defaultText = 'Verifying Secure Access...';
    if (type === 'patient') defaultText = 'Preparing Patient Intelligence...';
    if (type === 'ai_processing') defaultText = 'Analyzing Multimodal Clinical Data...';
    if (type === 'prediction') defaultText = 'Generating Model Prediction...';
    if (type === 'ai_summary') defaultText = 'Preparing AI Clinical Summary...';

    setLoadingText(text || defaultText);
    setIsLoading(true);
  };

  const hideLoading = () => {
    setIsLoading(false);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, loadingText, showLoading, hideLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};
