// Home page
const PageHome = ({ go }) => {
  const { hero, stats, marquee, method, packTeaser, testimonial, cta } = CONTENT.home;
  return (
    <div className="page" data-screen-label="Home">
      {/* HERO */}
      <section className="hero">
        <div>
          <div className="hero-eyebrow">
            <span className="brand-rule"><span></span><span></span></span>
            <span className="eyebrow">{hero.eyebrow}</span>
          </div>
          <h1 className="display">
            {hero.headline.map((line, i) => (
              <React.Fragment key={i}>
                <span className={i === hero.headline.length - 1 ? 'last' : 'first'}>{line}</span>
                {i < hero.headline.length - 1 && <br/>}
              </React.Fragment>
            ))}
          </h1>
          <p className="hero-sub">{hero.sub}</p>
          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={() => go('pacchetti')}>
              {hero.ctaPrimary} <span className="arrow">→</span>
            </button>
            <button className="btn btn-ghost" onClick={() => go('contatti')}>
              {hero.ctaGhost}
            </button>
          </div>
          <div className="hero-stats">
            {stats.map((s, i) => (
              <div key={i} className="hero-stat">
                <div className="n mono-num">{s.value}<span className="plus">{s.unit}</span></div>
                <div className="l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="hero-visual">
          <div className="athlete"></div>
          <div className="silhouette">
            <svg width="62%" viewBox="0 0 200 280" fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="1.2">
              <circle cx="100" cy="40" r="22" />
              <path d="M100 62 L100 160" />
              <path d="M100 90 L40 110 M100 90 L160 110" strokeLinecap="round" />
              <rect x="20" y="100" width="22" height="22" rx="3" />
              <rect x="158" y="100" width="22" height="22" rx="3" />
              <path d="M85 160 L60 250 M115 160 L140 250" strokeLinecap="round" />
              <path d="M30 95 L30 130 M180 95 L180 130" />
            </svg>
          </div>
          <div className="frame-tag">
            <span className="pulse"></span> {hero.liveTag}
          </div>
          <div className="vital">
            {hero.vital.map((v, i) => (
              <div key={i}>
                <div className="lab">{v.label}</div>
                <div className="val">{v.value}{v.unit && <em>{v.unit}</em>}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {Array.from({length: 2}).map((_, k) => (
            <React.Fragment key={k}>
              {marquee.map((item) => (
                <span key={item} className="marquee-item">{item}</span>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* VALUE PROPS */}
      <section className="section">
        <SectionHeader
          eyebrow={method.eyebrow}
          title={method.title}
          meta={method.meta}
        />
        <div className="props">
          {method.cards.map((card) => {
            const Icon = Icons[card.icon];
            return (
              <div key={card.title} className="prop">
                <div className="ico"><Icon /></div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* PACK TEASER */}
      <section className="section" style={{paddingTop: 0}}>
        <SectionHeader
          eyebrow={packTeaser.eyebrow}
          title={packTeaser.title}
          meta={packTeaser.meta}
        />
        <div className="packs-teaser">
          {CONTENT.packs.map((p) => (
            <div key={p.id} className={`pack-tease${p.featured ? ' featured' : ''}${p.id === 'elite' ? ' gold' : ''}`} onClick={() => go('pacchetti')}>
              <div className="grade">{p.tier}</div>
              <div className="name">{p.fullName}</div>
              <div className="price">€{p.monthly}<small>/mese</small></div>
              <p style={{color: 'var(--text-dim)', fontSize: 14, margin: 0, lineHeight: 1.5}}>{p.teaserDesc}</p>
            </div>
          ))}
        </div>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: 32}}>
          <button className="btn btn-ghost" onClick={() => go('pacchetti')}>
            {packTeaser.cta} <span className="arrow">→</span>
          </button>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="quote">
          <div className="quote-mark">"</div>
          <div>
            <q>{testimonial.quote}</q>
            <div className="who">{testimonial.author} · <em>{testimonial.role}</em></div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="cta-banner">
          <div className="cta-banner-inner">
            <h3 className="display" dangerouslySetInnerHTML={{ __html: cta.title }} />
            <button className="btn btn-primary" onClick={() => go('contatti')}>
              {cta.button} <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

window.PageHome = PageHome;
