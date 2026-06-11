import React from 'react';
import { motion } from 'motion/react';
import { 
  Landmark, ArrowUpRight, ArrowDownLeft, TrendingUp, AlertTriangle, 
  Percent, FileText, CheckCircle2, RefreshCcw, DollarSign, Wallet
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, Legend
} from 'recharts';
import { 
  Customer, Loan, LoanApplication, Collection, PaymentTransaction, 
  treasuryInvestment, SystemNotification, EmiSchedule 
} from '../types';
import { 
  monthlyOverviewStats, loanDistributionStats 
} from '../initialData';
import WalkthroughGuide from '../components/WalkthroughGuide';

interface DashboardProps {
  customers: Customer[];
  loanApplications: LoanApplication[];
  loans: Loan[];
  collections: Collection[];
  payments: PaymentTransaction[];
  schedules: EmiSchedule[];
  treasury: treasuryInvestment[];
  onTriggerEmiPayment: (id: string) => void;
  onProcessApplication: (id: string, status: 'Approved' | 'Rejected') => void;
  onClearDemo: () => void;
  onLoadDemo: () => void;
}

export default function Dashboard({ 
  customers, 
  loanApplications, 
  loans, 
  collections, 
  payments, 
  schedules, 
  treasury, 
  onTriggerEmiPayment,
  onProcessApplication,
  onClearDemo,
  onLoadDemo
}: DashboardProps) {

  const [selectedLoanCategory, setSelectedLoanCategory] = React.useState<string | null>(null);

  // Compute key stats dynamically from state
  const activeLoans = loans.filter(l => l.status === 'Active');
  const outstandingSum = activeLoans.reduce((sum, l) => sum + l.outstandingAmount, 0);
  const principalSum = activeLoans.reduce((sum, l) => sum + l.principalAmount, 0);
  
  const successfulPayments = payments.filter(p => p.status === 'Successful');
  const totalCollectedSum = successfulPayments.reduce((sum, p) => sum + p.amount, 0);
  
  const pendingApps = loanApplications.filter(a => a.status === 'Pending');

  const formattedLoanDistribution = React.useMemo(() => {
    if (loans.length === 0) {
      return loanDistributionStats;
    }
    const totals = loans.reduce((acc, loan) => {
      acc[loan.category] = (acc[loan.category] || 0) + loan.principalAmount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(totals).map(([name, value]) => ({ name, value }));
  }, [loans]);

  const selectedLoans = selectedLoanCategory ? loans.filter((loan) => loan.category === selectedLoanCategory) : [];
  const selectedOutstanding = selectedLoans.reduce((sum, loan) => sum + loan.outstandingAmount, 0);
  const selectedPrincipal = selectedLoans.reduce((sum, loan) => sum + loan.principalAmount, 0);

  const handleCategoryClick = (data: any) => {
    if (data && data.activeLabel) {
      setSelectedLoanCategory(data.activeLabel as string);
    }
  };

  // Colors based on requested color scheme
  const CHART_COLORS = {
    income: '#C084FC',     // Pastel Lavender
    expenses: '#F9A8D4',   // Soft Pink
    savings: '#A855F7',    // Purple
    alternate: '#FDA4AF'   // Rose Pink
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
    <div className="relative space-y-8 pb-12">
      {/* Upper Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight font-sans">FinTech360 AI Control Center</h1>
          <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Bandra Kurla HQ • Operational Status: optimal</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-600"></span>
          </span>
          <span className="text-xs font-bold text-purple-950 uppercase tracking-widest font-mono">AI Guard Active</span>
        </div>
      </div>

      {/* Interactive Walkthrough & Setup Guide block */}
      <WalkthroughGuide onClearDemo={onClearDemo} onLoadDemo={onLoadDemo} hasData={customers.length > 0} />

      {/* Grid of Key Performance Indicators (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* KPI 1: Active Portfolio Capital */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card rounded-[24px] p-6 relative overflow-hidden group border border-white"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-bl-[40px] blur-xs"></div>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-100/80 rounded-xl text-purple-600">
              <Landmark className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full font-sans">
              Stable Yield
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-purple-900/60 font-mono">Disbursed Principal</span>
            <h3 className="text-2xl font-black text-purple-950 mt-1 font-sans">
              {formatRupee(principalSum)}
            </h3>
            <p className="text-[10px] text-purple-700/80 mt-1 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-purple-600" />
              <span>+18.4% YoY Growth across channels</span>
            </p>
          </div>
        </motion.div>

        {/* KPI 2: Outstanding Amount */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card rounded-[24px] p-6 relative overflow-hidden group border border-white"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-bl-[40px] blur-xs"></div>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-pink-100/80 rounded-xl text-pink-500">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full font-sans">
              Active Debt
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-purple-900/60 font-mono">Outstanding Pool</span>
            <h3 className="text-2xl font-black text-purple-950 mt-1 font-sans">
              {formatRupee(outstandingSum)}
            </h3>
            <p className="text-[10px] text-pink-600/80 mt-1 font-semibold flex items-center gap-1">
              <RefreshCcw className="w-3 h-3 text-pink-600 animate-spin" style={{ animationDuration: '6s' }} />
              <span>SLA amortization active</span>
            </p>
          </div>
        </motion.div>

        {/* KPI 3: Collected Amount */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card rounded-[24px] p-6 relative overflow-hidden group border border-white"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-bl-[40px] blur-xs"></div>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-purple-100/80 rounded-xl text-purple-600">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center text-[10px] bg-purple-100 text-purple-700 font-bold px-2 py-0.5 rounded-full font-sans">
              Recovery Live
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-purple-900/60 font-mono">Gross Collections Recd</span>
            <h3 className="text-2xl font-black text-purple-950 mt-1 font-sans">
              {formatRupee(totalCollectedSum)}
            </h3>
            <p className="text-[10px] text-purple-700/80 mt-1 font-semibold flex items-center gap-1">
              <ArrowDownLeft className="w-3 h-3 text-purple-600" />
              <span>Collected this month cycle</span>
            </p>
          </div>
        </motion.div>

        {/* KPI 4: Underwriting Funnel */}
        <motion.div 
          whileHover={{ y: -4 }}
          className="glass-card rounded-[24px] p-6 relative overflow-hidden group border border-white"
        >
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-bl-[40px] blur-xs"></div>
          <div className="flex justify-between items-start">
            <div className="p-3 bg-pink-100/80 rounded-xl text-pink-500">
              <FileText className="w-5 h-5" />
            </div>
            <span className="inline-flex items-center text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full animate-pulse font-sans">
              Needs Sync
            </span>
          </div>
          <div className="mt-4">
            <span className="text-[10px] uppercase tracking-widest font-bold text-purple-900/60 font-mono">Pending Applications</span>
            <h3 className="text-2xl font-black text-purple-950 mt-1 font-sans">
              {pendingApps.length} Tickets
            </h3>
            <p className="text-[10px] text-pink-600/80 mt-1 font-semibold flex items-center gap-1">
              <AlertTriangle className="w-3 h-3 text-pink-500" />
              <span>Review required on verification board</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Analytics Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Chart 1: Active Capital vs Recoveries over Season (Area Chart) */}
        <div className="lg:col-span-8 glass-card border border-white p-6 rounded-[24px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-purple-950">Active Capital & Recovery Overtime</h2>
              <p className="text-[10px] text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Values projected in Crores (Cr) • Dynamic Recharts Nodes</p>
            </div>
            <div className="flex flex-wrap gap-4 text-xs font-bold text-purple-950/80 font-sans">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> Active Capital (Cr)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-pink-400"></span> Recovered Sum (Cr)
              </span>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyOverviewStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCapital" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.savings} stopOpacity={0.25}/>
                    <stop offset="95%" stopColor={CHART_COLORS.savings} stopOpacity={0.01}/>
                  </linearGradient>
                  <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.expenses} stopOpacity={0.25}/>
                    <stop offset="95%" stopColor={CHART_COLORS.expenses} stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff/30" />
                <XAxis dataKey="month" stroke="#7e22ce" fontSize={11} tickLine={false} />
                <YAxis stroke="#7e22ce" fontSize={11} tickFormatter={(val) => `₹${val} Cr`} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', borderColor: '#e9d5ff' }} 
                  labelFormatter={(lbl) => `Month: ${lbl}`}
                />
                <Area type="monotone" dataKey="ActiveCapital" stroke={CHART_COLORS.savings} fillOpacity={1} fill="url(#colorCapital)" strokeWidth={3} />
                <Area type="monotone" dataKey="Recovered" stroke={CHART_COLORS.expenses} fillOpacity={1} fill="url(#colorRecovered)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Distribution of Loans (Bar Charts) */}
        <div className="lg:col-span-4 glass-card border border-white p-6 rounded-[24px]">
          <div>
            <h2 className="text-lg font-bold text-purple-950">Loan Distribution</h2>
            <p className="text-[10px] text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Active channels aggregate</p>
          </div>
          <div className="h-72 mt-6 flex flex-col">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-widest text-purple-800 font-bold font-mono">Tap a bar to drill into the category</span>
              {selectedLoanCategory && (
                <button
                  onClick={() => setSelectedLoanCategory(null)}
                  className="text-[10px] font-bold text-purple-600 hover:text-purple-900"
                >
                  Reset filter
                </button>
              )}
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={formattedLoanDistribution} layout="vertical" margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff/20" horizontal={false} />
                <XAxis type="number" fontSize={11} stroke="#7e22ce" hide />
                <YAxis dataKey="name" type="category" fontSize={10} stroke="#7e22ce" tickLine={false} width={85} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px' }} />
                <Bar
                  dataKey="value"
                  fill={CHART_COLORS.income}
                  radius={[0, 8, 8, 0]}
                  onClick={handleCategoryClick}
                >
                  {formattedLoanDistribution.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={
                        index % 4 === 0 ? CHART_COLORS.savings : 
                        index % 4 === 1 ? CHART_COLORS.expenses : 
                        index % 4 === 2 ? CHART_COLORS.income : CHART_COLORS.alternate
                      } 
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Action Items Board & Quick Activities */}
      {selectedLoanCategory && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-12 glass-card border border-white p-6 rounded-[24px] bg-white/90">
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div>
                <h2 className="text-lg font-bold text-purple-950">Drill-through: {selectedLoanCategory} Loans</h2>
                <p className="text-[10px] text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Showing {selectedLoans.length} active loans in this product segment</p>
              </div>
              <div className="flex flex-wrap gap-3 text-[11px] text-purple-950 font-semibold">
                <span className="bg-purple-50 px-3 py-2 rounded-2xl">Total principal {formatRupee(selectedPrincipal)}</span>
                <span className="bg-purple-50 px-3 py-2 rounded-2xl">Outstanding {formatRupee(selectedOutstanding)}</span>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              {selectedLoans.slice(0, 3).map((loan) => (
                <div key={loan.id} className="p-4 bg-purple-50/70 rounded-3xl border border-purple-100">
                  <div className="flex justify-between items-start gap-2">
                    <strong className="text-sm text-purple-950">{loan.customerName}</strong>
                    <span className="text-[10px] uppercase font-black tracking-wider text-purple-700">{loan.status}</span>
                  </div>
                  <p className="text-[11px] text-purple-900/70 mt-2">Loan ID {loan.id}</p>
                  <p className="text-[12px] font-bold text-purple-950 mt-3">{formatRupee(loan.principalAmount)} principal</p>
                  <p className="text-[11px] text-purple-900/60 mt-1">Outstanding {formatRupee(loan.outstandingAmount)}</p>
                  <p className="text-[11px] text-purple-900/60 mt-1">Rate {loan.interestRate}% • EMI {formatRupee(loan.emiAmount)}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedLoanCategory(null)}
                className="text-[10px] font-bold uppercase tracking-wider text-purple-700 hover:text-purple-900"
              >
                Clear drill-through
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Underwriting Queue */}
        <div className="lg:col-span-7 glass-card border border-white p-6 rounded-[24px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-purple-950">Underwriting Desk Queue</h2>
              <p className="text-[10px] text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Verify applicants and approve portfolios</p>
            </div>
          </div>

          <div className="space-y-4">
            {pendingApps.length === 0 ? (
              <div className="text-center py-8 text-xs font-semibold text-purple-900/50">
                🎉 No pending underwriting applications found. Status clear!
              </div>
            ) : (
              pendingApps.map((appl) => (
                <div key={appl.id} className="p-4 bg-white/45 border border-purple-200/20 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-xs transition-shadow">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-purple-900 uppercase bg-purple-100 px-2 py-0.5 rounded-full font-mono">{appl.category}</span>
                      <span className="text-xs font-mono font-bold text-purple-500">{appl.id}</span>
                    </div>
                    <h4 className="text-sm font-bold text-purple-950 mt-1">{appl.customerName}</h4>
                    <p className="text-[11px] font-semibold text-purple-900/60">Amount requested: <strong className="text-purple-950">{formatRupee(appl.amount)}</strong> • Interest: {appl.interestRate}% • Tenure: {appl.tenureMonths} Months</p>
                    <p className="text-[10px] text-purple-900/40 font-mono mt-0.5 font-mono">Applied: {appl.date}</p>
                  </div>
                  <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
                    <button 
                      onClick={() => onProcessApplication(appl.id, 'Rejected')}
                      className="px-3 py-1.5 border border-pink-200 hover:bg-pink-100 text-pink-600 font-bold text-xs rounded-xl transition-all cursor-pointer"
                    >
                      Decline
                    </button>
                    <button 
                      onClick={() => onProcessApplication(appl.id, 'Approved')}
                      className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
                    >
                      Approve Match
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Pending Collection / Agent Schedule */}
        <div className="lg:col-span-5 glass-card border border-white p-6 rounded-[24px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-purple-950">Collection Schedule (Today)</h2>
              <p className="text-[10px] text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Direct field recovery and auto-ACH triggers</p>
            </div>
          </div>

          <div className="divider border-b border-purple-100/40 mb-4"></div>

          <div className="space-y-4">
            {collections.slice(0, 4).map((coll) => (
              <div key={coll.id} className="p-3.5 bg-white/45 border border-purple-200/20 rounded-xl flex justify-between items-start relative overflow-hidden">
                {coll.status === 'Overdue' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-pink-500"></div>
                )}
                {coll.status === 'Collected' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500"></div>
                )}
                {coll.status === 'Scheduled' && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-amber-400"></div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-purple-950">{coll.customerName}</h4>
                  <p className="text-[10px] text-purple-700/60 font-semibold mt-0.5">Agent: {coll.collectorName} • Due: {coll.date}</p>
                  <p className="text-xs font-black text-purple-950 tracking-tight mt-1">{formatRupee(coll.amountDue)} Due</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    coll.status === 'Overdue' ? 'bg-pink-100 text-pink-600 border border-pink-200/50' : 
                    coll.status === 'Collected' ? 'bg-purple-100 text-purple-600 border border-purple-200/50' : 
                    'bg-amber-100 text-amber-700 border border-amber-200/50'
                  }`}>
                    {coll.status}
                  </span>
                  <div className="mt-2 text-[10px] font-semibold text-purple-900/60 font-mono">ID: {coll.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
