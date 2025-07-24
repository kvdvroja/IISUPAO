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
import { SistemasI } from '../../core/interfaces/Sistemas';
import { FormsModule } from '@angular/forms';

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
  @ViewChild('dt1') dt1!: Table;
  pantallaPequena = false;
  mostrarSoloPendientes: boolean = false;
  mostrarDialogoAgregar: boolean = false;
  registroExitoso: boolean = false;
  sistemas!: SistemasI[];

  nuevoSistema: {
    nombre: string;
    descripcion: string;
  } = {
    nombre: '',
    descripcion: '',
  };
  ngOnInit(): void {}
  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt1.filterGlobal(valor, 'contains');
  }

  get sistemasFiltradas(): SistemasI[] {
    if (!this.mostrarSoloPendientes) {
      return this.sistemas;
    }

    return this.sistemas;
  }

  showEditar(sistema: any): void {}

  AgregarSistema(): void {
    this.mostrarDialogoAgregar = true;
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
  }

    guardarNuevoSistema(): void {
    if (
      !this.nuevoSistema.nombre ||
      !this.nuevoSistema.descripcion 
    ) {
      return;
    }
  }
}
