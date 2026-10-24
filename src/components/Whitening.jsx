import { whitening, IMG } from '../data.js'

export default function Whitening({ onBook }) {
  return (
    <section className="whitening">
      <div className="container">
        <div className="whitening__head">
          <span className="label">{whitening.label}</span>
          <h2 className="whitening__heading">
            {whitening.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <p className="whitening__text">{whitening.text}</p>
        </div>

        <div className="whitening__features">
          {whitening.features.map((f) => (
            <div className="whitening__feature" key={f.title}>
              <span className="whitening__icon">
                <img src={`${IMG}${f.icon}`} alt="" />
              </span>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>

        <div className="whitening__cta">
          <button
            type="button"
            className="btn btn--primary"
            onClick={onBook}
            aria-haspopup="dialog"
          >
            {whitening.cta}
          </button>
        </div>

        <div className="whitening__compare">
          <img src={`${IMG}${whitening.image}`} alt="Before and after teeth whitening" loading="lazy" decoding="async" />
        </div>
      </div>
    </section>
  )
}
