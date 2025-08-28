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
    data: Transformacion_CamposI[];
    count: number;
    success: boolean;
    message: string;
    error: any;
  }> {
    return this.http.post<{
      data: Transformacion_CamposI[];
      count: number;
      success: boolean;
      message: string;
      error: any;
    }>(
      `${environment.transformacionCampospiUrl}/SEL`,
      {},
      { headers: this.getHeaders() }
    );
  }

  transformacionCamposCrud(
    plantillas: Transformacion_CamposI,
    action: string
  ): Observable<any> {
    const url = `${environment.transformacionCampospiUrl}/${action}`;
    return this.http.post<any>(url, plantillas, {
      headers: this.getHeaders(),
    });
  }
}
