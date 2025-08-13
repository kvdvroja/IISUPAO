import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';
import { TicketI } from '../../core/interfaces/Ticket';
import { Router } from '@angular/router';
import { TicketsS } from '../../core/services/tickets/tickets';

@Component({
  selector: 'app-tickets',
  imports: [
    RouterModule,
    Sidebar,
    Navbar,
    CommonModule,
    ButtonModule,
    SelectModule,
    TableModule,
    TagModule,
    FormsModule
  ],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css',
})
export class Tickets implements OnInit {
  ticketsService = inject(TicketsS);
  router = inject(Router);
  cdRef = inject(ChangeDetectorRef);
  tickets: TicketI[] = [];
  totalTickets: number = 0;
  searchTerm = '';
  estadoFiltro = null;
  prioridadFiltro = null;
  rows: number = 10;
  first: number = 0;

  estadoOptions = [
    { label: 'Todos los estados', value: null },
    { label: 'Pendientes', value: 'PENDIENTE' },
    { label: 'Cancelados', value: 'CANCELADO' },
  ];

  prioridadOptions = [
    { label: 'Todas las prioridades', value: null },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];
  sidebarOpen = true;
  ngOnInit(): void {
    this.cargarTickets();
  }

  cargarTickets(): void {
    this.ticketsService.getAllTickets().subscribe({
      next: (res) => {
        this.tickets = res.result.data;
        this.totalTickets = res.result.count;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error al cargar sistemas', err),
    });
  }

  formatEstado(estado?: string): string {
    return (estado ?? '').split('_').join(' ').trim() || 'SIN ESTADO';
  }

  // Si tu prioridad es número (1–5) o string (“ALTA/MEDIA/BAJA”), manejamos ambos
  formatPrioridad(prio: string | number | null | undefined): string {
    if (prio == null) return 'SIN PRIORIDAD';
    if (typeof prio === 'number') return `PRIORIDAD ${prio}`;
    return prio.toString().toUpperCase();
  }

  getEstadoCount(estado: string): number {
    return this.tickets.filter((t) => t.ticket_ind_estado === estado).length;
  }

  getEstadoColor(estado?: string): string {
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

  getPrioridadColor(prio: string | number | null | undefined): string {
    if (prio == null) return 'info';

    // Si es número 1–5 (ajusta a tu criterio)
    if (typeof prio === 'number') {
      if (prio <= 2) return 'danger'; // alta
      if (prio === 3) return 'warning'; // media
      return 'success'; // baja
    }

    // Si llega como texto
    const p = prio.toString().toLowerCase();
    const map: Record<string, string> = {
      alta: 'danger',
      media: 'warning',
      baja: 'success',
    };
    return map[p] ?? 'info';
  }

  filteredTickets() {
    // Calcular los índices de la página actual
    const startIndex = this.first; // El primer índice de la página
    const endIndex = this.first + this.rows; // El índice final de la página

    // Filtrar los tickets con la búsqueda y los filtros
    const filteredData = this.tickets.filter((t) => {
      const matchesSearch = [t.ticket_nombre, t.ticket_codigo, t.ticket_usua_id]
        .join(' ')
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesEstado =
        !this.estadoFiltro || t.ticket_ind_estado === this.estadoFiltro;
      const matchesPrioridad =
        !this.prioridadFiltro || t.ticket_prioridad === this.prioridadFiltro;

      return matchesSearch && matchesEstado && matchesPrioridad;
    });

    // Retornar solo los tickets de la página actual
    return filteredData.slice(startIndex, endIndex);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
    this.cargarTickets();
  }

  verDetalles(id: string) {
    this.router.navigate(['/tickets-detail', id]);
  }

  nuevoTicket() {
    console.log('Crear nuevo ticket');
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
