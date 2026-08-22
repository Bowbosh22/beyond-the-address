import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import PropertyCard from '../components/PropertyCard'
import CTASection from '../components/CTASection'
import { properties } from '../data/properties'

const FILTERS = ['Tous', 'Villa', 'Résidence', 'Résidence de Prestige']

export default function Properties() {
  const [filter, setFilter] = useState('Tous')
  const headerRef = useRef(null)

  const filtered = filter === 'Tous' ? properties : properties.filter((p) => p.category === filter)

  useEffect(() => {
    gsap.from(headerRef.current, { y: 30, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.1 })
  }, [])

  return (
    <main style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <div ref={headerRef} style={{
        padding: 'calc(var(--nav-h) + 48px) clamp(20px,5vw,80px) clamp(40px,6vw,80px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div className="eyebrow">
          <span className="t-label" style={{ color: 'var(--gold)' }}>Notre Portefeuille</span>
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 9vw, 120px)', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.022em', color: 'var(--cream)', marginBottom: 'clamp(32px, 5vw, 48px)' }}>
          TOUTES LES<br />PROPRIÉTÉS
        </h1>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '10px 18px',
              border: `1px solid ${filter === f ? 'var(--gold)' : 'rgba(255,255,255,0.14)'}`,
              fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: filter === f ? 'var(--gold)' : 'var(--muted)',
              transition: 'all 0.3s ease', cursor: 'pointer',
            }}>{f}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: 'clamp(40px,6vw,80px) clamp(20px,5vw,80px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px,4vw,56px)' }}>
          {filtered.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
        </div>
      </div>

      <CTASection title="DÉCOUVREZ LA DIFFÉRENCE." subtitle="Organisez une visite privée avec notre équipe."
        primary={{ label: 'Organiser une Visite', to: '/contact' }}
        secondary={{ label: 'Notre Agence', to: '/agency' }}
      />
    </main>
  )
}