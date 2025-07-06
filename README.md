# Personal Finance Tracker

A simple web app to track your money - add transactions and see where your money goes!

## What it does

- ✅ Add new transactions (amount, description, date)
- ✅ View all your transactions
- ✅ Delete transactions you don't need
- ✅ Shows newest transactions first

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

## Files that matter

- `app/page.js` - The main page you see
- `app/api/transactions/route.js` - Handles saving/getting/deleting transactions
- `components/` - Reusable parts like forms and lists

## How it works

- Built with Next.js (a React framework)
- Uses MongoDB to store your transactions
- Simple API that handles GET, POST, and DELETE requests
