# Piano contenuti Allenati — SEO, GEO, AEO

Obiettivo: far trovare Allenati a chi cerca su Google (SEO), a chi chiede a ChatGPT, Gemini, Perplexity (GEO) e a chi vuole una risposta secca da assistenti e box "risposta" di Google (AEO).

Le tre cose chiedono lo stesso materiale, scritto in un modo preciso:

- **Una domanda per pagina o per sezione**, con la risposta diretta nelle prime 40-60 parole, poi l'approfondimento.
- **Titoli H2 formulati come domande** ("Quanto costa un gestionale per palestre?").
- **Dati strutturati**: `FAQPage` per le FAQ, `Article` con autore e data per gli articoli, `HowTo` per le guide, `SoftwareApplication` per Allenati.
- **Fatti verificabili e numeri** (9 palestre, 25.000 prenotazioni, 2 ore prima, 7 giorni prima): i modelli citano chi dà cifre precise.
- **Un file `llms.txt`** alla radice che riassume cos'è Allenati e linka le pagine chiave, più `sitemap.xml` aggiornata a ogni build.
- **Link interni** fra FAQ, articoli e landing; ogni articolo chiude con una chiamata alla demo.

Tutto in italiano. Niente confronti con prodotti concorrenti nominati: solo "come scegliere".

---

## Quantità consigliate

| Blocco | Pezzi | Lunghezza | Quando |
|---|---|---|---|
| FAQ hub (pagina unica, 6 categorie) | 48 domande | 60-120 parole l'una | Lancio |
| Pagine pilastro (guide complete) | 5 | 2.000-3.000 parole | Lancio |
| Articoli di approfondimento | 24 | 900-1.500 parole | 12 al lancio, poi 2-4 al mese |
| Pagine per disciplina | 7 | 700-1.000 parole | Lancio |
| Glossario | 24 voci | 50-80 parole l'una | Lancio |
| **Totale primo anno** | **~110 URL** | | ~60 al lancio, il resto in 6 mesi |

Al lancio: FAQ hub + 5 pilastri + 12 articoli + 7 discipline + glossario = **circa 60 pagine**.

---

## 1. FAQ hub (48 domande, 6 categorie)

Pagina `/domande/` con indice, ancore e schema `FAQPage`. Le 8 già sul sito restano nella landing e vengono riprese qui.

**Generali (8)**
1. Cos'è Allenati e per chi è pensata?
2. Quanto costa Allenati? *(serve il modello di prezzo)*
3. Quanto ci vuole a partire?
4. Serve installare qualcosa in palestra?
5. Funziona anche senza app, dal computer?
6. Posso provarla prima di decidere?
7. Allenati va bene per una palestra piccola?
8. Chi gestisce la configurazione iniziale?

**Iscritti e app (8)**
9. I miei iscritti devono creare un account?
10. Cosa vede un iscritto quando apre l'app?
11. Come prenota una lezione?
12. Come funziona la lista d'attesa?
13. Entro quando può disdire senza perdere il credito?
14. Riceve un promemoria prima della lezione?
15. Può iscriversi a più palestre con lo stesso account?
16. Cosa succede se non ha lo smartphone?

**Abbonamenti, crediti e pagamenti (8)**
17. Che differenza c'è fra crediti e abbonamento?
18. Posso vendere pacchetti di crediti?
19. Posso limitare le lezioni a settimana di un piano?
20. Posso togliere un piano dalla vendita senza toglierlo a chi ce l'ha?
21. Devo cambiare il mio sistema di pagamento?
22. Dove arrivano i soldi?
23. Le ricevute le fa l'app?
24. Chi paga in contanti come lo gestisco?

**Prenotazioni e lezioni (8)**
25. Come creo corsi, orari e sale?
26. Cosa succede a una lezione senza iscritti?
27. Posso riaprire una lezione chiusa in automatico?
28. Come vedo chi partecipa a una lezione?
29. L'istruttore riceve un avviso quando qualcuno si iscrive o disdice?
30. Posso prenotare io per un cliente?
31. Posso avere lezioni con posti limitati e altre libere?
32. Come gestisco presenze e assenze?

**Staff, sedi e comunicazione (8)**
33. Posso gestire più sedi?
34. Un iscritto può usare i crediti in tutte le sedi?
35. Cosa può fare un istruttore nell'app?
36. Posso mandare una comunicazione a tutti gli iscritti?
37. Quante comunicazioni posso mandare al giorno?
38. Posso esportare la lista clienti?
39. Come cerco un cliente?
40. Posso cambiare l'email di un cliente che ha perso l'accesso?

**Dati, sicurezza e tecnica (8)**
41. Dove sono i dati dei miei iscritti?
42. Allenati è conforme al GDPR?
43. Le regole valgono anche per chi non aggiorna l'app?
44. Come gestisco i certificati medici?
45. Posso caricare documenti per gli iscritti (regolamento, orari)?
46. Cosa succede se cambio gestore?
47. Posso avere l'app con il mio nome e logo? *(da confermare)*
48. Su quali telefoni funziona?

---

## 2. Pagine pilastro (5)

Guide lunghe, con indice, schema `Article` + `FAQPage` in coda, un'immagine di apertura.

1. **Gestionale per palestre: la guida completa (2026)** — `/guide/gestionale-palestra/`
   Cos'è, cosa deve fare, quanto costa, come si sceglie, errori comuni, checklist.
   Parole chiave: *gestionale palestra, software gestione palestra, app per palestre*.
2. **Prenotazioni delle lezioni: come organizzarle senza perdere clienti** — `/guide/prenotazioni-lezioni/`
   Posti, lista d'attesa, disdette, no-show, promemoria, lezioni vuote.
   *prenotazione corsi palestra, app prenotazione lezioni, lista d'attesa palestra*.
3. **Abbonamenti, crediti e pacchetti: i modelli di prezzo che funzionano** — `/guide/abbonamenti-crediti/`
   Mensile vs crediti vs ibridi, limiti settimanali, rinnovi, scadenze, prezzi di esempio.
   *abbonamento palestra mensile, pacchetto lezioni, gestione abbonamenti palestra*.
4. **Pagamenti online in palestra: Stripe, ricevute e incassi** — `/guide/pagamenti-online-palestra/`
   Come incassare in app, costi delle commissioni, ricevute, pagamenti in sede, riconciliazione.
   *pagamenti online palestra, stripe palestra, ricevuta abbonamento palestra*.
5. **Gestire più sedi con un'unica piattaforma** — `/guide/palestra-multi-sede/`
   Crediti condivisi, istruttori su più sedi, report per sede, comunicazioni.
   *palestra più sedi, catena palestre gestionale, franchising fitness software*.

---

## 3. Articoli di approfondimento (24)

**Primi 12 (lancio)**

1. Come ridurre i no-show nelle lezioni di gruppo (e cosa fa Allenati in automatico)
2. Lezioni vuote: perché chiuderle 2 ore prima e come dirlo all'istruttore
3. Lista d'attesa in palestra: come funziona e perché restituisce il credito
4. Certificato medico in palestra: cosa serve e come tenerlo sotto controllo
5. Promemoria e notifiche push: quali mandare, quante, a che ora
6. Quante lezioni a settimana includere in un abbonamento
7. Piani "nascosti ma attivi": come cambiare listino senza litigare con i vecchi iscritti
8. Come scrivere una comunicazione agli iscritti che viene letta
9. Da Excel all'app: come spostare la lista clienti senza perdere nessuno
10. Cosa vede il titolare: i 6 numeri da guardare ogni lunedì
11. Istruttori: cosa devono vedere e cosa no
12. Come presentare l'app ai tuoi iscritti (testi pronti per WhatsApp e bacheca)

**Successivi 12 (2-4 al mese)**

13. Quanto costa davvero gestire una palestra con fogli Excel
14. Come aumentare gli iscritti di una palestra di quartiere
15. Fidelizzare chi si iscrive a gennaio: 6 mosse
16. Open day in palestra: organizzarlo con prenotazioni online
17. Come gestire le sale: sovrapposizioni e capienza
18. Rinnovi automatici vs rinnovi manuali: pro e contro
19. Cosa fare quando un cliente perde l'accesso all'app
20. GDPR in palestra: i dati che raccogli e come proteggerli
21. Chat con gli iscritti: quando serve e come non farsi sommergere
22. Report mensile della palestra: un modello da copiare
23. Palestra e personal trainer: come far convivere lezioni di gruppo e sessioni 1:1
24. Prezzi di una palestra nel 2026: come si posizionano le altre

---

## 4. Pagine per disciplina (7)

Stessa struttura: problemi tipici della disciplina, come Allenati li risolve, 3 FAQ, demo.

- Box CrossFit e functional training — `/per/crossfit/`
- Studio di pilates e reformer (posti limitatissimi) — `/per/pilates/`
- Centro yoga — `/per/yoga/`
- Palestra di boxe e arti marziali — `/per/boxe-arti-marziali/`
- Scuola di danza — `/per/danza/`
- Centro di personal training — `/per/personal-training/`
- Palestra multisede / catena — `/per/multi-sede/`

---

## 5. Glossario (24 voci)

`/glossario/` con una voce per ancora e schema `DefinedTerm`. Credito · Abbonamento · Piano ibrido · Lista d'attesa · No-show · Disdetta · Termine di disdetta · Lezione chiusa · Posti · Sala · Sessione · Corso · Orario · Istruttore · Titolare · Super istruttore · Multi-sede · Notifica push · Promemoria · Comunicazione · Certificato medico · Ricevuta · Stripe · Riconciliazione.

---

## Struttura tecnica (sito statico)

- Articoli in `content/*.md` con intestazione (titolo, descrizione, data, categoria, domande FAQ).
- `build.js` genera `/blog/<slug>/index.html` con il template del sito, indice `/blog/`, `sitemap.xml`, `rss.xml`, `llms.txt`, schema JSON-LD per pagina, immagine di anteprima.
- Menu: aggiungere "Guide" e "Domande".
- Ogni pagina: risposta breve in testa, H2 a domanda, 3-5 link interni, blocco "Richiedi una demo".

## Cosa mi serve da te

- Il **modello di prezzo** (o la frase da usare: "canone mensile per sede, preventivo su richiesta").
- Conferma su **white label** (app con il nome della palestra: la landing vecchia lo prometteva, nel codice non l'ho visto).
- Un **nome e una foto** come autore degli articoli (meglio una persona vera: conta per Google e per i modelli).
