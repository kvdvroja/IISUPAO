import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { TicketI } from '../../interfaces/Ticket';

@Injectable({
  providedIn: 'root',
})
export class TicketsS {
  http = inject(HttpClient);

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Accept: 'application/json',
    });
  }

  getAllTickets(): Observable<{
    result: { data: TicketI[]; count: number; message: string; error: any };
  }> {
    return this.http.get<{
      result: { data: TicketI[]; count: number; message: string; error: any };
    }>(environment.getAllTickets, {
      headers: this.getHeaders(),
    });
  }

  ticketsCrud(tickets: TicketI, action: string): Observable<any> {
    const url = `${environment.TicketsCrudUrl}?action=${action}`;
    return this.http.post<any>(url, tickets, {
      headers: this.getHeaders(),
    });
  }

  getTicket(id: string): Observable<{
    result: { data: TicketI[]; count: number; message: string; error: any };
  }> {
    return this.http.get<{
      result: { data: TicketI[]; count: number; message: string; error: any };
    }>(`${environment.getAllTickets}?ticket_id=${id}`, {
      headers: this.getHeaders(),
    });
  }
}
