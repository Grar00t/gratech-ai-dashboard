import React from 'react';
import { Globe, Server, Lock, Clock, Zap, CheckCircle2 } from 'lucide-react';

export const StatusCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Card 1: DNS */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg relative overflow-hidden group hover:border-blue-500/30 transition-all">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Globe size={48} className="animate-[spin_12s_linear_infinite]" />
        </div>
        <div className="flex justify-between items-start mb-2">
            <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">DNS Status</p>
                <h3 className="text-2xl font-bold text-white mt-1">75%</h3>
            </div>
            <div className="bg-blue-500/10 p-2 rounded-lg text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.15)]">
                <Globe size={20} className="animate-[spin_4s_linear_infinite]" />
            </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-1.5 rounded-full" style={{ width: '75%' }}></div>
        </div>
        <p className="text-xs text-slate-500">Propagation active</p>
      </div>

      {/* Card 2: Server */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg relative overflow-hidden group hover:border-cyan-500/30 transition-all">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Server size={48} />
        </div>
        <div className="flex justify-between items-start mb-2">
            <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Infrastructure</p>
                <h3 className="text-2xl font-bold text-white mt-1">100%</h3>
            </div>
            <div className="bg-cyan-500/10 p-2 rounded-lg text-cyan-400 border border-cyan-500/20 shadow-[0_0_10px_rgba(6,182,212,0.15)]">
                <Server size={20} />
            </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2">
            <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
        </div>
        <p className="text-xs text-slate-500">Azure Resources Active</p>
      </div>

       {/* Card 3: SSL */}
       <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg relative overflow-hidden group hover:border-green-500/30 transition-all">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Lock size={48} />
        </div>
        <div className="flex justify-between items-start mb-2">
            <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">SSL Security</p>
                <h3 className="text-2xl font-bold text-white mt-1">Locked</h3>
            </div>
            <div className="bg-green-500/10 p-2 rounded-lg text-green-400 border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.15)]">
                <Lock size={20} />
            </div>
        </div>
        <div className="flex gap-2 mt-2">
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">TLS 1.3</span>
            <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">HSTS</span>
        </div>
        <p className="text-xs text-green-500/80 mt-2 flex items-center gap-1">
            <CheckCircle2 size={10} /> Valid for 89 days
        </p>
      </div>

      {/* Card 4: ETA */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg relative overflow-hidden group hover:border-yellow-500/30 transition-all">
        <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
            <Zap size={48} />
        </div>
        <div className="flex justify-between items-start mb-2">
            <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Live In</p>
                <h3 className="text-2xl font-bold text-yellow-400 mt-1">15m</h3>
            </div>
            <div className="bg-yellow-500/10 p-2 rounded-lg text-yellow-400 border border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.15)]">
                <Clock size={20} className="animate-pulse" />
            </div>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-1.5 mb-2 overflow-hidden">
             <div className="bg-yellow-500 h-1.5 rounded-full animate-[progress_2s_ease-in-out_infinite]" style={{ width: '85%' }}></div>
        </div>
        <p className="text-xs text-slate-500">Awaiting APIM binding</p>
      </div>
    </div>
  );
};