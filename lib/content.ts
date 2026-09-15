import { promises as fs } from 'fs'
import path from 'path'

const contentPath = path.join(process.cwd(), 'data', 'content.json')

export type Person = {
  name: string
  bio: string
}

export type SiteContent = {
  hero: { handle: string; backgroundImage: string }
  brand: {
    eyebrow: string
    subtitle: string
    paragraphs: string[]
    backgroundImage: string
    galleryImage: string
  }
  designer: {
    eyebrow: string
    name: string
    backgroundImage: string
    bio: string[]
    galleryImage: string
  }
  landmark: {
    eyebrow: string
    title: string
    paragraphs: string[]
    backgroundImage: string
    galleryImage: string
  }
  wearers: {
    eyebrow: string
    intro: string
    backgroundImage: string
    galleryImage: string
    people: Person[]
  }
  impact: { eyebrow: string; image: string }
  contact: {
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
  closing: { tagline: string; backgroundImage: string }
}

export async function getContent(): Promise<SiteContent> {
  const raw = await fs.readFile(contentPath, 'utf-8')
  return JSON.parse(raw) as SiteContent
}

export async function saveContent(content: SiteContent): Promise<void> {
  await fs.writeFile(contentPath, JSON.stringify(content, null, 2), 'utf-8')
}
