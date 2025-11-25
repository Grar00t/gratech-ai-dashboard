import React from 'react';
import { ShieldCheck, Activity } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="h-10 w-10 bg-cyan-500/10 rounded-lg flex items-center justify-center border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <ShieldCheck className="h-6 w-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 tracking-tight">
              GRATECH AI PLATFORM
            </h1>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono text-cyan-400">PROJECT CONTROL DASHBOARD</span>
              <span className="text-slate-600">|</span>
              <span className="text-xs text-slate-400">Comet Backbone</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right hidden md:block">
            <div className="text-xs text-slate-400 uppercase tracking-wider">Status</div>
            <div className="text-sm font-semibold text-green-400 flex items-center justify-end gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              PRODUCTION READY (v1.0.0)
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-xs text-slate-400 uppercase tracking-wider">ETA Full Op</div>
            <div className="text-sm font-mono text-yellow-400">15-30 MIN</div>
          </div>
        </div>
      </div>
    </header>
  );
};