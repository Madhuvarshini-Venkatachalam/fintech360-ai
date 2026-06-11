import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, 
  Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, AreaChart, Area 
} from 'recharts';
import { 
  TrendingUp, Percent, ShieldCheck, HelpCircle, Activity, 
  Lightbulb, Sliders, Calculator, Zap 
} from 'lucide-react';
import { monthlyOverviewStats, loanDistributionStats } from '../initialData';

export default function Analytics() {
  
  // Interactive Stress Tester & Interest Predictor States
  const [stressMultiplier, setStressMultiplier] = useState<number>(1.0);
  const [testPrincipal, setTestPrincipal] = useState<number>(250000);
  const [testInterest, setTestInterest] = useState<number>(12);
  const [testTenure, setTestTenure] = useState<number>(24);

  const CHART_COLORS = {
    lavender: '#C084FC',
    softPink: '#F9A8D4',
    purple: '#A855F7',
    rosePink: '#FDA4AF',
    lightLavender: '#E9D5FF'
  };

  // Stress-tested data calculation
  const stressedStats = monthlyOverviewStats.map(stat => ({
    ...stat,
    // When multiplier increases, default probability drifts higher and recovered capital narrows
    DefaultProbability: Number((stat.DefaultProbability * stressMultiplier).toFixed(2)),
    Recovered: Number((stat.Recovered / stressMultiplier).toFixed(2))
  }));

  // Interest calculator math
  const r = (testInterest / 100) / 12;
  const n = testTenure;
  const emiVal = stressMultiplier ? Math.round((testPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)) : 0;
  const totalRepay = emiVal * testTenure;
  const totalInterestRepay = totalRepay - testPrincipal;

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
        <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">Macro-Risk Analytics & Yields</h1>
        <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">B2B NBFC Portfolio stress-testing and statistical monitoring</p>
      </div>

      {/* Grid of charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Chart A: Portfolio Stress Tester Analytics (Line & Bar Recharts) */}
        <div className="lg:col-span-8 glass-card border border-white p-6 rounded-[24px]">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-lg font-bold text-purple-950">Active Disbursements vs. Recoveries</h2>
              <p className="text-[10px] text-purple-900/60 font-semibold font-mono uppercase tracking-wider">Simulated model under stress conditions • values in Cr</p>
            </div>

            {/* Slider Widget inside header */}
            <div className="bg-purple-100/60 p-3 rounded-2xl border border-purple-200/40 w-full sm:w-64 space-y-1.5 shrink-0">
              <div className="flex justify-between text-[11px] font-bold text-purple-950">
                <span>Model Stress Multiplier</span>
                <span className="text-purple-600 font-mono">{stressMultiplier.toFixed(1)}x</span>
              </div>
              <input 
                type="range" 
                min="0.5" 
                max="2.5" 
                step="0.1"
                value={stressMultiplier}
                onChange={(e) => setStressMultiplier(Number(e.target.value))}
                className="w-full accent-purple-600 h-1 bg-purple-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stressedStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.purple} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={CHART_COLORS.purple} stopOpacity={0.01}/>
                  </linearGradient>
                  <linearGradient id="colorRec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={CHART_COLORS.softPink} stopOpacity={0.2}/>
                    <stop offset="95%" stopColor={CHART_COLORS.softPink} stopOpacity={0.01}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff/30" />
                <XAxis dataKey="month" stroke="#7e22ce" fontSize={11} tickLine={false} />
                <YAxis stroke="#7e22ce" fontSize={11} tickFormatter={(v) => `₹${v} Cr`} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '16px' }} />
                <Area type="monotone" dataKey="ActiveCapital" stroke={CHART_COLORS.purple} fillOpacity={1} fill="url(#colorCap)" strokeWidth={3} />
                <Area type="monotone" dataKey="Recovered" stroke={CHART_COLORS.softPink} fillOpacity={1} fill="url(#colorRec)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Stress Tested Delinquency Probability Curve */}
        <div className="lg:col-span-4 glass-card border border-white p-6 rounded-[24px]">
          <div>
            <h2 className="text-lg font-bold text-purple-950">Macro NPA Default Probability</h2>
            <p className="text-[10px] text-purple-900/60 font-semibold font-mono uppercase tracking-wider text-pink-600">Projections under stress conditions (%)</p>
          </div>
          <div className="h-72 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stressedStats} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e8ff/25" />
                <XAxis dataKey="month" stroke="#7e22ce" fontSize={11} tickLine={false} />
                <YAxis stroke="#7e22ce" fontSize={11} tickFormatter={(v) => `${v}%`} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="DefaultProbability" stroke={CHART_COLORS.rosePink} strokeWidth={4} activeDot={{ r: 8 }} dot={{ strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Widget calculator */}
        <div className="md:col-span-8 glass-card border border-white p-6 rounded-[24px] space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-2xl">
              <Calculator className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-md font-black text-purple-950">Underwriting Yield & EMI Simulator</h3>
              <p className="text-xs text-purple-900/60 font-medium">Test prospective structures instantly</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-purple-950">
            <div className="space-y-1.5">
              <span>Proposed Principal: {formatRupee(testPrincipal)}</span>
              <input 
                type="range"
                min="50000"
                max="5000000"
                step="50000"
                value={testPrincipal}
                onChange={(e) => setTestPrincipal(Number(e.target.value))}
                className="w-full h-1 bg-purple-100 accent-purple-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <span>Interest Rate: {testInterest}% p.a.</span>
              <input 
                type="range"
                min="6"
                max="24"
                step="0.5"
                value={testInterest}
                onChange={(e) => setTestInterest(Number(e.target.value))}
                className="w-full h-1 bg-purple-100 accent-purple-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <span>Tenure Period: {testTenure} mo</span>
              <input 
                type="range"
                min="3"
                max="60"
                value={testTenure}
                onChange={(e) => setTestTenure(Number(e.target.value))}
                className="w-full h-1 bg-purple-100 accent-purple-600 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="border-t border-purple-200/20 pt-4 grid grid-cols-3 gap-6 text-center">
            <div className="p-3 bg-purple-100/50 rounded-2xl border border-purple-200/25">
              <span className="text-[10px] uppercase font-bold text-purple-900/50">Predicted EMI</span>
              <p className="text-sm font-black text-purple-950 mt-1">{formatRupee(emiVal)}/mo</p>
            </div>
            <div className="p-3 bg-purple-100/50 rounded-2xl border border-purple-200/25">
              <span className="text-[10px] uppercase font-bold text-purple-900/50">Total Interest Yield</span>
              <p className="text-sm font-black text-purple-950 mt-1">{formatRupee(totalInterestRepay)}</p>
            </div>
            <div className="p-3 bg-purple-100/50 rounded-2xl border border-purple-200/25">
              <span className="text-[10px] uppercase font-bold text-purple-900/50">Cumulative Payout</span>
              <p className="text-sm font-black text-purple-950 mt-1">{formatRupee(totalRepay)}</p>
            </div>
          </div>
        </div>

        {/* Live Advice card */}
        <div className="md:col-span-4 glass-card border border-white p-6 rounded-[24px] flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-purple-600">
              <Lightbulb className="w-5 h-5 animate-bounce" />
              <h4 className="text-xs font-black uppercase tracking-wider font-mono">Macro Stress Insight</h4>
            </div>
            <p className="text-xs font-semibold text-purple-950 leading-relaxed">
              When stress conditions surge to <strong>1.5x</strong> or more, high loan-to-value sectors (Home and Business) experience an aggregate delinquency drift of up to <strong>+4.5%</strong>. Re-tighten KYC parameters automatically under stress triggers.
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-purple-200/20 flex gap-2 items-center text-[10px] font-bold text-purple-900/50 uppercase font-mono">
            <Zap className="w-4 h-4 text-purple-500 animate-pulse" /> models aligned with RBI Guidelines 2026.
          </div>
        </div>

      </div>

    </div>
  );
}
