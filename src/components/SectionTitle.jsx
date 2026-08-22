import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * SectionTitle
 * Props:
 *   eyebrow  – small label above title (e.g. "Selected Properties")
 *   title    – main large serif title
 *   subtitle – smaller text below
 *   align    – 'left' | 'right' | 'center'
 *   dark     – true = dark bg, light text (default false)
 */
export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  dark = false,
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll('.st-reveal')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        children,
        { opacity: 0, y: 40, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.14,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [])

  const textAlign = align
  const color     = dark ? 'var(--cream)' : 'var(--cream)'
  const dimColor  = dark ? 'rgba(245,243,238,0.4)' : 'var(--dim)'

  return (
    <div
      ref={ref}
      style={{
        textAlign,
        maxWidth: align === 'center' ? '800px' : 'none',
        margin: align === 'center' ? '0 auto' : '0',
      }}
    >
      {eyebrow && (
        <div className="st-reveal section-eyebrow" style={{ justifyContent: align === 'center' ? 'center' : 'flex-start' }}>
          <span className="t-label" style={{ color: 'var(--champagne)' }}>
            {eyebrow}
          </span>
        </div>
      )}

      {title && (
        <h2
          className="st-reveal"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(40px, 7vw, 96px)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            color,
          }}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          className="st-reveal t-serif-sm"
          style={{
            marginTop: 20,
            color: dimColor,
            maxWidth: '520px',
            ...(align === 'center' ? { margin: '20px auto 0' } : {}),
          }}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
