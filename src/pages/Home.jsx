import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ImmersiveHouse from '../components/ImmersiveHouse'
import PropertyCard from '../components/PropertyCard'
import CTASection from '../components/CTASection'
import { properties } from '../data/properties'

function Hero() {
  const heroRef  = useRef(null)
  const innerRef = useRef(null)

  return (
    <section ref={heroRef} style={{
      position: 'relative', height: '100vh', minHeight: 560,
      background: 'var(--black)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 60% 55% at 50% 50%, rgba(196,168,130,0.08) 0%, transparent 70%)',
      }} />

      <div ref={innerRef} style={{ textAlign: 'center', position: 'relative', zIndex: 2, padding: '0 20px', width: '100%' }}>

        <p className="t-label hero-eyebrow" style={{ color: 'var(--gold)', marginBottom: 'clamp(24px, 5vw, 44px)', letterSpacing: '0.28em', fontSize: 'clamp(9px, 1vw, 10px)' }}>
          IMMOBILIER · ARCHITECTURE · ART DE VIVRE
        </p>

        <h1 style={{
          fontFamily: 'var(--serif)',
          fontSize: 'clamp(48px, 12vw, 178px)',
          fontWeight: 300, lineHeight: 0.88, letterSpacing: '-0.025em',
          color: 'var(--cream)',
        }}>
          AU-DELÀ<br />
          <span style={{ fontStyle: 'italic', color: 'var(--warm)' }}>DE</span><br />
          L'ADRESSE
        </h1>

        <p className="t-serif-sm" style={{ color: 'var(--muted)', maxWidth: 380, margin: 'clamp(20px, 3vw, 30px) auto 0', padding: '0 20px' }}>
          Des propriétés pensées pour être vécues.
        </p>

        <div style={{
          position: 'absolute',
          bottom: 'clamp(-38vh, -42vh, -38vh)', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        }}>
          <p className="t-label" style={{ color: 'var(--muted)', letterSpacing: '0.25em', fontSize: 'clamp(9px, 1vw, 10px)' }}>DÉFILEZ POUR ENTRER</p>
          <ScrollArrow />
        </div>
      </div>

      <style>{`
        @media (max-width: 480px) {
          .hero-eyebrow { letter-spacing: 0.2em !important; }
        }
      `}</style>
    </section>
  )
}

function ScrollArrow() {
  const ref = useRef(null)
  useEffect(() => {
    gsap.to(ref.current, { y: 7, repeat: -1, yoyo: true, duration: 1.3, ease: 'power1.inOut' })
  }, [])
  return (
    <div ref={ref}>
      <svg width="16" height="26" viewBox="0 0 16 26" fill="none" aria-hidden="true">
        <rect x="7.5" y="0" width="1" height="16" fill="rgba(245,243,238,0.22)" />
        <path d="M1 14 L8 22 L15 14" stroke="rgba(245,243,238,0.3)" strokeWidth="0.8" fill="none" />
      </svg>
    </div>
  )
}

function SelectedProperties() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.sp-item'), {
        y: 28, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 80%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      background: 'var(--black)',
      padding: 'clamp(64px, 12vw, 160px) clamp(20px, 5vw, 80px)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'clamp(40px, 6vw, 80px)', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <div className="eyebrow sp-item">
            <span className="t-label" style={{ color: 'var(--gold)' }}>Sélection Exclusive</span>
          </div>
          <h2 className="sp-item" style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 7vw, 96px)',
            fontWeight: 300, lineHeight: 0.92, letterSpacing: '-0.02em', color: 'var(--cream)',
          }}>
            PROPRIÉTÉS<br />D'EXCEPTION
          </h2>
        </div>
        <Link to="/properties" className="btn-outline sp-item" data-cursor="open" style={{ flexShrink: 0 }}>
          Voir toutes →
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
        gap: 'clamp(24px, 4vw, 56px)',
      }}>
        {properties.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
      </div>
    </section>
  )
}

function AgencySection() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.ag-item'), {
        y: 36, opacity: 0, duration: 1, stagger: 0.13, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 78%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      background: 'var(--dark)',
      padding: 'clamp(64px, 12vw, 160px) clamp(20px, 5vw, 80px)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <p className="t-label ag-item" style={{ color: 'var(--gold)', marginBottom: 24 }}>Notre Philosophie</p>
      <h2 className="ag-item" style={{
        fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 7vw, 96px)',
        fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.02em',
        color: 'var(--cream)', maxWidth: 900, marginBottom: 'clamp(48px, 8vw, 110px)',
      }}>
        NOUS NE VENDONS<br />
        PAS DES <span style={{ fontStyle: 'italic', color: 'var(--warm)' }}>ESPACES.</span><br />
        NOUS CURATONS<br />DES ART DE VIVRE.
      </h2>

      <div className="ag-item" style={{ width: '100%', aspectRatio: '16/9', overflow: 'hidden', position: 'relative', marginBottom: 'clamp(48px, 8vw, 100px)' }}>
        <img
          src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1800&q=80"
          alt="Intérieur luxueux" loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.75 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(20,20,20,0.5) 0%, transparent 55%)' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 'clamp(28px, 4vw, 56px)' }}>
        {[
          { t: 'VISION',     b: 'Chaque propriété est une déclaration. Nous curatons des espaces qui transcendent l\'immobilier.' },
          { t: 'EXIGENCE',   b: 'Chaque détail, chaque matériau, chaque vue — pensés et non négociables.' },
          { t: 'EXPÉRIENCE', b: '15 années d\'expertise. Des centaines de transactions. Une philosophie : des biens rares pour des vies exigeantes.' },
        ].map(({ t, b }) => (
          <div key={t} className="ag-item">
            <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 14 }}>{t}</p>
            <div style={{ width: 24, height: 1, background: 'var(--gold)', marginBottom: 18 }} />
            <p className="t-body">{b}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <ImmersiveHouse />
      <SelectedProperties />
      <AgencySection />
      <CTASection />
    </main>
  )
}