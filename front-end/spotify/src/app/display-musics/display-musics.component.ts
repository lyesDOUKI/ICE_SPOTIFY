import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @Input() musicList: any[] = []; // Liste des musiques à afficher
  @Input() styleMusic = '';
  @Input() isFromSearch!: boolean;
  isLoading: boolean = false;
  showModal: boolean = false;
  newTitle: string = '';
  newAuthor: string = '';
  newYear: number = 0;
  oldName : string = '';
  openModal(music : any) {
    this.oldName = music.titre;
    this.newTitle = music.titre;
    this.newAuthor = music.auteur;
    this.newYear = music.annee;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  updateMusic()
  {
    if(this.isMusicPlaying)
    {
      this.spotifyService.stopMusic(this.audioUrl).subscribe((data)=>{
        if(data.statut === 1){
          this.currentPlayingMusic = null;
          this.selectedMusicIndex = null;
          this.isMusicPlaying = false;
          this.audioPlayer.pause();
          this.audioPlayer.src = '';
          this.audioPlayer.currentTime = 0;
        }
      });
    }
    this.isLoading = true;
    this.spotifyService.updateMusic(this.oldName,
      this.newTitle, this.newAuthor, this.newYear, this.styleMusic).subscribe((response=>{
      if(response.status === 200){
        this.closeModal();
       if(this.isFromSearch)
        {
          this.updateBySearch();
        }else{
          this.spotifyService.loadMusicsByStyle(this.styleMusic).subscribe((response=>{
            if(response){
              this.musicList = response;
              this.notification.showNotification("Musique modifiée avec succès", "success");
            }
          }));
        }
      }else{
        this.notification.showNotification("Echec de la modification de la musique", "danger");
      }
      this.isLoading = false;
    }));
  }
  constructor(private spotifyService : SpotifyCommService,
    private notification : NotificationService, private elementRef: ElementRef) { }


  deleteMusic(music: string) {
    // Logique pour supprimer la musique
    this.isLoading = true;
    this.spotifyService.deleteMusic(music, this.styleMusic).subscribe((Response=>{
      if(Response.status === 200){
        if(this.isFromSearch)
        {
          this.updateBySearch();
        }else{
          this.spotifyService.loadMusicsByStyle(this.styleMusic).subscribe((response=>{
            if(response){
              this.musicList = response;
              this.notification.showNotification("Musique supprimée avec succès", "success");
            }
          }));
        }

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


  audioUrl : string = ''; // URL de la musique à lire
  selectedMusicIndex: number | null = null;
  currentTime = '0:00';
  @ViewChild('audioContainer') audioContainer!: ElementRef;
  audioPlayer!: HTMLAudioElement;
  listenToMusic(music: string, index: number) {
    //vérifer d'abord si une musique est en cours de lecture
    if(this.currentPlayingMusic){
      this.spotifyService.stopMusic(this.audioUrl).subscribe((data)=>{
        if(data.statut === 1){
          this.currentPlayingMusic = null;
          this.selectedMusicIndex = null;
          this.isMusicPlaying = false;
          this.audioPlayer.pause();
          this.audioPlayer.src = '';
          this.audioPlayer.currentTime = 0;
          this.lireMusique(music, index);
          this.isMusicPlaying = true;
        }
      });
    }else{
      this.lireMusique(music, index);
    }
  }
  lireMusique(music : string, index: number)
  {
    this.isLoading = true;
    this.selectedMusicIndex = index;
    this.audioPlayer = new Audio();
    const sourceElement = document.createElement('source');
    sourceElement.type = 'audio/mpeg';
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
      sourceElement.src = this.audioUrl;
      this.audioPlayer.appendChild(sourceElement);
      this.elementRef.nativeElement.appendChild(this.audioPlayer);
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
  togglePlayPause(music: any, index: number) {
    if (this.selectedMusicIndex === index && this.currentPlayingMusic === music.titre) {
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
      this.listenToMusic(music.titre, index);
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
    this.spotifyService.stopMusic(this.audioUrl).subscribe((data)=>{
      if(data.statut === 1){
        this.currentPlayingMusic = null;
        this.selectedMusicIndex = null;
        this.isMusicPlaying = false;
        this.audioPlayer.pause();
        this.currentTime = '0:00';
        this.audioPlayer.currentTime = 0;
        this.volumeList[i] = 0.5;
        this.setVolume(i);
      }
    });
  }
  closeModalOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    const modal = document.querySelector('.modal-content') as HTMLElement;

    if (targetElement.classList.contains('modal') || !modal.contains(targetElement)) {
      this.showModal = false; // Fermer le modal
    }
  }
  updateBySearch()
  {
    this.spotifyService.getMusicByChoix(this.spotifyService.getChoixSearch(), this.spotifyService.getQuerySearch()).subscribe((res)=>{
      if(res){
        this.musicList = res;
        this.notification.showNotification("Musique modifiée avec succès", "success");
      }
    });
  }
}
