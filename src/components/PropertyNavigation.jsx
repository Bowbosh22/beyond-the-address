export default function PropertyNavigation({ sections, currentId }) {
  if (!sections?.length) return null
  return (
    <div style={{
      position: 'absolute', right: 'clamp(20px, 3vw, 44px)', top: '50%',
      transform: 'translateY(-50%)', zIndex: 10,
      display: 'flex', flexDirection: 'column', gap: 20,
    }}>
      {sections.map((s) => {
        const active = s.id === currentId
        return (
          <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end' }}>
            <span style={{
              fontFamily: 'var(--sans)', fontSize: '9px', letterSpacing: '0.18em',
              textTransform: 'uppercase', whiteSpace: 'nowrap',
              color: active ? 'var(--gold)' : 'transparent',
              transition: 'color 0.5s ease',
            }} className="nav-section-label">{s.navLabel}</span>
            <div style={{
              height: 1, flexShrink: 0,
              width: active ? 24 : 6,
              background: active ? 'var(--gold)' : 'rgba(255,255,255,0.22)',
              transition: 'width 0.5s cubic-bezier(0.22,1,0.36,1), background 0.5s ease',
            }} />
          </div>
        )
      })}
      <style>{`@media(max-width:480px){.nav-section-label{display:none}}`}</style>
    </div>
  )
}
