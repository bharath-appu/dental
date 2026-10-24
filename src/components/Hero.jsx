import { hero, IMG } from '../data.js'

export default function Hero({ onBook }) {
  return (
    <section className="hero" id="home">
      <div className="hero__media">
        <video
          className="hero__video"
          autoPlay
          loop
          muted
          playsInline
          poster={`${IMG}QZcT8U16OIs9tqgJachnJ2ZZZH0.png`}
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="hero__scrim" />
      </div>

      <div className="container hero__inner">
        <h1 className="hero__title">
          {hero.title.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>

        <div className="hero__side">
          <p className="hero__text">{hero.text}</p>
          <button
            type="button"
            className="btn btn--white"
            onClick={onBook}
            aria-haspopup="dialog"
          >
            {hero.cta}
          </button>
        </div>
      </div>
    </section>
  )
}
