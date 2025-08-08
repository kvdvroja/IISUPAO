import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
import { Input } from '@angular/core';
import { SelectModule } from 'primeng/select';
import { TransformacionValorS } from '../../core/services/mant/transformacion-valor/transformacion-valor';

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
  @Input() campoId!: string | null | undefined;
  transformacionValoresService = inject(TransformacionValorS);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmService = inject(ConfirmationService);
  pantallaPequena = false;
  mostrarDialogoAgregar = false;

  valores: Transformacion_ValorI[] = [];
  nuevoValor: any = {
    vt_camp_tran_id: '',
    vt_valor_origen: '',
    vt_valor_destino: '',
  };

  get valoresFiltrados(): Transformacion_ValorI[] {
    return this.valores;
  }

  ngOnInit(): void {
    this.cargarData();
  }

  cargarData(): void {
    this.transformacionValoresService.getAllTransformacionValor().subscribe({
      next: (response) => {
        this.valores = response.result.data;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando la data.', err);
      },
    });
  }

  filtrarGlobal(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(valor, 'contains');
  }

  editar(valor: Transformacion_ValorI): void {
    this.nuevoValor = { ...valor };
    this.mostrarDialogoAgregar = true;
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
  }

  filtrarDesdePadre(valor: string): void {
    if (this.dt) {
      this.dt.filterGlobal(valor, 'contains');
    }
  }

  guardarNuevoValor(): void {
    if (
      !this.nuevoValor.vt_camp_tran_id ||
      !this.nuevoValor.vt_valor_origen ||
      !this.nuevoValor.vt_valor_destino
    )
      return;

    if (!this.nuevoValor.vt_id) {
      // Eliminar vt_id para el caso de inserción
      this.nuevoValor.vt_id = null; // Asegúrate de eliminar vt_id en la inserción
    }

    // Si tiene vt_id, es una actualización
    const accion = this.nuevoValor.vt_id ? 'U' : 'I';

    this.transformacionValoresService
      .transformacionValoresCrud(this.nuevoValor, accion)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: this.nuevoValor.vt_id
              ? 'Valor actualizado'
              : 'Valor registrado',
            detail: 'Operación exitosa',
          });
          this.cargarData();
          this.cerrarDialogoAgregar();
        },
        error: (err) => {
          console.error('Error al guardar', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo guardar el valor',
          });
        },
      });
  }

  eliminar(valor: Transformacion_ValorI): void {
    this.confirmService.confirm({
      message: `¿Deseas eliminar el valor con ID: ${valor.vt_id}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.transformacionValoresService
          .transformacionValoresCrud(
            { vt_id: valor.vt_id } as Transformacion_ValorI,
            'D'
          )
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Valor eliminado',
                detail: 'El valor fue eliminado exitosamente.',
              });
              this.cargarData();
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el valor',
              });
              console.error(err);
            },
          });
      },
    });
  }
}
