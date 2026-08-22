import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)
  const isTouch = typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches

  useEffect(() => {
    if (isTouch) return
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    const onMove = (e) => {
      setVisible(true)
      gsap.set(dot, { x: e.clientX, y: e.clientY })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.5, ease: 'power3.out' })

      const el = document.elementFromPoint(e.clientX, e.clientY)
      if (!el) { setLabel(''); return }
      if (el.closest('[data-cursor="view"]'))       setLabel('VIEW')
      else if (el.closest('[data-cursor="open"]'))  setLabel('OPEN')
      else if (el.closest('a, button'))             setLabel('OPEN')
      else                                           setLabel('')
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', () => setVisible(false))
    document.addEventListener('mouseenter', () => setVisible(true))
    return () => window.removeEventListener('mousemove', onMove)
  }, [isTouch])

  if (isTouch) return null
  const expanded = !!label

  return (
    <div aria-hidden="true" style={{ pointerEvents: 'none' }}>
      {/* Dot */}
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9999,
        width: 5, height: 5, borderRadius: '50%',
        background: 'var(--cream)',
        transform: 'translate(-50%, -50%)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s',
        mixBlendMode: 'difference',
      }} />
      {/* Ring */}
      <div ref={ringRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 9998,
        borderRadius: '50%',
        border: '1px solid rgba(245,243,238,0.55)',
        transform: 'translate(-50%, -50%)',
        width: expanded ? 78 : 34,
        height: expanded ? 78 : 34,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.3s, width 0.45s cubic-bezier(0.22,1,0.36,1), height 0.45s cubic-bezier(0.22,1,0.36,1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {expanded && (
          <span style={{
            fontFamily: 'var(--sans)', fontSize: '9px',
            fontWeight: 400, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: 'var(--cream)',
            opacity: expanded ? 1 : 0, transition: 'opacity 0.2s',
          }}>{label}</span>
        )}
      </div>
    </div>
  )
}
