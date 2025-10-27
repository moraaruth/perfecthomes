'use client'
import Image from 'next/image';
import logo from '@/assets/images/logo.jpg';
import Link from 'next/link';
import {FaBed, FaBath, FaRulerCombined, FaMoneyBill, FaMapMarker } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
  if (!property) return null;

  const getRateDisplay = () => {
    const { rates } = property;
    if(rates?.sale){
      return `${rates.sale.toLocaleString()}`;
    }
    return 'N/A';
  }
  return (
    <div className="rounded-xl shadow-md relative">
{/* 
      <Image
        src={property.images?.[0] || '/placeholder.jpg'}
        alt={property.name || 'Property'}
        height={0}
        width={0}
        sizes='100vw'
        className='w-full h-auto rounded-t-xl'
      /> */}
        {property.images && property.images.length > 0 && (
              <div className="mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.images.map((img, index) => (
                    <div key={index} className="relative w-full h-64 rounded-lg overflow-hidden">
                      <Image
                        src={img.url || img}
                        alt={property.name || 'Property Image'}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                        unoptimized // 👈 Add this if Cloudinary URLs cause 400 errors
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type || 'Property'}</div>
          <h3 className="text-xl font-bold">{property.name || 'Unnamed Property'}</h3>
        </div>
        <h3
          className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg font-bold text-right md:text-center lg:text-right"
          style={{ color: '#800080' }}
        >
          ksh{getRateDisplay() }         
           </h3>

        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className='inline mr-2'/> {property.beds || 0} {' '}
            <span className="md:hidden lg:inline">Beds</span>
          </p>
          <p>
          <FaBath className='inline mr-2'/> {property.baths || 0}{ ' '}
            <span className="md:hidden lg:inline">Baths</span>
          </p>
          <p>
          <FaRulerCombined className='inline mr-2'/>
            {property.square_feet || 0} <span className="md:hidden lg:inline">sqft</span>
          </p>
        </div>

        <div
          className="flex justify-center gap-4 text-green-900 text-sm mb-4"
        >
          {/* { property.rates.daily && (
            <p><FaMoneyBill Name='inline mr-2'/> Daily </p>

          )}
           { property.rates.weekly && (
            <p><FaMoneyBill className='inline mr-2'/> Weekly </p>

          )} */}
            { property.rates?.sale && (
            <p><FaMoneyBill className='inline mr-2'/> Sale </p>

          )}
           {/* { property.rates.monthly && (
            <p><FaMoneyBill className='inline mr-2'/> Monthly </p>

          )} */}
          
          
        </div>

        <div className="border border-gray-100 mb-5"></div>

        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className='text-orange-700' />
            
            <span className="text-orange-700"> {property.location?.city || 'Unknown'} {property.location?.state || ''}</span>
          </div>
          <Link
      href={`/properties/${property._id}`}
      className="h-[36px] bg-[#800080] hover:bg-[#660066] text-white px-4 py-2 rounded-lg text-center text-sm font-medium transition-colors duration-200 block"
    >
      Details
    </Link>
        </div>
      </div>
    </div>

  )
}

export default PropertyCard