import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/infoBoxes";
import Footer from "@/components/Footer";
import connectDB from "@/config/database";



const HomePage = async () => {
  await connectDB();
    return <>
      <Navbar />
        <Hero />      
        <InfoBoxes />
        <HomeProperties />
        
      <Footer />
       
    </>
}

export default HomePage;