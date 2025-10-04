import Image from 'next/image'
import { FaHome, FaUsers, FaHandshake, FaStar } from 'react-icons/fa'

const AboutPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="py-20" style={{ backgroundColor: '#800080' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            About Perfect Homes
          </h1>
          <p className="text-xl text-white max-w-3xl mx-auto">
            Your trusted partner in finding the perfect home. We connect property seekers with their dream homes across Kenya.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#800080' }}>Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To revolutionize the property market by providing a seamless, transparent, and efficient platform 
              that connects property owners with potential buyers and renters.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaHome className="text-4xl mx-auto mb-4" style={{ color: '#800080' }} />
              <h3 className="text-2xl font-bold text-gray-800">500+</h3>
              <p className="text-gray-600">Properties Listed</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaUsers className="text-4xl mx-auto mb-4" style={{ color: '#800080' }} />
              <h3 className="text-2xl font-bold text-gray-800">1000+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaHandshake className="text-4xl mx-auto mb-4" style={{ color: '#800080' }} />
              <h3 className="text-2xl font-bold text-gray-800">200+</h3>
              <p className="text-gray-600">Successful Deals</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaStar className="text-4xl mx-auto mb-4" style={{ color: '#800080' }} />
              <h3 className="text-2xl font-bold text-gray-800">4.9/5</h3>
              <p className="text-gray-600">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: '#800080' }}>Why Choose Perfect Homes?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E6B3E6' }}>
                <FaHome className="text-2xl" style={{ color: '#800080' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#800080' }}>Quality Properties</h3>
              <p className="text-gray-600">
                We carefully curate and verify all properties to ensure you get the best quality homes.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E6B3E6' }}>
                <FaUsers className="text-2xl" style={{ color: '#800080' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#800080' }}>Expert Support</h3>
              <p className="text-gray-600">
                Our experienced team provides personalized support throughout your property journey.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#E6B3E6' }}>
                <FaHandshake className="text-2xl" style={{ color: '#800080' }} />
              </div>
              <h3 className="text-xl font-semibold mb-3" style={{ color: '#800080' }}>Trusted Service</h3>
              <p className="text-gray-600">
                With years of experience, we've built a reputation for reliability and transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16" style={{ backgroundColor: '#800080' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Perfect Home?</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their dream properties with us.
          </p>
          <div className="space-x-4">
            <a
              href="/properties"
              className="inline-block bg-white text-purple-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              Browse Properties
            </a>
            <a
              href="/contact"
              className="inline-block border-2 border-white text-white font-semibold px-8 py-3 rounded-lg hover:bg-white hover:text-purple-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage