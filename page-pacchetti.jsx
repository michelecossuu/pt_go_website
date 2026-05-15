// Pacchetti page
const PACKS = [
  {
    id: 'kick',
    tier: '01 · Entry',
    name: ['Kick', 'Starter'],
    desc: 'Per chi inizia: una base solida con autonomia e metodo.',
    monthly: 50,
    features: [
      { t: 'Prima call per identificazione obiettivi', s: true },
      { t: 'Schede aggiornate ogni 6—8 settimane', s: true },
      { t: 'Check-in bi-settimanali', s: true },
      { t: 'Video e spiegazione esercizi', s: true },
      { t: 'Supporto WhatsApp limitato (entro 48h)', s: true },
      { t: 'Revisione esecuzione esercizi', s: false },
      { t: 'Adattamento scheda periodico', s: false },
      { t: 'Linee guida nutrizionali', s: false },
      { t: 'Piano alimentare completo', s: false },
    ],
  },
  {
    id: 'transformation',
    tier: '02 · Più scelto',
    name: ['Trans', 'formation'],
    desc: 'Il percorso più richiesto: accountability, ritmo e adattamenti continui.',
    monthly: 90,
    featured: true,
    features: [
      { t: 'Tutto del piano Kick Starter', s: true, bold: true },
      { t: 'Check-in settimanali', s: true },
      { t: 'Supporto WhatsApp (risposta entro 24h)', s: true },
      { t: 'Revisione esecuzione esercizi', s: true },
      { t: 'Adattamento scheda periodico', s: true },
      { t: 'Linee guida nutrizionali', s: true },
      { t: 'Piano alimentare completo', s: false },
      { t: '1:1 mensile di revisione', s: false },
    ],
  },
  {
    id: 'elite',
    tier: '03 · Premium',
    name: ['El', 'ite'],
    desc: "L'esperienza completa: piano alimentare, revisione 1:1 e priorità totale.",
    monthly: 120,
    features: [
      { t: 'Tutto del piano Transformation', s: true, bold: true },
      { t: 'Supporto WhatsApp prioritario', s: true },
      { t: 'Piano alimentare completo', s: true },
      { t: '1:1 mensile di revisione', s: true },
    ],
  },
];

// Billing cycles — discount applies to the equivalent of N months
const CYCLES = [
  { id: 'annuale', label: 'Annuale', months: 12, discount: 0.20, badge: '−20%' },
  { id: 'semestrale', label: 'Semestrale', months: 6, discount: 0.15, badge: '−15%' },
  { id: 'trimestrale', label: 'Trimestrale', months: 3, discount: 0.10, badge: '−10%' },
  { id: 'mensile', label: 'Mensile', months: 1, discount: 0, badge: null },
];

const fmtPrice = (n) => Math.round(n).toLocaleString('it-IT');

const PagePacchetti = ({ go, openContact }) => {
  const [cycleId, setCycleId] = React.useState('annuale');
  const cycle = CYCLES.find((c) => c.id === cycleId);

  return (
    <div className="page" data-screen-label="Pacchetti">
      <section className="section">
        <SectionHeader
          eyebrow="I Pacchetti"
          title="Tre percorsi.<br/>Il <em>tuo</em>, in fondo, è uno solo."
          meta="Tutti i pacchetti includono prima call gratuita di identificazione obiettivi. Sconti progressivi su trimestrale, semestrale e annuale."
        />

        {/* Billing cycle toggle */}
        <div className="cycle-toggle" role="tablist" aria-label="Periodo di fatturazione">
          {CYCLES.map((c) => (
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
          {PACKS.map((p) => {
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
                  Scegli {p.id === 'kick' ? 'Kick Starter' : p.name.join('')} <span className="arrow">→</span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Single lesson note */}
        <div className="single-note">
          <div>
            <div className="eyebrow"><span className="dot"></span>Senza pacchetto</div>
            <h4>Lezione singola</h4>
            <p>Una sessione 1:1, senza impegno. Ideale per provare il metodo o per una consulenza tecnica specifica.</p>
          </div>
          <div className="single-price">
            <span className="amt mono-num">€50</span>
            <span className="per">/ora</span>
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div className="compare">
          <table>
            <thead>
              <tr>
                <th style={{width: '40%'}}>Cosa è incluso</th>
                <th>Kick Starter</th>
                <th className="featured-col">Transformation</th>
                <th className="elite-col">Elite</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Prima call identificazione obiettivi', '✓', '✓', '✓'],
                ['Schede personalizzate', 'Ogni 6—8 sett.', 'Ogni 6—8 sett.', 'Ogni 6—8 sett.'],
                ['Check-in', 'Bi-settimanali', 'Settimanali', 'Settimanali'],
                ['Video e spiegazione esercizi', '✓', '✓', '✓'],
                ['Supporto WhatsApp', 'Entro 48h', 'Entro 24h', 'Prioritario'],
                ['Revisione esecuzione esercizi', '—', '✓', '✓'],
                ['Adattamento scheda periodico', '—', '✓', '✓'],
                ['Linee guida nutrizionali', '—', '✓', '✓'],
                ['Piano alimentare completo', '—', '—', '✓'],
                ['1:1 mensile di revisione', '—', '—', '✓'],
                ['Prezzo mensile', '€50', '€90', '€120'],
                ['Annuale (−20%)', '€480', '€864', '€1.152'],
              ].map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => {
                    const isYes = cell === '✓';
                    const isNo = cell === '—';
                    const cls = j === 0 ? '' : isYes ? 'yes' : isNo ? 'no' : '';
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
          {[
            {
              q: 'Come funzionano gli sconti su trimestrale, semestrale e annuale?',
              a: 'Più lungo è l\'impegno, più scende il prezzo mensile equivalente: −10% sul trimestrale, −15% sul semestrale, −20% sull\'annuale. Il pagamento avviene in un\'unica soluzione al momento dell\'attivazione.',
            },
            {
              q: 'Posso cambiare pacchetto durante il percorso?',
              a: 'Sì, in qualsiasi momento. Se passi a un piano superiore, paghi solo la differenza pro-rata. Se scendi, la modifica parte dal ciclo successivo.',
            },
            {
              q: 'Posso allenarmi nella mia palestra di fiducia?',
              a: 'Assolutamente sì. I pacchetti sono pensati per essere seguiti ovunque: nella tua palestra, a casa, in viaggio. Ti fornisco programmazione, video e supporto — la sala te la scegli tu.',
            },
            {
              q: 'Quanto velocemente vedrò risultati?',
              a: 'Dipende dal punto di partenza e dalla costanza. La maggior parte dei clienti nota cambiamenti visibili tra la quarta e l\'ottava settimana. Lavoro per risultati duraturi, non per stupire la bilancia in due settimane.',
            },
            {
              q: 'Il piano alimentare è incluso in tutti i pacchetti?',
              a: 'Le linee guida nutrizionali sono incluse dal Transformation. Il piano alimentare completo, con calcolo dei macronutrienti e indicazioni sui pasti, è incluso solo nell\'Elite.',
            },
            {
              q: 'Lavori con principianti?',
              a: 'Sì, e con piacere. Anzi, è uno dei momenti più importanti per impostare bene tutto: tecnica, abitudini, mentalità. Non serve "essere in forma" per iniziare.',
            },
            {
              q: 'Posso prendere solo una lezione singola?',
              a: 'Certo: 50€/ora, una sessione 1:1 senza impegno. Utile per provare il metodo o per una valutazione tecnica specifica.',
            },
          ].map((f, i) => (
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
            <h3 className="display">Non sai quale scegliere?<br/>Parliamone <em>insieme</em>.</h3>
            <button className="btn btn-primary" onClick={() => openContact()}>
              Consulenza gratuita <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

window.PagePacchetti = PagePacchetti;
window.PACKS = PACKS;
window.CYCLES = CYCLES;
