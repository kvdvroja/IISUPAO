import { Component, OnInit } from '@angular/core';
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
export class Endpoints {
  @ViewChild('dt1') dt1!: Table;
  pantallaPequena = false;
  mostrarSoloPendientes: boolean = false;
  mostrarDialogoAgregar: boolean = false;
  registroExitoso: boolean = false;
  endpoint!: EndpointI[];
  opcionesTransformacion = [
    { label: 'Sí', value: 'S' },
    { label: 'No', value: 'N' },
  ];
  nuevoEndpoint: EndpointI = {
    se_id: '',
    se_sistema_id: '',
    se_nombre: '',
    se_url: '',
    se_metodo_http: '',
    se_requiere_transformar: '',
    se_usua_id: '',
    se_fecha_actividad: '',
    se_ind_estado: '',
    se_requiere_auth: '',
  };
  ngOnInit(): void {}
  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt1.filterGlobal(valor, 'contains');
  }

  get endpointsFiltrados(): EndpointI[] {
    if (!this.mostrarSoloPendientes) {
      return this.endpoint;
    }

    return this.endpoint;
  }

  showEditar(endpoint: any): void {}

  AgregarEndpoint(): void {
    this.mostrarDialogoAgregar = true;
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
  }

  guardarNuevoEndpoint(): void {}
}
