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
    console.error('GET /api/properties error:', error);
    return new Response(JSON.stringify({ 
      error: 'Something Went Wrong', 
      message: error.message 
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
export const POST = async (request) => {
  try {
    console.log('POST /api/properties - Starting request');
    
    const sessionUser = await getSessionUser();
    console.log('Session user:', sessionUser);

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    // Only allow admins
    const adminEmails = ['mnjosiah@gmail.com', 'iammoraaruth@gmail.com'];
    if (!adminEmails.includes(sessionUser.user.email)) {
      return new Response('Unauthorized - Admin access required', { status: 403 });
    }

    if (!process.env.MONGODB_URI || process.env.MONGODB_URI === 'your_mongodb_connection_string_here') {
      return new Response('Database not configured', { status: 500 });
    }

    await connectDB();
    console.log('Database connected');

    const { userId } = sessionUser;

    const formData = await request.formData();

    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images').filter((image) => image.name !== '');

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
        nightly: formData.get('rates.nightly'),
      },
      seller_info: {
        name: formData.get('seller_info.name'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: userId,
    };

    const uploadedImages = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);
      const imageType = image.type.split('/')[1];
      const imageBase64 = imageData.toString('base64');

      const result = await cloudinary.uploader.upload(
        `data:image/${imageType};base64,${imageBase64}`,
        { folder: 'propertypulse' }
      );
      uploadedImages.push(result.secure_url);
    }

    propertyData.images = uploadedImages;

    // ✅ Save to MongoDB
    const newProperty = new Property(propertyData);
    await newProperty.save();

    console.log('✅ Property added successfully:', newProperty._id);

    return new Response(JSON.stringify({ 
      message: 'Property added successfully',
      propertyId: newProperty._id,
      redirectUrl: `/properties/${newProperty._id}`
    }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('❌ Error adding property:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to add property', 
      message: error.message
    }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// export const POST = async (request) => {
//   try {
//     console.log('POST /api/properties - Starting request');
    
//     const sessionUser = await getSessionUser();
//     console.log('Session user:', sessionUser);

//     if (!sessionUser || !sessionUser.userId) {
//       console.log('No session user or userId');
//       return new Response('User ID is required', { status: 401 });
//     }

//     // Check if user is admin
//     const adminEmails = ['mnjosiah@gmail.com', 'iammoraaruth@gmail.com'];
//     if (!adminEmails.includes(sessionUser.user.email)) {
//       console.log('User not admin:', sessionUser.user.email);
//       return new Response('Unauthorized - Admin access required', { status: 403 });
//     }

//     if (!process.env.MONGODB_URI || process.env.MONGODB_URI === 'your_mongodb_connection_string_here') {
//       return new Response('Database not configured', { status: 500 });
//     }
//     await connectDB();
//     console.log('Database connected');

//     const { userId } = sessionUser;
//     console.log('User ID:', userId);

//     const formData = await request.formData();

//     // Access all values from amenities and images
//     const amenities = formData.getAll('amenities');
//     // const images = formData
//     //   .getAll('images')
//     //   .filter((image) => image.name !== '');

//     // Create propertyData object for database
//     const propertyData = {
//       type: formData.get('type'),
//       name: formData.get('name'),
//       description: formData.get('description'),
//       location: {
//         street: formData.get('location.street'),
//         city: formData.get('location.city'),
      
//       },
//       beds: formData.get('beds'),
//       baths: formData.get('baths'),
//       square_feet: formData.get('square_feet'),
//       amenities,
//       rates: {
//         weekly: formData.get('rates.weekly'),
//         sale: formData.get('rates.sale'),
//         monthly: formData.get('rates.monthly'),
//         nightly: formData.get('rates.nightly'),
//       },
//       seller_info: {
//         name: formData.get('seller_info.name'),
//         email: formData.get('seller_info.email'),
//         phone: formData.get('seller_info.phone'),
//       },
//       owner: userId,
//     };

    
//     // Upload image(s) to Cloudinary
//     // const uploadImagesToCloudinary = async (images) => {
//     //   // Helper function to upload a single image
//     //   const uploadImage = async (image) => {
//     //     const imageBuffer = await image.arrayBuffer();
//     //     const imageArray = Array.from(new Uint8Array(imageBuffer));
//     //     const imageData = Buffer.from(imageArray);
    
//     //     // Determine the image type dynamically
//     //     const imageType = image.type.split('/')[1]; // 'png', 'jpg', etc.
    
//     //     // Convert the image data to base64
//     //     const imageBase64 = imageData.toString('base64');
    
//     //     // Make request to upload to Cloudinary
//     //     const result = await cloudinary.uploader.upload(
//     //       `data:image/${imageType};base64,${imageBase64}`,
//     //       {
//     //         folder: 'propertypulse'
//     //       }
//     //     );
    
//     //     return result.secure_url;
//     //   };
    
//     //   // Create an array of promises for each image upload
//     //   const imageUploadPromises = images.map(uploadImage);
    
//     //   try {
//     //     // Wait for all images to upload concurrently
//     //     const uploadedImages = await Promise.all(imageUploadPromises);
//     //     // Add uploaded images to the propertyData object
//     //     propertyData.images = uploadedImages;
//     //     console.log('Images successfully uploaded:', uploadedImages);
//     //   } catch (error) {
//     //     console.error('Failed to upload one or more images:', error);
//     //   }
//     // };
    
//     // Call the function to upload images
//     // await uploadImagesToCloudinary(images);
    
//     // Add empty images array for now
//     propertyData.images = [];
    
//     const newProperty = new Property(propertyData);
//     await newProperty.save();

//     return new Response(JSON.stringify({ 
//       message: 'Property added successfully',
//       propertyId: newProperty._id,
//       redirectUrl: `/properties/${newProperty._id}`
//     }), {
//       status: 201,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   } catch (error) {
//     console.error('Error adding property:', error);
//     console.error('Error stack:', error.stack);
//     return new Response(JSON.stringify({ 
//       error: 'Failed to add property', 
//       message: error.message,
//       stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
//     }), { 
//       status: 500,
//       headers: { 'Content-Type': 'application/json' }
//     });
//   }
// };