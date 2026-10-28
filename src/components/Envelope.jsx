import { useEffect, useRef, useState } from 'react'
import { wedding } from '../data/weddingDetails.js'

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
export default function Envelope({ onOpen }) {
  const [step, setStep] = useState(0) // 0 closed, 1 seal glow, 2 flap, 3 card rising, 4 ready
  const timers = useRef([])
  useEffect(() => () => timers.current.forEach(clearTimeout), [])
  const open = () => {
    if (step) return
    if (reduced()) return setStep(4)
    setStep(1)
    ;[[700, 2], [1500, 3], [3000, 4]].forEach(([t, n]) => timers.current.push(setTimeout(() => setStep(n), t)))
  }
  return (
    <main className={'screen env-screen s' + step}>
      <p className="sanskrit">॥ श्री गणेशाय नमः ॥</p>
      <div className="ganesha" role="img" aria-label="Ganesha emblem">
        <svg viewBox="0 0 100 100" width="58" height="58"><g fill="none" stroke="#B89556" strokeWidth="2"><circle cx="50" cy="50" r="36"/><path d="M30 44q20-26 40 0M50 40v34q0 10-10 8M38 52h.1M62 52h.1"/></g></svg>
      </div>
      <h1 className="serif">An Invitation From Our Hearts</h1>
      <button className="env" onClick={open} aria-label="Open the invitation envelope" disabled={step > 0}>
        <span className="card">
          <span className="script cw">Welcome</span>
          <span className="serif names-sm">{wedding.bride} &amp; {wedding.groom}</span>
          <span className="cm">Together with our families, we joyfully invite you to celebrate our wedding.</span>
        </span>
        <span className="back" />
        <span className="front" />
        <span className="flap" />
        <span className="seal"><b>{wedding.bride[0]}&amp;{wedding.groom[0]}</b></span>
        <span className="hash">{wedding.hashtag}</span>
      </button>
      {step === 0 && <p className="hint">Tap to Open</p>}
      {step === 4 && <button className="btn" onClick={onOpen}>Continue to the invitation</button>}
      {step > 0 && step < 4 && <button className="link" onClick={() => setStep(4)}>Skip animation</button>}
    </main>
  )
}
