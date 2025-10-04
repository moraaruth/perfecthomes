'use client'
import { FaPhone, FaMapMarkerAlt, FaFacebook, FaTiktok, FaTwitter, FaLinkedin, FaYoutube, FaInstagram } from 'react-icons/fa'

const TopBanner = () => {
  return (
    <div className="bg-gray-800 text-white py-3 px-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between text-sm">
        {/* Left side - Contact info */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <FaPhone className="text-white" />
            <span>+254701029158</span>
          </div>
          <div className="flex items-center space-x-2">
            <FaMapMarkerAlt className="text-white" />
            <span>Westland</span>
          </div>
        </div>

        {/* Right side - Social media */}
        <div className="flex items-center space-x-4">
          <span>Follow us on:</span>
          <div className="flex items-center space-x-3">
            <FaFacebook className="text-white hover:text-blue-500 cursor-pointer" />
            <FaTiktok className="text-white hover:text-pink-500 cursor-pointer" />
            <FaTwitter className="text-white hover:text-blue-400 cursor-pointer" />
            <FaLinkedin className="text-white hover:text-blue-600 cursor-pointer" />
            <FaYoutube className="text-white hover:text-red-500 cursor-pointer" />
            <FaInstagram className="text-white hover:text-pink-400 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBanner