import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  CreditCard, Plus, HelpCircle, CheckCircle, Clock, AlertCircle, Filter, 
  Search, X, Sparkles, Building, Phone, DollarSign, Wallet 
} from 'lucide-react';
import { PaymentTransaction } from '../types';

interface PaymentsProps {
  payments: PaymentTransaction[];
  onAddPayment: (payment: PaymentTransaction) => void;
}

export default function Payments({ payments, onAddPayment }: PaymentsProps) {
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [methodFilter, setMethodFilter] = useState<string>('All');

  // Form states
  const [customerName, setCustomerName] = useState('');
  const [amount, setAmount] = useState<number>(50000);
  const [method, setMethod] = useState<'UPI' | 'NetBanking' | 'Card' | 'ACH Auto-debit' | 'Cash'>('UPI');
  const [formError, setFormError] = useState('');

  // Filtering
  const filteredPayments = payments.filter(pay => {
    const matchesSearch = pay.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          pay.referenceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMethod = methodFilter === 'All' || pay.method === methodFilter;
    return matchesSearch && matchesMethod;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName) {
      setFormError('Borrower name is required.');
      return;
    }

    if (amount <= 0) {
      setFormError('Payment amount must be a positive number.');
      return;
    }

    // Generate random reference UTN code
    const generatedRef = `TXN-${method.toUpperCase().slice(0, 3)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPayment: PaymentTransaction = {
      id: `PAY-${Math.floor(7000 + Math.random() * 999)}`,
      customerName,
      amount: Number(amount),
      method,
      status: 'Successful',
      date: new Date().toISOString().split('T')[0],
      referenceId: generatedRef
    };

    onAddPayment(newPayment);
    setIsFormOpen(false);

    // Reset Form
    setCustomerName('');
    setAmount(50000);
    setMethod('UPI');
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
          <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">Accounts Receive & Payments Ledger</h1>
          <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">B2B Transaction UTN logs & direct payment reconciliations</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-semibold text-xs rounded-xl shadow-lg active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Rec Reconcile Payment
        </button>
      </div>

      {/* Aggregate metric card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-5 bg-purple-50 border border-purple-100 rounded-3xl">
          <span className="text-[10px] uppercase font-bold text-purple-900/60 font-mono tracking-wider">Gross Ledger Influx</span>
          <h2 className="text-2xl font-black text-purple-950 mt-1">
            {formatRupee(payments.filter(p => p.status === 'Successful').reduce((sum, p) => sum + p.amount, 0))}
          </h2>
          <p className="text-[10px] text-purple-700/60 font-semibold mt-1">Success node ACH/UPI transactions total</p>
        </div>

        <div className="p-5 bg-pink-50 border border-pink-100 rounded-3xl">
          <span className="text-[10px] uppercase font-bold text-purple-900/60 font-mono tracking-wider">Pending/Failed Pipeline</span>
          <h2 className="text-2xl font-black text-pink-600 mt-1">
            {formatRupee(payments.filter(p => p.status !== 'Successful').reduce((sum, p) => sum + p.amount, 0))}
          </h2>
          <p className="text-[10px] text-pink-700/60 font-semibold mt-1">Delinquent ACH Auto-debits in pipeline queue</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="glass-card border border-white rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-purple-500" />
          <input 
            type="text" 
            placeholder="Search payments by borrower name or UTN ref code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-purple-200/30 rounded-xl text-purple-950 text-xs focus:ring-1 focus:ring-purple-400 outline-none placeholder:text-purple-900/30 font-medium"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto shrink-0 justify-end">
          <span className="text-xs font-bold text-purple-900/60 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-purple-500" /> Method:
          </span>
          {['All', 'UPI', 'NetBanking', 'Card', 'ACH Auto-debit', 'Cash'].map((m) => (
            <button
              key={m}
              onClick={() => setMethodFilter(m)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                methodFilter === m 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-100/50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {m === 'ACH Auto-debit' ? 'ACH' : m}
            </button>
          ))}
        </div>
      </div>

      {/* Modal Dialog Form */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFormOpen(false)}
              className="absolute inset-0 bg-purple-950/20 backdrop-blur-xs"
            ></motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white/95 border border-purple-300 rounded-[32px] p-8 max-w-lg w-full relative z-10 shadow-2xl backdrop-blur-xl"
            >
              <button 
                onClick={() => setIsFormOpen(false)}
                className="absolute right-6 top-6 text-purple-950/40 hover:text-purple-950 p-1.5 rounded-full hover:bg-purple-100/50 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
                  <CreditCard className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-purple-950">Add Payment Manifest</h3>
                  <p className="text-xs text-purple-900/60 font-medium font-mono uppercase">Reconciliation Audit desk</p>
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3 bg-pink-100 text-pink-600 border border-pink-200 rounded-xl text-xs font-bold">
                  ⚠️ {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Borrower Company Name</label>
                  <input 
                    type="text" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Rajesh Nair" 
                    className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Payment Method</label>
                    <select 
                      value={method}
                      onChange={(e) => setMethod(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                    >
                      <option value="UPI">UPI Payout node</option>
                      <option value="NetBanking">NetBanking (IMPS/NEFT)</option>
                      <option value="Card">Visa/Mastercard Gateway</option>
                      <option value="ACH Auto-debit">ACH Automated Mandate</option>
                      <option value="Cash">Physical Cash Receipt</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Reconciled Sum (₹)</label>
                    <input 
                      type="number" 
                      value={amount} 
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                    />
                  </div>
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button" 
                    onClick={() => setIsFormOpen(false)}
                    className="flex-1 py-3 border border-purple-200 hover:bg-purple-100/50 text-purple-950 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    Reconcile UTN
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Received Transactions Table List */}
      <div className="glass-card border border-white rounded-[24px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-purple-100/50 text-purple-950 font-black uppercase font-mono tracking-wider border-b border-purple-200/20">
                <th className="p-4 pl-6">Receipt / UTN</th>
                <th className="p-4">Borrower Name</th>
                <th className="p-4">Method</th>
                <th className="p-4">Status</th>
                <th className="p-4">Credited Date</th>
                <th className="p-4 pr-6 text-right">Inflow Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100/30 text-purple-950 font-medium">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-purple-900/50 font-bold">
                    No payment ledger items found matching selection.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((pay) => (
                  <tr key={pay.id} className="hover:bg-white/40 transition-colors">
                    <td className="p-4 pl-6">
                      <div className="font-bold flex items-center gap-1.5">
                        <span className="text-[10px] text-purple-400 bg-purple-100/80 px-1.5 py-0.5 rounded-sm font-mono">{pay.id}</span>
                        <span className="font-mono font-semibold text-purple-700">{pay.referenceId}</span>
                      </div>
                    </td>
                    <td className="p-4 font-bold">{pay.customerName}</td>
                    <td className="p-4 font-mono font-bold text-[10px]">{pay.method}</td>
                    <td className="p-4">
                      {pay.status === 'Successful' && (
                        <span className="inline-flex items-center gap-1 text-[10px] ring-1 ring-purple-300 bg-purple-100 text-purple-700 px-2.5 py-0.5 rounded-full font-bold">
                          ● Successful
                        </span>
                      )}
                      {pay.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1 text-[10px] ring-1 ring-amber-300 bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full font-bold">
                          ● Pending
                        </span>
                      )}
                      {pay.status === 'Failed' && (
                        <span className="inline-flex items-center gap-1 text-[10px] ring-1 ring-pink-300 bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full font-bold">
                          ● Failed
                        </span>
                      )}
                    </td>
                    <td className="p-4 font-mono">{pay.date}</td>
                    <td className="p-4 pr-6 text-right font-black text-purple-950">{formatRupee(pay.amount)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
