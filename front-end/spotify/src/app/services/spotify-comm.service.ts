import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyCommService {

  private readonly baseUrl = 'http://172.20.10.12:3000'; // URL de base

  constructor(private http: HttpClient) { }

  uploadMusic(formData: FormData) {
    return this.http.post<any>(this.baseUrl+"/upload", formData);
  }
  loadMusicsByStyle(style: string) {
    return this.http.get<any[]>(this.baseUrl+"/musics/"+style);
  }
  updateMusic(oldName: string, titre: string,
    auteur : string, annee : number, style: string) {
    return this.http.put<any>(this.baseUrl+"/music", {oldName, titre, auteur, annee, style});
  }
  deleteMusic(music: string, style: string) {
    return this.http.delete<any>(this.baseUrl+"/music/"+music+"/"+style);
  }
  lireMusic(music: string, style: string) {
    return this.http.get<any>(this.baseUrl+"/ecouter/"+music+"/"+style);
  }
  stopMusic(audioUrl: string) {
    return this.http.post<any>(this.baseUrl+"/stop", {audioUrl});
  }
}
