import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TerminalLog } from './components/TerminalLog';
import { PhaseTracker } from './components/PhaseTracker';
import { StatusCards } from './components/StatusCards';
import { BackboneDeclaration } from './components/BackboneDeclaration';
import { DNSMonitor } from './components/DNSMonitor';
import { EndpointHealth } from './components/EndpointHealth';
import { SuperBrain } from './components/SuperBrain';
import { ExternalLink } from 'lucide-react';

const App: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Meta Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h2 className="text-2xl font-bold text-white mb-1">Deployment Overview</h2>
                <p className="text-slate-400 text-sm">Real-time infrastructure status report</p>
            </div>
            <div className="flex flex-wrap gap-3">
                <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-slate-300 font-mono">api.gratech.sa</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm font-mono text-slate-400">
                    {time.toLocaleTimeString()} UTC+03
                </div>
            </div>
        </div>

        {/* Status Metrics Grid */}
        <StatusCards />

        {/* Super Brain Interface */}
        <div className="mb-8">
          <SuperBrain />
        </div>

        {/* Detailed Global DNS Monitor */}
        <div className="mb-8">
          <DNSMonitor />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Phases & Health */}
            <div className="lg:col-span-2 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <PhaseTracker />
                  <EndpointHealth />
                </div>
            </div>

            {/* Right Column: Terminal & Actions */}
            <div className="space-y-8">
                <TerminalLog />
                
                {/* Quick Actions */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-white mb-4">Required Actions</h3>
                    <div className="space-y-3">
                         <div className="p-3 rounded-lg border border-slate-700 bg-slate-800/30">
                            <h4 className="text-sm font-semibold text-slate-200 mb-1">1. Verify Registrar</h4>
                            <p className="text-xs text-slate-400 mb-2">Ensure NS records match Azure DNS.</p>
                            <button className="w-full text-xs bg-slate-700 hover:bg-slate-600 text-white py-2 rounded transition-colors flex items-center justify-center gap-2">
                                <ExternalLink size={12} /> Check Registrar
                            </button>
                         </div>
                         
                         <div className="p-3 rounded-lg border border-yellow-700/30 bg-yellow-500/5">
                            <h4 className="text-sm font-semibold text-yellow-200 mb-1">2. Wait for Propagation</h4>
                            <p className="text-xs text-yellow-200/70 mb-2">Estimated remaining: 15-30 mins.</p>
                            <div className="w-full bg-slate-800 rounded-full h-1">
                                <div className="bg-yellow-500 h-1 rounded-full animate-pulse" style={{width: '75%'}}></div>
                            </div>
                         </div>

                         <div className="p-3 rounded-lg border border-green-700/30 bg-green-500/5 opacity-50 cursor-not-allowed">
                            <h4 className="text-sm font-semibold text-green-200 mb-1">3. Start Monitoring</h4>
                            <p className="text-xs text-green-200/70 mb-2">Execute when endpoint is live.</p>
                            <code className="block bg-black/30 p-1.5 rounded text-[10px] font-mono text-green-300">sudo systemctl start gratech-ssl-monitor</code>
                         </div>
                    </div>
                </div>
            </div>
        </div>

        <BackboneDeclaration />

      </main>
      
      {/* Footer */}
      <footer className="border-t border-slate-900 mt-12 py-8 bg-slate-950 text-center">
         <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-slate-500 text-sm font-semibold">
                Powered by <span className="text-cyan-400">Gratech.sa</span>
            </p>
            <p className="text-slate-600 text-xs">
                Sulaiman Alshammari
            </p>
         </div>
      </footer>
    </div>
  );
};

export default App;