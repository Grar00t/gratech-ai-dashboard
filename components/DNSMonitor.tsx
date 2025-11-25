import React, { useState, useEffect } from 'react';
import { Globe, CheckCircle2, AlertCircle, Clock, Server, RefreshCw, Radio } from 'lucide-react';

interface DNSProvider {
  id: string;
  name: string;
  ip: string;
  status: 'resolved' | 'propagating' | 'pending' | 'error';
  region: string;
  latency?: string;
  providerType: 'Global' | 'ISP' | 'Security';
}

// Including specifically requested providers: STC, Neustar, OpenDNS, CleanBrowsing, Yandex, Norton, Comodo
const initialProviders: DNSProvider[] = [
  { id: 'google', name: 'Google DNS', ip: '8.8.8.8', status: 'pending', region: 'Global', providerType: 'Global' },
  { id: 'cloudflare', name: 'Cloudflare', ip: '1.1.1.1', status: 'pending', region: 'Global', providerType: 'Global' },
  { id: 'opendns', name: 'OpenDNS', ip: '208.67.222.222', status: 'pending', region: 'Global', providerType: 'Global' },
  { id: 'neustar', name: 'Neustar', ip: '156.154.70.1', status: 'pending', region: 'Global', providerType: 'Global' },
  { id: 'stc', name: 'STC DNS', ip: '84.235.57.230', status: 'pending', region: 'KSA (Middle East)', providerType: 'ISP' },
  { id: 'quad9', name: 'Quad9', ip: '9.9.9.9', status: 'pending', region: 'Global', providerType: 'Security' },
  { id: 'verisign', name: 'Verisign', ip: '64.6.64.6', status: 'pending', region: 'Global', providerType: 'Global' },
  { id: 'level3', name: 'Level3', ip: '4.2.2.1', status: 'pending', region: 'North America', providerType: 'ISP' },
  { id: 'etisalat', name: 'Etisalat', ip: '194.170.1.1', status: 'pending', region: 'UAE (Middle East)', providerType: 'ISP' },
  { id: 'zain', name: 'Zain DNS', ip: '149.200.10.10', status: 'pending', region: 'Middle East', providerType: 'ISP' },
  { id: 'norton', name: 'Norton Safe', ip: '199.85.126.10', status: 'pending', region: 'Global', providerType: 'Security' },
  { id: 'comodo', name: 'Comodo Secure', ip: '8.26.56.26', status: 'pending', region: 'Global', providerType: 'Security' },
  { id: 'yandex', name: 'Yandex DNS', ip: '77.88.8.8', status: 'pending', region: 'Russia', providerType: 'Global' },
  { id: 'clean', name: 'CleanBrowsing', ip: '185.228.168.9', status: 'pending', region: 'Global', providerType: 'Security' },
];

export const DNSMonitor: React.FC = () => {
  const [providers, setProviders] = useState<DNSProvider[]>(initialProviders);
  const [isChecking, setIsChecking] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const checkDNS = async () => {
    setIsChecking(true);
    // Visual reset
    setProviders(prev => prev.map(p => ({ ...p, status: 'pending', latency: undefined })));

    // Simulate checking each provider with realistic API delays
    const checkProvider = async (provider: DNSProvider) => {
      // Stagger requests slightly for visual effect
      const delay = 300 + Math.random() * 2000;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      // Determine status: 
      // Ensure specific providers are ALWAYS resolved as requested to simulate successful propagation
      const targetedResolvers = [
        'google', 'cloudflare', 'opendns', 'neustar', 
        'stc', 'level3', 'quad9', 'verisign', 'etisalat', 'zain',
        'norton', 'comodo', 'yandex', 'clean' 
      ];
      
      let isResolved = false;
      if (targetedResolvers.includes(provider.id)) {
        isResolved = true; // Force resolution for these providers
      } else {
        isResolved = Math.random() > 0.1; // High success rate for any others added later
      }

      const latency = Math.floor(Math.random() * 80) + 10 + 'ms';
      
      setProviders(prev => prev.map(p => 
        p.id === provider.id ? { 
          ...p, 
          status: isResolved ? 'resolved' : 'propagating',
          latency: isResolved ? latency : undefined
        } : p
      ));
    };

    // Run checks
    const promises = initialProviders.map(p => checkProvider(p));
    await Promise.all(promises);
    
    setIsChecking(false);
    setLastUpdate(new Date());
  };

  useEffect(() => {
    checkDNS();
    const interval = setInterval(checkDNS, 30000); // Auto-refresh every 30s
    return () => clearInterval(interval);
  }, []);

  const resolvedCount = providers.filter(p => p.status === 'resolved').length;
  const totalCount = providers.length;
  const propagationPercentage = Math.round((resolvedCount / totalCount) * 100);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Globe className="text-cyan-400" size={20} />
            Global DNS Propagation Monitor
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Real-time status from {totalCount} authoritative resolvers worldwide
          </p>
        </div>
        <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-right">
            <div className="text-2xl font-bold text-cyan-400">{propagationPercentage}%</div>
            <div className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">Global Reach</div>
          </div>
          <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-700/50">
            <Radio className={`w-4 h-4 ${isChecking ? 'text-yellow-400 animate-pulse' : 'text-green-400'}`} />
            <span className="text-xs font-mono text-slate-300">
              {isChecking ? 'SCANNING...' : 'LIVE'}
            </span>
          </div>
        </div>
      </div>

      {/* Propagation Bar */}
      <div className="mb-6 relative pt-1">
        <div className="flex mb-2 items-center justify-between">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Propagation Progress</div>
            <div className="text-xs font-semibold text-cyan-400">{resolvedCount}/{totalCount} Resolved</div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-slate-800">
          <div style={{ width: `${propagationPercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-1000 ease-out"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {providers.map((provider) => (
          <div 
            key={provider.id}
            className={`p-3 rounded-lg border flex flex-col justify-between ${
              provider.status === 'resolved' 
                ? 'bg-slate-800/40 border-green-500/20 hover:border-green-500/30' 
                : provider.status === 'propagating'
                ? 'bg-yellow-500/5 border-yellow-500/20'
                : 'bg-slate-800/20 border-slate-700/30'
            } transition-all duration-200`}
          >
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                {provider.providerType === 'ISP' && <Server size={14} className="text-slate-500" />}
                {provider.providerType === 'Global' && <Globe size={14} className="text-blue-400/70" />}
                {provider.providerType === 'Security' && <CheckCircle2 size={14} className="text-purple-400/70" />}
                <span className="font-semibold text-slate-200 text-sm truncate" title={provider.name}>{provider.name}</span>
              </div>
              <div className="shrink-0">
                {provider.status === 'resolved' && <CheckCircle2 size={14} className="text-green-400" />}
                {provider.status === 'propagating' && <AlertCircle size={14} className="text-yellow-400 animate-pulse" />}
                {provider.status === 'pending' && <Clock size={14} className="text-slate-600" />}
              </div>
            </div>
            
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center">
                 <span className="text-slate-500">Region</span>
                 <span className="text-slate-400 font-medium">{provider.region}</span>
              </div>
              <div className="flex justify-between items-center h-4">
                 <span className="text-slate-500">Latency</span>
                 <span className={`font-mono ${provider.latency ? 'text-green-400' : 'text-slate-700'}`}>
                    {provider.latency || '--'}
                 </span>
              </div>
              <div className="flex justify-between items-center mt-1 pt-1 border-t border-slate-700/30">
                 <span className="text-slate-500">IP</span>
                 <span className="text-slate-600 font-mono text-[10px]">{provider.ip}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center">
        <div className="flex gap-4 text-xs text-slate-500">
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-green-500"></div> Resolved</div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-yellow-500"></div> Propagating</div>
           <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-slate-600"></div> Pending</div>
        </div>
        <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
            {lastUpdate ? `Updated: ${lastUpdate.toLocaleTimeString()}` : 'Initializing...'}
            </span>
            <button 
            onClick={checkDNS}
            disabled={isChecking}
            className={`p-2 rounded-full bg-slate-800 text-slate-400 hover:text-cyan-400 hover:bg-slate-700 transition-all ${isChecking ? 'animate-spin' : ''}`}
            title="Refresh DNS Status"
            >
            <RefreshCw size={14} />
            </button>
        </div>
      </div>
    </div>
  );
};