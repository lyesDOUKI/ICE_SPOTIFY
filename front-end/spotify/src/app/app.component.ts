import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showDisplayMusics: boolean = false; // Variable pour contrôler l'affichage du composant app-display-musics

  //list of music, à passer en input du composant app-display-musics
  musicList: string[] = [
  ];
  styleMusic = ''; // Style de musique à afficher
  constructor() { }

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
