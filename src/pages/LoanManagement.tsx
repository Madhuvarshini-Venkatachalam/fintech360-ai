import React from 'react';
import { motion } from 'motion/react';
import { 
  Landmark, RefreshCcw, ShieldAlert, CheckCircle, Percent, ArrowRight,
  TrendingDown, Info, Trash2, Check, Star 
} from 'lucide-react';
import { Loan } from '../types';

interface LoanManagementProps {
  loans: Loan[];
  onCloseLoan: (id: string) => void;
  onMarkDefault: (id: string) => void;
}

export default function LoanManagement({ loans, onCloseLoan, onMarkDefault }: LoanManagementProps) {
  
  const formatRupee = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">Active Loan Portfolios & Ledgers</h1>
        <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Disbursed Ledger Accounts and Loan Restructure Panel</p>
      </div>

      {/* Aggregate metrics for Lenders */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-white/60 border border-white/60 rounded-3xl">
          <span className="text-[10px] uppercase font-bold text-purple-900/60 font-mono tracking-wider">Disbursed Principal Pool</span>
          <h2 className="text-xl font-black text-purple-950 mt-1">
            {formatRupee(loans.reduce((sum, l) => sum + l.principalAmount, 0))}
          </h2>
          <p className="text-[10px] text-purple-700/60 font-semibold mt-1">Total capital allocated to market</p>
        </div>

        <div className="p-5 bg-white/60 border border-white/60 rounded-3xl">
          <span className="text-[10px] uppercase font-bold text-purple-900/60 font-mono tracking-wider font-mono">Total Outstanding Balance</span>
          <h2 className="text-xl font-black text-pink-600 mt-1">
            {formatRupee(loans.reduce((sum, l) => sum + l.outstandingAmount, 0))}
          </h2>
          <p className="text-[10px] text-pink-750/60 font-semibold mt-1">Active debt asset holdings</p>
        </div>

        <div className="p-5 bg-white/60 border border-white/60 rounded-3xl">
          <span className="text-[10px] uppercase font-bold text-purple-900/60 font-mono tracking-wider font-mono font-bold">Risk Exposure Defaulted</span>
          <h2 className="text-xl font-black text-amber-600 mt-1">
            {formatRupee(loans.filter(l => l.status === 'Defaulted').reduce((sum, l) => sum + l.outstandingAmount, 0))}
          </h2>
          <p className="text-[10px] text-amber-700/60 font-semibold mt-1">NPA Non-performing asset pool</p>
        </div>
      </div>

      {/* Active Loans Table/Cards Board */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {loans.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white/40 border border-purple-200/20 rounded-3xl">
            <Landmark className="w-10 h-10 text-purple-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-purple-950/50">No disbursed loans in the SaaS active registry yet.</p>
          </div>
        ) : (
          loans.map((loan) => {
            const paidOffAmount = loan.principalAmount - loan.outstandingAmount;
            const progressPercent = Math.min(100, Math.max(0, (paidOffAmount / loan.principalAmount) * 100));

            return (
              <motion.div
                key={loan.id}
                whileHover={{ y: -2 }}
                className="glass-card border border-white rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Card upper band */}
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase font-black text-purple-900 font-mono bg-purple-100 px-2 py-0.5 rounded-full inline-block">
                        {loan.category} Portfolio
                      </span>
                      <h3 className="text-md font-bold text-purple-950 mt-1.5">{loan.customerName}</h3>
                      <p className="text-[10px] text-purple-900/50 font-mono font-bold">Disbursement ID: {loan.id}</p>
                    </div>

                    <span className={`text-[10px] font-mono tracking-wider font-black px-3 py-1 rounded-full border ${
                      loan.status === 'Active' ? 'bg-purple-100 text-purple-700 border-purple-300/35' :
                      loan.status === 'Closed' ? 'bg-purple-200 text-purple-900 border-purple-300/40' :
                      'bg-pink-100 text-pink-700 border-pink-300/35 animate-pulse'
                    }`}>
                      {loan.status}
                    </span>
                  </div>

                  <div className="divider border-b border-purple-100/50 my-4"></div>

                  {/* Body Numbers */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-900/50">Principal</span>
                      <p className="text-xs font-bold text-purple-950 mt-0.5">{formatRupee(loan.principalAmount)}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-900/50">Outstanding</span>
                      <p className="text-xs font-bold text-pink-600 mt-0.5">{formatRupee(loan.outstandingAmount)}</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-900/50">EMI Rate</span>
                      <p className="text-xs font-bold text-purple-950 mt-0.5">{formatRupee(loan.emiAmount)}/mo</p>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-900/50">Interest</span>
                      <p className="text-xs font-bold text-purple-950 mt-0.5">{loan.interestRate}% p.a.</p>
                    </div>
                  </div>

                  {/* Progress Bar of Amortization */}
                  {loan.status !== 'Closed' && (
                    <div className="mt-5 space-y-2">
                      <div className="flex justify-between text-[11px] font-semibold text-purple-900/70">
                        <span>Amortized (Paid back): {formatRupee(paidOffAmount)}</span>
                        <span>{progressPercent.toFixed(0)}% Clear</span>
                      </div>
                      <div className="w-full bg-purple-100 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions row */}
                {loan.status === 'Active' && (
                  <div className="mt-6 pt-4 border-t border-purple-200/20 flex gap-2">
                    <button
                      onClick={() => onMarkDefault(loan.id)}
                      className="px-3 py-1.5 border border-pink-200 hover:bg-pink-100/40 text-pink-600 hover:text-pink-700 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                    >
                      <ShieldAlert className="w-4 h-4" /> Declare NPL/Default
                    </button>
                    
                    <button
                      onClick={() => onCloseLoan(loan.id)}
                      className="flex-1 py-1.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center gap-1 shadow-xs"
                    >
                      <CheckCircle className="w-4 h-4" /> Seal & Settle Account
                    </button>
                  </div>
                )}

                {loan.status === 'Defaulted' && (
                  <div className="mt-6 pt-4 border-t border-purple-200/20 bg-pink-50/40 p-3 rounded-xl flex items-center justify-between text-xs font-bold text-pink-700">
                    <p className="flex items-center gap-1">
                      <ShieldAlert className="w-4 h-4 text-pink-600 animate-bounce" /> Under active collection recovery.
                    </p>
                    <button
                      onClick={() => onCloseLoan(loan.id)}
                      className="px-3 py-1 bg-pink-600 text-white font-extrabold rounded-lg text-[10px] cursor-pointer"
                    >
                      Force Settlement
                    </button>
                  </div>
                )}

                {loan.status === 'Closed' && (
                  <div className="mt-6 pt-4 border-t border-purple-200/20 text-purple-900/60 text-xs font-semibold font-mono flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4 text-purple-600" /> This account is fully amortized, consolidated, and archived.
                  </div>
                )}
                
                <div className="absolute right-4 bottom-2 text-[9px] font-mono text-purple-900/30 font-bold">
                  Disbursed: {loan.disbursedDate}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

    </div>
  );
}
