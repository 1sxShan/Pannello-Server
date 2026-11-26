import { contaPerStato, cpuMedia, piuLento } from "../serverUtils";

export default function Riepilogo({ servers }) {
  const ok = contaPerStato(servers, "ok");
  const attenzione = contaPerStato(servers, "attenzione");
  const critici = contaPerStato(servers, "critico");
  const offline = contaPerStato(servers, "offline");
  const mediaCpu = cpuMedia(servers);
  const lento = piuLento(servers);

  return (
    <section className="riepilogo">
      <div className="casella"><span className="numero">{ok}</span><span className="etichetta">OK</span></div>
      <div className="casella"><span className="numero">{attenzione}</span><span className="etichetta">Attenzione</span></div>
      <div className="casella"><span className="numero">{critici}</span><span className="etichetta">Critici</span></div>
      <div className="casella"><span className="numero">{offline}</span><span className="etichetta">Offline</span></div>
      <div className="casella"><span className="numero">{mediaCpu === null ? "-" : `${mediaCpu.toFixed(1)}%`}</span><span className="etichetta">CPU media (server online)</span></div>
      <div className="casella"><span className="numero">{lento ? `${lento.latenza} ms` : "-"}</span><span className="etichetta">{lento ? `Piu lento: ${lento.nome}` : "Piu lento: nessuno"}</span></div>
    </section>
  );
}
