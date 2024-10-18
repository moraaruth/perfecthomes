import PropertySearchForm from './PropertySearchForm'

const Hero = () => {
  return (
    <section
      className="py-5 mb-4 bg-blue-700" // Retain bg-blue-700 as a fallback
   
    >
      <div className=" bg-black-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          Find The Perfect Home
        </h1>
        <p className="my-2 text-xl text-white">
          Discover the perfect property that suits your needs.
        </p>

        <PropertySearchForm />
      </div>
    </section>
  )
}
export default Hero
