// Mock data for BudgetBuddy prototype

const BUDGET_DATA = {
  monthlyIncome: 4200,
  totalBudget: 3500,
  totalSpent: 2253,
  remaining: 1247,
  daysLeft: 8,
  month: 'May',
  categories: [
    { name: 'Housing', letter: 'H', allocated: 1200, spent: 1200, color: '#B5A3DB' },
    { name: 'Food & Dining', letter: 'F', allocated: 500, spent: 412, color: '#E8A882' },
    { name: 'Shopping', letter: 'S', allocated: 250, spent: 189, color: '#6DCAA8' },
    { name: 'Transport', letter: 'T', allocated: 250, spent: 185, color: '#7EB8E0' },
    { name: 'Entertainment', letter: 'E', allocated: 200, spent: 156, color: '#E0899E' },
    { name: 'Utilities', letter: 'U', allocated: 150, spent: 111, color: '#C8E450' },
  ],
};

const GOALS_DATA = [
  {
    id: 1, name: 'Cancún Vacation', letter: 'C',
    target: 3000, saved: 2040, monthlyContrib: 320,
    projectedDate: 'Jul 15, 2026', color: '#C8E450',
    aiTip: 'Boost by $50/mo to hit this 2 weeks earlier!',
  },
  {
    id: 2, name: 'Emergency Fund', letter: 'E',
    target: 10000, saved: 4500, monthlyContrib: 200,
    projectedDate: 'Mar 2027', color: '#B5A3DB',
    aiTip: 'You\'re ahead of schedule — consider $250/mo.',
  },
  {
    id: 3, name: 'New MacBook', letter: 'M',
    target: 2000, saved: 800, monthlyContrib: 150,
    projectedDate: 'Oct 2026', color: '#7EB8E0',
    aiTip: 'Skip 2 dining-out meals/mo to reach this 3 weeks sooner.',
  },
];

const DEBTS_DATA = [
  {
    id: 1, name: 'Credit Card', letter: 'C',
    originalBalance: 5000, currentBalance: 2840,
    apr: 22.9, minPayment: 85, recommendedPayment: 200,
    color: '#E0899E', priority: 1,
  },
  {
    id: 2, name: 'Car Loan', letter: 'A',
    originalBalance: 15000, currentBalance: 8200,
    apr: 4.8, minPayment: 320, recommendedPayment: 320,
    color: '#7EB8E0', priority: 2,
  },
  {
    id: 3, name: 'Student Loan', letter: 'S',
    originalBalance: 32000, currentBalance: 18450,
    apr: 5.2, minPayment: 285, recommendedPayment: 285,
    color: '#B5A3DB', priority: 3,
  },
];

const CHAT_MESSAGES = [
  {
    id: 1, type: 'ai', time: '9:15 AM',
    text: 'Good morning! You have $1,247 left in your May budget with 8 days to go — that\'s 36% remaining with 26% of the month left. Nice work!',
  },
  {
    id: 2, type: 'ai', time: '9:16 AM',
    text: 'Your electricity bill of $142 is due in 3 days.',
    isAlert: true,
    actions: ['Set reminder', 'Already paid'],
  },
  {
    id: 3, type: 'ai', time: '9:17 AM',
    text: 'I spotted a charge from "TRVL*BOOKING" for $89.50 yesterday. How should I categorize it?',
    isCategory: true,
    categories: ['Travel', 'Entertainment', 'Shopping', 'Other'],
  },
  {
    id: 4, type: 'user', time: '9:18 AM',
    text: 'That\'s travel — it\'s for my Cancún trip!',
  },
  {
    id: 5, type: 'ai', time: '9:18 AM',
    text: 'Tagged under Travel! Your Cancún goal is at 68% ($2,040 / $3,000). At your current pace, you\'ll hit it by July 15.',
    goalPreview: { name: 'Cancún Vacation', progress: 68, saved: 2040, target: 3000, color: '#C8E450' },
    actions: ['Show my goal', 'Adjust savings'],
  },
];

const AI_RESPONSES = [
  "You're averaging $53/day this month. To stay on budget, aim for $45/day for the remaining 8 days. You've got this!",
  "Your biggest savings opportunity is Food & Dining — averaging $14 per meal out. Cooking 2 more days/week could save ~$112/month.",
  "Your emergency fund is at $4,500 — about 1.3 months of expenses. Experts recommend 3-6 months. Keep going!",
  "I'd recommend the avalanche method for your debts. Focus on your credit card (22.9% APR) first — it could save $3,240 in interest.",
  "This month: Food $412 (82% of budget), Shopping $189 (76%), Entertainment $156 (78%). Want a detailed breakdown?",
];

const ACCENT_THEMES = {
  Lime: { primary: '#C8E450', soft: '#EEF1C4', bg: '#F8F9E8', onPrimary: '#3A4A0A' },
  Lavender: { primary: '#B5A3DB', soft: '#DDD5F0', bg: '#EEEAF5', onPrimary: '#2A1A4A' },
  Mint: { primary: '#6DCAA8', soft: '#C0E8D8', bg: '#E5F5EE', onPrimary: '#0A3A2A' },
  Coral: { primary: '#E8A882', soft: '#F0D4C0', bg: '#F8EDE5', onPrimary: '#4A2A0A' },
};

Object.assign(window, { BUDGET_DATA, GOALS_DATA, DEBTS_DATA, CHAT_MESSAGES, AI_RESPONSES, ACCENT_THEMES });
