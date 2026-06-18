import { ToastProvider } from './components/Toast'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import StatsBar from './sections/StatsBar'
import HowItWorks from './sections/HowItWorks'
import Screenshots from './sections/Screenshots'
import Premium from './sections/Premium'
import Pricing from './sections/Pricing'
import Testimonials from './sections/Testimonials'
import Faq from './sections/Faq'

export default function App() {
  return (
    <ToastProvider>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <HowItWorks />
        <Screenshots />
        <Premium />
        <Pricing />
        <Testimonials />
        <Faq />
      </main>
    </ToastProvider>
  )
}
