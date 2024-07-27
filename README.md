# Test Antonino Cicala
Questo progetto è un'applicazione web che permette di caricare file di testo locali o di fornire URL di file di testo per analizzarli e ottenere:
- il numero totale di parole nel file
- il numero di lettere nel file
- il numero di spazi nel file
- le parole che si ripetono più di 10 volte e indicare il numero di volte in cui si ripetono.

Il progetto utilizza il pattern di design Facade per gestire la logica di elaborazione dei file.

## Struttura del Progetto

- `index.js`: Il file principale che configura e avvia il server Express.
- `public/index.html`: Il file HTML che fornisce l'interfaccia utente.
- `public/app.js`: Il file JavaScript che gestisce la logica del front-end.
- `modules/fileFacade.js`: Il file che implementa la classe FileFacade per l'elaborazione dei file.
- `modules/fileReader.js`: Il file che implementa la classe FileReader per le funzioni di lettura dei file.
- `modules/textInfo.js`: Il file che implementa la classe TextInfo per le funzioni di analisi della stringa.

## Requisiti
- Node.js
- npm

## Installazione
1. Clonare il repository:
    ```sh
    git clone https://github.com/AntoCic/AntoninoCicala_Test_tecnico.git
    ```
2. Navigare nella directory del progetto:
    ```sh
    cd AntoninoCicala_Test_tecnico
    ```
3. Installare le dipendenze:
    ```sh
    npm i
    ```

## Avvio del Server
Per avviare il server, eseguire il comando:
> ATTENZIONE il server inizializzato nella porta 3000
```sh
npm start
```

## Info importanti sui file
### index.html
All'interno dell'elemento con ID `result-box` vengono creati altri elementi contenenti il risultato della richiesta al submit. Inoltre, viene generato un elemento contenente il testo del file, posizionato subito dopo `result-box`.
```sh
<ul class="list-group" id="results-box">
    <!-- risultato -->
</ul>
<!-- testo del file -->
```
---
### app.js
La funzione principale che gestisce la logica del submit controlla quale tipo di richiesta effettuare in base al valore di `inputFile`, che corrisponde all'input con ID `input-file`. Se `inputFile` contiene un file, verrà inviata una richiesta per elaborarlo; se è una stringa vuota, verrà utilizzato il link scritto nell'input `inputUrl`.
```sh
form.addEventListener('submit', (event) => {
    <!-- ... -->
    if (inputFile.value !== '') { 
        <!-- ... -->
    } else { 
        <!-- ... -->
    }
});
```

Le funzioni di `fetch` gestiscono due casi distinti: 
- nel caso di un caricamento locale, viene inviato l'intero form per essere elaborato dal server;
- nel caso di un caricamento esterno da un URL web, viene inviato solo l'URL, incapsulato in un oggetto con una variabile denominata `fileUrl`.

---
### index.js
I moduli utilizzati sono:
- `Express` per il funzionamento del server
- `Multer` per il caricamento del file locale
- il mio modulo `FileFacade` per l'elaborazione dei dati.

Le due chiamate al server, oltre a quella per la visualizzazione della homepage, sono:
- `/uploadfile` per elaborare un file locale 
- `/urlfile` per elaborare un URL esterno. 

Per l'elaborazione, utilizzo i metodi di `processPath` e `processUrl` ottenute dall'oggetto `fileProcess` creato utilizzando `FileFacade`.

---
### fileFacade.js
La mia classe di facciata, `FileFacade`, estende due classi di utility che trasformano il path locale o l'URL in una stringa e successivamente la analizzano per ottenere un oggetto contenente il risultato dell'analisi e il testo completo.

---
### fileReader.js
Utilizza due moduli built-in: `fs` per la lettura e l'eliminazione dei file, e `path` per ottenere i percorsi.
I due metodi della classe sono `readPath` e `readUrl`. 

- `readPath` legge il contenuto di un file locale, elimina il file e restituisce la stringa con il suo contenuto.
- `readUrl` effettua una fetch per ottenere il testo da un URL e lo restituisce in formato stringa.

---
### textInfo.js
I metodi contenuti nella classe `TextInfo` sono:

- `numWords`: Dato una stringa, restituisce il numero di parole contenute.
- `numLetters`: Dato una stringa, restituisce il numero di lettere contenute.
- `numWhiteSpaces`: Dato una stringa, restituisce il numero di spazi vuoti.
- `numRecurringWords`: Dato una stringa e una quantità, restituisce il numero di parole che ricorrono più volte della quantità indicata. Se la quantità non è indicata, il valore predefinito è 10.



