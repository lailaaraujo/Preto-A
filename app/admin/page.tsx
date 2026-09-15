'use client'

import { useEffect, useState } from 'react'
import ImageUploader from '@/components/admin/ImageUploader'
import type { SiteContent } from '@/lib/content'

function Field({
  label,
  value,
  onChange,
  textarea = false
}: {
  label: string
  value: string
  onChange: (v: string) => void
  textarea?: boolean
}) {
  return (
    <label className="block">
      <span className="text-xs text-bone/60 block mb-1">{label}</span>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          className="w-full bg-denim-900 border border-bone/20 text-bone text-sm p-3 focus:outline-none focus:border-bone/60"
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-denim-900 border border-bone/20 text-bone text-sm p-3 focus:outline-none focus:border-bone/60"
        />
      )}
    </label>
  )
}

function ParagraphList({
  values,
  onChange
}: {
  values: string[]
  onChange: (v: string[]) => void
}) {
  return (
    <div className="space-y-3">
      {values.map((v, i) => (
        <div key={i} className="flex gap-2 items-start">
          <textarea
            value={v}
            rows={3}
            onChange={(e) => {
              const next = [...values]
              next[i] = e.target.value
              onChange(next)
            }}
            className="flex-1 bg-denim-900 border border-bone/20 text-bone text-sm p-3 focus:outline-none focus:border-bone/60"
          />
          <button
            type="button"
            onClick={() => onChange(values.filter((_, idx) => idx !== i))}
            className="text-bone/50 hover:text-red-400 text-xs px-2 py-1 border border-bone/20"
          >
            remover
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...values, ''])}
        className="text-xs text-bone/70 border border-bone/30 px-3 py-1.5 hover:bg-bone/10"
      >
        + adicionar parágrafo
      </button>
    </div>
  )
}

export default function AdminPage() {
  const [checking, setChecking] = useState(true)
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)

  const [content, setContent] = useState<SiteContent | null>(null)
  const [saving, setSaving] = useState(false)
  const [savedMessage, setSavedMessage] = useState('')

  useEffect(() => {
    fetch('/api/auth/check')
      .then((r) => r.json())
      .then((data) => setAuthed(Boolean(data.authorized)))
      .finally(() => setChecking(false))
  }, [])

  useEffect(() => {
    if (authed) {
      fetch('/api/content')
        .then((r) => r.json())
        .then(setContent)
    }
  }, [authed])

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoggingIn(true)
    setLoginError('')
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Senha incorreta')
      setAuthed(true)
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : 'Erro ao entrar')
    } finally {
      setLoggingIn(false)
    }
  }

  const logout = async () => {
    await fetch('/api/logout', { method: 'POST' })
    setAuthed(false)
    setContent(null)
  }

  const save = async () => {
    if (!content) return
    setSaving(true)
    setSavedMessage('')
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })
      if (!res.ok) throw new Error('Falha ao salvar')
      setSavedMessage('Alterações salvas')
      setTimeout(() => setSavedMessage(''), 3000)
    } catch {
      setSavedMessage('Erro ao salvar, tente novamente')
    } finally {
      setSaving(false)
    }
  }

  if (checking) {
    return <div className="min-h-screen denim-surface flex items-center justify-center text-bone/60">Carregando...</div>
  }

  if (!authed) {
    return (
      <div className="min-h-screen denim-surface flex items-center justify-center px-5">
        <form onSubmit={login} className="w-full max-w-sm stitch-frame bg-denim-900/70 p-8">
          <h1 className="font-scratch text-3xl text-bone mb-1">PRETOÁ</h1>
          <p className="text-bone/60 text-sm mb-6">Área restrita ao administrador</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full bg-denim-950 border border-bone/20 text-bone text-sm p-3 mb-4 focus:outline-none focus:border-bone/60"
          />
          {loginError && <p className="text-red-400 text-xs mb-4">{loginError}</p>}
          <button
            type="submit"
            disabled={loggingIn}
            className="w-full bg-bone text-denim-950 text-sm font-medium py-3 hover:bg-bone/90 transition-colors disabled:opacity-60"
          >
            {loggingIn ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    )
  }

  if (!content) {
    return <div className="min-h-screen denim-surface flex items-center justify-center text-bone/60">Carregando conteúdo...</div>
  }

  return (
    <div className="min-h-screen denim-surface pb-32">
      <header className="sticky top-0 z-20 bg-denim-950/95 backdrop-blur border-b border-bone/10 px-5 sm:px-8 py-4 flex items-center justify-between">
        <h1 className="font-scratch text-2xl text-bone">Editar site</h1>
        <div className="flex items-center gap-3">
          <a href="/" target="_blank" className="text-xs text-bone/60 hover:text-bone underline">ver site</a>
          <button onClick={logout} className="text-xs text-bone/60 hover:text-bone">sair</button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-10 space-y-14">
        <section>
          <h2 className="font-scratch text-2xl text-bone mb-4">Capa</h2>
          <div className="space-y-4">
            <Field
              label="Handle exibido na capa"
              value={content.hero.handle}
              onChange={(v) => setContent({ ...content, hero: { ...content.hero, handle: v } })}
            />
            <ImageUploader
              label="Foto de fundo da capa"
              value={content.hero.backgroundImage}
              onChange={(url) => setContent({ ...content, hero: { ...content.hero, backgroundImage: url } })}
            />
          </div>
        </section>

        <section>
          <h2 className="font-scratch text-2xl text-bone mb-4">A Marca</h2>
          <div className="space-y-4">
            <Field
              label="Subtítulo"
              value={content.brand.subtitle}
              onChange={(v) => setContent({ ...content, brand: { ...content.brand, subtitle: v } })}
            />
            <div>
              <span className="text-xs text-bone/60 block mb-2">Parágrafos</span>
              <ParagraphList
                values={content.brand.paragraphs}
                onChange={(v) => setContent({ ...content, brand: { ...content.brand, paragraphs: v } })}
              />
            </div>
            <ImageUploader
              label="Fundo da seção"
              value={content.brand.backgroundImage}
              onChange={(url) => setContent({ ...content, brand: { ...content.brand, backgroundImage: url } })}
            />
            <ImageUploader
              label="Foto da coleção (colagem de looks)"
              value={content.brand.galleryImage}
              onChange={(url) => setContent({ ...content, brand: { ...content.brand, galleryImage: url } })}
            />
          </div>
        </section>

        <section>
          <h2 className="font-scratch text-2xl text-bone mb-4">O Designer</h2>
          <div className="space-y-4">
            <Field
              label="Nome"
              value={content.designer.name}
              onChange={(v) => setContent({ ...content, designer: { ...content.designer, name: v } })}
            />
            <div>
              <span className="text-xs text-bone/60 block mb-2">Biografia</span>
              <ParagraphList
                values={content.designer.bio}
                onChange={(v) => setContent({ ...content, designer: { ...content.designer, bio: v } })}
              />
            </div>
            <ImageUploader
              label="Foto do designer (fundo da seção)"
              value={content.designer.backgroundImage}
              onChange={(url) => setContent({ ...content, designer: { ...content.designer, backgroundImage: url } })}
            />
            <ImageUploader
              label="Foto dos detalhes de produção"
              value={content.designer.galleryImage}
              onChange={(url) => setContent({ ...content, designer: { ...content.designer, galleryImage: url } })}
            />
          </div>
        </section>

        <section>
          <h2 className="font-scratch text-2xl text-bone mb-4">O Marco</h2>
          <div className="space-y-4">
            <Field
              label="Título do evento"
              value={content.landmark.title}
              onChange={(v) => setContent({ ...content, landmark: { ...content.landmark, title: v } })}
            />
            <div>
              <span className="text-xs text-bone/60 block mb-2">Parágrafos</span>
              <ParagraphList
                values={content.landmark.paragraphs}
                onChange={(v) => setContent({ ...content, landmark: { ...content.landmark, paragraphs: v } })}
              />
            </div>
            <ImageUploader
              label="Fundo da seção"
              value={content.landmark.backgroundImage}
              onChange={(url) => setContent({ ...content, landmark: { ...content.landmark, backgroundImage: url } })}
            />
            <ImageUploader
              label="Foto do evento (colagem)"
              value={content.landmark.galleryImage}
              onChange={(url) => setContent({ ...content, landmark: { ...content.landmark, galleryImage: url } })}
            />
          </div>
        </section>

        <section>
          <h2 className="font-scratch text-2xl text-bone mb-4">Quem Veste</h2>
          <div className="space-y-4">
            <Field
              label="Texto de introdução"
              value={content.wearers.intro}
              onChange={(v) => setContent({ ...content, wearers: { ...content.wearers, intro: v } })}
              textarea
            />
            <ImageUploader
              label="Fundo da seção"
              value={content.wearers.backgroundImage}
              onChange={(url) => setContent({ ...content, wearers: { ...content.wearers, backgroundImage: url } })}
            />
            <ImageUploader
              label="Foto das pessoas que vestem a marca (colagem)"
              value={content.wearers.galleryImage}
              onChange={(url) => setContent({ ...content, wearers: { ...content.wearers, galleryImage: url } })}
            />
            <div className="space-y-4">
              {content.wearers.people.map((person, i) => (
                <div key={i} className="border border-bone/15 p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-bone/60">Pessoa {i + 1}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setContent({
                          ...content,
                          wearers: {
                            ...content.wearers,
                            people: content.wearers.people.filter((_, idx) => idx !== i)
                          }
                        })
                      }
                      className="text-xs text-bone/50 hover:text-red-400"
                    >
                      remover
                    </button>
                  </div>
                  <Field
                    label="Nome"
                    value={person.name}
                    onChange={(v) => {
                      const people = [...content.wearers.people]
                      people[i] = { ...people[i], name: v }
                      setContent({ ...content, wearers: { ...content.wearers, people } })
                    }}
                  />
                  <Field
                    label="Descrição"
                    value={person.bio}
                    textarea
                    onChange={(v) => {
                      const people = [...content.wearers.people]
                      people[i] = { ...people[i], bio: v }
                      setContent({ ...content, wearers: { ...content.wearers, people } })
                    }}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setContent({
                    ...content,
                    wearers: {
                      ...content.wearers,
                      people: [...content.wearers.people, { name: '', bio: '' }]
                    }
                  })
                }
                className="text-xs text-bone/70 border border-bone/30 px-3 py-1.5 hover:bg-bone/10"
              >
                + adicionar pessoa
              </button>
            </div>
          </div>
        </section>

        <section>
          <h2 className="font-scratch text-2xl text-bone mb-4">O Impacto</h2>
          <div className="space-y-4">
            <ImageUploader
              label="Print da repercussão"
              value={content.impact.image}
              onChange={(url) => setContent({ ...content, impact: { ...content.impact, image: url } })}
            />
          </div>
        </section>

        <section>
          <h2 className="font-scratch text-2xl text-bone mb-4">O Contato</h2>
          <div className="space-y-4">
            <Field
              label="Usuário do Instagram (exibido)"
              value={content.contact.instagramHandle}
              onChange={(v) => setContent({ ...content, contact: { ...content.contact, instagramHandle: v } })}
            />
            <Field
              label="Link do Instagram"
              value={content.contact.instagramUrl}
              onChange={(v) => setContent({ ...content, contact: { ...content.contact, instagramUrl: v } })}
            />
            <ImageUploader
              label="Ícone do Instagram"
              value={content.contact.instagramIcon}
              onChange={(url) => setContent({ ...content, contact: { ...content.contact, instagramIcon: url } })}
            />
            <Field
              label="Número exibido do WhatsApp"
              value={content.contact.whatsappNumber}
              onChange={(v) => setContent({ ...content, contact: { ...content.contact, whatsappNumber: v } })}
            />
            <Field
              label="Link do WhatsApp (https://wa.me/55DDDNUMERO)"
              value={content.contact.whatsappUrl}
              onChange={(v) => setContent({ ...content, contact: { ...content.contact, whatsappUrl: v } })}
            />
            <ImageUploader
              label="Ícone do WhatsApp"
              value={content.contact.whatsappIcon}
              onChange={(url) => setContent({ ...content, contact: { ...content.contact, whatsappIcon: url } })}
            />
            <Field
              label="E-mail"
              value={content.contact.email}
              onChange={(v) => setContent({ ...content, contact: { ...content.contact, email: v } })}
            />
            <Field
              label="Texto de aviso"
              value={content.contact.note}
              textarea
              onChange={(v) => setContent({ ...content, contact: { ...content.contact, note: v } })}
            />
          </div>
        </section>

        <section>
          <h2 className="font-scratch text-2xl text-bone mb-4">Encerramento</h2>
          <div className="space-y-4">
            <Field
              label="Frase final"
              value={content.closing.tagline}
              onChange={(v) => setContent({ ...content, closing: { ...content.closing, tagline: v } })}
            />
            <ImageUploader
              label="Foto de fundo"
              value={content.closing.backgroundImage}
              onChange={(url) => setContent({ ...content, closing: { ...content.closing, backgroundImage: url } })}
            />
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-denim-950/95 backdrop-blur border-t border-bone/10 px-5 sm:px-8 py-4 flex items-center justify-between">
        <span className="text-xs text-bone/60">{savedMessage}</span>
        <button
          onClick={save}
          disabled={saving}
          className="bg-bone text-denim-950 text-sm font-medium px-8 py-3 hover:bg-bone/90 transition-colors disabled:opacity-60"
        >
          {saving ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </div>
    </div>
  )
}
