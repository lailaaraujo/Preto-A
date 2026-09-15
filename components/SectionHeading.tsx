import Reveal from './Reveal'

export default function SectionHeading({
  eyebrow,
  title,
  align = 'left'
}: {
  eyebrow: string
  title?: string
  align?: 'left' | 'center'
}) {
  return (
    <Reveal>
      <div className={align === 'center' ? 'text-center' : 'text-left'}>
        <h2 className="font-scratch text-4xl sm:text-5xl md:text-6xl tracking-wide text-bone">
          {eyebrow}
        </h2>
        {title && (
          <p className="mt-3 text-lg sm:text-xl text-bone/90 font-light max-w-2xl">
            {title}
          </p>
        )}
      </div>
    </Reveal>
  )
}
