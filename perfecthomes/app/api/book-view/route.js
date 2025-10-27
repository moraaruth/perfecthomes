import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.json()
    
    // Log the booking request (you can save to database here)
    console.log('New booking request:', data)
    
    return NextResponse.json({ 
      message: 'Booking request received successfully'
    })
    
  } catch (error) {
    console.error('Error processing booking request:', error)
    return NextResponse.json(
      { error: 'Failed to process booking request' },
      { status: 500 }
    )
  }
}