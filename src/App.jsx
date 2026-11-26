import "./App.css";
import { sistema, servers, avvisi } from "./dati";

const SOGLIE = {
  attenzione: 70,
  critico: 90,
};

function statoServer(server) {
  if (!server.online) return "offline";
  if (server.cpu >= SOGLIE.critico) return "critico";
  if (server.cpu >= SOGLIE.attenzione) return "attenzione";
  return "ok";
}

function contaPerStato(lista, stato) {
  return lista.filter((server) => statoServer(server) === stato).length;
}

function cpuMedia(lista) {
  const online = lista.filter((server) => server.online);
  if (online.length === 0) return null;
  const totale = online.reduce((somma, server) => somma + server.cpu, 0);
  return totale / online.length;
}

function piuLento(lista) {
  const online = lista.filter((server) => server.online);
  if (online.length === 0) return null;
  return online.reduce((lento, server) =>
    lento === null || server.latenza > lento.latenza ? server : lento, null);
}

function BadgeStato({ stato }) {
  const testo =
    stato === "offline" ? "Offline" :
    stato === "critico" ? "Critico" :
    stato === "attenzione" ? "Attenzione" : "OK";

  return <span className={`badge badge-${stato}`}>{testo}</span>;
}

function SchedaServer({ server }) {
  const stato = statoServer(server);
  const { nome, ruolo, sede, ip, cpu, latenza, servizi, manutenzione } = server;

  return (
    <article className={`scheda scheda-${stato}`}>
      <h3>{nome}<BadgeStato stato={stato} /></h3>
      <p className="ruolo">{ruolo} - {sede} - {ip}</p>
      <p>{cpu === null ? "CPU: -" : `CPU: ${cpu}%`}</p>
      <p>{latenza === null ? "Latenza: -" : `Latenza: ${latenza} ms`}</p>
      <p>{servizi.length > 0 ? `Servizi: ${servizi.join(", ")}` : "Servizi: nessuno"}</p>
      <p>{manutenzione
        ? `Manutenzione: ${manutenzione.data}, ${manutenzione.motivo}`
        : "Manutenzione: nessuna in programma"}</p>
    </article>
  );
}

export default function App() {
  const onlineCount = servers.filter((server) => server.online).length;
  const ok = contaPerStato(servers, "ok");
  const attenzione = contaPerStato(servers, "attenzione");
  const critici = contaPerStato(servers, "critico");
  const offline = contaPerStato(servers, "offline");
  const mediaCpu = cpuMedia(servers);
  const lento = piuLento(servers);
  const cercato = "db-01";
  const serverTrovato = servers.find((server) => server.nome === cercato);

  return (
    <main className="pannello">
      <header className="intestazione">
        <h1>{sistema.nome}</h1>
        <p>{onlineCount} server online su {servers.length}<br />
          Aggiornato il {sistema.aggiornato}</p>
      </header>

      <section className="riepilogo">
        <div className="casella"><span className="numero">{ok}</span><span className="etichetta">OK</span></div>
        <div className="casella"><span className="numero">{attenzione}</span><span className="etichetta">Attenzione</span></div>
        <div className="casella"><span className="numero">{critici}</span><span className="etichetta">Critici</span></div>
        <div className="casella"><span className="numero">{offline}</span><span className="etichetta">Offline</span></div>
        <div className="casella"><span className="numero">{mediaCpu === null ? "-" : `${mediaCpu.toFixed(1)}%`}</span><span className="etichetta">CPU media (server online)</span></div>
        <div className="casella"><span className="numero">{lento ? `${lento.latenza} ms` : "-"}</span><span className="etichetta">{lento ? `Piu lento: ${lento.nome}` : "Piu lento: nessuno"}</span></div>
      </section>

      <section className="sezione">
        <h2>Server</h2>
        <div className="griglia">
          {servers.map((server) => <SchedaServer key={server.nome} server={server} />)}
        </div>
      </section>

      <div className="colonne">
        <section className="riquadro evidenza">
          <h2>Server cercato: {cercato}</h2>
          {serverTrovato
            ? <SchedaServer server={serverTrovato} />
            : <p className="non-trovato">Nessun server si chiama {cercato}</p>}
        </section>

        <section className={`riquadro avvisi ${avvisi.length === 0 ? "avvisi-vuoto" : ""}`}>
          <h2>Avvisi ({avvisi.length})</h2>
          {avvisi.length === 0
            ? <p>Nessun avviso</p>
            : <p>{avvisi.join(" · ")}</p>}
        </section>
      </div>
    </main>
  );
}
