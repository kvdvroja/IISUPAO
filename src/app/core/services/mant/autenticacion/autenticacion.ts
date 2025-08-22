import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { AutenticacionI } from '../../../interfaces/Autenticacion';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionS {
  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = environment.token;
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
    });
  }

  getAllAutenticacion(): Observable<{ result: { data: AutenticacionI[] } }> {
    return this.http.get<{ result: { data: AutenticacionI[] } }>(
      environment.getAllAutenticacion,
      {
        headers: this.getHeaders(),
      }
    );
  }

  autenticacionCrud(cola: any, action: string): Observable<any> {
    const url = `${environment.autenticacionCrudUrl}?action=${action}`; // Agregar el parámetro 'action' a la URL
    return this.http.post<any>(url, cola, {
      headers: this.getHeaders(),
    });
  }
}
