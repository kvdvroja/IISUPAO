import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Transformacion_CamposI } from '../../../interfaces/Transformacion_Campos';


@Injectable({
  providedIn: 'root'
})
export class TransformacionCampoS {
      http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
    });
  }

  getAllTransformacionCampos(): Observable<{ result: { data: Transformacion_CamposI[] } }> {
    return this.http.get<{ result: { data: Transformacion_CamposI[] } }>(
      environment.getAlltransformacionCampos,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
