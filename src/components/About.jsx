import { useEffect, useRef } from 'react'
import { about } from '../data.js'

export default function About() {
  const videoRef = useRef(null)

  // Only fetch + decode the clinic video while it is on screen.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 }
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

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
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            poster="/images/F8S4eX96Pul5uYP4Yc6E8GH3aM.webp"
          >
            <source src="/videos/about-clinic.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </section>
  )
}
