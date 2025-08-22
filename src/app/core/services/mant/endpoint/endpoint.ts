import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { EndpointI } from '../../../interfaces/Endpoint';

@Injectable({
  providedIn: 'root',
})
export class Endpoint {
  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = environment.token;
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
    });
  }

  getAllEndpoints(): Observable<{ result: { data: EndpointI[] } }> {
    return this.http.get<{ result: { data: EndpointI[] } }>(
      environment.getAllEndpoints,
      {
        headers: this.getHeaders(),
      }
    );
  }

  endpointCrud(endpoint: EndpointI, action: string): Observable<any> {
    const url = `${environment.EndpointCrudUrl}?action=${action}`; // Agregar el parámetro 'action' a la URL
    return this.http.post<any>(url, endpoint, {
      headers: this.getHeaders(),
    });
  }
}
