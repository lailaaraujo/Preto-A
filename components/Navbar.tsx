'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#marca', label: 'A Marca' },
  { href: '#designer', label: 'O Designer' },
  { href: '#marco', label: 'O Marco' },
  { href: '#veste', label: 'Quem Veste' },
  { href: '#contato', label: 'Contato' }
]

export default function Navbar({ whatsappUrl }: { whatsappUrl: string }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 overflow-x-clip transition-colors duration-300 ${
        scrolled ? 'bg-denim-950/90 backdrop-blur-sm border-b border-bone/10' : 'bg-transparent'
      }`}
    >
      <nav className="w-full max-w-6xl mx-auto px-5 sm:px-8 min-h-[5rem] py-3 flex items-center justify-between gap-4">
        <a href="#topo" className="font-scratch text-2xl tracking-wide text-bone shrink-0">
          PRETOA
        </a>

        <div className="hidden xl:flex items-center gap-6 xl:gap-8 min-w-0">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-bone/80 hover:text-bone transition-colors whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm px-4 py-2.5 border border-bone/60 text-bone hover:bg-bone hover:text-denim-950 transition-colors whitespace-nowrap shrink-0"
          >
            Falar no WhatsApp
          </a>
        </div>

        <button
          aria-label="Abrir menu"
          onClick={() => setOpen(!open)}
          className="xl:hidden w-9 h-9 flex flex-col justify-center items-center gap-1.5 shrink-0"
        >
          <span className={`block h-[1.5px] w-6 bg-bone transition-transform ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-[1.5px] w-6 bg-bone transition-opacity ${open ? 'opacity-0' : ''}`} />
          <span className={`block h-[1.5px] w-6 bg-bone transition-transform ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden bg-denim-950/95 backdrop-blur-sm border-b border-bone/10 overflow-hidden"
          >
            <div className="flex flex-col px-5 py-4 gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-base text-bone/90"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-base px-4 py-2.5 border border-bone/60 text-bone text-center"
              >
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
