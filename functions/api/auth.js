const COOKIE_NAME = 'site_auth'
const SESSION_MS = 1000 * 60 * 60 * 2 // 2 hours

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

// The password comparison happens here, server-side, against a Cloudflare
// Pages secret — it never ships to the browser. On success we mint a signed,
// HttpOnly cookie that _middleware.js verifies on every subsequent request.
export async function onRequestPost({ request, env }) {
  let body
  try {
    body = await request.json()
  } catch {
    return new Response(JSON.stringify({ ok: false }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const submitted = typeof body.password === 'string' ? body.password : ''
  const correct =
    submitted.length === env.SITE_PASSWORD.length &&
    timingSafeEqual(submitted, env.SITE_PASSWORD)

  if (!correct) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const expiry = Date.now() + SESSION_MS
  const signature = await hmacHex(String(expiry), env.SITE_AUTH_SECRET)
  const cookieValue = encodeURIComponent(`${expiry}.${signature}`)

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `${COOKIE_NAME}=${cookieValue}; Path=/; Max-Age=${SESSION_MS / 1000}; HttpOnly; Secure; SameSite=Lax`,
    },
  })
}
