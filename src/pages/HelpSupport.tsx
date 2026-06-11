import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HelpCircle, Search, Mail, Phone, ExternalLink, ChevronDown, 
  ChevronUp, ShieldCheck, CheckCircle2, RefreshCcw 
} from 'lucide-react';

export default function HelpSupport() {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  const [showNotification, setShowNotification] = useState(false);
  const [query, setQuery] = useState('');

  const faqs = [
    {
      q: "What is the core SLA timeline for automated B2B credit underwriting?",
      a: "Our automated credit decision system integrates direct API hooks to CIBIL and RAMS databases, triggering instant scoring in under 60 seconds. For micro loans under 10 Lakhs, decisions are completed instantly. Standard business loans up to 1 Crore require 4 working hours for field auditor handshake."
    },
    {
      q: "How are recurring monthly EMIs managed with NACH Mandates?",
      a: "An ACH debit request is formatted and transmitted to partner sponsor banks exactly 3 days prior to the target due date. Successful clearings update the payments log reactively. Unsuccessful triggers retry automatically on the 5th and 10th."
    },
    {
      q: "Can we reallocate Corporate Treasury into sovereign G-Secs instantly?",
      a: "Yes. Our treasury console connects straight to RBI Retail Direct NDS-OM infrastructure. Allocated liquidity is cleared and locked in 1 business day, yielding stable interest credits direct to your cash ledger account."
    },
    {
      q: "What security features guard customer KYC data and banking API portals?",
      a: "Every single outbound call is guarded by AES-256 bit end-to-end transport layer encryption. We operate fully PCI-DSS compliant server nodes, audited and certified under stringent guidelines."
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;

    setShowNotification(true);
    setQuery('');
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">Institutional Support Desk</h1>
        <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">B2B NBFC Customer Care Node & Mandate Resolution desk</p>
      </div>

      {/* Grid of supports */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* FAQs */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-purple-500" />
            <input 
              type="text" 
              placeholder="Query FAQs on underwriting engines, RBI compliance standards, etc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/55 border border-purple-200/40 rounded-2xl text-xs font-semibold text-purple-950 outline-none focus:ring-1 focus:ring-purple-400 placeholder:text-purple-900/30"
            />
          </div>

          <div className="space-y-3">
            {filteredFaqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="glass-card border border-white rounded-[20px] overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-5 flex justify-between items-center cursor-pointer hover:bg-white/40 transition-colors"
                >
                  <span className="text-xs font-black text-purple-950 leading-relaxed pr-4">{faq.q}</span>
                  {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-purple-600" /> : <ChevronDown className="w-4 h-4 text-purple-600" />}
                </button>
                
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden bg-purple-50/40 border-t border-purple-100/30"
                    >
                      <p className="p-5 text-[11px] font-semibold leading-relaxed text-purple-900/70">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* Raise ticket form */}
        <div className="lg:col-span-4 glass-card border border-white rounded-[32px] p-6 space-y-6">
          <div className="space-y-1">
            <h3 className="text-md font-black text-purple-950 flex items-center gap-2">
              <Mail className="w-5 h-5 text-purple-600" /> Lodge Audit Ticket
            </h3>
            <p className="text-xs text-purple-900/60 font-semibold font-mono uppercase">Direct core compliance interface</p>
          </div>

          <form onSubmit={handleTicketSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase font-bold text-purple-950/60 font-mono tracking-wider mb-1">Issue Description</label>
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Detail RBI audit failure, CIBIL timeouts, field agent delinquency, or mandate lags..."
                rows={4}
                className="w-full px-4 py-2.5 bg-purple-50/40 border border-purple-250 rounded-xl text-xs font-semibold text-purple-950 placeholder:text-purple-900/30 outline-none focus:border-purple-500 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xs rounded-xl shadow-md hover:scale-[1.01] active:scale-99 transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              Submit Ticket
            </button>
          </form>

          <div className="pt-4 border-t border-purple-100 space-y-2 text-[10px] font-bold text-purple-900/50 uppercase font-mono">
            <div>Direct Desk helpline:</div>
            <div className="text-purple-600 font-extrabold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5" /> 1800-419-3570 (9am - 6pm IST)
            </div>
          </div>
        </div>

      </div>

      {/* Success notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 right-6 p-4 bg-purple-950 text-white rounded-2xl shadow-2xl border border-purple-700/30 flex items-center gap-2 text-xs font-black font-mono z-50 animate-bounce"
          >
            <CheckCircle2 className="w-4 h-4 text-purple-400" /> Ticket registered with Level 2 Support Desk.
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
