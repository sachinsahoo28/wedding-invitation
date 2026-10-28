import { useEffect, useRef, useState } from 'react'
import { wedding } from '../data/weddingDetails.js'
import { getGuest, calendarUrl, dateText } from '../utils.js'
import Share from './Share.jsx'

const Photo = ({ src, label, alt }) => src ? <img src={src} alt={alt} loading="lazy" /> : <div className="ph">Placeholder photo<br /><small>{label}</small></div>
function useCountdown(target) {
  const [now, setNow] = useState(Date.now())
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t) }, [])
  const s = Math.max(0, Math.floor((new Date(target) - now) / 1000))
  return { Days: Math.floor(s / 86400), Hours: Math.floor(s / 3600) % 24, Minutes: Math.floor(s / 60) % 60, Seconds: s % 60 }
}
function DateCard() {
  const c = useRef(null), down = useRef(false); const [shown, setShown] = useState(false)
  const cd = useCountdown(wedding.date)
  const full = new Date(wedding.date).toLocaleDateString('en-IN', { timeZone: wedding.timeZone, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  useEffect(() => {
    if (shown) return
    const cv = c.current, x = cv.getContext('2d'); cv.width = cv.offsetWidth; cv.height = cv.offsetHeight
    const g = x.createLinearGradient(0, 0, cv.width, cv.height); g.addColorStop(0, '#D8BD82'); g.addColorStop(.5, '#EBD9A8'); g.addColorStop(1, '#B89556')
    x.fillStyle = g; x.fillRect(0, 0, cv.width, cv.height); x.fillStyle = '#6F263Dcc'; x.textAlign = 'center'; x.font = 'italic 20px Cormorant Garamond'
    x.fillText('Scratch to reveal the date', cv.width / 2, cv.height / 2 + 6)
  }, [shown])
  const scratch = (e) => {
    if (!down.current) return
    const cv = c.current, r = cv.getBoundingClientRect(), x = cv.getContext('2d')
    x.globalCompositeOperation = 'destination-out'; x.beginPath(); x.arc(e.clientX - r.left, e.clientY - r.top, 22, 0, 7); x.fill()
    const d = x.getImageData(0, 0, cv.width, cv.height).data; let n = 0
    for (let i = 3; i < d.length; i += 160) if (!d[i]) n++
    if (n / (d.length / 160) > 0.4) setShown(true)
  }
  return (<>
    <div className="datecard"><p className="serif dt">{full}</p>
      {!shown && <canvas ref={c} aria-hidden="true" onPointerDown={(e) => { down.current = true; e.currentTarget.setPointerCapture(e.pointerId); scratch(e) }} onPointerMove={scratch} onPointerUp={() => (down.current = false)} onPointerCancel={() => (down.current = false)} />}
    </div>
    {!shown && <button className="link" onClick={() => setShown(true)}>Tap to reveal the date</button>}
    {shown && <div className="reveal-in"><div className="countdown" role="timer" aria-label="Countdown to the wedding">
      {Object.entries(cd).map(([k, v]) => <div key={k}><b>{String(v).padStart(2, '0')}</b><span>{k}</span></div>)}</div>
      <a className="btn" href={calendarUrl()} target="_blank" rel="noreferrer">Add to Google Calendar</a></div>}
  </>)
}
const accents = { Haldi: '✿', Mehendi: '❀', Sangeet: '♪', 'Wedding Ceremony': '❦', Reception: '✦' }

export default function Invitation() {
  const guest = getGuest(); const { photos } = wedding
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')), { threshold: 0.15 })
    document.querySelectorAll('.rv').forEach((n) => io.observe(n)); return () => io.disconnect()
  }, [])
  const top = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  return (
    <main className="invite">
      <section className="hero rv">
        <p className="label">Shubh Vivah</p>
        <p className="serif greet">{guest.greeting},</p>
        <h2 className="script names">{wedding.bride}<span>&amp;</span>{wedding.groom}</h2>
        <p className="lead">With the blessings of our elders, we invite you to share in the joy of our wedding.</p>
        <div className="frame wide"><Photo src={photos.hero} label="photos.hero" alt="The couple" /></div>
        <p className="hashtag script">{wedding.hashtag}</p>
      </section>
      <section className="portraits rv">
        {['bride', 'groom'].map((k) => (<figure key={k} className={'port ' + k}>
          <div className="frame arch-f"><Photo src={photos[k]} label={'photos.' + k} alt={wedding[k]} /></div>
          <figcaption><span className="serif">{wedding[k]}</span><em>{wedding.captions[k]}</em></figcaption></figure>))}
      </section>
      <section className="story rv"><h3 className="script">Our Story</h3><p className="serif">{wedding.story}</p></section>
      <section className="date rv"><h3 className="script">Save the Date</h3><DateCard /></section>
      <section className="events rv"><h3 className="script">The Celebrations</h3>
        <ol>{wedding.events.map((e) => <li key={e.name}><span className="acc" aria-hidden="true">{accents[e.name] || '✿'}</span>
          <div><b className="serif">{e.name}</b><span>{e.time}</span><em>{e.place}</em></div></li>)}</ol></section>
      <section className="venue rv"><h3 className="script">The Venue</h3>
        <svg className="venue-art" viewBox="0 0 240 130" role="img" aria-label="Venue illustration"><g fill="none" stroke="#B89556" strokeWidth="1.6"><path d="M10 120h220M30 120V70M210 120V70M30 70q90-70 180 0M60 120V84q60-50 120 0v36M92 120V92q28-30 56 0v28M120 22v14M114 22h12"/><circle cx="120" cy="16" r="4"/><path d="M30 70h-6M210 70h6"/></g></svg>
        <p className="serif vn">{wedding.venue.name}</p><p>{wedding.venue.address}</p>
        <a className="btn" href={wedding.venue.mapsUrl} target="_blank" rel="noreferrer">Get directions</a></section>
      {wedding.video && <section className="film rv"><h3 className="script">Our Film</h3>
        <video src={wedding.video} poster={wedding.videoPoster || undefined} controls playsInline preload="none" /></section>}
      <Share />
      <section className="closing rv">
        <p className="script">{wedding.closing}</p>
        <div className="frame round"><Photo src={photos.hero} label="photos.hero" alt="The couple" /></div>
        <h2 className="script names">{wedding.bride}<span>&amp;</span>{wedding.groom}</h2>
        <p className="hashtag">{wedding.hashtag}</p>
        <button className="btn alt" onClick={top}>Return to top</button>
      </section>
    </main>
  )
}
