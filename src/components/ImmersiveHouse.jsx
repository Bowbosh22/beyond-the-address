import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PropertyNavigation from './PropertyNavigation'

const SECTIONS = [
  { id: 'arrival', navLabel: null,
    content: { type: 'split', top: 'ENTREZ', bot: 'CHEZ VOUS', italic: true, tag: 'I — ARRIVÉE', pos: 'bottom-left' } },
  { id: 'grand-hall', navLabel: '01 HALL',
    content: { type: 'split-details', top: 'GRAND', bot: 'HALL', tag: 'II — HALL D\'ENTRÉE', details: ['Double hauteur', 'Escalier suspendu', 'Poutres apparentes'], pos: 'top-left' } },
  { id: 'dining', navLabel: '02 SALLE À MANGER',
    content: { type: 'right-tags', top: 'SALLE À', bot: 'MANGER', sub: 'Là où les souvenirs se créent.', tag: 'III — SALLE À MANGER', tags: ['VERRE', 'LUMINAIRE DESIGN', '8 COUVERTS'], pos: 'right' } },
  { id: 'living', navLabel: '03 SALON',
    content: { type: 'split-sub', top: 'SALON', bot: 'PRINCIPAL', sub: 'Le cœur de la maison.', tag: 'IV — SALON', pos: 'bottom-right' } },
  { id: 'panoramic', navLabel: '04 VUE',
    content: { type: 'split', top: 'OUVERT', bot: 'SUR L\'HORIZON', italic: true, tag: 'V — VUE PANORAMIQUE', pos: 'bottom' } },
  { id: 'final', navLabel: null,
    content: { type: 'cta', top: 'TROUVEZ', bot: 'VOTRE LIEU', tag: 'VI — FIN DU VOYAGE', pos: 'center' } },
]

function pos(p) {
  const base = { position: 'absolute', padding: 'clamp(28px, 5vw, 72px)', maxWidth: 'min(680px, 90vw)' }
  if (p === 'center')       return { ...base, top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center', maxWidth: '100%' }
  if (p === 'bottom-left')  return { ...base, bottom: 0, left: 0 }
  if (p === 'bottom-right') return { ...base, bottom: 0, right: 0, textAlign: 'right' }
  if (p === 'top-left')     return { ...base, top: 'calc(var(--nav-h) + 20px)', left: 0 }
  if (p === 'right')        return { ...base, top: '50%', right: 0, transform: 'translateY(-50%)', textAlign: 'right' }
  if (p === 'left')         return { ...base, top: '50%', left: 0, transform: 'translateY(-50%)' }
  if (p === 'bottom')       return { ...base, bottom: 0, left: 0, right: 0, maxWidth: '100%' }
  return base
}

const TIT = { fontFamily: 'var(--serif)', fontSize: 'clamp(52px, 10vw, 148px)', fontWeight: 300, lineHeight: 0.88, letterSpacing: '-0.022em', margin: 0, textShadow: '0 2px 30px rgba(0,0,0,0.6)' }
const TAG = { fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 400, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--warm)', marginBottom: 18, textShadow: '0 1px 8px rgba(0,0,0,0.8)' }

function SectionText({ section, isActive }) {
  const { content: c } = section
  const wrapStyle = { ...pos(c.pos), opacity: isActive ? 1 : 0, transition: 'opacity 0.8s ease', pointerEvents: isActive ? 'auto' : 'none' }

  if (c.type === 'split') return (
    <div style={wrapStyle}>
      <p style={TAG}>{c.tag}</p>
      <p style={{ ...TIT, color: 'var(--cream)' }}>{c.top}</p>
      <p style={{ ...TIT, color: c.italic ? 'var(--warm)' : 'var(--cream)', fontStyle: c.italic ? 'italic' : 'normal' }}>{c.bot}</p>
    </div>
  )
  if (c.type === 'split-details') return (
    <div style={wrapStyle}>
      <p style={TAG}>{c.tag}</p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'clamp(16px, 3vw, 48px)', flexWrap: 'wrap' }}>
        <div>
          <p style={{ ...TIT, color: 'var(--cream)' }}>{c.top}</p>
          <p style={{ ...TIT, color: 'var(--warm)' }}>{c.bot}</p>
        </div>
        <div style={{ paddingBottom: 8 }}>
          {c.details.map((d) => <p key={d} style={{ ...TAG, marginBottom: 10 }}>{d}</p>)}
        </div>
      </div>
    </div>
  )
  if (c.type === 'right-tags') return (
    <div style={wrapStyle}>
      <p style={TAG}>{c.tag}</p>
      <p style={{ ...TIT, color: 'var(--cream)' }}>{c.top}</p>
      <p style={{ ...TIT, color: 'var(--warm)' }}>{c.bot}</p>
      <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.6vw, 22px)', fontStyle: 'italic', color: 'var(--warm)', marginTop: 16, textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>{c.sub}</p>
      <div style={{ display: 'flex', gap: 20, marginTop: 20, justifyContent: 'flex-end' }}>
        {c.tags.map((t) => <span key={t} style={{ ...TAG, marginBottom: 0 }}>{t}</span>)}
      </div>
    </div>
  )
  if (c.type === 'split-sub') return (
    <div style={wrapStyle}>
      <p style={{ ...TIT, color: 'var(--cream)' }}>{c.top}</p>
      <p style={{ ...TIT, color: 'var(--warm)', fontStyle: 'italic' }}>{c.bot}</p>
      <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(16px, 1.6vw, 22px)', fontStyle: 'italic', color: 'var(--warm)', marginTop: 16, textShadow: '0 1px 12px rgba(0,0,0,0.8)' }}>{c.sub}</p>
      <p style={{ ...TAG, marginTop: 10 }}>{c.tag}</p>
    </div>
  )
  if (c.type === 'cta') return (
    <div style={wrapStyle}>
      <p style={{ ...TAG, marginBottom: 28 }}>{c.tag}</p>
      <p style={{ ...TIT, color: 'var(--cream)' }}>{c.top}</p>
      <p style={{ ...TIT, color: 'var(--warm)', fontStyle: 'italic' }}>{c.bot}</p>
      <div style={{ marginTop: 44 }}>
        <Link to="/properties" className="btn-outline" data-cursor="open">DÉCOUVRIR LES BIENS →</Link>
      </div>
    </div>
  )
  return null
}

export default function ImmersiveHouse() {
  const wrapRef  = useRef(null)
  const videoRef = useRef(null)
  const barRef   = useRef(null)
  const [currentIdx, setCurrentIdx] = useState(0)
  const [vidReady, setVidReady] = useState(false)
  const [vidError, setVidError] = useState(false)
  const [loadPercent, setLoadPercent] = useState(0)

  // Précharge complète de la vidéo via fetch (blob) — permet de suivre la vraie progression
  useEffect(() => {
    let cancelled = false
    const url = '/assets/house-walkthrough.mp4'

    async function preload() {
      try {
        const response = await fetch(url)
        if (!response.ok) throw new Error('Fetch failed')

        const total = parseInt(response.headers.get('content-length') || '0', 10)
        const reader = response.body.getReader()
        const chunks = []
        let received = 0

        while (true) {
          const { done, value } = await reader.read()
          if (done) break
          if (cancelled) return
          chunks.push(value)
          received += value.length
          if (total > 0) {
            setLoadPercent(Math.min(99, Math.round((received / total) * 100)))
          }
        }

        if (cancelled) return

        // Assemble en blob et attache au <video>
        const blob = new Blob(chunks, { type: 'video/mp4' })
        const blobUrl = URL.createObjectURL(blob)
        const vid = videoRef.current
        if (vid) {
          vid.src = blobUrl
          vid.load()
          const onReady = () => {
            setLoadPercent(100)
            setTimeout(() => setVidReady(true), 400) // petite pause pour laisser voir 100%
            vid.removeEventListener('loadedmetadata', onReady)
          }
          vid.addEventListener('loadedmetadata', onReady)
        }
      } catch (err) {
        console.warn('Video preload failed:', err)
        if (!cancelled) setVidError(true)
      }
    }

    preload()
    return () => { cancelled = true }
  }, [])

  // Tracking scroll (actif seulement une fois la vidéo prête)
  useEffect(() => {
    const wrap = wrapRef.current
    if (!wrap) return
    const N = SECTIONS.length

    const update = () => {
      const rect = wrap.getBoundingClientRect()
      const total = rect.height - window.innerHeight
      const scrolled = Math.max(0, Math.min(total, -rect.top))
      const p = total > 0 ? scrolled / total : 0

      const vid = videoRef.current
      if (vid && vidReady && vid.duration > 0) {
        vid.currentTime = vid.duration * p
      }
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`

      const idx = Math.min(N - 1, Math.floor(p * N))
      setCurrentIdx((cur) => (cur === idx ? cur : idx))
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [vidReady])

  const current = SECTIONS[currentIdx]
  const navSections = SECTIONS.filter((s) => s.navLabel)

  return (
    <div ref={wrapRef} style={{ height: '700vh' }} aria-label="Visite immersive de la maison">
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#0A0A0A' }}>

        {/* LOADER PREMIUM — s'affiche pendant le préchargement */}
        {!vidReady && !vidError && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 32,
            background: '#0A0A0A',
          }}>
            {/* Petit trait doré animé */}
            <div style={{
              width: 32, height: 1,
              background: 'var(--gold)',
              opacity: 0.6,
            }} />

            {/* Texte élégant */}
            <div style={{ textAlign: 'center' }}>
              <p style={{
                fontFamily: 'var(--serif)',
                fontSize: 'clamp(22px, 3vw, 30px)',
                fontStyle: 'italic',
                color: 'var(--cream)',
                margin: 0,
                marginBottom: 12,
              }}>
                Préparation de l'expérience
              </p>
              <p style={{
                fontFamily: 'var(--sans)',
                fontSize: 10,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                margin: 0,
              }}>
                Chargement de la visite immersive
              </p>
            </div>

            {/* Barre de progression */}
            <div style={{
              width: 240, maxWidth: '70vw',
              height: 1,
              background: 'rgba(196,168,130,0.12)',
              position: 'relative', overflow: 'hidden',
              marginTop: 8,
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: `${loadPercent}%`,
                background: 'var(--gold)',
                transition: 'width 0.4s ease',
              }} />
            </div>

            {/* Pourcentage */}
            <p style={{
              fontFamily: 'var(--sans)',
              fontSize: 11,
              letterSpacing: '0.25em',
              color: 'var(--warm)',
              margin: 0,
              opacity: 0.7,
              minHeight: 16,
            }}>
              {loadPercent}%
            </p>
          </div>
        )}

        {/* VIDÉO — invisible tant que non prête */}
        {!vidError && (
          <video ref={videoRef}
            poster="/assets/house-poster.jpg"
            muted playsInline preload="none" aria-hidden="true"
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%',
              objectFit: 'cover', zIndex: 1,
              opacity: vidReady ? 1 : 0, transition: 'opacity 1.2s ease',
            }}
            onError={() => setVidError(true)}
          />
        )}

        {/* Message d'erreur (fallback) */}
        {vidError && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0A0A0A',
          }}>
            <p style={{ fontFamily: 'var(--sans)', fontSize: 12, color: 'var(--muted)' }}>
              La vidéo n'a pas pu être chargée.
            </p>
          </div>
        )}

        <div style={{
          position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.6) 100%)',
        }} />

        <div style={{ position: 'absolute', inset: 0, zIndex: 5 }}>
          {SECTIONS.map((sec, i) => (
            <SectionText key={sec.id} section={sec} isActive={i === currentIdx} />
          ))}
        </div>

        <div style={{ position: 'absolute', inset: 0, zIndex: 6, pointerEvents: 'none' }}>
          <PropertyNavigation sections={navSections} currentId={current.id} />
        </div>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'rgba(255,255,255,0.06)', zIndex: 7 }}>
          <div ref={barRef} style={{ height: '100%', background: 'var(--gold)', transformOrigin: 'left', transform: 'scaleX(0)' }} />
        </div>
      </div>
    </div>
  )
}