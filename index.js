import express from 'express';
import multer from 'multer';
import FileFacade from './modules/fileFacade.js'

const app = express();
app.use(express.json())
app.use(express.static('public'))

// Configuring multer for file upload
const upload = multer({ dest: 'uploads/' });
// Initializing fileProcessor with the class FileFacade
const fileProcessor = new FileFacade();

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname + '/public' })
});

// Route to manage file upload
app.post('/uploadfile', upload.single('filetxt'), async (req, res) => {
    // process local file path
    const result = await fileProcessor.processPath(req.file.path);
    if (result) {
        // send response
        res.status(200).send(result);
    } else {
        res.status(400).send('Errore: 400 Bad Request');
    }
});

// Route to manage web url file
app.post('/urlfile', async (req, res) => {
    const { fileUrl } = req.body
    if (fileUrl) {
        // process fileUrl
        const result = await fileProcessor.processUrl(fileUrl);
        if (result) {
            // send response
            res.status(200).send(result);
        } else {
            res.status(400).send('Errore: 400 Bad Request');
        }
    } else {
        res.status(500).send({ error: 'error' });
    }
});

// Server startup
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server di test in esecuzione sulla porta ${PORT}`);
    console.log(`Link --> http://localhost:${PORT}`);
});