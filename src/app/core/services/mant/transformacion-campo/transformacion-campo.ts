import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Transformacion_CamposI } from '../../../interfaces/Transformacion_Campos';

@Injectable({
  providedIn: 'root',
})
export class TransformacionCampoS {
  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = environment.token;
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
    });
  }

  getAllTransformacionCampos(): Observable<{
    result: { data: Transformacion_CamposI[] };
  }> {
    return this.http.get<{ result: { data: Transformacion_CamposI[] } }>(
      environment.getAlltransformacionCampos,
      {
        headers: this.getHeaders(),
      }
    );
  }

  transformacionCamposCrud(
    campos: Transformacion_CamposI,
    action: string
  ): Observable<any> {
    const url = `${environment.transformacionCamposCrudUrl}?action=${action}`; // Agregar el parámetro 'action' a la URL
    return this.http.post<any>(url, campos, {
      headers: this.getHeaders(),
    });
  }
}
