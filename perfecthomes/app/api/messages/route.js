// export const dynamic = 'force-dynamic';

// // GET /api/messages
// export const GET = async (request) => {
//   try {
//     return new Response(JSON.stringify([]), { status: 200 });
//   } catch (error) {
//     console.error('GET /api/messages error:', error);
//     return new Response(JSON.stringify({ error: 'Something went wrong' }), { 
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// };

// // POST /api/messages
// export const POST = async (request) => {
//   try {
//     const body = await request.json();
    
//     const emailData = {
//       service_id: process.env.EMAILJS_SERVICE_ID,
//       template_id: process.env.EMAILJS_TEMPLATE_ID,
//       user_id: process.env.EMAILJS_PUBLIC_KEY,
//       template_params: {
//         to_email: 'phomeskenya@gmail.com',
//         from_name: body.name,
//         from_email: body.email,
//         phone: body.phone,
//         message: body.message,
//         subject: 'New Property Message - Perfect Homes'
//       }
//     }

//     const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${process.env.EMAILJS_PRIVATE_KEY}`
//       },
//       body: JSON.stringify({
//         service_id: process.env.EMAILJS_SERVICE_ID,
//         template_id: process.env.EMAILJS_TEMPLATE_ID,
//         user_id: process.env.EMAILJS_PUBLIC_KEY,
//         accessToken: process.env.EMAILJS_PRIVATE_KEY,
//         template_params: emailData.template_params
//       })
//     })

//     if (response.ok) {
//       return new Response(JSON.stringify({ message: 'Message sent' }), { status: 200 });
//     } else {
//       throw new Error('EmailJS failed')
//     }
//   } catch (error) {
//     console.error('POST /api/messages error:', error);
//     return new Response(JSON.stringify({ error: 'Something went wrong' }), { 
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// };
