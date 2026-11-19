// ─── Contenuto centralizzato del sito ───────────────────────────────────────
// Modificare qui per aggiornare testi, prezzi e dati in tutta l'app.
// Foto stock provvisorie (Pexels)
const px = (id, w = 1400) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;

globalThis.window.CONTENT = {

  // ── Identità del brand ────────────────────────────────────────────────────
  brand: {
    firstName:   'Giuliano',
    lastName:    'Ortu',
    fullName:    'Giuliano Ortu',
    title:       'Personal Trainer',
    tagline:     'Ascolto, metodo, evoluzione.',
    taglineSub:  'Allenamento su misura.',
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
    privacyUrl:   'privacy.html', // TODO: pagina ancora da creare
    termsUrl:     'termini.html', // TODO: pagina ancora da creare
    whatsappUrl:  'https://wa.me/393331234567',
    mapsUrl:      'https://maps.google.com/?q=Via+Di+Triuggio+20+Triuggio',
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
  // Le foto sono provvisorie (stock Pexels): sostituire `src` con le foto vere.
  // `alt` descrive la foto definitiva da scattare.
  home: {
    hero: {
      eyebrow:    'Personal Trainer',
      headline:   ['Ascolto,', 'metodo,', 'evoluzione.'],   // l'ultima riga va in corsivo
      sub:        'Allenamento su misura per chi vuole risultati reali, senza scorciatoie. Al centro ci sei tu, i tuoi obiettivi, un metodo costruito intorno alla tua quotidianità.',
      ctaPrimary: 'Scopri i pacchetti',
      ctaGhost:   'Prenota una consulenza',
      photo:      { src: px(5327466, 2200), alt: 'Giuliano in palestra · orizzontale, soggetto sulla destra' },
      pillars: [
        { icon: 'Route',   lines: ['Percorso', 'strutturato'] },
        { icon: 'Barbell', lines: ['Allenamento', 'su misura'] },
        { icon: 'Chat',    lines: ['Supporto', 'continuo'] },
      ],
    },
    philosophy: {
      eyebrow: 'La mia filosofia',
      title:   'Ascolto prima,<br/>programmo <em>dopo</em>.',
      text:    'Ogni corpo racconta una storia diversa. Il mio lavoro è leggerla bene prima di scrivere un piano che funzioni nella tua vita reale, non solo sulla carta.',
      photo:   { src: px(7203532), alt: 'Ritratto sorridente di Giuliano · verticale' },
      principles: [
        { title: 'La persona prima del programma', desc: 'Obiettivi, tempi e storia fisica guidano ogni scelta.' },
        { title: 'Progressi, non perfezione',      desc: 'Piccoli passi costanti valgono più di sforzi eroici e brevi.' },
        { title: 'Niente scorciatoie',             desc: 'Tecnica, recupero e costanza: risultati che restano.' },
      ],
      cta:       'Chi sono',
    },
    transformations: {
      eyebrow: 'Trasformazioni',
      title:   'Persone vere,<br/>risultati <em>veri</em>.',
      note:    'Recensioni pubblicate con il consenso dei clienti.',
      prev: 'Recensione precedente', next: 'Recensione successiva',
      labels:  { story: 'La storia', improved: 'Cosa è cambiato', quote: 'Com’è stato con Giuliano' },
      // TODO: sostituire con recensioni reali dei clienti
      items: [
        {
          name: 'Marta T.', rating: 5, result: '−11 kg · 6 mesi',
          story:    'Lavoro d’ufficio, poco tempo e diverse ripartenze finite dopo poche settimane.',
          improved: 'Più energia durante la giornata, mal di schiena sparito e un’abitudine all’allenamento che finalmente regge.',
          quote:    'Mi ha ascoltata davvero. Il programma si adattava alle mie settimane, non il contrario.',
        },
        {
          name: 'Michele C.', rating: 5, result: '+5 kg magri · 8 mesi',
          story:    'Mi allenavo da anni senza un piano preciso e senza vedere progressi.',
          improved: 'Carichi aumentati su tutti i fondamentali, tecnica più pulita e una progressione chiara.',
          quote:    'Precisione e costanza: ogni check aveva un motivo, ogni modifica un perché.',
        },
        {
          name: 'Emma T.', rating: 5, result: '−7 kg · 4 mesi',
          story:    'Ripartivo da zero dopo la gravidanza, con poca fiducia e tanta paura di sbagliare.',
          improved: 'Forza ritrovata, postura migliore e la sicurezza di allenarmi da sola in palestra.',
          quote:    'Sempre presente su WhatsApp, mai giudicante. Mi sono sentita seguita passo dopo passo.',
        },
        {
          name: 'Federico D.', rating: 5, result: 'Ricomposizione · 1 anno',
          story:    'Dopo un infortunio alla spalla avevo smesso di allenarmi con continuità.',
          improved: 'Spalla stabile, composizione corporea migliorata e allenamenti senza dolore.',
          quote:    'Metodo serio e tanta pazienza. Mi ha riportato in palestra con la testa giusta.',
        },
      ],
    },
    method: {
      eyebrow: 'Il metodo',
      title:   'Un approccio <em>completo</em>, non un programma standard.',
      meta:    'Ogni piano nasce da una valutazione fisica e da una conversazione onesta. Niente copia-incolla, niente promesse vuote.',
      photo:   { src: px(31618281), alt: 'Giuliano durante un esercizio · es. curl con manubrio, verticale' },
      chip:    { title: 'Consulenza gratuita', sub: 'Il primo passo' },
      steps: [
        { title: 'Valutazione iniziale',     desc: 'Test funzionali, analisi tecnica dell’esercizio e analisi posturale. Si parte dai dati, non dalle sensazioni.' },
        { title: 'Programmazione su misura', desc: 'Schede che si adattano al tuo ritmo, alla tua condizione e ai tuoi obiettivi.' },
        { title: 'Supporto continuo',        desc: 'Non abbiamo appuntamenti fissi: se hai dubbi mi scrivi un messaggio; se hai bisogno di confrontarti, fissiamo un incontro. Non sei solo tra una sessione e l’altra, hai il tuo trainer sempre a portata di mano.' },
      ],
    },
    effort: {
      eyebrow: 'La fatica buona',
      title:   'Quella che ti lascia<br/><em>più forte</em> di prima.',
      text:    'Non le solite schede pre-impostate, ma progressioni strutturate. Ti porto al meglio delle tue potenzialità, con tecnica e recupero.',
      photo:   { src: px(3838705, 2000), alt: 'Momento di fatica a fine serie · orizzontale, luce scura' },
      values:  ['Disciplina', 'Costanza', 'Risultati'],
    },
    packTeaser: {
      eyebrow: 'Pacchetti',
      title:   "Tre percorsi,<br/>ma il tuo è <em>uno solo</em>.",
      meta:    'Dalla scheda mensile al coaching completo. Scegli la profondità del supporto in base al tuo momento.',
      cta:     'Confronta tutti i pacchetti',
      more:    'Scopri dettagli e prezzi',
    },
    roots: {
      caption: ['Piccoli passi,', 'grandi risultati.'],
      photo:   { src: 'assets/capocaccia.jpg', alt: 'Capo Caccia e l\'isola Foradada, Alghero' },
      // Numeri nascosti finché non ci sono dati reali. Formato: { value: '12', unit: '+', label: 'Anni di esperienza' }
      stats: [],
    },
    cta: {
      title:  'Piuttosto che immaginare,<br/><em>prova.</em>',   // l'<em> serve: la freccia lo sottolinea
      button: 'Prenota una consulenza gratuita',
    },
  },

  // ── Pacchetti (dati) ──────────────────────────────────────────────────────
  packs: [
    {
      id:         'essential',
      tier:       '01 · Entry',
      fullName:   'Essential',
      name:       ['Ess', 'ential'],
      tagline:    'Livello base',                             // descrizione breve nel teaser home
      desc:       'La base solida: programmazione, metodo e costanza per partire bene.',
      prices:     { trimestrale: 150, semestrale: 270, annuale: 510 },
    },
    {
      id:         'transformation',
      tier:       '02 · Più scelto',
      fullName:   'Transformation',
      name:       ['Trans', 'formation'],
      tagline:    'La chiave di svolta',
      desc:       'Il percorso più richiesto: supporto, ritmo e adattamenti continui.',
      prices:     { trimestrale: 250, semestrale: 450, annuale: 850 },
      featured:   true,
    },
    {
      id:         'revolution',
      tier:       '03 · Premium',
      fullName:   'Revolution',
      name:       ['Revo', 'lution'],
      tagline:    'Esperienza premium',
      desc:       "L'esperienza completa: revisione 1:1 mensile e priorità totale in agenda.",
      prices:     { trimestrale: 330, semestrale: 594, annuale: 1122 },
      gold:       true,
    },
  ],

  // ── Voci incluse nei pacchetti ────────────────────────────────────────────
  // Elenco unico, dal piano base al più completo. `in` = pacchetti che la includono.
  // `v` = testo specifico per pacchetto (se diverso da `t`).
  // Ogni card mostra le voci incluse + quelle dei piani superiori (barrate).
  features: [
    { t: 'Prima call identificazione obiettivi', in: ['essential', 'transformation', 'revolution'] },
    { t: 'Check settimanali',                    in: ['essential', 'transformation', 'revolution'], v: { essential: 'Check bi-settimanali' } },
    { t: 'Schede aggiornate ogni 6—8 settimane', in: ['essential', 'transformation', 'revolution'] },
    { t: 'Video e spiegazione esercizi',         in: ['essential', 'transformation', 'revolution'] },
    { t: 'Supporto WhatsApp',                    in: ['essential', 'transformation', 'revolution'], v: { essential: 'Supporto WhatsApp (entro 48h)', transformation: 'Supporto WhatsApp (entro 24h)', revolution: 'Supporto WhatsApp prioritario' } },
    { t: 'Revisione esecuzione esercizi',        in: ['transformation', 'revolution'] },
    { t: 'Adattamento scheda periodico',         in: ['transformation', 'revolution'] },
    { t: 'Consigli nutrizionali',                in: ['transformation', 'revolution'] },
    { t: '1:1 mensile di revisione',             in: ['revolution'] },
    { t: 'Priorità totale in agenda',            in: ['revolution'] },
  ],

  // ── Cicli di fatturazione ─────────────────────────────────────────────────
  // I prezzi per ciclo stanno in packs[].prices; `discount` serve solo per i testi.
  cycles: [
    { id: 'annuale',     label: 'Annuale',     months: 12, discount: 0.15, badge: '−15%' },
    { id: 'semestrale',  label: 'Semestrale',  months: 6,  discount: 0.10, badge: '−10%' },
    { id: 'trimestrale', label: 'Trimestrale', months: 3,  discount: 0,    badge: null    },
  ],

  // ── Pagina Pacchetti ──────────────────────────────────────────────────────
  pacchetti: {
    eyebrow: 'I Pacchetti',
    title:   "Tre percorsi.<br/>Il <em>tuo</em>, in fondo, è uno solo.",
    perks:   ['Prima call gratuita', 'Sconti fino a −15%'],
    singleLesson: {
      eyebrow: 'Scheda',
      title:   'Ti preparo la scheda di allenamento personalizzata',
      desc:    'Nessun abbonamento: una scheda costruita sui tuoi obiettivi. Prima call gratuita inclusa.',
      price:   '€40',
    },
    compare: {
      label: 'Cosa è incluso',
      rows: [
        ['Prima call - identificazione obiettivi', '✓',             '✓',           '✓'        ],
        ['Schede personalizzate',                'Ogni 6—8 sett.','Ogni 6—8 sett.','Ogni 6—8 sett.'],
        ['Check andamento',                      'Bi-settimanali','Settimanali',  'Settimanali'],
        ['Video e spiegazione esercizi',         '✓',             '✓',           '✓'        ],
        ['Supporto WhatsApp',                    'Entro 48h',     'Entro 24h',   'Prioritario'],
        ['Revisione esecuzione esercizi',        '—',             '✓',           '✓'        ],
        ['Adattamento scheda periodico',         '—',             '✓',           '✓'        ],
        ['Consigli nutrizionali',                '—',             '✓',           '✓'        ],
        ['1:1 mensile di revisione',             '—',             '—',           '✓'        ],
        ['Priorità totale in agenda',            '—',             '—',           '✓'        ],
      ],
    },
    faq: [
      {
        q: 'Come funzionano gli sconti su semestrale e annuale?',
        a: "Più lungo è il percorso, più scende il prezzo mensile equivalente: il trimestrale è la base, −10% sul semestrale, −15% sull'annuale. Il pagamento avviene in un'unica soluzione al momento dell'attivazione.",
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
        q: 'I consigli nutrizionali sono inclusi in tutti i pacchetti?',
        a: "Sono inclusi dal Transformation in su: consigli generali per sostenere l'allenamento. Non elaboro piani alimentari: per una dieta specifica ti indirizzo a un professionista abilitato (nutrizionista o dietista).",
      },
      {
        q: 'Lavori con principianti?',
        a: 'Sì, e con piacere. Anzi, è uno dei momenti più importanti per impostare bene tutto: tecnica, abitudini, mentalità. Non serve "essere in forma" per iniziare.',
      },
      {
        q: 'Posso avere solo la scheda, senza pacchetto?',
        a: "Certo: ti preparo la scheda di allenamento personalizzata a 40€ una tantum, dopo una prima call gratuita per capire i tuoi obiettivi.",
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
      title:   "Una vita dedicata allo sport,<br/> al movimento e alle <em>persone</em>.",
      meta:    'Personal Trainer Invictus Academy, laureato in Farmacia, con un approccio che mette al centro allenamento e persona.',
    },
    badge: 'Disponibile',
    photo: { src: null, alt: 'Ritratto di Giuliano · verticale 4:5' },
    bio: [
      'Ho sempre fatto sport, e mi ha insegnato i valori della disciplina, del controllo e della crescita personale. Per questo motivo, ho deciso di mettermi in gioco come Personal Trainer per trasmettere agli altri ciò che per me è fondamentale nella vita: la <strong>passione</strong>, la <strong>dedizione</strong> e la <strong>trasformazione consapevole</strong>.',
      'Il mio metodo è semplice: <strong>ascolto prima, programmo dopo</strong>. Ogni corpo racconta una storia diversa, e il mio lavoro è conoscerla e comprenderla per scrivere un piano che funzioni davvero. Credo nei numeri, nelle progressioni misurate e nella <strong>costanza</strong> — quella vera, non quella delle foto motivazionali.',
    ],
    signature: '— Giuliano',
    certifications: {
      eyebrow: 'Formazione',
      title:   'Certificazioni e <em>diplomi</em>.',
      items: [
        { type: 'Qualifica', year: '2026', title: 'Personal Trainer — 3° Livello', org: 'Invictus Academy · conseguita il 6 giugno 2026' },
        { type: 'Laurea',    year: '2020', title: 'Farmacia',                      org: 'Università degli studi di Sassari'                                     },
      ],
    },
    specializations: {
      eyebrow: 'Su cosa lavoriamo',
      title:   'Gli obiettivi che <em>seguo</em>.',
      items: [
        { n: '01', title: 'Body recomposition', desc: 'Costruire massa e perdere grasso allo stesso tempo, in modo sostenibile.'                        },
        { n: '02', title: 'Forza & powerlifting', desc: 'Programmazione per atleti natural e gare federali FIPE/IPF.'                                  },
        { n: '03', title: 'Riabilitazione',      desc: "Ritorno all'attività dopo infortuni a spalla, ginocchio e schiena."                            },
        { n: '04', title: 'Postura',             desc: 'Correzione di squilibri da scrivania e mobilità per chi sta seduto otto ore.'                  },
      ],
    },
    timeline: {
      eyebrow: 'Coaching online',
      title:   'Tu scegli la palestra,<br/><em>io ti seguo</em>.',
      items: [
        { years: '01', place: 'Ci conosciamo',         desc: 'Una consulenza per capire obiettivi, storia sportiva, orari e attrezzatura che hai a disposizione.'  },
        { years: '02', place: 'Scrivo il tuo programma', desc: 'Costruito sulla tua palestra, casa o x ogni tipo di viaggio: lavoriamo con quello che hai, non con quello che manca.' },
        { years: '03', place: 'Ti alleni dove vuoi',   desc: 'Ogni esercizio con video e spiegazione. Nessuno spostamento, nessun orario da incastrare con il mio.'  },
        { years: '04', place: 'Controlliamo e adattiamo', desc: 'Check periodici e supporto su WhatsApp: guardiamo i numeri e aggiustiamo il piano quando serve.'    },
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
      title:   "Scrivimi.<br/>La prima consulenza<br/>è <em>gratuita</em>.",
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
      placeholders: {
        name:    'Mario Rossi',
        email:   'mario@email.it',
        phone:   '+39 ___ ___ ____',
        goal:    'Seleziona...',
        message: 'Raccontami qualcosa di te: il tuo punto di partenza, cosa hai già provato, cosa vorresti cambiare...',
      },
      messageMaxLength: 500,
      // Testo consenso: pre + link privacy + mid + link termini + post
      consent: {
        pre:          'Ho letto e accetto la ',
        privacyLabel: 'privacy policy',
        mid:          ' e i ',
        termsLabel:   'termini di servizio',
        post:         '. Acconsento al trattamento dei miei dati per essere ricontattato: non saranno condivisi con terzi e potranno essere cancellati su richiesta.',
      },
      submitNote:  'Risposta entro 24 ore · Consulenza iniziale gratuita',
      // URL della Web App Google Apps Script (termina con /exec) — vedi apps-script/README.md
      endpoint:    '',
      submitLabel:  'Invia messaggio',
      sendingLabel: 'Invio in corso...',
      // Errore di invio: pre + link WhatsApp + post
      sendError: {
        pre:  'Invio non riuscito. Riprova tra poco oppure scrivimi su ',
        link: 'WhatsApp',
        post: '.',
      },
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
// Voci di ogni pacchetto — derivate da CONTENT.features
// s: true = inclusa, s: false = presente solo nei piani superiori (barrata)
CONTENT.packs.forEach((p) => {
  p.features = CONTENT.features.map((f) => ({
    t: (f.v && f.v[p.id]) || f.t,
    s: f.in.includes(p.id),
  }));
});

// Opzioni pacchetto per il form contatti — derivate da CONTENT.packs
CONTENT.contatti.form.packOptions = [
  { id: '',        label: 'Non so ancora'  },
  ...CONTENT.packs.map((p) => ({ id: p.id, label: p.fullName })),
  { id: 'singola', label: 'Solo scheda (€40)' },
];

// Opzioni ciclo per il form contatti — derivate da CONTENT.cycles
CONTENT.contatti.form.cycleOptions = CONTENT.cycles.map((c) => ({
  id:    c.id,
  label: c.label,
  badge: c.badge,
}));
