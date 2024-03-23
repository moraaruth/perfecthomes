import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import InfoBoxes from "@/components/infoBoxes";
import Footer from "@/components/Footer";



const HomePage = () => {
    return <>
      <Navbar />
        <Hero />      
        <InfoBoxes />
        
      <Footer />
       
    </>
}

export default HomePage;