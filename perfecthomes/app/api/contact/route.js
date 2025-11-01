import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.json()
    
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        to_email: 'phomeskenya@gmail.com',
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        comments: data.comments,
        subject: 'New Contact Form Submission - Perfect Homes'
      }
    }

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EMAILJS_PRIVATE_KEY}`
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: emailData.template_params
      })
    })

    if (response.ok) {
      return NextResponse.json({ 
        message: 'Contact form submitted successfully'
      })
    } else {
      throw new Error('EmailJS failed')
    }
    
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}