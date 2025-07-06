import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

// Get all transactions
export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db('personalfin')
    const transactions = await db.collection('transactions').find({}).sort({ date: -1 }).toArray()
    
    return Response.json(transactions)
  } catch (error) {
    console.error('GET /api/transactions error:', error)
    return Response.json({ error: 'Something went wrong', details: error.message }, { status: 500 })
  }
}

// Add new transaction
export async function POST(request) {
  try {
    const { amount, description, date } = await request.json()
    
    // Check if all fields are filled
    if (!amount || !description || !date) {
      return Response.json({ error: 'Please fill all fields' }, { status: 400 })
    }
    
    const client = await clientPromise
    const db = client.db('personalfin')
    
    // Save to database
    const newTransaction = {
      amount: Number(amount),
      description,
      date: new Date(date),
      createdAt: new Date()
    }
    
    await db.collection('transactions').insertOne(newTransaction)
    
    return Response.json({ message: 'Transaction added!' })
  } catch (error) {
    console.error('POST /api/transactions error:', error)
    return Response.json({ error: 'Could not save transaction', details: error.message }, { status: 500 })
  }
}

// Delete transaction
export async function DELETE(request) {
  try {
    const url = new URL(request.url)
    const id = url.searchParams.get('id')
    
    if (!id) {
      return Response.json({ error: 'No ID provided' }, { status: 400 })
    }
    
    const client = await clientPromise
    const db = client.db('personalfin')
    
    await db.collection('transactions').deleteOne({ _id: new ObjectId(id) })
    
    return Response.json({ message: 'Deleted!' })
  } catch (error) {
    console.error('DELETE /api/transactions error:', error)
    return Response.json({ error: 'Could not delete', details: error.message }, { status: 500 })
  }
}
