import React from 'react';
import { motion } from 'motion/react';
import { 
  Calendar, CheckCircle, Clock, AlertTriangle, ShieldCheck, RefreshCcw, 
  HelpCircle, Info, Send, Landmark, Coins 
} from 'lucide-react';
import { EmiSchedule } from '../types';

interface EMITrackerProps {
  schedules: EmiSchedule[];
  onTriggerEmiPayment: (id: string) => void;
}

export default function EMITracker({ schedules, onTriggerEmiPayment }: EMITrackerProps) {

  const formatRupee = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const getStatusStyle = (status: 'Paid' | 'Upcoming' | 'Overdue') => {
    switch (status) {
      case 'Paid':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Upcoming':
        return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Overdue':
        return 'bg-pink-100 text-pink-600 border-pink-200 animate-pulse';
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">Monthly EMI Tracker Ledger</h1>
        <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Real-time ACH auto-debit triggers & mandate verification</p>
      </div>

      {/* Overview stats boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4 bg-white/60 border border-white/60 rounded-3xl">
          <span className="text-[10px] uppercase font-bold text-purple-900/50 font-mono">Paid EMIs (Consolidated)</span>
          <h3 className="text-lg font-black text-purple-950 mt-1">
            {schedules.filter(s => s.status === 'Paid').length} invoices settled
          </h3>
          <p className="text-[10px] text-purple-700/60 mt-1">Funds locked safe in main trust node</p>
        </div>

        <div className="p-4 bg-white/60 border border-white/60 rounded-3xl">
          <span className="text-[10px] uppercase font-bold text-purple-900/50 font-mono">Upcoming (Next 30 Days)</span>
          <h3 className="text-lg font-black text-amber-600 mt-1">
            {schedules.filter(s => s.status === 'Upcoming').length} invoices queued
          </h3>
          <p className="text-[10px] text-amber-700/60 mt-1">ACH NACH mandate loops active</p>
        </div>

        <div className="p-4 bg-white/60 border border-white/60 rounded-3xl">
          <span className="text-[10px] uppercase font-bold text-purple-900/50 font-mono">Default / Overdue Warnings</span>
          <h3 className="text-lg font-black text-pink-600 mt-1">
            {schedules.filter(s => s.status === 'Overdue').length} delinquency blocks
          </h3>
          <p className="text-[10px] text-pink-700/60 mt-1">Triggers auto collections escalations</p>
        </div>
      </div>

      {/* Schedules list board */}
      <div className="space-y-4">
        {schedules.length === 0 ? (
          <div className="text-center py-12 bg-white/40 border border-purple-200/20 rounded-3xl">
            <Calendar className="w-10 h-10 text-purple-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-purple-950/50">No scheduled monthly amortization EMIs found.</p>
          </div>
        ) : (
          schedules.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -1 }}
              className="glass-card border border-white rounded-[20px] p-5 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:shadow-md transition-shadow"
            >
              {/* Status block color ribbon */}
              <div className={`absolute top-0 bottom-0 left-0 w-1.5 ${
                item.status === 'Paid' ? 'bg-purple-500' :
                item.status === 'Upcoming' ? 'bg-amber-400' :
                'bg-pink-500'
              }`}></div>

              <div className="pl-4 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-black text-purple-950">{item.customerName}</span>
                  <span className="text-[10px] font-mono font-bold text-purple-500">EMI invoice: {item.id}</span>
                  <span className="text-[10px] font-mono font-bold text-purple-900 bg-purple-100/60 px-2 py-0.5 rounded-full">
                    Loan ref: {item.loanId}
                  </span>
                </div>
                <p className="text-xs font-semibold text-purple-900/60">
                  Amortization sequence: <strong className="text-purple-950">{item.emiNumber} of {item.totalEmis} installment</strong> • Due Date: <span className="font-mono text-purple-950 font-bold">{item.dueDate}</span>
                </p>
                <div className="text-sm font-black text-purple-950 flex items-center gap-1 mt-1">
                  <Coins className="w-4 h-4 text-purple-500" /> Amount due: {formatRupee(item.amount)}
                </div>
              </div>

              <div className="flex items-center gap-3 self-stretch md:self-auto justify-end">
                <span className={`text-[10px] uppercase font-bold font-mono px-3 py-1.5 rounded-full border ${getStatusStyle(item.status)}`}>
                  {item.status}
                </span>

                {item.status !== 'Paid' && (
                  <button
                    onClick={() => onTriggerEmiPayment(item.id)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white text-xs font-black rounded-xl shadow-md active:scale-98 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCcw className="w-3.5 h-3.5" /> Trigger Mandate ACH
                  </button>
                )}

                {item.status === 'Paid' && (
                  <div className="text-purple-600 text-xs font-semibold font-mono flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> Cleared Node
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>

    </div>
  );
}
