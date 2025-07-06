'use client'

import { useState, useEffect } from 'react'
import TransactionForm from '@/components/TransactionForm'
import TransactionList from '@/components/TransactionList'
import CategoryChart from '@/components/CategoryChart'
import Dashboard from '@/components/Dashboard'
import BudgetTracker from '@/components/BudgetTracker'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

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

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="budget">Budget</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <Dashboard transactions={transactions} />
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <TransactionForm onTransactionAdded={handleNewTransaction} />
              <TransactionList transactions={transactions} onDelete={handleDelete} />
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategoryChart transactions={transactions} />
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <BudgetTracker transactions={transactions} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
