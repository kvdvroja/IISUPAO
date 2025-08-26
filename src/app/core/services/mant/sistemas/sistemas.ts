import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SistemasI } from '../../../interfaces/Sistemas';

@Injectable({
  providedIn: 'root',
})
export class SistemasS {
  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = environment.token;
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
    });
  }

  getAllSistemas(): Observable<{ data: SistemasI[], count: number, success: boolean, message: string, error: any }> {
    return this.http.post<{ data: SistemasI[], count: number, success: boolean, message: string, error: any }>(
      `${environment.sistemasApiUrl}/SEL`,
      {},
      { headers: this.getHeaders() }
    );
  }

  sistemasCrud(sistemas: SistemasI, action: string): Observable<any> {
    const url = `${environment.sistemasApiUrl}/${action}`;
    return this.http.post<any>(url, sistemas, {
      headers: this.getHeaders(),
    });
  }
}
