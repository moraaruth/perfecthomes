'use client'
import PropertySearchForm from './PropertySearchForm'
import { useState, useEffect } from 'react'

const Hero = () => {
  const images = [
    'https://images.unsplash.com/photo-1544984243-ec57ea16fe25?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2058&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80'
  ]
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center transition-all duration-1000"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${images[currentImageIndex]})`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="bg-black bg-opacity-30 backdrop-blur-sm rounded-2xl p-8 mb-8">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl drop-shadow-2xl">
            Find Where You Belong
          </h1>
          <p className="my-6 text-xl text-white drop-shadow-lg">
            Let's find you a perfect home.
          </p>
        </div>

        <PropertySearchForm />
      </div>
    </section>
  )
}
export default Hero
