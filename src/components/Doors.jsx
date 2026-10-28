import { useState } from 'react'
import { wedding } from '../data/weddingDetails.js'
const Panel = ({ side }) => (
  <div className={'door ' + side}><div className="inset"><span className="butterfly">🦋</span><i className="floral">❀</i></div><span className="knob" /></div>
)
export default function Doors({ onOpen }) {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((o) => !o)
  const src = wedding.photos.reveal || wedding.photos.hero
  return (
    <main className={'screen doors-screen' + (open ? ' open' : '')}>
      <p className="script kicker">Step into our story</p>
      <div className="arch" role="button" tabIndex={0} aria-pressed={open} aria-label={open ? 'Close the royal doors' : 'Open the royal doors'}
        onClick={toggle} onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), toggle())}>
        <div className="room">{src ? <img src={src} alt="The couple" /> : <div className="ph">Placeholder couple photo<br /><small>set photos.reveal</small></div>}
          <div className="light" /></div>
        <Panel side="left" /><Panel side="right" />
        <i className="flr a">❀</i><i className="flr b">✿</i>
      </div>
      <div className="row">
        <button className="btn alt" onClick={toggle}>{open ? 'Close the doors' : 'Tap to open the doors'}</button>
        {open && <button className="btn" onClick={onOpen}>Enter the celebration</button>}
      </div>
    </main>
  )
}
