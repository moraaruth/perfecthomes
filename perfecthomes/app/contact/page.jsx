'use client'
import { useState } from 'react'
import { FaMapMarkerAlt, FaPhone, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaTiktok } from 'react-icons/fa'

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    comments: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')

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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage('Your message has been sent successfully!')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          comments: ''
        })
      } else {
        setMessage('Failed to send message. Please try again.')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    }
    
    setIsSubmitting(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#800080' }}>
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with us for any inquiries about properties or our services. We're here to help you find your perfect home.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Get in Touch */}
          <div>
            <h2 className="text-3xl font-bold mb-8" style={{ color: '#800080' }}>
              Get in Touch
            </h2>
            
            {/* Location */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-2xl mr-4" style={{ color: '#800080' }} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Location</h3>
                  <p className="text-gray-600">Westland, Nairobi, Kenya</p>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <FaPhone className="text-2xl mr-4" style={{ color: '#800080' }} />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">Phone Number</h3>
                  <p className="text-gray-600">+254701029158</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Follow us on:</h3>
              <div className="flex space-x-4">
                <a href="#" className="p-3 rounded-full transition-colors" style={{ backgroundColor: '#E6B3E6' }}>
                  <FaFacebook className="text-xl" style={{ color: '#800080' }} />
                </a>
                <a href="#" className="p-3 rounded-full transition-colors" style={{ backgroundColor: '#E6B3E6' }}>
                  <FaTwitter className="text-xl" style={{ color: '#800080' }} />
                </a>
                <a href="#" className="p-3 rounded-full transition-colors" style={{ backgroundColor: '#E6B3E6' }}>
                  <FaInstagram className="text-xl" style={{ color: '#800080' }} />
                </a>
                <a href="#" className="p-3 rounded-full transition-colors" style={{ backgroundColor: '#E6B3E6' }}>
                  <FaLinkedin className="text-xl" style={{ color: '#800080' }} />
                </a>
                <a href="#" className="p-3 rounded-full transition-colors" style={{ backgroundColor: '#E6B3E6' }}>
                  <FaYoutube className="text-xl" style={{ color: '#800080' }} />
                </a>
                <a href="#" className="p-3 rounded-full transition-colors" style={{ backgroundColor: '#E6B3E6' }}>
                  <FaTiktok className="text-xl" style={{ color: '#800080' }} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Names */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
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

              {/* Email */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#800080' }}
                  required
                />
              </div>

              {/* Comments */}
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Comments
                </label>
                <textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Enter your message or comments..."
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': '#800080' }}
                  required
                />
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
                  style={{ backgroundColor: '#800080' }}
                  onMouseEnter={(e) => !isSubmitting && (e.target.style.backgroundColor = '#660066')}
                  onMouseLeave={(e) => !isSubmitting && (e.target.style.backgroundColor = '#800080')}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
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
    </div>
  )
}

export default ContactPage