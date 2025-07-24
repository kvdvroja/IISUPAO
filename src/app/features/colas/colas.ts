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
import { ColaI } from '../../core/interfaces/Cola';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
@Component({
  selector: 'app-colas',
  standalone: true,
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
    Toast
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './colas.html',
  styleUrl: './colas.css',
})
export class Colas implements OnInit {
  @ViewChild('dt') dt!: Table;

  pantallaPequena = false;
  mostrarDialogoAgregar = false;
  registroExitoso = false;

  colas: ColaI[] = [];

  nuevaCola: ColaI = {
    cola_id: '',
    cola_nombre: '',
    cola_usua_id: '',
    cola_fecha_actividad: '',
    cola_ind_estado: ''
  };

  ngOnInit(): void {
    // Aquí podrías cargar los datos desde un servicio
  }

  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(valor, 'contains');
  }

  get colasFiltradas(): ColaI[] {
    return this.colas;
  }

  showEditar(cola: ColaI): void {
    console.log('Editar cola:', cola);
  }

  AgregarCola(): void {
    this.mostrarDialogoAgregar = true;
    this.nuevaCola = {
      cola_id: '',
      cola_nombre: '',
      cola_usua_id: '',
      cola_fecha_actividad: '',
      cola_ind_estado: ''
    };
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
  }

  guardarNuevaCola(): void {
    const nueva = { ...this.nuevaCola };
    nueva.cola_id = Date.now().toString();
    nueva.cola_fecha_actividad = new Date().toISOString();
    nueva.cola_ind_estado = 'Activo';
    nueva.cola_usua_id = 'USR123'; // valor simulado

    this.colas.push(nueva);
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = true;
  }
}
