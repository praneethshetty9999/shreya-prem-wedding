const API_URL = import.meta.env.VITE_API_URL || 'https://rsvp-api.tomcurran28022000.workers.dev'

export async function fetchGuestList() {
  const response = await fetch(API_URL)
  if (!response.ok) throw new Error('Failed to load guest list')
  return response.json()
}

export async function submitRsvp({ name, phone, address, meal }) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, address, meal }),
  })
  if (!response.ok) throw new Error('Failed to submit RSVP')
  return response.json()
}
