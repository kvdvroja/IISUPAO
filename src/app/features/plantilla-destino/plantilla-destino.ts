import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ChangeDetectorRef } from '@angular/core';
import { Toast } from 'primeng/toast';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Plantilla_DestinoI } from '../../core/interfaces/Plantilla_Destino';
import { PlantillaDestinoS } from '../../core/services/mant/plantilla-destino/plantilla-destino';

@Component({
  selector: 'app-plantilla-destino',
  standalone: true,
  templateUrl: './plantilla-destino.html',
  styleUrl: './plantilla-destino.css',
  imports: [
    CommonModule,
    FormsModule,
    ConfirmDialogModule,
    TableModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    Dialog,
    Toast,
    InputIcon,
    SelectModule,
    IconField,
  ],
  providers: [MessageService, ConfirmationService],
})
export class PlantillaDestino implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  plantillaDestinoService = inject(PlantillaDestinoS);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmService = inject(ConfirmationService);
  pantallaPequena = false;
  mostrarDialogoAgregar: boolean = false;
  plantillaDestinos: Plantilla_DestinoI[] = [];
  editando: boolean = false;

  transformacionOptions = [
    { label: 'Directa', value: 'DIRECTA' },
    { label: 'Mapeo', value: 'MAPEO' },
    { label: 'Custom', value: 'CUSTOM' },
  ];

  nuevo: any = {
    pd_plan_inte_id: '',
    pd_priodridad: '',
    pd_ind_estado: '',
    pd_sist_dest_id: '',
    pd_schema: '',
    pd_sist_id: '',
    pd_url: '',
    pd_metodo_http: '',
    pd_tipo_transformacion: '',
  };

  ngOnInit(): void {
    this.cargarPlantillas();
  }

  cargarPlantillas(): void {
    this.plantillaDestinoService.getAllPlantillas().subscribe({
      next: (response) => {
        this.plantillaDestinos = response.result.data;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando plantillas destino', err);
      },
    });
  }
  get datosFiltrados(): Plantilla_DestinoI[] {
    return this.plantillaDestinos;
  }

  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt1.filterGlobal(valor, 'contains');
  }

  showEditar(row: Plantilla_DestinoI): void {
    this.editando = true;
    this.mostrarDialogoAgregar = true;
    this.nuevo = { ...row }; // Pasamos los datos del sistema a los campos del formulario
  }

  Agregar(): void {
    this.mostrarDialogoAgregar = true;
    this.editando = false; // Se asegura de que se esté en modo "nuevo"
    this.limpiarFormulario();
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
  }

  limpiarFormulario(): void {
    this.nuevo = {
      pd_id: '',
      pd_plan_inte_id: '',
      pd_prioridad: '',
      pd_ind_estado: 'A',
      pd_sist_dest_id: '',
      pd_schema: '',
      pd_sist_id: '',
      pd_url: '',
      pd_metodo_http: '',
      pd_tipo_transformacion: '',
    };
  }
  guardarNuevo(): void {
    if (
      !this.nuevo.pd_plan_inte_id ||
      !this.nuevo.pd_prioridad ||
      !this.nuevo.pd_sist_dest_id ||
      !this.nuevo.pd_url ||
      !this.nuevo.pd_metodo_http ||
      !this.nuevo.pd_tipo_transformacion
    )
      return;

    // Eliminar pd_id del payload en caso de inserción
    if (!this.editando) {
      this.nuevo.pd_id = null; // Eliminar pd_id para no enviarlo en la inserción
    }

    // Si estamos editando, aseguramos que pd_id esté presente y sea un número
    if (this.editando && this.nuevo.pd_id) {
      this.nuevo.pd_id = Number(this.nuevo.pd_id); // Convertir a número si es necesario
    }

    const accion = this.editando ? 'U' : 'I'; // 'U' para actualizar, 'I' para insertar
    const payload = { ...this.nuevo }; // Usamos el objeto "nuevo" como payload

    this.plantillaDestinoService
      .plantillaDestinoCrud(payload as any, accion)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: this.editando
              ? 'Plantilla actualizada'
              : 'Plantilla registrada',
            detail: 'Operación exitosa',
          });
          this.cerrarDialogoAgregar();
          this.cargarPlantillas();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo guardar la plantilla destino',
          });
          console.error(err);
        },
      });
  }

  eliminar(row: Plantilla_DestinoI): void {
    this.confirmService.confirm({
      message: `¿Deseas eliminar la plantilla destino con ID: ${row.pd_id}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const payload = { pd_id: row.pd_id }; // Solo se necesita el ID para eliminar

        this.plantillaDestinoService
          .plantillaDestinoCrud(payload as any, 'D')
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Plantilla eliminada',
                detail: 'La plantilla destino fue eliminada exitosamente.',
              });
              this.cargarPlantillas();
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar la plantilla destino',
              });
              console.error(err);
            },
          });
      },
    });
  }
}
