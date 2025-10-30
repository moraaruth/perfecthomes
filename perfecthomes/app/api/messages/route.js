const nodemailer = require('nodemailer');

export const dynamic = 'force-dynamic';

// GET /api/messages
export const GET = async (request) => {
  try {
    return new Response(JSON.stringify([]), { status: 200 });
  } catch (error) {
    console.error('GET /api/messages error:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST /api/messages
export const POST = async (request) => {
  try {
    const body = await request.json();
    
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: 'phomeskenya@gmail.com',
      subject: 'New Property Message - Perfect Homes',
      html: `
        <h2>New Property Message</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Phone:</strong> ${body.phone}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message}</p>
      `
    });
    
    return new Response(JSON.stringify({ message: 'Message sent' }), { status: 200 });
  } catch (error) {
    console.error('POST /api/messages error:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
