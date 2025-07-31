import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { Table } from 'primeng/table';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { Toast } from 'primeng/toast';
import { ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { EndpointI } from '../../core/interfaces/Endpoint';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ChangeDetectorRef } from '@angular/core';
import { inject } from '@angular/core';
import { Endpoint } from '../../core/services/mant/endpoint/endpoint';

@Component({
  selector: 'app-endpoints',
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
    SelectModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './endpoints.html',
  styleUrl: './endpoints.css',
})
export class Endpoints implements OnInit{
  @ViewChild('dt') dt!: Table;
  endpointService = inject(Endpoint);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  pantallaPequena = false;
  mostrarSoloPendientes: boolean = false;
  mostrarDialogoAgregar: boolean = false;
  registroExitoso: boolean = false;
  endpoint!: EndpointI[];
  opcionesTransformacion = [
    { label: 'Sí', value: true },
    { label: 'No', value: false },
  ];
  nuevoEndpoint: any = {
    se_sistema_id: '',
    se_nombre: '',
    se_url: '',
    se_metodo_http: '',
    se_requiere_transformar: false,
    se_usua_id: '',
    se_ind_estado: '',
  };

  endpointParaEditar: any = {
    se_id: '',
    se_sistema_id: '',
    se_nombre: '',
    se_url: '',
    se_metodo_http: '',
    se_requiere_transformar: false,
    se_usua_id: '',
    se_ind_estado: '',
  };
  ngOnInit(): void {
    this.cargarEndpoints();
  }

  // ngAfterViewInit(): void {
  //   this.cdRef.detectChanges();
  // }
  filtrarGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }

  get endpointsFiltrados(): any[] {
    return this.endpoint;
  }

  cargarEndpoints(): void {
    this.endpointService.getAllEndpoints().subscribe({
      next: (response) => {
        this.endpoint = response.result.data;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando endpoints', err);
      },
    });
  }

  showEditar(endpoint: EndpointI): void {
    // Llenamos el formulario con los datos del endpoint que se va a editar
    this.nuevoEndpoint = { ...endpoint }; // Usamos el operador spread para copiar los datos del endpoint

    // Abrimos el diálogo de agregar, pero en este caso será un diálogo de edición
    this.mostrarDialogoAgregar = true;
  }

  AgregarEndpoint(): void {
    this.mostrarDialogoAgregar = true;
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
    this.limpiarFormulario(); // Limpiar formulario al cerrar
  }

  limpiarFormulario(): void {
    this.nuevoEndpoint = {
      se_sistema_id: '',
      se_nombre: '',
      se_url: '',
      se_metodo_http: '',
      se_requiere_transformar: false,
      se_usua_id: '',
      se_ind_estado: '',
    };
  }

  guardarNuevoEndpoint(): void {
    if (
      !this.nuevoEndpoint.se_sistema_id ||
      !this.nuevoEndpoint.se_nombre ||
      !this.nuevoEndpoint.se_url ||
      !this.nuevoEndpoint.se_metodo_http
    ) {
      return;
    }

    this.nuevoEndpoint.se_usua_id = 'ADMIN';
    this.nuevoEndpoint.se_ind_estado = 'A';

    // Si se está editando, pasamos la acción 'U' (Update), si no, 'I' (Insert)
    const action = this.nuevoEndpoint.se_id ? 'U' : 'I';

    this.endpointService.endpointCrud(this.nuevoEndpoint, action).subscribe({
      next: (response) => {
        console.log(
          action === 'I' ? 'Nuevo endpoint agregado' : 'Endpoint actualizado',
          response
        );
        this.registroExitoso = true;
        this.cargarEndpoints();
        this.cerrarDialogoAgregar();
      },
      error: (err) => {
        console.error(
          action === 'I'
            ? 'Error al agregar endpoint'
            : 'Error al actualizar endpoint',
          err
        );
      },
    });
  }

  eliminarEndpoint(endpoint: any): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este endpoint?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.endpointService.endpointCrud(endpoint, 'D').subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Endpoint eliminado',
              detail: 'El endpoint fue eliminado exitosamente.',
            });
            this.cargarEndpoints(); // Recargar la tabla
          },
          error: (err) => {
            console.error('Error al eliminar endpoint', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un error al eliminar el endpoint.',
            });
          },
        });
      },
      reject: () => {
        // Acción de cancelación si se rechaza la confirmación
        console.log('Eliminación cancelada');
      },
    });
  }
}
