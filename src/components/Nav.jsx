import { useState } from 'react'
import { navLinks, IMG } from '../data.js'

export default function Nav({ onBook }) {
  const [open, setOpen] = useState(false)

  function handleBook() {
    setOpen(false)
    onBook()
  }

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a className="nav__logo" href="#" aria-label="Dental home">
          <img src={`${IMG}NafeJntPk9Cf7IEgmwlyEySfeRk.svg`} alt="Dental" />
        </a>

        <nav className={`nav__menu ${open ? 'is-open' : ''}`}>
          <ul className="nav__list">
            {navLinks.map((l) => (
              <li key={l.label}>
                <a className={l.active ? 'is-active' : ''} href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav__all">
              <button type="button" className="nav__all-btn">
                All Pages
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="btn btn--white nav__cta"
          onClick={handleBook}
          aria-haspopup="dialog"
        >
          Schedule a Visit
        </button>

        <button
          className={`nav__burger ${open ? 'is-open' : ''}`}
          type="button"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
