const express = require('express');
const multer = require('multer');
const path = require('path');
const http = require('http')
const fs = require("fs");
const traiterChanson = require('./ice/ice-upload');
const loadMusicsByStyle = require('./ice/ice-loadMusics');
const loadMusicsByQuey = require('./ice/ice-loadMusicByQuery');
const updateMusic = require('./ice/ice-updateMusic');
const deleteMusic = require('./ice/ice-deleteMusic');
const readMusic = require('./ice/ice-readMusic');
const stopMusic = require('./ice/ice-stopMusic');
const loadProxyAndEndPoint = require('./ice/ice-loadProxyAndEndPoints');
const { Server } = require("socket.io");
const cors = require('cors');
const https = require("https");
const options = {
    key: fs.readFileSync("./security/keyNode.key"),
    cert: fs.readFileSync("./security/certificatNode.crt"),
};
const app = express();
const httpApp = https.createServer(options, app);
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
    res.setHeader('Access-Control-Allow-Origin', '*'); // Autoriser les requêtes depuis Angular (remplacer localhost:4200 par votre domaine Angular si nécessaire)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const core = require('./core/traitementMP3');
// Gérer l'upload de fichiers
app.post('/upload', upload.single('file'), async (req, res) => {
    const nomChanson = req.file.originalname;
    const musicStyle = req.body.musicStyle;
    const titre = req.body.titre;
    const auteur = req.body.auteur;
    const annee = req.body.annee;
    const proxy = loadProxyAndEndPoint.goodProxy(musicStyle);
    const endPoint = loadProxyAndEndPoint.goodEndPoints(proxy);
    console.log("style de musique: ", musicStyle);
    try {
        await traiterChanson(nomChanson, titre, auteur, annee, musicStyle, proxy, endPoint);
        core.deleteAllFiles();
        res.status(200).json({ message: 'Fichier reçu avec succès', status : 200 }); // Renvoyer une réponse JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de l'upload du fichier", status : 500 }); // Renvoyer une réponse JSON
    }
});
//récuperer la listes des musics styles
app.get('/musics/:style', async (req, res) => {
    const style = req.params.style;
    const proxy = loadProxyAndEndPoint.goodProxy(style);
    const endPoint = loadProxyAndEndPoint.goodEndPoints(proxy);
    console.log("style de musique: ", style);
    const musics = await loadMusicsByStyle(style, proxy, endPoint);
    console.log("musics: ", musics);
    res.status(200).json(musics);
});
//update le nom de la chanson 
app.put('/music', (req, res) => {
    const oldName = req.body.oldName;
    const titre = req.body.titre;
    const auteur = req.body.auteur;
    const annee = req.body.annee;
    const style = req.body.style;
    console.log("oldName: ", oldName);
    console.log("titre: ", titre);
    console.log("style: ", style);
    console.log("annee: ", annee);
    const proxy = loadProxyAndEndPoint.goodProxy(style);
    const endPoint = loadProxyAndEndPoint.goodEndPoints(proxy);
    try {
        updateMusic(oldName, titre, auteur, annee, style, proxy, endPoint);
        res.status(200).json({ message: 'Fichier modifié avec succès', status : 200 }); // Renvoyer une réponse JSON
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erreur lors de la modifications du fichier", status : 500 }); // Renvoyer une réponse JSON
    }
});

app.delete('/music/:music/:style', (req, res) => {
    const music = req.params.music;
    const style = req.params.style;
    const proxy = loadProxyAndEndPoint.goodProxy(style);
    const endPoint = loadProxyAndEndPoint.goodEndPoints(proxy);
    try {
        deleteMusic(music, style, proxy, endPoint);
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
    const proxy = loadProxyAndEndPoint.goodProxy(musicStyle);
    const endPoint = loadProxyAndEndPoint.goodEndPoints(proxy);
    const url = await readMusic(musicName, musicStyle, proxy, endPoint);
    res.set('Content-Type', 'audio/mpeg');
    return res.status(200).json(url);
});
app.post('/stop', async (req, res) => {
    console.log("dans la route stop");
    const urlToStop = req.body.audioUrl;
    const style = req.body.style;
    const proxy = loadProxyAndEndPoint.goodProxy(style);
    const endPoint = loadProxyAndEndPoint.goodEndPoints(proxy);
    console.log("stop music on url : ", urlToStop);
    const result = await stopMusic(urlToStop, proxy, endPoint);
    return res.status(200).json({statut : result});
});
app.get('/search/:chose/:query', async (req, res) => {
    const choix = req.params.chose;
    const query = req.params.query;
    console.log("choix: ", choix);
    console.log("query: ", query);
    const musics = await loadMusicsByQuey(choix, query);
    console.log("musics: ", musics);
    res.status(200).json(musics);
});
io.on('connection', (socket) => {
    console.log('Un client s\'est connecté');
});

httpApp.listen(PORT, () => {
    console.log("Le serveur est lancé sur le port : ", PORT);
});