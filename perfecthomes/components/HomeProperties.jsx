'use client';
import Link from 'next/link'
import PropertyCard from '@/components/PropertyCard'
import { useState, useEffect } from 'react'

const HomeProperties = () => {
  const [recentProperties, setRecentProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/properties');
        const data = await res.json();
        const latest = data.properties
          ? data.properties
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 3)
          : [];
        setRecentProperties(latest);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); 
  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto'>
          <h2 className='text-3xl font-bold mb-6 text-center' style={{ color: '#800080' }}>
            Recent Properties
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {loading ? (
              <p>Loading...</p>
            ) : recentProperties.length === 0 ? (
              <p>No Properties Found</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className='m-auto max-w-lg my-10 px-6'>
        <Link
          href='/properties'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </>
  );
};
export default HomeProperties;