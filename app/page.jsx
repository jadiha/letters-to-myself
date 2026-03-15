'use client'

import { useState, useEffect, useRef } from 'react'
import Desk from '../components/Desk'
import EnvelopeStack from '../components/EnvelopeStack'
import LetterModal from '../components/LetterModal'
import CollectionModal from '../components/CollectionModal'

// ── helpers ──────────────────────────────────────────────────
function todayKey() {
  const d = new Date()
  return [
    d.getFullYear(),
    String(d.getMonth() + 1).padStart(2, '0'),
    String(d.getDate()).padStart(2, '0'),
  ].join('-')
}

function fmtDate(iso) {
  const d = iso ? new Date(iso + 'T12:00:00') : new Date()
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

// ── Sparkles component ────────────────────────────────────────
function Sparkles({ origin }) {
  const items = ['🌸', '✨', '💌', '💕', '🌸', '✦']
  return (
    <div className="sparkle-container" style={{ left: origin.x, top: origin.y }}>
      {items.map((s, i) => (
        <span
          key={i}
          className="sparkle"
          style={{
            left: `${(i - 2.5) * 22}px`,
            animationDelay: `${i * 0.06}s`,
          }}
        >
          {s}
        </span>
      ))}
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────
export default function Home() {
  const [isWriting, setIsWriting]           = useState(false)
  const [isSaving, setIsSaving]             = useState(false)
  const [letters, setLetters]               = useState([])
  const [viewingCollection, setViewingCollection] = useState(false)
  const [toast, setToast]                   = useState(null)
  const [toastOut, setToastOut]             = useState(false)
  const [sparkleOrigin, setSparkleOrigin]   = useState(null)
  const [stackBouncing, setStackBouncing]   = useState(false)
  const toastTimerRef = useRef(null)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('ltm_letters')
      if (raw) setLetters(JSON.parse(raw))
    } catch (_) {}
  }, [])

  const todayLetter = letters.find(l => l.date === todayKey())

  // ── Open writing modal
  function handleOpenWrite() {
    setIsWriting(true)
  }

  // ── Save letter (called from LetterModal)
  function handleSave(text, sealButtonRef) {
    setIsSaving(true)

    // Trigger sparkles near the wax seal button
    if (sealButtonRef?.current) {
      const rect = sealButtonRef.current.getBoundingClientRect()
      setSparkleOrigin({ x: rect.left + rect.width / 2, y: rect.top })
    }

    // Wait for seal animation, then persist
    setTimeout(() => {
      const key     = todayKey()
      const existing = letters.findIndex(l => l.date === key)
      const entry   = { date: key, text, saved: new Date().toISOString() }
      const updated = [...letters]

      if (existing >= 0) updated[existing] = entry
      else               updated.unshift(entry)

      setLetters(updated)
      localStorage.setItem('ltm_letters', JSON.stringify(updated))

      setIsSaving(false)
      setIsWriting(false)
      setSparkleOrigin(null)

      // Bounce the stack
      setStackBouncing(true)
      setTimeout(() => setStackBouncing(false), 600)

      showToast('your letter is sealed 🌸')
    }, 580)
  }

  // ── Toast helpers
  function showToast(msg) {
    clearTimeout(toastTimerRef.current)
    setToastOut(false)
    setToast(msg)
    toastTimerRef.current = setTimeout(() => {
      setToastOut(true)
      setTimeout(() => setToast(null), 260)
    }, 2800)
  }

  return (
    <main className="main">
      {/* Room background */}
      <div className="room-bg" />
      <div className="lamp-glow" />

      {/* Desk surface */}
      <Desk />

      {/* Envelope stack on desk */}
      <EnvelopeStack
        count={letters.length}
        isBouncing={stackBouncing}
        onClick={() => setViewingCollection(true)}
      />

      {/* Centered content */}
      <div className="content-area">
        <h1 className="title-pixel">✉ Letters to Myself ✉</h1>
        <p className="subtitle-pixel">a daily letter to yourself</p>

        <button
          className="btn-pixel btn-primary"
          onClick={handleOpenWrite}
          style={{ marginTop: 8 }}
        >
          {todayLetter ? '📖 read today\'s letter' : '✏️ write today\'s letter'}
        </button>
      </div>

      {/* Letter writing / reading modal */}
      {isWriting && (
        <LetterModal
          initialText={todayLetter?.text ?? ''}
          initialDate={fmtDate(todayLetter?.date)}
          isSaving={isSaving}
          onSave={handleSave}
          onClose={() => setIsWriting(false)}
        />
      )}

      {/* All letters collection */}
      {viewingCollection && (
        <CollectionModal
          letters={letters}
          onClose={() => setViewingCollection(false)}
        />
      )}

      {/* Sparkle burst on save */}
      {sparkleOrigin && <Sparkles origin={sparkleOrigin} />}

      {/* Toast */}
      {toast && (
        <div className={`toast ${toastOut ? 'toast-out' : ''}`}>
          {toast}
        </div>
      )}
    </main>
  )
}
