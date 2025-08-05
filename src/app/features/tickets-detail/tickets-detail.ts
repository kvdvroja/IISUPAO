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
import { Router } from '@angular/router';
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
    Navbar
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
  tickets: TicketI[] = [];
  ticketId: string = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.ticketId = params.get('id') || ''; // 'id' es el nombre del parámetro de la ruta
      console.log('ID del ticket:', this.ticketId); // Aquí obtienes el valor de la URL
    });
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.ticketsService.getTicket(this.ticketId).subscribe({
      next: (res) => {
        this.tickets = res.result.data;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error al cargar sistemas', err),
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
    return (
      {
        abierto: 'danger',
        en_proceso: 'warning',
        cerrado: 'success',
      }[estado] ?? 'info'
    );
  }

  getPrioridadSeverity(prioridad: string): string {
    return (
      {
        alta: 'danger',
        media: 'info',
        baja: 'success',
      }[prioridad] ?? 'info'
    );
  }
}
