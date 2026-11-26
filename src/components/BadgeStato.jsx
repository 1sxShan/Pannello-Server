export default function BadgeStato({ stato }) {
  const testo =
    stato === "offline" ? "Offline" :
    stato === "critico" ? "Critico" :
    stato === "attenzione" ? "Attenzione" : "OK";

  return <span className={`badge badge-${stato}`}>{testo}</span>;
}
