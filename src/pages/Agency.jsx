import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTASection from '../components/CTASection'

const NUMBERS = [
  { v: '15+', l: "Années d'expérience" },
  { v: '120+', l: 'Propriétés vendues' },
  { v: '2', l: 'Marchés couverts' },
  { v: '100%', l: 'Clients satisfaits' },
]

export default function Agency() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.ag-item').forEach((item) => {
        gsap.from(item, {
          y: 32, opacity: 0, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 85%' },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={ref} style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div style={{ padding: 'calc(var(--nav-h) + 64px) clamp(20px,5vw,80px) 0' }}>
        <p className="t-label ag-item" style={{ color: 'var(--gold)', marginBottom: 24 }}>Notre Histoire</p>
        <h1 className="ag-item" style={{
          fontFamily: 'var(--serif)', fontSize: 'clamp(44px, 10vw, 140px)',
          fontWeight: 300, lineHeight: 0.88, letterSpacing: '-0.025em',
          color: 'var(--cream)', maxWidth: 900, marginBottom: 'clamp(32px, 5vw, 56px)',
        }}>
          RÉINVENTER<br />
          <span style={{ fontStyle: 'italic', color: 'var(--warm)' }}>L'IMMOBILIER</span><br />
          DE PRESTIGE
        </h1>

        <p className="ag-item" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px,1.6vw,22px)', fontStyle: 'italic', color: 'var(--warm)', maxWidth: 620, lineHeight: 1.8, marginBottom: 'clamp(48px, 8vw, 80px)' }}>
          Fondée avec une vision singulière : apporter les standards internationaux de l'immobilier de luxe en Afrique centrale. Chaque propriété que nous représentons est une déclaration.
        </p>
      </div>

      <div className="ag-item" style={{ width: '100%', aspectRatio: '21/9', minHeight: 220, overflow: 'hidden', position: 'relative' }}>
        <img src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1800&q=80"
          alt="Notre philosophie" loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, var(--black) 100%)' }} />
      </div>

      <div className="ag-numbers" style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        margin: '0 clamp(20px,5vw,80px)',
      }}>
        {NUMBERS.map(({ v, l }, i) => (
          <div key={v} className="ag-item ag-number" style={{
            padding: 'clamp(24px, 4vw, 56px) 12px',
            borderRight: i < NUMBERS.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
            textAlign: 'center',
          }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 5vw, 72px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1 }}>{v}</p>
            <p className="t-label" style={{ color: 'var(--muted)', marginTop: 10, fontSize: 'clamp(8px, 1vw, 10px)' }}>{l}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: 'clamp(64px,12vw,160px) clamp(20px,5vw,80px)' }}>
        <div className="ag-item" style={{ marginBottom: 'clamp(40px, 6vw, 60px)' }}>
          <div className="eyebrow"><span className="t-label" style={{ color: 'var(--gold)' }}>Nos Valeurs</span></div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(32px,6vw,80px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 0.92 }}>
            CE QUI NOUS ANIME
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 'clamp(28px,4vw,56px)' }}>
          {[
            { t: 'VISION', b: 'Nous voyons le potentiel là où d\'autres ne voient qu\'une propriété. Chaque adresse est une histoire à raconter.' },
            { t: 'EXIGENCE', b: 'Nos standards définissent la catégorie. La médiocrité n\'existe pas dans notre vocabulaire.' },
            { t: 'EXPÉRIENCE', b: '15 années sur deux marchés complexes. Nous connaissons chaque quartier, chaque nuance.' },
          ].map(({ t, b }) => (
            <div key={t} className="ag-item">
              <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 14 }}>{t}</p>
              <div style={{ width: 24, height: 1, background: 'var(--gold)', marginBottom: 18 }} />
              <p className="t-body">{b}</p>
            </div>
          ))}
        </div>
      </div>

      <CTASection title="TRAVAILLONS ENSEMBLE." subtitle="Collaborez avec l'agence immobilière de prestige leader en Afrique centrale."
        primary={{ label: 'Voir les Propriétés', to: '/properties' }}
        secondary={{ label: 'Nous Contacter', to: '/contact' }}
      />

      <style>{`
        @media (max-width: 640px) {
          .ag-numbers { grid-template-columns: repeat(2, 1fr) !important; }
          .ag-number:nth-child(2) { border-right: none !important; }
          .ag-number:nth-child(1),
          .ag-number:nth-child(2) { border-bottom: 1px solid rgba(255,255,255,0.07); }
        }
      `}</style>
    </main>
  )
}