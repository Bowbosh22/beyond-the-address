import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function PropertyCard({ property, index = 0 }) {
  const cardRef   = useRef(null)
  const imgRef    = useRef(null)
  const coverRef  = useRef(null)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: 44, opacity: 0, duration: 1.1, ease: 'power3.out',
        delay: index * 0.1,
        scrollTrigger: { trigger: el, start: 'top 88%' },
      })
    }, el)
    return () => ctx.revert()
  }, [index])

  const onEnter = () => {
    gsap.to(imgRef.current, { scale: 1.05, duration: 0.7, ease: 'power2.out' })
    gsap.to(coverRef.current, { opacity: 1, duration: 0.4 })
  }
  const onLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: 'power2.out' })
    gsap.to(coverRef.current, { opacity: 0, duration: 0.4 })
  }

  return (
    <Link to={`/property/${property.slug}`} ref={cardRef}
      onMouseEnter={onEnter} onMouseLeave={onLeave}
      data-cursor="view" aria-label={`Voir ${property.name}`}
      style={{ display: 'block', textDecoration: 'none' }}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4/3', background: 'var(--dark)' }}>
        <img ref={imgRef} src={property.coverImage} alt={property.name}
          loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center' }} />

        {/* Hover overlay (desktop uniquement) */}
        <div ref={coverRef} className="card-hover-overlay" style={{
          position: 'absolute', inset: 0, opacity: 0,
          background: 'rgba(10,10,10,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span className="t-label" style={{ color: 'var(--cream)', borderBottom: '1px solid rgba(245,243,238,0.4)', paddingBottom: 3 }}>
            EXPLORER →
          </span>
        </div>

        {/* Badge catégorie */}
        <span className="t-label" style={{ position: 'absolute', top: 14, left: 14, color: 'var(--gold)', background: 'rgba(10,10,10,0.55)', padding: '5px 10px', backdropFilter: 'blur(6px)' }}>
          {property.category}
        </span>
      </div>

      {/* Infos */}
      <div style={{ padding: '18px 0 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 60%', minWidth: 0 }}>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 300, color: 'var(--cream)', marginBottom: 4, lineHeight: 1.1 }}>
              {property.name}
            </h3>
            <p className="t-label" style={{ color: 'var(--muted)' }}>{property.location}</p>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(13px, 1.2vw, 16px)', fontWeight: 300, color: 'var(--gold)', whiteSpace: 'nowrap' }}>
              {property.price}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 12, flexWrap: 'wrap' }}>
          {[`${property.surface} m²`, `${property.bedrooms} ch.`, `${property.bathrooms} sdb`].map((v) => (
            <span key={v} style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--warm)' }}>{v}</span>
          ))}
        </div>
      </div>

      <style>{`
        @media (hover: none) {
          .card-hover-overlay { display: none !important; }
        }
      `}</style>
    </Link>
  )
}