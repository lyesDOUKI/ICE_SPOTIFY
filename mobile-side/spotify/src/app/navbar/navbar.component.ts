import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { SpotifyCommService } from '../services/spotify-comm.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  selectedStyle: string = ''; // Variable pour stocker le style sélectionné
  isLoading: boolean = false;
  searchOption : string = "";
  searchQuery:string = "";
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
    this.appComponent.isFromSearchComponent(false);
    this.spotifyService.loadMusicsByStyle(this.selectedStyle).subscribe((response=>{
      if(response){
        this.appComponent.setStyleMusic(this.selectedStyle);
        this.appComponent.setMusicList(response);
      }
      this.isLoading = false;
    }));
    this.appComponent.showDisplayMusicComponent();

  }
  toggleSearchOption(choix:string)
  {
    this.searchOption = choix;
  }
  search()
  {
    this.spotifyService.setChoixSearch(this.searchOption);
    this.spotifyService.setQuerySearch(this.searchQuery);
    this.appComponent.isFromSearchComponent(true);
    this.spotifyService.getMusicByChoix(this.searchOption, this.searchQuery).subscribe((res)=>{
      this.appComponent.setMusicList(res);
      this.appComponent.setStyleMusic(res[0].style);
      this.appComponent.showDisplayMusicComponent();
    });
  }
}
