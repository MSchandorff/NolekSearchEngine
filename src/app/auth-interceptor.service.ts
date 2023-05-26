import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private token: string | null = null;

  constructor(private http: HttpClient) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.token) {
      return this.getBearerToken().pipe(
        tap((token: string) => {
          this.token = token;
        }),
        switchMap(() => {
          const authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${this.token}`
            }
          });
          return next.handle(authReq);
        })
      );
    }
  
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.token}`
      }
    });
    return next.handle(authReq);
  }

  private getBearerToken(): Observable<string> {
    const loginUrl = 'http://165.232.77.119:5000/api/Auth/Login';
    const body = {
      Email: 'admin@test.com',
      Password: 'Password123!'
    };

    return this.http.post(loginUrl, body).pipe(
      map((response: any) => response.token)
    );
  }
}
