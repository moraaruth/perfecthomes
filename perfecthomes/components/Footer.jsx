import logo from '@/assets/images/logo.jpg';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 space-y-4 md:space-y-0">
        
        {/* Logo, Contact Us, Phone Number, and Email */}
        <div className="flex flex-col items-center md:flex-row md:space-x-4 text-center">
         
          <a href="/contact" className="text-blue-500 hover:underline">
            Contact Us
          </a>
          <span className="text-gray-700 hidden md:inline">|</span> {/* Divider only for large screens */}
          <p className="text-gray-700">Phone: (123) 456-7890</p>
          <span className="text-gray-700 hidden md:inline">|</span> {/* Divider only for large screens */}
          <p className="text-gray-700">Email: info@perfecthomes.com</p>
        </div>

        {/* Copyright */}
        <div className="text-center mt-2">
          <p className="text-sm text-gray-500">
            &copy; 2024 Perfecthomes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
