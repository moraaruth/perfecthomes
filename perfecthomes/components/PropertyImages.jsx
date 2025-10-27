'use client';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { useState } from 'react';

const PropertyImages = ({ images }) => {
  const [galleryError, setGalleryError] = useState(false);

  if (!images || images.length === 0) {
    return (
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto text-center'>
          <p className='text-gray-500'>No images available</p>
        </div>
      </section>
    );
  }

  if (galleryError) {
    return (
      <section className='bg-blue-50 p-4'>
        <div className='container mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {images.map((image, index) => {
              const imageUrl = image.url || image;
              return (
                <div key={index}>
                  <img
                    src={imageUrl}
                    alt={`Property Image ${index + 1}`}
                    className='object-cover h-[400px] w-full rounded-xl'
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
                      <img
                        ref={ref}
                        onClick={open}
                        src={imageUrl}
                        alt={`Property Image ${index + 1}`}
                        className='object-cover h-[400px] w-full rounded-xl cursor-pointer hover:opacity-90'
                        onError={() => console.error('Image failed to load:', imageUrl)}
                      />
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

export default PropertyImages;
