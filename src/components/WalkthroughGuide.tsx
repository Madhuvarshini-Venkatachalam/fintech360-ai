import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Play, ToggleLeft, Database, PlusCircle, CheckCircle, ChevronDown, ChevronUp, FileText, Info } from 'lucide-react';

interface WalkthroughGuideProps {
  onClearDemo: () => void;
  onLoadDemo: () => void;
  hasData: boolean;
}

export default function WalkthroughGuide({ onClearDemo, onLoadDemo, hasData }: WalkthroughGuideProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="glass-card border border-purple-250/50 bg-gradient-to-tr from-purple-500/5 via-pink-500/5 to-white/40 rounded-[28px] overflow-hidden shadow-sm">
      {/* Header bar */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="p-5 flex justify-between items-center cursor-pointer hover:bg-white/30 transition-colors select-none"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700 animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black text-purple-950 uppercase tracking-wider font-sans">
              Quick Setup & Walkthrough Guide 💡
            </h3>
            <p className="text-[10px] text-purple-900/60 font-semibold font-mono">
              Learn what is useful here and test with a live working ledger
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md font-mono bg-purple-950/5 border border-purple-900/10 text-purple-950">
            {hasData ? "🪄 Sandbox Mode Active (Pre-filled)" : "🌱 Clean Slate Active (Ready for Real Data)"}
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4 text-purple-700" /> : <ChevronDown className="w-4 h-4 text-purple-700" />}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden border-t border-purple-100/30"
          >
            <div className="p-6 space-y-6">
              
              {/* Core usefulness summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-purple-100">
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-purple-950 uppercase flex items-center gap-1.5 font-sans">
                    <Info className="w-4 h-4 text-purple-600" /> What is this useful for?
                  </h4>
                  <p className="text-[11px] font-semibold text-purple-900/70 leading-relaxed">
                    This is an enterprise-grade high-yield **Financing Ledger & Loan Management SaaS**. It solves manual spreadsheet errors for direct lenders, microfinance firms, and chit funds by automating all loan lifecycles: from **accepting applicant data** to **auto-generating payment interest** and **registering instant digital collections**.
                  </p>
                </div>

                <div className="space-y-3 bg-white/40 p-4 rounded-2xl border border-white">
                  <span className="text-[10px] uppercase font-bold text-purple-950/60 font-mono block">Choose your working environment:</span>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={onClearDemo}
                      className="flex-1 py-2.5 px-3 bg-purple-950 text-white font-bold text-xs rounded-xl shadow-xs hover:bg-purple-900 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      🌱 Clear Demo (Blank Slate)
                    </button>
                    <button
                      onClick={onLoadDemo}
                      className="flex-1 py-2.5 px-3 bg-white border border-purple-200 text-purple-950 font-bold text-xs rounded-xl hover:bg-purple-100/40 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      🔄 Reload Sample Demo Data
                    </button>
                  </div>
                  <p className="text-[9px] font-semibold text-purple-900/50 leading-tight">
                    *Tip: Press <strong>Clear Demo</strong> to wipe out pre-filled fields and test the actual working flow with your own inputs! All your inputs persist automatically.*
                  </p>
                </div>
              </div>

              {/* Step by step interactive walkthrough */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-purple-950 uppercase tracking-widest font-mono">
                  🚀 Test The Live Working Cycle in 4 Simple Steps:
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
                  
                  {/* Step 1 */}
                  <div className="p-4 bg-white/60 border border-white/80 rounded-2xl space-y-2 relative">
                    <span className="absolute top-2 right-3 text-lg font-black text-purple-200 font-mono">01</span>
                    <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                      <PlusCircle className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-black text-purple-950 uppercase font-sans">1. Add Customer</h5>
                    <p className="text-[10px] font-semibold text-purple-900/60 leading-relaxed">
                      Go to the <strong>"Customers"</strong> page and add a new borrower. Make sure to choose if their KYC is Verified.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="p-4 bg-white/60 border border-white/80 rounded-2xl space-y-2 relative">
                    <span className="absolute top-2 right-3 text-lg font-black text-purple-200 font-mono">02</span>
                    <div className="w-7 h-7 rounded-lg bg-pink-100 flex items-center justify-center text-pink-500">
                      <FileText className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-black text-purple-950 uppercase font-sans">2. Lodge Loan App</h5>
                    <p className="text-[10px] font-semibold text-purple-900/60 leading-relaxed">
                      Go to <strong>"Loan Applications"</strong>. Lodge a new request for your registered customer (e.g. ₹5,00,000 at 12%).
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="p-4 bg-white/60 border border-white/80 rounded-2xl space-y-2 relative">
                    <span className="absolute top-2 right-3 text-lg font-black text-purple-200 font-mono">03</span>
                    <div className="w-7 h-7 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700">
                      <Play className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-black text-purple-950 uppercase font-sans">3. Approve & Disburse</h5>
                    <p className="text-[10px] font-semibold text-purple-900/60 leading-relaxed">
                      Approve the application on the Dashboard workspace. It cascades instantly: creating active loans and EMI tracks!
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="p-4 bg-white/60 border border-white/80 rounded-2xl space-y-2 relative">
                    <span className="absolute top-2 right-3 text-lg font-black text-purple-200 font-mono">04</span>
                    <div className="w-7 h-7 rounded-lg bg-pink-100 flex items-center justify-center text-pink-600">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <h5 className="text-[11px] font-black text-purple-950 uppercase font-sans">4. Collect EMIs</h5>
                    <p className="text-[10px] font-semibold text-purple-900/60 leading-relaxed">
                      Go to <strong>"EMI Tracker"</strong>. Click "Trigger ACH Auto-Debit" to collect payment and watch outstanding debt reduce!
                    </p>
                  </div>

                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
