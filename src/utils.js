import { wedding } from './data/weddingDetails.js'
const clean = (v) => (v || '').replace(/[<>]/g, '').trim().slice(0, 60)
// Personalization comes from URL params only: ?to=Rahul%20Ji&fam=1  (never put phone numbers here)
export function getGuest() {
  const q = new URLSearchParams(window.location.search)
  const to = clean(q.get('to')), fam = clean(q.get('fam')), g = clean(q.get('g'))
  const name = to ? (fam ? `${to} & ${fam}` : to) : ''
  return { name, greeting: g ? `${g} ${name}`.trim() : name ? `Dear ${name}` : wedding.defaultGreeting }
}
export const dateText = () => new Date(wedding.date).toLocaleDateString('en-IN', { timeZone: wedding.timeZone, day: 'numeric', month: 'long', year: 'numeric' })
export function buildLink(to, fam) {
  const base = wedding.inviteBaseUrl || window.location.origin + window.location.pathname
  const p = new URLSearchParams(); if (clean(to)) p.set('to', clean(to)); if (clean(fam)) p.set('fam', clean(fam))
  return p.toString() ? `${base}?${p}` : base
}
export function buildMessage(greet, link) {
  return `${greet} 🙏\n\nWith love, we invite you to celebrate the wedding of ${wedding.bride} & ${wedding.groom} on ${dateText()}.\n\nPlease open your personalized invitation:\n${link}\n\nWe look forward to celebrating with you!`
}
export function calendarUrl() {
  const f = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, '')
  const s = new Date(wedding.date), e = new Date(s.getTime() + 4 * 3600e3)
  const p = new URLSearchParams({ action: 'TEMPLATE', text: `${wedding.bride} & ${wedding.groom} Wedding`, dates: `${f(s)}/${f(e)}`, location: `${wedding.venue.name}, ${wedding.venue.address}` })
  return 'https://calendar.google.com/calendar/render?' + p
}
