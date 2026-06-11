import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart3, Plus, UserCheck, Calendar, DollarSign, Clock, ShieldAlert,
  SlidersHorizontal, CheckCircle2, Search, Filter, X, Send, Coins 
} from 'lucide-react';
import { Collection } from '../types';

interface CollectionsProps {
  collections: Collection[];
  onAddCollection: (task: Collection) => void;
  onUpdateCollectionStatus: (id: string, status: 'Collected' | 'Overdue' | 'Scheduled') => void;
}

export default function Collections({ collections, onAddCollection, onUpdateCollectionStatus }: CollectionsProps) {
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Add Task states
  const [customerName, setCustomerName] = useState('');
  const [collectorName, setCollectorName] = useState('');
  const [amountDue, setAmountDue] = useState<number>(10000);
  const [dueDate, setDueDate] = useState('');
  const [formError, setFormError] = useState('');

  // Sorter
  const filteredCollections = collections.filter(coll => {
    const matchesSearch = coll.customerName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          coll.collectorName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || coll.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!customerName || !collectorName || !dueDate) {
      setFormError('All fields are required.');
      return;
    }

    if (amountDue <= 0) {
      setFormError('Due amount must be a positive number.');
      return;
    }

    const newTask: Collection = {
      id: `COLL-${Math.floor(200 + Math.random() * 800)}`,
      customerName,
      collectorName,
      amountDue: Number(amountDue),
      amountCollected: 0,
      date: dueDate,
      status: 'Scheduled'
    };

    onAddCollection(newTask);
    setIsFormOpen(false);

    // Reset Form
    setCustomerName('');
    setCollectorName('');
    setAmountDue(10000);
    setDueDate('');
  };

  const formatRupee = (value: number) => {
    if (value >= 100000) {
      return `₹${(value / 100000).toFixed(2)} L`;
    }
    return `₹${value.toLocaleString('en-IN')}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-purple-950 font-sans tracking-tight">Recovery & Collections Desk</h1>
          <p className="text-xs text-purple-900/60 font-semibold uppercase tracking-wider font-mono">Field recovery management and daily schedules</p>
        </div>

        <button
          onClick={() => setIsFormOpen(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-95 text-white font-semibold text-xs rounded-xl shadow-lg active:scale-98 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Create Recovery Task
        </button>
      </div>

      {/* Stats summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-4 bg-purple-50 border border-purple-100 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-xl size-11 flex items-center justify-center shrink-0">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-purple-900/50 block font-bold font-mono">Gross Collected Today</span>
            <strong className="text-md font-black text-purple-950">
              {formatRupee(collections.reduce((sum, c) => sum + c.amountCollected, 0))}
            </strong>
          </div>
        </div>

        <div className="p-4 bg-pink-50 border border-pink-100 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-pink-100 text-pink-500 rounded-xl size-11 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-purple-900/50 block font-bold font-mono">Overdue Pool Assets</span>
            <strong className="text-md font-black text-pink-600">
              {formatRupee(collections.filter(c => c.status === 'Overdue').reduce((sum, c) => sum + c.amountDue, 0))}
            </strong>
          </div>
        </div>

        <div className="p-4 bg-purple-50/50 border border-purple-100/30 rounded-2xl flex items-center gap-4">
          <div className="p-3 bg-purple-100/50 text-purple-500 rounded-xl size-11 flex items-center justify-center shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] text-purple-900/50 block font-bold font-mono">Pending Schedules</span>
            <strong className="text-md font-black text-purple-950">
              {collections.filter(c => c.status === 'Scheduled').length} Work Orders
            </strong>
          </div>
        </div>
      </div>

      {/* Filter bar */}
      <div className="glass-card border border-white rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:flex-grow">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-purple-500" />
          <input 
            type="text" 
            placeholder="Search collections by borrower or agent name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/50 border border-purple-200/30 rounded-xl text-purple-950 text-xs focus:ring-1 focus:ring-purple-400 outline-none placeholder:text-purple-900/30 font-medium"
          />
        </div>

        <div className="flex gap-2 w-full md:w-auto shrink-0 justify-end">
          <span className="text-xs font-bold text-purple-900/60 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-purple-500" /> Status:
          </span>
          {['All', 'Collected', 'Overdue', 'Scheduled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
                statusFilter === status 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-purple-100/50 text-purple-700 hover:bg-purple-100'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Form Dialog */}
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
                  <SlidersHorizontal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-purple-950">Add Recovery Assignment</h3>
                  <p className="text-xs text-purple-900/60 font-medium font-mono">B2B Delinquency Control desk</p>
                </div>
              </div>

              {formError && (
                <div className="mb-4 p-3 bg-pink-100 text-pink-600 border border-pink-200 rounded-xl text-xs font-bold">
                  ⚠️ {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Borrower Company Name</label>
                  <input 
                    type="text" 
                    value={customerName} 
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Meera Deshmukh" 
                    className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Assigned Field Recovery Officer Name</label>
                  <input 
                    type="text" 
                    value={collectorName} 
                    onChange={(e) => setCollectorName(e.target.value)}
                    placeholder="e.g. Ramesh Sawant" 
                    className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Required EMI amount (₹)</label>
                    <input 
                      type="number" 
                      value={amountDue} 
                      onChange={(e) => setAmountDue(Number(e.target.value))}
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-medium text-purple-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider font-black text-purple-950/60 font-mono mb-1">Target Due Date</label>
                    <input 
                      type="date" 
                      value={dueDate} 
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white border border-purple-200 rounded-xl text-xs outline-none focus:border-purple-500 font-mono text-purple-900"
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
                    Deploy Recovery Plan
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Collections layout list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
        {filteredCollections.length === 0 ? (
          <div className="col-span-full text-center py-16 bg-white/40 border border-purple-200/20 rounded-3xl">
            <SlidersHorizontal className="w-10 h-10 text-purple-300 mx-auto mb-3" />
            <p className="text-xs font-bold text-purple-950/50">No Recovery / collector tasks found in database matching selection.</p>
          </div>
        ) : (
          filteredCollections.map((coll) => (
            <motion.div
              key={coll.id}
              layout
              whileHover={{ y: -2 }}
              className="glass-card border border-white rounded-[24px] p-6 relative overflow-hidden flex flex-col justify-between"
            >
              {coll.status === 'Overdue' && (
                <div className="absolute top-0 right-0 w-36 h-36 bg-pink-100/50 rounded-bl-[160px] pointer-events-none"></div>
              )}
              {coll.status === 'Collected' && (
                <div className="absolute top-0 right-0 w-36 h-36 bg-purple-100/40 rounded-bl-[160px] pointer-events-none"></div>
              )}

              <div>
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-purple-500 uppercase tracking-wider block">Task ID: {coll.id}</span>
                    <h3 className="text-sm font-bold text-purple-950 mt-1">{coll.customerName}</h3>
                  </div>

                  <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                    coll.status === 'Overdue' ? 'bg-pink-100 text-pink-600 border-pink-200/50 animate-pulse' : 
                    coll.status === 'Collected' ? 'bg-purple-100 text-purple-700 border-purple-200/50' : 
                    'bg-amber-100 text-amber-700 border-amber-200/50'
                  }`}>
                    {coll.status}
                  </span>
                </div>

                <div className="divider border-b border-purple-100/40 my-4"></div>

                <div className="space-y-2 text-xs font-medium text-purple-950">
                  <p className="text-purple-900/60">Assigned Agent Officer: <span className="text-purple-950 font-bold">{coll.collectorName}</span></p>
                  <p className="text-purple-900/60">Target Due Date: <span className="font-mono text-purple-950 font-bold">{coll.date}</span></p>
                  
                  <div className="grid grid-cols-2 gap-4 bg-white/40 p-3 rounded-xl border border-purple-100/30 mt-4">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-900/50 block tracking-wider leading-none">Required Due</span>
                      <strong className="text-xs font-extrabold text-pink-600 mt-1 block">{formatRupee(coll.amountDue)}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-purple-900/50 block tracking-wider leading-none">Recovered</span>
                      <strong className="text-xs font-extrabold text-purple-600 mt-1 block">{formatRupee(coll.amountCollected)}</strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status swappers - buttons to change states */}
              {coll.status !== 'Collected' && (
                <div className="mt-6 pt-4 border-t border-purple-200/20 flex gap-2">
                  <button
                    onClick={() => onUpdateCollectionStatus(coll.id, 'Collected')}
                    className="flex-1 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-xs font-black hover:opacity-95 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" /> Collect & Close Out
                  </button>

                  {coll.status !== 'Overdue' && (
                    <button
                      onClick={() => onUpdateCollectionStatus(coll.id, 'Overdue')}
                      className="px-3 py-1.5 border border-pink-200 text-pink-600 hover:bg-pink-100/30 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Overdue Flag
                    </button>
                  )}
                  {coll.status !== 'Scheduled' && (
                    <button
                      onClick={() => onUpdateCollectionStatus(coll.id, 'Scheduled')}
                      className="px-3 py-1.5 border border-purple-200 text-purple-600 hover:bg-purple-100/30 rounded-xl text-xs font-semibold cursor-pointer"
                    >
                      Reschedule
                    </button>
                  )}
                </div>
              )}

              {coll.status === 'Collected' && (
                <div className="mt-6 pt-4 border-t border-purple-200/20 text-purple-600 text-xs font-bold font-mono flex items-center gap-1">
                  ✅ Consummated. Funds settled in pool balance.
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
