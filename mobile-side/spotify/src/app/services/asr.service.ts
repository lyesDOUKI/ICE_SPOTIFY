import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AsrService {
  private readonly baseUrl = environment.asrUrl;
  constructor(private http: HttpClient) { }

  uploadAudio(formData: FormData) {
    return this.http.post<any>(this.baseUrl+"/recognize", formData, { observe: 'response' });
  }
}
