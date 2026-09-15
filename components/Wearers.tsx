'use client'

import { motion } from 'framer-motion'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import type { Person } from '@/lib/content'

type WearersProps = {
  eyebrow: string
  intro: string
  backgroundImage: string
  galleryImage: string
  people: Person[]
}

export default function Wearers({ eyebrow, intro, backgroundImage, galleryImage, people }: WearersProps) {
  return (
    <section id="veste" className="relative">
      <div
        className="section-photo py-20 sm:py-28 px-5 sm:px-8"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="max-w-6xl mx-auto relative">
          <SectionHeading eyebrow={eyebrow} />

          <Reveal delay={0.1} className="mt-8">
            <div className="stitch-frame bg-denim-950/55 p-6 sm:p-10 max-w-2xl ml-auto text-sm sm:text-base text-bone/90 leading-relaxed">
              {intro}
            </div>
          </Reveal>
        </div>
      </div>

      <motion.img
        src={galleryImage}
        alt="Artistas que vestem PretoÁ"
        initial={{ opacity: 0, scale: 1.04 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-auto block"
      />

      <div className="denim-surface px-5 sm:px-8 py-14">
        <div className="max-w-6xl mx-auto grid sm:grid-cols-3 gap-8">
          {people.map((person, i) => (
            <Reveal key={person.name} delay={0.08 * i}>
              <div className="text-center sm:text-left">
                <p className="font-scratch text-xl text-bone">{person.name}</p>
                <p className="mt-2 text-sm text-bone/80 leading-relaxed">{person.bio}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
