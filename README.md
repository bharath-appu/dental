# Dental — Homepage Clone (React + Vite)

A faithful, responsive clone of the **Dental** Framer template homepage:
<https://dental-template.framer.website>

Built with React 18 + Vite 5. No UI framework — plain CSS.

## Run it

```bash
npm install
npm run dev      # dev server (Vite picks a free port, e.g. 5173)
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

> If port 5173 is already taken by another project, Vite automatically moves to
> 5174. Open the URL printed in the terminal. On Windows, prefer
> `http://127.0.0.1:<port>` if `localhost` resolves to a different local server.

## Structure

```
index.html
vite.config.js
public/
  images/        # 40 image assets (logos, icons, photos) from the template
  videos/        # hero.mp4 + about-clinic.mp4
src/
  main.jsx
  App.jsx
  data.js        # all copy + asset mapping (single source of truth)
  index.css      # design tokens + layout + responsive styles
  components/
    Nav.jsx           Hero.jsx        Intro.jsx
    About.jsx         BookVisit.jsx   Services.jsx
    Whitening.jsx     Team.jsx        Testimonials.jsx
    Schedule.jsx      Footer.jsx      WhatsAppButton.jsx
    BookingModal.jsx
```

## Sections

Nav (overlay) → Hero (video) → Intro panel + overlapping Services card →
About Clinic → Book a Visit form (blue CTA card) → Our Services (6 cards) →
Teeth Whitening → Before/After image → Team (2×2 + hiring card) →
Testimonials → Schedule CTA → Footer.

## Design tokens

| Token | Value |
| --- | --- |
| Page background | `#F6F7FF` |
| Primary (indigo) | `#4041D1` |
| Heading / ink | `#11081C` |
| Body / muted | `#5E646D` |
| Card radius | `20px` |
| Pill radius | `60px` |
| Font | Inter (Google Fonts) |

## Notes

- **Copy verified against the live site.** The text in `src/data.js` matches the
  Firecrawl scrape of the homepage (headlines, service descriptions, team,
  testimonials, footer). The one `teem` typo in "Meet the teem behind your
  smile." is preserved intentionally to match the source.
- **Assets are local** — all images/videos were downloaded so the clone works
  offline without depending on the original CDN.
- **Responsive** — breakpoints at 1280 / 1100 / 900 / 640 px; the nav collapses
  to a burger menu and grids stack on mobile.
- **Interactive** — mobile nav toggle, booking form submit state, and a
  horizontally scrollable testimonial row.
- **Booking popup** — every Book/Schedule CTA (nav, hero, whitening and closing
  section) opens an in-page modal with the appointment form, so visitors never
  leave the page. It closes on `Esc`, backdrop click, or the close button,
  locks background scrolling, traps keyboard focus, and shows an inline
  confirmation after submit.
- **WhatsApp button** — a floating chat button sits at the bottom-right on every
  screen size. Point it at a real number by editing the `whatsapp` export in
  `src/data.js` (`number` = digits only, international format, e.g.
  `919876543210`; `message` = prefilled chat text).

## Attribution

The design and copy originate from the **Dental** Framer template by
[fourtwelve](https://fourtwelve.co/). This project is a technical clone for
development/reference purposes. Ensure you hold the appropriate rights or license
before using the design, imagery, or copy in production.
