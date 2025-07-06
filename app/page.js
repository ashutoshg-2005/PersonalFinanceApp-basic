'use client'

import { useState, useEffect } from 'react'
import TransactionForm from '@/components/TransactionForm'
import TransactionList from '@/components/TransactionList'
import MonthlyChart from '@/components/MonthlyChart'

export default function Home() {
  const [transactions, setTransactions] = useState([])

  const getTransactions = async () => {
    try {
      const response = await fetch('/api/transactions')
      if (response.ok) {
        const data = await response.json()
        setTransactions(data)
      }
    } catch (error) {
      console.log('Error:', error)
    }
  }

  useEffect(() => {
    getTransactions()
  }, [])

  const handleNewTransaction = () => {
    getTransactions()
  }

  const handleDelete = () => {
    getTransactions()
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="text-center py-6">
          <h1 className="text-3xl font-bold text-gray-900">Personal Finance Tracker</h1>
          <p className="text-gray-600 mt-2">Track your expenses and manage your budget</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TransactionForm 
              onTransactionAdded={handleNewTransaction}
            />
            
            <TransactionList 
              transactions={transactions}
              onDelete={handleDelete}
            />
          </div>
          
          <div>
            <MonthlyChart transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  )
}
