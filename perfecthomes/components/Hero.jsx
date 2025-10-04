'use client'
import PropertySearchForm from './PropertySearchForm'
import { useState, useEffect } from 'react'
import c2Image from '@/assets/images/c2.jpg'
import c3Image from '@/assets/images/c3.jpg'
import c4Image from '@/assets/images/c4.jpg'

const Hero = () => {
  const images = [c2Image, c3Image, c4Image, c2Image]
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${images[currentImageIndex].src})`
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl drop-shadow-lg">
          Find The Perfect Home
        </h1>
        <p className="my-6 text-xl text-white drop-shadow-md">
          Discover the perfect property that suits your needs.
        </p>

        <PropertySearchForm />
      </div>
    </section>
  )
}
export default Hero
