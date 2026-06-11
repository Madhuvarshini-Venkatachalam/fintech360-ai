import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, BarChart3, Users, Landmark, Coins, ChevronRight } from 'lucide-react';

interface HomeProps {
  onGetStarted: () => void;
  onViewDashboard: () => void;
}

export default function Home({ onGetStarted, onViewDashboard }: HomeProps) {
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-purple-300 to-pink-300 opacity-20 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[5%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-pink-300 to-purple-400 opacity-25 blur-[120px] pointer-events-none"></div>

      {/* Hero Section */}
      <main className="relative z-10 flex-grow flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Text */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/60 text-xs font-semibold text-purple-950 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
              <span>SaaS Platform for NBFCs & Financiers</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-purple-950 font-sans leading-tight">
                Smart Finance <br />
                <span className="bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Management
                </span> <br />
                Powered by AI
              </h1>
              <p className="text-base sm:text-lg text-purple-900/80 max-w-xl font-medium leading-relaxed">
                A modern platform for financiers and financial institutions to manage customers, loans, collections, and business analytics efficiently.
              </p>
            </motion.div>

            {/* Call to Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={onGetStarted}
                className="px-6 py-3.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-semibold text-sm rounded-2xl shadow-lg shadow-purple-500/20 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={onViewDashboard}
                className="px-6 py-3.5 glass-panel border border-purple-200 text-purple-950 font-semibold text-sm rounded-2xl hover:bg-white/50 active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
              >
                View Dashboard <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Quick Stats Grid under Hero */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-purple-200/30 max-w-lg"
            >
              <div>
                <div className="text-2xl font-black text-purple-950 font-sans">₹1200 Cr+</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-purple-900/60 font-mono mt-1">Disbursed</div>
              </div>
              <div>
                <div className="text-2xl font-black text-purple-950 font-sans">99.2%</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-purple-900/60 font-mono mt-1">SLA Accuracy</div>
              </div>
              <div>
                <div className="text-2xl font-black text-purple-950 font-sans">24/7</div>
                <div className="text-[10px] uppercase tracking-widest font-bold text-purple-900/60 font-mono mt-1">Coordinated AI</div>
              </div>
            </motion.div>
          </div>

          {/* Premium Interactive Illustration & Floating Cards */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Background revolving circle decor */}
            <div className="absolute w-[320px] h-[320px] rounded-full border-2 border-dashed border-purple-300/40 animate-spin" style={{ animationDuration: '40s' }}></div>
            <div className="absolute w-[240px] h-[240px] rounded-full border border-pink-200/40 animate-spin" style={{ animationDuration: '20s', animationDirection: 'reverse' }}></div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full max-w-[360px] aspect-square rounded-3xl bg-gradient-to-tr from-white/60 to-white/25 border border-white/60 p-8 shadow-2xl backdrop-blur-xl flex flex-col justify-between"
            >
              {/* Premium Card Header */}
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-400 flex items-center justify-center text-white text-xl">
                  ₹
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-purple-900/60 tracking-wider uppercase">Active Portfolio Capital</span>
                  <div className="text-xl font-bold text-purple-950">₹5.4 Crore</div>
                </div>
              </div>

              {/* Graphical simulation inside card */}
              <div className="space-y-3 my-6">
                <div className="flex justify-between text-xs font-semibold text-purple-950">
                  <span>Recovery Rate</span>
                  <span className="text-pink-600">92%</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-2.5 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '92%' }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  ></motion.div>
                </div>
                <div className="flex justify-between text-[10px] font-medium text-purple-900/60 leading-tight">
                  <span>Standard NBFC Target</span>
                  <span>95% Milestone</span>
                </div>
              </div>

              {/* Interactive micro badge */}
              <div className="p-3.5 bg-gradient-to-r from-purple-500/10 to-pink-500/5 border border-purple-200/30 rounded-2xl flex items-center gap-3">
                <span className="text-2xl">🤖</span>
                <div>
                  <h4 className="text-[11px] font-bold text-purple-950">FinTech360 AI Guard</h4>
                  <p className="text-[10px] text-purple-700/70">Co-analyzing 12,458 credit histories now</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 1 - Customer Growth */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
              className="absolute -top-6 -right-4 glass-card border border-white p-4 rounded-2xl shadow-lg flex items-center gap-3 w-48"
            >
              <div className="p-2.5 rounded-xl bg-pink-100 text-pink-500">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] tracking-wider uppercase font-bold text-purple-900/60">Cust Database</span>
                <div className="text-sm font-extrabold text-purple-950">12,458 Members</div>
              </div>
            </motion.div>

            {/* Floating Card 2 - Cashflow Influx */}
            <motion.div 
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -bottom-8 -left-6 glass-card border border-white p-4 rounded-2xl shadow-lg flex items-center gap-3 w-48"
            >
              <div className="p-2.5 rounded-xl bg-purple-100 text-purple-500">
                <Coins className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] tracking-wider uppercase font-bold text-purple-900/60">Collections</span>
                <div className="text-sm font-extrabold text-purple-950">₹2.1 Crore Received</div>
              </div>
            </motion.div>
          </div>

        </div>
      </main>

      {/* Features & Trust Indicators Grid */}
      <section className="relative z-10 bg-white/35 backdrop-blur-md border-t border-purple-200/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-lg font-bold text-purple-600 uppercase tracking-widest">Enterprise Architecture</h2>
            <p className="text-2xl font-bold text-purple-950 mt-2 font-sans leading-tight">
              Designed for institutional credit lines, Chit corporations and NBFC networks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/60 border border-white/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-20 h-20 bg-gradient-to-br from-purple-200/20 to-pink-200/20 blur-xl"></div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-md font-bold text-purple-950 mb-2">Automated Underwriting Engine</h3>
              <p className="text-xs text-purple-700/80 leading-relaxed font-semibold">
                Generate Instant credit metrics, analyze borrower risk scores via AI and issue automated approvals with regulatory compliance filters.
              </p>
            </div>

            <div className="bg-white/60 border border-white/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-20 h-20 bg-gradient-to-br from-purple-200/20 to-pink-200/20 blur-xl"></div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="text-md font-bold text-purple-950 mb-2">Recovery & collections desk</h3>
              <p className="text-xs text-purple-700/80 leading-relaxed font-semibold">
                Audit weekly due EMI logs, direct recovery channels via localized field agents, and trace payment history feeds instantly.
              </p>
            </div>

            <div className="bg-white/60 border border-white/60 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-20 h-20 bg-gradient-to-br from-purple-200/20 to-pink-200/20 blur-xl"></div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-md font-bold text-purple-950 mb-2">Fiduciary Cryptography</h3>
              <p className="text-xs text-purple-700/80 leading-relaxed font-semibold">
                Encrypted transaction chains, authenticated multi-role logins, automated cash routing audits and secure cloud database backends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-panel border border-white/80 rounded-3xl p-8 max-w-4xl mx-auto text-center space-y-6">
            <span className="text-purple-600 font-bold uppercase tracking-wider text-xs">Customer Success Story</span>
            <blockquote className="text-md md:text-lg font-bold text-purple-950 leading-relaxed">
              "FinTech360 AI transformed our microfinance business model. Our loan recovery rates surged from 84% to 92% in 4 months, while the integrated automated WhatsApp and SMS EMI payment reminders slashed administrative overhead by 65%. Dynamic ledger watermarks and cashflow audits became seamless."
            </blockquote>
            <div className="space-y-1.5">
              <h4 className="text-xs font-black text-purple-950 uppercase tracking-widest">Suhail Parekh</h4>
              <p className="text-[10px] text-purple-700/60 font-semibold uppercase font-mono">Managing Director, Parekh microfinance NBFC</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-[#FFF3F8]/80 backdrop-blur-md border-t border-purple-200/40 py-8 text-center text-xs text-purple-900/60 font-medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">💜</span>
            <span className="font-bold text-purple-950">FinTech360 AI</span>
          </div>
          <p>© 2026 FinTech360 AI SaaS. Built with high-yield financial technology. Bandra Kurla Complex, Mumbai Hub.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-purple-950">Terms</a>
            <a href="#" className="hover:text-purple-950">Privacy SLA</a>
            <a href="#" className="hover:text-purple-950">ISO Certified</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
