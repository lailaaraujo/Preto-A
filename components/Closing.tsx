'use client'

import { motion } from 'framer-motion'

export default function Closing({ tagline, backgroundImage }: { tagline: string; backgroundImage: string }) {
  return (
    <section className="relative py-16 sm:py-24 px-5 sm:px-8 bg-denim-950 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto relative"
      >
        <img src={backgroundImage} alt="PretoÁ" className="w-full h-auto" />
        <p className="font-scratch absolute left-1/2 -translate-x-1/2 bottom-[9%] sm:bottom-[11%] text-bone text-base sm:text-2xl text-center whitespace-pre-line leading-tight w-full px-6">
          {tagline}
        </p>
      </motion.div>

      <p className="mt-14 text-center text-xs text-bone/40">
        © {new Date().getFullYear()} PretoÁ — todos os direitos reservados
      </p>
    </section>
  )
}
