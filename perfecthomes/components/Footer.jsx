import logo from '@/assets/images/logo.jpg';
import Image from 'next/image';

const Footer = () => {
    return (
        <footer class="bg-gray-200 py-4 mt-auto">
        <div
          class="container mx-auto flex flex-col md:flex-row items-center justify-between px-4"
        >
          <div class="mb-4 md:mb-0">
          <Image className='h-10 w-auto' src={logo} alt='Perfect homes' />
          </div>
          <div
            class="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0"
          >
            <ul class="flex space-x-4">
              <li><a href="/properties.html">Properties</a></li>
              <li><a href="/terms.html">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <p class="text-sm text-gray-500 mt-2 md:mt-0">
              &copy; 2024 PerfectHomes. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

    )
}

export default Footer;