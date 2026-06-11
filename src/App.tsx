import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ArrowDownCircle, 
  ArrowUpRight, 
  PiggyBank, 
  TrendingUp, 
  ShieldAlert, 
  FileText, 
  Brain, 
  Bell, 
  Settings as SettingsIcon, 
  HelpCircle, 
  Search, 
  Moon, 
  Sun, 
  Menu, 
  X, 
  Sparkles,
  Award,
  Users,
  Compass,
  FileCheck,
  CreditCard,
  CalendarDays,
  Gem,
  Activity,
  UserCheck,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Import local data assets and subpages
import { 
  Customer, LoanApplication, Loan, Collection, PaymentTransaction, 
  EmiSchedule, treasuryInvestment, SystemNotification 
} from './types';

import { 
  initialCustomers,
  initialLoanApplications,
  initialLoans,
  initialCollections,
  initialPayments,
  initialEmiSchedules,
  initialInvestments,
  initialNotifications 
} from './initialData';

import CurrencyWatermark from './components/CurrencyWatermark';

// Import core premium pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import LoanApplications from './pages/LoanApplications';
import LoanManagement from './pages/LoanManagement';
import Collections from './pages/Collections';
import Payments from './pages/Payments';
import EMITracker from './pages/EMITracker';
import Investments from './pages/Investments';
import Reports from './pages/Reports';
import Analytics from './pages/Analytics';
import AIInsights from './pages/AIInsights';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import HelpSupport from './pages/HelpSupport';
import Contact from './pages/Contact';

export default function App() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(true);

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loanApplications, setLoanApplications] = useState<LoanApplication[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [payments, setPayments] = useState<PaymentTransaction[]>([]);
  const [schedules, setSchedules] = useState<EmiSchedule[]>([]);
  const [treasury, setTreasury] = useState<treasuryInvestment[]>([]);
  const [notifications, setNotifications] = useState<SystemNotification[]>([]);

  React.useEffect(() => {
    async function loadRealData() {
      try {
        const [customersRes, loanApplicationsRes, loansRes, collectionsRes, paymentsRes, schedulesRes, treasuryRes, notificationsRes] = await Promise.all([
          fetch('/api/customers'),
          fetch('/api/loan-applications'),
          fetch('/api/loans'),
          fetch('/api/collections'),
          fetch('/api/payments'),
          fetch('/api/emi-schedules'),
          fetch('/api/treasury'),
          fetch('/api/notifications')
        ]);

        const [customersData, loanApplicationsData, loansData, collectionsData, paymentsData, schedulesData, treasuryData, notificationsData] = await Promise.all([
          customersRes.json(),
          loanApplicationsRes.json(),
          loansRes.json(),
          collectionsRes.json(),
          paymentsRes.json(),
          schedulesRes.json(),
          treasuryRes.json(),
          notificationsRes.json()
        ]);

        setCustomers(customersData);
        setLoanApplications(loanApplicationsData);
        setLoans(loansData);
        setCollections(collectionsData);
        setPayments(paymentsData);
        setSchedules(schedulesData);
        setTreasury(treasuryData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Failed to load backend data.', error);
      } finally {
        setIsLoadingData(false);
      }
    }

    loadRealData();
  }, []);

  const handleClearDemoData = () => {
    setCustomers([]);
    setLoanApplications([]);
    setLoans([]);
    setCollections([]);
    setPayments([]);
    setSchedules([]);
    setTreasury([]);
    setNotifications([
      {
        id: `NOTIF-${Math.floor(100 + Math.random() * 899)}`,
        title: '🌱 Clean Slate Mode Active',
        message: 'Workspace has been cleared of all pre-filled mock entries. Go to the Customers page or Loan Applications to add your own real records.',
        category: 'Security',
        read: false,
        date: new Date().toISOString().split('T')[0]
      }
    ]);
  };

  const handleLoadDemoData = async () => {
    try {
      const [customersData, loanApplicationsData, loansData, collectionsData, paymentsData, schedulesData, treasuryData, notificationsData] = await Promise.all([
        fetch('/api/customers').then((res) => res.json()),
        fetch('/api/loan-applications').then((res) => res.json()),
        fetch('/api/loans').then((res) => res.json()),
        fetch('/api/collections').then((res) => res.json()),
        fetch('/api/payments').then((res) => res.json()),
        fetch('/api/emi-schedules').then((res) => res.json()),
        fetch('/api/treasury').then((res) => res.json()),
        fetch('/api/notifications').then((res) => res.json())
      ]);

      setCustomers(customersData);
      setLoanApplications(loanApplicationsData);
      setLoans(loansData);
      setCollections(collectionsData);
      setPayments(paymentsData);
      setSchedules(schedulesData);
      setTreasury(treasuryData);
      setNotifications(notificationsData);
    } catch (error) {
      console.error('Failed to reload real backend data.', error);
    }
  };

  const [searchQuery, setSearchQuery] = useState('');

  // Count of unread notifications
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // State Dispatch Operations

  // Adding customer
  const handleAddCustomer = async (c: Customer) => {
    try {
      const response = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(c)
      });
      if (!response.ok) throw new Error('Failed to add customer');
      const savedCustomer = await response.json();
      setCustomers(prev => [savedCustomer, ...prev]);
    } catch (error) {
      console.error('Unable to save customer.', error);
    }
  };

  const handleAddLoanApplication = async (app: LoanApplication) => {
    try {
      const response = await fetch('/api/loan-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app)
      });
      if (!response.ok) throw new Error('Failed to add application');
      const savedApplication = await response.json();
      setLoanApplications(prev => [savedApplication, ...prev]);
    } catch (error) {
      console.error('Unable to save loan application.', error);
    }
  };

  const handleProcessApplication = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
      const response = await fetch(`/api/loan-applications/${id}/process`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to process application');
      const result = await response.json();
      setLoanApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      if (result.loan) setLoans(prev => [result.loan, ...prev]);
      if (result.schedule) setSchedules(prev => [result.schedule, ...prev]);
      if (result.notification) setNotifications(prev => [result.notification, ...prev]);
    } catch (error) {
      console.error('Unable to process loan application.', error);
    }
  };

  // Adding collections task
  const handleAddCollection = async (col: Collection) => {
    try {
      const response = await fetch('/api/collections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(col)
      });
      if (!response.ok) throw new Error('Failed to add collection');
      const savedCollection = await response.json();
      setCollections(prev => [savedCollection, ...prev]);
    } catch (error) {
      console.error('Unable to save collection task.', error);
    }
  };

  const handleTriggerEmiPayment = async (id: string) => {
    try {
      const response = await fetch(`/api/emi-schedules/${id}/pay`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('Failed to trigger payment');
      const result = await response.json();

      setSchedules(prev => prev.map(s => s.id === id ? { ...s, status: 'Paid' } : s));
      if (result.payment) setPayments(prev => [result.payment, ...prev]);
      if (result.notification) setNotifications(prev => [result.notification, ...prev]);
      if (result.emi) {
        setLoans(prev => prev.map(l => {
          if (l.id === result.emi.loanId) {
            const updatedOutstanding = Math.max(0, l.outstandingAmount - result.emi.amount);
            return {
              ...l,
              outstandingAmount: updatedOutstanding,
              status: updatedOutstanding === 0 ? 'Closed' : l.status
            };
          }
          return l;
        }));
      }
    } catch (error) {
      console.error('Unable to complete EMI payment.', error);
    }
  };

  // Manually lodging/reconciling payments
  const handleAddPayment = async (p: PaymentTransaction) => {
    try {
      const response = await fetch('/api/payments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(p)
      });
      if (!response.ok) throw new Error('Failed to add payment');
      const savedPayment = await response.json();
      setPayments(prev => [savedPayment, ...prev]);
      setLoans(prev => prev.map(l => {
        if (l.customerName === savedPayment.customerName && l.status === 'Active') {
          const updatedOutstanding = Math.max(0, l.outstandingAmount - savedPayment.amount);
          return {
            ...l,
            outstandingAmount: updatedOutstanding,
            status: updatedOutstanding === 0 ? 'Closed' : l.status
          };
        }
        return l;
      }));
    } catch (error) {
      console.error('Unable to save payment.', error);
    }
  };

  // Locking a new Corporate Treasury Asset Allocation
  const handleAddInvestment = (inv: treasuryInvestment) => {
    setTreasury(prev => [inv, ...prev]);
  };

  // Clearing logs
  const handleClearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };
  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  const handleUpdateKyc = (id: string, status: 'Verified' | 'Pending' | 'Rejected') => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, kycStatus: status } : c));
  };

  const handleDeleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  // Switch pages routing maps
  const renderContent = () => {
    switch (activeTab) {
      case 'Home':
        return (
          <Home 
            onGetStarted={() => setActiveTab('Dashboard')} 
            onViewDashboard={() => setActiveTab('Dashboard')} 
          />
        );
      case 'Dashboard':
        return (
          <Dashboard 
            customers={customers}
            loanApplications={loanApplications}
            loans={loans}
            collections={collections}
            payments={payments}
            schedules={schedules}
            treasury={treasury}
            onTriggerEmiPayment={handleTriggerEmiPayment}
            onProcessApplication={handleProcessApplication}
            onClearDemo={handleClearDemoData}
            onLoadDemo={handleLoadDemoData}
          />
        );
      case 'Customers':
        return (
          <Customers 
            customers={customers} 
            onAddCustomer={handleAddCustomer} 
            onUpdateKyc={handleUpdateKyc}
            onDeleteCustomer={handleDeleteCustomer}
          />
        );
      case 'Loan Applications':
        return (
          <LoanApplications 
            applications={loanApplications} 
            registeredCustomers={customers} 
            onAddApplication={handleAddLoanApplication}
            onApproveApplication={(id) => handleProcessApplication(id, 'Approved')}
            onRejectApplication={(id) => handleProcessApplication(id, 'Rejected')}
          />
        );
      case 'Loan Management':
        return (
          <LoanManagement 
            loans={loans} 
            onCloseLoan={(id) => setLoans(prev => prev.map(l => l.id === id ? { ...l, outstandingAmount: 0, status: 'Closed' } : l))}
            onMarkDefault={(id) => setLoans(prev => prev.map(l => l.id === id ? { ...l, status: 'Defaulted' } : l))}
          />
        );
      case 'Collections':
        return (
          <Collections 
            collections={collections} 
            onAddCollection={handleAddCollection}
            onUpdateCollectionStatus={(id, status) => setCollections(prev => prev.map(c => c.id === id ? { ...c, status } : c))}
          />
        );
      case 'Payments':
        return <Payments payments={payments} onAddPayment={handleAddPayment} />;
      case 'EMI Tracker':
        return <EMITracker schedules={schedules} onTriggerEmiPayment={handleTriggerEmiPayment} />;
      case 'Investments':
        return <Investments investments={treasury} onAddInvestment={handleAddInvestment} />;
      case 'Reports':
        return <Reports loans={loans} payments={payments} collections={collections} />;
      case 'Analytics':
        return <Analytics />;
      case 'AI Insights':
        return <AIInsights />;
      case 'Notifications':
        return (
          <Notifications 
            notifications={notifications} 
            onClearNotification={handleClearNotification} 
            onClearAllNotifications={handleClearAllNotifications}
          />
        );
      case 'Settings':
        return <Settings />;
      case 'Help & Support':
        return <HelpSupport />;
      case 'Contact':
        return <Contact />;
      default:
        return (
          <Home 
            onGetStarted={() => setActiveTab('Dashboard')} 
            onViewDashboard={() => setActiveTab('Dashboard')} 
          />
        );
    }
  };

  // Sidebar navigation options
  const navItems = [
    { name: 'Home', icon: <Compass className="w-4 h-4" /> },
    { name: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Customers', icon: <Users className="w-4 h-4" /> },
    { name: 'Loan Applications', icon: <FileCheck className="w-4 h-4" /> },
    { name: 'Loan Management', icon: <Activity className="w-4 h-4 text-purple-600" /> },
    { name: 'Collections', icon: <ShieldAlert className="w-4 h-4 text-rose-500" /> },
    { name: 'Payments', icon: <CreditCard className="w-4 h-4 text-pink-500" /> },
    { name: 'EMI Tracker', icon: <CalendarDays className="w-4 h-4 text-amber-500" /> },
    { name: 'Investments', icon: <Gem className="w-4 h-4 text-purple-500" /> },
    { name: 'Reports', icon: <FileText className="w-4 h-4 text-purple-500" /> },
    { name: 'Analytics', icon: <TrendingUp className="w-4 h-4 text-purple-600" /> },
    { name: 'AI Insights', icon: <Brain className="w-4 h-4 text-purple-700 animate-pulse" /> },
    { name: 'Notifications', icon: <Bell className="w-4 h-4 text-pink-500" /> },
    { name: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> },
    { name: 'Help & Support', icon: <HelpCircle className="w-4 h-4" /> },
    { name: 'Contact', icon: <MessageSquare className="w-4 h-4 text-pink-600" /> },
  ];

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-[#120B1D] text-purple-100' : 'bg-[#FFF7FB] text-purple-950'}`}>
      
      {/* Premium Banknotes Watermark overlays */}
      <CurrencyWatermark />

      {/* Main Orchestrating Layout Shell */}
      <div className="flex h-screen overflow-hidden">
        
        {/* Desktop Sidebar navigation rail */}
        <aside className="hidden lg:flex flex-col w-64 bg-white/45 backdrop-blur-2xl border-r border-purple-200/50 p-5 shrink-0 z-30 select-none justify-between overflow-y-auto scrollbar-none">
          <div className="space-y-6">
            {/* Logo details */}
            <div className="flex items-center gap-2.5 pb-4 border-b border-purple-200/30">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white text-lg tracking-tight shadow-md shadow-purple-500/15">
                💜
              </div>
              <div>
                <span className="text-sm font-black tracking-tight text-purple-950 font-sans">FinTech360 AI</span>
                <span className="block text-[9px] text-purple-700/60 uppercase font-bold tracking-widest mt-0.5 font-mono">Smart Finance SaaS</span>
              </div>
            </div>

            {/* Nav list elements */}
            <nav className="space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveTab(item.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all cursor-pointer ${
                    activeTab === item.name 
                      ? 'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-950 border border-purple-250/50 shadow-xs' 
                      : 'text-purple-900/60 hover:bg-white/45'
                  }`}
                >
                  <span className={`${activeTab === item.name ? 'scale-110 text-purple-700' : 'text-purple-900/50'}`}>
                    {item.icon}
                  </span>
                  {item.name}
                  
                  {item.name === 'Notifications' && unreadNotifCount > 0 && (
                    <span className="ml-auto bg-pink-500 text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded-full">
                      {unreadNotifCount}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* User badge */}
          <div className="p-3 mt-6 bg-purple-50/50 border border-purple-200/30 rounded-xl flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-100 to-pink-100 border border-purple-300 flex items-center justify-center font-bold text-sm text-pink-600">
              🏦
            </div>
            <div>
              <span className="text-xs font-black text-purple-950">SBI NBFC Node</span>
              <span className="block text-[8px] text-purple-700/60 font-bold font-mono tracking-wider uppercase leading-tight">Auditor Access</span>
            </div>
          </div>
        </aside>

        {/* Right side page workspace */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
          
          {/* Top Navbar */}
          <header className="h-16 bg-white/30 backdrop-blur-md border-b border-purple-200/30 px-6 flex items-center justify-between z-20">
            {/* Search and Title */}
            <div className="flex items-center gap-4 flex-1">
              {/* Mobile menu trigger */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-purple-50 text-purple-700 hover:bg-purple-150 cursor-pointer"
              >
                <Menu className="w-5 h-5" />
              </button>

              <div className="hidden md:flex items-center gap-2 bg-white/65 border border-purple-205/50 rounded-xl px-3 py-1.5 w-64">
                <Search className="w-4 h-4 text-purple-400" />
                <input
                  type="text"
                  placeholder="Ask FinTech360 AI Search..."
                  className="w-full text-xs font-semibold text-purple-950 outline-none placeholder-purple-400"
                />
              </div>
            </div>

            {/* Profile Avatar and utilities controls */}
            <div className="flex items-center gap-4 select-none shrink-0">
              {/* Notification system */}
              <button 
                onClick={() => setActiveTab('Notifications')}
                className="p-2 justify-center items-center rounded-xl hover:bg-purple-100/60 border border-purple-200/40 relative cursor-pointer"
              >
                <Bell className="w-4 h-4 text-purple-700" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-pink-500 animate-ping"></span>
                )}
              </button>

              {/* Dark mode toggle */}
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 justify-center items-center rounded-xl hover:bg-purple-100/60 border border-purple-200/40 cursor-pointer"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-purple-600" /> : <Moon className="w-4 h-4 text-purple-700" />}
              </button>

              <span className="h-4 w-px bg-purple-200"></span>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-pink-100 border border-purple-200 flex items-center justify-center font-bold text-xs text-pink-600">
                  🏦
                </div>
                <span className="hidden sm:inline-block text-xs font-black text-purple-950 font-sans tracking-tight">
                  Auditor Node
                </span>
              </div>
            </div>
          </header>

          {/* Subpage Router Space scrollable */}
          <main className="flex-1 overflow-y-auto p-6 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -7 }}
                transition={{ duration: 0.25 }}
                className="w-full max-w-7xl mx-auto pb-12"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Mobile Drawer Slide navigation menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-purple-950/40 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative flex flex-col w-64 max-w-xs bg-white h-full p-5 shadow-2xl justify-between border-r border-purple-100 overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-purple-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">💜</span>
                    <span className="text-sm font-black text-purple-950">FinTech360 AI</span>
                  </div>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1.5 rounded-lg hover:bg-purple-100 text-purple-700 cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveTab(item.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                        activeTab === item.name 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'text-purple-900/70 hover:bg-purple-50'
                      }`}
                    >
                      {item.icon}
                      {item.name}
                      
                      {item.name === 'Notifications' && unreadNotifCount > 0 && (
                        <span className="ml-auto bg-pink-500 text-white font-mono text-[9px] font-black px-1.5 py-0.5 rounded-full">
                          {unreadNotifCount}
                        </span>
                      )}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-2 bg-purple-50 border border-purple-200/30 rounded-xl flex items-center gap-2 mt-6">
                <div className="w-8 h-8 rounded-full bg-pink-100 border border-purple-200 flex items-center justify-center text-xs">
                  🏦
                </div>
                <div>
                  <span className="text-xs font-black text-purple-950">Sovereign SBI</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
