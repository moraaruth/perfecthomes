import logo from '@/assets/images/logo.jpg';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gray-200 py-4 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
       
        <div className="text-center">
          <p className="text-sm text-gray-500 mt-2">
            &copy; 2024 Perfecthomes. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
