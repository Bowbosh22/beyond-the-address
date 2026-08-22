import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CTASection({
  title = 'TROUVEZ\nVOTRE LIEU.',
  subtitle = 'Des propriétés d\'exception. Soigneusement sélectionnées.',
  primary = { label: 'Voir les Propriétés', to: '/properties' },
  secondary = { label: 'Nous Contacter', to: '/contact' },
}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.from(el.querySelectorAll('.cta-item'), {
        y: 30, opacity: 0, duration: 1, stagger: 0.14, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 78%' },
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={ref} style={{
      background: 'var(--dark)', textAlign: 'center',
      padding: 'clamp(64px, 14vw, 160px) clamp(20px, 5vw, 80px)',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <h2 className="cta-item" style={{
        fontFamily: 'var(--serif)',
        fontSize: 'clamp(42px, 10vw, 140px)',
        fontWeight: 300, lineHeight: 0.88, letterSpacing: '-0.025em',
        color: 'var(--cream)', whiteSpace: 'pre-line',
        maxWidth: 900, margin: '0 auto',
      }}>{title}</h2>

      <p className="cta-item t-serif-sm" style={{ color: 'var(--muted)', marginTop: 'clamp(20px, 3vw, 28px)', padding: '0 10px' }}>{subtitle}</p>

      <div className="cta-item cta-buttons" style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 'clamp(36px, 5vw, 52px)', flexWrap: 'wrap', maxWidth: 500, margin: 'clamp(36px, 5vw, 52px) auto 0' }}>
        <Link to={primary.to} className="btn-solid" data-cursor="open">{primary.label}</Link>
        <Link to={secondary.to} className="btn-outline" data-cursor="open">{secondary.label}</Link>
      </div>
    </section>
  )
}