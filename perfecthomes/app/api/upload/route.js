// import cloudinary from '@/config/cloudinary';

// export const POST = async (request) => {
//   console.log('Cloudinary config:', {
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET ? '***set***' : 'NOT SET',
//   });
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file');
    
//     if (!file) {
//       return new Response(JSON.stringify({ error: 'No file provided' }), { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     const base64 = buffer.toString('base64');
//     const dataURI = `data:${file.type};base64,${base64}`;

//     const result = await cloudinary.uploader.upload(dataURI, {
//       folder: 'propertypulse'
//     });

//     return new Response(JSON.stringify({ secure_url: result.secure_url }), { status: 200 });
//   }  catch (error) {
//   console.error('========== CLOUDINARY UPLOAD ERROR ==========');
//   console.error('Message:', error?.message);
//   console.error('HTTP Code:', error?.http_code);
//   console.error('Name:', error?.name);
//   console.error('Error:', error);
//   console.error('==============================================');

//   return new Response(
//     JSON.stringify({
//       error: 'Upload failed',
//       message: error?.message,
//       http_code: error?.http_code,
//       name: error?.name,
//     }),
//     { status: 500 }
//   );
// };      }

import cloudinary from '@/config/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return Response.json(
        { error: 'No valid file provided' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'propertypulse',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.end(buffer);
    });

    console.log('Cloudinary upload successful:', {
      public_id: result.public_id,
      secure_url: result.secure_url,
    });

    return Response.json({
      success: true,
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('========== CLOUDINARY UPLOAD ERROR ==========');
    console.error('Message:', error?.message);
    console.error('HTTP Code:', error?.http_code);
    console.error('Name:', error?.name);
    console.error('Error:', error);
    console.error('==============================================');

    return Response.json(
      {
        success: false,
        error: 'Upload failed',
        message: error?.message || 'Unknown error',
      },
      { status: 500 }
    );
  }
}