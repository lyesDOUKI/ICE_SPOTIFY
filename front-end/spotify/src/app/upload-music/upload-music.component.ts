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
  isLoading : boolean = false; // Variable pour afficher ou cacher le spinner
  selectedStyle: string = ''; // Variable pour stocker le style de musique sélectionné

  constructor(private spotifyService:SpotifyCommService,
              private notificationService:NotificationService) { }

  // Fonction pour mettre à jour le nom du fichier sélectionné
  updateFileName(event: any) {
    const fileName = event.target.files[0].name;
    const label = document.querySelector('.input-group-text') as HTMLLabelElement;
    label.innerText = fileName;
  }

  // Fonction pour soumettre le formulaire
  submitForm() {
    this.isLoading = true; // Afficher le spinner
    // Récupérer le fichier sélectionné
    const fileInput = document.getElementById('mp3file') as HTMLInputElement;
    const file = fileInput.files![0];
    // Créer un objet FormData pour envoyer le fichier
    const formData = new FormData();
    formData.append('file', file);
    // Ajouter le style de musique sélectionné
    formData.append('musicStyle', this.selectedStyle);
    this.spotifyService.uploadMusic(formData).subscribe(
      (response) => {
        if(response.status === 200) {
          this.isLoading = false; // Cacher le spinner
          this.notificationService.showNotification('La chanson a été envoyée avec succès', 'success');
        }else {
          this.isLoading = false; // Cacher le spinner
          this.notificationService.showNotification('Erreur lors de l\'envoi de la chanson', 'danger');
        }
      }
    );
  }
}
