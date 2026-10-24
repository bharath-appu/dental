import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { bookingModal } from '../data.js'

function localToday() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

export default function BookingModal({ onClose }) {
  const [sent, setSent] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
        return
      }

      if (e.key !== 'Tab' || !dialogRef.current) return

      const focusable = dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return createPortal(
    <div
      className="booking-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="booking-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        ref={dialogRef}
      >
        <button
          className="booking-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close booking window"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {sent ? (
          <div className="booking-modal__success">
            <span className="booking-modal__check" aria-hidden="true">
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12.5l4.2 4.2L19 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2 id="booking-modal-title">{bookingModal.successHeading}</h2>
            <p>{bookingModal.successText}</p>
            <button className="btn btn--primary" type="button" onClick={onClose} autoFocus>
              {bookingModal.successCta}
            </button>
          </div>
        ) : (
          <>
            <span className="label">{bookingModal.label}</span>
            <h2 className="booking-modal__title" id="booking-modal-title">
              {bookingModal.heading}
            </h2>
            <p className="booking-modal__text">{bookingModal.text}</p>

            <form className="booking-modal__form" onSubmit={handleSubmit}>
              <div className="booking-modal__grid">
                <input type="text" name="name" placeholder="FULL NAME*" autoFocus required />
                <input type="email" name="email" placeholder="EMAIL*" required />
                <input type="tel" name="phone" placeholder="PHONE NUMBER*" required />
                <input
                  type="date"
                  name="date"
                  aria-label="Preferred date"
                  min={localToday()}
                  required
                />
              </div>
              <p className="booking-modal__note">{bookingModal.note}</p>
              <button className="btn btn--primary booking-modal__submit" type="submit">
                {bookingModal.submit}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  )
}
