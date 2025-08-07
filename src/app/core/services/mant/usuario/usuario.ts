import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { UsuarioI } from '../../../interfaces/Usuario';

@Injectable({
  providedIn: 'root'
})
export class Usuario {
  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
    });
  }

  getAllUsuarios(): Observable<{ result: { data: UsuarioI[] } }> {
    return this.http.get<{ result: { data: UsuarioI[] } }>(
      environment.getAllUsuarios,
      {
        headers: this.getHeaders(),
      }
    );
  }

  usuarioCrud(usuario: any, action: string): Observable<any> {
    const url = `${environment.UsuarioCrudUrl}?action=${action}`; // Agregar el parámetro 'action' a la URL
    return this.http.post<any>(url, usuario, {
      headers: this.getHeaders(),
    });
  }
}

