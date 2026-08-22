import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LINKS = [
  { to: '/properties', label: 'Propriétés' },
  { to: '/agency',     label: 'Agence' },
  { to: '/services',   label: 'Services' },
  { to: '/contact',    label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => { setOpen(false) }, [pathname])
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
    height: 'var(--nav-h)', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 clamp(24px, 5vw, 72px)',
    transition: 'background 0.5s ease, backdrop-filter 0.5s ease',
    background: scrolled ? 'rgba(10,10,10,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
  }

  const logoStyle = {
    fontFamily: 'var(--serif)', fontSize: 'clamp(15px, 1.4vw, 18px)',
    fontWeight: 400, letterSpacing: '0.18em',
    color: 'var(--cream)', textTransform: 'uppercase',
  }

  const linkStyle = (isActive) => ({
    fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 400,
    letterSpacing: '0.2em', textTransform: 'uppercase',
    color: isActive ? 'var(--cream)' : 'var(--muted)',
    transition: 'color 0.3s ease', position: 'relative', paddingBottom: '2px',
  })

  return (
    <>
      <nav style={navStyle} aria-label="Navigation principale">
        <Link to="/" style={logoStyle} aria-label="Beyond the Address — Accueil">BEYOND</Link>

        <ul style={{ display: 'flex', gap: 'clamp(24px, 3vw, 48px)', listStyle: 'none' }} className="nav-links">
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink to={to} style={({ isActive }) => linkStyle(isActive)}>{label}</NavLink>
            </li>
          ))}
        </ul>

        <button onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open}
          style={{ display: 'none', flexDirection: 'column', gap: '5px', padding: '4px', cursor: 'pointer' }}
          className="nav-burger"
        >
          <span style={{ display: 'block', width: 22, height: 1, background: 'var(--cream)', transition: 'transform 0.3s, opacity 0.3s', transform: open ? 'rotate(45deg) translate(4px, 4px)' : 'none' }} />
          <span style={{ display: 'block', width: 22, height: 1, background: 'var(--cream)', transition: 'opacity 0.3s', opacity: open ? 0 : 1 }} />
          <span style={{ display: 'block', width: 22, height: 1, background: 'var(--cream)', transition: 'transform 0.3s', transform: open ? 'rotate(-45deg) translate(4px, -4px)' : 'none' }} />
        </button>
      </nav>

      <div style={{
        position: 'fixed', inset: 0, zIndex: 199, background: 'var(--black)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '2.5rem',
        opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none',
        transition: 'opacity 0.4s ease',
      }} aria-hidden={!open}>
        {LINKS.map(({ to, label }) => (
          <Link key={to} to={to} style={{
            fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 10vw, 64px)',
            fontWeight: 300, color: 'var(--cream)', letterSpacing: '-0.01em',
          }}>{label}</Link>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-burger { display: flex !important; }
        }
      `}</style>
    </>
  )
}