'use client'

import { motion } from 'framer-motion'

import Reveal from './Reveal'

import SectionHeading from './SectionHeading'

type DesignerProps = {

  eyebrow: string

  name: string

  backgroundImage: string

  bio: string[]

  galleryImage: string

}

export default function Designer({ eyebrow, name, backgroundImage, bio, galleryImage }: DesignerProps) {

  return (

    <section id="designer" className="relative">

      <div

        className="section-photo py-20 sm:py-28 px-5 sm:px-8 min-h-[640px] sm:min-h-[720px] flex items-center"

        style={{ backgroundImage: `url(${backgroundImage})` }}

      >

        <div className="max-w-6xl mx-auto relative w-full">

          <SectionHeading eyebrow={eyebrow} />

          <div className="mt-8 flex justify-end">

            <div className="w-full sm:max-w-md">

              <p className="font-scratch text-xl sm:text-2xl text-bone mb-4">{name}</p>

              <Reveal delay={0.1}>

                <div className="stitch-frame bg-denim-950/55 p-6 sm:p-8">

                  {bio.map((p, i) => (

                    <p key={i} className="text-bone/90 leading-relaxed mb-4 last:mb-0 text-sm sm:text-base">

                      {p}

                    </p>

                  ))}

                </div>

              </Reveal>

            </div>

          </div>

        </div>

      </div>

      <motion.img

        src={galleryImage}

        alt="Detalhes de produção PretoÁ"

        initial={{ opacity: 0, scale: 1.04 }}

        whileInView={{ opacity: 1, scale: 1 }}

        viewport={{ once: true, amount: 0.15 }}

        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}

        className="w-full h-auto block"

      />

    </section>

  )

}