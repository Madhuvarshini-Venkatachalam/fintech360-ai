import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TrendingUp, Plus, ShieldCheck, Landmark, Flame, Percent, RefreshCw,
  Sliders, Briefcase, Search, Filter, X, Zap 
} from 'lucide-react';
import { treasuryInvestment } from '../types';

interface InvestmentsProps {
  investments: treasuryInvestment[];
  onAddInvestment: (inv: treasuryInvestment) => void;
}

export default function Investments({ investments, onAddInvestment }: InvestmentsProps) {
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState<string>('All');

  // Form states
  const [name, setName] = useState('');
  const [assetClass, setAssetClass] = useState<'Corporate Bonds' | 'Mutual Funds' | 'Government G-Secs' | 'Gold Reserves' | 'Commercial Paper'>('Corporate Bonds');
  const [investedAmount, setInvestedAmount] = useState<number>(1000000);
  const [yieldYtd, setYieldYtd] = useState<number>(8.5);
  const [riskProfile, setRiskProfile] = useState<'Low' | 'Medium' | 'High'>('Low');
  const [formError, setFormError] = useState('');

  // Filtering
  const filteredInvestments = investments.filter(inv => {
    const matchesSearch = inv.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          inv.assetClass.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === 'All' || inv.assetClass === classFilter;
    return matchesSearch && matchesClass;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name) {
      setFormError('Asset/fund identification name is required.');
      return;
    }

    if (investedAmount <= 0) {
      setFormError('Invested principal must be positive.');
      return;
    }

    if (yieldYtd <= 0) {
      setFormError('Sovereign yield expectation must be positive.');
      return;
    }

    // Dynamic current value generator: principal + random drift
    const driftPercent = (yieldYtd / 100) * (Math.random() * 0.15 + 0.95);
    const calculatedCurrentValue = Math.floor(investedAmount * (1 + driftPercent));

    const newInvestment: treasuryInvestment = {
      id: `TREAS-${Math.floor(10 + Math.random() * 89)}`,
      assetClass,
      name,
      investedAmount: Number(investedAmount),
      currentValue: calculatedCurrentValue,
      yieldYtd: Number(yieldYtd),
      riskProfile
    };

    onAddInvestment(newInvestment);
    setIsFormOpen(false);

    // Reset Form
    setName('');
    setInvestedAmount(1000000);
    setYieldYtd(8.5);
    setRiskProfile('Low');
  };

  const formatRupee = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(2)} Cr`;
    } else if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const totalInvested = investments.reduce((sum, i) => sum + i.investedAmount, 0);
  const totalCurrentValue = investments.reduce((sum, i) => sum + i.currentValue, 0);
  const netEarnings = totalCurrentValue - totalInvested;

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">NBFC Corporate Treasury Portfolios</h1>
          <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Firm Capital Reserve allocation & High-Yield Debt instruments</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-semibold text-xs rounded-xl shadow-lg active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Record Reserve Allocation
        </button>
      </div>

      {/* Aggregate Treasury holdings boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 bg-white/60 border border-white/60 rounded-3xl">
          <span className="text-[10px] uppercase font-bold text-purple-900/60 font-mono tracking-wider">Treasury Cost Capital</span>
          <h2 className="text-xl font-black text-purple-950 mt-1">
            {formatRupee(totalInvested)}
          </h2>
          <p className="text-[10px] text-purple-700/60 font-semibold mt-1">Total invested reserves pool</p>
        </div>

        <div className="p-5 bg-white/60 border border-white/60 rounded-3xl">
          <span className="text-[10px] uppercase font-bold text-purple-900/60 font-mono tracking-wider">Valuation of Holdings</span>
          <h2 className="text-xl font-black text-purple-950 mt-1">
            {formatRupee(totalCurrentValue)}
          </h2>
          <p className="text-[10px] text-purple-750/60 font-semibold mt-1">Real-time fair market valuation</p>
        </div>

        <div className="p-5 bg-purple-50/80 border border-purple-100 rounded-3xl">
          <span className="text-[10px] uppercase font-bold text-purple-900/60 font-mono tracking-wider">Net Reserve Earnings</span>
          <h2 className="text-xl font-black text-purple-650 mt-1">
            +{formatRupee(netEarnings)}
          </h2>
          <p className="text-[10px] text-purple-700/60 font-semibold mt-1">Total unrealized portfolio gains</p>
        </div>
      </div>

      {/* Search Filter Bar */}
      <div className="glass-card border border-white rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-purple-500" />
          <input 
            type="text" 
            placeholder="Search treasury assets by name, class, or ratings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-purple-200/30 rounded-xl text-purple-950 text-xs focus:ring-1 focus:ring-purple-400 outline-none placeholder:text-purple-900/30 font-medium"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto shrink-0 justify-end">
          <span className="text-xs font-bold text-purple-900/60 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-purple-500" /> Asset category:
          </span>
          {['All', 'Corporate Bonds', 'Mutual Funds', 'Government G-Secs', 'Gold Reserves', 'Commercial Paper'].map((ac) => (
            <button
              key={ac}
              onClick={() => setClassFilter(ac)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                classFilter === ac 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-100/50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {ac === 'Corporate Bonds' ? 'Bonds' : ac === 'Government G-Secs' ? 'G-Sec' : ac === 'Commercial Paper' ? 'Comm Paper' : ac}
            </button>
          ))}
        </div>
      </div>

      {/* Form Dialog Modal */}
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
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-purple-950">Add Reserve asset</h3>
                  <p className="text-xs text-purple-900/60 font-medium font-mono">B2B NBFC Capital Sovereign allocation</p>
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3 bg-pink-100 text-pink-600 border border-pink-200 rounded-xl text-xs font-bold">
                  ⚠️ {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Fund / Debenture / Asset Name</label>
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. HDFC 8.85% Series II Debenture Bonds" 
                    className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Asset Class</label>
                    <select 
                      value={assetClass}
                      onChange={(e) => setAssetClass(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                    >
                      <option value="Corporate Bonds">Corporate Bonds</option>
                      <option value="Mutual Funds">Mutual Funds</option>
                      <option value="Government G-Secs">Government G-Secs</option>
                      <option value="Gold Reserves">Gold Reserves</option>
                      <option value="Commercial Paper">Commercial Paper</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Risk Profile Rating</label>
                    <select 
                      value={riskProfile}
                      onChange={(e) => setRiskProfile(e.target.value as any)}
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                    >
                      <option value="Low">Low Risk</option>
                      <option value="Medium">Medium Risk</option>
                      <option value="High">Sovereign / High Growth</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Allocation Capital (₹)</label>
                    <input 
                      type="number" 
                      value={investedAmount} 
                      onChange={(e) => setInvestedAmount(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Expected Annual Yield (%)</label>
                    <input 
                      type="number" 
                      step="0.1"
                      value={yieldYtd} 
                      onChange={(e) => setYieldYtd(Number(e.target.value))}
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
                    Lock Asset & Disburse
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Asset Cards Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInvestments.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white/40 border border-purple-200/20 rounded-3xl">
            <Briefcase className="w-10 h-10 text-purple-300 mx-auto mb-3" />
            <p className="text-xs font-bold text-purple-950/50">No treasury assets booked in repository.</p>
          </div>
        ) : (
          filteredInvestments.map((inv) => {
            const growthEarnings = inv.currentValue - inv.investedAmount;
            const returnPercent = (growthEarnings / inv.investedAmount) * 100;

            return (
              <motion.div
                key={inv.id}
                layout
                whileHover={{ y: -4 }}
                className="glass-card border border-white rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Visual badge top */}
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-purple-900 bg-purple-100 border border-purple-200/50 px-2 py-0.5 rounded-full font-mono">
                      {inv.assetClass}
                    </span>
                    <h3 className="font-bold text-purple-950 mt-1.5 leading-tight">{inv.name}</h3>
                    <span className="text-[10px] text-purple-900/50 font-mono font-bold">REF CODE: {inv.id}</span>
                  </div>

                  <span className={`text-[10px] font-mono tracking-wider font-extrabold px-2.5 py-0.5 rounded-full ${
                    inv.riskProfile === 'Low' ? 'bg-purple-100 text-purple-700' :
                    inv.riskProfile === 'Medium' ? 'bg-amber-100 text-amber-700' :
                    'bg-pink-100 text-pink-600 animate-pulse'
                  }`}>
                    {inv.riskProfile} Risk
                  </span>
                </div>

                <div className="divider border-b border-purple-100/40 my-4"></div>

                {/* Values body */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-purple-900/60 font-semibold">Cost allocated:</span>
                    <strong className="text-purple-950">{formatRupee(inv.investedAmount)}</strong>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-purple-900/60 font-semibold">Current valuation:</span>
                    <strong className="text-purple-950">{formatRupee(inv.currentValue)}</strong>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-purple-900/60 font-semibold">Expected Annual Yield:</span>
                    <span className="text-purple-950 font-bold flex items-center gap-0.5">
                      <Percent className="w-3.5 h-3.5 text-purple-500 shrink-0" /> {inv.yieldYtd}% p.a.
                    </span>
                  </div>

                  {/* Growth status banner */}
                  <div className="p-2.5 bg-gradient-to-r from-purple-100/40 to-pink-100/40 border border-purple-200/20 rounded-xl flex items-center justify-between text-xs font-bold text-purple-950">
                    <span className="font-mono text-[10px] text-purple-900/50 font-black">UNREALIZED P&L</span>
                    <span className="text-purple-700 flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      +{returnPercent.toFixed(1)}% (+{formatRupee(growthEarnings)})
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })
        )}
      </div>

    </div>
  );
}
