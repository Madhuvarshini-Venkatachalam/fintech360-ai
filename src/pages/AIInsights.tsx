import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Send, RefreshCw, Landmark, ShieldAlert, BadgePercent, TrendingUp,
  BrainCircuit, Coins, CheckCircle, Smartphone, HelpCircle, ArrowRight 
} from 'lucide-react';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function AIInsights() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: "Namaste. I am your FinTech360 Enterprise AI Advisor. I specialize in RBI NBFC regulatory compliances, CIBIL risk underwriting thresholds, NACH auto-debit triggers, field collections routing optimization, and corporate portfolio liquidity. How can I assist you in optimizing your high-yield ledger today?" 
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [snapshot, setSnapshot] = useState<any | null>(null);
  const [includeSnapshot, setIncludeSnapshot] = useState(true);
  const [autoRedact, setAutoRedact] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Predefined recommendation cards
  const recommendationPrompts = [
    {
      title: "NPA Reduction Strategy",
      desc: "Get an actionable plan to lower non-performing assets.",
      prompt: "What are the most effective structural procedures for an Indian microfinance NBFC to decrease its active NPA quota below 1.5% using NACH & automated CIBIL checks?"
    },
    {
      title: "High-Yield Reserve Mix",
      desc: "Analyze G-Secs vs Gold Reserves for treasury.",
      prompt: "Structure an optimized portfolio allocation ratio for 50 Crores in corporate treasury capital, comparing Sovereign G-Secs, Commercial Papers, and Gold Reserves for maximum secure yield."
    },
    {
      title: "ACH Auto-Debit Mandate Rates",
      desc: "Improve client collection conversion ratios.",
      prompt: "Draft a system flow to increase first-attempt successful ACH Mandate auto-debits for vehicle finance clients who traditionally face transient cash flow ripples on the 1st of the month."
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // load portfolio snapshot for preview
    let mounted = true;
    fetch('/api/portfolio-summary')
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (mounted) setSnapshot(data); })
      .catch(() => {});
    return () => { mounted = false; };
  }, []);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    // Add user message
    const updatedMessages = [...messages, { role: 'user' as const, text: textToSend }];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsTyping(true);

    try {
      // choose whether to include snapshot in prompt
      const ctx = includeSnapshot ? snapshot : null;

      // open streaming endpoint and read progressive chunks
      const resp = await fetch('/api/gemini/stream-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: updatedMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          message: textToSend,
          context: ctx
        })
      });
      if (!resp.ok) throw new Error('API server returned an error');

      // add placeholder model message
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      const reader = resp.body!.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let full = '';
      while (!done) {
        const { value, done: d } = await reader.read();
        done = d;
        if (value) {
          const chunk = decoder.decode(value);
          full += chunk;
          // update last model message
          setMessages(prev => {
            const copy = [...prev];
            // replace last message
            copy[copy.length - 1] = { role: 'model', text: full };
            return copy;
          });
        }
      }
    } catch (err) {
      setMessages(prev => [ ...prev, { role: 'model', text: "My communication channels are undergoing routine regulatory handshake audit. Let me formulate a local analysis: Ensure customer balances are fully verified prior to the 5th of each month to reduce processing overheads." } ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pb-12 h-[calc(100vh-140px)]">
      
      {/* Sidebar Recommendation & Quick Actions */}
      <div className="lg:col-span-4 flex flex-col justify-between gap-6 overflow-y-auto pr-1">
        <div className="space-y-6">
          <div>
            <span className="text-[10px] uppercase font-bold text-purple-900/60 font-mono tracking-wider">SECURE ADVISORY NODE</span>
            <h1 className="text-xl font-black text-purple-950 font-sans tracking-tight">FinTech360 AI Copilot</h1>
            <p className="text-xs text-purple-900/60 font-semibold">Real-time enterprise banking strategy engine</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-black uppercase text-purple-950/60 tracking-wider font-mono flex items-center gap-1">
              <BrainCircuit className="w-4 h-4 text-purple-600" /> Predefined Audit Briefings
            </h3>
            
            {recommendationPrompts.map((rec, i) => (
              <motion.button
                key={i}
                whileHover={{ y: -2 }}
                onClick={() => handleSend(rec.prompt)}
                className="w-full text-left p-4 bg-white/60 hover:bg-white/90 border border-purple-200/50 rounded-2xl transition-all shadow-xs flex flex-col gap-1 cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-purple-950">{rec.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <p className="text-[11px] text-purple-900/60 font-semibold">{rec.desc}</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Info card */}
        <div className="p-4 bg-purple-50 border border-purple-100 rounded-3xl text-[11px] text-purple-950 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-purple-600">
            <Sparkles className="w-4 h-4" />
            <span>LLM PARAMETER SHUNT</span>
          </div>
          <p className="font-semibold leading-relaxed">
            Generating answers via secure server proxy utilizing **gemini-3.5-flash**. All prompt data logs isolated to enterprise audit servers under direct access credentials.
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="lg:col-span-8 glass-card border border-white rounded-[32px] p-6 flex flex-col justify-between overflow-hidden h-full">
        
        {/* Messages list */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-thin">
          <AnimatePresence initial={false}>
            {messages.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] rounded-3xl p-4 text-xs leading-relaxed font-semibold ${
                  m.role === 'user' 
                    ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-tr-none shadow-md' 
                    : 'bg-purple-50 text-purple-950 border border-purple-100 rounded-tl-none font-medium'
                }`}>
                  {m.role === 'model' && (
                    <div className="flex items-center gap-1 mb-1.5 text-[9px] font-black uppercase text-purple-600 font-mono tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" /> Fintech360 Copilot
                    </div>
                  )}
                  <p className="whitespace-pre-line">{m.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-purple-50 text-purple-950 border border-purple-100 rounded-3xl rounded-tl-none p-4 text-xs flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-purple-600 animate-spin" />
                <span className="font-semibold text-purple-900/60">Analysing ledger mechanics...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input box */}
        <div className="mt-4 pt-4 border-t border-purple-100 flex gap-2">
          <input
            type="text"
            placeholder="Query NBFC compliance, recovery routes, or treasury risk models..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend(inputMessage);
            }}
            className="flex-1 px-4 py-3 bg-purple-50/50 border border-purple-200/50 rounded-2xl text-xs font-semibold text-purple-950 placeholder:text-purple-900/30 outline-none focus:ring-1 focus:ring-purple-400 focus:bg-white transition-all"
          />
          <button
            onClick={() => handleSend(inputMessage)}
            className="p-3 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white rounded-2xl transition-all shadow-md shrink-0 cursor-pointer active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
