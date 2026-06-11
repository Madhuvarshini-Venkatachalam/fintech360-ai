import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileSpreadsheet, Download, RefreshCw, FileText, CalendarRange, Filter,
  CheckCircle, Table, CheckCircle2, ChevronRight, AlertTriangle, Coins 
} from 'lucide-react';
import { Loan, PaymentTransaction, Collection } from '../types';

interface ReportsProps {
  loans: Loan[];
  payments: PaymentTransaction[];
  collections: Collection[];
}

type ReportTab = 'disbursements' | 'repayments' | 'overdues';

export default function Reports({ loans, payments, collections }: ReportsProps) {
  
  const [period, setPeriod] = useState<'Monthly' | 'Quarterly' | 'Annually'>('Monthly');
  const [activeTab, setActiveTab] = useState<ReportTab>('disbursements');
  const [exportTrigger, setExportTrigger] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Export simulator
  const handleExport = (format: 'CSV' | 'PDF') => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setExportTrigger(`Your financial audit report for period ${period} has been compiled and downloaded securely as a ${format} file on the browser.`);
    }, 1500);
  };

  const formatRupee = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">Compliance & Summary Audit Reports</h1>
          <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">B2B Institutional Regulatory and Amortization Audits</p>
        </div>

        {/* Period Dropdowns */}
        <div className="flex bg-purple-100 p-1.5 rounded-2xl border border-purple-200/50">
          {(['Monthly', 'Quarterly', 'Annually'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 font-black text-xs font-mono rounded-xl cursor-pointer transition-all ${
                period === p ? 'bg-purple-600 text-white shadow-xs' : 'text-purple-700 hover:text-purple-950'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Export Toolbar */}
      <div className="glass-card border border-white rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <CalendarRange className="w-5 h-5 text-purple-600" />
          <span className="text-xs font-bold text-purple-950">
            Audit Frame: <span className="text-purple-700 font-mono font-bold font-black">{period} ledger sheets</span> • Verified compliant
          </span>
        </div>

        <div className="flex gap-2 self-stretch sm:self-auto justify-end">
          <button
            onClick={() => handleExport('CSV')}
            disabled={loading}
            className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200/80 hover:bg-purple-200 text-purple-800 font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-purple-200"
          >
            <FileSpreadsheet className="w-4 h-4 text-purple-600" /> Export CSV Sheet
          </button>
          <button
            onClick={() => handleExport('PDF')}
            disabled={loading}
            className="flex-1 sm:flex-none px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-bold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-md shadow-purple-500/10"
          >
            <Download className="w-4 h-4" /> Generate PDF Ledger
          </button>
        </div>
      </div>

      {/* Audit Categories Tabs */}
      <div className="border-b border-purple-100 flex gap-4 text-xs font-bold font-mono">
        <button
          onClick={() => setActiveTab('disbursements')}
          className={`pb-3 border-b-2 px-1 cursor-pointer transition-all ${
            activeTab === 'disbursements' ? 'border-purple-600 text-purple-950' : 'border-transparent text-purple-900/40 hover:text-purple-900/80'
          }`}
        >
          Disbursements Audit ({loans.length})
        </button>
        <button
          onClick={() => setActiveTab('repayments')}
          className={`pb-3 border-b-2 px-1 cursor-pointer transition-all ${
            activeTab === 'repayments' ? 'border-purple-600 text-purple-950' : 'border-transparent text-purple-900/40 hover:text-purple-900/80'
          }`}
        >
          Repayments Audit ({payments.length})
        </button>
        <button
          onClick={() => setActiveTab('overdues')}
          className={`pb-3 border-b-2 px-1 cursor-pointer transition-all ${
            activeTab === 'overdues' ? 'border-purple-600 text-purple-950' : 'border-transparent text-purple-900/40 hover:text-purple-900/80'
          }`}
        >
          Overdue Delinquencies ({collections.filter(c => c.status === 'Overdue').length})
        </button>
      </div>

      {/* Audit Tables */}
      <div className="glass-card border border-white rounded-[24px] overflow-hidden">
        <div className="overflow-x-auto">
          
          {activeTab === 'disbursements' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-purple-100/50 text-purple-950 font-black uppercase font-mono tracking-wider border-b border-purple-200/20">
                  <th className="p-4 pl-6">Disbursement ID</th>
                  <th className="p-4">Borrower Company</th>
                  <th className="p-4 font-mono">Interest Rate</th>
                  <th className="p-4">Amort Status</th>
                  <th className="p-4 pr-6 text-right">Disbursed Principal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100/30 text-purple-950 font-medium">
                {loans.map(loan => (
                  <tr key={loan.id} className="hover:bg-white/40 transition-colors">
                    <td className="p-4 pl-6 font-mono font-bold text-purple-600">{loan.id}</td>
                    <td className="p-4 font-bold">{loan.customerName}</td>
                    <td className="p-4 font-mono font-semibold">{loan.interestRate}% p.a.</td>
                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase border font-mono ${
                        loan.status === 'Active' ? 'bg-purple-100 text-purple-700 border-purple-200' :
                        loan.status === 'Closed' ? 'bg-purple-200 text-purple-900 border-purple-300/50' :
                        'bg-pink-100 text-pink-700 border-pink-200 animate-pulse'
                      }`}>
                        {loan.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right font-black text-purple-950">{formatRupee(loan.principalAmount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'repayments' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-purple-100/50 text-purple-950 font-bold uppercase font-mono tracking-wider border-b border-purple-200/20">
                  <th className="p-4 pl-6">Settlement ID</th>
                  <th className="p-4">Account name</th>
                  <th className="p-4">Channel node</th>
                  <th className="p-4">Reconciled Status</th>
                  <th className="p-4 pr-6 text-right">Influx Capital</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100/30 text-purple-950 font-medium">
                {payments.map(pay => (
                  <tr key={pay.id} className="hover:bg-white/40 transition-colors">
                    <td className="p-4 pl-6 font-mono font-semibold text-purple-600">{pay.id}</td>
                    <td className="p-4 font-bold">{pay.customerName}</td>
                    <td className="p-4 font-mono text-[10px] uppercase font-bold text-purple-900/60">{pay.method}</td>
                    <td className="p-4">
                      <span className={`inline-block font-mono text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                        pay.status === 'Successful' ? 'bg-purple-100 text-purple-700 border-purple-200' : 'bg-pink-100 text-pink-600 border-pink-200'
                      }`}>
                        ● {pay.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right font-black text-purple-950">{formatRupee(pay.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {activeTab === 'overdues' && (
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-purple-100/50 text-purple-950 font-bold uppercase font-mono tracking-wider border-b border-purple-200/20">
                  <th className="p-4 pl-6">Reference ID</th>
                  <th className="p-4">Borrower Contact</th>
                  <th className="p-4">Recovery Agent</th>
                  <th className="p-4">Mandate Warning</th>
                  <th className="p-4 pr-6 text-right">Arrears Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-100/30 text-purple-950 font-medium">
                {collections.filter(c => c.status === 'Overdue').length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-purple-900/50 font-bold">
                      🎉 Stellar! Zero overdue arrears in database pipeline. Non-performing assets at 0%.
                    </td>
                  </tr>
                ) : (
                  collections.filter(c => c.status === 'Overdue').map(coll => (
                    <tr key={coll.id} className="hover:bg-white/40 transition-colors">
                      <td className="p-4 pl-6 font-mono font-semibold text-purple-600">{coll.id}</td>
                      <td className="p-4 font-bold">{coll.customerName}</td>
                      <td className="p-4 font-bold">{coll.collectorName}</td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono text-pink-600 bg-pink-100 border border-pink-200 px-2.5 py-0.5 rounded-full animate-pulse">
                          <AlertTriangle className="w-3 h-3 text-pink-600" /> DELINQUENCY WARNING
                        </span>
                      </td>
                      <td className="p-4 pr-6 text-right font-black text-pink-600">{formatRupee(coll.amountDue)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}

        </div>
      </div>

      {/* Loader simulator */}
      {loading && (
        <div className="fixed inset-0 bg-purple-950/20 backdrop-blur-xs flex items-center justify-center z-50">
          <div className="bg-white/90 border border-purple-200 rounded-3xl p-6 shadow-2xl flex flex-col items-center gap-4">
            <RefreshCw className="w-8 h-8 text-purple-600 animate-spin" />
            <p className="text-xs font-bold text-purple-950 tracking-wide">Compiling financial ledgers. Please wait...</p>
          </div>
        </div>
      )}

      {/* Export Callback Alert Dialog Modal */}
      <AnimatePresence>
        {exportTrigger && (
          <div className="fixed inset-0 bg-purple-950/10 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white/95 border border-purple-300 rounded-3xl p-8 max-w-sm text-center shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-md font-black text-purple-950 mb-2">Audit Ledger Export Successful</h3>
              <p className="text-xs text-purple-900/75 leading-relaxed font-semibold mb-6">{exportTrigger}</p>
              <button
                onClick={() => setExportTrigger(null)}
                className="w-full py-2.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-95 text-white font-bold text-xs rounded-xl cursor-pointer"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
