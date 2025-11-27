import React, { useState, useEffect } from 'react';
import { Globe, CheckCircle2, AlertCircle, Clock, Server, RefreshCw, Radio, XCircle } from 'lucide-react';

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
      // EXCEPT Google DNS which currently has issues per prompt
      const targetedResolvers = [
        'cloudflare', 'opendns', 'neustar', 
        'stc', 'level3', 'quad9', 'verisign', 'etisalat', 'zain',
        'norton', 'comodo', 'yandex', 'clean' 
      ];
      
      let isResolved = false;
      let latencyStr = '';

      if (provider.id === 'google') {
          isResolved = false; // Simulate NXDOMAIN per user report
          latencyStr = 'NXDOMAIN';
      } else if (targetedResolvers.includes(provider.id)) {
        isResolved = true; // Force resolution for these providers
        latencyStr = Math.floor(Math.random() * 80) + 10 + 'ms';
      } else {
        isResolved = Math.random() > 0.1; 
        latencyStr = Math.floor(Math.random() * 80) + 10 + 'ms';
      }
      
      setProviders(prev => prev.map(p => 
        p.id === provider.id ? { 
          ...p, 
          status: isResolved ? 'resolved' : (provider.id === 'google' ? 'error' : 'propagating'),
          latency