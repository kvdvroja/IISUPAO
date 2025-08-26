import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Transformacion_ValorI } from '../../../interfaces/Transformacion_Valor';

@Injectable({
  providedIn: 'root',
})
export class TransformacionValorS {
  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = environment.token;
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
    });
  }

  getAllTransformacionValor(): Observable<{
    data: Transformacion_ValorI[];
    count: number;
    success: boolean;
    message: string;
    error: any;
  }> {
    return this.http.post<{
      data: Transformacion_ValorI[];
      count: number;
      success: boolean;
      message: string;
      error: any;
    }>(
      `${environment.transformacionValorespiUrl}/SEL`,
      {},
      { headers: this.getHeaders() }
    );
  }

  transformacionValoresCrud(
    sistemas: Transformacion_ValorI,
    action: string
  ): Observable<any> {
    const url = `${environment.transformacionValorespiUrl}/${action}`;
    return this.http.post<any>(url, sistemas, {
      headers: this.getHeaders(),
    });
  }
}
