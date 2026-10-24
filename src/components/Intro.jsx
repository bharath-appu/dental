import { intro, hero, IMG } from '../data.js'

export default function Intro() {
  return (
    <section className="intro">
      <div className="container intro__grid">
        <div className="intro__panel">
          <div className="intro__col">
            <h2 className="intro__heading">
              {intro.leftHeading.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <ul className="intro__tags">
              {intro.tags.map((t) => (
                <li key={t}>
                  <a href="#services">{t}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="intro__col">
            <h2 className="intro__heading intro__heading--single">{intro.rightHeading}</h2>
            <div className="intro__avatars">
              {intro.avatars.map((a, i) => (
                <img key={a} src={`${IMG}${a}`} alt={`Patient ${i + 1}`} loading="lazy" decoding="async" />
              ))}
            </div>
            <p className="intro__text">{intro.text}</p>
          </div>
        </div>

        <a className="hero-card" href="#services">
          <div className="hero-card__media">
            <img src={`${IMG}${hero.card.image}`} alt="Dental visit" />
            <span className="hero-card__label">{hero.card.title}</span>
          </div>
          <div className="hero-card__body">
            <p>{hero.card.text}</p>
            <span className="hero-card__arrow" aria-hidden="true">
              <img src={`${IMG}ZJoGKeaTsLbbmJdVa1ci5AE43AI.svg`} alt="" />
            </span>
          </div>
        </a>
      </div>
    </section>
  )
}
