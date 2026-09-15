import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import { isAuthorized } from '@/lib/auth'

export async function POST(request: NextRequest) {
  if (!isAuthorized()) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) {
    return NextResponse.json({ error: 'Nenhum arquivo enviado' }, { status: 400 })
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json({ error: 'Formato de imagem não suportado' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const extension = file.type.split('/')[1]
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`
  const uploadDir = path.join(process.cwd(), 'public', 'uploads')

  await fs.mkdir(uploadDir, { recursive: true })
  await fs.writeFile(path.join(uploadDir, fileName), buffer)

  return NextResponse.json({ url: `/uploads/${fileName}` })
}
