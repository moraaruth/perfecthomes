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
    console.log('Message received:', body);
    
    return new Response(JSON.stringify({ message: 'Message received' }), { status: 200 });
  } catch (error) {
    console.error('POST /api/messages error:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
