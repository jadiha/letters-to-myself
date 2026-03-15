'use client'

// LetterModal.jsx
// The pixel-art letter writing experience.
// Opens with an animation, closes with the "seal" animation when saved.
//
// Props:
//   initialText  — pre-filled text (if user already wrote today)
//   initialDate  — formatted date string to display
//   isSaving     — triggers the seal animation
//   onSave(text, ref) — called with text + ref to wax seal button (for sparkles)
//   onClose      — close without saving

import { useRef, useEffect } from 'react'

// Web Audio: typewriter click
let _audioCtx = null
function getCtx() {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  return _audioCtx
}

function playClick() {
  try {
    const ctx  = getCtx()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    const filt = ctx.createBiquadFilter()

    filt.type = 'highpass'
    filt.frequency.value = 1800
    osc.connect(filt); filt.connect(gain); gain.connect(ctx.destination)

    osc.type = 'square'
    osc.frequency.setValueAtTime(700, ctx.currentTime)
    osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.055)
    gain.gain.setValueAtTime(0.05, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.065)

    osc.start(ctx.currentTime)
    osc.stop(ctx.currentTime + 0.075)
  } catch (_) {}
}

// Web Audio: wax seal thump
function playSeal() {
  try {
    const ctx = getCtx()
    const now = ctx.currentTime

    // Noise burst
    const bufLen = Math.floor(ctx.sampleRate * 0.28)
    const buf    = ctx.createBuffer(1, bufLen, ctx.sampleRate)
    const data   = buf.getChannelData(0)
    for (let i = 0; i < bufLen; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.045))
    }
    const nSrc  = ctx.createBufferSource()
    nSrc.buffer = buf
    const nGain = ctx.createGain()
    nGain.gain.setValueAtTime(0.35, now)
    nGain.gain.exponentialRampToValueAtTime(0.001, now + 0.28)
    const nFilt = ctx.createBiquadFilter()
    nFilt.type = 'lowpass'; nFilt.frequency.value = 750
    nSrc.connect(nFilt); nFilt.connect(nGain); nGain.connect(ctx.destination)
    nSrc.start(now)

    // Low tone
    const osc   = ctx.createOscillator()
    const oGain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(180, now)
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.22)
    oGain.gain.setValueAtTime(0.12, now)
    oGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26)
    osc.connect(oGain); oGain.connect(ctx.destination)
    osc.start(now); osc.stop(now + 0.3)
  } catch (_) {}
}

export default function LetterModal({ initialText, initialDate, isSaving, onSave, onClose }) {
  const textareaRef = useRef(null)
  const sealBtnRef  = useRef(null)

  // Auto-focus textarea when modal opens
  useEffect(() => {
    const timer = setTimeout(() => textareaRef.current?.focus(), 300)
    return () => clearTimeout(timer)
  }, [])

  // Keyboard: Escape to close
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape' && !isSaving) onClose?.()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isSaving, onClose])

  function handleSave() {
    const text = textareaRef.current?.value?.trim()
    if (!text) {
      // Shake the textarea gently
      textareaRef.current.style.animation = 'none'
      requestAnimationFrame(() => {
        textareaRef.current.style.animation = 'shake 0.35s ease'
      })
      textareaRef.current.placeholder = 'write something, however small... ✿'
      return
    }
    playSeal()
    onSave(text, sealBtnRef)
  }

  function handleKeydown(e) {
    const skip = ['Shift','Control','Alt','Meta','CapsLock','Tab','Escape',
                   'ArrowLeft','ArrowRight','ArrowUp','ArrowDown']
    if (!skip.includes(e.key)) playClick()
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget && !isSaving) onClose?.()
  }

  return (
    <>
      {/* Shake keyframe — inline so it's always available */}
      <style>{`
        @keyframes shake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-6px); }
          40%     { transform: translateX( 6px); }
          60%     { transform: translateX(-4px); }
          80%     { transform: translateX( 4px); }
        }
      `}</style>

      {/* Backdrop */}
      <div className="overlay" onClick={handleOverlayClick}>

        {/* Letter paper */}
        <div className={`letter-modal ${isSaving ? 'is-saving' : ''}`}>

          {/* Close button — top right */}
          {!isSaving && (
            <button
              className="btn-pixel btn-close"
              onClick={onClose}
              style={{ position: 'absolute', top: 12, right: 14 }}
            >
              ✕ close
            </button>
          )}

          {/* Date — top right of letter */}
          <div className="letter-header-row">
            <div />
            <div className="letter-date">{initialDate}</div>
          </div>

          {/* Salutation */}
          <div className="letter-salutation">Dear Me,</div>

          {/* Prompt */}
          <div className="letter-prompt">Today, I am grateful for...</div>

          {/* Writing area */}
          <textarea
            ref={textareaRef}
            className="letter-textarea"
            defaultValue={initialText}
            placeholder="write here, in your own words..."
            spellCheck={false}
            onKeyDown={handleKeydown}
            disabled={isSaving}
          />

          {/* Wax seal save button */}
          <div className="letter-footer">
            <button
              ref={sealBtnRef}
              className="btn-wax"
              onClick={handleSave}
              disabled={isSaving}
            >
              ✦<br />Seal &<br />Save<br />✦
            </button>
          </div>

        </div>
      </div>
    </>
  )
}
