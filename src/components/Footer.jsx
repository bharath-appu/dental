import { footer, IMG } from '../data.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <a className="footer__logo" href="#" aria-label="Dental home">
            <img src={`${IMG}NafeJntPk9Cf7IEgmwlyEySfeRk.svg`} alt="Dental" />
          </a>

          <div className="footer__cols">
            {footer.columns.map((col) => (
              <nav className="footer__col" key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#">{l}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="footer__socials">
            {footer.socials.map((s) => (
              <a className="footer__social" key={s.label} href={s.href} target="_blank" rel="noreferrer">
                <span>{s.label}</span>
                <img src={`${IMG}${s.icon}`} alt="" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <p>{footer.copyright}</p>
          <p>
            Designed by <strong>{footer.designedBy}</strong>
          </p>
        </div>
      </div>
    </footer>
  )
}
