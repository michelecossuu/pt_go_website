// Select personalizzata: evita la sovrapposizione del menu nativo del sistema operativo
const CustomSelect = ({ id, value, onChange, options, placeholder }) => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const selected = options.find((o) => o.value === value);

  return (
    <div className="csel" ref={ref}>
      <button id={id} type="button" className={`csel-trigger ${open ? 'open' : ''}`} onClick={() => setOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={open}>
        <span className={selected ? '' : 'ph-txt'}>{selected ? selected.label : placeholder}</span>
        <Icons.Chevron />
      </button>
      {open && (
        <ul className="csel-menu" role="listbox">
          {options.map((o) => (
            <li key={o.value} role="option" aria-selected={value === o.value} className={`csel-opt ${value === o.value ? 'on' : ''}`}
              onMouseDown={() => { onChange(o.value); setOpen(false); }}>
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const EMPTY_FORM = { name: '', email: '', phone: '', goal: '', message: '', consent: false, website: '' };

const SEND_TIMEOUT_MS = 15000;

// Invia la richiesta alla Web App Apps Script.
// Content-Type text/plain: evita il preflight CORS, che Apps Script non gestisce.
const sendLead = async (endpoint, payload) => {
  if (!endpoint) throw new Error('Endpoint del form non configurato (CONTENT.contatti.form.endpoint)');
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), SEND_TIMEOUT_MS);
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    const json = await res.json();
    if (!json.ok) throw new Error(json.error || 'Risposta non valida');
  } finally {
    clearTimeout(timer);
  }
};

const PageContatti = ({ preselectedPack, preselectedCycle }) => {
  const { contact, contatti } = CONTENT;
  const { form, thankYou, intro } = contatti;

  const [pack, setPack] = React.useState(preselectedPack || '');
  const [cycle, setCycle] = React.useState(preselectedCycle || 'annuale');
  const [sent, setSent] = React.useState(false);
  const [data, setData] = React.useState(EMPTY_FORM);
  const [errors, setErrors] = React.useState({});
  const [status, setStatus] = React.useState('idle'); // idle | sending | error
  const startedAt = React.useRef(Date.now());
  const set = (k) => (e) => {
    setData({ ...data, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });
    if (errors[k]) setErrors({ ...errors, [k]: false });
  };

  React.useEffect(() => {
    if (preselectedPack) setPack(preselectedPack);
    if (preselectedCycle) setCycle(preselectedCycle);
  }, [preselectedPack, preselectedCycle]);

  // Pacchetto senza ciclo ('' = Non so ancora, 'singola'): passando a un pacchetto con ciclo parte da annuale
  const hasCycle = (id) => id && id !== 'singola';
  const selectPack = (id) => {
    if (hasCycle(id) && !hasCycle(pack)) setCycle('annuale');
    setPack(id);
  };

  const labelOf = (list, key, id) => (list.find((o) => o[key] === id) || {}).label || '';

  const submit = async (ev) => {
    ev.preventDefault();
    if (status === 'sending') return;
    const e = {};
    if (!data.name.trim()) e.name = true;
    if (!data.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = true;
    if (!data.consent) e.consent = true;
    setErrors(e);
    const first = ['name', 'email', 'consent'].find((k) => e[k]);
    if (first) document.getElementById(first === 'consent' ? 'f-consent' : `f-${first}`)?.focus();
    if (Object.keys(e).length) return;

    setStatus('sending');
    try {
      await sendLead(form.endpoint, {
        name:    data.name.trim(),
        email:   data.email.trim(),
        phone:   data.phone.trim(),
        goal:    labelOf(form.goals, 'value', data.goal),
        pack:    labelOf(form.packOptions, 'id', pack),
        cycle:   hasCycle(pack) ? labelOf(form.cycleOptions, 'id', cycle) : '',
        message: data.message.trim(),
        consent: data.consent,
        website: data.website,                 // honeypot: deve restare vuoto
        elapsed: Date.now() - startedAt.current, // ms dalla comparsa del form: invii troppo rapidi = bot
      });
      setStatus('idle');
      setSent(true);
      window.scrollTo({ top: 0 });
    } catch (err) {
      console.error('Invio form contatti fallito:', err);
      setStatus('error');
    }
  };

  if (sent) {
    return (
      <div className="page" data-screen-label="Contatti — Inviato">
        <section className="sec sec-first">
          <div className="wrap thanks in">
            <div className="ok"><Icons.Check s={30} /></div>
            <h1 className="h2 h-page">Messaggio <em>ricevuto</em>.</h1>
            <p className="lead">{thankYou.pretext}{data.name.split(' ')[0]}{thankYou.posttext}</p>
            <button className="btn btn-line" onClick={() => { setSent(false); setData(EMPTY_FORM); setPack(''); startedAt.current = Date.now(); }}>{thankYou.reset}</button>
          </div>
        </section>
      </div>
    );
  }

  const rows = [
    { ic: <Icons.Chat />, lb: 'Telefono · WhatsApp', v: contact.phone, href: contact.whatsappUrl, ext: true },
    { ic: <Icons.Mail />, lb: 'Email', v: contact.email, href: contact.emailHref },
    { ic: <Icons.Instagram />, lb: 'Instagram', v: contact.instagram, href: contact.instagramUrl, ext: true },
  ];

  return (
    <div className="page" data-screen-label="Contatti">
      <section className="sec sec-first">
        <div className="wrap">
          <SectionHead page label={intro.eyebrow} title={intro.title} />
          <div className="split">
            <div>
              <div className="clist">
                {rows.map((r, i) => (
                  <a key={i} className="crow" href={r.href} {...(r.ext ? { target: '_blank', rel: 'noreferrer' } : {})}>
                    <span className="ic">{r.ic}</span>
                    <div><div className="lb">{r.lb}</div><div className="v">{r.v}</div></div>
                    <span className="ar">↗</span>
                  </a>
                ))}
              </div>
              <div className="hours">
                <h4>Orari reperibilità</h4>
                {contact.hours.map((h) => (
                  <div key={h.label} className={`hrow ${h.closed ? 'off' : ''}`}><span className="d">{h.label}</span><span className="t">{h.time}</span></div>
                ))}
              </div>
            </div>

            <form className="form" onSubmit={submit} noValidate aria-busy={status === 'sending'}>
              {/* Honeypot anti-spam: invisibile agli utenti, i bot lo compilano */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="f-website">Sito web</label>
                <input id="f-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={set('website')} />
              </div>
              <div className="frow">
                <div className={`field ${errors.name ? 'bad' : ''}`}>
                  <label className="flabel" htmlFor="f-name">Nome e cognome *</label>
                  <input id="f-name" type="text" value={data.name} onChange={set('name')} aria-invalid={!!errors.name} placeholder={form.placeholders.name} autoComplete="name" />
                </div>
                <div className={`field ${errors.email ? 'bad' : ''}`}>
                  <label className="flabel" htmlFor="f-email">Email *</label>
                  <input id="f-email" type="email" value={data.email} onChange={set('email')} aria-invalid={!!errors.email} placeholder={form.placeholders.email} autoComplete="email" />
                </div>
              </div>
              <div className="frow">
                <div className="field">
                  <label className="flabel" htmlFor="f-phone">Telefono (opzionale)</label>
                  <input id="f-phone" type="tel" value={data.phone} onChange={set('phone')} placeholder={form.placeholders.phone} autoComplete="tel" />
                </div>
                <div className="field">
                  <label className="flabel" htmlFor="f-goal">Obiettivo principale</label>
                  <CustomSelect id="f-goal" value={data.goal} onChange={(v) => setData({ ...data, goal: v })} placeholder={form.placeholders.goal} options={form.goals} />
                </div>
              </div>
              <div className="field">
                <span className="flabel">Pacchetto di interesse</span>
                <div className="pills">
                  {form.packOptions.map((p) => (
                    <button key={p.id || 'none'} type="button" className={`pill ${pack === p.id ? 'on' : ''}`} onClick={() => selectPack(p.id)}>{p.label}</button>
                  ))}
                </div>
              </div>
              {hasCycle(pack) && (
                <div className="field">
                  <span className="flabel">Periodo di fatturazione</span>
                  <div className="pills">
                    {form.cycleOptions.map((c) => (
                      <button key={c.id} type="button" className={`pill ${cycle === c.id ? 'on' : ''}`} onClick={() => setCycle(c.id)}>{c.label}{c.badge && <em className="pill-bd">{c.badge}</em>}</button>
                    ))}
                  </div>
                </div>
              )}
              <div className="field">
                <label className="flabel" htmlFor="f-msg">Messaggio</label>
                <textarea id="f-msg" value={data.message} onChange={set('message')} placeholder={form.placeholders.message} maxLength={form.messageMaxLength} aria-describedby="f-msg-count" />
                <div id="f-msg-count" className={`fcount ${data.message.length >= form.messageMaxLength ? 'full' : ''}`}>{data.message.length}/{form.messageMaxLength}</div>
              </div>
              <label className={`consent ${errors.consent ? 'bad' : ''}`}>
                <input id="f-consent" type="checkbox" checked={data.consent} onChange={set('consent')} aria-invalid={!!errors.consent} />
                <span>
                  {form.consent.pre}
                  <a href={contact.privacyUrl} target="_blank" rel="noreferrer">{form.consent.privacyLabel}</a>
                  {form.consent.mid}
                  <a href={contact.termsUrl} target="_blank" rel="noreferrer">{form.consent.termsLabel}</a>
                  {form.consent.post}
                </span>
              </label>
              {status === 'error' && (
                <p className="fsend-err" role="alert">
                  {form.sendError.pre}
                  <a href={contact.whatsappUrl} target="_blank" rel="noreferrer">{form.sendError.link}</a>
                  {form.sendError.post}
                </p>
              )}
              <div className="fsub">
                <span className="note"><span className="dot"></span>{form.submitNote}</span>
                <button type="submit" className="btn btn-red" disabled={status === 'sending'}>
                  {status === 'sending' ? form.sendingLabel : form.submitLabel} <span className="ar">→</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

window.PageContatti = PageContatti;
