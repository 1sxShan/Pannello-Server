import "./App.css";
import { sistema, servers, avvisi } from "./dati";
import SchedaServer from "./components/SchedaServer";
import Riepilogo from "./components/Riepilogo";
import Avvisi from "./components/Avvisi";

const CERCATO = "db-01";

export default function App() {
  const onlineCount = servers.filter((s) => s.online).length;
  const serverTrovato = servers.find((s) => s.nome === CERCATO);

  return (
    <main className="pannello">
      <header className="intestazione">
        <h1>{sistema.nome}</h1>
        <p>{onlineCount} server online su {servers.length}<br />
          Aggiornato il {sistema.aggiornato}</p>
      </header>

      <Riepilogo servers={servers} />

      <section className="sezione">
        <h2>Server</h2>
        <div className="griglia">
          {servers.map((s) => <SchedaServer key={s.nome} server={s} />)}
        </div>
      </section>

      <div className="colonne">
        <section className="riquadro evidenza">
          <h2>Server cercato: {CERCATO}</h2>
          {serverTrovato
            ? <SchedaServer server={serverTrovato} />
            : <p className="non-trovato">Nessun server si chiama {CERCATO}</p>}
        </section>
        <Avvisi avvisi={avvisi} />
      </div>
    </main>
  );
}
// Risposte alle domande
//
// 1. Con 7 server: la griglia mostra 7 schede (3+3+1 su schermo largo).
//    Con 5 server: mostra 5 schede (3+2 o 2+2+1). Il conteggio "X online su N"
//    e il riepilogo si aggiornano da soli perché leggono servers.length e
//    i dati con filter/map. Con blackout: tutte le schede diventano grigie
//    "Offline", riepilogo a 0 OK/Attenzione/Critici e N Offline, CPU media "-",
//    più lento "-", avvisi "Nessun avviso". Nessun codice da cambiare.
//
// 2. Il flusso unidirezionale dei dati (props): i componenti non leggono i dati
//    da soli, li ricevono come props. Cambiando la sorgente cambia solo cosa
//    gli passi, e i sei componenti si aggiornano da soli senza toccarli.