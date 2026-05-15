// Home page
const PageHome = ({ go }) => {
  return (
    <div className="page" data-screen-label="Home">
      {/* HERO */}
      <section className="hero">
        <div>
          <div className="hero-eyebrow">
            <span className="brand-rule"><span></span><span></span></span>
            <span className="eyebrow">Personal Trainer · Cagliari</span>
          </div>
          <h1 className="display">
            <span className="first">Forza,</span><br/>
            <span className="first">forma,</span><br/>
            <span className="last">fiducia.</span>
          </h1>
          <p className="hero-sub">
            Allenamento su misura per chi vuole risultati reali, senza scorciatoie.
            Tu, i tuoi obiettivi, un metodo costruito intorno alla tua vita.
          </p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => go('pacchetti')}>
              Scopri i Pacchetti <span className="arrow">→</span>
            </button>
            <button className="btn btn-ghost" onClick={() => go('contatti')}>
              Prenota una consulenza
            </button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="n mono-num">12<span className="plus">+</span></div>
              <div className="l">Anni di esperienza</div>
            </div>
            <div className="hero-stat">
              <div className="n mono-num">340<span className="plus">+</span></div>
              <div className="l">Clienti seguiti</div>
            </div>
            <div className="hero-stat">
              <div className="n mono-num">98<span className="plus">%</span></div>
              <div className="l">Obiettivi raggiunti</div>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="athlete"></div>
          <div className="silhouette">
            <svg width="62%" viewBox="0 0 200 280" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1.2">
              {/* Stylized athlete silhouette */}
              <circle cx="100" cy="40" r="22" />
              <path d="M100 62 L100 160" />
              <path d="M100 90 L40 110 M100 90 L160 110" strokeLinecap="round" />
              {/* Dumbbells */}
              <rect x="20" y="100" width="22" height="22" rx="3" />
              <rect x="158" y="100" width="22" height="22" rx="3" />
              <path d="M85 160 L60 250 M115 160 L140 250" strokeLinecap="round" />
              <path d="M30 95 L30 130 M180 95 L180 130" />
            </svg>
          </div>
          <div className="frame-tag">
            <span className="pulse"></span> Live · Coaching
          </div>
          <div className="vital">
            <div>
              <div className="lab">Sessione</div>
              <div className="val">60<em>min</em></div>
            </div>
            <div>
              <div className="lab">BPM Medio</div>
              <div className="val">142</div>
            </div>
            <div>
              <div className="lab">Kcal</div>
              <div className="val">680</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {Array.from({length: 2}).map((_, k) => (
            <React.Fragment key={k}>
              <span className="marquee-item">Forza funzionale</span>
              <span className="marquee-item">Ipertrofia</span>
              <span className="marquee-item">Dimagrimento</span>
              <span className="marquee-item">Postura</span>
              <span className="marquee-item">Atletica</span>
              <span className="marquee-item">Recupero</span>
              <span className="marquee-item">Body recomp</span>
              <span className="marquee-item">Preparazione gare</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* VALUE PROPS */}
      <section className="section">
        <SectionHeader
          eyebrow="Il metodo"
          title="Un approccio <em>completo</em>,<br/>non un programma standard."
          meta="Ogni piano nasce da una valutazione fisica e da una conversazione onesta. Niente copia-incolla, niente promesse vuote."
        />
        <div className="props">
          <div className="prop">
            <div className="ico"><Icons.Activity /></div>
            <h3>Valutazione iniziale</h3>
            <p>Test funzionali, analisi posturale e composizione corporea. Si parte dai dati, non dalle sensazioni.</p>
          </div>
          <div className="prop">
            <div className="ico"><Icons.Dumbbell /></div>
            <h3>Programmazione su misura</h3>
            <p>Schede progressive che si adattano al tuo ritmo settimanale, alla tua condizione e ai tuoi obiettivi.</p>
          </div>
          <div className="prop">
            <div className="ico"><Icons.Heart /></div>
            <h3>Supporto continuo</h3>
            <p>WhatsApp diretto, revisioni mensili e monitoraggio costante. Non sei solo tra una sessione e l'altra.</p>
          </div>
        </div>
      </section>

      {/* PACK TEASER */}
      <section className="section" style={{paddingTop: 0}}>
        <SectionHeader
          eyebrow="Pacchetti"
          title="Tre percorsi,<br/>un solo <em>obiettivo</em>."
          meta="Dalla scheda mensile al coaching completo. Scegli la profondità del supporto in base al tuo momento."
        />
        <div className="packs-teaser">
          <div className="pack-tease" onClick={() => go('pacchetti')}>
            <div className="grade">01 · Entry</div>
            <div className="name">Kick Starter</div>
            <div className="price">€50<small>/mese</small></div>
            <p style={{color: 'var(--text-dim)', fontSize: 14, margin: 0, lineHeight: 1.5}}>Schede ogni 6-8 settimane, check-in bi-settimanali.</p>
          </div>
          <div className="pack-tease silver" onClick={() => go('pacchetti')}>
            <div className="grade">02 · Più scelto</div>
            <div className="name">Transformation</div>
            <div className="price">€90<small>/mese</small></div>
            <p style={{color: 'var(--text-dim)', fontSize: 14, margin: 0, lineHeight: 1.5}}>Check-in settimanali, supporto continuo, linee guida nutrizionali.</p>
          </div>
          <div className="pack-tease gold" onClick={() => go('pacchetti')}>
            <div className="grade">03 · Premium</div>
            <div className="name">Elite</div>
            <div className="price">€120<small>/mese</small></div>
            <p style={{color: 'var(--text-dim)', fontSize: 14, margin: 0, lineHeight: 1.5}}>Piano alimentare completo e 1:1 mensile di revisione.</p>
          </div>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 32}}>
          <button className="btn btn-ghost" onClick={() => go('pacchetti')}>
            Confronta tutti i pacchetti <span className="arrow">→</span>
          </button>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="quote">
          <div className="quote-mark">"</div>
          <div>
            <q>Sei mesi con Giuliano e ho perso 11 kg, ma soprattutto ho recuperato il mal di schiena che mi tormentava da anni. Non è solo un trainer: è una persona che ti ascolta davvero.</q>
            <div className="who">Marta R. · <em>Cliente dal 2024</em></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="cta-banner">
          <div className="cta-banner-inner">
            <h3 className="display">Pronto a iniziare<br/>il <em>tuo</em> percorso?</h3>
            <button className="btn btn-primary" onClick={() => go('contatti')}>
              Prenota una consulenza gratuita <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

window.PageHome = PageHome;
