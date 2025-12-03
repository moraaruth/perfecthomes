import logo from '@/assets/images/logo.jpg';
import Image from 'next/image';
import { FaPhone, FaMapMarkerAlt, FaFacebook, FaTiktok, FaTwitter, FaLinkedin, FaYoutube, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="text-white py-16 mt-auto" style={{ backgroundColor: '#800080' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Image 
                className="h-12 w-12 rounded-full" 
                src={logo} 
                alt="Perfect Homes" 
              />
              <h3 className="text-2xl font-bold ml-3">Perfect Homes</h3>
            </div>
            <p className="text-purple-100 mb-6 max-w-md">
              Your trusted partner in finding the perfect home. We connect property seekers 
              with their dream homes across Kenya with professional service and expertise.
            </p>
            <div className="flex space-x-4">
              {/* <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-purple-200 hover:text-white transition-colors">
                <FaLinkedin size={24} />
              </a> */}
               <a
                            href="https://www.facebook.com/share/14NMtbUgq4a/?mibextid=wwXIfr"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFacebook className="text-white hover:text-blue-500 cursor-pointer" size={24} />
                          </a>
              
                          {/* <FaTiktok className="text-white hover:text-pink-500 cursor-pointer" size={24} /> */}
                          {/* <FaTwitter className="text-white hover:text-blue-400 cursor-pointer" />
                          <FaLinkedin className="text-white hover:text-blue-600 cursor-pointer" /> */}
                          <FaYoutube className="text-white hover:text-red-500 cursor-pointer" size={24} />
                          <a
                            href="https://wa.me/message/3PCINZDAGWVIH1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaWhatsapp className="text-green-500 hover:text-green-700 cursor-pointer" size={24}/>
                          </a>
              
                          {/* <FaInstagram className="text-white hover:text-pink-400 cursor-pointer" /> */}
                          <a
                            href="https://www.instagram.com/kenya_perfect_homes?igsh=dG9wZWF3NnF1ajZj&utm_source=qr"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaInstagram className="text-white hover:text-pink-400 cursor-pointer" size={24} />
                          </a>
                          <a
                            href="https://www.tiktok.com/@perfecthomes_1?_t=ZM-90dzr7MlxZA&_r=1"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaTiktok className="text-white hover:text-pink-500 cursor-pointer" size={24} />
                          </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-purple-200 hover:text-white transition-colors">Home</a></li>
              <li><a href="/about" className="text-purple-200 hover:text-white transition-colors">About Us</a></li>
              <li><a href="/properties" className="text-purple-200 hover:text-white transition-colors">Properties</a></li>
              <li><a href="/book-view" className="text-purple-200 hover:text-white transition-colors">Book For View</a></li>
              <li><a href="/contact" className="text-purple-200 hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center">
                <FaPhone className="mr-3 text-purple-200" />
                <span className="text-purple-100">0701029158</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-purple-200" />
                <span className="text-purple-100">phomeskenya@gmail.com</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-3 text-purple-200" />
                <span className="text-purple-100">Westlands, Nairobi</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-400 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-purple-200 text-sm">
              &copy; 2025 Perfect Homes. All rights reserved.
            </p>
            {/* <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-purple-200 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-purple-200 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-purple-200 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;