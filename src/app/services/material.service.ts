import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MaterialService {
  private baseUrl = 'http://localhost:8080/api/materiales';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('accessToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`, // Incluye el token JWT
    });
  }

  getMaterials(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.getHeaders() });
  }

    // Buscar materiales por tipo y fecha de compra
    getMaterialsByTypeAndDate(type: string, purchaseDate: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/filter`, {
        headers: this.getHeaders(),
        params: { type, purchaseDate },
      });
    }
  
    // Buscar materiales por ciudad
    getMaterialsByCity(city: string): Observable<any> {
      return this.http.get(`${this.baseUrl}/city`, {
        headers: this.getHeaders(),
        params: { city },
      });
    }
  
    // Crear un nuevo material
    createMaterial(material: any): Observable<any> {
      return this.http.post(this.baseUrl, material, { headers: this.getHeaders() });
    }
  
    // Actualizar un material
    updateMaterial(id: number, material: any): Observable<any> {
      return this.http.put(`${this.baseUrl}/${id}`, material, { headers: this.getHeaders() });
    }
  
    // Eliminar un material (opcional, si necesitas esta funcionalidad)
    deleteMaterial(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders() });
    }
  
  
}
