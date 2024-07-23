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
    await connectDB();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    const formData = await request.formData();

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

    
    // Upload image(s) to Cloudinary
    const uploadImagesToCloudinary = async (images) => {
      // Helper function to upload a single image
      const uploadImage = async (image) => {
        const imageBuffer = await image.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);
    
        // Determine the image type dynamically
        const imageType = image.type.split('/')[1]; // 'png', 'jpg', etc.
    
        // Convert the image data to base64
        const imageBase64 = imageData.toString('base64');
    
        // Make request to upload to Cloudinary
        const result = await cloudinary.uploader.upload(
          `data:image/${imageType};base64,${imageBase64}`,
          {
            folder: 'propertypulse'
          }
        );
    
        return result.secure_url;
      };
    
      // Create an array of promises for each image upload
      const imageUploadPromises = images.map(uploadImage);
    
      try {
        // Wait for all images to upload concurrently
        const uploadedImages = await Promise.all(imageUploadPromises);
        // Add uploaded images to the propertyData object
        propertyData.images = uploadedImages;
        console.log('Images successfully uploaded:', uploadedImages);
      } catch (error) {
        console.error('Failed to upload one or more images:', error);
      }
    };
    
    // Call the function to upload images
    await uploadImagesToCloudinary(images);
    
    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );

    // return new Response(JSON.stringify({ message: 'Success' }), {
    //   status: 200,
    // });
  } catch (error) {
    return new Response('Failed to add property', { status: 500 });
  }
};