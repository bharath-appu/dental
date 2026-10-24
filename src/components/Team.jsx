import { team, IMG } from '../data.js'

export default function Team() {
  return (
    <section className="team" id="team">
      <div className="container team__grid">
        <div className="team__intro">
          <span className="label">{team.label}</span>
          <h2 className="team__heading">
            {team.heading.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </h2>
          <a className="btn btn--primary" href="#team">
            {team.cta}
          </a>
        </div>

        {team.members.slice(0, 2).map((m) => (
          <figure className="member" key={m.name}>
            <img src={`${IMG}${m.image}`} alt={m.name} />
            <figcaption>
              <span className="member__name">{m.name}</span>
              <span className="member__role">{m.role}</span>
            </figcaption>
          </figure>
        ))}

        <div className="team__hiring">
          <span className="team__hiring-icon">
            <img src={`${IMG}${team.hiring.icon}`} alt="" />
          </span>
          <h3>{team.hiring.title}</h3>
          <p>{team.hiring.text}</p>
          <a className="btn btn--outline" href="#">
            {team.hiring.cta}
          </a>
        </div>

        {team.members.slice(2).map((m) => (
          <figure className="member" key={m.name}>
            <img src={`${IMG}${m.image}`} alt={m.name} />
            <figcaption>
              <span className="member__name">{m.name}</span>
              <span className="member__role">{m.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
