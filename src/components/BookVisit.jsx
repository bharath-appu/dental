import { useState } from 'react'
import { bookVisit, IMG } from '../data.js'

export default function BookVisit() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="book" id="book">
      <div className="container">
        <div className="book__card">
          <img
            className="book__deco"
            src={`${IMG}4sNtc21zODwkpJNo4Zv7VEqXcnk.svg`}
            alt=""
            aria-hidden="true"
          />

          <span className="label label--light">{bookVisit.label}</span>
          <h2 className="book__heading">
            {bookVisit.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="book__text">{bookVisit.text}</p>

          <form className="book__form" onSubmit={handleSubmit}>
            <p className="book__note">{bookVisit.formNote}</p>
            <div className="book__fields">
              <input type="text" name="name" placeholder="FULL NAME*" required />
              <input type="email" name="email" placeholder="EMAIL*" required />
              <input type="tel" name="phone" placeholder="PHONE NUMBER*" required />
              <input type="date" name="date" aria-label="Preferred date" required />
              <button className="book__submit" type="submit" aria-label="Submit">
                <img src={`${IMG}ZJoGKeaTsLbbmJdVa1ci5AE43AI.svg`} alt="" />
              </button>
            </div>
            {sent && <p className="book__sent">Thank you! We’ll be in touch shortly.</p>}
          </form>
        </div>
      </div>
    </section>
  )
}
