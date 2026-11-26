import { statoServer } from "../serverUtils";
import BadgeStato from "./BadgeStato";

export default function SchedaServer({ server }) {
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
