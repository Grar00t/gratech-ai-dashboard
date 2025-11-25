import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

const logs = [
  "[12:00:01] [INFO]  Initializing Comet Backbone verification sequence...",
  "[12:00:03] [SUCCESS] Azure connection established. Identity verified.",
  "[12:00:08] [SUCCESS] APIM Service Status: Online (Running).",
  "[12:00:15] [SUCCESS] Certificate 'api-gratech-cert' found. Valid.",
  "[12:00:20] [INFO]  Querying ns1-06.azure-dns.com...",
  "[12:00:21] [SUCCESS] CNAME record found: api.gratech.sa -> gratech-api-gateway.azure-api.net",
  "[12:00:25] [INFO]  Checking Global DNS Resolvers (Batch 1)...",
  "[12:00:27] [SUCCESS] Google DNS (8.8.8.8): RESOLVED",
  "[12:00:27] [SUCCESS] Cloudflare DNS (1.1.1.1): RESOLVED",
  "[12:00:30] [INFO]  Checking Regional & Specialist Resolvers (Batch 2)...",
  "[12:00:31] [SUCCESS] Neustar UltraDNS: RESOLVED (Latency: 12ms)",
  "[12:00:32] [SUCCESS] CleanBrowsing Security: RESOLVED (Latency: 18ms)",
  "[12:00:33] [SUCCESS] Yandex DNS: RESOLVED (Latency: 40ms)",
  "[12:00:34] [SUCCESS] Norton Safe Connect: RESOLVED (Latency: 22ms)",
  "[12:00:35] [SUCCESS] STC DNS (KSA): RESOLVED (Latency: 45ms)",
  "[12:01:00] [INFO]  Triggering APIM Custom Domain Binding...",
  "[12:12:00] [SUCCESS] Backbone Declaration: SYSTEM 75% OPERATIONAL",
  "[12:12:10] [INFO]  Executing automated endpoint verification test...",
  "[12:12:12] [INFO]  Running 'ensure_cname_record()' script...",
  "[12:12:13] [SUCCESS] CNAME integrity verified in Azure DNS Zone.",
  "[12:12:14] [INFO]  Checking SSL Certificate Validity & Expiration...",
  "[12:12:14] [SUCCESS] SSL Valid. NotAfter: 2026-02-22 (> 30 days).",
  "[12:12:15] [INFO]  Polling Azure APIM status...",
  "[12:12:16] [INFO]  Verifying Custom Domain Binding via Azure ARM...",
  "[12:12:17] [SUCCESS] APIM Binding Status: Succeeded.",
  "[12:12:18] [INFO]  Auto-healing monitor active. Watchdog running."
];

export const TerminalLog: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-2xl flex flex-col h-96 font-mono text-sm">
      <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center space-x-2 text-slate-400">
          <Terminal size={16} />
          <span className="text-xs font-semibold">COMET-CLI // OUTPUT</span>
        </div>
        <div className="flex space-x-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-1"
      >
        {logs.map((log, index) => {
          let color = "text-slate-300";
          if (log.includes("[SUCCESS]")) color = "text-green-400";
          if (log.includes("[WARN]")) color = "text-yellow-400";
          if (log.includes("[ERROR]")) color = "text-red-400";
          if (log.includes("[INFO]")) color = "text-blue-400";

          return (
            <div key={index} className={`${color} whitespace-pre-wrap break-all`}>
              <span className="opacity-50 mr-2">{index + 1}</span>
              {log}
            </div>
          );
        })}
        <div className="text-cyan-400 animate-pulse mt-2">
          $ _
        </div>
      </div>
    </div>
  );
};