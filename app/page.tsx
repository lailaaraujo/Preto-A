import { getContent } from '@/lib/content'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Brand from '@/components/Brand'
import Designer from '@/components/Designer'
import Landmark from '@/components/Landmark'
import Wearers from '@/components/Wearers'
import Impact from '@/components/Impact'
import Contact from '@/components/Contact'
import Closing from '@/components/Closing'

export default async function Home() {
  const content = await getContent()

  return (
    <main>
      <Navbar whatsappUrl={content.contact.whatsappUrl} />
      <Hero handle={content.hero.handle} backgroundImage={content.hero.backgroundImage} />
      <Brand
        eyebrow={content.brand.eyebrow}
        subtitle={content.brand.subtitle}
        paragraphs={content.brand.paragraphs}
        backgroundImage={content.brand.backgroundImage}
        galleryImage={content.brand.galleryImage}
      />
      <Designer
        eyebrow={content.designer.eyebrow}
        name={content.designer.name}
        backgroundImage={content.designer.backgroundImage}
        bio={content.designer.bio}
        galleryImage={content.designer.galleryImage}
      />
      <Landmark
        eyebrow={content.landmark.eyebrow}
        title={content.landmark.title}
        paragraphs={content.landmark.paragraphs}
        backgroundImage={content.landmark.backgroundImage}
        galleryImage={content.landmark.galleryImage}
      />
      <Wearers
        eyebrow={content.wearers.eyebrow}
        intro={content.wearers.intro}
        backgroundImage={content.wearers.backgroundImage}
        galleryImage={content.wearers.galleryImage}
        people={content.wearers.people}
      />
      <Impact
        eyebrow={content.impact.eyebrow}
        image={content.impact.image}
        instagramUrl={content.contact.instagramUrl}
      />
      <Contact
        eyebrow={content.contact.eyebrow}
        instagramHandle={content.contact.instagramHandle}
        instagramUrl={content.contact.instagramUrl}
        instagramIcon={content.contact.instagramIcon}
        whatsappNumber={content.contact.whatsappNumber}
        whatsappUrl={content.contact.whatsappUrl}
        whatsappIcon={content.contact.whatsappIcon}
        email={content.contact.email}
        note={content.contact.note}
      />
      <Closing tagline={content.closing.tagline} backgroundImage={content.closing.backgroundImage} />
    </main>
  )
}

export const dynamic = 'force-dynamic'
