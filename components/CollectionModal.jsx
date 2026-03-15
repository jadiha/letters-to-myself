'use client'

// CollectionModal.jsx
// Displays all saved letters as a browsable grid of letter cards.
// Clicking a card opens the full letter to read.
//
// Props:
//   letters — array of { date, text, saved }
//   onClose — close the collection

import { useState } from 'react'

function fmtDate(iso) {
  const d = iso ? new Date(iso + 'T12:00:00') : new Date()
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function esc(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
}

export default function CollectionModal({ letters, onClose }) {
  const [reading, setReading] = useState(null)   // the letter currently being read

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose?.()
  }

  return (
    <>
      {/* Collection overlay */}
      <div className="collection-modal" onClick={handleOverlayClick}>

        {/* Close row */}
        <div className="collection-close-row">
          <button className="btn-pixel btn-close" onClick={onClose}>
            ✕ close
          </button>
        </div>

        {/* Title */}
        <div className="collection-header">
          <h2 className="collection-title">My Letters</h2>
          <p className="collection-sub">each one a small gift to yourself ✿</p>
        </div>

        {/* Grid */}
        {letters.length === 0 ? (
          <div className="letters-grid">
            <div className="empty-collection">
              no letters yet...<br />
              write your first one today ✿
            </div>
          </div>
        ) : (
          <div className="letters-grid">
            {letters.map((letter, i) => (
              <button
                key={letter.date}
                className="letter-card"
                onClick={() => setReading(letter)}
              >
                <div className="card-date">{fmtDate(letter.date)}</div>
                <div
                  className="card-preview"
                  dangerouslySetInnerHTML={{ __html: esc(letter.text) }}
                />
                <div className="card-wax" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Read a single letter */}
      {reading && (
        <ReadModal letter={reading} onClose={() => setReading(null)} />
      )}
    </>
  )
}

/* ── Read Modal ──────────────────────────────────────────────── */
function ReadModal({ letter, onClose }) {
  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose?.()
  }

  return (
    <div className="read-modal" onClick={handleOverlayClick}>
      <div className="read-paper">
        {/* Close */}
        <button
          className="btn-pixel btn-close"
          onClick={onClose}
          style={{ position: 'absolute', top: 12, right: 14 }}
        >
          ✕ close
        </button>

        {/* Date */}
        <div className="read-date">{fmtDate(letter.date)}</div>

        {/* Salutation */}
        <div className="read-salutation">Dear Me,</div>

        {/* Prompt */}
        <div className="read-prompt">Today, I am grateful for...</div>

        {/* Letter content */}
        <div className="read-content">{letter.text}</div>

        {/* Wax seal decoration at bottom */}
        <div className="read-wax" />
      </div>
    </div>
  )
}
