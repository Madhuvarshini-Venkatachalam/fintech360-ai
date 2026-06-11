import {
  Customer,
  LoanApplication,
  Loan,
  Collection,
  PaymentTransaction,
  EmiSchedule,
  treasuryInvestment,
  SystemNotification
} from './types';

export const initialCustomers: Customer[] = [
  {
    id: 'CUST-1021',
    name: 'Rajesh Nair',
    email: 'rajesh.nair@nairindustries.in',
    phone: '+91 98230 44210',
    company: 'Nair Manufacturing & Logistics',
    kycStatus: 'Verified',
    activeLoansCount: 2,
    totalLoanAmount: 4800000,
    riskScore: 785,
    avatar: '👨‍💼'
  },
  {
    id: 'CUST-1022',
    name: 'Meera Deshmukh',
    email: 'meera.design@gmail.com',
    phone: '+91 97731 55660',
    company: 'Studio Meera Interiors',
    kycStatus: 'Verified',
    activeLoansCount: 1,
    totalLoanAmount: 1200000,
    riskScore: 820,
    avatar: '👩‍🎨'
  },
  {
    id: 'CUST-1023',
    name: 'Amit Agrawal',
    email: 'amit@agrawalgrocery.co.in',
    phone: '+91 99120 88440',
    company: 'Agrawal Wholesale Grocers',
    kycStatus: 'Verified',
    activeLoansCount: 1,
    totalLoanAmount: 3500000,
    riskScore: 690,
    avatar: '🧑‍🌾'
  },
  {
    id: 'CUST-1024',
    name: 'Priyanka Sen',
    email: 'p.sen@senmedias.com',
    phone: '+91 91672 33110',
    company: 'Sen Creative Media Relations',
    kycStatus: 'Pending',
    activeLoansCount: 0,
    totalLoanAmount: 0,
    riskScore: 710,
    avatar: '👩‍💻'
  },
  {
    id: 'CUST-1025',
    name: 'Vikram Chatwal',
    email: 'vikram@chatwalhotels.com',
    phone: '+91 96112 00445',
    company: 'Chatwal Heritage Boutique Hotels',
    kycStatus: 'Verified',
    activeLoansCount: 3,
    totalLoanAmount: 18500000,
    riskScore: 840,
    avatar: '👳‍♂️'
  },
  {
    id: 'CUST-1026',
    name: 'Sanjay Dutt',
    email: 'sanjay.dutt@sancreations.in',
    phone: '+91 93245 61123',
    company: 'San Creations Automotives',
    kycStatus: 'Rejected',
    activeLoansCount: 0,
    totalLoanAmount: 0,
    riskScore: 420,
    avatar: '🧔'
  }
];

export const initialLoanApplications: LoanApplication[] = [
  {
    id: 'APPL-9081',
    customerName: 'Priyanka Sen',
    category: 'Business',
    amount: 1500000,
    tenureMonths: 24,
    interestRate: 14.5,
    status: 'Pending',
    date: '2026-06-10'
  },
  {
    id: 'APPL-9082',
    customerName: 'Anil Ambani',
    category: 'Personal',
    amount: 500000,
    tenureMonths: 12,
    interestRate: 16.0,
    status: 'Rejected',
    date: '2026-06-08'
  },
  {
    id: 'APPL-9083',
    customerName: 'Nisha Sharma',
    category: 'Home',
    amount: 4500000,
    tenureMonths: 120,
    interestRate: 8.95,
    status: 'Approved',
    date: '2026-06-07'
  },
  {
    id: 'APPL-9084',
    customerName: 'Karan Johar',
    category: 'Vehicle',
    amount: 2500000,
    tenureMonths: 36,
    interestRate: 10.5,
    status: 'Pending',
    date: '2026-06-05'
  }
];

export const initialLoans: Loan[] = [
  {
    id: 'LOAN-501',
    customerName: 'Rajesh Nair',
    category: 'Business',
    principalAmount: 4000000,
    outstandingAmount: 2850000,
    interestRate: 13.5,
    emiAmount: 188000,
    status: 'Active',
    disbursedDate: '2025-08-15'
  },
  {
    id: 'LOAN-502',
    customerName: 'Meera Deshmukh',
    category: 'Personal',
    principalAmount: 1200000,
    outstandingAmount: 450000,
    interestRate: 15.0,
    emiAmount: 58000,
    status: 'Active',
    disbursedDate: '2025-01-10'
  },
  {
    id: 'LOAN-503',
    customerName: 'Amit Agrawal',
    category: 'Gold',
    principalAmount: 3500000,
    outstandingAmount: 3500000,
    interestRate: 11.2,
    emiAmount: 115000,
    status: 'Active',
    disbursedDate: '2026-05-20'
  },
  {
    id: 'LOAN-504',
    customerName: 'Vikram Chatwal',
    category: 'Business',
    principalAmount: 15000000,
    outstandingAmount: 11200000,
    interestRate: 12.0,
    emiAmount: 490000,
    status: 'Active',
    disbursedDate: '2024-12-01'
  },
  {
    id: 'LOAN-505',
    customerName: 'Sushil Kumar',
    category: 'Home',
    principalAmount: 8500000,
    outstandingAmount: 0,
    interestRate: 8.5,
    emiAmount: 0,
    status: 'Closed',
    disbursedDate: '2020-04-12'
  },
  {
    id: 'LOAN-506',
    customerName: 'Sanjay Dutt',
    category: 'Vehicle',
    principalAmount: 1800000,
    outstandingAmount: 1800000,
    interestRate: 18.5,
    emiAmount: 64000,
    status: 'Defaulted',
    disbursedDate: '2025-11-20'
  }
];

export const initialCollections: Collection[] = [
  {
    id: 'COLL-201',
    customerName: 'Sanjay Dutt',
    collectorName: 'Ramesh Sawant',
    amountDue: 64000,
    amountCollected: 0,
    date: '2026-06-11',
    status: 'Overdue'
  },
  {
    id: 'COLL-202',
    customerName: 'Amit Agrawal',
    collectorName: 'Sunita Patil',
    amountDue: 115000,
    amountCollected: 115000,
    date: '2026-06-10',
    status: 'Collected'
  },
  {
    id: 'COLL-203',
    customerName: 'Meera Deshmukh',
    collectorName: 'Pradeep Jha',
    amountDue: 58000,
    amountCollected: 58000,
    date: '2026-06-10',
    status: 'Collected'
  },
  {
    id: 'COLL-204',
    customerName: 'Rajesh Nair',
    collectorName: 'Ramesh Sawant',
    amountDue: 188000,
    amountCollected: 0,
    date: '2026-06-15',
    status: 'Scheduled'
  }
];

export const initialPayments: PaymentTransaction[] = [
  {
    id: 'PAY-7701',
    customerName: 'Meera Deshmukh',
    amount: 58000,
    method: 'ACH Auto-debit',
    status: 'Successful',
    date: '2026-06-10',
    referenceId: 'TXN-ACH-0982'
  },
  {
    id: 'PAY-7702',
    customerName: 'Amit Agrawal',
    amount: 115000,
    method: 'UPI',
    status: 'Successful',
    date: '2026-06-10',
    referenceId: 'TXN-UPI-7712'
  },
  {
    id: 'PAY-7703',
    customerName: 'Sanjay Dutt',
    amount: 64000,
    method: 'ACH Auto-debit',
    status: 'Failed',
    date: '2026-06-05',
    referenceId: 'TXN-ACH-4412'
  },
  {
    id: 'PAY-7704',
    customerName: 'Vikram Chatwal',
    amount: 490000,
    method: 'NetBanking',
    status: 'Successful',
    date: '2026-06-01',
    referenceId: 'TXN-NB-6612'
  },
  {
    id: 'PAY-7705',
    customerName: 'Rajesh Nair',
    amount: 188000,
    method: 'ACH Auto-debit',
    status: 'Pending',
    date: '2026-06-11',
    referenceId: 'TXN-ACH-9941'
  }
];

export const initialEmiSchedules: EmiSchedule[] = [
  {
    id: 'SCH-801',
    customerName: 'Rajesh Nair',
    loanId: 'LOAN-501',
    emiNumber: 10,
    totalEmis: 24,
    amount: 188000,
    dueDate: '2026-06-15',
    status: 'Upcoming'
  },
  {
    id: 'SCH-802',
    customerName: 'Sanjay Dutt',
    loanId: 'LOAN-506',
    emiNumber: 7,
    totalEmis: 36,
    amount: 64000,
    dueDate: '2026-06-05',
    status: 'Overdue'
  },
  {
    id: 'SCH-803',
    customerName: 'Meera Deshmukh',
    loanId: 'LOAN-502',
    emiNumber: 17,
    totalEmis: 24,
    amount: 58000,
    dueDate: '2026-06-10',
    status: 'Paid'
  },
  {
    id: 'SCH-804',
    customerName: 'Amit Agrawal',
    loanId: 'LOAN-503',
    emiNumber: 1,
    totalEmis: 36,
    amount: 115000,
    dueDate: '2026-06-10',
    status: 'Paid'
  }
];

export const initialInvestments: treasuryInvestment[] = [
  {
    id: 'TREAS-01',
    assetClass: 'Corporate Bonds',
    name: 'HDFC Capital High-Yield Debentures',
    investedAmount: 50000000,
    currentValue: 53120000,
    yieldYtd: 9.2,
    riskProfile: 'Low'
  },
  {
    id: 'TREAS-02',
    assetClass: 'Government G-Secs',
    name: 'RBI Sovereign Coupon Bond (7.18% GS 2033)',
    investedAmount: 100000000,
    currentValue: 104200000,
    yieldYtd: 7.2,
    riskProfile: 'Low'
  },
  {
    id: 'TREAS-03',
    assetClass: 'Mutual Funds',
    name: 'Nippon India Liquid Fund - Institutional Direct',
    investedAmount: 15000000,
    currentValue: 15610000,
    yieldYtd: 6.8,
    riskProfile: 'Low'
  },
  {
    id: 'TREAS-04',
    assetClass: 'Commercial Paper',
    name: 'L&T Finance Commercial Debt Note (Series B)',
    investedAmount: 25000000,
    currentValue: 26850000,
    yieldYtd: 8.5,
    riskProfile: 'Medium'
  },
  {
    id: 'TREAS-05',
    assetClass: 'Gold Reserves',
    name: 'MMTC-PAMP 24K Physical Refinery Bullion',
    investedAmount: 20000000,
    currentValue: 25920000,
    yieldYtd: 29.6,
    riskProfile: 'Medium'
  }
];

export const initialNotifications: SystemNotification[] = [
  {
    id: 'NOTIF-01',
    title: 'EMI Default Warning Issued',
    message: 'SMS & Email alert sent to Sanjay Dutt (CUST-1026) regarding overdue EMI ₹64,000.',
    category: 'Risk warnings',
    read: false,
    date: '2026-06-11 09:12'
  },
  {
    id: 'NOTIF-02',
    title: 'Loan Approved Successfully',
    message: 'Nisha Sharma Home Loan application APPL-9083 approved for ₹45,00,000.',
    category: 'Credit',
    read: false,
    date: '2026-06-10 14:30'
  },
  {
    id: 'NOTIF-03',
    title: 'UPI Payment Credited',
    message: 'Received collection from Amit Agrawal (CUST-1023) for ₹1,15,000.',
    category: 'Payments',
    read: false,
    date: '2026-06-10 11:24'
  },
  {
    id: 'NOTIF-04',
    title: 'Auto-Debit Failed Retry Queued',
    message: 'ACH mandate for Sanjay Dutt failed on HDFC Bank node. Email report sent.',
    category: 'Security',
    read: false,
    date: '2026-06-05 06:15'
  }
];

// Recharts stats data
export const monthlyOverviewStats = [
  { month: 'Jan', ActiveCapital: 3.2, Recovered: 1.1, DefaultProbability: 1.8 },
  { month: 'Feb', ActiveCapital: 3.8, Recovered: 1.2, DefaultProbability: 1.6 },
  { month: 'Mar', ActiveCapital: 4.4, Recovered: 1.5, DefaultProbability: 1.4 },
  { month: 'Apr', ActiveCapital: 4.9, Recovered: 1.7, DefaultProbability: 1.5 },
  { month: 'May', ActiveCapital: 5.2, Recovered: 1.9, DefaultProbability: 1.2 },
  { month: 'Jun', ActiveCapital: 5.4, Recovered: 2.1, DefaultProbability: 1.1 } // In crores (Cr)
];

export const loanDistributionStats = [
  { name: 'Personal Loans', value: 38 },
  { name: 'Business Loans', value: 45 },
  { name: 'Gold Loans', value: 20 },
  { name: 'Vehicle Loans', value: 15 },
  { name: 'Home Loans', value: 65 } // In lakhs / aggregate
];

export const collectionBreakdownToday = [
  { segment: 'ACH Auto-debit', amount: 158000, count: 12 },
  { segment: 'UPI Payout', amount: 95000, count: 28 },
  { segment: 'NetBanking Trans', amount: 490000, count: 4 },
  { segment: 'Cash Handed', amount: 35000, count: 2 }
];
