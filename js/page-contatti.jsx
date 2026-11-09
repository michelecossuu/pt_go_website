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

const EMPTY_FORM = { name: '', email: '', phone: '', goal: '', message: '', consent: false };

const PageContatti = ({ preselectedPack, preselectedCycle }) => {
  const { contact, contatti } = CONTENT;
  const { form, thankYou, intro } = contatti;

  const [pack, setPack] = React.useState(preselectedPack || '');
  const [cycle, setCycle] = React.useState(preselectedCycle || 'trimestrale');
  const [sent, setSent] = React.useState(false);
  const [data, setData] = React.useState(EMPTY_FORM);
  const [errors, setErrors] = React.useState({});
  const set = (k) => (e) => setData({ ...data, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value });

  React.useEffect(() => {
    if (preselectedPack) setPack(preselectedPack);
    if (preselectedCycle) setCycle(preselectedCycle);
  }, [preselectedPack, preselectedCycle]);

  const submit = (ev) => {
    ev.preventDefault();
    const e = {};
    if (!data.name.trim()) e.name = form.errors.name;
    if (!data.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) e.email = form.errors.email;
    if (!data.consent) e.consent = form.errors.consent;
    setErrors(e);
    if (!Object.keys(e).length) { setSent(true); window.scrollTo({ top: 0 }); }
  };

  if (sent) {
    return (
      <div className="page" data-screen-label="Contatti — Inviato">
        <section className="sec sec-first">
          <div className="wrap thanks in">
            <div className="ok"><Icons.Check s={30} /></div>
            <h1 className="h2 h-page">Messaggio <em>ricevuto</em>.</h1>
            <p className="lead">{thankYou.pretext}{data.name.split(' ')[0]}{thankYou.posttext}</p>
            <button className="btn btn-line" onClick={() => { setSent(false); setData(EMPTY_FORM); setPack(''); }}>{thankYou.reset}</button>
          </div>
        </section>
      </div>
    );
  }

  const rows = [
    { ic: <Icons.Chat />, lb: 'Telefono · WhatsApp', v: contact.phone, href: contact.whatsappUrl, ext: true },
    { ic: <Icons.Mail />, lb: 'Email', v: contact.email, href: contact.emailHref },
    { ic: <Icons.Instagram />, lb: 'Instagram', v: contact.instagram, href: contact.instagramUrl, ext: true },
    { ic: <Icons.Pin />, lb: 'Studio', v: <>{contact.address}<br/>{contact.postalCode} {contact.city}</>, href: contact.mapsUrl, ext: true },
  ];

  return (
    <div className="page" data-screen-label="Contatti">
      <section className="sec sec-first">
        <div className="wrap">
          <SectionHead page label={intro.eyebrow} title={intro.title} meta={intro.meta} />
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

            <form className="form" onSubmit={submit} noValidate>
              <div className="frow">
                <div className={`field ${errors.name ? 'bad' : ''}`}>
                  <label className="flabel" htmlFor="f-name">Nome e cognome *</label>
                  <input id="f-name" type="text" value={data.name} onChange={set('name')} placeholder={form.placeholders.name} autoComplete="name" />
                  {errors.name && <div className="err">{errors.name}</div>}
                </div>
                <div className={`field ${errors.email ? 'bad' : ''}`}>
                  <label className="flabel" htmlFor="f-email">Email *</label>
                  <input id="f-email" type="email" value={data.email} onChange={set('email')} placeholder={form.placeholders.email} autoComplete="email" />
                  {errors.email && <div className="err">{errors.email}</div>}
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
                    <button key={p.id || 'none'} type="button" className={`pill ${pack === p.id ? 'on' : ''}`} onClick={() => setPack(p.id)}>{p.label}</button>
                  ))}
                </div>
              </div>
              {pack && pack !== 'singola' && (
                <div className="field">
                  <span className="flabel">Periodo di fatturazione</span>
                  <div className="pills">
                    {form.cycleOptions.map((c) => (
                      <button key={c.id} type="button" className={`pill ${cycle === c.id ? 'on' : ''}`} onClick={() => setCycle(c.id)}>{c.label}</button>
                    ))}
                  </div>
                </div>
              )}
              <div className="field">
                <label className="flabel" htmlFor="f-msg">Messaggio</label>
                <textarea id="f-msg" value={data.message} onChange={set('message')} placeholder={form.placeholders.message} />
              </div>
              <label className="consent">
                <input type="checkbox" checked={data.consent} onChange={set('consent')} />
                <span>
                  {form.consentText}
                  {errors.consent && <span className="err" style={{ display: 'block', marginTop: 4 }}>{errors.consent}</span>}
                </span>
              </label>
              <div className="fsub">
                <span className="note"><span className="dot"></span>{form.submitNote}</span>
                <button type="submit" className="btn btn-red">Invia messaggio <span className="ar">→</span></button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

window.PageContatti = PageContatti;
