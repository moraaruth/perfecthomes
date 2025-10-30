import { NextResponse } from 'next/server'
const nodemailer = require('nodemailer')

export async function POST(request) {
  try {
    const data = await request.json()
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'phomeskenya@gmail.com',
      subject: 'New Contact Form Submission - Perfect Homes',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Comments:</strong></p>
        <p>${data.comments}</p>
      `
    })
    
    return NextResponse.json({ 
      message: 'Contact form submitted successfully'
    })
    
  } catch (error) {
    console.error('Error processing contact form:', error)
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    )
  }
}