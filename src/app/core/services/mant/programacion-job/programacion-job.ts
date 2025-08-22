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
    const token = environment.token;
    return new HttpHeaders({
      Accept: 'application/json',
      Authorization: `Bearer ${token ?? ''}`,
    });
  }
  
    getAllProgramacionJob(): Observable<{ result: { data: any[] } }> {
      return this.http.get<{ result: { data: any[] } }>(
        environment.getAllProgramacionJob,
        {
          headers: this.getHeaders(),
        }
      );
    }
  
    programacionJobCrud(programacion: any, action: string): Observable<any> {
      const url = `${environment.programacionJobCrudUrl}?action=${action}`; // Agregar el parámetro 'action' a la URL
      return this.http.post<any>(url, programacion, {
        headers: this.getHeaders(),
      });
    }
}
