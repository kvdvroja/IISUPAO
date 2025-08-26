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

  getAllEndpoints(): Observable<{
    data: EndpointI[];
    count: number;
    success: boolean;
    message: string;
    error: any;
  }> {
    return this.http.post<{
      data: EndpointI[];
      count: number;
      success: boolean;
      message: string;
      error: any;
    }>(
      `${environment.endpointsApiUrl}/SEL`,
      {},
      { headers: this.getHeaders() }
    );
  }

  endpointCrud(sistemas: EndpointI, action: string): Observable<any> {
    const url = `${environment.endpointsApiUrl}/${action}`;
    return this.http.post<any>(url, sistemas, {
      headers: this.getHeaders(),
    });
  }
}
