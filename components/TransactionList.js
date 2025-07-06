'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TransactionList({ transactions, onDelete, loading }) {
  
  const handleDelete = async (id) => {
    if (confirm('Delete this transaction?')) {
      try {
        const response = await fetch(`/api/transactions?id=${id}`, {
          method: 'DELETE',
        })
        
        if (response.ok) {
          onDelete() // Refresh the list
        } else {
          alert('Failed to delete')
        }
      } catch (error) {
        alert('Error deleting transaction')
      }
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Loading...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Transactions ({transactions.length})</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <p>No transactions yet. Add one above!</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction._id} className="border p-3 rounded flex justify-between items-center">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">${transaction.amount}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDelete(transaction._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
