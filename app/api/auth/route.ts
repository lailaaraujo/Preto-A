import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const { password } = await request.json()
  const correctPassword = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!correctPassword || !secret) {
    return NextResponse.json(
      { error: 'Área administrativa não configurada. Defina ADMIN_PASSWORD e ADMIN_SESSION_SECRET no arquivo .env.local' },
      { status: 500 }
    )
  }

  if (password !== correctPassword) {
    return NextResponse.json({ error: 'Senha incorreta' }, { status: 401 })
  }

  const response = NextResponse.json({ ok: true })
  response.cookies.set('pretoa_session', secret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
  return response
}
