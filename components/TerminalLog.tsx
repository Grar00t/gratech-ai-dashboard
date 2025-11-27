import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Filter, Pause, Play } from 'lucide-react';

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
  message: string;
}

const initialLogs: LogEntry[] = [
  { timestamp: "12:00:01", level: "INFO", message: "Initializing Comet Backbone verification sequence..." },
  { timestamp: "12:00:02", level: "INFO", message: "Target Subscription: dde8416c-6077-4b2b-b722-05bf8b782c44" },
  { timestamp: "12:00:03", level: "SUCCESS", message: "Azure connection established. Identity verified." },
  { timestamp: "12:00:15", level: "SUCCESS", message: "Certificate 'api-gratech-cert' found. Valid." },
  { timestamp: "12:00:20", level: "INFO", message: "Checking Azure DNS Zone 'gratech.sa' (gratech-resources)..." },
  { timestamp: "12:00:21", level: "SUCCESS", message: "Zone found. Authoritative NS: ns1-08.azure-dns.com" },
  { timestamp: "12:00:22", level: "INFO", message: "Verifying CNAME record 'api'..." },
  { timestamp: "12:00:22", level: "SUCCESS", message: "CNAME Verified: gratech-api-gateway.azure-api.net" },
  { timestamp: "12:00:24", level: "INFO", message: "Connecting to AI Resource: gratech-openai (East US 2)..." },
  { timestamp: "12:00:25", level: "SUCCESS", message: "AI Endpoint Verified: https://eastus2.api.cognitive.microsoft.com/" },
  { timestamp: "12:00:27", level: "SUCCESS", message: "STC DNS (KSA): RESOLVED (Immediate update confirmed)" },
  { timestamp: "12:00:28", level: "INFO", message: "Querying Google DNS (8.8.8.8)..." },
  { timestamp: "12:00:29", level: "WARN", message: "Google DNS: Propagation delay detected (TTL)." },
  { timestamp: "12:00:31", level: "INFO", message: "Direct Query to ns1-08.azure-dns.com..." },
  { timestamp: "12:00:32", level: "SUCCESS", message: "Authoritative Response: NOERROR. Record exists." },
  { timestamp: "12:01:00", level: "SUCCESS", message: "Neustar UltraDNS: RESOLVED" },
  { timestamp: "12:12:00", level: "SUCCESS", message: "Backbone Declaration: INFRASTRUCTURE 100% READY" },
  { timestamp: "12:12:10", level: "INFO", message: "APIM Gateway: gratech-api-gateway (Online)" },
  { timestamp: "12:12:30", level: "INFO", message: "Matrix telemetry stream established. Monitoring active." }
];

type FilterLevel = 'ALL' | 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';

export const TerminalLog: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>(initialLogs);
  const [filter, setFilter] = useState<FilterLevel>('ALL');
  const [autoScroll, setAutoScroll] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, filter, autoScroll]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
        const newLog: LogEntry = {
          timestamp,
          level: 'INFO',
          message: `Heartbeat check: ns1-08.azure-dns.com latency normal.`
        };
        setLogs(prev => [...prev, newLog]);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = logs.filter(log => filter === 'ALL' || log.level === filter);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'SUCCESS': return 'text-green-400';
      case 'WARN': return 'text-yellow-400';
      case 'ERROR': return 'text-red-400';
      case 'INFO': return 'text-blue-400';
      default: return 'text-slate-300';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden shadow-2xl flex flex-col h-[500px] font-mono text-sm relative">
      <div className="bg-slate-800 px-4 py-2 flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-700 gap-3 sm:gap-0">
        <div className="flex items-center space-x-2 text-slate-400">
          <Terminal size={16} />
          <span className="text-xs font-semibold">COMET-CLI // AZURE-LIVE</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          <Filter size={14} className="text-slate-500 mr-1 shrink-0" />
          {(['ALL', 'INFO', 'SUCCESS', 'WARN', 'ERROR'] as FilterLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`text-[10px] px-2 py-1 rounded border transition-colors whitespace-nowrap ${
                filter === level
                  ? 'bg-slate-700 text-white border-slate-500'
                  : 'bg-transparent text-slate-500 border-transparent hover:bg-slate-800 hover:text-slate-300'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 pl-4 border-l border-slate-700 ml-2">
           <button 
             onClick={() => setAutoScroll(!autoScroll)}
             className="text-slate-500 hover:text-cyan-400 transition-colors"
             title={autoScroll ? "Pause Scroll" : "Resume Scroll"}
           >
             {autoScroll ? <Pause size={14} /> : <Play size={14} />}
           </button>
           <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-1 bg-slate-950/50"
      >
        {filteredLogs.length === 0 ? (
           <div className="h-full flex flex-col items-center justify-center text-slate-600 italic">
              <Filter size={24} className="mb-2 opacity-50" />
              <p>No logs found for filter: {filter}</p>
           </div>
        ) : (
          filteredLogs.map((log, index) => (
            <div key={index} className="flex gap-3 hover:bg-slate-800/30 p-0.5 rounded transition-colors group">
              <span className="text-slate-600 text-xs shrink-0 select-none">[{log.timestamp}]</span>
              <span className={`text-[10px] font-bold w-16 shrink-0 ${getLevelColor(log.level)}`}>
                [{log.level}]
              </span>
              <span className={`${getLevelColor(log.level)} break-all opacity-90 group-hover:opacity-100`}>
                {log.message}
              </span>
            </div>
          ))
        )}
        {filter === 'ALL' && (
           <div className="flex items-center gap-2 mt-2 text-cyan-500/50 animate-pulse text-xs">
              <span className="mr-2">➜</span>
              <span>Polling Subscription dde8416c...</span>
              <span className="w-2 h-4 bg-cyan-500/50 block animate-pulse"></span>
           </div>
        )}
      </div>
      <div className="bg-slate-900 border-t border-slate-800 px-3 py-1.5 flex justify-between items-center text-[10px] text-slate-500 font-mono">
         <div className="flex gap-4">
            <span>RES: gratech-resources</span>
            <span>AI: East US 2</span>
            <span>NET: ns1-08</span>
         </div>
         <div>LINES: {logs.length}</div>
      </div>
    </div>
  );
};