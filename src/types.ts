export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  kycStatus: 'Verified' | 'Pending' | 'Rejected';
  activeLoansCount: number;
  totalLoanAmount: number;
  riskScore: number; // 300 to 900 (credit-score style)
  avatar: string;
}

export interface LoanApplication {
  id: string;
  customerName: string;
  category: 'Personal' | 'Gold' | 'Business' | 'Vehicle' | 'Home';
  amount: number;
  tenureMonths: number;
  interestRate: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  date: string;
}

export interface Loan {
  id: string;
  customerName: string;
  category: 'Personal' | 'Gold' | 'Business' | 'Vehicle' | 'Home';
  principalAmount: number;
  outstandingAmount: number;
  interestRate: number;
  emiAmount: number;
  status: 'Active' | 'Closed' | 'Defaulted';
  disbursedDate: string;
}

export interface Collection {
  id: string;
  customerName: string;
  collectorName: string;
  amountDue: number;
  amountCollected: number;
  date: string;
  status: 'Collected' | 'Overdue' | 'Scheduled';
}

export interface PaymentTransaction {
  id: string;
  customerName: string;
  amount: number;
  method: 'UPI' | 'NetBanking' | 'Card' | 'ACH Auto-debit' | 'Cash';
  status: 'Successful' | 'Pending' | 'Failed';
  date: string;
  referenceId: string;
}

export interface EmiSchedule {
  id: string;
  customerName: string;
  loanId: string;
  emiNumber: number;
  totalEmis: number;
  amount: number;
  dueDate: string;
  status: 'Paid' | 'Upcoming' | 'Overdue';
}

export interface treasuryInvestment {
  id: string;
  assetClass: 'Corporate Bonds' | 'Mutual Funds' | 'Government G-Secs' | 'Gold Reserves' | 'Commercial Paper';
  name: string;
  investedAmount: number;
  currentValue: number;
  yieldYtd: number;
  riskProfile: 'Low' | 'Medium' | 'High';
}

export interface SystemNotification {
  id: string;
  title: string;
  message: string;
  category: 'Security' | 'Risk warnings' | 'Credit' | 'Payments';
  read: boolean;
  date: string;
}
