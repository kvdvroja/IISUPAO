import { Component } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BadgeModule } from 'primeng/badge'
import { ButtonModule } from 'primeng/button'
import { DividerModule } from 'primeng/divider'
import { InputTextModule } from 'primeng/inputtext'
import { CardModule } from 'primeng/card'
import { TagModule } from 'primeng/tag'
import { FormsModule } from '@angular/forms'

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
  ],
  templateUrl: './tickets-detail.html',
})
export class TicketsDetail{
  comentario = ''
  ticket = {
    ticket_id: 'TCK-001',
    ticket_codigo: 'SYS-LOGIN-001',
    ticket_nombre: 'Sistema de login no funciona',
    ticket_estado: 'abierto',
    ticket_prioridad: 'alta',
    ticket_fecha_inicio: '2024-01-15T10:30:00Z',
    ticket_descripcion:
      'El sistema de autenticación presenta fallas intermitentes que impiden el acceso normal de los usuarios. Se requiere revisión urgente del servidor de autenticación y base de datos de usuarios.',
    ticket_observaciones:
      'Los usuarios reportan que no pueden acceder al sistema desde esta mañana. El error aparece después de ingresar las credenciales correctas.',
    usuario_nombre: 'Juan Pérez',
    usuario_email: 'juan.perez@empresa.com',
    destino_nombre: 'Soporte Técnico',
    logs: [
      {
        fecha: '2024-01-15T10:30:00Z',
        usuario: 'Juan Pérez',
        accion: 'Ticket creado',
        descripcion: 'Ticket inicial creado por el usuario',
      },
      {
        fecha: '2024-01-15T11:15:00Z',
        usuario: 'Ana Soporte',
        accion: 'Asignado',
        descripcion: 'Ticket asignado al equipo de soporte técnico',
      },
      {
        fecha: '2024-01-15T14:20:00Z',
        usuario: 'Carlos Técnico',
        accion: 'En revisión',
        descripcion: 'Iniciando diagnóstico del problema de autenticación',
      },
    ],
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  getEstadoSeverity(estado: string): string {
    return {
      abierto: 'danger',
      en_proceso: 'warning',
      cerrado: 'success',
    }[estado] ?? 'info'
  }

  getPrioridadSeverity(prioridad: string): string {
    return {
      alta: 'danger',
      media: 'info',
      baja: 'success',
    }[prioridad] ?? 'info'
  }
}
