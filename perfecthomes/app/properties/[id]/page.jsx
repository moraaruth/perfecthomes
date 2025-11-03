'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProperty } from '@/utils/requests';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import BookmarkButton from '@/components/BookmarkButton';
import PropertyContactForm from '@/components/PropertyContactForm';
import ShareButtons from '@/components/ShareButtons';
import Spinner from '@/components/Spinner';
import { FaArrowLeft, FaEdit, FaTrash } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

const PropertyPage = () => {
  const { id } = useParams();
  const { data: session } = useSession();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchPropertyData = async () => {
    if (!id) return;
    try {
      const res = await fetch(`/api/properties/${id}`, { cache: 'no-store' }); // <-- add this
      if (!res.ok) throw new Error('Property not found');
      const data = await res.json();
      setProperty(data);
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  fetchPropertyData();
}, [id]);

const handleDelete = async () => {
  if (!confirm('Are you sure you want to delete this property?')) return;
  
  try {
    const res = await fetch(`/api/properties/${id}`, {
      method: 'DELETE',
    });
    
    if (res.ok) {
      window.location.href = '/properties';
    } else {
      alert('Failed to delete property');
    }
  } catch (error) {
    console.error('Delete error:', error);
    alert('Error deleting property');
  }
};

const isOwner = session?.user?.email && 
  (session.user.email === 'mnjosiah@gmail.com' || session.user.email === 'iammoraaruth@gmail.com');

  // useEffect(() => {
  //   const fetchPropertyData = async () => {
  //     if (!id) return;
  //     try {
  //       const property = await fetchProperty(id);
  //       setProperty(property);
  //     } catch (error) {
  //       console.error('Error fetching property:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if (property === null) {
  //     fetchPropertyData();
  //   }
  // }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className='container m-auto py-6 px-6'>
              <div className='flex justify-between items-center'>
                <Link
                  href='/properties'
                  className='flex items-center hover:opacity-80'
                  style={{ color: '#800080' }}
                >
                  <FaArrowLeft className='mr-2' /> Back to Properties
                </Link>
                
                {isOwner && (
                  <div className='flex gap-2'>
                    <Link
                      href={`/properties/${id}/edit`}
                      className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded flex items-center'
                    >
                      <FaEdit className='mr-1' /> Edit
                    </Link>
                    <button
                      onClick={handleDelete}
                      className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center'
                    >
                      <FaTrash className='mr-1' /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section className='bg-purple-50'>
            <div className='container m-auto py-10 px-6'>
              <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
                <PropertyDetails property={property} />
                <aside className='space-y-4'>
                  <BookmarkButton property={property} />
                  <ShareButtons property={property} />
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};
export default PropertyPage;