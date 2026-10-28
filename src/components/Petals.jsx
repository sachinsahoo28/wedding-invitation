const petals = Array.from({ length: 12 }, (_, i) => ({ l: (i * 8.7) % 100, d: 11 + (i % 4) * 3, t: -i * 1.7 }))
const dust = Array.from({ length: 16 }, (_, i) => ({ l: (i * 6.3 + 3) % 100, tp: (i * 13) % 100, d: 6 + (i % 5) * 2, t: -i }))
export default function Petals() {
  return (<div className="petals" aria-hidden="true">
    {petals.map((p, i) => <i key={'p' + i} className="petal" style={{ left: p.l + '%', animationDuration: p.d + 's', animationDelay: p.t + 's' }} />)}
    {dust.map((p, i) => <i key={'d' + i} className="dust" style={{ left: p.l + '%', top: p.tp + '%', animationDuration: p.d + 's', animationDelay: p.t + 's' }} />)}
  </div>)
}
