'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import logo from '@/assets/images/logo.jpg'
import profileDefault from '@/assets/images/profile.png'
import { FaGoogle } from 'react-icons/fa'
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'
import UnreadMessageCount from './UnreadMessageCount';

const Navbar = () => {
  const { data: session, status } = useSession()
  const profileImage = session?.user?.image
  
  // Admin emails list
  const adminEmails = ['mnjosiah@gmail.com', 'iammoraaruth@gmail.com'] 
  const isAdmin = session?.user?.email && adminEmails.includes(session.user.email)

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [providers, setProviders] = useState(null)

  const pathname = usePathname()

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders()
      setProviders(res)
    }

    setAuthProviders()
  }, [])

  // Debug logging
  useEffect(() => {
    console.log('Session:', session)
    console.log('Session status:', status)
    console.log('User email:', session?.user?.email)
  }, [session, status])

  // Prevent render if session is loading
  if (status === 'loading') {
    return (
      <nav className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div>Loading...</div>
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>

          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <Link className="flex flex-shrink-0 items-center" href="/">
              <Image 
              className="h-10 w-auto" 
              src={logo} 
              alt="Perfecthomes" 
              style={{ borderRadius: '50%' }}
              />

              <span className="hidden md:block text-2xl font-bold ml-2" style={{ color: '#800080' }}>
                Perfect Home
              </span>
            </Link>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className="hidden lg:ml-6 lg:block">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  className={`${
                    pathname === '/' ? 'text-white' : 'hover:text-white'
                  } rounded-md px-3 py-2`}
                  style={{
                    color: pathname === '/' ? 'white' : '#800080',
                    backgroundColor: pathname === '/' ? '#800080' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== '/') {
                      e.target.style.backgroundColor = '#800080'
                      e.target.style.color = 'white'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== '/') {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#800080'
                    }
                  }}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className={`${
                    pathname === '/about' ? 'text-white' : 'hover:text-white'
                  } rounded-md px-3 py-2`}
                  style={{
                    color: pathname === '/about' ? 'white' : '#800080',
                    backgroundColor: pathname === '/about' ? '#800080' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== '/about') {
                      e.target.style.backgroundColor = '#800080'
                      e.target.style.color = 'white'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== '/about') {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#800080'
                    }
                  }}
                >
                  About Us
                </Link>
                <Link
                  href="/properties"
                  className={`${
                    pathname === '/properties' ? 'text-white' : 'hover:text-white'
                  } rounded-md px-3 py-2`}
                  style={{
                    color: pathname === '/properties' ? 'white' : '#800080',
                    backgroundColor: pathname === '/properties' ? '#800080' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== '/properties') {
                      e.target.style.backgroundColor = '#800080'
                      e.target.style.color = 'white'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== '/properties') {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#800080'
                    }
                  }}
                >
                  Properties
                </Link>
                <Link
                  href="/book-view"
                  className={`${
                    pathname === '/book-view' ? 'text-white' : 'hover:text-white'
                  } rounded-md px-3 py-2`}
                  style={{
                    color: pathname === '/book-view' ? 'white' : '#800080',
                    backgroundColor: pathname === '/book-view' ? '#800080' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== '/book-view') {
                      e.target.style.backgroundColor = '#800080'
                      e.target.style.color = 'white'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== '/book-view') {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#800080'
                    }
                  }}
                >
                  Book For View
                </Link>
                <Link
                  href="/contact"
                  className={`${
                    pathname === '/contact' ? 'text-white' : 'hover:text-white'
                  } rounded-md px-3 py-2`}
                  style={{
                    color: pathname === '/contact' ? 'white' : '#800080',
                    backgroundColor: pathname === '/contact' ? '#800080' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (pathname !== '/contact') {
                      e.target.style.backgroundColor = '#800080'
                      e.target.style.color = 'white'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (pathname !== '/contact') {
                      e.target.style.backgroundColor = 'transparent'
                      e.target.style.color = '#800080'
                    }
                  }}
                >
                  Contact Us
                </Link>
              
                {isAdmin && (
                  <Link
                    href="/properties/add"
                    className={`${
                      pathname === '/properties/add' ? 'text-white' : 'hover:text-white'
                    } rounded-md px-3 py-2`}
                    style={{
                      color: pathname === '/properties/add' ? 'white' : '#800080',
                      backgroundColor: pathname === '/properties/add' ? '#800080' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (pathname !== '/properties/add') {
                        e.target.style.backgroundColor = '#800080'
                        e.target.style.color = 'white'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (pathname !== '/properties/add') {
                        e.target.style.backgroundColor = 'transparent'
                        e.target.style.color = '#800080'
                      }
                    }}
                  >
                    Add Property
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* <!-- Right Side Menu (Logged Out) --> */}
          {!session && (
            <div className="hidden lg:block lg:ml-6">
              <div className="flex items-center">
                {providers &&
                  Object.values(providers).map((provider, index) => (
                    <button
                      onClick={() => signIn(provider.id)}
                      key={index}
                      className="flex items-center text-white rounded-md px-3 py-2"
                      style={{ backgroundColor: '#800080' }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#660066'
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#800080'
                      }}
                    >
                      {/* <FaGoogle className="text-white mr-2" /> */}
                      <span>P</span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* <!-- Right Side Menu (Logged In) --> */}
          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
              <Link href="/messages" className="relative group">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">View notifications</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <UnreadMessageCount session={session} />
              </Link>
              {/* <!-- Profile dropdown button --> */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded={isProfileMenuOpen}
                    aria-haspopup="true"
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    <Image
                      className="h-8 w-8 rounded-full"
                      src={profileImage || profileDefault}
                      alt=""
                      width={40}
                      height={40}
                    />
                  </button>
                </div>

                {/* <!-- Profile dropdown --> */}
                {isProfileMenuOpen && (
                  <div
                    id="user-menu"
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                      }}
                    >
                      Your Profile
                    </Link>
                    <Link
                      href="/properties/saved"
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                      }}
                    >
                      Saved Properties
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileMenuOpen(false)
                        signOut()
                      }}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {isMobileMenuOpen && (
        <div id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              className={`block rounded-md px-3 py-2 text-base font-medium`}
              style={{
                color: pathname === '/' ? 'white' : '#800080',
                backgroundColor: pathname === '/' ? '#800080' : 'transparent'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`block rounded-md px-3 py-2 text-base font-medium`}
              style={{
                color: pathname === '/about' ? 'white' : '#800080',
                backgroundColor: pathname === '/about' ? '#800080' : 'transparent'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/properties"
              className={`block rounded-md px-3 py-2 text-base font-medium`}
              style={{
                color: pathname === '/properties' ? 'white' : '#800080',
                backgroundColor: pathname === '/properties' ? '#800080' : 'transparent'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              href="/book-view"
              className={`block rounded-md px-3 py-2 text-base font-medium`}
              style={{
                color: pathname === '/book-view' ? 'white' : '#800080',
                backgroundColor: pathname === '/book-view' ? '#800080' : 'transparent'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book For View
            </Link>
            <Link
              href="/contact"
              className={`block rounded-md px-3 py-2 text-base font-medium`}
              style={{
                color: pathname === '/contact' ? 'white' : '#800080',
                backgroundColor: pathname === '/contact' ? '#800080' : 'transparent'
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Us
            </Link>
            {isAdmin && (
              <Link
                href="/properties/add"
                className={`block rounded-md px-3 py-2 text-base font-medium`}
                style={{
                  color: pathname === '/properties/add' ? 'white' : '#800080',
                  backgroundColor: pathname === '/properties/add' ? '#800080' : 'transparent'
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Add Property
              </Link>
            )}

            {!session &&
              providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  onClick={() => {
                    signIn(provider.id)
                    setIsMobileMenuOpen(false)
                  }}
                  key={index}
                  className="flex items-center text-white rounded-md px-3 py-2 w-full"
                  style={{ backgroundColor: '#800080' }}
                >
                  {/* <FaGoogle className="text-white mr-2" /> */}
                  <span>P</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </nav>
  )
}
export default Navbar
