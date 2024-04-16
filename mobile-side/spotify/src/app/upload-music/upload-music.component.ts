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
  isMusicEnCours : boolean = false;
  isMusiqueArreter : boolean = false;
  selectedStyle: string = ''; // Variable pour stocker le style de musique sélectionné
  titre : string = "";
  auteur : string = "";
  annee : string = "";
  mediaRecorder: MediaRecorder | undefined;
  audioUrl : string = '';
  styleDeLaMusiqueEnCours : string = '';
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

        } else {
          this.isLoading = false; // Cacher le spinner
          this.notificationService.showNotification('Erreur lors de l\'envoi de la chanson', 'danger');
        }
        this.resetInput();
      },
      (error) => {
        this.isLoading = false; // Cacher le spinner en cas d'erreur
        this.resetInput();
        this.notificationService.showNotification('Une erreur est survenue lors de l\'envoi de la chanson', 'danger');
        console.error('Erreur lors de l\'envoi de la chanson :', error);
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
    //si une chanson est en cours, on baisse le volume
    if(this.audioPlayer)
    {
      this.audioPlayer.volume = 0.1;
    }
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
        //on remet le volume de la musique à 1
        if(this.audioPlayer)
        {
          this.audioPlayer.volume = 1;
        }
        const recordedBlob = new Blob(this.chunks, { type: 'audio/mpeg' });
        const formData = new FormData();
        formData.append('file', recordedBlob);
        this.asrService.uploadAudio(formData).subscribe(
          (response) => {
            if (response.status === 200) {
              this.notificationService.showNotification('L\'audio a été transcrit avec succès', 'success');
              // Analyser la requête
              const request = response.body?.text;
              this.analyseRequete(request);
            } else {
              this.notificationService.showNotification('Erreur lors de la transcription de l\'audio', 'danger');
            }
          },
          (error) => {
            this.isLoadingSendVocal = false;
            this.notificationService.showNotification('Une erreur est survenue lors de la transcription de l\'audio', 'danger');
            console.error('Erreur lors de la transcription de l\'audio :', error);
          }
        );

      });
    }
  }

  analyseRequete(request : string){
    this.nlpService.analyseRequest(request).subscribe(
      (response) => {
        if (response.status === 200) {
          this.isLoadingSendVocal = false;
          this.notificationService.showNotification('La requête a été analysée avec succès', 'success');
          this.deduireAction(response.body);
        } else {
          this.notificationService.showNotification('Erreur lors de l\'analyse de la requête', 'danger');
        }
      },
      (error) => {
        this.isLoadingSendVocal = false;
        this.notificationService.showNotification('Une erreur est survenue lors de l\'analyse de la requête', 'danger');
        console.error('Erreur lors de l\'analyse de la requête :', error);
      }
    );

  }
  deduireAction(body : any){
   switch(body.action)
    {
      case 1:
        this.lancerLaMusique(body);
        break;
      case 2:
        this.arreterLaMusique(body);
        break;
      case 3:
        this.supprimerMusique(body);
        break;
      case 4:
        this.PauseReprendreLaMusique(body);
        break;
      default:
        this.notificationService.showNotification("Action non reconnue", "danger");
    }
  }
  lancerLaMusique(body : any)
  {
    const nlpDTO = new NlpDTO(body.action, body.objet);
    this.audioPlayer = new Audio();
    const sourceElement = document.createElement('source');
    sourceElement.type = 'audio/mpeg';
    const titre = nlpDTO.objet === null ? null : nlpDTO.objet.titre;
    const musicStyle = nlpDTO.objet === null ? null : nlpDTO.objet.style;
    if(musicStyle === null || titre === null)
    {
      this.notificationService
      .showNotification("Interprétation erronée de l'action demandée, veuillez réessayer", "danger");
      return;
    }
    this.spotifyService.lireMusic(titre, musicStyle).subscribe(
      (data: string) => {
        this.audioUrl = data;
        this.styleDeLaMusiqueEnCours = musicStyle;
        this.isMusiqueArreter = false;
        sourceElement.src = this.audioUrl;
        this.audioPlayer.appendChild(sourceElement);
        this.elementRef.nativeElement.appendChild(this.audioPlayer);
        this.audioPlayer.load(); // Charger la nouvelle source
        this.audioPlayer.onloadeddata = () => {
          this.isMusicEnCours = true;
          this.audioPlayer.play(); // Démarrer la lecture une fois que la nouvelle source est chargée
          this.notificationService.showNotification("Lecture de la musique avec succès", "success");
        };
        this.audioPlayer.onerror = (error) => {
          this.isLoading = false;
          this.notificationService.showNotification("Impossible de lire la musique", "danger");
        };
      },
      (error) => {
        this.isLoading = false;
        this.notificationService.showNotification("Une erreur est survenue lors de la lecture de la musique", "danger");
        console.error("Erreur lors de la lecture de la musique :", error);
      }
    );

  }
  arreterLaMusique(body : any)
  {
    // Arrêter la musique dans un premier temps
    if(this.audioPlayer)
    {
      this.audioPlayer.pause();
      this.isMusicEnCours = false;
      const nlpDTO = new NlpDTO(body.action, body.objet);
      //faire une requete d arret vers le serveur de streaming
      const style = nlpDTO.objet === null ? this.styleDeLaMusiqueEnCours : nlpDTO.objet.style;
      if(style === null)
      {
        this.notificationService.showNotification("Interprétation erronée de l'action demandée, veuillez réessayer", "danger");
        return;
      }
      this.spotifyService.stopMusic(this.audioUrl, style).subscribe(
        (response) => {
          if(response.statut === 1) {
            this.notificationService.showNotification("Musique arrêtée avec succès", "success");
            this.isMusiqueArreter = true;
          } else {
            this.notificationService.showNotification("Erreur lors de l'arrêt de la musique", "danger");
          }
        },
        (error) => {
          this.notificationService.showNotification("Une erreur est survenue lors de l'arrêt de la musique", "danger");
          console.error("Erreur lors de l'arrêt de la musique :", error);
        }
      );
    }
    else
    {
      this.notificationService.showNotification("Aucune musique en cours de lecture", "danger");
    }
  }
  supprimerMusique(body : any)
  {
    //arreter d'abort la musique si elle est en cours
    if(this.audioPlayer)
    {
      this.audioPlayer.pause();
      this.isMusicEnCours = false;
    }
    const nlpDTO = new NlpDTO(body.action, body.objet);
    const titre = nlpDTO.objet === null ? null : nlpDTO.objet.titre;
    const style = nlpDTO.objet === null ? null : nlpDTO.objet.style;
    if(titre === null || style === null)
    {
      this.notificationService.showNotification("Interprétation erronée de l'action demandée, veuillez réessayer", "danger");
      return;
    }
    this.spotifyService.deleteMusic(titre, style).subscribe(
      (response) => {
        if(response.status === 200) {
          this.notificationService.showNotification("Musique supprimée avec succès", "success");
        } else {
          this.notificationService.showNotification("Erreur lors de la suppression de la musique", "danger");
        }
      },
      (error) => {
        this.notificationService.showNotification("Une erreur est survenue lors de la suppression de la musique", "danger");
        console.error("Erreur lors de la suppression de la musique :", error);
      }
    );
  }
  PauseReprendreLaMusique(body : any)
  {
    if(this.audioPlayer && !this.isMusiqueArreter)
    {
      if(this.audioPlayer.paused)
      {
        this.audioPlayer.play();
        this.notificationService.showNotification("Musique reprise avec succès", "success");
      }
      else
      {
        this.audioPlayer.pause();
        this.notificationService.showNotification("Musique en pause", "success");
      }
    }
    else
    {
      this.notificationService.showNotification("Aucune musique en cours de lecture", "danger");
    }
  }
}
