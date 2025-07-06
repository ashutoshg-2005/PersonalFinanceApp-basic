'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MonthlyChart({ transactions }) {
  // Simple function to group transactions by month
  const getMonthlyData = () => {
    const months = {}
    
    // Go through each transaction
    transactions.forEach(transaction => {
      const date = new Date(transaction.date)
      const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      
      // Add to monthly total
      if (months[monthName]) {
        months[monthName] += parseFloat(transaction.amount)
      } else {
        months[monthName] = parseFloat(transaction.amount)
      }
    })
    
    // Convert to array for chart
    return Object.keys(months).map(month => ({
      month: month,
      total: months[month]
    }))
  }

  const chartData = getMonthlyData()

  if (chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Monthly Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No data yet. Add some transactions!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="total" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
