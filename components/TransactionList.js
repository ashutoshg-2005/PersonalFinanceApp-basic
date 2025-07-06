'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function TransactionList({ transactions, onDelete, loading }) {
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [editForm, setEditForm] = useState({
    amount: '',
    description: '',
    date: '',
    category: ''
  })

  const categories = [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Other'
  ]
  
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

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setEditForm({
      amount: transaction.amount,
      description: transaction.description,
      date: new Date(transaction.date).toISOString().split('T')[0],
      category: transaction.category || ''
    })
  }

  const handleUpdate = async () => {
    if (!editForm.amount || !editForm.description || !editForm.date || !editForm.category) {
      alert('Please fill all fields')
      return
    }

    try {
      const response = await fetch('/api/transactions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingTransaction._id,
          ...editForm
        }),
      })

      if (response.ok) {
        setEditingTransaction(null)
        onDelete() // Refresh the list
        alert('Transaction updated!')
      } else {
        alert('Failed to update transaction')
      }
    } catch (error) {
      alert('Error updating transaction')
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
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category || 'No Category'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      {new Date(transaction.date).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">₹{transaction.amount}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEdit(transaction)}
                  >
                    Edit
                  </Button>
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

      {/* Edit Dialog */}
      <Dialog open={!!editingTransaction} onOpenChange={() => setEditingTransaction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Transaction</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Amount (₹)</Label>
              <Input
                type="number"
                value={editForm.amount}
                onChange={(e) => setEditForm(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="Enter amount"
              />
            </div>
            
            <div>
              <Label>Description</Label>
              <Input
                type="text"
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="What did you spend on?"
              />
            </div>
            
            <div>
              <Label>Category</Label>
              <Select value={editForm.category} onValueChange={(value) => setEditForm(prev => ({ ...prev, category: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={editForm.date}
                onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleUpdate}>Update Transaction</Button>
              <Button variant="outline" onClick={() => setEditingTransaction(null)}>Cancel</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
