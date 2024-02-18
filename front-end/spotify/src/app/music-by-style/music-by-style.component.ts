import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { SpotifyCommService } from '../services/spotify-comm.service';

@Component({
  selector: 'app-music-by-style',
  templateUrl: './music-by-style.component.html',
  styleUrls: ['./music-by-style.component.css']
})
export class MusicByStyleComponent {
  selectedStyle: string = ''; // Variable pour stocker le style sélectionné
  isLoading: boolean = false;
  constructor(private appComponent: AppComponent, private spotifyService : SpotifyCommService) { }

  toggleStyle(event: any, style: string) {
    if (event.target.checked) {
      // Désélectionne toutes les autres cases
      document.querySelectorAll('.form-check-input').forEach((checkbox: any) => {
        if (checkbox.value !== style) {
          checkbox.checked = false;
        }
      });

      // Sélectionne le style choisi
      this.selectedStyle = style;
    } else if (this.selectedStyle === style) {
      // Désélectionne le style si déjà sélectionné
      this.selectedStyle = '';
    }
  }

  searchMusic() {
    this.isLoading = true;
    this.spotifyService.loadMusicsByStyle(this.selectedStyle).subscribe((response=>{
      if(response){
        this.appComponent.setStyleMusic(this.selectedStyle);
        this.appComponent.setMusicList(response);
      }
      this.isLoading = false;
    }));
    this.appComponent.showDisplayMusicComponent();

  }
}
