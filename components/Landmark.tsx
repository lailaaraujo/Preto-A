'use client'

import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

type LandmarkProps = {
  eyebrow: string
  title: string
  paragraphs: string[]
  backgroundImage: string
  galleryImage: string
}

export default function Landmark({ eyebrow, title, paragraphs, backgroundImage, galleryImage }: LandmarkProps) {
  return (
    <section id="marco" className="relative">
      <div
        className="section-photo py-20 sm:py-28 px-5 sm:px-8"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="max-w-5xl mx-auto relative">
          <SectionHeading eyebrow={eyebrow} title={title} />

          <Reveal delay={0.15} className="mt-8">
            <div className="stitch-frame bg-denim-950/55 p-6 sm:p-10 max-w-3xl mx-auto text-center sm:text-left">
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
        alt="Manifashion PretoÁ"
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-auto block"
      />
    </section>
  )
}
