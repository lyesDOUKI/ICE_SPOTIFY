import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class NlpService {
  private readonly baseUrl = environment.nlpUrl;
  constructor(private http: HttpClient) { }

analyseRequest(request : string) {
  const params = new HttpParams().set('requete', request);
    return this.http.get<any>(this.baseUrl+"/nlp-process", { params, observe: 'response' });
  }

}
