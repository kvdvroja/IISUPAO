import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { FormsModule } from '@angular/forms';
import { TicketsS } from '../../core/services/tickets/tickets';
import { ChangeDetectorRef, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { TicketI } from '../../core/interfaces/Ticket';

@Component({
  selector: 'app-ticket-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CardModule,
    BadgeModule,
    DividerModule,
    InputTextModule,
    TagModule,
    Sidebar,
    Navbar,
    RouterModule
  ],
  templateUrl: './tickets-detail.html',
  styleUrl: './tickets-detail.css',
})
export class TicketsDetail implements OnInit {
  ticketsService = inject(TicketsS);
  cdRef = inject(ChangeDetectorRef);
  route = inject(ActivatedRoute);
  comentario = '';
  sidebarOpen = true;
  ticket?: TicketI; // en vez de tickets: TicketI[] = [];
  ticketId = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.ticketId = params.get('id') ?? '';
      if (this.ticketId) {
        this.cargarTicket();
      }
    });
  }

  cargarTicket(): void {
    this.ticketsService.getTicket(this.ticketId).subscribe({
      next: (res) => {
        // Si tu API devuelve un array, toma el primero; si devuelve un objeto, asígnalo directo
        this.ticket = Array.isArray(res.result.data)
          ? res.result.data[0]
          : res.result.data;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error al cargar ticket', err),
    });
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  getEstadoSeverity(estado: string): string {
    const e = (estado ?? '').toLowerCase();
    const map: Record<string, string> = {
      pendiente: 'warning',
      cancelado: 'danger',
      cerrado: 'success',
      abierto: 'info',
      en_proceso: 'info',
    };
    return map[e] ?? 'info';
  }

  getPrioridadSeverity(prio: string | number | null | undefined): string {
    if (prio == null) return 'info';
    if (typeof prio === 'number') {
      if (prio <= 2) return 'danger';
      if (prio === 3) return 'warning';
      return 'success';
    }
    const p = prio.toString().toLowerCase();
    const map: Record<string, string> = {
      alta: 'danger',
      media: 'warning',
      baja: 'success',
    };
    return map[p] ?? 'info';
  }

  formatEstado(estado?: string): string {
    return (estado ?? '').split('_').join(' ').trim() || 'SIN ESTADO';
  }
}
