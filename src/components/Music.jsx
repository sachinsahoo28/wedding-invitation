import { useRef, useState } from 'react'
import { wedding } from '../data/weddingDetails.js'
export default function Music() {
  const ref = useRef(null); const [on, setOn] = useState(false)
  if (!wedding.music) return null // hidden until a music URL is configured
  const toggle = () => { const a = ref.current; if (on) a.pause(); else a.play().catch(() => {}); setOn(!on) }
  return (<>
    <audio ref={ref} src={wedding.music} loop preload="none" />
    <button className="music" onClick={toggle} aria-pressed={on} aria-label={on ? 'Pause music' : 'Play music'}>{on ? '❚❚' : '♪'}</button>
  </>)
}
