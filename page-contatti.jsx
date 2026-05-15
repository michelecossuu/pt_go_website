// Custom select that avoids native OS dropdown overlap issues
const CustomSelect = ({ value, onChange, options, placeholder }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div className="custom-select" ref={ref}>
      <button
        type="button"
        className={`custom-select-trigger ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selected ? '' : 'placeholder'}>{selected ? selected.label : placeholder}</span>
        <svg className="custom-select-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      {open && (
        <ul className="custom-select-dropdown" role="listbox">
          {options.map(o => (
            <li
              key={o.value}
              role="option"
              aria-selected={value === o.value}
              className={`custom-select-option ${value === o.value ? 'selected' : ''}`}
              onMouseDown={() => { onChange(o.value); setOpen(false); }}
            >
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Contatti page
const PageContatti = ({ preselectedPack, preselectedCycle }) => {
  const { contact, contatti } = CONTENT;
  const { form, thankYou, intro } = contatti;

  const [pack, setPack] = React.useState(preselectedPack || '');
  const [cycle, setCycle] = React.useState(preselectedCycle || 'mensile');
  const [sent, setSent] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', email: '', phone: '', goal: '', message: '', consent: false });
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (preselectedPack) setPack(preselectedPack);
    if (preselectedCycle) setCycle(preselectedCycle);
  }, [preselectedPack, preselectedCycle]);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = form.errors.name;
    if (!formData.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = form.errors.email;
    if (!formData.consent) e.consent = form.errors.consent;
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
              <p>{thankYou.pretext}{formData.name.split(' ')[0]}{thankYou.posttext}</p>
              <button className="btn btn-ghost" onClick={() => { setSent(false); setFormData({ name: '', email: '', phone: '', goal: '', message: '', consent: false }); setPack(''); }}>
                {thankYou.reset}
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
        <SectionHeader eyebrow={intro.eyebrow} title={intro.title} meta={intro.meta} />

        <div className="contact-grid">
          {/* Sidebar: contact info */}
          <div className="contact-info">
            <a className="contact-card" href={contact.phoneTel}>
              <div className="ico"><Icons.Phone /></div>
              <div>
                <div className="lab">Telefono · WhatsApp</div>
                <div className="val">{contact.phone}</div>
              </div>
              <span className="arr">↗</span>
            </a>
            <a className="contact-card" href={contact.emailHref}>
              <div className="ico"><Icons.Mail /></div>
              <div>
                <div className="lab">Email</div>
                <div className="val">{contact.email}</div>
              </div>
              <span className="arr">↗</span>
            </a>
            <a className="contact-card" href={contact.instagramUrl} target="_blank" rel="noreferrer">
              <div className="ico"><Icons.Instagram /></div>
              <div>
                <div className="lab">Instagram</div>
                <div className="val">{contact.instagram}</div>
              </div>
              <span className="arr">↗</span>
            </a>
            <a className="contact-card" href="#">
              <div className="ico"><Icons.Pin /></div>
              <div>
                <div className="lab">Studio</div>
                <div className="val">{contact.address}<br/>{contact.postalCode} {contact.city}</div>
              </div>
              <span className="arr">↗</span>
            </a>

            <div className="hours-card">
              <h4>Orari reperibilità</h4>
              <div className="hours">
                {contact.hours.map((h) => (
                  <div key={h.label} className={`hours-row${h.closed ? ' closed' : ''}`}>
                    <span className="day">{h.label}</span>
                    <span className="time">{h.time}</span>
                  </div>
                ))}
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
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder={form.placeholders.name}
                />
                {errors.name && <div className="err">{errors.name}</div>}
              </div>
              <div className={`field ${errors.email ? 'invalid' : ''}`}>
                <label>Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder={form.placeholders.email}
                />
                {errors.email && <div className="err">{errors.email}</div>}
              </div>
            </div>

            <div className="form-row">
              <div className="field">
                <label>Telefono (opzionale)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder={form.placeholders.phone}
                />
              </div>
              <div className="field">
                <label>Obiettivo principale</label>
                <CustomSelect
                  value={formData.goal}
                  onChange={(v) => setFormData({...formData, goal: v})}
                  placeholder={form.placeholders.goal}
                  options={form.goals}
                />
              </div>
            </div>

            <div className="field">
              <label>Pacchetto di interesse</label>
              <div className="pack-pills">
                {form.packOptions.map((p) => (
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
                  {form.cycleOptions.map((c) => (
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
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                placeholder={form.placeholders.message}
              />
            </div>

            <label className={`consent ${errors.consent ? 'invalid' : ''}`}>
              <input
                type="checkbox"
                checked={formData.consent}
                onChange={(e) => setFormData({...formData, consent: e.target.checked})}
              />
              <span>
                {form.consentText}
                {errors.consent && <span style={{color: 'var(--red)', display: 'block', marginTop: 4}}>{errors.consent}</span>}
              </span>
            </label>

            <div className="form-submit">
              <span className="note">{form.submitNote}</span>
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
