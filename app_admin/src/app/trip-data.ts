import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api/';

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({ 'Authorization': `Bearer ${token}` });
  }

  getTrips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}trips`);
  }

  getTrip(tripCode: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}trips/${tripCode}`);
  }

  addTrip(formData: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}trips`, formData, {
      headers: this.getAuthHeaders()
    });
  }

  updateTrip(formData: any): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}trips/${formData.code}`, formData, {
      headers: this.getAuthHeaders()
    });
  }
}