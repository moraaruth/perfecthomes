import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.json()
    
    // Send email using fetch to EmailJS service
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        to_email: 'phomeskenya@gmail.com',
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        contact: data.contact,
        date: `${data.month}/${data.day}/${data.year}`,
        location: data.location,
        house_type: data.houseType,
        notes: data.notes,
        subject: 'New Property Viewing Request - Perfect Homes'
      }
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    if (response.ok) {
      return NextResponse.json({ 
        message: 'Booking request sent successfully'
      })
    } else {
      throw new Error('EmailJS failed')
    }
    
  } catch (error) {
    console.error('Email error:', error.message)
    return NextResponse.json(
      { error: 'Failed to send booking request' },
      { status: 500 }
    )
  }
}