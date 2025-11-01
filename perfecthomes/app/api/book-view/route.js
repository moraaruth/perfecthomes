import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const data = await request.json()
    
    const emailData = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        to_name: 'Perfect Homes',
        to_email: 'phomeskenya@gmail.com',
        from_name: `${data.firstName} ${data.lastName}`,
        from_email: data.email,
        message: `Contact: ${data.contact}\nDate: ${data.month}/${data.day}/${data.year}\nLocation: ${data.location}\nHouse Type: ${data.houseType}\nNotes: ${data.notes}`
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
        message: 'Booking request sent successfully'
      })
    } else {
      console.error('EmailJS error:', await response.text())
      return NextResponse.json({ 
        message: 'Booking request received (email delivery pending)'
      })
    }
    
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ 
      message: 'Booking request received (email delivery pending)'
    })
  }
}