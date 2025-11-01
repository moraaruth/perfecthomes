'use client'
import { useState } from 'react'
import { FaCalendar, FaHome, FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import emailjs from '@emailjs/browser'

const BookViewPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    month: '',
    day: '',
    year: '',
    location: '',
    houseType: '',
    notes: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

  const locations = [
    'Westland', 'Karen', 'Kilimani', 'Lavington', 'Kileleshwa', 
    'Runda', 'Muthaiga', 'Spring Valley', 'Riverside', 'Parklands'
  ]

  const houseTypes = [
    'Apartment', 'House', 'Studio', 'Room', 'Loft', 'Other'
  ]

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Send email using EmailJS
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        {
          to_name: 'Perfect Homes',
          to_email: 'phomeskenya@gmail.com',
          from_name: `${formData.firstName} ${formData.lastName}`,
          from_email: formData.email,
          contact: formData.contact,
          date: `${formData.month}/${formData.day}/${formData.year}`,
          location: formData.location,
          house_type: formData.houseType,
          notes: formData.notes,
          subject: 'New Property Viewing Request - Perfect Homes'
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      )

      setMessage('Your booking request has been sent successfully!')
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        contact: '',
        month: '',
        day: '',
        year: '',
        location: '',
        houseType: '',
        notes: ''
      })
    } catch (error) {
      console.error('EmailJS error:', error)
      setMessage('Failed to send request. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#800080' }}>
            Book a Property View
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schedule a viewing appointment for your dream property. Fill out the form below and we'll get back to you shortly.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <FaUser className="inline mr-2" style={{ color: '#800080' }} />
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#800080' }}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <FaUser className="inline mr-2" style={{ color: '#800080' }} />
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#800080' }}
                  required
                />
              </div>
            </div>

            {/* Email and Contact */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <FaEnvelope className="inline mr-2" style={{ color: '#800080' }} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#800080' }}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <FaPhone className="inline mr-2" style={{ color: '#800080' }} />
                  Contact
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#800080' }}
                  required
                />
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                <FaCalendar className="inline mr-2" style={{ color: '#800080' }} />
                Preferred Date
              </label>
              <div className="grid grid-cols-3 gap-4">
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#800080' }}
                  required
                >
                  <option value="">Month</option>
                  {Array.from({ length: 12 }, (_, i) => {
                    const currentDate = new Date()
                    const currentYear = parseInt(formData.year) || currentDate.getFullYear()
                    const currentMonth = currentDate.getMonth() + 1
                    const monthValue = i + 1
                    
                    // Only show current and future months for current year
                    if (currentYear === currentDate.getFullYear() && monthValue < currentMonth) {
                      return null
                    }
                    
                    return (
                      <option key={monthValue} value={monthValue}>
                        {new Date(0, i).toLocaleString('default', { month: 'long' })}
                      </option>
                    )
                  }).filter(Boolean)}
                </select>
                <select
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#800080' }}
                  required
                >
                  <option value="">Day</option>
                  {Array.from({ length: 31 }, (_, i) => {
                    const currentDate = new Date()
                    const selectedYear = parseInt(formData.year) || currentDate.getFullYear()
                    const selectedMonth = parseInt(formData.month) || currentDate.getMonth() + 1
                    const dayValue = i + 1
                    
                    // Only show current and future days for current month and year
                    if (selectedYear === currentDate.getFullYear() && 
                        selectedMonth === currentDate.getMonth() + 1 && 
                        dayValue < currentDate.getDate()) {
                      return null
                    }
                    
                    return <option key={dayValue} value={dayValue}>{dayValue}</option>
                  }).filter(Boolean)}
                </select>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#800080' }}
                  required
                >
                  <option value="">Year</option>
                  {Array.from({ length: 3 }, (_, i) => {
                    const year = new Date().getFullYear() + i
                    return <option key={year} value={year}>{year}</option>
                  })}
                </select>
              </div>
            </div>

            {/* Location and House Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <FaMapMarkerAlt className="inline mr-2" style={{ color: '#800080' }} />
                  Location
                </label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#800080' }}
                  required
                >
                  <option value="">Select location</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  <FaHome className="inline mr-2" style={{ color: '#800080' }} />
                  House Type
                </label>
                <select
                  name="houseType"
                  value={formData.houseType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#800080' }}
                  required
                >
                  <option value="">Select house type</option>
                  {houseTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Any specific requirements or additional information..."
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                style={{ '--tw-ring-color': '#800080' }}
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                style={{ backgroundColor: '#800080' }}
                onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#660066')}
                onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = '#800080')}
              >
                {isSubmitting ? 'Sending...' : 'Submit Booking Request'}
              </button>
            </div>

            {/* Message */}
            {message && (
              <div className={`text-center p-4 rounded-lg ${message.includes('success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default BookViewPage