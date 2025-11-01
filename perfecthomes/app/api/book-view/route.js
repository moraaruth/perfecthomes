import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.json()
    console.log('Request data:', data)
    console.log('EmailJS env vars:', {
      service_id: !!process.env.EMAILJS_SERVICE_ID,
      template_id: !!process.env.EMAILJS_TEMPLATE_ID,
      public_key: !!process.env.EMAILJS_PUBLIC_KEY
    })
    
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
    console.log('Sending email data:', emailData)

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailData)
    })

    console.log('EmailJS response status:', response.status)
    const responseText = await response.text()
    console.log('EmailJS response:', responseText)

    if (response.ok) {
      return NextResponse.json({ 
        message: 'Booking request sent successfully'
      })
    } else {
      throw new Error(`EmailJS failed: ${response.status} - ${responseText}`)
    }
    
  } catch (error) {
    console.error('Email error:', error.message)
    return NextResponse.json(
      { error: 'Failed to send booking request' },
      { status: 500 }
    )
  }
}