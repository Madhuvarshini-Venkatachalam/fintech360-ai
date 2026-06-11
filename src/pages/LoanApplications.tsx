import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, Sparkles, Receipt, CheckCircle, XCircle, Clock, Plus, Filter,
  DollarSign, Percent, Calendar, ArrowRight, UserPlus, Info, Check, X
} from 'lucide-react';
import { LoanApplication, Customer } from '../types';

interface LoanApplicationsProps {
  applications: LoanApplication[];
  registeredCustomers: Customer[];
  onAddApplication: (app: LoanApplication) => void;
  onApproveApplication: (id: string) => void;
  onRejectApplication: (id: string) => void;
}

export default function LoanApplications({ 
  applications, 
  registeredCustomers, 
  onAddApplication, 
  onApproveApplication, 
  onRejectApplication 
}: LoanApplicationsProps) {
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  
  // Submit Form States
  const [customerName, setCustomerName] = useState('');
  const [category, setCategory] = useState<'Personal' | 'Gold' | 'Business' | 'Vehicle' | 'Home'>('Business');
  const [amount, setAmount] = useState<number>(500000);
  const [tenure, setTenure] = useState<number>(24);
  const [interestRate, setInterestRate] = useState<number>(12.5);
  const [formError, setFormError] = useState('');

  // Filtering
  const filteredApps = applications.filter(app => {
    return filterStatus === 'All' || app.status === filterStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName) {
      setFormError('Applicant customer name is required.');
      return;
    }

    if (amount <= 0) {
      setFormError('Loan amount must be a positive number.');
      return;
    }

    if (tenure <= 0) {
      setFormError('Tenure must be at least 1 month.');
      return;
    }

    if (interestRate <= 0) {
      setFormError('Interest rate must be greater than 0%.');
      return;
    }

    const newApp: LoanApplication = {
      id: `APPL-${Math.floor(9000 + Math.random() * 999)}`,
      customerName,
      category,
      amount: Number(amount),
      tenureMonths: Number(tenure),
      interestRate: Number(interestRate),
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    onAddApplication(newApp);
    setIsFormOpen(false);

    // Reset Form
    setCustomerName('');
    setCategory('Business');
    setAmount(500000);
    setTenure(24);
    setInterestRate(12.5);
  };

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">Loan Underwriting & Applications</h1>
          <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Institutional Loan Sourcing Platform</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-500/10 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> File New Application
        </button>
      </div>

      {/* Filter and overview metrics */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Horizontal Status Filter Options */}
        <div className="md:col-span-8 glass-card border border-white rounded-2xl p-4 flex flex-wrap gap-2 items-center">
          <span className="text-xs font-bold text-purple-900/60 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-purple-500" /> Filter Board:
          </span>
          {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                filterStatus === status 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-100/50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {status} Applications
            </button>
          ))}
        </div>

        {/* Dynamic pending count tracker box */}
        <div className="md:col-span-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-200/40 rounded-2xl flex justify-between items-center">
          <div>
            <span className="text-[9px] uppercase font-bold tracking-widest text-purple-900/60 block font-mono">Dynamic Queue</span>
            <strong className="text-sm font-black text-purple-950 block mt-0.5">
              {applications.filter(a => a.status === 'Pending').length} Pending Review
            </strong>
          </div>
          <div className="p-2.5 rounded-xl bg-purple-500 text-white">
            <FileText className="w-4 h-4 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Form Dialog Box */}
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
                  <Receipt className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-purple-950">File Loan Application</h3>
                  <p className="text-xs text-purple-900/60 font-medium font-mono uppercase tracking-wider">Underwriting Assessment Desk</p>
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3 bg-pink-100 text-pink-600 border border-pink-200 rounded-xl text-xs font-bold">
                  ⚠️ {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Select Applicant Borrower</label>
                  <select 
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                  >
                    <option value="">-- Choose registered customer --</option>
                    {registeredCustomers.map(c => (
                      <option key={c.id} value={c.name}>{c.name} ({c.company})</option>
                    ))}
                    <option value="Custom guest">Temporary Guest Applicant</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Loan Category</label>
                    <select 
                      value={category}
                      onChange={(e) => setCategory(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                    >
                      <option value="Personal">Personal Loan</option>
                      <option value="Business">Business Capital</option>
                      <option value="Gold">Gold Asset Loan</option>
                      <option value="Vehicle">Vehicle Finance</option>
                      <option value="Home">Home Mortgages</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Requested Amount (₹)</label>
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Tenure Period (Months)</label>
                    <input 
                      type="number" 
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Interest Rate (% p.a.)</label>
                    <input 
                      type="number" 
                      step="0.05"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
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
                    Close Panel
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer"
                  >
                    File Underwriting
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Grid Render */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredApps.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white/40 border border-purple-200/20 rounded-3xl">
            <FileText className="w-10 h-10 text-purple-300 mx-auto mb-3" />
            <p className="text-xs font-bold text-purple-950/50">No credit applications found matching this status filter.</p>
          </div>
        ) : (
          filteredApps.map((appl) => {
            // Find credit score if customer is registered
            const borrower = registeredCustomers.find(c => c.name === appl.customerName);
            const score = borrower ? borrower.riskScore : null;

            return (
              <motion.div
                key={appl.id}
                layout
                whileHover={{ y: -2 }}
                className="glass-card border border-white rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Ribbon decoration */}
                <div className="absolute top-0 left-0 w-2.5 h-full bg-gradient-to-b from-purple-500 via-pink-400 to-purple-400"></div>

                <div>
                  {/* Category and Ref ID row */}
                  <div className="flex justify-between items-start pl-3">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold text-purple-900 bg-purple-100 border border-purple-200/50 px-2.5 py-0.5 rounded-full font-mono">
                        {appl.category} Category
                      </span>
                      <span className="text-xs font-mono font-bold text-purple-500">{appl.id}</span>
                    </div>

                    <div className="flex items-center gap-1.5 font-mono">
                      {appl.status === 'Pending' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full border border-amber-300/30">
                          <Clock className="w-3 h-3 text-amber-600 animate-pulse" /> PENDING
                        </span>
                      )}
                      {appl.status === 'Approved' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-purple-100 text-purple-700 px-2.5 py-1 rounded-full border border-purple-300/30">
                          <CheckCircle className="w-3 h-3 text-purple-600" /> APPROVED
                        </span>
                      )}
                      {appl.status === 'Rejected' && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-pink-100 text-pink-700 px-2.5 py-1 rounded-full border border-pink-300/30">
                          <XCircle className="w-3 h-3 text-pink-600" /> REJECTED
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="mt-4 pl-3">
                    <h3 className="text-md font-bold text-purple-950 font-sans tracking-tight">{appl.customerName}</h3>
                    
                    {score && (
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-[9px] font-mono tracking-wider text-purple-700 font-bold bg-purple-100/50 px-2 py-0.5 rounded-md">
                          Risk Engine Verified
                        </span>
                        <span className="text-xs font-semibold text-purple-950">
                          Credit Rating: <strong className="text-purple-600 font-black">{score}</strong>
                        </span>
                      </div>
                    )}

                    <div className="divider border-b border-purple-100/50 my-4"></div>

                    {/* Financial Terms */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <span className="text-[9px] uppercase font-bold text-purple-900/50 tracking-wider">Principal Sum</span>
                        <p className="text-xs font-black text-purple-950 mt-1">{formatRupee(appl.amount)}</p>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-purple-900/50 tracking-wider">Interest Yield</span>
                        <p className="text-xs font-bold text-purple-950 mt-1 flex items-center gap-0.5">
                          <Percent className="w-3.5 h-3.5 text-purple-500 shrink-0" /> {appl.interestRate}% p.a.
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] uppercase font-bold text-purple-900/50 tracking-wider">Tenure Term</span>
                        <p className="text-xs font-bold text-purple-950 mt-1 flex items-center gap-0.5">
                          <Calendar className="w-3.5 h-3.5 text-purple-500 shrink-0" /> {appl.tenureMonths} Months
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Approve/Reject CTA triggers */}
                {appl.status === 'Pending' && (
                  <div className="mt-6 pt-4 border-t border-purple-200/20 flex gap-2 pl-3">
                    <button 
                      onClick={() => onRejectApplication(appl.id)}
                      className="flex-1 py-2 border border-pink-200 text-pink-600 hover:bg-pink-100/40 hover:text-pink-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" /> Decline
                    </button>
                    <button 
                      onClick={() => onApproveApplication(appl.id)}
                      className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Check className="w-4 h-4" /> Approve & Disburse
                    </button>
                  </div>
                )}

                {/* System advice watermark */}
                <div className="absolute right-3.5 bottom-2 font-mono text-[9px] text-purple-900/30 font-bold uppercase leading-none">
                  Sourced: {appl.date}
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Underwriting Best Practice advisory card */}
      <div className="p-4 bg-purple-100/40 border border-purple-200/30 rounded-2xl flex gap-3">
        <Info className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
        <p className="text-xs font-semibold text-purple-950 leading-relaxed">
          <strong>Underwriting Regulation guidelines:</strong> Instant loan disbursements trigger immediate webhook payouts on physical ledger nodes and auto-setup corresponding monthly ACH direct debit mandates based on Indian Banking standards (RBI Mandate API version 2026.04). Check KYC statuses first.
        </p>
      </div>

    </div>
  );
}
