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
    return new HttpHeaders({
      Accept: 'application/json',
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
}
