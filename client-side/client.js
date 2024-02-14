const express = require('express');
const multer = require('multer');
const path = require('path');
const traiterChanson = require('./ice/ice-upload');
const app = express();
const PORT = 3000;

// Configurer le stockage pour les fichiers MP3
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage });


app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gérer l'upload de fichiers
app.post('/upload', upload.single('mp3file'), async (req, res) => {
    const nomChanson = req.file.originalname;
    await traiterChanson(nomChanson);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});