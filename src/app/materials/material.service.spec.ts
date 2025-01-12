import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private apiUrl = 'http://localhost:8083/api/materials'; // Endpoint del microservicio de materiales

  constructor(private http: HttpClient) {}

  getMaterials(): Observable<any> {
    return this.http.get<any>(this.apiUrl); // Devuelve la lista de materiales
  }
}
