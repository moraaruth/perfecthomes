require('events').EventEmitter.defaultMaxListeners = 20;
import Hero from '@/components/Hero'
import HomeProperties from '@/components/HomeProperties'
import InfoBoxes from '@/components/infoBoxes'
import InstagramFeed from '@/components/InstagramFeed'

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
      <InstagramFeed />
    </>
  )
}

export default HomePage
