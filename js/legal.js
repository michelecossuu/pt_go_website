// ─── Pagine legali (Termini e condizioni, Informativa privacy) ──────────────
// Testi in HTML. I segnaposto {campo} vengono sostituiti con i valori di LEGAL_DATA:
// - null          → dato mancante: in pagina compare "[Etichetta]" evidenziato in giallo
// - tbc('valore') → dato provvisorio: compare il valore, evidenziato in giallo, da confermare
// Dentro gli attributi (es. href="mailto:{email}") va sempre il valore nudo, senza evidenziazione.
// I paragrafi che iniziano con il numero di clausola (es. "2.3 ") lo mostrano in grassetto.
// Una voce array dentro `body` è un elenco puntato.
// Prima della pubblicazione: nessun null e nessun tbc() deve restare in LEGAL_DATA.

const tbc = (value) => ({ value, tbc: true });

const LEGAL_DATA = {
  site:       'giulianortu.it',
  name:       CONTENT.brand.fullName,
  vat:        null,                              // TODO: P.IVA reale (anche CONTENT.brand.vatId è un segnaposto)
  address:    CONTENT.contact.address,           // domicilio fiscale della P.IVA
  postalCode: CONTENT.contact.postalCode,
  city:       CONTENT.contact.city,
  email:      CONTENT.contact.email,
  // TODO: Instagram ancora fittizio
  phone:      CONTENT.contact.phone,
  instagram:  tbc(CONTENT.contact.instagram),
  retention:  '2 mesi',                          // come nell'informativa clienti allegata al contratto
  updated:    null,                              // TODO: data di pubblicazione, es. '1 dicembre 2026'
};

const LEGAL_LABELS = {
  vat: 'P.IVA', address: 'Indirizzo', postalCode: 'CAP', city: 'Città',
  email: 'Email', phone: 'Telefono', instagram: 'Instagram', retention: 'Durata', updated: 'Data',
};

const legalRaw = (k) => {
  const v = LEGAL_DATA[k];
  if (v == null) return '';
  return v.tbc ? v.value : v;
};

const legalText = (k) => {
  const v = LEGAL_DATA[k];
  if (v == null) return `<mark class="todo">[${LEGAL_LABELS[k] || k}]</mark>`;
  if (v.tbc) return `<mark class="todo" title="Da confermare">${v.value}</mark>`;
  return v;
};

const fillLegal = (html) => html
  .replace(/="([^"]*)"/g, (_, attr) => `="${attr.replace(/\{(\w+)\}/g, (_, k) => legalRaw(k))}"`)
  .replace(/\{(\w+)\}/g, (_, k) => legalText(k));

globalThis.window.LEGAL = {

  termini: {
    eyebrow: 'Note legali',
    title:   'Termini e <em>condizioni</em>',
    updated: 'Ultimo aggiornamento: {updated}',
    intro: [
      "Sito web a carattere informativo e promozionale, con modulo di contatto. Non è previsto l'acquisto online dei pacchetti.",
      'Sito web: <strong>{site}</strong> (di seguito, il "Sito").',
      'Gestore del Sito e titolare: <strong>{name}</strong>, P.IVA {vat}, con domicilio fiscale in {address}, {postalCode} {city}, email <a href="mailto:{email}">{email}</a> (di seguito, il "Gestore").',
    ],
    sections: [
      {
        title: 'Accettazione e ambito di applicazione',
        body: [
          '1.1 L\'accesso e la consultazione del Sito comportano l\'accettazione dei presenti Termini e Condizioni ("Termini"). Chi non li accetta è invitato a non utilizzare il Sito.',
          '1.2 I Termini disciplinano solo l\'uso del Sito. I servizi di personal training sono regolati dal contratto individuale sottoscritto tra il Gestore e il cliente, che in caso di contrasto prevale per quanto riguarda i servizi.',
        ],
      },
      {
        title: 'Natura del Sito: contenuti informativi e nessuna vendita online',
        body: [
          '2.1 Il Sito ha finalità esclusivamente informativa e pubblicitaria: presenta il Gestore, i servizi di personal training online e i pacchetti disponibili.',
          "2.2 Il Sito non consente di acquistare i pacchetti né di concludere contratti. La descrizione dei pacchetti, dei servizi e dei prezzi non costituisce offerta al pubblico ai sensi dell'art. 1336 c.c., ma un semplice invito a proporre. Il contratto si conclude solo con la sottoscrizione del contratto individuale, dopo il contatto diretto con il Gestore e alle sole condizioni in esso indicate.",
          '2.3 I prezzi indicati sul Sito sono prezzi finali, comprensivi di ogni imposta eventualmente dovuta, e possono essere modificati in qualsiasi momento, senza preavviso, con effetto solo per i contratti futuri. Il Gestore si riserva di modificare o ritirare pacchetti e promozioni in qualsiasi momento.',
        ],
      },
      {
        title: 'Modulo di contatto',
        body: [
          "3.1 Il modulo di contatto consente di chiedere di essere ricontattati dal Gestore per informazioni sui servizi. L'invio del modulo non obbliga l'utente all'acquisto né il Gestore alla conclusione di alcun contratto.",
          "3.2 L'utente si impegna a fornire dati veritieri, corretti e propri, e a non inserire dati di terzi senza autorizzazione.",
          '3.3 Non inserire nel modulo di contatto dati sulla salute (patologie, infortuni, farmaci e simili), se non strettamente necessario: tali informazioni, se utili, verranno raccolte in un momento successivo e in forma adeguata, con le garanzie previste dall\'<a href="#/privacy">Informativa privacy</a>.',
          '3.4 Il Gestore risponde alle richieste in tempi ragionevoli, senza garanzia di tempi o di riscontro.',
          '3.5 I dati inseriti nel modulo sono trattati secondo l\'<a href="#/privacy">Informativa privacy</a> del Sito, richiamata anche in calce al modulo.',
          '3.6 Il modulo di contatto è riservato ai maggiorenni. Per i minori di 18 anni la richiesta deve essere inviata da un genitore o da chi esercita la responsabilità genitoriale.',
        ],
      },
      {
        title: 'Uso consentito del Sito',
        body: [
          "L'utente si impegna a utilizzare il Sito in modo lecito e corretto. In particolare, è vietato:",
          [
            'tentare di accedere abusivamente al Sito, ai suoi sistemi o a dati altrui;',
            'introdurre virus, codici malevoli o altri elementi dannosi;',
            'sovraccaricare il Sito con richieste automatiche, o inviare spam o richieste fittizie tramite il modulo;',
            'copiare in modo sistematico (scraping) i contenuti del Sito;',
            'utilizzare il Sito per scopi illeciti o per ledere diritti altrui.',
          ],
          "Il Gestore può bloccare o limitare l'accesso in caso di uso illecito o abusivo.",
        ],
      },
      {
        title: 'Proprietà intellettuale',
        body: [
          "5.1 Tutti i contenuti del Sito (testi, grafica, logo, fotografie, video, struttura, descrizioni dei pacchetti, nome e marchi) sono di proprietà del Gestore o utilizzati su licenza e sono protetti dalla legge sul diritto d'autore e sulla proprietà industriale.",
          "5.2 È vietata la riproduzione, copia, diffusione, modifica o uso commerciale, anche parziale, senza autorizzazione scritta del Gestore. Sono consentiti l'uso strettamente personale e non commerciale e la condivisione dei link al Sito.",
          '5.3 Le immagini e le testimonianze dei clienti sono pubblicate solo con il loro consenso scritto espresso per tale finalità e possono essere ritirate su richiesta.',
          '5.4 Le recensioni pubblicate sul Sito provengono esclusivamente da clienti che hanno effettivamente seguito un percorso con il Gestore, il quale verifica prima della pubblicazione che l\'autore sia un proprio cliente. Il Gestore non offre compensi o altri vantaggi in cambio delle recensioni.',
        ],
      },
      {
        title: 'Natura informativa dei contenuti e avvertenze sulla salute',
        body: [
          '6.1 I contenuti del Sito (inclusi eventuali articoli, consigli o esempi di esercizi) hanno carattere generale e informativo e non costituiscono consulenza medica, diagnosi, terapia o prescrizione. Non sostituiscono il parere di un medico o di altro professionista sanitario.',
          "6.2 Chiunque desideri iniziare un'attività fisica è invitato a consultare preventivamente il proprio medico, specialmente in presenza di patologie, infortuni, gravidanza o assunzione di farmaci.",
          '6.3 Il Gestore non garantisce risultati specifici derivanti dalla consultazione dei contenuti del Sito o dall\'utilizzo dei suoi servizi. I risultati variano da persona a persona. Eventuali esempi, testimonianze o immagini "prima/dopo" hanno carattere meramente illustrativo e non costituiscono promessa di risultato.',
          '6.4 Chi esegue autonomamente esercizi o consigli tratti dal Sito lo fa a proprio rischio e sotto la propria responsabilità.',
        ],
      },
      {
        title: 'Limitazione di responsabilità relativa al Sito',
        body: [
          "7.1 Il Gestore si impegna a mantenere il Sito aggiornato e funzionante, ma non garantisce la continuità del servizio, l'assenza di errori, interruzioni o omissioni, né l'aggiornamento costante dei contenuti.",
          "7.2 Nei limiti consentiti dalla legge, il Gestore non risponde di danni derivanti dall'uso o dall'impossibilità di uso del Sito, da interruzioni del servizio, da malfunzionamenti non imputabili al Gestore, da virus o da contenuti di siti terzi raggiungibili tramite link.",
          '7.3 Nulla in questi Termini esclude o limita la responsabilità del Gestore per dolo o colpa grave, né altre responsabilità che non possono essere escluse per legge, anche nei confronti dei consumatori.',
        ],
      },
      {
        title: 'Link a siti di terzi',
        body: [
          'Il Sito contiene link a servizi esterni (es. Instagram, WhatsApp). Il Gestore non controlla tali servizi, non ne è responsabile e non ne garantisce i contenuti né le politiche privacy.',
        ],
      },
      {
        title: 'Privacy e cookie',
        body: [
          '9.1 Il trattamento dei dati personali raccolti tramite il Sito, in particolare tramite il modulo di contatto e la navigazione, è descritto nell\'<a href="#/privacy">Informativa privacy</a> del Sito.',
          '9.2 Il Sito non utilizza cookie, né propri né di terze parti, e non impiega strumenti di analisi o di profilazione. Per questo non viene richiesto alcun consenso tramite banner.',
        ],
      },
      {
        title: 'Modifiche ai Termini e al Sito',
        body: [
          'Il Gestore può modificare in qualsiasi momento i presenti Termini, i contenuti, i servizi e i prezzi del Sito. Le modifiche hanno effetto dalla pubblicazione sul Sito, con indicazione della data di ultimo aggiornamento.',
        ],
      },
      {
        title: 'Legge applicabile e foro competente',
        body: [
          '11.1 I presenti Termini sono regolati dalla legge italiana.',
          "11.2 Per le controversie relative all'uso del Sito con utenti consumatori è competente in via esclusiva il foro del luogo di residenza o domicilio del consumatore (art. 33, comma 2, lett. u, e art. 66-bis del Codice del Consumo). Per gli utenti non consumatori è competente in via esclusiva il Foro di Monza.",
          "11.3 I consumatori residenti nell'Unione europea possono ricorrere agli organismi di risoluzione alternativa delle controversie (ADR), come previsto dalla normativa vigente.",
        ],
      },
      {
        title: 'Contatti',
        body: [
          'Per informazioni, segnalazioni o reclami relativi al Sito: <a href="mailto:{email}">{email}</a>, telefono {phone}.',
        ],
      },
    ],
  },

  privacy: {
    eyebrow: 'Note legali',
    title:   'Informativa <em>privacy</em>',
    updated: 'Ultimo aggiornamento: {updated}',
    intro: [
      'Informativa sul trattamento dei dati personali ai sensi dell\'art. 13 del Regolamento (UE) 2016/679 ("GDPR"), per chi visita il sito <strong>{site}</strong> (il "Sito") o contatta il Titolare tramite il modulo di contatto, email, telefono, WhatsApp o Instagram.',
      'In breve: il Sito non usa cookie né strumenti di tracciamento. I dati inviati con il modulo servono solo a rispondere alla richiesta, non sono usati per pubblicità e non sono ceduti a nessuno.',
    ],
    sections: [
      {
        title: 'Titolare del trattamento',
        body: [
          '1.1 Il titolare del trattamento è <strong>{name}</strong>, P.IVA {vat}, con domicilio fiscale in {address}, {postalCode} {city} (il "Titolare").',
          '1.2 Per qualsiasi domanda sui dati personali e per esercitare i diritti descritti al punto 9: email <a href="mailto:{email}">{email}</a>, telefono {phone}.',
          '1.3 Il Titolare non ha nominato un Responsabile della protezione dei dati (DPO), perché non è obbligato a farlo.',
        ],
      },
      {
        title: 'Dati trattati',
        body: [
          '2.1 <strong>Dati di navigazione.</strong> Il Sito è ospitato su GitHub Pages. Durante la visita i server del fornitore registrano automaticamente alcuni dati tecnici necessari a mostrare le pagine e a proteggere il servizio, come indirizzo IP, data e ora della richiesta, pagina richiesta e tipo di browser. Il Titolare non accede a questi dati e non li usa per identificare i visitatori.',
          '2.2 <strong>Dati inviati con il modulo di contatto.</strong> Nome e cognome, email, telefono (facoltativo), obiettivo principale, pacchetto e periodo di interesse, testo del messaggio e data di invio.',
          '2.3 <strong>Dati inviati tramite email, telefono, WhatsApp o Instagram ({instagram}).</strong> I dati di contatto (indirizzo email, numero di telefono, nome del profilo) e il contenuto dei messaggi.',
          '2.4 <strong>Dati sulla salute.</strong> Il Titolare chiede di non inserire nel modulo o nei primi messaggi informazioni sulla salute (patologie, infortuni, farmaci e simili). Se l\'utente le comunica comunque, sono usate solo per rispondere alla richiesta. Le informazioni sulla salute necessarie per impostare un percorso di allenamento vengono raccolte solo in seguito, con un\'informativa e un consenso specifici.',
          '2.5 <strong>Cookie.</strong> Il Sito non usa cookie, né propri né di terze parti, né altri strumenti di tracciamento, analisi statistica o profilazione. Caratteri, immagini e librerie sono serviti direttamente dal Sito: la navigazione non comporta richieste a server di terze parti. Per questo non viene mostrato alcun banner per il consenso.',
        ],
      },
      {
        title: 'Finalità e basi giuridiche',
        body: [
          '3.1 <strong>Rispondere alle richieste</strong> inviate con il modulo o con gli altri canali di contatto, fornire informazioni sui servizi e organizzare l\'eventuale consulenza gratuita. Base giuridica: misure precontrattuali adottate su richiesta dell\'interessato (art. 6, par. 1, lett. b, GDPR).',
          '3.2 <strong>Dati sulla salute comunicati spontaneamente</strong>, trattati solo per rispondere alla richiesta. Base giuridica: consenso esplicito dell\'interessato (art. 9, par. 2, lett. a, GDPR), revocabile in qualsiasi momento.',
          '3.3 <strong>Sicurezza del Sito e prevenzione dello spam</strong>, inclusi i controlli automatici contro gli invii del modulo da parte di programmi (bot). Base giuridica: legittimo interesse del Titolare (art. 6, par. 1, lett. f, GDPR).',
          '3.4 <strong>Tutela dei diritti del Titolare</strong>, se necessario, in sede giudiziaria o stragiudiziale. Base giuridica: legittimo interesse del Titolare (art. 6, par. 1, lett. f, GDPR).',
          '3.5 I dati non sono usati per newsletter o comunicazioni promozionali, né per profilazione o decisioni automatizzate.',
        ],
      },
      {
        title: 'Natura del conferimento',
        body: [
          'Nome, email e la presa visione di questa informativa sono necessari per inviare il modulo: senza, non è possibile rispondere alla richiesta. Tutti gli altri campi sono facoltativi.',
        ],
      },
      {
        title: 'Modalità del trattamento e sicurezza',
        body: [
          'I dati sono trattati con strumenti elettronici dal Titolare, che adotta misure tecniche e organizzative adeguate a proteggerli: connessione cifrata (HTTPS), accesso agli strumenti protetto da credenziali personali e uso di fornitori affidabili.',
        ],
      },
      {
        title: 'Destinatari dei dati',
        body: [
          '6.1 I dati non sono diffusi né ceduti a terzi per loro finalità. Ne vengono a conoscenza, solo per quanto necessario, i fornitori dei servizi usati per gestire il Sito e le richieste:',
          [
            '<strong>GitHub, Inc.</strong> (Stati Uniti): hosting del Sito tramite GitHub Pages;',
            '<strong>Google</strong> (Google Ireland Limited e Google LLC): ricezione delle richieste inviate con il modulo, archiviazione in un foglio di calcolo Google Fogli ed eventuale notifica via email al Titolare;',
            'il fornitore del servizio di posta elettronica del Titolare, per i messaggi ricevuti via email.',
          ],
          '6.2 Chi contatta il Titolare tramite WhatsApp o Instagram usa servizi di Meta Platforms Ireland Limited, che tratta i dati secondo la propria informativa privacy.',
          '6.3 I dati possono inoltre essere comunicati alle autorità competenti, quando previsto dalla legge.',
        ],
      },
      {
        title: 'Trasferimento dei dati fuori dall\'Unione europea',
        body: [
          'Alcuni fornitori (GitHub e Google) possono trattare i dati anche negli Stati Uniti. Il trasferimento avviene sulla base della decisione di adeguatezza della Commissione europea relativa all\'EU-U.S. Data Privacy Framework, a cui questi fornitori aderiscono, o in mancanza sulla base delle clausole contrattuali standard approvate dalla Commissione (artt. 45 e 46 GDPR).',
        ],
      },
      {
        title: 'Conservazione dei dati',
        body: [
          '8.1 Le richieste di contatto a cui non segue un contratto sono conservate per {retention} dalla richiesta, poi cancellate.',
          '8.2 Se segue un contratto, i dati necessari sono conservati per la durata del rapporto e poi per il tempo richiesto dagli obblighi di legge (ad esempio 10 anni per i documenti contabili e fiscali), come indicato nell\'informativa consegnata con il contratto.',
          '8.3 I dati sulla salute comunicati spontaneamente e non necessari sono cancellati appena possibile.',
          '8.4 I dati di navigazione sono conservati dal fornitore di hosting per il tempo necessario a finalità tecniche e di sicurezza, secondo le sue politiche.',
        ],
      },
      {
        title: 'Diritti dell\'interessato',
        body: [
          'In qualsiasi momento, scrivendo a <a href="mailto:{email}">{email}</a>, l\'interessato può:',
          [
            'accedere ai propri dati e riceverne copia (art. 15 GDPR);',
            'chiederne la rettifica, se inesatti o incompleti (art. 16);',
            'chiederne la cancellazione (art. 17);',
            'chiedere la limitazione del trattamento (art. 18);',
            'ricevere i dati forniti in un formato leggibile e trasferirli a un altro titolare (art. 20);',
            'opporsi al trattamento basato sul legittimo interesse (art. 21);',
            'revocare il consenso in qualsiasi momento, senza effetto sulla liceità del trattamento svolto prima della revoca (art. 7, par. 3).',
          ],
          'Il Titolare risponde senza ritardo e comunque entro un mese dalla richiesta, termine prorogabile di due mesi nei casi più complessi (art. 12 GDPR).',
        ],
      },
      {
        title: 'Reclamo all\'autorità di controllo',
        body: [
          'Chi ritiene che il trattamento dei propri dati violi il GDPR può proporre reclamo al Garante per la protezione dei dati personali (Piazza Venezia 11, 00187 Roma, <a href="https://www.garanteprivacy.it" target="_blank" rel="noreferrer">www.garanteprivacy.it</a>), o all\'autorità di controllo dello Stato UE in cui risiede o lavora, oppure rivolgersi all\'autorità giudiziaria.',
        ],
      },
      {
        title: 'Minori',
        body: [
          'Il modulo di contatto è riservato ai maggiorenni (vedi <a href="#/termini">Termini e condizioni</a>, punto 3.6). Il Titolare non raccoglie consapevolmente dati di minori di 18 anni: se ne viene a conoscenza, li cancella.',
        ],
      },
      {
        title: 'Link a siti di terzi',
        body: [
          'Il Sito contiene link a servizi esterni (Instagram, WhatsApp). Aprendoli si lascia il Sito: il trattamento dei dati è regolato dalle informative di quei servizi, di cui il Titolare non è responsabile.',
        ],
      },
      {
        title: 'Modifiche all\'informativa',
        body: [
          'Il Titolare può aggiornare questa informativa, ad esempio per cambiamenti normativi o dei servizi usati. La versione in vigore è sempre pubblicata in questa pagina, con la data di ultimo aggiornamento.',
        ],
      },
    ],
  },
};

globalThis.window.fillLegal = fillLegal;
