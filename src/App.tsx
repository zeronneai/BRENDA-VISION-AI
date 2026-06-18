import { ToastProvider } from './components/Toast'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import StatsBar from './sections/StatsBar'
import HowItWorks from './sections/HowItWorks'
import Screenshots from './sections/Screenshots'
import Premium from './sections/Premium'

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
      </main>
    </ToastProvider>
  )
}
