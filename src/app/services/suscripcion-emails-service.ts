import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SuscripcionEmail {
  id: number;
  email: string;
  fecha?: string;
  activo?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SuscripcionEmailsService {

  private apiUrl = '/api/acaponemopaa';

  constructor(private http: HttpClient) {}

  // Obtener todos los emails
  getSuscripciones(): Observable<SuscripcionEmail[]> {
    return this.http.get<SuscripcionEmail[]>(this.apiUrl);
  }

  // Guardar email
  agregarEmail(email: string): Observable<SuscripcionEmail> {
    const payload: SuscripcionEmail = {
      id: Date.now(),
      email,
      fecha: new Date().toISOString(),
      activo: true
    };

    return this.http.post<SuscripcionEmail>(this.apiUrl, payload);
  }

  // Eliminar suscripción
  eliminarEmail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
