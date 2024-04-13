import { NlpDTO } from './../models/nlpDTO';
import { AsrService } from '../services/asr.service';
import { NlpService } from '../services/nlp.service';
import { NotificationService } from '../services/notifications.service';
import { SpotifyCommService } from '../services/spotify-comm.service';
// upload-music.component.ts
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-music',
  templateUrl: './upload-music.component.html',
  styleUrls: ['./upload-music.component.css']
})
export class UploadMusicComponent {
  uploadedFileName: string | undefined;
  isLoading : boolean = false; // Variable pour afficher ou cacher le spinner
  isLoadingSendVocal : boolean = false;
  selectedStyle: string = ''; // Variable pour stocker le style de musique sélectionné
  titre : string = "";
  auteur : string = "";
  annee : string = "";
  mediaRecorder: MediaRecorder | undefined;
  audioUrl : string = '';
  @ViewChild('audioContainer') audioContainer!: ElementRef;
  audioPlayer!: HTMLAudioElement;
  chunks: Blob[] = [];
  constructor(private spotifyService:SpotifyCommService,
              private notificationService:NotificationService,
              private asrService : AsrService,
              private nlpService : NlpService,
              private elementRef: ElementRef) { }

  // Fonction pour mettre à jour le nom du fichier sélectionné
  updateFileName(event: any) {
    const fileInput = document.getElementById('mp3file') as HTMLInputElement;
    const file = fileInput.files![0];
    this.uploadedFileName = file.name;
  }

  // Fonction pour soumettre le formulaire
  submitForm() {
    this.isLoading = true; // Afficher le spinner
    // Récupérer le fichier sélectionné
    const fileInput = document.getElementById('mp3file') as HTMLInputElement;
    const file = fileInput.files![0];
    this.uploadedFileName = file.name; // Mettre à jour le nom du fichier uploadé
    // Créer un objet FormData pour envoyer le fichier
    const formData = new FormData();

    formData.append('file', file);
    // Ajouter le style de musique sélectionné
    formData.append('musicStyle', this.selectedStyle);
    formData.append('titre', this.titre);
    formData.append('auteur', this.auteur);
    formData.append('annee', this.annee);
    this.spotifyService.uploadMusic(formData).subscribe(
      (response) => {
        if(response.status === 200) {
          this.deleteUploadedFile(); // Supprimer le fichier uploadé
          this.isLoading = false; // Cacher le spinner
          this.notificationService.showNotification('La chanson a été envoyée avec succès', 'success');

        }else {
          this.isLoading = false; // Cacher le spinner
          this.notificationService.showNotification('Erreur lors de l\'envoi de la chanson', 'danger');
        }
        this.resetInput();
      }
    );
  }
  deleteUploadedFile() {
    const fileInput = document.getElementById('mp3file') as HTMLInputElement;
    fileInput.files = null; // Supprimer le fichier sélectionné
    this.uploadedFileName = undefined; // Supprimer le nom du fichier uploadé
  }
  resetInput()
  {
    this.titre = "";
    this.auteur = "";
    this.annee = "";
    this.selectedStyle = "";
  }
  startRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
          this.mediaRecorder = new MediaRecorder(stream);
          this.chunks = [];

          this.mediaRecorder.addEventListener('dataavailable', event => {
            this.chunks.push(event.data);
          });

          this.mediaRecorder.start();
        })
        .catch(error => {
          console.error('Erreur lors de la récupération du flux audio :', error);
        });
    } else {
      console.error('Votre navigateur ne prend pas en charge la fonctionnalité d\'enregistrement vocal.');
    }
  }

  stopRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();

      this.mediaRecorder.addEventListener('stop', () => {
        //activer le spinnner sur le boutton
        this.isLoadingSendVocal = true;

        const recordedBlob = new Blob(this.chunks, { type: 'audio/mpeg' });
        const formData = new FormData();
        formData.append('file', recordedBlob);
        this.asrService.uploadAudio(formData).subscribe((response) => {
          if (response.status === 200) {
            this.notificationService
            .showNotification('L\'audio a été transcrit avec succès', 'success');
            //analyser la requête
            const request = response.body?.text;
            this.analyseRequete(request);
          } else {
            this.notificationService
            .showNotification('Erreur lors de la transcription de l\'audio', 'danger');
          }
        });
      });
    }
  }

  analyseRequete(request : string){
    this.nlpService.analyseRequest(request).subscribe((response) => {
      if (response.status === 200) {
        this.isLoadingSendVocal = false;
        this.notificationService
        .showNotification('La requête a été analysée avec succès', 'success');
        this.lancerLaMusique(response.body);
      } else {
        this.notificationService
        .showNotification('Erreur lors de l\'analyse de la requête', 'danger');
      }
    });
  }
  lancerLaMusique(body : any)
  {
    const nlpDTO = new NlpDTO(body.action, body.objet);
    this.audioPlayer = new Audio();
    const sourceElement = document.createElement('source');
    sourceElement.type = 'audio/mpeg';
    const titre = nlpDTO.objet.titre;
    const musicStyle = nlpDTO.objet.style;
    this.spotifyService.lireMusic(titre, musicStyle).subscribe((data: string) => {
      this.audioUrl = data;
      sourceElement.src = this.audioUrl;
      this.audioPlayer.appendChild(sourceElement);
      this.elementRef.nativeElement.appendChild(this.audioPlayer);
      this.audioPlayer.load(); // Charger la nouvelle source
      this.audioPlayer.onloadeddata = () => {
        this.audioPlayer.play(); // Démarrer la lecture une fois que la nouvelle source est chargée
        this.notificationService.showNotification("lecture de la musique avec succes", "success");
      };
      this.audioPlayer.onerror = (error) => {
        this.isLoading = false;
        this.notificationService
        .showNotification("Impossible de lire la musique", "danger");
            }
    });
  }
}
