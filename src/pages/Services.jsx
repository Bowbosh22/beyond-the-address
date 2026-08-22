import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CTASection from '../components/CTASection'

const SERVICES = [
  { n: '01', t: 'Acquisition', b: 'Nous vous accompagnons dans chaque étape de l\'acquisition d\'une propriété d\'exception — de l\'identification à la signature — avec discrétion et conseil personnalisé.', d: ['Analyse de marché', 'Sourcing de biens', 'Due diligence', 'Négociation'] },
  { n: '02', t: 'Cession', b: 'Notre stratégie de positionnement garantit que votre bien atteint la bonne audience. Nous gérons chaque aspect du cycle de vente, de l\'estimation à la transaction.', d: ['Estimation experte', 'Marketing premium', 'Sélection acheteurs', 'Gestion transaction'] },
  { n: '03', t: 'Conseil Patrimonial', b: 'Conseils stratégiques en investissement immobilier à travers le bassin du Congo. Nous identifions les opportunités avant qu\'elles n\'atteignent le marché.', d: ['Stratégie de portefeuille', 'Analyse de rendement', 'Accès off-market', 'Planification long terme'] },
  { n: '04', t: 'Architecture & Design', b: 'Grâce à notre réseau d\'architectes internationaux et de designers d\'intérieur, nous transformons des biens bruts en résidences extraordinaires.', d: ['Liaison architecture', 'Design d\'intérieur', 'Gestion de rénovation', 'Sourcing de matériaux'] },
]

export default function Services() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.svc-item').forEach((item) => {
        gsap.from(item, {
          y: 24, opacity: 0, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 88%' },
        })
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={ref} style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div style={{ padding: 'calc(var(--nav-h) + 48px) clamp(20px,5vw,80px) clamp(40px,6vw,80px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="eyebrow svc-item"><span className="t-label" style={{ color: 'var(--gold)' }}>Ce Que Nous Faisons</span></div>
        <h1 className="svc-item" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px,9vw,120px)', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.022em', color: 'var(--cream)' }}>
          NOS<br />SERVICES
        </h1>
      </div>

      <div style={{ padding: '0 clamp(20px,5vw,80px)' }}>
        {SERVICES.map(({ n, t, b, d }) => (
          <div key={n} className="svc-item svc-row" style={{
            display: 'grid',
            gridTemplateColumns: '56px 1fr auto',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
            alignItems: 'start',
            padding: 'clamp(24px,4vw,48px) 0',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            transition: 'padding-left 0.3s ease',
          }}
            onMouseEnter={(e) => { if (window.matchMedia('(hover: hover)').matches) e.currentTarget.style.paddingLeft = '12px' }}
            onMouseLeave={(e) => e.currentTarget.style.paddingLeft = '0'}
          >
            <p className="t-label" style={{ color: 'var(--muted)', paddingTop: 4 }}>{n}</p>
            <div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px,3vw,42px)', fontWeight: 300, letterSpacing: '-0.01em', color: 'var(--cream)', marginBottom: 12 }}>{t}</h2>
              <p className="t-body" style={{ maxWidth: '52ch', marginBottom: 20 }}>{b}</p>
              <div style={{ display: 'flex', gap: 'clamp(12px, 3vw, 24px)', flexWrap: 'wrap' }}>
                {d.map((item) => <span key={item} className="t-label" style={{ color: 'var(--gold)' }}>{item}</span>)}
              </div>
            </div>
            <p className="svc-arrow" style={{ fontSize: 18, color: 'var(--muted)', paddingTop: 2, transition: 'transform 0.3s ease, color 0.3s ease' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translate(4px,-4px)'; e.currentTarget.style.color = 'var(--cream)' }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.color = 'var(--muted)' }}
            >↗</p>
          </div>
        ))}
      </div>

      <CTASection title="TRAVAILLONS ENSEMBLE." subtitle="Dites-nous ce que vous cherchez. Nous le rendrons possible."
        primary={{ label: 'Nous Contacter', to: '/contact' }}
        secondary={{ label: 'Nos Propriétés', to: '/properties' }}
      />

      <style>{`
        @media (max-width: 640px) {
          .svc-row {
            grid-template-columns: 40px 1fr !important;
            gap: 1rem !important;
          }
          .svc-arrow { display: none !important; }
        }
      `}</style>
    </main>
  )
}