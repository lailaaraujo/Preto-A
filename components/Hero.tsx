'use client'

import { motion } from 'framer-motion'

export default function Hero({ handle, backgroundImage }: { handle: string; backgroundImage: string }) {
  return (
    <section id="topo" className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-denim-950">
      <motion.img
        src={backgroundImage}
        alt="PretoÁ"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-3 sm:inset-6 border-2 border-bone/85 pointer-events-none" />

      <motion.p
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute left-[9%] bottom-[31%] sm:bottom-[33%] text-denim-950 text-sm sm:text-lg font-medium tracking-wide"
      >
        {handle}
      </motion.p>

      <motion.a
        href="#marca"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.1, duration: 0.6 }, y: { repeat: Infinity, duration: 1.8 } }}
        className="absolute bottom-6 sm:bottom-9 left-1/2 -translate-x-1/2 text-bone/80 text-sm flex flex-col items-center gap-2"
      >
        <span>role para ver</span>
        <span className="text-xl">↓</span>
      </motion.a>
    </section>
  )
}
