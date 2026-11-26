Risposte alle domande

1. `online` è nei dati importati da `dati.js`, condivisi dall'app; la scheda riceve una copia tramite props e non dovrebbe modificarli direttamente. Lo cambierebbe la logica di stato (in React, tramite `useState` e una funzione di aggiornamento). Per riavviare davvero serve anche un backend/API che esegua l'azione e aggiorni lo stato.
2. Entrambe le parti leggono la stessa lista `servers` e usano la stessa funzione `statoServer`, quindi applicano le stesse soglie agli stessi dati.
3. `BadgeStato` riceve solo `stato`: dipende solo dal dato che mostra, è più semplice da riusare e non deve conoscere l'intero server.
