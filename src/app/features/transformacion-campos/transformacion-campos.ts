import { Component, OnInit,inject } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
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
import { Transformacion_CamposI } from '../../core/interfaces/Transformacion_Campos';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { TransformacionCampoS } from '../../core/services/mant/transformacion-campo/transformacion-campo';

@Component({
  selector: 'app-transformacion-campos',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    RouterModule,
    InputIcon,
    IconField,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    Dialog,
    Toast
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './transformacion-campos.html',
  styleUrl: './transformacion-campos.css',
})
export class TransformacionCampos implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  transformacionCamposService = inject(TransformacionCampoS);
  cdRef = inject(ChangeDetectorRef);
  pantallaPequena = false;
  mostrarDialogoAgregar = false;

  campos: Transformacion_CamposI[] = [];

  nuevoCampo: Transformacion_CamposI = {
    ct_id: '',
    ct_campo_origen: '',
    ct_campo_destino: '',
    ct_tipo_transformacion: '',
    ct_validacion: '',
    ct_obligatorio: '',
    ct_usua_id: '',
    ct_fecha_actividad: '',
    pd_id: ''
  };

  ngOnInit(): void {
    this.cargarData();
  }

  cargarData(): void {
    this.transformacionCamposService.getAllTransformacionCampos().subscribe({
      next: (response) => {
        this.campos = response.result.data;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando plantillas destino', err);
      },
    });
  }


  get datosFiltrados(): Transformacion_CamposI[] {
    return this.campos;
  }

  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt1.filterGlobal(valor, 'contains');
  }

  Agregar(): void {
    this.mostrarDialogoAgregar = true;
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
  }

  guardarNuevo(): void {
    const nuevo = { ...this.nuevoCampo };
    nuevo.ct_id = Date.now().toString();
    nuevo.ct_fecha_actividad = new Date().toISOString();
    nuevo.ct_usua_id = 'USR001';
    this.campos.push(nuevo);
    this.mostrarDialogoAgregar = false;
  }

  showEditar(campo: Transformacion_CamposI): void {
    console.log('Editar campo:', campo);
  }
}