import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

// GET /api/properties
export const GET = async (request) => {
  try {
    await connectDB();

    const page = request.nextUrl.searchParams.get('page') || 1;
    const pageSize = request.nextUrl.searchParams.get('pageSize') || 6;

    const skip = (page - 1) * pageSize;

    const total = await Property.countDocuments({});
    const properties = await Property.find({}).skip(skip).limit(pageSize);

    const result = {
      total,
      properties,
    };

    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response('Something Went Wrong', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    console.log('POST /api/properties - Starting request');
    await connectDB();
    console.log('Database connected');

    const sessionUser = await getSessionUser();
    console.log('Session user:', sessionUser);

    if (!sessionUser || !sessionUser.userId) {
      console.log('No session user or userId');
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;
    console.log('User ID:', userId);

    const formData = await request.formData();
    console.log('Form data received');

    // Access all values from amenities and images
    const amenities = formData.getAll('amenities');
    const images = formData
      .getAll('images')
      .filter((image) => image.name !== '');

    // Create propertyData object for database
    const propertyData = {
      type: formData.get('type'),
      name: formData.get('name'),
      description: formData.get('description'),
      location: {
        street: formData.get('location.street'),
        city: formData.get('location.city'),
      
      },
      beds: formData.get('beds'),
      baths: formData.get('baths'),
      square_feet: formData.get('square_feet'),
      amenities,
      rates: {
        weekly: formData.get('rates.weekly'),
        sale: formData.get('rates.sale'),
        monthly: formData.get('rates.monthly'),
        nightly: formData.get('rates.nightly.'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };

    // Skip image upload for now to test basic functionality
    console.log('Images received:', images.length);
    propertyData.images = []; // Empty array for now
    
    console.log('Property data to save:', propertyData);
    const newProperty = new Property(propertyData);
    console.log('Property model created');
    await newProperty.save();
    console.log('Property saved successfully');

    //return Response.redirect(
   //   `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    //);
return Response.redirect(`/properties/${newProperty._id}`);

    // return new Response(JSON.stringify({ message: 'Success' }), {
    //   status: 200,
    // });
  } catch (error) {
    console.error('POST /api/properties error:', error);
    return new Response(`Failed to add property: ${error.message}`, { status: 500 });
  }
};