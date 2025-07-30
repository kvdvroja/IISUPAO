import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { SistemasI } from '../../../interfaces/Sistemas';

@Injectable({
  providedIn: 'root'
})
export class SistemasS {
    http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
    });
  }

  getAllSistemas(): Observable<{ result: { data: SistemasI[] } }> {
    return this.http.get<{ result: { data: SistemasI[] } }>(
      environment.getAllSistemas,
      {
        headers: this.getHeaders(),
      }
    );
  }
}
