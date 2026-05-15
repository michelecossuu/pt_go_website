// Pacchetti page
const fmtPrice = (n) => Math.round(n).toLocaleString('it-IT');

const PagePacchetti = ({ go, openContact }) => {
  const { packs, cycles, pacchetti } = CONTENT;
  const [cycleId, setCycleId] = React.useState('annuale');
  const cycle = cycles.find((c) => c.id === cycleId);

  return (
    <div className="page" data-screen-label="Pacchetti">
      <section className="section">
        <SectionHeader
          eyebrow={pacchetti.eyebrow}
          title={pacchetti.title}
          meta={pacchetti.meta}
        />

        {/* Billing cycle toggle */}
        <div className="cycle-toggle" role="tablist" aria-label="Periodo di fatturazione">
          {cycles.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cycleId === c.id}
              className={`cycle-opt ${cycleId === c.id ? 'active' : ''}`}
              onClick={() => setCycleId(c.id)}>
              <span>{c.label}</span>
              {c.badge && <em className="cycle-badge">{c.badge}</em>}
            </button>
          ))}
        </div>

        <div className="pack-grid">
          {packs.map((p) => {
            const total = p.monthly * cycle.months * (1 - cycle.discount);
            const effMonthly = total / cycle.months;
            return (
              <div key={p.id} className={`pack ${p.id} ${p.featured ? 'featured' : ''}`}>
                <div className="pack-tier">{p.tier}</div>
                <div className="pack-name display">
                  {p.name[0]}<em>{p.name[1]}</em>
                </div>
                <p className="pack-desc">{p.desc}</p>
                <div className="pack-price">
                  <span className="cur">€</span>
                  <span className="amt mono-num">{fmtPrice(effMonthly)}</span>
                  <span className="per">/ mese</span>
                </div>
                {cycle.months > 1 && (
                  <div className="pack-total">
                    <span>Totale {cycle.label.toLowerCase()}</span>
                    <strong>€{fmtPrice(total)}</strong>
                  </div>
                )}
                <ul className="pack-features">
                  {p.features.map((f, i) => (
                    <li key={i} className={!f.s ? 'muted' : ''}>
                      <span className="chk">
                        {f.s ? <Icons.Check /> : <svg width="14" height="14" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="6" y1="12" x2="18" y2="12"/></svg>}
                      </span>
                      <span>{f.bold ? <strong>{f.t}</strong> : f.t}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`btn ${p.featured ? 'btn-primary' : 'btn-ghost'}`}
                  onClick={() => openContact(p.id, cycleId)}>
                  Scegli {p.fullName} <span className="arrow">→</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Single lesson note */}
        <div className="single-note">
          <div>
            <div className="eyebrow"><span className="dot"></span>{pacchetti.singleLesson.eyebrow}</div>
            <h4>{pacchetti.singleLesson.title}</h4>
            <p>{pacchetti.singleLesson.desc}</p>
          </div>
          <div className="single-price">
            <span className="amt mono-num">{pacchetti.singleLesson.price}</span>
            <span className="per">{pacchetti.singleLesson.per}</span>
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="compare">
          <table>
            <thead>
              <tr>
                <th style={{width: '40%'}}>{pacchetti.compare.label}</th>
                {packs.map((p) => (
                  <th key={p.id} className={p.id === 'transformation' ? 'featured-col' : p.id === 'elite' ? 'elite-col' : ''}>
                    {p.fullName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pacchetti.compare.rows.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => {
                    const isYes = cell === '✓';
                    const isNo  = cell === '—';
                    const cls   = j === 0 ? '' : isYes ? 'yes' : isNo ? 'no' : '';
                    return <td key={j} className={cls}>{cell}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{paddingTop: 0}}>
        <SectionHeader
          eyebrow="FAQ"
          title="Le domande che <em>arrivano</em> sempre."
        />
        <div className="faq">
          {pacchetti.faq.map((f, i) => (
            <details key={i} className="faq-item" {...(i === 0 ? { open: true } : {})}>
              <summary>
                <span>{f.q}</span>
                <span className="plus">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                    <line x1="6" y1="0" x2="6" y2="12"/>
                    <line x1="0" y1="6" x2="12" y2="6"/>
                  </svg>
                </span>
              </summary>
              <div className="ans">{f.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="cta-banner">
          <div className="cta-banner-inner">
            <h3 className="display" dangerouslySetInnerHTML={{ __html: pacchetti.cta.title }} />
            <button className="btn btn-primary" onClick={() => openContact()}>
              {pacchetti.cta.button} <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

window.PagePacchetti = PagePacchetti;
