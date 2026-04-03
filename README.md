# FinDash — Financial Dashboard

A modern, production-grade financial dashboard built with React, TypeScript, and Recharts. Track income, expenses, and get intelligent insights into your spending habits.

[FinDash Preview](https://findash-2kcihmcno-labhanshi-bhatias-projects.vercel.app/)

---

## Features

### Dashboard Overview
- **Summary cards** — Total Balance, Income, and Expenses with savings rate
- **Balance trend chart** — Area chart showing income, expenses, and net balance over 6 months
- **Category breakdown** — Donut chart of spending by category
- **Recent transactions** — Quick glance at the latest 5 entries
- **Export buttons** — Download all data as CSV or JSON

### Transactions
- Full transaction table with date, description, category, type, and amount
- **Search** — Filter by description or category text
- **Filter** — By type (income/expense) and category
- **Sorting** — By date or amount, ascending or descending
- **Add/Edit/Delete** — Full CRUD for Admin role
- **Export filtered results** — CSV or JSON

### Role-Based Access
- **Admin** — Full read/write access; can add, edit, and delete transactions
- **Viewer** — Read-only access; all mutating actions are hidden
- Role switcher in the top bar; current role shown in the sidebar

### Insights
- Highest spending category
- Month-over-month expense and income comparison
- Average monthly expense
- Best savings month
- Largest single expense
- Horizontal category bar chart for visual breakdown
- Monthly income vs expenses bar chart

### UX Extras
- **Dark / Light mode toggle** — Persistent via localStorage
- **LocalStorage persistence** — Transactions and role survive page refresh
- **Responsive design** — Works on mobile, tablet, and desktop
- **Smooth animations** — Modal slide-in, card hover lifts, bar chart transitions
- **Empty states** — Graceful handling when filters return no results

---

## Tech Decisions

| Choice | Reason |
|---|---|
| **React + TypeScript** | Type safety across components, props, and state |
| **React Context + useReducer** | Lightweight global state without extra dependencies |
| **Recharts** | Composable, SVG-based charts with good TypeScript support |
| **CSS Custom Properties** | Theme switching (dark/light) with zero runtime overhead |
| **Vite** | Fast HMR and build times |
| **DM Serif Display + DM Mono + Outfit** | Distinctive font trio: editorial serif for headings, mono for numbers, sans for body |

---

## Project Structure

```
findash/
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   ├── BalanceChart.tsx     # Area chart — balance trend
│   │   │   └── CategoryChart.tsx    # Donut chart — expenses by category
│   │   ├── insights/
│   │   │   └── Insights.tsx         # Insight cards + comparison charts
│   │   ├── layout/
│   │   │   ├── Dashboard.tsx        # Main dashboard page
│   │   │   ├── Header.tsx           # Topbar with role switcher + dark mode
│   │   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   │   └── TransactionsPage.tsx # Transactions page wrapper
│   │   ├── transactions/
│   │   │   ├── TransactionFilters.tsx  # Search, filter, sort controls
│   │   │   ├── TransactionList.tsx     # Table + add/edit/delete
│   │   │   └── TransactionModal.tsx    # Add / edit modal form
│   │   └── ui/
│   │       └── SummaryCards.tsx     # Balance / Income / Expense cards
│   ├── context/
│   │   └── AppContext.tsx           # Global state (Context + useReducer)
│   ├── data/
│   │   └── mockData.ts              # 60+ sample transactions + category colors
│   ├── types/
│   │   └── index.ts                 # All shared TypeScript types
│   ├── utils/
│   │   └── index.ts                 # Formatting, filtering, compute helpers
│   ├── App.tsx
│   ├── main.tsx
│   └── styles.css                   # Global CSS with custom properties
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Install & Run

```bash
# Clone or unzip the project
cd findash

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## Mock Data

The app ships with **60+ transactions** spanning 6 months (Jan–Jun 2024) across 13 categories including Salary, Freelance, Investment, Food & Dining, Housing, Transport, Entertainment, Healthcare, Shopping, Utilities, Education, Travel, and Other.

To reset to mock data, clear `localStorage` in your browser's DevTools.

---

## Customization

- **Add categories**: Edit `CATEGORIES` array in `src/data/mockData.ts`
- **Change colors**: Update `CATEGORY_COLORS` map and CSS variables in `styles.css`
- **Add a new tab**: Add to `NAV_ITEMS` in `Sidebar.tsx`, handle in `App.tsx`
- **Connect a real API**: Replace mock data in `AppContext.tsx` initial state with an API fetch on mount
