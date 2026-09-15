'use client'

import { useRef, useState } from 'react'

export default function ImageUploader({
  label,
  value,
  onChange
}: {
  label: string
  value: string
  onChange: (url: string) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (file: File) => {
    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Falha no upload')
      onChange(data.url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha no upload')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="border border-bone/20 p-3 bg-denim-900/50">
      <p className="text-xs text-bone/60 mb-2">{label}</p>
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 bg-denim-800 border border-bone/20 flex-shrink-0 overflow-hidden flex items-center justify-center">
          {value ? (
            <img src={value} alt={label} className="w-full h-full object-cover" />
          ) : (
            <span className="text-[10px] text-bone/40">sem foto</span>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="text-xs px-3 py-1.5 border border-bone/40 text-bone/90 hover:bg-bone hover:text-denim-950 transition-colors disabled:opacity-50"
          >
            {uploading ? 'Enviando...' : value ? 'Trocar imagem' : 'Enviar imagem'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange('')}
              className="text-xs text-bone/50 hover:text-bone/80 text-left"
            >
              Remover
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/gif"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />
      </div>
      {error && <p className="text-xs text-red-400 mt-2">{error}</p>}
    </div>
  )
}
