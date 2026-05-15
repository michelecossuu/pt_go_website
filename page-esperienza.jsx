// Esperienza & Formazione page
const PageEsperienza = ({ go }) => {
  const { intro, badge, bio, signature, certifications, specializations, timeline, cta } = CONTENT.esperienza;
  return (
    <div className="page" data-screen-label="Esperienza">
      {/* Page intro */}
      <section className="section" style={{paddingBottom: 'clamp(40px, 6vw, 80px)'}}>
        <SectionHeader eyebrow={intro.eyebrow} title={intro.title} meta={intro.meta} />
        <div className="bio">
          <div className="bio-portrait">
            <div className="badge"><span className="dot"></span>{badge}</div>
          </div>
          <div className="bio-body">
            <p>{bio[0]}</p>
            <p dangerouslySetInnerHTML={{ __html: bio[1] }} />
            <div className="signature">{signature}</div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section" style={{paddingTop: 0}}>
        <SectionHeader eyebrow={certifications.eyebrow} title={certifications.title} />
        <div className="creds">
          {certifications.items.map((cert) => {
            const Icon = Icons[cert.icon];
            return (
              <div key={cert.title} className="cred">
                <div className="ico"><Icon /></div>
                <div>
                  <div className="yr">{cert.year}</div>
                  <h4>{cert.title}</h4>
                  <p className="org">{cert.org}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SPECIALIZATIONS */}
      <section className="section" style={{paddingTop: 0}}>
        <SectionHeader eyebrow={specializations.eyebrow} title={specializations.title} />
        <div className="specs">
          {specializations.items.map((spec) => (
            <div key={spec.n} className="spec">
              <div className="n">{spec.n}</div>
              <h5>{spec.title}</h5>
              <p>{spec.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CAREER TIMELINE */}
      <section className="section" style={{paddingTop: 0}}>
        <SectionHeader eyebrow={timeline.eyebrow} title={timeline.title} />
        <div className="timeline">
          {timeline.items.map((item) => (
            <div key={item.years} className="tl-item">
              <div className="yr">{item.years}</div>
              <h4>{item.place}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
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

window.PageEsperienza = PageEsperienza;
