'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function BudgetTracker({ transactions }) {
  // Simple budget storage (in real app, this would be in database)
  const [budgets, setBudgets] = useState({
    'Food & Dining': 5000,
    'Transportation': 3000,
    'Shopping': 4000,
    'Entertainment': 2000,
    'Bills & Utilities': 8000,
    'Healthcare': 3000,
    'Education': 2000,
    'Travel': 5000,
    'Other': 2000
  })
  
  const [editingCategory, setEditingCategory] = useState(null)
  const [newCategoryName, setNewCategoryName] = useState('')
  const [newBudgetAmount, setNewBudgetAmount] = useState('')

  // Calculate spending by category for current month
  const currentMonth = new Date().getMonth()
  const currentYear = new Date().getFullYear()
  
  const monthlySpending = {}
  transactions.forEach(transaction => {
    const transactionDate = new Date(transaction.date)
    if (transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear) {
      const category = transaction.category || 'Other'
      monthlySpending[category] = (monthlySpending[category] || 0) + transaction.amount
    }
  })

  const updateBudget = (category, amount) => {
    setBudgets(prev => ({
      ...prev,
      [category]: Number(amount)
    }))
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setNewCategoryName(category)
    setNewBudgetAmount(budgets[category])
  }

  const handleUpdateCategory = () => {
    if (!newCategoryName || !newBudgetAmount) {
      alert('Please fill all fields')
      return
    }

    const newBudgets = { ...budgets }
    delete newBudgets[editingCategory]
    newBudgets[newCategoryName] = Number(newBudgetAmount)
    
    setBudgets(newBudgets)
    setEditingCategory(null)
    setNewCategoryName('')
    setNewBudgetAmount('')
  }

  const addNewCategory = () => {
    const categoryName = prompt('Enter new category name:')
    const budgetAmount = prompt('Enter budget amount:')
    
    if (categoryName && budgetAmount && !budgets[categoryName]) {
      setBudgets(prev => ({
        ...prev,
        [categoryName]: Number(budgetAmount)
      }))
    }
  }

  const categories = Object.keys(budgets)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Monthly Budget vs Actual</CardTitle>
          <Button onClick={addNewCategory} size="sm">
            Add Category
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map(category => {
              const budgetAmount = budgets[category]
              const spentAmount = monthlySpending[category] || 0
              const percentage = budgetAmount > 0 ? (spentAmount / budgetAmount) * 100 : 0
              const isOverBudget = percentage > 100
              
              return (
                <div key={category} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{category}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleEditCategory(category)}
                        className="h-6 w-6 p-0"
                      >
                        ✏️
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={isOverBudget ? "destructive" : "secondary"}>
                        ₹{spentAmount} / ₹{budgetAmount}
                      </Badge>
                      <Input
                        type="number"
                        placeholder="Budget"
                        value={budgets[category]}
                        onChange={(e) => updateBudget(category, e.target.value)}
                        className="w-24 h-8"
                      />
                    </div>
                  </div>
                  <Progress 
                    value={Math.min(percentage, 100)} 
                    className={`w-full ${isOverBudget ? 'bg-red-100' : ''}`}
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{percentage.toFixed(1)}% used</span>
                    <span>₹{Math.max(0, budgetAmount - spentAmount)} remaining</span>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Category Dialog */}
      <Dialog open={!!editingCategory} onOpenChange={() => setEditingCategory(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Budget Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Category Name</Label>
              <Input
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name"
              />
            </div>
            
            <div>
              <Label>Budget Amount (₹)</Label>
              <Input
                type="number"
                value={newBudgetAmount}
                onChange={(e) => setNewBudgetAmount(e.target.value)}
                placeholder="Enter budget amount"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleUpdateCategory}>Update Category</Button>
              <Button variant="outline" onClick={() => setEditingCategory(null)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Simple Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(() => {
              const overBudgetCategories = categories.filter(cat => 
                (monthlySpending[cat] || 0) > budgets[cat]
              )
              const totalBudget = Object.values(budgets).reduce((sum, amount) => sum + amount, 0)
              const totalSpent = Object.values(monthlySpending).reduce((sum, amount) => sum + amount, 0)
              
              return (
                <>
                  <div className="flex justify-between">
                    <span>Total Budget:</span>
                    <span className="font-bold">₹{totalBudget}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Spent:</span>
                    <span className="font-bold">₹{totalSpent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Remaining:</span>
                    <span className={`font-bold ${totalSpent > totalBudget ? 'text-red-600' : 'text-green-600'}`}>
                      ₹{totalBudget - totalSpent}
                    </span>
                  </div>
                  
                  {overBudgetCategories.length > 0 && (
                    <div className="mt-4 p-3 bg-red-50 rounded">
                      <p className="text-sm font-medium text-red-800">⚠️ Over Budget Categories:</p>
                      <p className="text-sm text-red-600">
                        {overBudgetCategories.join(', ')}
                      </p>
                    </div>
                  )}
                  
                  {totalSpent < totalBudget * 0.8 && (
                    <div className="mt-4 p-3 bg-green-50 rounded">
                      <p className="text-sm text-green-800">🎉 Great job! You&apos;re staying within budget!</p>
                    </div>
                  )}
                </>
              )
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
