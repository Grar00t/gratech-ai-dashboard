import React from 'react';

export interface Phase {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  items: PhaseItem[];
}

export interface PhaseItem {
  label: string;
  status: 'success' | 'warning' | 'error' | 'pending';
  detail?: string;
}

export interface Metric {
  label: string;
  value: string;
  status: 'good' | 'warning' | 'neutral';
  icon?: React.ReactNode;
}

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'ERROR';
  message: string;
}