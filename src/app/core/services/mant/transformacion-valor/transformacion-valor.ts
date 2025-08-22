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
    result: { data: Transformacion_ValorI[] };
  }> {
    return this.http.get<{ result: { data: Transformacion_ValorI[] } }>(
      environment.getAlltransformacionValores,
      {
        headers: this.getHeaders(),
      }
    );
  }

  transformacionValoresCrud(
    sistemas: Transformacion_ValorI,
    action: string
  ): Observable<any> {
    const url = `${environment.transformacionValoresCrudUrl}?action=${action}`; // Agregar el parámetro 'action' a la URL
    return this.http.post<any>(url, sistemas, {
      headers: this.getHeaders(),
    });
  }
}
