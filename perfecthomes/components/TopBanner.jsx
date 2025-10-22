'use client'
import { FaPhone, FaMapMarkerAlt, FaFacebook, FaTiktok, FaTwitter, FaLinkedin, FaYoutube, FaInstagram, FaWhatsapp } from 'react-icons/fa'

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
            <span>Westlands</span>
          </div>
        </div>

        {/* Right side - Social media */}
        <div className="flex items-center space-x-4">
          <span>Follow us:</span>
          <div className="flex items-center space-x-3">
            <a
              href="https://www.facebook.com/share/14NMtbUgq4a/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-white hover:text-blue-500 cursor-pointer" />
            </a>

            {/* <FaTiktok className="text-white hover:text-pink-500 cursor-pointer" /> */}
            {/* <FaTwitter className="text-white hover:text-blue-400 cursor-pointer" />
            <FaLinkedin className="text-white hover:text-blue-600 cursor-pointer" /> */}
            <FaYoutube className="text-white hover:text-red-500 cursor-pointer" />
            <a
              href="https://wa.me/message/3PCINZDAGWVIH1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="text-white hover:text-green-700 cursor-pointer" />
            </a>

            {/* <FaInstagram className="text-white hover:text-pink-400 cursor-pointer" /> */}
            <a
              href="https://www.instagram.com/kenya_perfect_homes?igsh=dG9wZWF3NnF1ajZj&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-white hover:text-pink-400 cursor-pointer" />
            </a>
            <a
              href="https://www.tiktok.com/@perfecthomes_1?_t=ZM-90dzr7MlxZA&_r=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok className="text-white hover:text-pink-500 cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBanner