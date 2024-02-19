import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  showDisplayMusics: boolean = false; // Variable pour contrôler l'affichage du composant app-display-musics

  private audioContext: AudioContext | undefined;
  private audioBuffer: AudioBuffer | undefined;
  //list of music, à passer en input du composant app-display-musics
  musicList: string[] = [
  ];
  styleMusic = ''; // Style de musique à afficher
  constructor() { }
  startAudioPlayback(): void {
    const socket = io('http://localhost:3000');
    socket.on('audioStream', (data: ArrayBuffer) => {
      //console.log("Données binaires reçues:", data);

      // Convertir ArrayBuffer en Uint8Array
      const uint8Array = new Uint8Array(data);

      // Appeler la fonction de lecture audio avec Uint8Array
      this.playAudio(uint8Array);
    });
  }

  private playAudio(byteArray: Uint8Array): void {
    const audioContext = new AudioContext();
    audioContext.decodeAudioData(byteArray.buffer, (audioBuffer) => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    });
  }

  // Méthode appelée lorsque vous souhaitez afficher le composant app-display-musics
  showDisplayMusicComponent() {
    this.showDisplayMusics = true;
  }

  // Méthode appelée lorsque vous souhaitez masquer le composant app-display-musics
  hideDisplayMusicComponent() {
    this.showDisplayMusics = false;
  }
  setMusicList(musicList: string[]) {
    this.musicList = musicList;
  }
  setStyleMusic(styleMusic: string) {
    this.styleMusic = styleMusic;
  }
}
