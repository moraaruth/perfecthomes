'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { useState } from 'react';

const PropertyImages = ({ images }) => {
  console.log('PropertyImages - First image (header uses):', images[0]);
  console.log('PropertyImages - All images:', images);
  const [galleryError, setGalleryError] = useState(true); // Force regular images for testing
  const [failedImages, setFailedImages] = useState(new Set());

  if (!images || images.length === 0) {
    return (
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto text-center'>
          <p className='text-gray-500'>No images available</p>
        </div>
      </section>
    );
  }

  const handleImageError = (imageUrl, index) => {
    console.error('Image failed to load:', imageUrl);
    setFailedImages(prev => new Set([...prev, index]));
  };

  if (galleryError) {
    return (
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {images.map((image, index) => {
              const imageUrl = image.url || image;
              if (failedImages.has(index)) {
                return (
                  <div key={index} className='bg-gray-200 h-[400px] w-full rounded-xl flex items-center justify-center'>
                    <p className='text-gray-500'>Image unavailable</p>
                  </div>
                );
              }
              return (
                <div key={index} className='relative w-full h-[400px] rounded-xl overflow-hidden'>
                  <Image
                    src={imageUrl}
                    alt={`Property Image ${index + 1}`}
                    fill
                    className='object-cover'
                    sizes='(max-width: 768px) 100vw, 50vw'
                    onError={() => handleImageError(imageUrl, index)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }

  try {
    return (
      <Gallery>
        <section className='bg-blue-50 p-4'>
          <div className='container mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {images.map((image, index) => {
                const imageUrl = image.url || image;
                return (
                  <Item
                    key={index}
                    original={imageUrl}
                    thumbnail={imageUrl}
                    width='1200'
                    height='800'
                  >
                    {({ ref, open }) => (
                      <div className='relative w-full h-[400px] rounded-xl overflow-hidden cursor-pointer hover:opacity-90' ref={ref} onClick={open}>
                        <Image
                          src={imageUrl}
                          alt={`Property Image ${index + 1}`}
                          fill
                          className='object-cover'
                          sizes='(max-width: 768px) 100vw, 50vw'
                          onError={() => handleImageError(imageUrl, index)}
                        />
                      </div>
                    )}
                  </Item>
                );
              })}
            </div>
          </div>
        </section>
      </Gallery>
    );
  } catch (error) {
    console.error('PhotoSwipe Gallery error:', error);
    setGalleryError(true);
    return null;
  }
};

export default PropertyImages;


