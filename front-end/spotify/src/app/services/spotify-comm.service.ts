import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment';
@Injectable({
  providedIn: 'root'
})
export class SpotifyCommService {

  private readonly baseUrl = environment.apiUrl; // URL de base
  choixSearch : string = "";
  querySearch : string = "";
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
  getMusicByChoix(choix: string, search: string) {
    return this.http.get<any[]>(this.baseUrl+"/search/"+choix+"/"+search);
  }
  setChoixSearch(choix: string)
  {
    this.choixSearch = choix;
  }
  setQuerySearch(query: string)
  {
    this.querySearch = query;
  }
  getChoixSearch()
  {
    return this.choixSearch;
  }
  getQuerySearch()
  {
    return this.querySearch;
  }
}
