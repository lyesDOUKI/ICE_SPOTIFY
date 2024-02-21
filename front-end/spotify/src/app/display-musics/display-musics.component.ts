import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UpdateMusicComponent } from '../update-music/update-music.component';
import { SpotifyCommService } from '../services/spotify-comm.service';
import { NotificationService } from '../services/notifications.service';



@Component({
  selector: 'app-display-musics',
  templateUrl: './display-musics.component.html',
  styleUrls: ['./display-musics.component.css']
})
export class DisplayMusicsComponent {
  currentPlayingMusic: string | null = null;
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
    this.isLoading = false;
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
  currentTime = '0:00';
  @ViewChild('audioContainer') audioContainer!: ElementRef;
  audioPlayer!: HTMLAudioElement;
  listenToMusic(music: string, index: number) {
    this.isLoading = true;
    this.selectedMusicIndex = index;
    this.audioPlayer = new Audio();
    this.audioPlayer.addEventListener('loadedmetadata', () => {
      // Mettre à jour le temps total de la musique
      const totalTime = this.formatTime(this.audioPlayer.duration);
    });
    this.audioPlayer.addEventListener('timeupdate', () => {
      // Mettre à jour le temps écoulé de la musique
      this.currentTime = this.formatTime(this.audioPlayer.currentTime);
    });
    this.audioPlayer.addEventListener('ended', () => {
      // Désabonnez-vous du flux ou effectuez d'autres nettoyages nécessaires
      // Réinitialisez le compteur de lecture à zéro
      this.currentPlayingMusic = null;
      this.selectedMusicIndex = null;
      this.isMusicPlaying = false;
      this.currentTime = '0:00'; // Réinitialisez le temps écoulé à zéro
      this.audioPlayer.currentTime = 0; // Réinitialisez le lecteur audio à zéro
      this.audioPlayer.pause(); // Mettez en pause la lecture
      this.audioPlayer.src = ''; // Supprimez le src de l'élément audio
    });
    this.spotifyService.lireMusic(music, this.styleMusic).subscribe((data) => {
      this.audioUrl = data;
      this.audioPlayer.src = this.audioUrl;
      this.audioPlayer.load(); // Charger la nouvelle source
      this.audioPlayer.onloadeddata = () => {
        this.currentPlayingMusic = music;
        this.isLoading = false;
        this.audioPlayer.play(); // Démarrer la lecture une fois que la nouvelle source est chargée
      };
    });
  }
  formatTime(time: number): string {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
  isMusicPlaying : boolean = false;
  togglePlayPause(music: string, index: number) {
    if (this.selectedMusicIndex === index) {
      if (this.isMusicPlaying) {
        // Mettre en pause la musique
        this.audioPlayer.pause();
      } else {
        // Reprendre la lecture de la musique
        this.audioPlayer.play();
      }
      // Inverser l'état de lecture
      this.isMusicPlaying = !this.isMusicPlaying;
    } else {
      // Si une autre musique est sélectionnée, démarrer la lecture de celle-ci
      this.listenToMusic(music, index);
      this.isMusicPlaying = true;
    }
  }
  volume: number = 0.5;
  volumeList: number[] = new Array(this.musicList.length).fill(1);
  setVolume(i:number) {
    if (this.audioPlayer) {
      this.audioPlayer.volume = this.volumeList[i];
    }
  }
  stopMusic(music :any , i:number){
    this.spotifyService.stopMusic(music, this.styleMusic).subscribe((data)=>{
      if(data.statut === 1){
        this.currentPlayingMusic = null;
        this.selectedMusicIndex = null;
        this.isMusicPlaying = false;
        this.audioPlayer.pause();
        this.audioPlayer.currentTime = 0;
        this.volumeList[i] = 0.5;
        this.setVolume(i);
      }
    });
  }
}
