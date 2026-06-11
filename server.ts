import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import {
  initialCustomers,
  initialLoanApplications,
  initialLoans,
  initialCollections,
  initialPayments,
  initialEmiSchedules,
  initialInvestments,
  initialNotifications
} from "./src/initialData";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const clone = <T,>(items: T[]): T[] => items.map(item => ({ ...item } as T));
let customers = clone(initialCustomers);
let loanApplications = clone(initialLoanApplications);
let loans = clone(initialLoans);
let collections = clone(initialCollections);
let payments = clone(initialPayments);
let emiSchedules = clone(initialEmiSchedules);
let treasury = clone(initialInvestments);
let notifications = clone(initialNotifications);

// Simple PII redaction for context before sending to AI
function redactPIIContext(context: any) {
  if (!context) return context;
  const nameMap = new Map<string, string>();
  let idx = 1;

  const redactName = (name: string) => {
    if (!name) return name;
    if (nameMap.has(name)) return nameMap.get(name)!;
    const token = `Customer_${idx++}`;
    nameMap.set(name, token);
    return token;
  };

  const safe = { ...context };
  if (Array.isArray(safe.topOverdue)) {
    safe.topOverdue = safe.topOverdue.map((o: any) => ({ ...o, name: redactName(o.name) }));
  }
  if (Array.isArray(safe.topDelinquent)) {
    safe.topDelinquent = safe.topDelinquent.map((d: any) => ({ ...d, name: redactName(d.name) }));
  }
  // remove any obvious identifiers
  if (safe.topOverdue && safe.topOverdue.forEach) {
    safe.topOverdue = safe.topOverdue.map((o: any) => ({ id: undefined, ...o }));
  }
  return safe;
}

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is missing. Please set it in Settings > Secrets.");
  }
  
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// AI Advisor System Instruction
const SYSTEM_INSTRUCTION = `You are FinTech360 AI, an ultra-premium, enterprise-grade high-yield credit advisor and liquidity intelligence system.
Your character is highly polished, professional, and deeply authoritative on the Indian corporate finance ecosystem, NBFC regulations (RBI rules on LTV, capital adequacy ratios), chit funds, microfinance structures, field collection procedures, and treasury yield management.
You assist financial institutional leaders, loan officers, and collection executives in optimizing outstanding books, structuring loans, reducing NPA (Non-Performing Assets) rates, and projecting liquid yields across cash accounts, bonds, and G-Secs.
Always maintain an elegant, corporate, yet warm tone. Keep responses crisp and actionable. Always use ₹ for currencies.`;

// Gemini Chat API Route
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { message, history, context } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    
    // Parse structural context or chat sessions if helpful
    // For simple, robust interaction, we can construct standard chat parameters with systemInstruction
    const chatSession = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: history || []
    });

    const safeContext = redactPIIContext(context);
    const fullMessage = safeContext ? `Portfolio snapshot:\n${JSON.stringify(safeContext)}\n\n${message}` : message;

    const response = await chatSession.sendMessage({
      message: fullMessage
    });

    res.json({
      response: response.text,
      history: await chatSession.getHistory()
    });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ 
      error: error.message || "An unexpected error occurred in FinTrack AI service.",
      isDemo: !process.env.GEMINI_API_KEY 
    });
  }
});

// Backend data API routes
app.get('/api/customers', (_, res) => res.json(customers));
app.get('/api/loan-applications', (_, res) => res.json(loanApplications));
app.get('/api/loans', (_, res) => res.json(loans));
app.get('/api/collections', (_, res) => res.json(collections));
app.get('/api/payments', (_, res) => res.json(payments));
app.get('/api/emi-schedules', (_, res) => res.json(emiSchedules));
app.get('/api/treasury', (_, res) => res.json(treasury));
app.get('/api/notifications', (_, res) => res.json(notifications));

// Portfolio summary endpoint for AI context
app.get('/api/portfolio-summary', (_, res) => {
  const totalOutstanding = loans.reduce((s, l) => s + (l.outstandingAmount || 0), 0);
  const totalPrincipal = loans.reduce((s, l) => s + (l.principalAmount || 0), 0) || 1;
  const defaultedAmount = loans
    .filter((l) => l.status === 'Defaulted')
    .reduce((s, l) => s + (l.outstandingAmount || 0), 0);

  const npaPercent = +(100 * (defaultedAmount / totalPrincipal)).toFixed(2);

  const topOverdue = collections
    .filter((c) => c.status === 'Overdue')
    .sort((a, b) => b.amountDue - a.amountDue)
    .slice(0, 5)
    .map((c) => ({ name: c.customerName, amount: c.amountDue, id: c.id }));

  const topDelinquent = loans
    .filter((l) => l.status === 'Defaulted' || l.outstandingAmount > 0)
    .sort((a, b) => b.outstandingAmount - a.outstandingAmount)
    .slice(0, 5)
    .map((l) => ({ name: l.customerName, outstanding: l.outstandingAmount, id: l.id }));

  res.json({
    totalOutstanding,
    totalPrincipal,
    npaPercent,
    topOverdue,
    topDelinquent,
    loansCount: loans.length,
    collectionsCount: collections.length
  });
});

app.post('/api/customers', (req, res) => {
  const newCustomer = req.body;
  if (!newCustomer?.id) {
    return res.status(400).json({ error: 'Customer id is required' });
  }
  customers.unshift(newCustomer);
  res.status(201).json(newCustomer);
});

app.post('/api/loan-applications', (req, res) => {
  const newApplication = req.body;
  if (!newApplication?.id) {
    return res.status(400).json({ error: 'Application id is required' });
  }
  loanApplications.unshift(newApplication);
  res.status(201).json(newApplication);
});

app.post('/api/loan-applications/:id/process', (req, res) => {
  const id = req.params.id;
  const { status } = req.body as { status: 'Approved' | 'Rejected' };
  if (!['Approved', 'Rejected'].includes(status)) {
    return res.status(400).json({ error: 'Status must be Approved or Rejected' });
  }

  const application = loanApplications.find((item) => item.id === id);
  if (!application) {
    return res.status(404).json({ error: 'Loan application not found' });
  }

  application.status = status;
  let createdLoan = null;
  let createdSchedule = null;
  let createdNotification = null;

  if (status === 'Approved') {
    const loanId = `LOAN-${Math.floor(510 + Math.random() * 90)}`;
    const emiAmount = Math.round(application.amount / application.tenureMonths + (application.amount * (application.interestRate / 100) / 12));

    createdLoan = {
      id: loanId,
      customerName: application.customerName,
      category: application.category,
      principalAmount: application.amount,
      outstandingAmount: application.amount,
      interestRate: application.interestRate,
      emiAmount,
      status: 'Active',
      disbursedDate: new Date().toISOString().split('T')[0]
    };
    loans.unshift(createdLoan);

    createdSchedule = {
      id: `SCH-${Math.floor(810 + Math.random() * 90)}`,
      customerName: application.customerName,
      loanId,
      emiNumber: 1,
      totalEmis: application.tenureMonths,
      amount: emiAmount,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'Upcoming'
    };
    emiSchedules.unshift(createdSchedule);

    const customerIndex = customers.findIndex((c) => c.name === application.customerName);
    if (customerIndex !== -1) {
      customers[customerIndex] = {
        ...customers[customerIndex],
        activeLoansCount: customers[customerIndex].activeLoansCount + 1,
        totalLoanAmount: customers[customerIndex].totalLoanAmount + application.amount
      };
    }

    createdNotification = {
      id: `NOTIF-${Math.floor(10 + Math.random() * 89)}`,
      title: 'Direct Credit Disbursed',
      message: `Consolidated ₹${application.amount.toLocaleString('en-IN')} approved and transmitted for ${application.customerName}.`,
      category: 'Credit',
      read: false,
      date: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].slice(0, 5)
    };
    notifications.unshift(createdNotification);
  }

  res.json({ application, loan: createdLoan, schedule: createdSchedule, notification: createdNotification });
});

app.post('/api/emi-schedules/:id/pay', (req, res) => {
  const id = req.params.id;
  const emi = emiSchedules.find((item) => item.id === id);
  if (!emi) {
    return res.status(404).json({ error: 'EMI schedule not found' });
  }

  emi.status = 'Paid';
  const newPayment = {
    id: `PAY-${Math.floor(7710 + Math.random() * 80)}`,
    customerName: emi.customerName,
    amount: emi.amount,
    method: 'ACH Auto-debit' as const,
    status: 'Successful' as const,
    date: new Date().toISOString().split('T')[0],
    referenceId: `TXN-ACH-${Math.floor(1000 + Math.random() * 8999)}`
  };
  payments.unshift(newPayment);

  loans = loans.map((loan) => {
    if (loan.id === emi.loanId) {
      const updatedOutstanding = Math.max(0, loan.outstandingAmount - emi.amount);
      return {
        ...loan,
        outstandingAmount: updatedOutstanding,
        status: updatedOutstanding === 0 ? 'Closed' : loan.status
      };
    }
    return loan;
  });

  collections = collections.map((collection) => {
    if (collection.customerName === emi.customerName && collection.status === 'Overdue') {
      return {
        ...collection,
        amountCollected: collection.amountCollected + emi.amount,
        status: 'Collected'
      };
    }
    return collection;
  });

  const newNotification = {
    id: `NOTIF-${Math.floor(10 + Math.random() * 89)}`,
    title: 'ACH Clearance Success',
    message: `Auto-debit clearing code matched successful for receipt from ${emi.customerName} (₹${emi.amount.toLocaleString('en-IN')}).`,
    category: 'Payments' as const,
    read: false,
    date: new Date().toISOString().split('T')[0] + ' ' + new Date().toTimeString().split(' ')[0].slice(0, 5)
  };
  notifications.unshift(newNotification);

  res.json({ emi, payment: newPayment, notification: newNotification });
});

app.post('/api/payments', (req, res) => {
  const payment = req.body;
  if (!payment?.id) {
    return res.status(400).json({ error: 'Payment id is required' });
  }
  payments.unshift(payment);

  loans = loans.map((loan) => {
    if (loan.customerName === payment.customerName && loan.status === 'Active') {
      const updatedOutstanding = Math.max(0, loan.outstandingAmount - payment.amount);
      return {
        ...loan,
        outstandingAmount: updatedOutstanding,
        status: updatedOutstanding === 0 ? 'Closed' : loan.status
      };
    }
    return loan;
  });

  res.status(201).json(payment);
});

app.post('/api/collections', (req, res) => {
  const collection = req.body;
  if (!collection?.id) {
    return res.status(400).json({ error: 'Collection id is required' });
  }
  collections.unshift(collection);
  res.status(201).json(collection);
});

// Streamed chat proxy (returns chunked plain text)
app.post('/api/gemini/stream-chat', async (req, res) => {
  try {
    const { message, history, context } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    const ai = getGeminiClient();
    const chatSession = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: { systemInstruction: SYSTEM_INSTRUCTION, temperature: 0.7 },
      history: history || []
    });

    const safeContext = redactPIIContext(context);
    const fullMessage = safeContext ? `Portfolio snapshot:\n${JSON.stringify(safeContext)}\n\n${message}` : message;

    // Request full response from AI (client may support streaming, but we fallback to full then stream)
    const aiResponse = await chatSession.sendMessage({ message: fullMessage });
    const text = aiResponse?.text || '';

    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache');
    res.flushHeaders && res.flushHeaders();

    // Stream in small chunks to the client
    const chunkSize = 120;
    for (let i = 0; i < text.length; i += chunkSize) {
      const chunk = text.slice(i, i + chunkSize);
      res.write(chunk);
      // small delay gives the client a progressive feel
      await new Promise((r) => setTimeout(r, 30));
    }
    res.end();
  } catch (err: any) {
    console.error('Stream chat error:', err);
    res.status(500).json({ error: err.message || 'Stream failed' });
  }
});

// Setup Vite Dev Server / Static Asset Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // Support React Router client-side fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[FinTrack AI Server] running on http://0.0.0.0:${PORT} in ${process.env.NODE_ENV || "development"} mode`);
  });
}

startServer();
