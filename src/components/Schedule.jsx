import { schedule, IMG } from '../data.js'

export default function Schedule({ onBook }) {
  return (
    <section className="schedule">
      <div className="container schedule__grid">
        <div className="schedule__left">
          <span className="label">{schedule.label}</span>
          <ul className="schedule__perks">
            {schedule.perks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>

        <div className="schedule__media">
          <img src={`${IMG}${schedule.image}`} alt="Dentist ready to see you" />
        </div>

        <div className="schedule__content">
          <span className="schedule__icon">
            <img src={`${IMG}${schedule.icon}`} alt="" />
          </span>
          <h2 className="schedule__heading">
            {schedule.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="schedule__text">{schedule.text}</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={onBook}
            aria-haspopup="dialog"
          >
            {schedule.cta}
          </button>
        </div>
      </div>
    </section>
  )
}
