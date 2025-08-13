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
import { TransformacionCampoS } from '../../core/services/mant/transformacion-campo/transformacion-campo';

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
    SelectModule,
  ]
})
export class TransformacionValores implements OnInit {
  @ViewChild('dt') dt!: Table;
  @Input() campoId!: string | null | undefined;
  transformacionValoresService = inject(TransformacionValorS);
  transformacionCamposService = inject(TransformacionCampoS);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmService = inject(ConfirmationService);
  pantallaPequena = false;
  camposOptions: Array<{ label: string; value: number | string }> = [];
  private camposMap = new Map<number | string, string>();

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
    this.cargarCamposTransformacion();
    this.cargarData();
  }

  cargarCamposTransformacion(): void {
    // Ajusta este método al servicio real que tengas para "Campos de Transformación".
    // Si lo expone tu mismo servicio, úsalo. Si tienes otro (p.ej. TransformacionCampoS), cámbialo aquí.
    this.transformacionCamposService.getAllTransformacionCampos().subscribe({
      next: (resp) => {
        const data = resp.result?.data ?? [];
        // Asumiendo que cada item tiene ct_id y ct_campo_destino (ajusta según tu API)
        this.camposOptions = data.map((c: any) => ({
          value: c.ct_id,
          label: `${c.ct_id} - ${c.ct_campo_destino}`,
        }));
        // Crea el mapa para mostrar label por id
        this.camposMap.clear();
        this.camposOptions.forEach((o) => this.camposMap.set(o.value, o.label));
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando Campos de Transformación', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo cargar la lista de Campos de Transformación',
        });
      },
    });
  }

  getCampoLabel(id: number | string | null | undefined): string {
    if (id == null) return '';
    return this.camposMap.get(id) ?? String(id);
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

  abrirAgregar(opts?: { vt_camp_tran_id?: string | number }): void {
    this.nuevoValor = {
      vt_camp_tran_id: opts?.vt_camp_tran_id ?? '',
      vt_valor_origen: '',
      vt_valor_destino: '',
    };
    this.mostrarDialogoAgregar = true;
    this.cdRef.detectChanges();
  }
}
