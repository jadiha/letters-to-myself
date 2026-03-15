// Desk.jsx
// The pixel-art desk scene: surface, edge, and all decorative items.
// Everything here is purely visual — no props, no state.

export default function Desk() {
  return (
    <>
      {/* ── Desk Surface ─────────────────────────────── */}
      <div className="desk-strip">
        <div className="desk-edge" />

        {/* ── Plant — left side ── */}
        <PixelPlant style={{ position: 'absolute', left: 72, bottom: 12 }} />

        {/* ── Stacked books — beside plant ── */}
        <PixelBooks style={{ position: 'absolute', left: 180, bottom: 12 }} />

        {/* ── Mug — beside books ── */}
        <PixelMug style={{ position: 'absolute', left: 316, bottom: 22 }} />

        {/* ── Candle — right area ── */}
        <PixelCandle style={{ position: 'absolute', right: 230, bottom: 18 }} />

        {/* ── Inkwell ── */}
        <PixelInkwell style={{ position: 'absolute', right: 300, bottom: 20 }} />

        {/* ── Pen lying on desk ── */}
        <PixelPen style={{ position: 'absolute', right: 380, bottom: 28 }} />

        {/* ── Washi tape rolls ── */}
        <WashiGroup style={{ position: 'absolute', right: 145, bottom: 22 }} />

        {/* ── Scattered petals ── */}
        <Petals />
      </div>
    </>
  )
}

/* ── Pixel Plant ───────────────────────────────────────────── */
function PixelPlant({ style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}>
      {/* Leaves */}
      <div style={{ position: 'relative', width: 64, height: 68, marginBottom: -6 }}>
        {[
          { w: 14, h: 28, left: 22, bottom: 0,  rotate: -38, color: '#527A44' },
          { w: 17, h: 32, left: 22, bottom: 0,  rotate: -12, color: '#7DAF6E' },
          { w: 17, h: 32, left: 25, bottom: 0,  rotate:  14, color: '#6DA060' },
          { w: 13, h: 24, left: 14, bottom: 6,  rotate: -56, color: '#527A44', opacity: 0.85 },
          { w: 13, h: 24, left: 32, bottom: 6,  rotate:  52, color: '#6DA060', opacity: 0.85 },
          { w: 11, h: 20, left:  8, bottom: 14, rotate: -70, color: '#7DAF6E', opacity: 0.7  },
        ].map((leaf, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: leaf.w, height: leaf.h,
              left: leaf.left, bottom: leaf.bottom,
              background: `linear-gradient(to top, ${leaf.color}, ${leaf.color}BB)`,
              borderRadius: '50% 50% 40% 40% / 60% 60% 40% 40%',
              transform: `rotate(${leaf.rotate}deg)`,
              transformOrigin: 'bottom center',
              opacity: leaf.opacity ?? 1,
              boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.12)',
            }}
          />
        ))}
      </div>
      {/* Pot rim */}
      <div style={{
        width: 50, height: 9,
        background: 'linear-gradient(to bottom, #D4856A, #C07458)',
        borderRadius: '2px 2px 0 0',
      }} />
      {/* Pot body */}
      <div style={{
        width: 44, height: 36, margin: '0 auto',
        background: 'linear-gradient(135deg, #D4856A 0%, #B8604A 100%)',
        borderRadius: '0 0 6px 6px',
        border: '2px solid #9A4028',
        boxShadow: '3px 3px 0 rgba(0,0,0,0.2)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)',
          width: 30, height: 5, background: '#3E2010',
          borderRadius: '50%', opacity: 0.4,
        }} />
      </div>
      {/* Saucer */}
      <div style={{
        width: 54, height: 6,
        background: 'linear-gradient(to right, #C07048, #D4856A, #C07048)',
        border: '1px solid #9A4028',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.15)',
      }} />
    </div>
  )
}

/* ── Pixel Books (stacked flat) ────────────────────────────── */
function PixelBooks({ style }) {
  const books = [
    { w: 92, color: '#D4B8C2', dark: '#B0909C', offset: 8 },
    { w: 80, color: '#B0C4D8', dark: '#8CAAC2', offset: 5 },
    { w: 98, color: '#B8D4B0', dark: '#8AB08A', offset: 0 },
    { w: 74, color: '#DED0B8', dark: '#C0AE98', offset: 10 },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, ...style }}>
      {books.map((b, i) => (
        <div
          key={i}
          style={{
            width: b.w, height: 14,
            background: b.color,
            border: `2px solid ${b.dark}`,
            boxShadow: '2px 2px 0 rgba(0,0,0,0.15)',
            marginLeft: b.offset,
            position: 'relative',
          }}
        >
          {/* Spine line */}
          <div style={{
            position: 'absolute',
            left: 5, top: 0, bottom: 0,
            width: 2, background: b.dark,
          }} />
        </div>
      ))}
    </div>
  )
}

/* ── Pixel Mug ─────────────────────────────────────────────── */
function PixelMug({ style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}>
      {/* Steam */}
      <div style={{ display: 'flex', gap: 5, height: 14, alignItems: 'flex-end', marginBottom: 2 }}>
        {[0, 0.35, 0.7].map((delay, i) => (
          <div
            key={i}
            style={{
              width: 2, height: i === 1 ? 10 : 12,
              background: 'linear-gradient(to top, rgba(255,255,255,0.5), transparent)',
              animation: `steam 2.2s ease-in-out ${delay}s infinite`,
            }}
          />
        ))}
      </div>
      {/* Mug body */}
      <div style={{
        width: 34, height: 36,
        background: 'linear-gradient(to right, #EEC8CC 0%, #FAE4E6 50%, #EEC8CC 100%)',
        border: '3px solid #D4A0A8',
        boxShadow: '3px 3px 0 rgba(0,0,0,0.18)',
        position: 'relative',
      }}>
        {/* Handle — right side */}
        <div style={{
          position: 'absolute',
          right: -12, top: 6,
          width: 12, height: 16,
          border: '3px solid #D4A0A8',
          borderLeft: 'none',
          background: 'transparent',
        }} />
        {/* Tea surface */}
        <div style={{
          position: 'absolute', top: 5, left: '50%', transform: 'translateX(-50%)',
          width: 22, height: 4, background: 'rgba(180,100,80,0.25)', borderRadius: '50%',
        }} />
      </div>
      {/* Base */}
      <div style={{
        width: 38, height: 4,
        background: 'linear-gradient(to right, #DDB4B8, #EEC8CC, #DDB4B8)',
        border: '2px solid #D4A0A8',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.12)',
      }} />

      <style>{`
        @keyframes steam {
          0%,100% { opacity: 0.25; transform: scaleX(1) translateY(0); }
          50%      { opacity: 0.6;  transform: scaleX(0.5) translateY(-4px); }
        }
      `}</style>
    </div>
  )
}

/* ── Pixel Candle ──────────────────────────────────────────── */
function PixelCandle({ style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', ...style }}>
      {/* Glow halo */}
      <div style={{
        position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
        width: 70, height: 70,
        background: 'radial-gradient(circle, rgba(255,210,80,0.25) 0%, transparent 68%)',
        pointerEvents: 'none',
        animation: 'flickerGlow 0.4s ease-in-out infinite alternate',
      }} />

      {/* Flame */}
      <div style={{ position: 'relative', width: 16, height: 28, marginBottom: -2 }}>
        <div style={{
          position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)',
          width: 12, height: 24,
          background: 'radial-gradient(ellipse at bottom, #FFF9C4 0%, #FFD54F 28%, #FFB300 58%, #FF6F00 82%, transparent 100%)',
          borderRadius: '50% 50% 30% 30% / 60% 60% 40% 40%',
          animation: 'flicker 0.22s ease-in-out infinite alternate',
          transformOrigin: 'bottom center',
        }} />
        <div style={{
          position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
          width: 5, height: 11,
          background: 'radial-gradient(ellipse at bottom, #FFFFFF 0%, #FFF9C4 60%, transparent 100%)',
          borderRadius: '50% 50% 30% 30%',
          animation: 'flickerIn 0.18s ease-in-out infinite alternate',
        }} />
      </div>

      {/* Pink candle body */}
      <div style={{
        width: 16, height: 52,
        background: 'linear-gradient(to right, #EDD4D8 0%, #FAE8EA 38%, #F2D8DA 65%, #E8C8CC 100%)',
        border: '2px solid #D4A0A8',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.15)',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 5,
          width: 4, height: 10,
          background: 'rgba(255,255,255,0.35)',
          borderRadius: '0 0 50% 50%',
        }} />
      </div>
      {/* Holder */}
      <div style={{
        width: 26, height: 6,
        background: 'radial-gradient(ellipse at 40% 30%, #E8B4BC, #C07880)',
        border: '2px solid #A05868',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.18)',
      }} />

      <style>{`
        @keyframes flicker {
          0%   { transform: translateX(-50%) scaleX(1)    scaleY(1)    rotate(-2deg); opacity:.93; }
          30%  { transform: translateX(-51%) scaleX(0.93) scaleY(1.06) rotate( 1deg); opacity:1; }
          65%  { transform: translateX(-49%) scaleX(1.06) scaleY(0.97) rotate(-1deg); opacity:.96; }
          100% { transform: translateX(-50%) scaleX(0.96) scaleY(1.09) rotate( 2deg); opacity:1; }
        }
        @keyframes flickerIn {
          0%   { transform: translateX(-50%) scaleY(1);    opacity:.8; }
          100% { transform: translateX(-50%) scaleY(1.12); opacity:1; }
        }
        @keyframes flickerGlow {
          0%   { opacity:.7; transform: translateX(-50%) scale(1); }
          100% { opacity:1;  transform: translateX(-50%) scale(1.1); }
        }
      `}</style>
    </div>
  )
}

/* ── Pixel Inkwell ─────────────────────────────────────────── */
function PixelInkwell({ style }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', ...style }}>
      <div style={{
        width: 24, height: 22,
        background: 'radial-gradient(ellipse at 35% 30%, #4A3728 0%, #2C1810 58%, #160A04 100%)',
        borderRadius: '40% 40% 34% 34% / 52% 52% 30% 30%',
        border: '2px solid #1A0C06',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.4)',
      }} />
      <div style={{
        width: 14, height: 5,
        background: 'linear-gradient(to right, #3D2418, #5A3828, #3D2418)',
        border: '1px solid #2C1810',
        marginTop: -1,
      }} />
    </div>
  )
}

/* ── Pixel Pen ─────────────────────────────────────────────── */
function PixelPen({ style }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      transform: 'rotate(-6deg)',
      ...style,
    }}>
      {/* Body */}
      <div style={{
        width: 100, height: 8,
        background: 'linear-gradient(to bottom, #E8C8D0 0%, #D4A8B4 50%, #E8C8D0 100%)',
        border: '2px solid #C090A0',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.15)',
        position: 'relative',
      }}>
        {/* Clip detail */}
        <div style={{
          position: 'absolute', top: -3, right: 16,
          width: 3, height: 13,
          background: 'rgba(180,130,140,0.55)',
          border: '1px solid #C090A0',
        }} />
      </div>
      {/* Tip */}
      <div style={{
        width: 11, height: 6,
        background: 'linear-gradient(to right, #888, #AAA)',
        border: '1px solid #666',
        boxShadow: '1px 1px 0 rgba(0,0,0,0.2)',
        alignSelf: 'center',
      }} />
    </div>
  )
}

/* ── Washi Tape Group ──────────────────────────────────────── */
function WashiGroup({ style }) {
  const rolls = [
    { w: 26, h: 26, bg: 'radial-gradient(circle at 35% 30%, #F5D0D8, #E8B4BC)' },
    { w: 30, h: 30, bg: 'radial-gradient(circle at 35% 30%, #C8D8F0, #B0C4E4)' },
    { w: 24, h: 24, bg: 'radial-gradient(circle at 35% 30%, #D4E8C0, #BCD4A4)' },
  ]
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', ...style }}>
      {rolls.map((r, i) => (
        <div key={i} style={{
          width: r.w, height: r.h,
          background: r.bg,
          border: '2px solid rgba(0,0,0,0.14)',
          borderRadius: '50%',
          boxShadow: '2px 2px 0 rgba(0,0,0,0.16)',
          position: 'relative',
        }}>
          {/* Centre hole */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '30%', height: '30%',
            background: 'rgba(140,100,80,0.28)',
            borderRadius: '50%',
          }} />
        </div>
      ))}
    </div>
  )
}

/* ── Cherry Blossom Petals ─────────────────────────────────── */
function Petals() {
  const petals = [
    { w: 13, h: 18, bg: '#F2D4D7', btm: 42, right: 440, rot: 28  },
    { w:  9, h: 13, bg: '#E8B4BC', btm: 55, right: 255, rot: -42 },
    { w: 12, h: 16, bg: '#FDEAED', btm: 38, right: 480, rot: 72  },
    { w: 10, h: 14, bg: '#F2D4D7', btm: 48, left:  200, rot: -22 },
    { w: 13, h: 17, bg: '#FDEAED', btm: 36, left:  270, rot: 58  },
    { w:  8, h: 12, bg: '#E8B4BC', btm: 44, left:  360, rot: -65 },
    { w: 11, h: 15, bg: '#F5D0D8', btm: 30, left:  455, rot: 18  },
    { w:  9, h: 13, bg: '#F2D4D7', btm: 58, left:  530, rot: -30 },
  ]

  return (
    <>
      {petals.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: p.w, height: p.h,
            background: p.bg,
            borderRadius: '50% 0 50% 0',
            opacity: 0.72,
            transform: `rotate(${p.rot}deg)`,
            bottom: p.btm,
            ...(p.right !== undefined ? { right: p.right } : { left: p.left }),
          }}
        />
      ))}
    </>
  )
}
