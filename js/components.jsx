// Icone, brand, componenti condivisi. I dati arrivano da CONTENT (js/content.js).
const Ico = ({ s = 20, sw = 1.6, children }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{children}</svg>;
const Icons = {
  Phone: (p) => <Ico {...p}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/></Ico>,
  Chat: (p) => <Ico {...p}><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></Ico>,
  Mail: (p) => <Ico {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 5L2 7"/></Ico>,
  Instagram: (p) => <Ico {...p}><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></Ico>,
  Pin: (p) => <Ico {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></Ico>,
  Barbell: (p) => <Ico sw={1.7} {...p}><path d="M6 7v10M3 9.5v5M18 7v10M21 9.5v5M6 12h12"/></Ico>,
  Route: (p) => <Ico sw={1.7} {...p}><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></Ico>,
  Star: ({ s = 14, on = true }) => <svg width={s} height={s} viewBox="0 0 24 24" fill={on ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true"><path d="M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95z"/></svg>,
  Arrow: ({ s = 18, dir = 1 }) => <Ico s={s} sw={1.8}><path d={dir > 0 ? 'M5 12h14M13 6l6 6-6 6' : 'M19 12H5M11 6l-6 6 6 6'}/></Ico>,
  Leaf: (p) => <Ico sw={1.7} {...p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></Ico>,
  Check: ({ s = 14 }) => <Ico s={s} sw={2.4}><polyline points="20 6 9 17 4 12"/></Ico>,
  Dash: ({ s = 14 }) => <Ico s={s} sw={2.4}><line x1="6" y1="12" x2="18" y2="12"/></Ico>,
  Chevron: ({ s = 16 }) => <Ico s={s} sw={2}><polyline points="6 9 12 15 18 9"/></Ico>,
  Menu: () => <Ico s={20} sw={1.8}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/></Ico>,
  Close: () => <Ico s={20} sw={1.8}><line x1="6" y1="6" x2="18" y2="18"/><line x1="6" y1="18" x2="18" y2="6"/></Ico>,
};

const LOGO_INK = 'assets/logo-mark-ink.png';   // per fondi chiari
const LOGO_LIGHT = 'assets/logo-mark.png';     // per fondi scuri

// Wordmark. `light` = versione per fondo scuro (nav sopra l'hero della home).
const Brand = ({ onClick, light }) => (
  <button className="brand" onClick={onClick} aria-label={`${CONTENT.brand.fullName}, home`}>
    <img src={light ? LOGO_LIGHT : LOGO_INK} alt="" />
    <span className="wm">{CONTENT.brand.firstName} <em>{CONTENT.brand.lastName}</em><small>{CONTENT.brand.title}</small></span>
  </button>
);

// Foto a riempimento del contenitore. Senza `src` mostra il segnaposto con la descrizione.
const Photo = ({ photo, eager }) => photo && photo.src
  ? <img className="ph" src={photo.src} alt={photo.alt || ''} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  : <div className="ph ph-empty"><span>{photo && photo.alt}</span></div>;

const SectionHead = ({ n, label, title, meta, page }) => (
  <div className={`shead rv${meta ? "" : " shead-solo"}`}>
    <div>
      <div className="label">{n && <span className="n">{n}</span>}<span className="rule"></span>{label}</div>
      {page
        ? <h1 className="h2 h-page" dangerouslySetInnerHTML={{ __html: title }} />
        : <h2 className="h2" dangerouslySetInnerHTML={{ __html: title }} />}
    </div>
    {meta && <p className="meta">{meta}</p>}
  </div>
);

const CtaBand = ({ title, label, onClick, note = 'Risposta entro 24 ore' }) => (
  <section className="cta">
    <img className="mark" src={LOGO_INK} alt="" />
    <div className="wrap">
      <div className="cta-in rv">
        <h2 className="h2" dangerouslySetInnerHTML={{ __html: title }} />
        <div className="cta-side">
          <button className="btn btn-red" onClick={onClick}>{label} <span className="ar">→</span></button>
          {note && <span className="cta-note"><span className="dot"></span>{note}</span>}
        </div>
      </div>
    </div>
  </section>
);

const fmtPrice = (n) => Math.round(n).toLocaleString('it-IT');

Object.assign(window, { Icons, Brand, Photo, SectionHead, CtaBand, fmtPrice });
