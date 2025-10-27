import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

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
      to: 'mnjosiah@gmail.com',
      subject: 'New Property Viewing Request - Perfect Homes',
      html: `
        <h2>New Property Viewing Request</h2>
        <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Contact:</strong> ${data.contact}</p>
        <p><strong>Preferred Date:</strong> ${data.month}/${data.day}/${data.year}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>House Type:</strong> ${data.houseType}</p>
        <p><strong>Notes:</strong> ${data.notes}</p>
      `
    })
    
    return NextResponse.json({ 
      message: 'Booking request sent successfully'
    })
    
  } catch (error) {
    console.error('Error processing booking request:', error)
    return NextResponse.json(
      { error: 'Failed to process booking request' },
      { status: 500 }
    )
  }
}