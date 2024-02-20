import { NotificationService } from '../services/notifications.service';
import { SpotifyCommService } from '../services/spotify-comm.service';
// upload-music.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-music',
  templateUrl: './upload-music.component.html',
  styleUrls: ['./upload-music.component.css']
})
export class UploadMusicComponent {
  uploadedFileName: string | undefined;
  isLoading : boolean = false; // Variable pour afficher ou cacher le spinner
  selectedStyle: string = ''; // Variable pour stocker le style de musique sélectionné

  constructor(private spotifyService:SpotifyCommService,
              private notificationService:NotificationService) { }

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
      }
    );
  }
  deleteUploadedFile() {
    const fileInput = document.getElementById('mp3file') as HTMLInputElement;
    fileInput.files = null; // Supprimer le fichier sélectionné
    this.uploadedFileName = undefined; // Supprimer le nom du fichier uploadé
  }
}
