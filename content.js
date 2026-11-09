// ─── Contenuto centralizzato del sito ───────────────────────────────────────
// Modificare qui per aggiornare testi, prezzi e dati in tutta l'app.
globalThis.window.CONTENT = {

  // ── Identità del brand ────────────────────────────────────────────────────
  brand: {
    firstName:   'Giuliano',
    lastName:    'Ortu',
    fullName:    'Giuliano Ortu',
    title:       'Personal Trainer',
    location:    'Monza & Brianza',
    tagline:     'Ascolto, metodo, evoluzione.',
    taglineSub:  'Allenamento su misura, a Monza & Brianza.',
    vatId:       'P.IVA 00011112222',
  },

  // ── Contatti ──────────────────────────────────────────────────────────────
  contact: {
    phone:        '+39 333 123 4567',
    phoneTel:     'tel:+393331234567',
    email:        'giuliano@ortupt.it',
    emailHref:    'mailto:giuliano@ortupt.it',
    instagram:    '@giuliano.ortu.pt',
    instagramUrl: 'https://instagram.com/',
    address:      'Via Di Triuggio 20',
    city:         'Triuggio (MB)',
    postalCode:   '09131',
    hours: [
      { label: 'Lunedì — Venerdì', time: '08:00 — 21:00', closed: false },
      { label: 'Sabato',           time: '08:00 — 14:00', closed: false },
      { label: 'Domenica',         time: 'Chiuso',        closed: true  },
    ],
  },

  // ── Navigazione ───────────────────────────────────────────────────────────
  nav: [
    { id: 'home',       label: 'Home' },
    { id: 'esperienza', label: 'Esperienza' },
    { id: 'pacchetti',  label: 'Pacchetti' },
    { id: 'contatti',   label: 'Contatti' },
  ],

  // ── Home ──────────────────────────────────────────────────────────────────
  home: {
    hero: {
      eyebrow:    'Personal Trainer · Monza & Brianza',
      headline:   ['Ascolto,', 'metodo,', 'evoluzione.'],
      sub:        'Allenamento su misura per chi vuole risultati reali, senza scorciatoie. Tu, i tuoi obiettivi, un metodo costruito intorno alla tua quotidianità.',
      ctaPrimary: 'Scopri i Pacchetti',
      ctaGhost:   'Prenota una consulenza',
      liveTag:    'Live · Coaching',
      vital: [
        { label: 'Sessione',  value: '60',  unit: 'min' },
        { label: 'BPM Medio', value: '142', unit: null  },
        { label: 'Kcal',      value: '680', unit: null  },
      ],
    },
    stats: [
      { value: '12',  unit: '+', label: 'Anni di esperienza' },
      { value: '340', unit: '+', label: 'Clienti seguiti'    },
      { value: '98',  unit: '%', label: 'Obiettivi raggiunti' },
    ],
    marquee: [
      'Forza funzionale', 'Ipertrofia', 'Dimagrimento', 'Postura',
      'Atletica', 'Recupero', 'Body recomp', 'Preparazione gare',
    ],
    method: {
      eyebrow: 'Il metodo',
      title:   'Un approccio <em>completo</em>,<br/>non un programma standard.',
      meta:    'Ogni piano nasce da una valutazione fisica e da una conversazione onesta. Niente copia-incolla, niente promesse vuote.',
      cards: [
        { icon: 'Activity', title: 'Valutazione iniziale',     desc: 'Test funzionali, analisi posturale e composizione corporea. Si parte dai dati, non dalle sensazioni.' },
        { icon: 'Dumbbell', title: 'Programmazione su misura', desc: 'Schede progressive che si adattano al tuo ritmo settimanale, alla tua condizione e ai tuoi obiettivi.' },
        { icon: 'Heart',    title: 'Supporto continuo',        desc: "WhatsApp diretto, revisioni mensili e monitoraggio costante. Non sei solo tra una sessione e l'altra." },
      ],
    },
    packTeaser: {
      eyebrow: 'Pacchetti',
      title:   "Tre percorsi,<br/>un solo <em>obiettivo</em>.",
      meta:    'Dalla scheda mensile al coaching completo. Scegli la profondità del supporto in base al tuo momento.',
      cta:     'Confronta tutti i pacchetti',
    },
    testimonial: {
      quote:  "Sei mesi con Giuliano e ho perso 11 kg, ma soprattutto ho recuperato il mal di schiena che mi tormentava da anni. Non è solo un trainer: è una persona che ti ascolta davvero.",
      author: 'Marta R.',
      role:   'Cliente dal 2024',
    },
    cta: {
      title:  'Pronto a iniziare<br/>il <em>tuo</em> percorso?',
      button: 'Prenota una consulenza gratuita',
    },
  },

  // ── Pacchetti (dati) ──────────────────────────────────────────────────────
  packs: [
    {
      id:         'kick',
      tier:       '01 · Entry',
      fullName:   'Core',
      name:       ['Co', 're'],
      teaserDesc: 'Schede ogni 6-8 settimane, check-in bi-settimanali.',
      desc:       'Per chi inizia: una base solida con autonomia e metodo.',
      monthly:    50,
      features: [
        { t: 'Prima call per identificazione obiettivi',    s: true  },
        { t: 'Schede aggiornate ogni 6—8 settimane',        s: true  },
        { t: 'Check-in bi-settimanali',                     s: true  },
        { t: 'Video e spiegazione esercizi',                s: true  },
        { t: 'Supporto WhatsApp limitato (entro 48h)',      s: true  },
        { t: 'Revisione esecuzione esercizi',               s: false },
        { t: 'Adattamento scheda periodico',                s: false },
        { t: 'Linee guida nutrizionali',                    s: false },
        { t: 'Piano alimentare completo',                   s: false },
      ],
    },
    {
      id:         'transformation',
      tier:       '02 · Più scelto',
      fullName:   'Transformation',
      name:       ['Trans', 'formation'],
      teaserDesc: 'Check-in settimanali, supporto continuo, linee guida nutrizionali.',
      desc:       "Il percorso più richiesto: accountability, ritmo e adattamenti continui.",
      monthly:    90,
      featured:   true,
      features: [
        { t: 'Tutto del piano Kick Starter',                s: true,  bold: true },
        { t: 'Check-in settimanali',                        s: true  },
        { t: 'Supporto WhatsApp (risposta entro 24h)',       s: true  },
        { t: 'Revisione esecuzione esercizi',               s: true  },
        { t: 'Adattamento scheda periodico',                s: true  },
        { t: 'Linee guida nutrizionali',                    s: true  },
        { t: 'Piano alimentare completo',                   s: false },
        { t: '1:1 mensile di revisione',                    s: false },
      ],
    },
    {
      id:         'elite',
      tier:       '03 · Premium',
      fullName:   'Revolution',
      name:       ['Revol', 'ution'],
      teaserDesc: 'Piano alimentare completo e 1:1 mensile di revisione.',
      desc:       "L'esperienza completa: piano alimentare, revisione 1:1 e priorità totale.",
      monthly:    120,
      features: [
        { t: 'Tutto del piano Transformation',              s: true,  bold: true },
        { t: 'Supporto WhatsApp prioritario',               s: true  },
        { t: 'Piano alimentare completo',                   s: true  },
        { t: '1:1 mensile di revisione',                    s: true  },
      ],
    },
  ],

  // ── Cicli di fatturazione ─────────────────────────────────────────────────
  cycles: [
    { id: 'annuale',     label: 'Annuale',     months: 12, discount: 0.20, badge: '−20%' },
    { id: 'semestrale',  label: 'Semestrale',  months: 6,  discount: 0.15, badge: '−15%' },
    { id: 'trimestrale', label: 'Trimestrale', months: 3,  discount: 0.10, badge: '−10%' },
    { id: 'mensile',     label: 'Mensile',     months: 1,  discount: 0,    badge: null    },
  ],

  // ── Pagina Pacchetti ──────────────────────────────────────────────────────
  pacchetti: {
    eyebrow: 'I Pacchetti',
    title:   "Tre percorsi.<br/>Il <em>tuo</em>, in fondo, è uno solo.",
    meta:    'Tutti i pacchetti includono prima call gratuita di identificazione obiettivi. Sconti progressivi su trimestrale, semestrale e annuale.',
    singleLesson: {
      eyebrow: 'Senza pacchetto',
      title:   'Lezione singola',
      desc:    'Una sessione 1:1, senza impegno. Ideale per provare il metodo o per una consulenza tecnica specifica.',
      price:   '€50',
      per:     '/ora',
    },
    compare: {
      label: 'Cosa è incluso',
      rows: [
        ['Prima call identificazione obiettivi', '✓',             '✓',           '✓'        ],
        ['Schede personalizzate',                'Ogni 6—8 sett.','Ogni 6—8 sett.','Ogni 6—8 sett.'],
        ['Check-in',                             'Bi-settimanali','Settimanali',  'Settimanali'],
        ['Video e spiegazione esercizi',         '✓',             '✓',           '✓'        ],
        ['Supporto WhatsApp',                    'Entro 48h',     'Entro 24h',   'Prioritario'],
        ['Revisione esecuzione esercizi',        '—',             '✓',           '✓'        ],
        ['Adattamento scheda periodico',         '—',             '✓',           '✓'        ],
        ['Linee guida nutrizionali',             '—',             '✓',           '✓'        ],
        ['Piano alimentare completo',            '—',             '—',           '✓'        ],
        ['1:1 mensile di revisione',             '—',             '—',           '✓'        ],
        ['Prezzo mensile',                       '€50',           '€90',         '€120'     ],
        ['Annuale (−20%)',                       '€480',          '€864',        '€1.152'   ],
      ],
    },
    faq: [
      {
        q: 'Come funzionano gli sconti su trimestrale, semestrale e annuale?',
        a: "Più lungo è l'impegno, più scende il prezzo mensile equivalente: −10% sul trimestrale, −15% sul semestrale, −20% sull'annuale. Il pagamento avviene in un'unica soluzione al momento dell'attivazione.",
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
        a: "Dipende dal punto di partenza e dalla costanza. La maggior parte dei clienti nota cambiamenti visibili tra la quarta e l'ottava settimana. Lavoro per risultati duraturi, non per stupire la bilancia in due settimane.",
      },
      {
        q: 'Il piano alimentare è incluso in tutti i pacchetti?',
        a: "Le linee guida nutrizionali sono incluse dal Transformation. Il piano alimentare completo, con calcolo dei macronutrienti e indicazioni sui pasti, è incluso solo nell'Elite.",
      },
      {
        q: 'Lavori con principianti?',
        a: 'Sì, e con piacere. Anzi, è uno dei momenti più importanti per impostare bene tutto: tecnica, abitudini, mentalità. Non serve "essere in forma" per iniziare.',
      },
      {
        q: 'Posso prendere solo una lezione singola?',
        a: "Certo: 50€/ora, una sessione 1:1 senza impegno. Utile per provare il metodo o per una valutazione tecnica specifica.",
      },
    ],
    cta: {
      title:  "Non sai quale scegliere?<br/>Parliamone <em>insieme</em>.",
      button: 'Consulenza gratuita',
    },
  },

  // ── Pagina Esperienza ─────────────────────────────────────────────────────
  esperienza: {
    intro: {
      eyebrow: 'Chi sono',
      title:   "Una vita dedicata allo sport,<br/> alla nutrizione e alle <em>persone</em>.",
      meta:    'Personal Trainer certificato, formato in anatomia e fisiologia e specializzato in ricomposizione corporea e riabilitazione funzionale.',
    },
    badge: 'Disponibile · Monza & Brianza',
    bio: [
      'Ho sempre fatto sport, e mi ha insegnato i valori della disciplina, del controllo e della crescita personale. Per questo motivo, ho deciso di mettermi in gioco come personal trainer per trasmettere agli altri ciò che per me è fondamentale nella vita — la passione, la dedizione e la trasformazione consapevole.',
      'Il mio metodo è semplice: <strong style="color:var(--text)">ascolto prima, programmo dopo</strong>. Ogni corpo racconta una storia diversa, e il mio lavoro è leggerla bene prima di scrivere un piano che funzioni davvero. Credo nei numeri, nelle progressioni misurate e nella costanza — quella vera, non quella delle foto motivazionali.',
    ],
    signature: '— Giuliano',
    certifications: {
      eyebrow: 'Formazione',
      title:   'Certificazioni e <em>diplomi</em>.',
      items: [
        { icon: 'Cap',   year: '2014 · Laurea Magistrale', title: 'Scienze e Tecniche dello Sport',                   org: 'Università degli Studi di Alghero · 110 / 110 con lode' },
        { icon: 'Award', year: '2015',                     title: 'NSCA Certified Strength & Conditioning Specialist', org: 'National Strength and Conditioning Association · USA'    },
        { icon: 'Award', year: '2017',                     title: 'FIPE — Istruttore di Powerlifting Livello 2',       org: 'Federazione Italiana Pesistica e Cultura Fisica'          },
        { icon: 'Award', year: '2019',                     title: 'Functional Movement Screen — Livello 2',            org: 'FMS Functional Movement Systems'                         },
        { icon: 'Cap',   year: '2021 · Master',            title: 'Nutrizione Applicata allo Sport',                  org: 'Scuola Italiana di Medicina dello Sport · Milano'         },
        { icon: 'Award', year: '2023',                     title: 'Postural Rehab Specialist',                        org: 'ATS — Academy of Therapeutic Sports'                     },
      ],
    },
    specializations: {
      eyebrow: 'Specializzazioni',
      title:   'Dove sono <em>più forte</em>.',
      items: [
        { n: '01', title: 'Body recomposition', desc: 'Costruire massa e perdere grasso allo stesso tempo, in modo sostenibile.'                        },
        { n: '02', title: 'Forza & powerlifting', desc: 'Programmazione per atleti natural e gare federali FIPE/IPF.'                                  },
        { n: '03', title: 'Riabilitazione',      desc: "Ritorno all'attività dopo infortuni a spalla, ginocchio e schiena."                            },
        { n: '04', title: 'Postura',             desc: 'Correzione di squilibri da scrivania e mobilità per chi sta seduto otto ore.'                  },
      ],
    },
    timeline: {
      eyebrow: 'Percorso',
      title:   'Dove ho <em>allenato</em>.',
      items: [
        { years: '2014 — 2016', place: 'Body & Soul Fitness Center',    desc: 'Trainer di sala e responsabile dei corsi di forza. Primo contatto con la programmazione per atleti agonisti.'                           },
        { years: '2016 — 2020', place: 'Sardinia Strength Lab',         desc: 'Co-fondatore di uno spazio dedicato a forza e powerlifting. Preparazione di sei atleti per gare nazionali FIPE.'                        },
        { years: '2020 — 2023', place: 'Coach online — Stagione pandemia', desc: 'Costruito un programma di coaching da remoto per 80+ clienti in tutta Italia. Sviluppo del metodo personale.'                       },
        { years: '2023 — Oggi', place: 'Studio Privato · Monza & Brianza', desc: 'Spazio personale dedicato 1-to-1, con valutazione funzionale, area pesi e nutrizione integrata.'                                    },
      ],
    },
    cta: {
      title:  "Fissiamo un incontro,<br/>la prima volta è <em>offerta da me</em>.",
      button: 'Prenota la consulenza',
    },
  },

  // ── Pagina Contatti ───────────────────────────────────────────────────────
  contatti: {
    intro: {
      eyebrow: 'Contatti',
      title:   "Scrivimi.<br/>La prima consulenza è <em>gratuita</em>.",
      meta:    'Rispondo personalmente entro 24 ore. Niente segreteria, niente form passati a uno staff: parli con me.',
    },
    form: {
      goals: [
        { value: 'dimagrimento', label: 'Dimagrimento'            },
        { value: 'massa',        label: 'Aumento massa muscolare' },
        { value: 'recomp',       label: 'Body recomposition'      },
        { value: 'forza',        label: 'Forza / powerlifting'    },
        { value: 'postura',      label: 'Postura / dolori'        },
        { value: 'riab',         label: 'Riabilitazione'          },
        { value: 'altro',        label: 'Altro'                   },
      ],
      errors: {
        name:    'Inserisci il tuo nome',
        email:   'Email non valida',
        consent: 'Necessario per procedere',
      },
      placeholders: {
        name:    'Mario Rossi',
        email:   'mario@email.it',
        phone:   '+39 ___ ___ ____',
        goal:    'Seleziona...',
        message: 'Raccontami qualcosa di te: il tuo punto di partenza, cosa hai già provato, cosa vorresti cambiare...',
      },
      consentText: 'Acconsento al trattamento dei miei dati personali per essere ricontattato. I dati non saranno condivisi con terzi e potranno essere cancellati su richiesta.',
      submitNote:  'Risposta entro 24 ore · Consulenza iniziale gratuita',
    },
    thankYou: {
      pretext:  'Grazie ',
      posttext: '. Ti rispondo entro 24 ore con i prossimi passi e un orario per la consulenza gratuita.',
      reset:    'Invia un altro messaggio',
    },
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    nav:        'Naviga',
    contacts:   'Contatti',
    studio:     'Studio',
    legalLinks: 'Privacy · Cookie · Termini',
  },
};

// ── Dati derivati (calcolati da CONTENT) ──────────────────────────────────
// Opzioni pacchetto per il form contatti — derivate da CONTENT.packs
CONTENT.contatti.form.packOptions = [
  { id: '',        label: 'Non so ancora'  },
  ...CONTENT.packs.map((p) => ({ id: p.id, label: p.fullName })),
  { id: 'singola', label: 'Lezione singola' },
];

// Opzioni ciclo per il form contatti — derivate da CONTENT.cycles
CONTENT.contatti.form.cycleOptions = CONTENT.cycles.map((c) => ({
  id:    c.id,
  label: c.badge ? `${c.label} ${c.badge}` : c.label,
}));
