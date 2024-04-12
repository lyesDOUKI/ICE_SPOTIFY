import { Component } from '@angular/core';
import { SpotifyCommService } from './services/spotify-comm.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  showDisplayMusics: boolean = false; // Variable pour contrôler l'affichage du composant app-display-musics
  isFromSearch: boolean = false; // Variable pour contrôler l'affichage du composant app-display-musics
  audioUrl : string = ''; // URL de la musique à lire
  //list of music, à passer en input du composant app-display-musics
  musicList: any[] = [
  ];
  styleMusic = ''; // Style de musique à afficher
  constructor(private spotify:SpotifyCommService) { }
  startAudioPlayback(): void {

  }

  // Méthode appelée lorsque vous souhaitez afficher le composant app-display-musics
  showDisplayMusicComponent() {
    this.showDisplayMusics = true;
  }

  // Méthode appelée lorsque vous souhaitez masquer le composant app-display-musics
  hideDisplayMusicComponent() {
    this.showDisplayMusics = false;
  }
  setMusicList(musicList: any[]) {
    this.musicList = musicList;
  }
  setStyleMusic(styleMusic: string) {
    this.styleMusic = styleMusic;
  }
  isFromSearchComponent(isFromSearch: boolean) {
    this.isFromSearch = isFromSearch;
  }
}
