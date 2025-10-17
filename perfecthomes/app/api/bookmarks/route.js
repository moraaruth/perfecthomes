import connectDB from '@/config/database';
import User from '@/models/User';
import Property from '@/models/Property';

export const dynamic = 'force-dynamic';

// GET /api/bookmarks?userId=...
export const GET = async (request) => {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    // Find user in database
    const user = await User.findById(userId);

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Get user's bookmarks
    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

// POST /api/bookmarks
export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId, userId } = await request.json();

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }

    // Find user in database
    const user = await User.findById(userId);

    if (!user) {
      return new Response('User not found', { status: 404 });
    }

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = 'Bookmark removed successfully';
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = 'Bookmark added successfully';
      isBookmarked = true;
    }

    await user.save();

    return new Response(JSON.stringify({ message, isBookmarked }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
