// Contatti page
const PageContatti = ({ preselectedPack, preselectedCycle }) => {
  const [pack, setPack] = React.useState(preselectedPack || '');
  const [cycle, setCycle] = React.useState(preselectedCycle || 'mensile');
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', goal: '', message: '', consent: false });
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (preselectedPack) setPack(preselectedPack);
    if (preselectedCycle) setCycle(preselectedCycle);
  }, [preselectedPack, preselectedCycle]);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Inserisci il tuo nome';
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = 'Email non valida';
    if (!form.consent) e.consent = 'Necessario per procedere';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setSent(true);
  };

  if (sent) {
    return (
      <div className="page" data-screen-label="Contatti — Inviato">
        <section className="section">
          <div className="form" style={{maxWidth: 640, margin: '0 auto'}}>
            <div className="thank-you">
              <div className="ico"><Icons.Check s={32}/></div>
              <h3 className="display">Messaggio <span style={{color: 'var(--red)', fontStyle: 'italic'}}>ricevuto</span>.</h3>
              <p>Grazie {form.name.split(' ')[0]}. Ti rispondo entro 24 ore con i prossimi passi e un orario per la consulenza gratuita.</p>
              <button className="btn btn-ghost" onClick={() => { setSent(false); setForm({ name: '', email: '', phone: '', goal: '', message: '', consent: false }); setPack(''); }}>
                Invia un altro messaggio
              </button>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page" data-screen-label="Contatti">
      <section className="section">
        <SectionHeader
          eyebrow="Contatti"
          title="Scrivimi.<br/>La prima consulenza è <em>gratuita</em>."
          meta="Rispondo personalmente entro 24 ore. Niente segreteria, niente form passati a uno staff: parli con me."
        />

        <div className="contact-grid">
          {/* Sidebar: contact info */}
          <div className="contact-info">
            <a className="contact-card" href="tel:+393331234567">
              <div className="ico"><Icons.Phone /></div>
              <div>
                <div className="lab">Telefono · WhatsApp</div>
                <div className="val">+39 333 123 4567</div>
              </div>
              <span className="arr">↗</span>
            </a>
            <a className="contact-card" href="mailto:giuliano@ortupt.it">
              <div className="ico"><Icons.Mail /></div>
              <div>
                <div className="lab">Email</div>
                <div className="val">giuliano@ortupt.it</div>
              </div>
              <span className="arr">↗</span>
            </a>
            <a className="contact-card" href="https://instagram.com/" target="_blank" rel="noreferrer">
              <div className="ico"><Icons.Instagram /></div>
              <div>
                <div className="lab">Instagram</div>
                <div className="val">@giuliano.ortu.pt</div>
              </div>
              <span className="arr">↗</span>
            </a>
            <a className="contact-card" href="#">
              <div className="ico"><Icons.Pin /></div>
              <div>
                <div className="lab">Studio</div>
                <div className="val">Via dei Giudicati 14<br/>09131 Cagliari (CA)</div>
              </div>
              <span className="arr">↗</span>
            </a>

            <div className="hours-card">
              <h4>Orari studio</h4>
              <div className="hours">
                <div className="hours-row"><span className="day">Lunedì — Venerdì</span><span className="time">07:00 — 21:00</span></div>
                <div className="hours-row"><span className="day">Sabato</span><span className="time">08:00 — 14:00</span></div>
                <div className="hours-row closed"><span className="day">Domenica</span><span className="time">Chiuso</span></div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form className="form" onSubmit={submit} noValidate>
            <div className="form-row">
              <div className={`field ${errors.name ? 'invalid' : ''}`}>
                <label>Nome e cognome *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({...form, name: e.target.value})}
                  placeholder="Mario Rossi"
                />
                {errors.name && <div className="err">{errors.name}</div>}
              </div>
              <div className={`field ${errors.email ? 'invalid' : ''}`}>
                <label>Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                  placeholder="mario@email.it"
                />
                {errors.email && <div className="err">{errors.email}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>Telefono (opzionale)</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({...form, phone: e.target.value})}
                  placeholder="+39 ___ ___ ____"
                />
              </div>
              <div className="field">
                <label>Obiettivo principale</label>
                <select value={form.goal} onChange={(e) => setForm({...form, goal: e.target.value})}>
                  <option value="">Seleziona...</option>
                  <option>Dimagrimento</option>
                  <option>Aumento massa muscolare</option>
                  <option>Body recomposition</option>
                  <option>Forza / powerlifting</option>
                  <option>Postura / dolori</option>
                  <option>Riabilitazione</option>
                  <option>Altro</option>
                </select>
              </div>
            </div>

            <div className="field">
              <label>Pacchetto di interesse</label>
              <div className="pack-pills">
                {[
                  { id: '', label: 'Non so ancora' },
                  { id: 'kick', label: 'Kick Starter' },
                  { id: 'transformation', label: 'Transformation' },
                  { id: 'elite', label: 'Elite' },
                  { id: 'singola', label: 'Lezione singola' },
                ].map((p) => (
                  <button
                    key={p.id || 'none'}
                    type="button"
                    className={`pack-pill ${pack === p.id ? 'active' : ''}`}
                    onClick={() => setPack(p.id)}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {pack && pack !== 'singola' && (
              <div className="field">
                <label>Periodo di fatturazione</label>
                <div className="pack-pills">
                  {[
                    { id: 'mensile', label: 'Mensile' },
                    { id: 'trimestrale', label: 'Trimestrale −10%' },
                    { id: 'semestrale', label: 'Semestrale −15%' },
                    { id: 'annuale', label: 'Annuale −20%' },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className={`pack-pill ${cycle === c.id ? 'active' : ''}`}
                      onClick={() => setCycle(c.id)}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="field">
              <label>Messaggio</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({...form, message: e.target.value})}
                placeholder="Raccontami qualcosa di te: il tuo punto di partenza, cosa hai già provato, cosa vorresti cambiare..."
              />
            </div>

            <label className={`consent ${errors.consent ? 'invalid' : ''}`}>
              <input
                type="checkbox"
                checked={form.consent}
                onChange={(e) => setForm({...form, consent: e.target.checked})}
              />
              <span>
                Acconsento al trattamento dei miei dati personali per essere ricontattato.
                I dati non saranno condivisi con terzi e potranno essere cancellati su richiesta.
                {errors.consent && <span style={{color: 'var(--red)', display: 'block', marginTop: 4}}>{errors.consent}</span>}
              </span>
            </label>

            <div className="form-submit">
              <span className="note">Risposta entro 24 ore · Consulenza iniziale gratuita</span>
              <button type="submit" className="btn btn-primary">
                Invia messaggio <span className="arrow">→</span>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

window.PageContatti = PageContatti;
