import cloudinary from '@/config/cloudinary';

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50 MB

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return Response.json(
        { 
          error: 'No valid file provided',
          message: 'Request must include a file field'
        },
        { status: 400 }
      );
    }

    // Validate file MIME type
    if (!ALLOWED_MIMES.includes(file.type)) {
      return Response.json(
        { 
          error: 'Unsupported file format',
          message: `File type "${file.type}" is not supported. Only JPEG, PNG, and WebP are allowed.`
        },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return Response.json(
        { 
          error: 'File too large',
          message: `File size ${(file.size / 1024 / 1024).toFixed(2)} MB exceeds 50 MB limit.`
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'propertypulse',
          resource_type: 'auto',
          timeout: 60000,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      uploadStream.on('error', (error) => {
        reject(error);
      });

      uploadStream.end(buffer);
    });

    if (!result || !result.secure_url) {
      throw new Error('Cloudinary did not return a secure URL');
    }

    console.log('✅ Cloudinary upload successful:', {
      public_id: result.public_id,
      secure_url: result.secure_url,
      size: file.size,
      type: file.type,
    });

    return Response.json({
      success: true,
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('❌ ========== CLOUDINARY UPLOAD ERROR ==========');
    console.error('Message:', error?.message);
    console.error('HTTP Code:', error?.http_code);
    console.error('Name:', error?.name);
    console.error('Full Error:', error);
    console.error('==============================================');

    // Return meaningful error message to client
    let errorMessage = error?.message || 'Upload failed';
    
    if (error?.http_code === 400) {
      errorMessage = 'Invalid image file or corrupted data';
    } else if (error?.http_code === 401 || error?.http_code === 403) {
      errorMessage = 'Authentication error - check Cloudinary configuration';
    } else if (error?.message?.includes('timeout')) {
      errorMessage = 'Upload timed out - file might be too large or connection too slow';
    }

    return Response.json(
      {
        success: false,
        error: 'Upload failed',
        message: errorMessage,
      },
      { status: error?.http_code || 500 }
    );
  }
}