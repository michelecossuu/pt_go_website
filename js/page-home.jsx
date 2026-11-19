// Home v6. L'ordine delle sezioni è vincolante: la Scia (js/scia.jsx) le percorre in sequenza tramite i nomi di classe.
const PageHome = ({ go, openContact }) => {
  const { hero, philosophy, transformations, method, effort, packTeaser, roots, cta } = CONTENT.home;
  const last = hero.headline.length - 1;
  const txRef = React.useRef(null);
  const txSlide = (dir) => {
    const el = txRef.current; if (!el) return;
    const card = el.querySelector('.tx-card');
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };
  const [txEdge, setTxEdge] = React.useState({ prev: false, next: true });
  const txUpdate = () => {
    const el = txRef.current; if (!el) return;
    const prev = el.scrollLeft > 4, next = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setTxEdge((e) => (e.prev === prev && e.next === next ? e : { prev, next }));
  };
  React.useEffect(() => { txUpdate(); window.addEventListener('resize', txUpdate); return () => window.removeEventListener('resize', txUpdate); }, []);
  return (
    <div className="page" data-screen-label="Home">
      <section className="hx dk">
        <div className="hx-bg"><Photo photo={hero.photo} eager /></div>
        <div className="hx-shade"></div>
        <div className="wrap hx-in">
          <div className="hx-copy">
            <div className="label in d1"><span className="rule"></span>{hero.eyebrow}</div>
            <h1 className="h1 in d2">
              {hero.headline.map((line, i) => (
                <React.Fragment key={i}>{i === last ? <em>{line}</em> : line}{i < last && <br/>}</React.Fragment>
              ))}
            </h1>
            <p className="lead in d3">{hero.sub}</p>
            <div className="ctas in d4">
              <button className="btn btn-red" onClick={() => go('pacchetti')}>{hero.ctaPrimary} <span className="ar">→</span></button>
              <button className="btn btn-line" onClick={() => openContact()}>{hero.ctaGhost}</button>
            </div>
          </div>
          <ul className="hx-pills in d4">
            {hero.pillars.map((p, i) => {
              const Icon = Icons[p.icon];
              return <li key={i} className="hx-pill"><span className="ic"><Icon s={20} /></span><span>{p.lines[0]}<br/>{p.lines[1]}</span></li>;
            })}
          </ul>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="coach rv">
            <div className="coach-ph"><Photo photo={philosophy.photo} /></div>
            <div className="coach-copy">
              <div className="label"><span className="rule"></span>{philosophy.eyebrow}</div>
              <h2 className="h2" dangerouslySetInnerHTML={{ __html: philosophy.title }} />
              <p>{philosophy.text}</p>
              <ul className="ph-list">
                {philosophy.principles.map((x, i) => <li key={i}><span className="n">0{i + 1}</span><div><b>{x.title}</b><span>{x.desc}</span></div></li>)}
              </ul>
              <div className="coach-acts">
                <button className="btn btn-line" onClick={() => go('esperienza')}>{philosophy.cta} <span className="ar">→</span></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="tx dk">
        <div className="wrap">
          <div className="tx-head rv">
            <div>
              <div className="label"><span className="rule"></span>{transformations.eyebrow}</div>
              <h2 className="h2" dangerouslySetInnerHTML={{ __html: transformations.title }} />
            </div>
            <p className="tx-note"><span className="dot"></span>{transformations.note}</p>
          </div>
          <div className="tx-carousel">
          <button type="button" className="tx-btn tx-prev" aria-label={transformations.prev} onClick={() => txSlide(-1)} disabled={!txEdge.prev}><Icons.Arrow dir={-1} /></button>
          <button type="button" className="tx-btn tx-next" aria-label={transformations.next} onClick={() => txSlide(1)} disabled={!txEdge.next}><Icons.Arrow dir={1} /></button>
          <div className="tx-grid" ref={txRef} tabIndex={0} aria-label={transformations.eyebrow} onScroll={txUpdate}>
            {transformations.items.map((c, i) => (
              <article key={i} className="tx-card rv">
                <header className="tx-top">
                  <span className="tx-av" aria-hidden="true">{c.name.charAt(0)}</span>
                  <div className="tx-who">
                    <b>{c.name}</b>
                    <span className="tx-stars" role="img" aria-label={`${c.rating} stelle su 5`}>
                      {[1, 2, 3, 4, 5].map((k) => <Icons.Star key={k} on={k <= c.rating} />)}
                    </span>
                  </div>
                  <span className="tx-res">{c.result}</span>
                </header>
                <blockquote className="tx-quote"><p>“{c.quote}”</p></blockquote>
                <dl className="tx-body">
                  <div><dt>{transformations.labels.story}</dt><dd>{c.story}</dd></div>
                  <div><dt>{transformations.labels.improved}</dt><dd>{c.improved}</dd></div>
                </dl>
              </article>
            ))}
          </div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap split">
          <figure className="mx-media rv">
            <div className="frame"><Photo photo={method.photo} /></div>
            <div className="mx-chip"><span className="ok"><Icons.Check s={16} /></span><div><b>{method.chip.title}</b><span>{method.chip.sub}</span></div></div>
          </figure>
          <div className="mx-body">
            <div className="mx-head rv">
              <div className="label"><span className="rule"></span>{method.eyebrow}</div>
              <h2 className="h2" dangerouslySetInnerHTML={{ __html: method.title }} />
              <p className="meta">{method.meta}</p>
            </div>
            <div className="steps">
              {method.steps.map((s, i) => (
                <div key={i} className="step rv">
                  <div className="num">0{i + 1}</div>
                  <div><h3>{s.title}</h3><p>{s.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap">
          <div className="fb dk rv">
            <div className="fb-bg"><Photo photo={effort.photo} /></div>
            <div className="fb-shade"></div>
            <div className="fb-in">
              <div className="fb-copy">
                <div className="label"><span className="rule"></span>{effort.eyebrow}</div>
                <h2 className="h2" dangerouslySetInnerHTML={{ __html: effort.title }} />
                <p>{effort.text}</p>
              </div>
              <ol className="fb-list">
                {effort.values.map((t, i) => <li key={t}><span className="n">0{i + 1}</span><span className="t">{t}</span></li>)}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-tight tease-sec">
        <div className="wrap">
          <SectionHead label={packTeaser.eyebrow} title={packTeaser.title} meta={packTeaser.meta} />
          <div className="tease rv">
            {CONTENT.packs.map((p) => (
              <button key={p.id} className={`tease-item ${p.featured ? 'feat' : ''}`} onClick={() => go('pacchetti')}>
                <div className="tier">{p.tier}</div>
                <div className={`pname ${p.gold ? 'gold' : ''}`}>{p.name[0]}<em>{p.name[1]}</em></div>
                <p className="tease-tag">{p.tagline}</p>
                <div className="tease-more"><span>{packTeaser.more}</span><span className="ar">→</span></div>
              </button>
            ))}
          </div>
          <div className="center"><button className="btn btn-line" onClick={() => go('pacchetti')}>{packTeaser.cta} <span className="ar">→</span></button></div>
        </div>
      </section>

      <section className="ab dk">
        <div className="ab-bg"><Photo photo={roots.photo} /></div>
        <div className="ab-shade"></div>
        <div className={`wrap ab-in ${roots.stats.length ? '' : 'no-stats'}`}>
          {roots.stats.length > 0 && (
            <div className="ab-stats rv">
              {/* il numero deve restare il primo text node di .n: la Scia lo anima con un conteggio */}
              {roots.stats.map((s, i) => <div key={i} className="ab-stat"><div className="n">{s.value}<i>{s.unit}</i></div><div className="l">{s.label}</div></div>)}
            </div>
          )}
          <div className="ab-cap rv"><span className="it">{roots.caption[0]}<br/>{roots.caption[1]}</span></div>
        </div>
      </section>

      <CtaBand title={cta.title} label={cta.button} onClick={() => openContact()} />
    </div>
  );
};

window.PageHome = PageHome;
