// ─── Pagine legali (Termini e condizioni, poi Privacy) ──────────────────────
// Testi in HTML. I segnaposto {campo} vengono sostituiti con i valori di LEGAL_DATA:
// un valore null compare in pagina evidenziato in giallo come dato mancante.
// I paragrafi che iniziano con il numero di clausola (es. "2.3 ") lo mostrano in grassetto.
// Una voce array dentro `body` è un elenco puntato.

const LEGAL_DATA = {
  site:       'giulianortu.it',
  name:       CONTENT.brand.fullName,
  taxCode:    null,                        // TODO: codice fiscale
  vat:        null,                        // TODO: P.IVA reale (anche CONTENT.brand.vatId è un segnaposto)
  address:    null,     // da CONTENT: verificare che siano i dati veri
  postalCode: null,
  city:       null,
  email:      CONTENT.contact.email,
  phone:      CONTENT.contact.phone,
  updated:    null,                        // TODO: data di pubblicazione, es. '1 dicembre 2026'
};

const LEGAL_LABELS = {
  taxCode: 'Codice fiscale', vat: 'P.IVA', updated: 'data',
};

const fillLegal = (html) => html.replace(/\{(\w+)\}/g, (_, k) => {
  const v = LEGAL_DATA[k];
  return v == null ? `<mark class="todo">[${LEGAL_LABELS[k] || k}]</mark>` : v;
});

globalThis.window.LEGAL = {

  termini: {
    eyebrow: 'Note legali',
    title:   'Termini e <em>condizioni</em>',
    updated: 'Ultimo aggiornamento: {updated}',
    intro: [
      "Sito web a carattere informativo e promozionale, con modulo di contatto. Non è previsto l'acquisto online dei pacchetti.",
      'Sito web: <strong>{site}</strong> (di seguito, il "Sito").',
      'Gestore del Sito e titolare: <strong>{name}</strong>, C.F. {taxCode}, P.IVA {vat}, con sede in {address}, {postalCode} {city}, email <a href="mailto:{email}">{email}</a> (di seguito, il "Gestore").',
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
          'Il Sito contiene link a servizi esterni (es. Instagram, WhatsApp, Google Maps). Il Gestore non controlla tali servizi, non ne è responsabile e non ne garantisce i contenuti né le politiche privacy.',
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
};

globalThis.window.fillLegal = fillLegal;
