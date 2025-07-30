import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Plantilla_DestinoI } from '../../../interfaces/Plantilla_Destino';


@Injectable({
  providedIn: 'root'
})
export class PlantillaDestinoS {
    http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
    });
  }

  getAllPlantillas(): Observable<{ result: { data: Plantilla_DestinoI[] } }> {
    return this.http.get<{ result: { data: Plantilla_DestinoI[] } }>(
      environment.getAllPlantillaDestino,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
