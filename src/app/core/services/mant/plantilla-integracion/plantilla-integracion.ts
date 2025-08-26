import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Plantilla_IntegracionI } from '../../../interfaces/Plantilla_Integracion';

@Injectable({
  providedIn: 'root',
})
export class PlantillaIntegracionS {
  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    const token = environment.token;
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
    });
  }


    getAllPlantillas(): Observable<{ data: Plantilla_IntegracionI[], count: number, success: boolean, message: string, error: any }> {
    return this.http.post<{ data: Plantilla_IntegracionI[], count: number, success: boolean, message: string, error: any }>(
      `${environment.plantillaIntegracionApiUrl}/SEL`,
      {},
      { headers: this.getHeaders() }
    );
  }


    plantillaIntegracionCrud(plantilla: Plantilla_IntegracionI, action: string): Observable<any> {
    const url = `${environment.plantillaIntegracionApiUrl}/${action}`;
    return this.http.post<any>(url, plantilla, {
      headers: this.getHeaders(),
    });
  }
}
