import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'pretoa_session'

export function isAuthorized(): boolean {
  const store = cookies()
  const token = store.get(SESSION_COOKIE)?.value
  const secret = process.env.ADMIN_SESSION_SECRET || ''
  return Boolean(token) && Boolean(secret) && token === secret
}
