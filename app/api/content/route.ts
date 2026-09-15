import { NextRequest, NextResponse } from 'next/server'
import { getContent, saveContent } from '@/lib/content'
import { isAuthorized } from '@/lib/auth'

export async function GET() {
  const content = await getContent()
  return NextResponse.json(content)
}

export async function POST(request: NextRequest) {
  if (!isAuthorized()) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }
  const body = await request.json()
  await saveContent(body)
  return NextResponse.json({ ok: true })
}
