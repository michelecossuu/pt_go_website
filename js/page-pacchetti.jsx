const PagePacchetti = ({ openContact }) => {
  const { packs, cycles, pacchetti } = CONTENT;
  const { singleLesson, compare, faq, cta } = pacchetti;
  const [openFaq, setOpenFaq] = React.useState(0);
  const rates = [...cycles].reverse();   // trimestrale → semestrale → annuale
  const colCls = (p) => (p.featured ? 'f' : p.gold ? 'g' : '');

  return (
    <div className="page page-pk" data-screen-label="Pacchetti">
      <section className="sec sec-first">
        <div className="wrap">
          <SectionHead page label={pacchetti.eyebrow} title={pacchetti.title} />

          <div className="perks">
            {pacchetti.perks.map((t, i) => <span key={i} className={`perk ${i === 0 ? 'perk-red' : ''}`}>{i === 0 && '★ '}{t}</span>)}
          </div>

          <div className="packs">
            {packs.map((p) => {
              return (
                <article key={p.id} className={`pack ${p.featured ? 'feat' : ''}`}>
                  <div className="tier">{p.tier}</div>
                  <h2 className={`pname ${p.gold ? 'gold' : ''}`}>{p.name[0]}<em>{p.name[1]}</em></h2>
                  <p className="pack-desc">{p.desc}</p>
                  <div className="rates-label">Tariffe</div>
                  <ul className="rates">
                    {rates.map((c) => (
                      <li key={c.id}>
                        <span className="rl">{c.label}{c.badge && <em className="bd">{c.badge}</em>}</span>
                        <b className="rp">€{fmtPrice(p.prices[c.id])}</b>
                        <span className="rm">€{fmtPrice(p.prices[c.id] / c.months)}/mese</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="feats">
                    {p.features.map((f, i) => (
                      <li key={i} className={f.s ? '' : 'off'}>
                        {f.s ? <Icons.Check /> : <Icons.Dash />}
                        <span>{f.bold ? <strong>{f.t}</strong> : f.t}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`btn ${p.featured ? 'btn-red' : 'btn-line'}`} onClick={() => openContact(p.id)}>
                    Scegli {p.fullName} <span className="ar">→</span>
                  </button>
                </article>
              );
            })}
          </div>

          <div className="single rv">
            <div>
              <div className="label"><span className="rule"></span>{singleLesson.eyebrow}</div>
              <h3>{singleLesson.title}</h3>
              <p>{singleLesson.desc}</p>
            </div>
            <div className="single-price"><span className="a">{singleLesson.price}</span></div>
            <button className="btn btn-line" onClick={() => openContact('singola')}>Prenota <span className="ar">→</span></button>
          </div>

          <div className="compare rv">
            <div className="label"><span className="rule"></span>Confronto</div>
            <div className="tbl-wrap">
              <table className="tbl">
                <thead>
                  <tr>
                    <th style={{ width: '38%' }}>{compare.label}</th>
                    {packs.map((p) => <th key={p.id} className={colCls(p)}>{p.fullName}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {compare.rows.map((row, i) => (
                    <tr key={i}>
                      {row.map((cell, j) => {
                        const cls = [j > 0 && packs[j - 1].featured ? 'f' : '', j > 0 && cell === '✓' ? 'y' : '', j > 0 && cell === '—' ? 'x' : ''].join(' ').trim();
                        return <td key={j} className={cls}>{cell}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="sec sec-tight">
        <div className="wrap split">
          <div className="sticky">
            <div className="label"><span className="rule"></span>FAQ</div>
            <h2 className="h2">Le <em>domande</em> più frequenti</h2>
            <button className="more" onClick={() => openContact()}>Hai un'altra domanda? Scrivimi <span className="ar">→</span></button>
          </div>
          <div>
            {faq.map((f, i) => (
              <div key={i} className={`faq-item${openFaq === i ? ' is-open' : ''}`}>
                <button className="faq-q" aria-expanded={openFaq === i} onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                  <span>{f.q}</span><span className="pm"></span>
                </button>
                <div className="ans-wrap"><div className="ans-in"><div className="ans">{f.a}</div></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title={cta.title} label={cta.button} onClick={() => openContact()} />
    </div>
  );
};

window.PagePacchetti = PagePacchetti;
