import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const input = {
  width: '100%', background: 'transparent', border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.14)',
  padding: '14px 0', fontFamily: 'var(--sans)', fontSize: 16, fontWeight: 300,
  color: 'var(--cream)', outline: 'none',
  transition: 'border-color 0.3s ease',
}

export default function Contact() {
  const ref = useRef(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    gsap.from(ref.current.querySelectorAll('.ct-item'), {
      y: 28, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.15,
    })
  }, [])

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => { e.preventDefault(); setSent(true) }

  return (
    <main ref={ref} style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div className="ct-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(3rem, 6vw, 8rem)',
        padding: 'calc(var(--nav-h) + 48px) clamp(20px,5vw,80px) clamp(4rem, 8vw, 8rem)',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <div>
          <div className="eyebrow ct-item"><span className="t-label" style={{ color: 'var(--gold)' }}>Prenons Contact</span></div>
          <h1 className="ct-item" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px,7vw,90px)', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.022em', color: 'var(--cream)', marginBottom: 'clamp(24px, 3vw, 32px)' }}>
            PARLONS<br /><span style={{ fontStyle: 'italic', color: 'var(--warm)' }}>ENSEMBLE.</span>
          </h1>
          <p className="t-body ct-item" style={{ maxWidth: '40ch', marginBottom: 'clamp(40px, 5vw, 56px)' }}>
            Que vous souhaitiez acquérir, vendre, ou simplement explorer, notre équipe est là pour vous guider avec expertise et discrétion.
          </p>
          <div className="ct-item" style={{ display: 'flex', flexDirection: 'column', gap: 24, borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 32 }}>
            {[
              { l: 'Brazzaville', v: 'Plateau des 15 Ans, Congo' },
              { l: 'Téléphone', v: '+242 06 411 42 56' },
              { l: 'Email', v: 'contact@beyond-address.com' },
              { l: 'Horaires', v: 'Lun–Sam, 8h–18h' },
            ].map(({ l, v }) => (
              <div key={l}>
                <p className="t-label" style={{ color: 'var(--muted)', marginBottom: 4 }}>{l}</p>
                <p style={{ fontFamily: 'var(--sans)', fontSize: 15, color: 'var(--cream)' }}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="ct-item">
          {sent ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 300, textAlign: 'center', gap: 20 }}>
              <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,4vw,56px)', fontWeight: 300, color: 'var(--cream)' }}>Merci.</p>
              <p className="t-serif-sm" style={{ color: 'var(--muted)' }}>Nous vous recontacterons prochainement.</p>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(1.5rem, 3vw, 2rem)' }}>
              {[
                { k: 'name',  l: 'Nom complet', t: 'text',  r: true },
                { k: 'email', l: 'Email',       t: 'email', r: true },
                { k: 'phone', l: 'Téléphone',   t: 'tel',   r: false },
              ].map(({ k, l, t, r }) => (
                <div key={k}>
                  <label style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>{l}</label>
                  <input type={t} required={r} value={form[k]} onChange={update(k)}
                    style={input}
                    onFocus={(e) => e.target.style.borderBottomColor = 'var(--cream)'}
                    onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.14)'}
                  />
                </div>
              ))}

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Intérêt</label>
                <select value={form.interest} onChange={update('interest')} style={{ ...input, cursor: 'pointer' }}
                  onFocus={(e) => e.target.style.borderBottomColor = 'var(--cream)'}
                  onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.14)'}
                >
                  <option value="" style={{ background: 'var(--dark)' }}>Choisir...</option>
                  {['Acquisition', 'Vente', 'Conseil', 'Architecture & Design'].map((o) => (
                    <option key={o} value={o} style={{ background: 'var(--dark)' }}>{o}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>Message</label>
                <textarea value={form.message} onChange={update('message')} rows={5} style={{ ...input, resize: 'none' }}
                  onFocus={(e) => e.target.style.borderBottomColor = 'var(--cream)'}
                  onBlur={(e) => e.target.style.borderBottomColor = 'rgba(255,255,255,0.14)'}
                />
              </div>

              <button type="submit" className="btn-solid" style={{ marginTop: 8 }} data-cursor="open">
                Envoyer le message
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ct-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}