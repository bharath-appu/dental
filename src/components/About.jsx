import { about } from '../data.js'

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container about__grid">
        <div className="about__content">
          <span className="label">{about.label}</span>
          <h2 className="about__heading">{about.heading}</h2>
          <p className="about__text">{about.text}</p>

          <ul className="about__features">
            {about.features.map((f, i) => (
              <li key={i}>
                <span className="about__icon">
                  <img src={`/images/${f.icon}`} alt="" />
                </span>
                <div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <a className="btn btn--primary" href="#about">
            {about.cta}
          </a>
        </div>

        <div className="about__media">
          <video autoPlay loop muted playsInline poster="/images/F8S4eX96Pul5uYP4Yc6E8GH3aM.jpg">
            <source src="/videos/about-clinic.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
