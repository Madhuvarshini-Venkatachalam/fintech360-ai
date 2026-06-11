import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Settings as SettingsIcon, Landmark, Key, Globe, BellRing, Webhook,
  CheckCircle, Plus, Sparkles, Building, Trash2, ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function Settings() {
  
  // Settings hookups
  const [companyName, setCompanyName] = useState('FinTech360 Enterprise Ltd');
  const [licenseCode, setLicenseCode] = useState('NBFC-RBI-8854/2026');
  const [webhookUrl, setWebhookUrl] = useState('https://api.fintech360.ai/v1/webhooks/nach-reconcile');
  const [activeTab, setActiveTab] = useState<'profile' | 'api' | 'compliance'>('profile');
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">Enterprise Infrastructure Settings</h1>
        <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Control RBI mandate interfaces & credit scoring webhooks</p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Settings Navigation Menu */}
        <div className="lg:col-span-3 space-y-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold font-mono tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'profile' 
                ? 'bg-purple-600 text-white shadow-xs' 
                : 'bg-purple-100/50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            <Building className="w-4 h-4" /> NBFC Corporate Profile
          </button>
          
          <button
            onClick={() => setActiveTab('api')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold font-mono tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'api' 
                ? 'bg-purple-600 text-white shadow-xs' 
                : 'bg-purple-100/50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            <Webhook className="w-4 h-4" /> API Nodes & Webhooks
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold font-mono tracking-wide transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'compliance' 
                ? 'bg-purple-600 text-white shadow-xs' 
                : 'bg-purple-100/50 text-purple-700 hover:bg-purple-100'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> RBI Regulatory Auditing
          </button>
        </div>

        {/* Settings Form Pane */}
        <div className="lg:col-span-9 glass-card border border-white rounded-[32px] p-8">
          
          <AnimatePresence mode="wait">
            {activeTab === 'profile' && (
              <motion.form 
                key="profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSave} 
                className="space-y-6"
              >
                <div>
                  <h3 className="text-md font-black text-purple-950 flex items-center gap-2">
                    <Building className="w-5 h-5 text-purple-600" /> Corporate Entity Profile
                  </h3>
                  <p className="text-xs text-purple-900/60 font-semibold font-mono uppercase mt-0.5">RBI Registered Credit System Identity</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-black text-purple-950/60 font-mono tracking-wider">Registered Trading Name</label>
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-250 rounded-xl text-xs font-semibold text-purple-950 focus:border-purple-500 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] uppercase font-black text-purple-950/60 font-mono tracking-wider">RBI License COE Number</label>
                    <input 
                      type="text" 
                      value={licenseCode}
                      onChange={(e) => setLicenseCode(e.target.value)}
                      className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-250 rounded-xl text-xs font-semibold text-purple-930 focus:border-purple-500 outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-100 flex justify-end">
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xs rounded-xl hover:opacity-95 shadow-md hover:scale-[1.01] transition-all cursor-pointer"
                  >
                    Update Entity Profile
                  </button>
                </div>
              </motion.form>
            )}

            {activeTab === 'api' && (
              <motion.form 
                key="api"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                onSubmit={handleSave} 
                className="space-y-6"
              >
                <div>
                  <h3 className="text-md font-black text-purple-950 flex items-center gap-2">
                    <Webhook className="w-5 h-5 text-purple-600" /> Webhook Integrations
                  </h3>
                  <p className="text-xs text-purple-900/60 font-semibold font-mono uppercase mt-0.5">Automated NACH & CIBIL score callbacks</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[10px] uppercase font-black text-purple-950/60 font-mono tracking-wider">ACH Webhook URL</label>
                  <input 
                    type="url" 
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                    className="w-full px-4 py-2.5 bg-purple-50/50 border border-purple-250 rounded-xl text-xs font-semibold text-purple-950 focus:border-purple-500 outline-none font-mono"
                  />
                </div>

                <div className="p-4 bg-purple-50 border border-purple-150 rounded-2xl flex items-start gap-3">
                  <Key className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
                  <div className="space-y-0.5 text-xs text-purple-950 leading-relaxed font-semibold">
                    <span className="font-bold">Sandbox Test API Token</span>
                    <p className="text-[11px] text-purple-900/60 font-mono font-medium">sk_live_360_f89ee4a5bd0c112ae93145ff29...</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-purple-100 flex justify-end">
                  <button 
                    type="submit" 
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-xs rounded-xl hover:opacity-95 shadow-md transition-all cursor-pointer"
                  >
                    Save Webhook Endpoint
                  </button>
                </div>
              </motion.form>
            )}

            {activeTab === 'compliance' && (
              <motion.div 
                key="compliance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6 text-xs text-purple-950 leading-relaxed font-semibold"
              >
                <div>
                  <h3 className="text-md font-black text-purple-950 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-purple-600" /> Capital Adequacy & Auditing
                  </h3>
                  <p className="text-xs text-purple-900/60 font-semibold font-mono uppercase mt-0.5">RBI prudential framework logs</p>
                </div>

                <div className="space-y-4 font-medium text-purple-900">
                  <div className="p-4 bg-purple-50/80 rounded-2xl border border-purple-100 space-y-1.5">
                    <span className="font-extrabold text-purple-950 block text-[11px]">CRAR Parameter</span>
                    <p>Current Capital Adequacy Ratio is locked at <strong className="text-purple-950">18.45%</strong>. RBI systemic thresholds specify a baseline safety limit of 15% minimum.</p>
                  </div>

                  <div className="p-4 bg-purple-50/80 rounded-2xl border border-purple-100 space-y-1.5">
                    <span className="font-extrabold text-purple-950 block text-[11px]">Systemic Risk Shield</span>
                    <p>CIBIL verification gate is set to strictly hard-decline prospective applicants registering scores under <strong>680</strong> points.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Success Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-6 z-50 p-4 bg-purple-950 text-white rounded-2xl shadow-2xl border border-purple-700/30 flex items-center gap-2.5 text-xs font-bold font-mono"
          >
            <CheckCircle className="w-4 h-4 text-purple-400" /> Parameters Reconciled with Main System Node
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
