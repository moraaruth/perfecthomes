'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { FaEdit, FaSave, FaTimes, FaTrash, FaPlus } from 'react-icons/fa';

const PropertyEditForm = () => {
  const { id } = useParams();
  const router = useRouter();

  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const propertyData = await res.json();
        setProperty(propertyData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPropertyData();
  }, [id]);

  const updateProperty = async (field, value) => {
    try {
      const updatedProperty = { ...property, [field]: value };
      
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProperty),
      });

      if (res.ok) {
        setProperty(updatedProperty);
        toast.success(`Updated successfully`);
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const updateNestedProperty = async (parentField, childField, value) => {
    try {
      const updatedProperty = { 
        ...property, 
        [parentField]: { ...property[parentField], [childField]: value }
      };
      
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProperty),
      });

      if (res.ok) {
        setProperty(updatedProperty);
        toast.success(`Updated successfully`);
      } else {
        toast.error('Update failed');
      }
    } catch (error) {
      toast.error('Update failed');
    }
  };

  const handleEdit = (field, currentValue) => {
    setEditingField(field);
    setTempValue(currentValue || '');
  };

  const handleSave = (field) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      updateNestedProperty(parent, child, tempValue);
    } else {
      updateProperty(field, tempValue);
    }
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue('');
  };

  const removeImage = async (indexToRemove) => {
    const updatedImages = property.images.filter((_, index) => index !== indexToRemove);
    await updateProperty('images', updatedImages);
  };

  const addImages = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        return data.secure_url;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      const updatedImages = [...property.images, ...uploadedImages];
      await updateProperty('images', updatedImages);
    } catch (error) {
      toast.error('Image upload failed');
    } finally {
      setUploading(false);
    }
  };

  const EditableField = ({ label, field, value, type = 'text' }) => (
    <div className='bg-white p-6 rounded-lg shadow-md mb-6'>
      <div className='flex justify-between items-center mb-3'>
        <h3 className='text-lg font-semibold text-gray-800'>{label}</h3>
        {editingField !== field && (
          <button 
            onClick={() => handleEdit(field, value)} 
            className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors'
          >
            <FaEdit /> Edit
          </button>
        )}
      </div>
      
      {editingField === field ? (
        <div className='space-y-3'>
          <input
            type={type}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className='w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            placeholder={`Enter ${label.toLowerCase()}`}
          />
          <div className='flex gap-3'>
            <button 
              onClick={() => handleSave(field)} 
              className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors'
            >
              <FaSave /> Save
            </button>
            <button 
              onClick={handleCancel} 
              className='flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors'
            >
              <FaTimes /> Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className='text-xl text-gray-700 bg-gray-50 p-4 rounded-lg'>
          {value || <span className='text-gray-400 italic'>Not set</span>}
        </div>
      )}
    </div>
  );

  if (loading || !property) return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='text-xl text-gray-600'>Loading...</div>
    </div>
  );

  return (
    <div className='min-h-screen bg-gray-50 py-8'>
      <div className='max-w-4xl mx-auto px-6'>
        <div className='bg-white rounded-lg shadow-lg p-8 mb-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-2'>Edit Property</h1>
          <p className='text-gray-600 mb-8'>Click edit on any field to modify it individually</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          <EditableField label="Property Type" field="type" value={property.type} />
          <EditableField label="Property Name" field="name" value={property.name} />
          <EditableField label="Description" field="description" value={property.description} />
          <EditableField label="Street Address" field="location.street" value={property.location?.street} />
          <EditableField label="City" field="location.city" value={property.location?.city} />
          <EditableField label="Bedrooms" field="beds" value={property.beds} type="number" />
          <EditableField label="Bathrooms" field="baths" value={property.baths} type="number" />
          <EditableField label="Square Feet" field="square_feet" value={property.square_feet} type="number" />
          <EditableField label="Sale Price (KSH)" field="rates.sale" value={property.rates?.sale} type="number" />
          <EditableField label="Weekly Rate (KSH)" field="rates.weekly" value={property.rates?.weekly} type="number" />
          <EditableField label="Monthly Rate (KSH)" field="rates.monthly" value={property.rates?.monthly} type="number" />
          <EditableField label="Seller Name" field="seller_info.name" value={property.seller_info?.name} />
          <EditableField label="Seller Email" field="seller_info.email" value={property.seller_info?.email} />
          <EditableField label="Seller Phone" field="seller_info.phone" value={property.seller_info?.phone} />
        </div>

        {/* Images Section */}
        <div className='bg-white p-6 rounded-lg shadow-md mt-6'>
          <div className='flex justify-between items-center mb-6'>
            <h3 className='text-2xl font-semibold text-gray-800'>Property Images</h3>
            <label className='flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors'>
              <FaPlus /> Add Images
              <input
                type='file'
                multiple
                accept='image/*'
                onChange={addImages}
                className='hidden'
                disabled={uploading}
              />
            </label>
          </div>

          {uploading && (
            <div className='text-center py-4'>
              <div className='text-blue-600 font-medium'>Uploading images...</div>
            </div>
          )}

          {property.images && property.images.length > 0 ? (
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
              {property.images.map((image, index) => {
                const imageUrl = image?.url || image;
                return (
                  <div key={index} className='relative group'>
                    <div className='relative w-full h-48 rounded-lg overflow-hidden bg-gray-200'>
                      <Image
                        src={imageUrl}
                        alt={`Property image ${index + 1}`}
                        fill
                        className='object-cover group-hover:scale-105 transition-transform duration-200'
                        sizes='(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw'
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className='absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='text-center py-12 text-gray-500'>
              <div className='text-6xl mb-4'>📷</div>
              <p className='text-xl'>No images uploaded yet</p>
              <p className='text-sm'>Click "Add Images" to upload property photos</p>
            </div>
          )}
        </div>

        <div className='mt-8 text-center'>
          <button
            onClick={() => router.push(`/properties/${id}`)}
            className='bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors'
          >
            Back to Property
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyEditForm;