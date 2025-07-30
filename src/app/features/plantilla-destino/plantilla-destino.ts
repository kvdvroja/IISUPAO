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
    IconField,
  ],
  providers: [MessageService, ConfirmationService],
})
export class PlantillaDestino implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  plantillaDestinoService = inject(PlantillaDestinoS);
  cdRef = inject(ChangeDetectorRef);
  pantallaPequena = false;
  mostrarDialogoAgregar: boolean = false;
  plantillaDestinos: Plantilla_DestinoI[] = [];

  nuevo: Plantilla_DestinoI = {
    pd_id: '',
    pd_plan_inte_id: '',
    pd_prioridad: '',
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

  showEditar(row: Plantilla_DestinoI): void {}

  Agregar(): void {
    this.mostrarDialogoAgregar = true;
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
  }

  guardarNuevo(): void {}
}
