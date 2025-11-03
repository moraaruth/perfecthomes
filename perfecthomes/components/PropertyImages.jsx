'use client';
import Image from 'next/image';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { useState, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PropertyImages = ({ images }) => {
  const [galleryError, setGalleryError] = useState(true);
  const [failedImages, setFailedImages] = useState(new Set());
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

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
          <div className='relative'>
            <button 
              onClick={() => scroll('left')}
              className='absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg'
            >
              <FaChevronLeft className='text-gray-700' />
            </button>
            <button 
              onClick={() => scroll('right')}
              className='absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg'
            >
              <FaChevronRight className='text-gray-700' />
            </button>
            <div ref={scrollRef} className='overflow-x-auto scrollbar-hide'>
              <div className='flex gap-4 pb-4' style={{width: `${images.length * 320}px`}}>
              {images.map((image, index) => {
                const imageUrl = image.url || image;
                if (failedImages.has(index)) {
                  return (
                    <div key={index} className='bg-gray-200 h-[400px] w-80 flex-shrink-0 rounded-xl flex items-center justify-center'>
                      <p className='text-gray-500'>Image unavailable</p>
                    </div>
                  );
                }
                return (
                  <div key={index} className='relative w-80 h-[400px] flex-shrink-0 rounded-xl overflow-hidden'>
                    <Image
                      src={imageUrl}
                      alt={`Property Image ${index + 1}`}
                      fill
                      className='object-cover'
                      sizes='320px'
                      onError={() => handleImageError(imageUrl, index)}
                    />
                  </div>
                );
              })}
              </div>
            </div>
          </div>
          <p className='text-center text-gray-600 mt-2'>Swipe or use arrows to see more images</p>
        </div>
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
    );
  }

  try {
    return (
      <Gallery>
        <section className='bg-blue-50 p-4'>
          <div className='container mx-auto'>
            <div className='overflow-x-auto scrollbar-hide'>
              <div className='flex gap-4 pb-4' style={{width: `${images.length * 320}px`}}>
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
                        <div className='relative w-80 h-[400px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer hover:opacity-90' ref={ref} onClick={open}>
                          <Image
                            src={imageUrl}
                            alt={`Property Image ${index + 1}`}
                            fill
                            className='object-cover'
                            sizes='320px'
                            onError={() => handleImageError(imageUrl, index)}
                          />
                        </div>
                      )}
                    </Item>
                  );
                })}
              </div>
            </div>
            <p className='text-center text-gray-600 mt-2'>Swipe to see more images</p>
          </div>
          <style jsx>{`
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
          `}</style>
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