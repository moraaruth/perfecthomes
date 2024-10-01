import PropertySearchForm from './PropertySearchForm'

const Hero = () => {
  return (
    <section
      className="py-20 mb-4 bg-blue-700" // Retain bg-blue-700 as a fallback
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG9tZXxlbnwwfHwwfHx8MA%3D%3D")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '50vh', // Ensures the section takes up the full viewport height
      }}
    >
      <div className=" bg-black-500 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          Find The Perfect Home
        </h1>
        <p className="my-4 text-xl text-white">
          Discover the perfect property that suits your needs.
        </p>

        <PropertySearchForm />
      </div>
    </section>
  )
}
export default Hero
