import connectDB from '@/config/database';
import User from '@/models/User';

export const dynamic = 'force-dynamic';

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId, userId } = await request.json(); // receive userId from client

    // Find user in database
    const user = await User.findOne({ _id: userId });

    // Check if property is bookmarked
    let isBookmarked = user ? user.bookmarks.includes(propertyId) : false;

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
