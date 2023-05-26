import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PlcBundle } from './plc-data.model';

@Injectable({
  providedIn: 'root',
})
export class DataTestService {
  private baseUrl = 'http://165.232.77.119:';

  constructor(private http: HttpClient) { }

  postData(token: string, body: any): Observable<any> {
    console.log('postData was called');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
    return this.http.post(`${this.baseUrl}5002/api/Data/get`, body, httpOptions);
  }

  fetchIndexes(token: string, body: any): Observable<PlcBundle> {
    console.log('fetchIndexes was called');
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };
  
    return this.http.post<PlcBundle>(`${this.baseUrl}5002/api/Data/get`, body, httpOptions);
  }
}