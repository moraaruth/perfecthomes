import connectDB from '@/config/database';
import Message from '@/models/Message';

export const dynamic = 'force-dynamic';

// PUT /api/messages/:id — toggle read/unread
export const PUT = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const message = await Message.findById(id);

    if (!message) return new Response('Message Not Found', { status: 404 });

    // Toggle read status
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// DELETE /api/messages/:id — delete message by ID
export const DELETE = async (request, { params }) => {
  try {
    await connectDB();

    const { id } = params;

    const message = await Message.findById(id);

    if (!message) return new Response('Message Not Found', { status: 404 });

    await message.deleteOne();

    return new Response('Message Deleted', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
