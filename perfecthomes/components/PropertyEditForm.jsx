'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { fetchProperty } from '@/utils/requests';

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
        const propertyData = await fetchProperty(id);
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
        toast.success(`${field} updated successfully`);
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
        toast.success(`${childField} updated successfully`);
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
    <div className='mb-4 p-4 border rounded-lg'>
      <label className='block text-gray-700 font-bold mb-2'>{label}</label>
      {editingField === field ? (
        <div className='flex gap-2'>
          <input
            type={type}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            className='border rounded px-3 py-2 flex-1'
          />
          <button onClick={() => handleSave(field)} className='bg-green-500 text-white px-3 py-2 rounded'>Save</button>
          <button onClick={handleCancel} className='bg-gray-500 text-white px-3 py-2 rounded'>Cancel</button>
        </div>
      ) : (
        <div className='flex justify-between items-center'>
          <span className='text-lg'>{value || 'Not set'}</span>
          <button onClick={() => handleEdit(field, value)} className='bg-blue-500 text-white px-3 py-2 rounded'>Edit</button>
        </div>
      )}
    </div>
  );

  if (loading || !property) return <div>Loading...</div>;

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h2 className='text-3xl font-bold mb-6'>Edit Property</h2>

      <EditableField label="Property Type" field="type" value={property.type} />
      <EditableField label="Property Name" field="name" value={property.name} />
      <EditableField label="Description" field="description" value={property.description} />
      
      <EditableField label="Street" field="location.street" value={property.location?.street} />
      <EditableField label="City" field="location.city" value={property.location?.city} />
      
      <EditableField label="Beds" field="beds" value={property.beds} type="number" />
      <EditableField label="Baths" field="baths" value={property.baths} type="number" />
      <EditableField label="Square Feet" field="square_feet" value={property.square_feet} type="number" />
      
      <EditableField label="Sale Price" field="rates.sale" value={property.rates?.sale} type="number" />
      <EditableField label="Weekly Rate" field="rates.weekly" value={property.rates?.weekly} type="number" />
      <EditableField label="Monthly Rate" field="rates.monthly" value={property.rates?.monthly} type="number" />
      
      <EditableField label="Seller Name" field="seller_info.name" value={property.seller_info?.name} />
      <EditableField label="Seller Email" field="seller_info.email" value={property.seller_info?.email} />
      <EditableField label="Seller Phone" field="seller_info.phone" value={property.seller_info?.phone} />

      {/* Images Section */}
      <div className='mb-4 p-4 border rounded-lg'>
        <label className='block text-gray-700 font-bold mb-2'>Images</label>
        <div className='grid grid-cols-3 gap-4 mb-4'>
          {property.images?.map((image, index) => (
            <div key={index} className='relative'>
              <img src={image.url || image} alt={`Image ${index + 1}`} className='w-full h-32 object-cover rounded' />
              <button
                onClick={() => removeImage(index)}
                className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 text-sm'
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <input
          type='file'
          multiple
          accept='image/*'
          onChange={addImages}
          className='border rounded w-full py-2 px-3'
          disabled={uploading}
        />
        {uploading && <p className='text-blue-600 mt-2'>Uploading...</p>}
      </div>

      <button
        onClick={() => router.push(`/properties/${id}`)}
        className='bg-purple-600 text-white px-6 py-3 rounded-lg'
      >
        Back to Property
      </button>
    </div>
  );
};

export default PropertyEditForm;