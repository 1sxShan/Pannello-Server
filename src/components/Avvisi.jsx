export default function Avvisi({ avvisi }) {
  return (
    <section className={`riquadro avvisi ${avvisi.length === 0 ? "avvisi-vuoto" : ""}`}>
      <h2>Avvisi ({avvisi.length})</h2>
      {avvisi.length === 0
        ? <p>Nessun avviso</p>
        : <p>{avvisi.join(" · ")}</p>}
    </section>
  );
}