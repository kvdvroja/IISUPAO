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
import { Transformacion_ValorI } from '../../core/interfaces/Transformacion_Valor';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-transformacion-valor',
  standalone: true,
  templateUrl: './transformacion-valores.html',
  styleUrl: './transformacion-valores.css',
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    IconField,
    InputIcon,
    Dialog,
    Toast,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
})
export class TransformacionValores implements OnInit {
  @ViewChild('dt') dt!: Table;
  pantallaPequena = false;
  mostrarDialogoAgregar = false;

  valores: Transformacion_ValorI[] = [];
  nuevoValor: Transformacion_ValorI = {
    vt_id: '',
    vt_camp_tran_id: '',
    vt_valor_origen: '',
    vt_valor_destino: '',
  };

  get valoresFiltrados(): Transformacion_ValorI[] {
    return this.valores;
  }

  ngOnInit(): void {}

  filtrarGlobal(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(valor, 'contains');
  }

  editar(valor: Transformacion_ValorI): void {
    // lógica para editar
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
  }

  guardarNuevoValor(): void {
    // Aquí deberías enviar el nuevo valor a tu backend o servicio
    this.valores.push({ ...this.nuevoValor });
    this.mostrarDialogoAgregar = false;

    // Reiniciar campos
    this.nuevoValor = {
      vt_id: '',
      vt_camp_tran_id: '',
      vt_valor_origen: '',
      vt_valor_destino: '',
    };
  }
}
