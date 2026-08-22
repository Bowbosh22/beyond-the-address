import { useEffect, useRef, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import gsap from 'gsap'
import CTASection from '../components/CTASection'
import { getPropertyBySlug } from '../data/properties'

export default function PropertyDetails() {
  const { slug } = useParams()
  const property = getPropertyBySlug(slug)
  const [activeImg, setActiveImg] = useState(0)
  const heroRef = useRef(null)
  const bodyRef = useRef(null)

  if (!property) return <Navigate to="/properties" replace />

  useEffect(() => {
    gsap.from(heroRef.current, { opacity: 0, duration: 1.2, ease: 'power2.out' })
    gsap.from(bodyRef.current.querySelectorAll('.pd-item'), {
      y: 28, opacity: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.4,
    })
  }, [slug])

  return (
    <main style={{ background: 'var(--black)', minHeight: '100vh' }}>
      {/* Hero */}
      <div ref={heroRef} style={{ position: 'relative', height: '70vh', minHeight: 420, overflow: 'hidden' }}>
        <img src={property.images[activeImg]} alt={property.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)' }} />

        <Link to="/properties" style={{
          position: 'absolute', top: 'calc(var(--nav-h) + 16px)', left: 'clamp(20px,5vw,80px)',
          fontFamily: 'var(--sans)', fontSize: '10px', letterSpacing: '0.18em',
          textTransform: 'uppercase', color: 'rgba(245,243,238,0.75)',
          display: 'flex', alignItems: 'center', gap: 8, transition: 'color 0.3s',
          padding: '8px 12px', background: 'rgba(10,10,10,0.4)', backdropFilter: 'blur(8px)',
        }}
          onMouseEnter={(e) => e.currentTarget.style.color = 'var(--cream)'}
          onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(245,243,238,0.75)'}
        >← Toutes les Propriétés</Link>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 'clamp(24px,5vw,64px)' }}>
          <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 12 }}>{property.neighborhood} · {property.location}</p>
          <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 8vw, 110px)', fontWeight: 300, lineHeight: 0.9, letterSpacing: '-0.022em', color: 'var(--cream)' }}>
            {property.name}
          </h1>
        </div>
      </div>

      {/* Miniatures */}
      {property.images.length > 1 && (
        <div style={{ display: 'flex', gap: 8, padding: '16px clamp(20px,5vw,80px)', background: 'var(--dark)', overflowX: 'auto' }}>
          {property.images.map((img, i) => (
            <button key={i} onClick={() => setActiveImg(i)} style={{
              width: 80, height: 52, overflow: 'hidden', flexShrink: 0, cursor: 'pointer',
              outline: i === activeImg ? '1px solid var(--gold)' : '1px solid transparent',
              transition: 'outline 0.3s', padding: 0,
            }}>
              <img src={img} alt={`Vue ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      )}

      {/* Corps */}
      <div ref={bodyRef} className="pd-body" style={{
        display: 'grid', gridTemplateColumns: '1fr 340px', gap: 'clamp(2rem, 5vw, 6rem)',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(20px,5vw,80px) clamp(4rem, 8vw, 8rem)',
        maxWidth: 1400, margin: '0 auto',
      }}>
        <div>
          <p className="pd-item" style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(15px,1.4vw,17px)', fontStyle: 'italic', color: 'var(--warm)', lineHeight: 1.9, marginBottom: '3rem' }}>
            {property.description}
          </p>

          {/* Specs */}
          <div className="pd-item pd-specs" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '2.5rem', marginBottom: '3rem' }}>
            {[
              { v: property.surface, u: 'm²' },
              { v: property.bedrooms, u: 'chambres' },
              { v: property.bathrooms, u: 'salles de bain' },
            ].map(({ v, u }) => (
              <div key={u}>
                <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px,4vw,48px)', fontWeight: 300, color: 'var(--cream)', lineHeight: 1 }}>{v}</p>
                <p className="t-label" style={{ color: 'var(--muted)', marginTop: 6 }}>{u}</p>
              </div>
            ))}
          </div>

          {/* Équipements */}
          <div className="pd-item">
            <p className="t-label" style={{ color: 'var(--gold)', marginBottom: 20 }}>Équipements & Prestations</p>
            <ul className="pd-features" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', listStyle: 'none' }}>
              {property.features.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--sans)', fontSize: 13, fontWeight: 300, color: 'var(--warm)' }}>
                  <span style={{ width: 16, height: 1, background: 'var(--muted)', flexShrink: 0 }} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="pd-sidebar" style={{ position: 'sticky', top: 'calc(var(--nav-h) + 24px)', alignSelf: 'start' }}>
          <div className="pd-item" style={{ background: 'var(--dark)', padding: '2rem' }}>
            <p className="t-label" style={{ color: 'var(--muted)', marginBottom: 8 }}>Prix</p>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px,2vw,24px)', fontWeight: 300, color: 'var(--cream)', marginBottom: '2rem' }}>
              {property.price}
            </p>
            <p className="t-label" style={{ color: 'var(--muted)', marginBottom: 4 }}>Statut</p>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: property.status === 'available' ? '#6ab47a' : 'var(--muted)', marginBottom: '2rem', textTransform: 'capitalize' }}>
              {property.status === 'available' ? 'Disponible' : property.status}
            </p>
            <Link to="/contact" className="btn-solid" data-cursor="open" style={{ display: 'block', textAlign: 'center', width: '100%', marginBottom: 10 }}>
              Demander une visite
            </Link>
            <Link to="/contact" className="btn-outline" data-cursor="open" style={{ display: 'block', textAlign: 'center', width: '100%' }}>
              Plus d'informations
            </Link>
          </div>
          <p className="t-label" style={{ color: 'var(--muted)', marginTop: 20, textAlign: 'center' }}>
            Réf. {property.id.toString().padStart(3, '0')} · {property.year}
          </p>
        </aside>
      </div>

      <CTASection title="UNE AUTRE PROPRIÉTÉ ?" subtitle="Découvrez plus de propriétés d'exception dans notre portefeuille."
        primary={{ label: 'Toutes les Propriétés', to: '/properties' }}
        secondary={{ label: 'Nous Contacter', to: '/contact' }}
      />

      <style>{`
        @media (max-width: 900px) {
          .pd-body { grid-template-columns: 1fr !important; }
          .pd-sidebar { position: static !important; }
        }
        @media (max-width: 480px) {
          .pd-features { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}