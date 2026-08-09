import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  private apiBaseUrl = 'http://localhost:3000/api/';

  constructor(private http: HttpClient) { }

  getTrips(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiBaseUrl}trips`);
  }

  getTrip(tripCode: string): Observable<any> {
    return this.http.get(`${this.apiBaseUrl}trips/${tripCode}`);
  }

  addTrip(formData: any): Observable<any> {
    return this.http.post(`${this.apiBaseUrl}trips`, formData);
  }

  updateTrip(formData: any): Observable<any> {
    return this.http.put(`${this.apiBaseUrl}trips/${formData.code}`, formData);
  }
}