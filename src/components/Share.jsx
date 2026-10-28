import { useState } from 'react'
import { buildLink, buildMessage } from '../utils.js'

export default function Share() {
  const [to, setTo] = useState(''); const [fam, setFam] = useState(''); const [greet, setGreet] = useState(''); const [note, setNote] = useState('')
  const link = buildLink(to, fam)
  const g = greet || `Namaste ${to || 'Ji'}${fam ? ' & ' + fam : ''}`
  const msg = buildMessage(g, link)
  const copy = async (t, label) => {
    try { await navigator.clipboard.writeText(t); setNote(label + ' copied') } catch { setNote('Copy failed — select and copy manually') }
  }
  const nativeShare = async () => { try { await navigator.share({ text: msg }) } catch { /* cancelled */ } }
  return (
    <section className="panel share">
      <h3 className="serif">Share This Invitation</h3>
      <label>Recipient name<input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Rahul Ji" maxLength={60} /></label>
      <label>Family name (optional)<input value={fam} onChange={(e) => setFam(e.target.value)} placeholder="Family" maxLength={60} /></label>
      <label>Greeting (optional)<input value={greet} onChange={(e) => setGreet(e.target.value)} placeholder="Namaste Rahul Ji & Family" maxLength={80} /></label>
      <pre className="msg">{msg}</pre>
      <div className="actions">
        <a className="btn" href={`https://wa.me/?text=${encodeURIComponent(msg)}`} target="_blank" rel="noreferrer">Share on WhatsApp</a>
        <button className="btn alt" onClick={() => copy(link, 'Link')}>Copy link</button>
        <button className="btn alt" onClick={() => copy(msg, 'Message')}>Copy message</button>
        {navigator.share && <button className="btn alt" onClick={nativeShare}>Share…</button>}
      </div>
      <p className="note" role="status">{note || 'WhatsApp opens with the message ready — choose the contact and press send yourself. Nothing is sent automatically.'}</p>
    </section>
  )
}
