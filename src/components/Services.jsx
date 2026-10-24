import { services, IMG } from '../data.js'

export default function Services() {
  return (
    <section className="services" id="services">
      <div className="container">
        <div className="services__head">
          <span className="label">{services.label}</span>
          <h2 className="services__heading">
            {services.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <a className="btn btn--primary" href="#services">
            {services.cta}
          </a>
        </div>

        <div className="services__grid">
          {services.items.map((s) => (
            <article className="service-card" key={s.title}>
              <span className="service-card__icon">
                <img src={`${IMG}${s.icon}`} alt="" />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a className="btn btn--outline" href="#services">
                Learn More
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
