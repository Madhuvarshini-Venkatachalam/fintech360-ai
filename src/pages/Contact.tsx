import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mail, Phone, MapPin, Building, Globe, Send, CheckCircle 
} from 'lucide-react';

export default function Contact() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name || !email || !company || !message) {
      setFormError('All fields are requested for corporate eligibility assessment.');
      return;
    }

    setShowToast(true);
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">Enterprise Partnerships Hub</h1>
        <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Initiate API custom agreements & corporate treasury handshakes</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact info */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card border border-white rounded-[24px] p-6 space-y-4">
            <h3 className="text-sm font-black text-purple-950 font-mono uppercase tracking-wider">Corporate Headquarters</h3>
            
            <div className="flex gap-3 text-xs text-purple-950 font-semibold">
              <MapPin className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-purple-950">FinTech360 AI Campus</p>
                <p className="text-[11px] text-purple-900/60 font-medium">Block C, Maker Maxity, Bandra Kurla Complex</p>
                <p className="text-[11px] text-purple-900/60 font-medium">Mumbai, Maharashtra 400051</p>
              </div>
            </div>

            <div className="flex gap-3 text-xs text-purple-950 font-semibold items-center">
              <Phone className="w-5 h-5 text-purple-600 shrink-0" />
              <div>
                <span className="font-extrabold text-purple-950">Partnerships:</span> <span className="font-mono text-purple-700">+91 (22) 6902-8850</span>
              </div>
            </div>

            <div className="flex gap-3 text-xs text-purple-950 font-semibold items-center">
              <Mail className="w-5 h-5 text-purple-600 shrink-0" />
              <div>
                <span className="font-extrabold text-purple-950">Desk support:</span> <span className="font-mono text-purple-700">partners@fintech360.ai</span>
              </div>
            </div>
          </div>

          <div className="glass-card border border-white rounded-[24px] p-6 text-[11px] text-purple-950 leading-relaxed font-semibold space-y-2">
            <span className="text-purple-600 font-bold block text-xs">REGULATORY AUDITING NODE</span>
            <p>
              Under RBI directions on corporate fair practice, our digital interfaces are tracked and logs saved under safety systems. Any personal records uploaded are encrypted automatically.
            </p>
          </div>
        </div>

        {/* Corporate Partnership Form */}
        <div className="lg:col-span-7 glass-card border border-white rounded-[32px] p-8">
          <div>
            <h3 className="text-md font-black text-purple-950 flex items-center gap-2">
              <Building className="w-5 h-5 text-purple-600" /> API Custom Licenses Inquiries
            </h3>
            <p className="text-xs text-purple-900/60 font-semibold font-mono uppercase mt-0.5">Eligibility assessment desk</p>
          </div>

          {formError && (
            <div className="mt-4 p-3 bg-pink-100 text-pink-600 border border-pink-200 rounded-xl text-xs font-bold font-mono">
              ⚠️ {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-purple-950/60 font-mono tracking-wider mb-1">Corporate Officer Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Nair" 
                  className="w-full px-4 py-2.5 bg-purple-50/40 border border-purple-250 rounded-xl text-xs font-semibold text-purple-950 placeholder:text-purple-900/30 outline-none focus:border-purple-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-purple-950/60 font-mono tracking-wider mb-1">Registered Enterprise Email</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. ramesh@company.com" 
                  className="w-full px-4 py-2.5 bg-purple-50/40 border border-purple-250 rounded-xl text-xs font-semibold text-purple-950 placeholder:text-purple-900/30 outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-purple-950/60 font-mono tracking-wider mb-1">NBFC / microfinance entity name</label>
              <input 
                type="text" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Kerala Micro Credit Services" 
                className="w-full px-4 py-2.5 bg-purple-50/40 border border-purple-250 rounded-xl text-xs font-semibold text-purple-950 placeholder:text-purple-900/30 outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-purple-950/60 font-mono tracking-wider mb-1">Inquiry / Integration Scope</label>
              <textarea 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe desired transaction nodes, credit caps, or active custom integrations..."
                rows={4}
                className="w-full px-4 py-2.5 bg-purple-50/40 border border-purple-250 rounded-xl text-xs font-semibold text-purple-950 placeholder:text-purple-900/30 outline-none focus:border-purple-500 resize-none"
              ></textarea>
            </div>

            <div className="pt-2">
              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xs rounded-xl shadow-md hover:scale-[1.01] active:scale-99 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Send className="w-4 h-4" /> Dispatch Request
              </button>
            </div>
          </form>
        </div>

      </div>

      {/* Success notifier */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-6 right-6 p-4 bg-purple-950 text-white rounded-2xl shadow-2xl border border-purple-700/30 flex items-center gap-2 text-xs font-black font-mono z-50 pointer-events-none"
          >
            <CheckCircle className="w-4 h-4 text-purple-400" /> Inquiry dispatch successful. Enterprise desk will audit within 24 hours.
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
