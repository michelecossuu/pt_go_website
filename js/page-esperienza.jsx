const PageEsperienza = ({ openContact }) => {
  const { intro, badge, photo, bio, signature, certifications, specializations, timeline, cta } = CONTENT.esperienza;
  return (
    <div className="page" data-screen-label="Esperienza">
      <section className="sec sec-first">
        <div className="wrap split">
          <figure className="media sticky in d2">
            <div className="frame"><Photo photo={photo} eager /></div>
            <figcaption className="cap"><span className="dot"></span>{badge}</figcaption>
          </figure>
          <div className="bio-copy">
            <div className="label in d1"><span className="n">01</span><span className="rule"></span>{intro.eyebrow}</div>
            <h1 className="h2 h-page in d2" dangerouslySetInnerHTML={{ __html: intro.title }} />
            <p className="intro in d3">{intro.meta}</p>
            <div className="bio-txt in d4">
              {bio.map((html, i) => <p key={i} dangerouslySetInnerHTML={{ __html: html }} />)}
            </div>
            <div className="sig">{signature}</div>
            <button className="more" onClick={() => openContact()}>{cta.button} <span className="ar">→</span></button>
          </div>
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap">
          <SectionHead n="02" label={certifications.eyebrow} title={certifications.title} />
          <div className="list">
            {certifications.items.map((c, i) => (
              <div key={i} className="row rv">
                <div className="yr">{c.year}</div>
                <div><h3>{c.title}</h3><p className="org">{c.org}</p></div>
                {c.type ? <span className="tag red">{c.type}</span> : <span></span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap">
          <SectionHead n="03" label={specializations.eyebrow} title={specializations.title} />
          <div className="specs">
            {specializations.items.map((s) => (
              <div key={s.n} className="spec rv"><div className="n">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap">
          <SectionHead n="04" label={timeline.eyebrow} title={timeline.title} />
          <div className="tl">
            {timeline.items.map((c) => (
              <div key={c.years} className="tl-i rv"><div className="yr">{c.years}</div><h3>{c.place}</h3><p>{c.desc}</p></div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={cta.title} label={cta.button} onClick={() => openContact()} />
    </div>
  );
};

window.PageEsperienza = PageEsperienza;
