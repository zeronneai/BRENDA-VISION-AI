import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import BottomNav from './BottomNav'

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

const pageTransition = {
  duration: 0.25,
  ease: 'easeInOut'
}

export default function Layout() {
  const location = useLocation()

  return (
    <div className="app-container">
      {/* Ambient background orbs */}
      <div className="orb orb-pink w-64 h-64 -top-20 -right-20 opacity-40 pointer-events-none" />
      <div className="orb orb-purple w-80 h-80 -bottom-20 -left-20 opacity-30 pointer-events-none" />

      {/* Page content */}
      <div className="page-content scroll-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            className="min-h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}
