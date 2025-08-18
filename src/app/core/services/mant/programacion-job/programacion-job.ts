import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { Programacion_JobI } from '../../../interfaces/Programacion_Job';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionJobS {
    http = inject(HttpClient);
  
    private getHeaders(): HttpHeaders {
      return new HttpHeaders({
        Accept: 'application/json',
      });
    }
  
    getAllProgramacionJob(): Observable<{ result: { data: Programacion_JobI[] } }> {
      return this.http.get<{ result: { data: Programacion_JobI[] } }>(
        environment.getAllProgramacionJob,
        {
          headers: this.getHeaders(),
        }
      );
    }
  
    programacionJobCrud(sistemas: Programacion_JobI, action: string): Observable<any> {
      const url = `${environment.programacionJobCrudUrl}?action=${action}`; // Agregar el parámetro 'action' a la URL
      return this.http.post<any>(url, sistemas, {
        headers: this.getHeaders(),
      });
    }
}
