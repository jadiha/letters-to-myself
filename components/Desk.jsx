'use client'

// Desk.jsx — Pixel-art cozy night room scene.
// Wall layer: string lights + pixel window.
// Desk layer: plant, books, mug, candle, inkwell, pen, petals.

export default function Desk() {
  return (
    <>
      {/* ── Wall Decorations ── */}
      <PixelStringLights />
      <PixelWindow />

      {/* ── Desk Surface ── */}
      <div className="desk-strip">
        <div className="desk-edge" />
        <PixelPlant   style={{ position: 'absolute', left: 64,   bottom: 8  }} />
        <PixelBooks   style={{ position: 'absolute', left: 170,  bottom: 8  }} />
        <PixelMug     style={{ position: 'absolute', left: 306,  bottom: 16 }} />
        <PixelCandle  style={{ position: 'absolute', right: 248, bottom: 10 }} />
        <PixelInkwell style={{ position: 'absolute', right: 312, bottom: 16 }} />
        <PixelPen     style={{ position: 'absolute', right: 390, bottom: 22 }} />
        <Petals />
      </div>
    </>
  )
}

/* ── String Lights ──────────────────────────────────────────── */
function PixelStringLights() {
  const W = 1200
  const COLORS = ['#FFE566', '#FF9966', '#FFAACC', '#88BBFF', '#AAFFCC', '#FFD466']
  const N = 22
  const wireY = 14

  const bulbs = Array.from({ length: N }, (_, i) => ({
    x: Math.round(30 + (i * (W - 60)) / (N - 1)),
    color: COLORS[i % COLORS.length],
  }))

  // Build wire path segments with slight droop between bulbs
  const wireParts = bulbs.map((b, i) => {
    if (i === 0) return null
    const prev = bulbs[i - 1]
    const mx = (prev.x + b.x) / 2
    return `M ${prev.x} ${wireY} Q ${mx} ${wireY + 7} ${b.x} ${wireY}`
  }).filter(Boolean).join(' ')

  return (
    <svg
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100%', height: 52,
        pointerEvents: 'none', zIndex: 3,
      }}
      viewBox={`0 0 ${W} 52`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Wall hooks */}
      <rect x="16" y="4" width="8" height="8" fill="#4A3060" stroke="#2A1040" strokeWidth="1" />
      <rect x={W - 24} y="4" width="8" height="8" fill="#4A3060" stroke="#2A1040" strokeWidth="1" />

      {/* Wire from hooks to first/last bulb */}
      <line x1="20" y1="8" x2={bulbs[0].x} y2={wireY} stroke="#3A2050" strokeWidth="1.5" />
      <line x1={bulbs[N - 1].x} y1={wireY} x2={W - 20} y2="8" stroke="#3A2050" strokeWidth="1.5" />

      {/* Draped wire segments */}
      <path d={wireParts} stroke="#3A2050" strokeWidth="1.5" fill="none" />

      {/* Bulbs */}
      {bulbs.map((b, i) => (
        <g key={i}>
          {/* Glow halo */}
          <rect x={b.x - 9} y="12" width="18" height="18" fill={b.color} opacity="0.10" />
          {/* Cap */}
          <rect x={b.x - 3} y={wireY - 1} width="6" height="5" fill="#2A1840" />
          {/* Body */}
          <rect x={b.x - 5} y={wireY + 4} width="10" height="12" fill={b.color} />
          {/* Highlight */}
          <rect x={b.x - 4} y={wireY + 5} width="3" height="3" fill="rgba(255,255,255,0.45)" />
        </g>
      ))}
    </svg>
  )
}

/* ── Pixel Window ───────────────────────────────────────────── */
function PixelWindow() {
  const W = 130
  const H = 150
  const CW = 22   // curtain width each side
  const GX = CW   // glass x start
  const GW = W - CW * 2
  const GH = H - 14  // sill takes 14px

  const stars = [
    [12, 12], [36,  7], [54, 24], [74, 9],  [83, 36],
    [16, 44], [46, 52], [64, 65], [76, 82], [20, 76],
    [56, 92], [82, 56], [33,102], [68,110],
  ]

  return (
    <svg
      width={W} height={H}
      viewBox={`0 0 ${W} ${H}`}
      shapeRendering="crispEdges"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'fixed', top: '10vh', left: '6vw',
        zIndex: 2, pointerEvents: 'none',
        filter: 'drop-shadow(4px 4px 0 rgba(0,0,0,0.45))',
      }}
    >
      {/* Outer frame */}
      <rect x="0" y="0" width={W} height={H} fill="#3A2458" />
      <rect x="0" y="0" width={W} height={H} fill="none" stroke="#2A1440" strokeWidth="4" />

      {/* Left curtain panels */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x="2" y={2 + i * 18} width={CW - 2} height="18"
          fill={i % 2 === 0 ? '#F0BECB' : '#E0A8B8'} />
      ))}
      {/* Left curtain shadow edge */}
      <rect x={CW - 4} y="2" width="4" height={H - 4} fill="#C890A4" opacity="0.6" />

      {/* Right curtain panels */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <rect key={i} x={W - CW + 2} y={2 + i * 18} width={CW - 4} height="18"
          fill={i % 2 === 0 ? '#F0BECB' : '#E0A8B8'} />
      ))}
      <rect x={W - CW} y="2" width="4" height={H - 4} fill="#C890A4" opacity="0.6" />

      {/* Night sky */}
      <rect x={GX} y="2" width={GW} height={GH} fill="#12102A" />
      {/* Sky tint near moon */}
      <rect x={GX + GW - 30} y="2" width="30" height="40" fill="#1E1A3A" />

      {/* Stars */}
      {stars.map(([sx, sy], i) => (
        <rect key={i}
          x={GX + (sx % GW)}
          y={2 + (sy % GH)}
          width={i % 4 === 0 ? 2 : 1}
          height={i % 4 === 0 ? 2 : 1}
          fill="white"
          opacity={0.45 + (i % 5) * 0.11}
        />
      ))}

      {/* Crescent moon */}
      <circle cx={GX + GW - 18} cy={18} r={10} fill="#FFF0B0" />
      <circle cx={GX + GW - 13} cy={15} r={9}  fill="#12102A" />

      {/* Window cross dividers */}
      <rect x={GX} y={GH / 2 - 2} width={GW} height="4" fill="#3A2458" />
      <rect x={GX + GW / 2 - 2} y="2" width="4" height={GH} fill="#3A2458" />

      {/* Windowsill */}
      <rect x="0" y={H - 14} width={W} height="14" fill="#5A4072" />
      <rect x="0" y={H - 14} width={W} height="4"  fill="#6A5082" />
      <rect x="0" y={H - 4}  width={W} height="4"  fill="#2A1442" />
    </svg>
  )
}

/* ── Pixel Plant ────────────────────────────────────────────── */
function PixelPlant({ style }) {
  return (
    <svg width="62" height="90" viewBox="0 0 62 90"
      shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg" style={style}>

      {/* Center stem */}
      <rect x="29" y="14" width="4" height="30" fill="#4A7038" />

      {/* Left leaf */}
      <rect x="8"  y="16" width="22" height="6" fill="#7DAF6E" />
      <rect x="5"  y="20" width="24" height="6" fill="#6DA060" />
      <rect x="7"  y="26" width="20" height="5" fill="#527A44" />
      <rect x="10" y="31" width="14" height="4" fill="#3D5C32" />

      {/* Right leaf */}
      <rect x="32" y="20" width="22" height="6" fill="#7DAF6E" />
      <rect x="33" y="26" width="22" height="6" fill="#6DA060" />
      <rect x="35" y="32" width="16" height="5" fill="#527A44" />
      <rect x="37" y="37" width="10" height="4" fill="#3D5C32" />

      {/* Top small leaf */}
      <rect x="23" y="8"  width="16" height="8" fill="#7DAF6E" />
      <rect x="25" y="3"  width="12" height="7" fill="#6DA060" />
      <rect x="27" y="0"  width="8"  height="5" fill="#527A44" />

      {/* Pot rim */}
      <rect x="10" y="44" width="42" height="7" fill="#D4856A" />
      <rect x="10" y="44" width="42" height="2" fill="#E8A080" />
      <rect x="10" y="49" width="42" height="2" fill="#B86848" />
      <rect x="10" y="44" width="42" height="7" fill="none" stroke="#8B3A1A" strokeWidth="2" />

      {/* Pot body */}
      <rect x="12" y="51" width="38" height="30" fill="#C4754A" />
      <rect x="14" y="53" width="10" height="4"  fill="#D4906A" />
      <rect x="12" y="77" width="38" height="4"  fill="#A85A38" />
      <rect x="12" y="51" width="38" height="30" fill="none" stroke="#8B3A1A" strokeWidth="2" />

      {/* Saucer */}
      <rect x="6"  y="81" width="50" height="7" fill="#C07048" />
      <rect x="6"  y="81" width="50" height="7" fill="none" stroke="#8B3A1A" strokeWidth="1.5" />
    </svg>
  )
}

/* ── Pixel Books (upright, side by side) ────────────────────── */
function PixelBooks({ style }) {
  const books = [
    { w: 22, h: 72, x: 0,  body: '#D4B8C2', spine: '#B09099', page: '#F0E8E0', label: '#8A6070' },
    { w: 28, h: 80, x: 24, body: '#B0C4D8', spine: '#8AACC0', page: '#F0E8E0', label: '#607080' },
    { w: 20, h: 64, x: 54, body: '#B8D4A8', spine: '#8AB890', page: '#F0E8E0', label: '#507040' },
  ]
  const maxH = 82

  return (
    <svg width="76" height={maxH + 8} viewBox={`0 0 76 ${maxH + 8}`}
      shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg" style={style}>
      {books.map((b) => {
        const y = maxH - b.h
        return (
          <g key={b.x}>
            {/* Shadow */}
            <rect x={b.x + 2} y={y + 2} width={b.w} height={b.h} fill="rgba(0,0,0,0.22)" />
            {/* Body */}
            <rect x={b.x} y={y} width={b.w} height={b.h} fill={b.body} />
            {/* Spine */}
            <rect x={b.x} y={y} width={5} height={b.h} fill={b.spine} />
            {/* Pages (right edge) */}
            <rect x={b.x + b.w - 3} y={y + 2} width={3} height={b.h - 2} fill={b.page} />
            {/* Title bar */}
            <rect x={b.x + 7} y={y + 12} width={b.w - 12} height={5} fill={b.label} opacity="0.7" />
            <rect x={b.x + 7} y={y + 20} width={b.w - 14} height={3} fill={b.label} opacity="0.4" />
            {/* Outline */}
            <rect x={b.x} y={y} width={b.w} height={b.h} fill="none" stroke="#2A1820" strokeWidth="1.5" />
          </g>
        )
      })}
      {/* Floor shadow */}
      <rect x="0" y={maxH} width="76" height="6" fill="rgba(0,0,0,0.15)" />
    </svg>
  )
}

/* ── Pixel Mug ──────────────────────────────────────────────── */
function PixelMug({ style }) {
  return (
    <svg width="46" height="56" viewBox="0 0 46 56"
      shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg" style={style}>

      {/* Steam pixels */}
      <rect x="8"  y="0" width="2" height="10" fill="rgba(255,255,255,0.30)" />
      <rect x="15" y="2" width="2" height="9"  fill="rgba(255,255,255,0.40)" />
      <rect x="22" y="0" width="2" height="10" fill="rgba(255,255,255,0.30)" />

      {/* Rim */}
      <rect x="4"  y="11" width="26" height="4" fill="#F4CDD2" />
      {/* Body */}
      <rect x="4"  y="15" width="26" height="28" fill="#EEC0C8" />
      {/* Highlight */}
      <rect x="6"  y="17" width="8"  height="9"  fill="#FBE0E4" />
      {/* Tea surface */}
      <rect x="6"  y="13" width="22" height="4"  fill="#C89858" />

      {/* Handle — pixel U shape */}
      <rect x="30" y="18" width="4"  height="4"  fill="#EEC0C8" />
      <rect x="34" y="22" width="5"  height="12" fill="#EEC0C8" />
      <rect x="30" y="34" width="4"  height="4"  fill="#EEC0C8" />
      <rect x="30" y="18" width="4"  height="4"  fill="none" stroke="#C09098" strokeWidth="1" />
      <rect x="34" y="22" width="5"  height="12" fill="none" stroke="#C09098" strokeWidth="1" />
      <rect x="30" y="34" width="4"  height="4"  fill="none" stroke="#C09098" strokeWidth="1" />

      {/* Mug outline */}
      <rect x="4" y="11" width="26" height="32" fill="none" stroke="#C09098" strokeWidth="2" />

      {/* Base */}
      <rect x="3"  y="43" width="28" height="5" fill="#D8B0B8" />
      <rect x="3"  y="43" width="28" height="5" fill="none" stroke="#C09098" strokeWidth="1.5" />
    </svg>
  )
}

/* ── Pixel Candle ───────────────────────────────────────────── */
function PixelCandle({ style }) {
  return (
    <div style={{ position: 'relative', display: 'inline-block', ...style }}>
      <svg width="28" height="82" viewBox="0 0 28 82"
        shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">

        {/* Glow behind flame — soft rect */}
        <rect x="3" y="0" width="22" height="26" fill="#FFD060" opacity="0.12" />

        {/* Flame — orange base */}
        <rect x="9"  y="14" width="10" height="12" fill="#FF9900" />
        {/* Flame — yellow mid */}
        <rect x="10" y="8"  width="8"  height="8"  fill="#FFD700" />
        {/* Flame — white tip */}
        <rect x="11" y="4"  width="6"  height="6"  fill="#FFF6AA" />
        <rect x="12" y="1"  width="4"  height="4"  fill="#FFFFFF" />

        {/* Wick */}
        <rect x="13" y="25" width="2" height="5" fill="#3A1A08" />

        {/* Candle body */}
        <rect x="8"  y="30" width="12" height="42" fill="#F4D8DC" />
        {/* Highlight strip */}
        <rect x="9"  y="32" width="4"  height="38" fill="#FBE8EA" />
        {/* Wax drip */}
        <rect x="8"  y="30" width="5"  height="8"  fill="#FBE8EA" />
        {/* Body outline */}
        <rect x="8"  y="30" width="12" height="42" fill="none" stroke="#D4A0A8" strokeWidth="2" />

        {/* Holder */}
        <rect x="4"  y="72" width="20" height="6"  fill="#D4B0B8" />
        <rect x="2"  y="76" width="24" height="4"  fill="#C4A0A8" />
        <rect x="2"  y="76" width="24" height="4"  fill="none" stroke="#B09098" strokeWidth="1.5" />
      </svg>

      <style>{`
        @keyframes candleFlicker {
          0%,100% { opacity: 0.85; transform: scaleX(1); }
          33%  { opacity: 1;    transform: scaleX(0.92) translateX(-1px); }
          66%  { opacity: 0.9;  transform: scaleX(1.08) translateX(1px); }
        }
        @keyframes candleGlow {
          0%,100% { opacity: 0.12; }
          50% { opacity: 0.22; }
        }
      `}</style>
    </div>
  )
}

/* ── Pixel Inkwell ──────────────────────────────────────────── */
function PixelInkwell({ style }) {
  return (
    <svg width="30" height="36" viewBox="0 0 30 36"
      shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg" style={style}>
      {/* Neck */}
      <rect x="9"  y="0"  width="12" height="9"  fill="#2C1810" stroke="#1A0C06" strokeWidth="1.5" />
      {/* Ink cap */}
      <rect x="7"  y="4"  width="16" height="5"  fill="#1A0C06" />
      {/* Shoulder */}
      <rect x="4"  y="9"  width="22" height="5"  fill="#2C1810" />
      {/* Body */}
      <rect x="2"  y="14" width="26" height="16" fill="#2C1810" />
      {/* Highlight */}
      <rect x="4"  y="16" width="5"  height="9"  fill="#4A2E1C" opacity="0.8" />
      {/* Outline */}
      <rect x="2"  y="14" width="26" height="16" fill="none" stroke="#1A0C06" strokeWidth="2" />
      {/* Base */}
      <rect x="0"  y="30" width="30" height="5"  fill="#1A0C06" />
    </svg>
  )
}

/* ── Pixel Pen ──────────────────────────────────────────────── */
function PixelPen({ style }) {
  return (
    <svg width="114" height="14" viewBox="0 0 114 14"
      shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg"
      style={{ transform: 'rotate(-5deg)', ...style }}>
      {/* Body */}
      <rect x="0"  y="3" width="88" height="8" fill="#E8C0CC" />
      <rect x="0"  y="3" width="88" height="3" fill="#F6D8E0" />
      <rect x="0"  y="3" width="88" height="8" fill="none" stroke="#C090A0" strokeWidth="1.5" />
      {/* Clip */}
      <rect x="72" y="0" width="3"  height="13" fill="#D0A0B0" stroke="#B080A0" strokeWidth="1" />
      {/* Metal band */}
      <rect x="84" y="3" width="6"  height="8"  fill="#C8C8C8" stroke="#A0A0A0" strokeWidth="1" />
      {/* Tip section */}
      <rect x="90" y="4" width="14" height="6"  fill="#A8A8A8" stroke="#888888" strokeWidth="1" />
      {/* Tip point */}
      <rect x="104" y="5" width="6" height="4"  fill="#888888" />
      <rect x="108" y="6" width="4" height="2"  fill="#666666" />
    </svg>
  )
}

/* ── Cherry Blossom Petals ──────────────────────────────────── */
function Petals() {
  const petals = [
    { w: 12, h: 16, bg: '#F2D4D7', btm: 42, right: 440, rot: 28  },
    { w:  8, h: 12, bg: '#E8B4BC', btm: 55, right: 255, rot: -42 },
    { w: 11, h: 15, bg: '#FDEAED', btm: 38, right: 480, rot: 72  },
    { w: 10, h: 13, bg: '#F2D4D7', btm: 48, left:  200, rot: -22 },
    { w: 12, h: 16, bg: '#FDEAED', btm: 36, left:  270, rot: 58  },
    { w:  8, h: 11, bg: '#E8B4BC', btm: 44, left:  360, rot: -65 },
    { w: 10, h: 14, bg: '#F5D0D8', btm: 30, left:  455, rot: 18  },
    { w:  8, h: 12, bg: '#F2D4D7', btm: 58, left:  530, rot: -30 },
  ]

  return (
    <>
      {petals.map((p, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: p.w, height: p.h,
          background: p.bg,
          // Pixel-art: no border-radius → use clip-path for petal shape
          clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
          opacity: 0.65,
          transform: `rotate(${p.rot}deg)`,
          bottom: p.btm,
          ...(p.right !== undefined ? { right: p.right } : { left: p.left }),
        }} />
      ))}
    </>
  )
}
