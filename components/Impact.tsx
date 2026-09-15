'use client'

import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading'

type ImpactProps = {
  eyebrow: string
  image: string
  instagramUrl: string
}

export default function Impact({ eyebrow, image, instagramUrl }: ImpactProps) {
  return (
    <section className="relative denim-surface py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionHeading eyebrow={eyebrow} />

        <motion.a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 block hover:opacity-90 transition-opacity"
        >
          <img src={image} alt="Repercussão da PretoÁ no Instagram" className="w-full h-auto" />
        </motion.a>
      </div>
    </section>
  )
}
