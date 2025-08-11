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
    return new HttpHeaders({
      Accept: 'application/json',
    });
  }

  getAllPlantillas(): Observable<{
    result: { data: Plantilla_IntegracionI[] };
  }> {
    return this.http.get<{ result: { data: Plantilla_IntegracionI[] } }>(
      environment.getAllPlantillaIntegracion,
      {
        headers: this.getHeaders(),
      }
    );
  }

  plantillaIntegracionCrud(
    plantilla: Plantilla_IntegracionI,
    action: string
  ): Observable<any> {
    const url = `${environment.plantillaIntegracionCrud}?action=${action}`; // Agregar el parámetro 'action' a la URL
    return this.http.post<any>(url, plantilla, {
      headers: this.getHeaders(),
    });
  }
}
