import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ColaI } from '../../../interfaces/Cola';


@Injectable({
  providedIn: 'root'
})
export class ColaS {
    http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
    });
  }

  getAllColas(): Observable<{ result: { data: ColaI[] } }> {
    return this.http.get<{ result: { data: ColaI[] } }>(
      environment.getAllColas,
      {
        headers: this.getHeaders(),
      }
    );
  }

  colasCrud(cola: any, action: string): Observable<any> {
    const url = `${environment.colasCrudUrl}?action=${action}`; // Agregar el parámetro 'action' a la URL
    return this.http.post<any>(url, cola, {
      headers: this.getHeaders(),
    });
  }
}
