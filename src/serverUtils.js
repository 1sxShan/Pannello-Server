export const SOGLIE = { attenzione: 70, critico: 90 };

export function statoServer(server) {
  if (!server.online) return "offline";
  if (server.cpu >= SOGLIE.critico) return "critico";
  if (server.cpu >= SOGLIE.attenzione) return "attenzione";
  return "ok";
}

export function contaPerStato(lista, stato) {
  return lista.filter((server) => statoServer(server) === stato).length;
}

export function cpuMedia(lista) {
  const online = lista.filter((server) => server.online);
  if (online.length === 0) return null;
  return online.reduce((somma, server) => somma + server.cpu, 0) / online.length;
}

export function piuLento(lista) {
  const online = lista.filter((server) => server.online);
  if (online.length === 0) return null;
  return online.reduce((lento, server) =>
    lento === null || server.latenza > lento.latenza ? server : lento, null);
}