// EnvelopeStack.jsx
// A clickable pile of pixel-art envelopes that lives on the desk.
// Props:
//   count      — number of saved letters
//   isBouncing — plays bounce animation when a letter is sealed
//   onClick    — opens the collection view

export default function EnvelopeStack({ count, isBouncing, onClick }) {
  return (
    <div
      className={`env-stack-container ${isBouncing ? 'is-bouncing' : ''}`}
      onClick={onClick}
      title="Open my letters"
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick?.()}
    >
      {/* 4 stacked envelopes, each slightly offset/rotated */}
      <PixelEnvelope rotate={-5} translateY={10} zIndex={1} color="cream" />
      <PixelEnvelope rotate={3}  translateY={6}  zIndex={2} color="pink"  />
      <PixelEnvelope rotate={-2} translateY={3}  zIndex={3} color="cream" />
      <PixelEnvelope rotate={4}  translateY={0}  zIndex={4} color="pink" showRibbon />

      {/* Letter count badge */}
      {count > 0 && (
        <div className="env-count-badge">{count}</div>
      )}

      {/* Label (visible on hover) */}
      <div className="env-stack-label">my letters ✿</div>
    </div>
  )
}

/* ── Single Pixel Envelope ─────────────────────────────────── */
function PixelEnvelope({ rotate, translateY, zIndex, color, showRibbon }) {
  // Color variants
  const colors = {
    cream: {
      body:   '#FFF0C4',
      flap:   '#F0D880',
      foldL:  '#E8C870',
      foldR:  '#E8C870',
      bottom: '#FFDDA0',
      border: '#C89040',
    },
    pink: {
      body:   '#FFD6E0',
      flap:   '#FFB3C1',
      foldL:  '#FF8FA3',
      foldR:  '#FF8FA3',
      bottom: '#FFD6E0',
      border: '#E8577A',
    },
  }

  const c = colors[color] ?? colors.cream
  const W = 110   // envelope width (px)
  const H = 76    // envelope height (px)
  const cx = W / 2  // center x
  const my = H * 0.52  // flap depth

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 12,
        left: 8,
        transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
        zIndex,
        width: W,
        height: H,
        cursor: 'pointer',
        /* Hard pixel shadow */
        filter: `drop-shadow(3px 3px 0 rgba(0,0,0,0.15))`,
      }}
    >
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        xmlns="http://www.w3.org/2000/svg"
        shapeRendering="crispEdges"
        style={{ imageRendering: 'pixelated', overflow: 'visible' }}
      >
        {/* ── Main body ── */}
        <rect x="0" y="0" width={W} height={H} fill={c.body} />

        {/* ── Bottom fold ── */}
        <polygon points={`0,${H} ${W},${H} ${cx},${my}`} fill={c.bottom} />

        {/* ── Left fold ── */}
        <polygon points={`0,0 0,${H} ${cx},${my}`} fill={c.foldL} />

        {/* ── Right fold ── */}
        <polygon points={`${W},0 ${W},${H} ${cx},${my}`} fill={c.foldR} />

        {/* ── Top flap (sealed) ── */}
        <polygon points={`0,0 ${W},0 ${cx},${my}`} fill={c.flap} />

        {/* ── Fold lines ── */}
        <line x1="0"  y1="0"  x2={cx} y2={my}   stroke={c.border} strokeWidth="1" opacity="0.5" />
        <line x1={W}  y1="0"  x2={cx} y2={my}   stroke={c.border} strokeWidth="1" opacity="0.5" />
        <line x1="0"  y1={H}  x2={cx} y2={my}   stroke={c.border} strokeWidth="1" opacity="0.5" />
        <line x1={W}  y1={H}  x2={cx} y2={my}   stroke={c.border} strokeWidth="1" opacity="0.5" />

        {/* ── Pixel heart seal in center ── */}
        <rect x={cx - 2} y={my - 2} width="4" height="4" fill="#E85D52" opacity="0.7" />
        <rect x={cx - 5} y={my - 5} width="3" height="3" fill="#E85D52" opacity="0.7" />
        <rect x={cx + 2} y={my - 5} width="3" height="3" fill="#E85D52" opacity="0.7" />
        <rect x={cx - 4} y={my + 2} width="8" height="2" fill="#E85D52" opacity="0.5" />

        {/* ── Border ── */}
        <rect x="1" y="1" width={W - 2} height={H - 2}
          fill="none" stroke={c.border} strokeWidth="3" />
      </svg>

      {/* Pink ribbon cross on top envelope */}
      {showRibbon && (
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}>
          {/* Horizontal ribbon */}
          <div style={{
            position: 'absolute',
            top: '50%', left: 0, right: 0,
            height: 4,
            background: '#E8577A',
            transform: 'translateY(-50%)',
            opacity: 0.75,
          }} />
          {/* Vertical ribbon */}
          <div style={{
            position: 'absolute',
            left: '50%', top: 0, bottom: 0,
            width: 4,
            background: '#E8577A',
            transform: 'translateX(-50%)',
            opacity: 0.75,
          }} />
          {/* Bow knot */}
          <div style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 12, height: 12,
            background: '#E8577A',
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.35)',
          }} />
        </div>
      )}
    </div>
  )
}
