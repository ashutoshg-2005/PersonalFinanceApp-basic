'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

export default function CategoryChart({ transactions }) {
  // Calculate category totals
  const categoryTotals = {}
  
  transactions.forEach(transaction => {
    const category = transaction.category || 'No Category'
    categoryTotals[category] = (categoryTotals[category] || 0) + transaction.amount
  })

  const categories = Object.keys(categoryTotals)
  const total = Object.values(categoryTotals).reduce((sum, amount) => sum + amount, 0)

  // Simple colors for categories
  const colors = [
    '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0',
    '#9966FF', '#FF9F40', '#FF6B6B', '#4ECDC4'
  ]

  // Prepare data for pie chart
  const chartData = categories.map((category, index) => ({
    name: category,
    value: categoryTotals[category],
    color: colors[index % colors.length]
  }))

  if (categories.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No transactions to show</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Pie Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category List */}
          <div className="space-y-3">
            {categories.map((category, index) => {
              const amount = categoryTotals[category]
              const percentage = ((amount / total) * 100).toFixed(1)
              
              return (
                <div key={category} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    ></div>
                    <span className="text-sm">{category}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{amount}</p>
                    <p className="text-xs text-gray-500">{percentage}%</p>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
