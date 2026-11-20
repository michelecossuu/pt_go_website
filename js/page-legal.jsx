// Pagina legale generica (Termini e condizioni, Privacy). I testi arrivano da LEGAL (js/legal.js).
// Il numero di clausola a inizio paragrafo ("2.3 ...") viene messo in evidenza.
const legalPara = (html) => fillLegal(html).replace(/^(\d+\.\d+)\s/, '<b class="cl">$1</b> ');

const PageLegal = ({ id }) => {
  const { eyebrow, title, updated, intro, sections } = LEGAL[id];
  return (
    <div className="page" data-screen-label={`Legale — ${id}`}>
      <section className="sec sec-first">
        <div className="wrap">
          <article className="legal">
            <div className="label in d1"><span className="rule"></span>{eyebrow}</div>
            <h1 className="h2 h-page in d2" dangerouslySetInnerHTML={{ __html: title }} />
            <p className="legal-upd in d3" dangerouslySetInnerHTML={{ __html: fillLegal(updated) }} />
            <div className="legal-intro in d3">
              {intro.map((html, i) => <p key={i} dangerouslySetInnerHTML={{ __html: fillLegal(html) }} />)}
            </div>
            {sections.map((s, i) => (
              <section key={i} className="legal-sec">
                <h2><span className="n">{i + 1}.</span>{s.title}</h2>
                {s.body.map((b, j) => Array.isArray(b)
                  ? <ul key={j}>{b.map((li, k) => <li key={k} dangerouslySetInnerHTML={{ __html: fillLegal(li) }} />)}</ul>
                  : <p key={j} dangerouslySetInnerHTML={{ __html: legalPara(b) }} />)}
              </section>
            ))}
          </article>
        </div>
      </section>
    </div>
  );
};

Object.assign(window, { PageLegal });
