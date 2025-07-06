# Personal Finance Tracker

A simple web app to track your money, manage budgets, and see where your money goes!

## What it does

### 📊 **Stage 1: Basic Tracking**

- ✅ Add new transactions (amount, description, date, category)
- ✅ View all your transactions with categories
- ✅ Edit transactions you want to change
- ✅ Delete transactions you don't need
- ✅ Shows newest transactions first

### 📈 **Stage 2: Categories & Dashboard**

- ✅ Predefined categories for transactions
- ✅ Beautiful pie chart showing category breakdown
- ✅ Dashboard with summary cards (total expenses, top category, recent transactions)
- ✅ Category-wise spending analysis

### 💰 **Stage 3: Budgeting & Insights**

- ✅ Set monthly budgets for each category
- ✅ Budget vs actual spending comparison with progress bars
- ✅ Edit budget category names and amounts
- ✅ Smart spending insights and alerts
- ✅ Over-budget warnings and success celebrations

## How to run it

1. Install stuff:

```bash
npm install
```

2. Start the app:

```bash
npm run dev
```

3. Open your browser and go to: http://localhost:3000

## What you need

- Node.js installed on your computer
- MongoDB database (for storing transactions)

## Libraries used

- **Next.js** - React framework for the app
- **MongoDB** - Database for storing transactions
- **shadcn/ui** - Beautiful UI components
- **Recharts** - For pie charts and visualizations
- **Tailwind CSS** - For styling

## Files that matter

- `app/page.js` - The main page with tabs (Dashboard, Transactions, Categories, Budget)
- `app/api/transactions/route.js` - Handles saving/getting/editing/deleting transactions
- `components/Dashboard.js` - Summary cards and recent transactions
- `components/TransactionForm.js` - Form to add new transactions
- `components/TransactionList.js` - List of transactions with edit/delete buttons
- `components/CategoryChart.js` - Pie chart showing spending by category
- `components/BudgetTracker.js` - Budget management and insights
- `components/ui/` - shadcn/ui components (buttons, cards, inputs, etc.)

## How it works

- Built with Next.js (a React framework)
- Uses MongoDB to store your transactions and budgets
- API handles GET, POST, PATCH, and DELETE requests
- Real-time budget tracking and spending insights
- Responsive design that works on mobile and desktop
- Clean, beginner-friendly code structure

## Features in detail

### 🎯 **Dashboard Tab**

- Total expenses summary
- Top spending category
- Recent transactions with category badges
- Quick overview of your finances

### 💳 **Transactions Tab**

- Add new transactions with category dropdown
- Edit existing transactions (amount, description, date, category)
- Delete transactions you don't need
- Clean list view with category badges

### 📊 **Categories Tab**

- Interactive pie chart showing spending breakdown
- Percentage calculations for each category
- Color-coded categories for easy identification
- Both visual chart and detailed list view

### 💰 **Budget Tab**

- Set monthly budgets for each category
- Visual progress bars showing spending vs budget
- Edit category names and budget amounts
- Add custom categories
- Smart insights (over-budget warnings, success messages)
- Real-time calculations of remaining budget
