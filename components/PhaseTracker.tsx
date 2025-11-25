import React from 'react';
import { CheckCircle2, CircleDashed, Loader2, Clock, Activity } from 'lucide-react';
import { Phase } from '../types';

const phases: Phase[] = [
  {
    id: 1,
    title: "Infrastructure Deployment",
    status: 'completed',
    items: [
      { label: "Azure Resource Group", status: 'success' },
      { label: "API Management Service", status: 'success' },
      { label: "Key Vault & Certs", status: 'success' },
    ]
  },
  {
    id: 2,
    title: "DNS & Configuration",
    status: 'completed',
    items: [
      { label: "CNAME Record", status: 'success', detail: "gratech-api-gateway.azure-api.net" },
      { label: "NameServers", status: 'success', detail: "Azure DNS" },
      { label: "Local Resolution", status: 'success' },
    ]
  },
  {
    id: 3,
    title: "Global Propagation",
    status: 'in-progress',
    items: [
      { label: "Major DNS (Google/Cloudflare)", status: 'success' },
      { label: "Regional DNS", status: 'warning', detail: "Propagating..." },
    ]
  },
  {
    id: 4,
    title: "APIM Custom Binding",
    status: 'in-progress',
    items: [
      { label: "Certificate Binding", status: 'success' },
      { label: "Domain Validation", status: 'warning', detail: "Processing" },
    ]
  },
  {
    id: 5,
    title: "Automation & Monitor",
    status: 'completed',
    items: [
      { label: "GitHub Actions", status: 'success' },
      { label: "Systemd Service", status: 'success' },
    ]
  }
];

export const PhaseTracker: React.FC = () => {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg h-full">
      <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
        <Activity className="text-cyan-400" size={20} />
        Deployment Phases
      </h3>
      <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
        {phases.map((phase) => (
          <div key={phase.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10">
                {phase.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : phase.status === 'in-progress' ? (
                  <Loader2 className="w-5 h-5 text-yellow-500 animate-spin" />
                ) : (
                  <CircleDashed className="w-5 h-5 text-slate-500" />
                )}
            </div>
            
            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-800/50 p-4 rounded-lg border border-slate-700/50 shadow-sm backdrop-blur-sm transition-all hover:bg-slate-800 hover:border-slate-600">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-slate-200">{phase.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full border ${
                  phase.status === 'completed' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                  phase.status === 'in-progress' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                  'bg-slate-700 text-slate-400 border-slate-600'
                }`}>
                  {phase.status === 'completed' ? 'COMPLETE' : phase.status === 'in-progress' ? 'IN PROGRESS' : 'PENDING'}
                </span>
              </div>
              <ul className="space-y-2">
                {phase.items.map((item, idx) => (
                  <li key={idx} className="flex items-start justify-between text-sm">
                    <span className="text-slate-400 flex items-center gap-2">
                       <span className={`w-1.5 h-1.5 rounded-full ${
                           item.status === 'success' ? 'bg-green-500' :
                           item.status === 'warning' ? 'bg-yellow-500 animate-pulse' :
                           'bg-slate-600'
                       }`}></span>
                       {item.label}
                    </span>
                    {item.detail && (
                      <span className="text-xs font-mono text-slate-500">{item.detail}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};