import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface LayoutProps {
  userRole?: string;
  userName?: string;
  onLogout?: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ userRole = 'doctor', userName, onLogout }) => {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar userRole={userRole} />
      <div className="flex flex-col flex-1 w-full min-w-0">
        <Header userRole={userRole} userName={userName} onLogout={onLogout} />
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
