import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyCommService {

  private readonly baseUrl = 'http://localhost:3000'; // URL de base

  constructor(private http: HttpClient) { }

  uploadMusic(formData: FormData) {
    return this.http.post<any>(this.baseUrl+"/upload", formData);
  }
  loadMusicsByStyle(style: string) {
    return this.http.get<any[]>(this.baseUrl+"/musics/"+style);
  }
  updateMusicName(oldName: string, newName: string, style: string) {
    return this.http.put<any>(this.baseUrl+"/music", {oldName, newName, style});
  }
  deleteMusic(music: string, style: string) {
    return this.http.delete<any>(this.baseUrl+"/music/"+music+"/"+style);
  }
  lireMusic(music: string, style: string) {
    return this.http.get<any>(this.baseUrl+"/ecouter/"+music+"/"+style);
  }
  stopMusic(music : string, style: string) {
    return this.http.post<any>(this.baseUrl+"/stop", {music, style});
  }
}
