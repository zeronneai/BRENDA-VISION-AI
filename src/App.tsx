import { ToastProvider } from './components/Toast'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import StatsBar from './sections/StatsBar'

export default function App() {
  return (
    <ToastProvider>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
      </main>
    </ToastProvider>
  )
}
