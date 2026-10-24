import { useCallback, useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import Intro from './components/Intro.jsx'
import About from './components/About.jsx'
import BookVisit from './components/BookVisit.jsx'
import Services from './components/Services.jsx'
import Whitening from './components/Whitening.jsx'
import Team from './components/Team.jsx'
import Testimonials from './components/Testimonials.jsx'
import Schedule from './components/Schedule.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import BookingModal from './components/BookingModal.jsx'

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false)
  const openBooking = useCallback(() => setBookingOpen(true), [])
  const closeBooking = useCallback(() => setBookingOpen(false), [])

  return (
    <div className="site">
      <Nav onBook={openBooking} />
      <main>
        <Hero onBook={openBooking} />
        <Intro />
        <About />
        <BookVisit />
        <Services />
        <Whitening onBook={openBooking} />
        <Team />
        <Testimonials />
        <Schedule onBook={openBooking} />
      </main>
      <Footer />
      <WhatsAppButton />
      {bookingOpen && <BookingModal onClose={closeBooking} />}
    </div>
  )
}
