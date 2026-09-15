import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { EmailIcon } from './icons'

type ContactProps = {
  eyebrow: string
  instagramHandle: string
  instagramUrl: string
  instagramIcon: string
  whatsappNumber: string
  whatsappUrl: string
  whatsappIcon: string
  email: string
  note: string
}

export default function Contact({
  eyebrow,
  instagramHandle,
  instagramUrl,
  instagramIcon,
  whatsappNumber,
  whatsappUrl,
  whatsappIcon,
  email,
  note
}: ContactProps) {
  return (
    <section id="contato" className="relative denim-surface py-20 sm:py-28 px-5 sm:px-8 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <SectionHeading eyebrow={eyebrow} />

        <Reveal delay={0.1}>
          <div className="mt-12 flex flex-wrap gap-10 sm:gap-16">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <span className="w-24 h-24 block group-hover:scale-105 transition-transform">
                <img src={instagramIcon} alt="Instagram" className="w-full h-full object-contain" />
              </span>
              <span className="text-sm text-bone/90">{instagramHandle}</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <span className="w-24 h-24 block group-hover:scale-105 transition-transform">
                <img src={whatsappIcon} alt="WhatsApp" className="w-full h-full object-contain" />
              </span>
              <span className="text-sm text-bone/90">{whatsappNumber}</span>
            </a>

            <a
              href={`mailto:${email}`}
              className="group flex flex-col items-center gap-3"
            >
              <span className="w-24 h-24 rounded-full bg-gradient-to-br from-denim-500 to-denim-800 border border-bone/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                <EmailIcon className="w-9 h-9 text-bone" />
              </span>
              <span className="text-sm text-bone/90">{email}</span>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.2} className="mt-12">
          <div className="stitch-frame bg-denim-900/60 p-6 sm:p-8 text-bone/90 text-sm sm:text-base leading-relaxed">
            {note}
          </div>
        </Reveal>

        <Reveal delay={0.3} className="mt-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 border-2 border-bone text-bone hover:bg-bone hover:text-denim-950 transition-colors text-sm tracking-wide"
          >
            SOLICITAR ORÇAMENTO
          </a>
        </Reveal>
      </div>
    </section>
  )
}
