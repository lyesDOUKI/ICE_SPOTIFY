const express = require('express');
const multer = require('multer');
const path = require('path');
const http = require('http')
const traiterChanson = require('./ice/ice-upload');
const loadMusicsByStyle = require('./ice/ice-loadMusics');
const updateMusic = require('./ice/ice-updateMusic');
const deleteMusic = require('./ice/ice-deleteMusic');
const readMusic = require('./ice/ice-readMusic');
const { Server } = require("socket.io");
const cors = require('cors');
const app = express();
const PORT = 3000;
const server = http.createServer(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const io = new Server(server, {
    cors: {
      origin: "http://localhost:4200",
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }
  });
io.on('connection', (socket) => {
    console.log('Un client s\'est connecté');
});
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

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Autoriser les requêtes depuis Angular (remplacer localhost:4200 par votre domaine Angular si nécessaire)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gérer l'upload de fichiers
app.post('/upload', upload.single('file'), async (req, res) => {
    const nomChanson = req.file.originalname;
    const musicStyle = req.body.musicStyle;
    console.log("style de musique: ", musicStyle);
    try {
        await traiterChanson(nomChanson, musicStyle);
        res.status(200).json({ message: 'Fichier reçu avec succès', status : 200 }); // Renvoyer une réponse JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'upload du fichier", status : 500 }); // Renvoyer une réponse JSON
    }
});
//récuperer la listes des musics styles
app.get('/musics/:style', async (req, res) => {
    const style = req.params.style;
    console.log("style de musique: ", style);
    const musics = await loadMusicsByStyle(style);
    console.log("musics: ", musics);
    res.status(200).json(musics);
});
//update le nom de la chanson 
app.put('/music', (req, res) => {
    const oldName = req.body.oldName;
    const newName = req.body.newName;
    const style = req.body.style;
    console.log("oldName: ", oldName);
    console.log("newName: ", newName);
    console.log("style: ", style);
    try {
        updateMusic(oldName, newName, style);
        res.status(200).json({ message: 'Fichier modifié avec succès', status : 200 }); // Renvoyer une réponse JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la modifications du fichier", status : 500 }); // Renvoyer une réponse JSON
    }
});

app.delete('/music/:music/:style', (req, res) => {
    const music = req.params.music;
    const style = req.params.style;
    try {
        deleteMusic(music, style);
        res.status(200).json({ message: 'Fichier supprimer', status : 200 }); // Renvoyer une réponse JSON
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la suppression", status : 500 }); // Renvoyer une réponse JSON
    }
});
app.get('/ecouter/:music/:style', async (req, res) => {
    const musicName = req.params.music;
    const musicStyle = req.params.style;
    const url = await readMusic(musicName, musicStyle);
    res.set('Content-Type', 'audio/mpeg');
    return res.status(200).json(url);
});
io.on('connection', (socket) => {
    console.log('Un client s\'est connecté');
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});