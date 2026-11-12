const PageEsperienza = ({ openContact }) => {
  const { intro, badge, photo, bio, signature, certifications, specializations, timeline, cta } = CONTENT.esperienza;
  // pin: il CSS usa --pin-cta per fermare la pagina con i passaggi a schermo
  const pinRef = React.useRef(null);
  React.useLayoutEffect(() => {
    const el = pinRef.current; if (!el) return;
    // --pin-cta: distanza dall'inizio del blocco all'inizio della fascia rossa (ne resta visibile solo un filo)
    const set = () => { const c = el.querySelector('.cta'); if (c) el.style.setProperty('--pin-cta', (c.getBoundingClientRect().top - el.getBoundingClientRect().top) + 'px'); };
    set();
    const ro = new ResizeObserver(set); ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className="page" data-screen-label="Esperienza">
      {/* pin-steps: su desktop, quando i passaggi del coaching sono tutti a schermo, la pagina resta ferma
          finché la freccia (Scia, modalità "steps") non arriva all'ultimo passaggio; poi riprende a scorrere */}
      <div className="pin-steps">
        <div className="pin-in" ref={pinRef}>
          <section className="sec sec-first">
            <div className="wrap split">
              <figure className="media sticky in d2">
                <div className="frame"><Photo photo={photo} eager /></div>
                <figcaption className="cap"><span className="dot"></span>{badge}</figcaption>
              </figure>
              <div className="bio-copy">
                <div className="label in d1"><span className="rule"></span>{intro.eyebrow}</div>
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
              <SectionHead label={certifications.eyebrow} title={certifications.title} />
              <div className="list">
                {certifications.items.map((c, i) => (
                  <div key={i} className="row rv">
                    <div className="yr">{c.year}</div>
                    <div><h3>{c.title}</h3>{c.org && <p className="org">{c.org}</p>}</div>
                    {c.type ? <span className="tag red">{c.type}</span> : <span></span>}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="sec sec-tight">
            <div className="wrap">
              <SectionHead label={specializations.eyebrow} title={specializations.title} />
              <div className="specs">
                {specializations.items.map((s) => (
                  <div key={s.n} className="spec rv"><div className="n">{s.n}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
                ))}
              </div>
            </div>
          </section>

          <section className="sec sec-tight sec-steps">
            <div className="wrap">
              <SectionHead label={timeline.eyebrow} title={timeline.title} />
              <div className="tl">
                {timeline.items.map((c) => (
                  <div key={c.place} className="tl-i rv">{c.years && <div className="yr">{c.years}</div>}<h3>{c.place}</h3>{c.desc && <p>{c.desc}</p>}</div>
                ))}
              </div>
            </div>
          </section>

          <CtaBand title={cta.title} label={cta.button} onClick={() => openContact()} />
        </div>
        <div className="pin-run" aria-hidden="true"></div>
      </div>
    </div>
  );
};

window.PageEsperienza = PageEsperienza;
