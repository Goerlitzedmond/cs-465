import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiBaseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  public login(user: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}login`, user).pipe(
      tap((response: any) => {
        localStorage.setItem('travlr-token', response.token);
      })
    );
  }

  public logout(): void {
    localStorage.removeItem('travlr-token');
  }

  public getToken(): string | null {
    return localStorage.getItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp > (Date.now() / 1000);
  }
}