import connectDB from '@/config/database';
import Message from '@/models/Message';

export const dynamic = 'force-dynamic';

// GET /api/messages?recipient=...
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const recipientId = searchParams.get('recipient');

    if (!recipientId) {
      return new Response('Recipient ID is required', { status: 400 });
    }

    const readMessages = await Message.find({ recipient: recipientId, read: true })
      .sort({ createdAt: -1 })
      .populate('sender', 'name email')
      .populate('property', 'name');

    const unreadMessages = await Message.find({ recipient: recipientId, read: false })
      .sort({ createdAt: -1 })
      .populate('sender', 'name email')
      .populate('property', 'name');

    const messages = [...unreadMessages, ...readMessages];

    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// POST /api/messages
export const POST = async (request) => {
  try {
    await connectDB();

    const { name, email, phone, message, property, recipient } = await request.json();

    if (!name || !email || !message || !recipient || !property) {
      return new Response(JSON.stringify({ message: 'All fields are required' }), { status: 400 });
    }

    // Prevent sending message to self if needed
    // (optional: you can remove this if anonymous users send messages)
    // if (senderId === recipient) { ... }

    const newMessage = new Message({
      sender: null, // no session, so sender is null
      recipient,
      property,
      name,
      email,
      phone,
      body: message,
    });

    await newMessage.save();

    return new Response(JSON.stringify({ message: 'Message Sent' }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
