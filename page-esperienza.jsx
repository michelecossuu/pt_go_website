// Esperienza & Formazione page
const PageEsperienza = ({ go }) => {
  return (
    <div className="page" data-screen-label="Esperienza">
      {/* Page intro */}
      <section className="section" style={{paddingBottom: 'clamp(40px, 6vw, 80px)'}}>
        <SectionHeader
          eyebrow="Chi sono"
          title="Dodici anni di palestra,<br/>palco e <em>persone</em>."
          meta="Personal Trainer certificato, formato in scienze motorie e specializzato in ricomposizione corporea e riabilitazione funzionale."
        />
        <div className="bio">
          <div className="bio-portrait">
            <div className="badge"><span className="dot"></span>Disponibile · Monza & Brianza</div>
          </div>
          <div className="bio-body">
            <p>
              Ho iniziato ad allenare a vent'anni in una piccola palestra di quartiere.
              Dodici anni dopo, ho seguito oltre trecento persone — dall'impiegato che voleva
              tornare a giocare a calcetto al bodybuilder pronto per la sua prima gara.
            </p>
            <p>
              Il mio metodo è semplice: <strong style={{color: 'var(--text)'}}>ascolto prima, programmo dopo</strong>.
              Ogni corpo racconta una storia diversa, e il mio lavoro è leggerla bene
              prima di scrivere un piano che funzioni davvero. Credo nei numeri,
              nelle progressioni misurate e nella costanza — quella vera, non quella delle foto motivazionali.
            </p>
            <div className="signature">— Giuliano</div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section" style={{paddingTop: 0}}>
        <SectionHeader
          eyebrow="Formazione"
          title="Certificazioni e <em>diplomi</em>."
        />
        <div className="creds">
          <div className="cred">
            <div className="ico"><Icons.Cap /></div>
            <div>
              <div className="yr">2014 · Laurea Magistrale</div>
              <h4>Scienze e Tecniche dello Sport</h4>
              <p className="org">Università degli Studi di Alghero · 110 / 110 con lode</p>
            </div>
          </div>
          <div className="cred">
            <div className="ico"><Icons.Award /></div>
            <div>
              <div className="yr">2015</div>
              <h4>NSCA Certified Strength &amp; Conditioning Specialist</h4>
              <p className="org">National Strength and Conditioning Association · USA</p>
            </div>
          </div>
          <div className="cred">
            <div className="ico"><Icons.Award /></div>
            <div>
              <div className="yr">2017</div>
              <h4>FIPE — Istruttore di Powerlifting Livello 2</h4>
              <p className="org">Federazione Italiana Pesistica e Cultura Fisica</p>
            </div>
          </div>
          <div className="cred">
            <div className="ico"><Icons.Award /></div>
            <div>
              <div className="yr">2019</div>
              <h4>Functional Movement Screen — Livello 2</h4>
              <p className="org">FMS Functional Movement Systems</p>
            </div>
          </div>
          <div className="cred">
            <div className="ico"><Icons.Cap /></div>
            <div>
              <div className="yr">2021 · Master</div>
              <h4>Nutrizione Applicata allo Sport</h4>
              <p className="org">Scuola Italiana di Medicina dello Sport · Milano</p>
            </div>
          </div>
          <div className="cred">
            <div className="ico"><Icons.Award /></div>
            <div>
              <div className="yr">2023</div>
              <h4>Postural Rehab Specialist</h4>
              <p className="org">ATS — Academy of Therapeutic Sports</p>
            </div>
          </div>
        </div>
      </section>

      {/* SPECIALIZATIONS */}
      <section className="section" style={{paddingTop: 0}}>
        <SectionHeader
          eyebrow="Specializzazioni"
          title="Dove sono <em>più forte</em>."
        />
        <div className="specs">
          <div className="spec">
            <div className="n">01</div>
            <h5>Body recomposition</h5>
            <p>Costruire massa e perdere grasso allo stesso tempo, in modo sostenibile.</p>
          </div>
          <div className="spec">
            <div className="n">02</div>
            <h5>Forza &amp; powerlifting</h5>
            <p>Programmazione per atleti natural e gare federali FIPE/IPF.</p>
          </div>
          <div className="spec">
            <div className="n">03</div>
            <h5>Riabilitazione</h5>
            <p>Ritorno all'attività dopo infortuni a spalla, ginocchio e schiena.</p>
          </div>
          <div className="spec">
            <div className="n">04</div>
            <h5>Postura</h5>
            <p>Correzione di squilibri da scrivania e mobilità per chi sta seduto otto ore.</p>
          </div>
        </div>
      </section>

      {/* CAREER TIMELINE */}
      <section className="section" style={{paddingTop: 0}}>
        <SectionHeader
          eyebrow="Percorso"
          title="Dove ho <em>allenato</em>."
        />
        <div className="timeline">
          <div className="tl-item">
            <div className="yr">2014 — 2016</div>
            <h4>Body &amp; Soul Fitness Center</h4>
            <p>Trainer di sala e responsabile dei corsi di forza. Primo contatto con la programmazione per atleti agonisti.</p>
          </div>
          <div className="tl-item">
            <div className="yr">2016 — 2020</div>
            <h4>Sardinia Strength Lab</h4>
            <p>Co-fondatore di uno spazio dedicato a forza e powerlifting. Preparazione di sei atleti per gare nazionali FIPE.</p>
          </div>
          <div className="tl-item">
            <div className="yr">2020 — 2023</div>
            <h4>Coach online — Stagione pandemia</h4>
            <p>Costruito un programma di coaching da remoto per 80+ clienti in tutta Italia. Sviluppo del metodo personale.</p>
          </div>
          <div className="tl-item">
            <div className="yr">2023 — Oggi</div>
            <h4>Studio Privato · Monza & Brianza</h4>
            <p>Spazio personale dedicato 1-to-1, con valutazione funzionale, area pesi e nutrizione integrata.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{paddingTop: 0}}>
        <div className="cta-banner">
          <div className="cta-banner-inner">
            <h3 className="display">Fissiamo un incontro,<br/>la prima volta è <em>offerta da me</em>.</h3>
            <button className="btn btn-primary" onClick={() => go('contatti')}>
              Prenota la consulenza <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

window.PageEsperienza = PageEsperienza;
