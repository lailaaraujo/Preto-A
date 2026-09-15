'use client'

import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

type BrandProps = {
  eyebrow: string
  subtitle: string
  paragraphs: string[]
  backgroundImage: string
  galleryImage: string
}

export default function Brand({ eyebrow, subtitle, paragraphs, backgroundImage, galleryImage }: BrandProps) {
  return (
    <section id="marca" className="relative">
      <div
        className="section-photo py-20 sm:py-28 px-5 sm:px-8"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="max-w-6xl mx-auto relative">
          <SectionHeading eyebrow={eyebrow} title={subtitle} />

          <Reveal delay={0.15} className="mt-8">
            <div className="stitch-frame bg-denim-950/50 p-6 sm:p-10">
              {paragraphs.map((p, i) => (
                <p key={i} className="text-bone/90 leading-relaxed mb-4 last:mb-0 text-sm sm:text-base">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      <motion.img
        src={galleryImage}
        alt="Looks PretoÁ"
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-auto block"
      />
    </section>
  )
}
