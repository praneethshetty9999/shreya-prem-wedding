const COOKIE_NAME = 'site_auth'

async function hmacHex(message, secret) {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  )
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(message))
  return [...new Uint8Array(signature)].map((byte) => byte.toString(16).padStart(2, '0')).join('')
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

function readCookie(cookieHeader, name) {
  if (!cookieHeader) return null
  const match = cookieHeader.match(new RegExp(`(?:^|; )${name}=([^;]+)`))
  return match ? decodeURIComponent(match[1]) : null
}

async function isAuthed(request, secret) {
  const raw = readCookie(request.headers.get('Cookie'), COOKIE_NAME)
  if (!raw) return false
  const [expiryStr, signature] = raw.split('.')
  if (!expiryStr || !signature) return false
  if (Date.now() > Number(expiryStr)) return false
  const expected = await hmacHex(expiryStr, secret)
  return timingSafeEqual(expected, signature)
}

// Gates every request — HTML, JS bundle, images — behind a signed cookie, so
// the protected content is never served to the browser at all, not just
// hidden behind client-side React state. Only the login page and its auth
// endpoint are reachable without it.
export async function onRequest(context) {
  const { request, env, next } = context
  const url = new URL(request.url)

  // Cloudflare Pages' default "clean URLs" 308-redirects /gate.html -> /gate,
  // so both forms have to be exempt or that redirect loops back through here.
  // The two images are the gate page's own postcard art — decorative only,
  // no guest/private content — exempted so the login page can render itself.
  const PUBLIC_PATHS = new Set([
    '/gate',
    '/gate.html',
    '/api/auth',
    '/rsvp-background.png',
    '/landing-page.png',
  ])
  if (PUBLIC_PATHS.has(url.pathname)) {
    return next()
  }

  if (await isAuthed(request, env.SITE_AUTH_SECRET)) {
    return next()
  }

  const redirectTarget = `${url.origin}/gate?next=${encodeURIComponent(url.pathname + url.search)}`
  return Response.redirect(redirectTarget, 302)
}
