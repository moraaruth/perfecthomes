import logo from '@/assets/images/logo.jpg';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-6 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        {/* Logo, Contact Us, Phone Number, and Email */}
        <div className="flex items-center space-x-4">
          <Image 
            src={logo} 
            alt="Perfecthomes Logo" 
            width={40} 
            height={40} 
            className="rounded-full" // Makes the logo round
          />
          <a href="/contact" className="text-blue-500 hover:underline">
            Contact Us
          </a>
          <span className="text-gray-700">|</span> {/* Divider */}
          <p className="text-gray-700">Phone: 254701029158 </p>
          <span className="text-gray-700">|</span> {/* Divider */}
          <p className="text-gray-700">Email: mnjosiah@gmail.com</p>
        </div>

        {/* Copyright */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            &copy; 2024 Perfecthomes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
