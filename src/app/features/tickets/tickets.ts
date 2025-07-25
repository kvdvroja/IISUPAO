import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-tickets',
  imports: [RouterModule,Sidebar,Navbar,CommonModule,ButtonModule,SelectModule,TableModule,TagModule,FormsModule],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets implements OnInit {

    tickets = [
    {
      ticket_id: 'TCK-001',
      ticket_nombre: 'Sistema de login no funciona',
      ticket_estado: 'abierto',
      ticket_prioridad: 'alta',
      ticket_fecha_inicio: '2024-01-15T10:30:00Z',
      ticket_codigo: 'SYS-LOGIN-001',
      usuario_nombre: 'Juan Pérez',
      destino_nombre: 'Soporte Técnico',
    },
    {
      ticket_id: 'TCK-002',
      ticket_nombre: 'Solicitud de nuevo usuario',
      ticket_estado: 'en_proceso',
      ticket_prioridad: 'media',
      ticket_fecha_inicio: '2024-01-14T14:20:00Z',
      ticket_codigo: 'USR-REQ-002',
      usuario_nombre: 'María García',
      destino_nombre: 'Recursos Humanos',
    },
    // ...
  ];

  searchTerm = '';
  estadoFiltro = null;
  prioridadFiltro = null;

  estadoOptions = [
    { label: 'Todos los estados', value: null },
    { label: 'Abierto', value: 'abierto' },
    { label: 'En Proceso', value: 'en_proceso' },
    { label: 'Cerrado', value: 'cerrado' },
  ];

  prioridadOptions = [
    { label: 'Todas las prioridades', value: null },
    { label: 'Alta', value: 'alta' },
    { label: 'Media', value: 'media' },
    { label: 'Baja', value: 'baja' },
  ];
  sidebarOpen = true;
  ngOnInit(): void {

  }

  getEstadoCount(estado: string): number {
    return this.tickets.filter((t) => t.ticket_estado === estado).length;
  }

  getEstadoColor(estado: string): string {
    return {
      abierto: 'danger',
      en_proceso: 'warning',
      cerrado: 'success',
    }[estado] || 'info';
  }

  getPrioridadColor(prioridad: string): string {
    return {
      alta: 'danger',
      media: 'info',
      baja: 'success',
    }[prioridad] || 'secondary';
  }

  filteredTickets() {
    return this.tickets.filter((t) => {
      const matchesSearch = [t.ticket_nombre, t.ticket_codigo, t.usuario_nombre]
        .join(' ')
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const matchesEstado = !this.estadoFiltro || t.ticket_estado === this.estadoFiltro;
      const matchesPrioridad = !this.prioridadFiltro || t.ticket_prioridad === this.prioridadFiltro;

      return matchesSearch && matchesEstado && matchesPrioridad;
    });
  }

  verDetalles(id: string) {
    // Aquí puedes usar el router para redirigir: this.router.navigate([`/tickets/${id}`])
    console.log('Ver detalles de', id);
  }

  nuevoTicket() {
    console.log('Crear nuevo ticket');
  }

    toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
