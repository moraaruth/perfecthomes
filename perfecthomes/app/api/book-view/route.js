// import { NextResponse } from 'next/server'

// export async function POST(request) {
//   try {
//     const data = await request.json()
//     console.log('Booking request received:', data)
    
//     return NextResponse.json({ 
//       message: 'Booking request received successfully',
//       emailData: {
//         serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
//         templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
//         publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
//       }
//     })
    
//   } catch (error) {
//     console.error('Error processing booking request:', error)
//     return NextResponse.json(
//       { error: 'Failed to process booking request' },
//       { status: 500 }
//     )
//   }
// }