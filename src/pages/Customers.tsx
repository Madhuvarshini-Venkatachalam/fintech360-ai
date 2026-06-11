import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, Search, ShieldCheck, UserCheck, AlertTriangle, UserMinus, Plus, 
  Trash2, Mail, Phone, Building, Briefcase, Filter, X 
} from 'lucide-react';
import { Customer } from '../types';

interface CustomersProps {
  customers: Customer[];
  onAddCustomer: (customer: Customer) => void;
  onUpdateKyc: (id: string, status: 'Verified' | 'Pending' | 'Rejected') => void;
  onDeleteCustomer: (id: string) => void;
}

export default function Customers({ customers, onAddCustomer, onUpdateKyc, onDeleteCustomer }: CustomersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [kycFilter, setKycFilter] = useState<string>('All');
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // New Customer Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [portfolioSize, setPortfolioSize] = useState<number>(100000);
  const [formError, setFormError] = useState('');

  // Filtering
  const filteredCustomers = customers.filter(cust => {
    const matchesSearch = cust.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          cust.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cust.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesKyc = kycFilter === 'All' || cust.kycStatus === kycFilter;
    return matchesSearch && matchesKyc;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name || !email || !phone || !company) {
      setFormError('All fields are required.');
      return;
    }

    if (!email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }

    if (phone.length < 10) {
      setFormError('Please enter a valid Indian mobile number.');
      return;
    }

    // Generate random credit score 550 to 880
    const generatedRiskScore = Math.floor(Math.random() * (880 - 550 + 1)) + 550;
    
    // Create new customer
    const newCustomer: Customer = {
      id: `CUST-${Math.floor(1000 + Math.random() * 9000)}`,
      name,
      email,
      phone,
      company,
      kycStatus: 'Pending',
      activeLoansCount: 1,
      totalLoanAmount: Number(portfolioSize),
      riskScore: generatedRiskScore,
      avatar: '👤'
    };

    onAddCustomer(newCustomer);
    setIsFormOpen(false);

    // Reset Form
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setPortfolioSize(100000);
  };

  const getRiskColor = (score: number) => {
    if (score >= 750) return 'text-purple-600';
    if (score >= 650) return 'text-amber-600';
    return 'text-pink-600';
  };

  const getRiskBg = (score: number) => {
    if (score >= 750) return 'bg-purple-100';
    if (score >= 650) return 'bg-amber-100';
    return 'bg-pink-100';
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
          <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">Borrowers & Customer Records</h1>
          <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">B2B Institutional Registry Hub</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-semibold text-xs rounded-xl shadow-lg shadow-purple-500/10 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Register New Customer
        </button>
      </div>

      {/* Modern Search & Filtering Bar */}
      <div className="glass-card border border-white rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-purple-500" />
          <input 
            type="text" 
            placeholder="Search database by name, company, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-purple-200/30 rounded-xl text-purple-950 text-xs focus:ring-1 focus:ring-purple-400 outline-none transition-all placeholder:text-purple-900/30 font-medium"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto shrink-0 justify-end">
          <span className="text-xs font-bold text-purple-900/60 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-purple-500" /> KYC status:
          </span>
          {['All', 'Verified', 'Pending', 'Rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setKycFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                kycFilter === status 
                  ? 'bg-purple-600 text-white shadow-sm' 
                  : 'bg-purple-100/50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Register Customer Modal Dialog Form */}
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
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-purple-950">Add Institutional Borrower</h3>
                  <p className="text-xs text-purple-900/60 font-medium">Auto-generated dynamic credit rating profile</p>
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3 bg-pink-100 text-pink-600 border border-pink-200 rounded-xl text-xs font-bold">
                  ⚠️ {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Company Contact Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Patel" 
                    className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Email ID</label>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. ramesh@patelsteel.in" 
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={phone} 
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="e.g. +91 98320 00124" 
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Full Corporation / Business Name</label>
                  <input 
                    type="text" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Patel Steel Manufacturing Pvt Ltd" 
                    className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Portfolio Size (₹ Principal Requested)</label>
                  <input 
                    type="number" 
                    value={portfolioSize} 
                    onChange={(e) => setPortfolioSize(Number(e.target.value))}
                    className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                  />
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
                    Register Borrower
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Customers List Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white/40 border border-purple-200/20 rounded-3xl">
            <Users className="w-10 h-10 text-purple-300 mx-auto mb-3" />
            <p className="text-xs font-bold text-purple-950/50">No institutional borrowers match this search filter criteria.</p>
          </div>
        ) : (
          filteredCustomers.map((cust) => (
            <motion.div
              key={cust.id}
              layout
              whileHover={{ y: -4 }}
              className="glass-card border border-white rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Credit Risk Score Circular Badge at upper right */}
              <div className="absolute top-6 right-6 flex flex-col items-end">
                <span className={`text-xs font-extrabold px-2.5 py-1 rounded-full ${getRiskBg(cust.riskScore)} ${getRiskColor(cust.riskScore)} font-mono shadow-xs`}>
                  {cust.riskScore} Credit
                </span>
                <span className="text-[9px] text-purple-900/50 font-mono mt-1 font-bold">
                  {cust.riskScore >= 750 ? 'Low Risk' : cust.riskScore >= 650 ? 'Moderate Risk' : 'High Risk'}
                </span>
              </div>

              {/* Customer Avatar & Header Name */}
              <div className="space-y-4">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-100 to-pink-100 border border-purple-200/30 flex items-center justify-center text-2xl shadow-xs">
                    {cust.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-purple-950 leading-tight">{cust.name}</h3>
                    <p className="text-[10px] text-purple-900/60 font-mono font-bold mt-0.5">{cust.id}</p>
                  </div>
                </div>

                <div className="border-t border-purple-200/20 my-4"></div>

                {/* Body Details */}
                <div className="space-y-2 text-xs font-medium text-purple-950">
                  <div className="flex items-center gap-2 text-purple-900/70">
                    <Building className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{cust.company}</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-900/70">
                    <Mail className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{cust.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-900/70">
                    <Phone className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{cust.phone}</span>
                  </div>
                  
                  <div className="flex justify-between items-center bg-white/40 p-2.5 rounded-xl border border-purple-100/30 mt-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-900/50 block tracking-wider leading-none">Active Exposure</span>
                      <strong className="text-xs font-extrabold text-purple-950 mt-1 block">{formatRupee(cust.totalLoanAmount)}</strong>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] uppercase font-bold text-purple-900/50 block tracking-wider leading-none">Active Loans</span>
                      <span className="text-xs font-black text-purple-950 mt-1 block">{cust.activeLoansCount} Accounts</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* KYC Status & Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-purple-200/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1.5">
                    {cust.kycStatus === 'Verified' && <ShieldCheck className="w-4 h-4 text-purple-600" />}
                    {cust.kycStatus === 'Pending' && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                    {cust.kycStatus === 'Rejected' && <UserMinus className="w-4 h-4 text-pink-500" />}
                    <span className="text-[11px] font-mono font-bold uppercase text-purple-950/70">KYC: {cust.kycStatus}</span>
                  </div>

                  <div className="flex gap-1.5">
                    {cust.kycStatus !== 'Verified' && (
                      <button
                        onClick={() => onUpdateKyc(cust.id, 'Verified')}
                        className="px-2.5 py-1.5 bg-purple-100 hover:bg-purple-200 text-purple-700 hover:text-purple-900 font-bold text-[10px] rounded-lg transition-colors cursor-pointer"
                        title="Approve KYC Status"
                      >
                        Approve KYC
                      </button>
                    )}
                    {cust.kycStatus !== 'Rejected' && (
                      <button
                        onClick={() => onUpdateKyc(cust.id, 'Rejected')}
                        className="px-2.5 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-600 hover:text-pink-800 font-bold text-[10px] rounded-lg transition-colors cursor-pointer"
                        title="Decline KYC Status"
                      >
                        Decline
                      </button>
                    )}
                    <button
                      onClick={() => onDeleteCustomer(cust.id)}
                      className="p-1.5 hover:bg-pink-100 text-pink-500 hover:text-pink-700 rounded-lg transition-colors cursor-pointer"
                      title="Delist Customer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
