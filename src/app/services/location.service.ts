import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private baseUrl = 'http://localhost:8080/api/locations';

  constructor(private http: HttpClient) {}

  getLocations(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  createLocation(location: any): Observable<any> {
    return this.http.post(this.baseUrl, location);
  }
}
