import { Component, Input } from '@angular/core';
import { UpdateMusicComponent } from '../update-music/update-music.component';
import { SpotifyCommService } from '../services/spotify-comm.service';
import { NotificationService } from '../services/notifications.service';



@Component({
  selector: 'app-display-musics',
  templateUrl: './display-musics.component.html',
  styleUrls: ['./display-musics.component.css']
})
export class DisplayMusicsComponent {
  @Input() musicList: string[] = []; // Liste des musiques à afficher
  @Input() styleMusic = ''; // Style de musique à afficher
  isLoading: boolean = false;
  constructor(private spotifyService : SpotifyCommService,
    private notification : NotificationService) { }
  deleteMusic(music: string) {
    // Logique pour supprimer la musique
    this.isLoading = true;
    this.spotifyService.deleteMusic(music, this.styleMusic).subscribe((Response=>{
      if(Response.status === 200){
        this.spotifyService.loadMusicsByStyle(this.styleMusic).subscribe((response=>{
          if(response){
            this.musicList = response;
            this.notification.showNotification("Musique supprimée avec succès", "success");
          }
        }));
    }else{
      this.notification.showNotification("Echec de la suppression de la musique", "danger");
    }
  }
    ));
  }

  editingMusic: string = ''; // Nom de la musique en cours d'édition
  newMusicName: string = ''; // Nouveau nom de la musique

  editMusic(music: string) {
    this.editingMusic = music; // Définit la musique en cours d'édition
    this.newMusicName = music; // Initialise le nouveau nom de musique avec le nom actuel
  }

  updateMusicName() {
    this.isLoading = true;
    // Met à jour le nom de la musique dans la liste coté serveur
    this.spotifyService.updateMusicName(this.editingMusic, this.newMusicName, this.styleMusic)
    .subscribe((Response=>{
      if(Response.status === 200){
        this.spotifyService.loadMusicsByStyle(this.styleMusic).subscribe((response=>{
          if(response){
            this.musicList = response;
            this.notification.showNotification("Nom de la musique modifié avec succès", "success");
          }
        }));
      }else{
        this.notification.showNotification("Echec de la modification du nom de la musique", "danger");
      }
      this.isLoading = false;
    }));
    //refaire un appel loadMusicsByStyle pour rafraichir la liste des musiques

    this.editingMusic = ''; // Réinitialise la musique en cours d'édition
    this.newMusicName = ''; // Réinitialise le nouveau nom de musique
  }
  audioUrl : string = ''; // URL de la musique à lire
  selectedMusicIndex: number | null = null;
  listenToMusic(music:any, index: number)
  {
    this.selectedMusicIndex = index;
    this.spotifyService.lireMusic(music, this.styleMusic).subscribe((data) => {
      this.audioUrl = data;
      const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
      if (audioPlayer) {
        audioPlayer.src = this.audioUrl;
        audioPlayer.load();
        audioPlayer.play();
      }
    });
  }
}
