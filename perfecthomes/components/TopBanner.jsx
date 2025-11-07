'use client'
import { FaPhone, FaMapMarkerAlt, FaFacebook, FaTiktok, FaTwitter, FaLinkedin, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa'

const TopBanner = () => {
  return (
    <div className="bg-gray-800 text-white py-2 px-2 sm:py-3 sm:px-4">
      <div className="mx-auto max-w-7xl flex items-center justify-between text-xs sm:text-sm">
        {/* Left side - Contact info */}
        <div className="flex items-center space-x-2 sm:space-x-6">
          <div className="flex items-center space-x-1 sm:space-x-2">
            <FaPhone className="text-white text-xs sm:text-sm" />
            <span className="hidden sm:inline">+254701029158</span>
            <span className="sm:hidden">Call</span>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <FaMapMarkerAlt className="text-white text-xs sm:text-sm" />
            <span>Westlands</span>
          </div>
        </div>

        {/* Right side - Social media */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="hidden sm:inline">Follow us:</span>
          <span className="sm:hidden text-xs">Follow:</span>
          <div className="flex items-center space-x-2 sm:space-x-3">
            <a
              href="https://www.facebook.com/share/14NMtbUgq4a/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-white hover:text-blue-500 cursor-pointer text-sm sm:text-base" />
            </a>
            <FaYoutube className="text-white hover:text-red-500 cursor-pointer text-sm sm:text-base" />
            <a
              href="https://wa.me/message/3PCINZDAGWVIH1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-white hover:text-green-700 cursor-pointer text-sm sm:text-base" />
            </a>
            <a
              href="https://www.instagram.com/kenya_perfect_homes?igsh=dG9wZWF3NnF1ajZj&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-white hover:text-pink-400 cursor-pointer text-sm sm:text-base" />
            </a>
            <a
              href="https://www.tiktok.com/@perfecthomes_1?_t=ZM-90dzr7MlxZA&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="text-white hover:text-pink-500 cursor-pointer text-sm sm:text-base" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBanner