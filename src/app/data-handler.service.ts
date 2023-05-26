import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {

  constructor(private http: HttpClient) { }

  getData() {
    // let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBZG1pbiIsImp0aSI6ImVkOTAyNGRkLTM0ZDktNDc0NC1iYmE3LWFlMTNmMTUyNmY1YiIsImVtYWlsIjoiYWRtaW5AVEVTVC5jb20iLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjdhNjM5MmU5LTQ1M2EtNGU0Mi1iZjAyLWRiOGZhOTRjMDNjZiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNjg0NzUyODU3LCJpc3MiOiJJZGVudGl0eUFQSSIsImF1ZCI6IklkZW50aXR5QVBJVXNlciJ9.H_HaMhyVYsDhCBKkBdbrAPqybNvSptrWosLnTRylm3g';
    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json',
    //     'Authorization': 'Bearer ' + token
    //   })
    // };
    const body = {
      index: '2023-05-16-plc_testing-general',
      query: 'index:2023-05-16-plc_testing-general',
      size: 5000
    };
    return this.http.post('http://165.232.77.119:5002/api/Data/get', body).pipe(
      tap((response) => console.log(response))
    );
  }
}