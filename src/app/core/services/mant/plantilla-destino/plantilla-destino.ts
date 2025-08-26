import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Plantilla_DestinoI } from '../../../interfaces/Plantilla_Destino';

@Injectable({
  providedIn: 'root',
})
export class PlantillaDestinoS {
  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = environment.token;
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
    });
  }

  getAllPlantillas(): Observable<{
    data: Plantilla_DestinoI[];
    count: number;
    success: boolean;
    message: string;
    error: any;
  }> {
    return this.http.post<{
      data: Plantilla_DestinoI[];
      count: number;
      success: boolean;
      message: string;
      error: any;
    }>(
      `${environment.plantillaDestinoApiUrl}/SEL`,
      {},
      { headers: this.getHeaders() }
    );
  }

  plantillaDestinoCrud(
    plantillas: Plantilla_DestinoI,
    action: string
  ): Observable<any> {
    const url = `${environment.plantillaDestinoApiUrl}/${action}`;
    return this.http.post<any>(url, plantillas, {
      headers: this.getHeaders(),
    });
  }
}
