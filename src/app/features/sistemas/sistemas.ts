import { Component, OnInit, inject } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { Table } from 'primeng/table';
import { InputIcon } from 'primeng/inputicon';
import { ChangeDetectorRef } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { Toast } from 'primeng/toast';
import { ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { SistemasI } from '../../core/interfaces/Sistemas';
import { FormsModule } from '@angular/forms';
import { SistemasS } from '../../core/services/mant/sistemas/sistemas';

@Component({
  selector: 'app-sistemas',
  imports: [
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    RouterModule,
    CommonModule,
    FormsModule,
    InputIcon,
    IconField,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    Dialog,
    Toast,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './sistemas.html',
  styleUrl: './sistemas.css',
})
export class Sistemas implements OnInit {
  sistemasService = inject(SistemasS);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmService = inject(ConfirmationService);
  @ViewChild('dt1') dt1!: Table;
  pantallaPequena = false;
  mostrarSoloPendientes: boolean = false;
  mostrarDialogoAgregar: boolean = false;
  registroExitoso: boolean = false;
  sistemas!: SistemasI[];
  editando: boolean = false;
  nuevoSistema: any = {
    sistema_id: '',
    sistema_nombre: '',
    sistema_descripcion: '',
    sistema_usua_id: '',
    sistema_ind_estado: '',
  };
  ngOnInit(): void {
    this.cargarSistemas();
  }

  get sistemasFiltradas(): any[] {
    return this.sistemas;
  }

  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt1?.filterGlobal(valor, 'contains');
  }

  cargarSistemas(): void {
    this.sistemasService.getAllSistemas().subscribe({
      next: (res) => {
        this.sistemas = res.result.data;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error al cargar sistemas', err),
    });
  }

  AgregarSistema(): void {
    this.mostrarDialogoAgregar = true;
    this.editando = false;
    this.limpiarFormulario();
  }

  mapToPayload(sistema: any): any {
    return {
      system_id: sistema.sistema_id,
      system_name: sistema.sistema_nombre,
      system_description: sistema.sistema_descripcion,
      system_status: sistema.sistema_ind_estado,
      user_id: sistema.sistema_usua_id,
    };
  }

  showEditar(sistema: SistemasI): void {
    this.editando = true;
    this.mostrarDialogoAgregar = true;
    this.nuevoSistema = { ...sistema };
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
    this.editando = false;
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.nuevoSistema = {
      sistema_id: '',
      sistema_nombre: '',
      sistema_descripcion: '',
      sistema_usua_id: '',
      sistema_ind_estado: '',
    };
  }

  guardarNuevoSistema(): void {
    if (!this.nuevoSistema.sistema_id || !this.nuevoSistema.sistema_nombre || !this.nuevoSistema.sistema_descripcion)
      return;

    this.nuevoSistema.sistema_usua_id = 'ADMIN';
    this.nuevoSistema.sistema_ind_estado = 'A';

    const accion = this.editando ? 'U' : 'I';
    const payload = this.mapToPayload(this.nuevoSistema);

    this.sistemasService.sistemasCrud(payload as any, accion).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.editando ? 'Sistema actualizado' : 'Sistema registrado',
          detail: 'Operación exitosa',
        });
        this.cerrarDialogoAgregar();
        this.cargarSistemas();
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo guardar el sistema',
        });
        console.error(err);
      },
    });
  }

  eliminarSistema(sistema: SistemasI): void {
    this.confirmService.confirm({
      message: `¿Deseas eliminar el sistema "${sistema.sistema_nombre}"?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const payload = {
          system_id: sistema.sistema_id,
          user_id: 'ADMIN',
        };

        this.sistemasService.sistemasCrud(payload as any, 'D').subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sistema eliminado',
              detail: 'El sistema fue eliminado exitosamente.',
            });
            this.cargarSistemas();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el sistema',
            });
            console.error(err);
          },
        });
      },
    });
  }
}
