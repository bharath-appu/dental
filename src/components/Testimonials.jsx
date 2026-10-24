import { testimonials, IMG } from '../data.js'

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__card">
          <div className="testimonials__head">
            <span className="label">{testimonials.label}</span>
            <h2 className="testimonials__heading">{testimonials.heading}</h2>
          </div>

          <div className="testimonials__track">
            {testimonials.items.map((t) => (
              <blockquote className="quote" key={t.name}>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
                <footer className="quote__author">
                  <img src={`${IMG}${t.avatar}`} alt={t.name} />
                  <span>
                    <strong>{t.name}</strong>
                    <em>{t.role}</em>
                  </span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
