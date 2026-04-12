import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, Dumbbell, Sparkles, Apple, User } from 'lucide-react'
import { useApp } from '../context/AppContext'

const navItems = [
  { path: '/', icon: Home, label: 'Inicio' },
  { path: '/training', icon: Dumbbell, label: 'Rutinas' },
  { path: '/ai', icon: Sparkles, label: 'Brenda IA', isCenter: true },
  { path: '/nutrition', icon: Apple, label: 'Nutrición' },
  { path: '/profile', icon: User, label: 'Perfil' },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setActiveTab } = useApp()

  const handleNav = (item) => {
    navigate(item.path)
    setActiveTab(item.path.replace('/', '') || 'home')
  }

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around h-full px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path))

          if (item.isCenter) {
            return (
              <button
                key={item.path}
                onClick={() => handleNav(item)}
                className="flex flex-col items-center gap-0.5 relative -mt-4"
              >
                <motion.div
                  whileTap={{ scale: 0.92 }}
                  className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-brand glow-pink-lg'
                      : 'bg-gradient-brand opacity-90'
                  }`}
                  style={{
                    boxShadow: isActive
                      ? '0 0 30px rgba(255, 20, 147, 0.6), 0 4px 20px rgba(0,0,0,0.4)'
                      : '0 0 20px rgba(255, 20, 147, 0.35), 0 4px 20px rgba(0,0,0,0.3)'
                  }}
                >
                  <Icon
                    size={22}
                    className="text-white"
                    fill={isActive ? 'white' : 'none'}
                  />
                </motion.div>
                <span className={`text-[9px] font-semibold tracking-wide ${isActive ? 'text-brand-pink' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </button>
            )
          }

          return (
            <button
              key={item.path}
              onClick={() => handleNav(item)}
              className="flex flex-col items-center gap-0.5 min-w-[48px]"
            >
              <motion.div
                whileTap={{ scale: 0.88 }}
                className="relative flex flex-col items-center gap-0.5"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-card'
                    : 'bg-transparent'
                }`}>
                  <Icon
                    size={20}
                    className={`transition-colors duration-200 ${
                      isActive ? 'text-brand-pink' : 'text-gray-500'
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                </div>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="w-4 h-0.5 rounded-full bg-gradient-brand"
                    transition={{ duration: 0.25 }}
                  />
                )}
                {!isActive && <div className="w-4 h-0.5" />}
                <span className={`text-[9px] font-semibold tracking-wide ${isActive ? 'text-brand-pink' : 'text-gray-600'}`}>
                  {item.label}
                </span>
              </motion.div>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
