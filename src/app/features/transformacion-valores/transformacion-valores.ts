import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject,
} from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { SplitButtonModule } from 'primeng/splitbutton';
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
import { Output, EventEmitter } from '@angular/core';
type StepKey = 'endpoints' | 'integracion' | 'destino' | 'campos' | 'valores';
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
    SplitButtonModule
  ],
})
export class TransformacionValores implements OnInit, OnChanges {
  @ViewChild('dt') dt!: Table;
  @Input() campoId!: string | number | null | undefined;
  @Output() stepNavigate = new EventEmitter<StepKey>();
  transformacionValoresService = inject(TransformacionValorS);
  transformacionCamposService = inject(TransformacionCampoS);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmService = inject(ConfirmationService);
  pantallaPequena = false;
  camposOptions: Array<{ label: string; value: number | string }> = [];
  private camposMap = new Map<number | string, string>();
  private confirmOpen = false;

  mostrarDialogoAgregar = false;

  valores: Transformacion_ValorI[] = [];
  nuevoValor: any = {
    vt_camp_tran_id: '',
    vt_valor_origen: '',
    vt_valor_destino: '',
  };

    accionesDropdown = [
    {
      label: 'Refrescar',
      icon: 'pi pi-refresh',
      command: () => {
        this.cargarData();
      },
    },
    {
      label: 'Exportar',
      icon: 'pi pi-download',
      command: () => this.exportarDatos(),
    },
  ];

  get valoresFiltrados(): Transformacion_ValorI[] {
    const id = Number(this.campoId);
    if (Number.isNaN(id)) return this.valores;
    return this.valores.filter((v) => Number(v.vt_camp_tran_id) === id);
  }

  ngOnInit(): void {
    //this.cargarCamposTransformacion();
    //this.cargarData();
  }

    onBuscarGlobal(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(input, 'contains');
  }

  ngOnChanges(): void {
    this.cargarData();
  }

  exportarDatos(): void {}

  cargarCamposTransformacion(): void {
    this.transformacionCamposService.getAllTransformacionCampos().subscribe({
      next: (resp) => {
        const data = resp.data ?? [];
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
        this.valores = response.data;
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
    if (this.confirmOpen) return;
    this.confirmOpen = true;

    this.confirmService.confirm({
      key: 'valores-confirm',
      header: 'Confirmación',
      message: `¿Deseas eliminar el valor con ID: ${valor.vt_id}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.transformacionValoresService
          .transformacionValoresCrud({ vt_id: valor.vt_id } as Transformacion_ValorI, 'D')
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Valor eliminado',
                detail: 'El valor fue eliminado exitosamente.',
              });
              this.cargarData();
              this.confirmOpen = false;
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar el valor',
              });
              console.error(err);
              this.confirmOpen = false;
            },
          });
      },
      reject: () => {
        this.confirmOpen = false;
      },
    });
  }

  desactivarValor(valor: any): void {
    if (this.confirmOpen) return;
    this.confirmOpen = true;

    this.confirmService.confirm({
      key: 'valores-confirm',
      header: 'Confirmación',
      message: `¿Deseas desactivar el valor con ID: ${valor.vt_id}?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Si el modelo tiene vt_ind_estado, hacemos UPDATE a 'I'; si no, fallback a D (borrado lógico)
        const payload: any = { vt_id: valor.vt_id };
        if ('vt_ind_estado' in valor) {
          payload.vt_ind_estado = 'I';
          this.transformacionValoresService.transformacionValoresCrud(payload, 'U').subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Valor desactivado',
                detail: 'El valor fue desactivado correctamente.',
              });
              this.cargarData();
              // Refresca el estado del formulario abierto
              this.nuevoValor = { ...this.nuevoValor, vt_ind_estado: 'I' };
              this.confirmOpen = false;
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo desactivar el valor',
              });
              console.error(err);
              this.confirmOpen = false;
            },
          });
        } else {
          // Fallback: si no existe campo de estado, tratamos la desactivación como delete
          this.transformacionValoresService
            .transformacionValoresCrud({ vt_id: valor.vt_id } as Transformacion_ValorI, 'D')
            .subscribe({
              next: () => {
                this.messageService.add({
                  severity: 'success',
                  summary: 'Valor desactivado',
                  detail: 'Se realizó la desactivación.',
                });
                this.cargarData();
                this.mostrarDialogoAgregar = false;
                this.confirmOpen = false;
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'No se pudo desactivar el valor',
                });
                console.error(err);
                this.confirmOpen = false;
              },
            });
        }
      },
      reject: () => {
        this.confirmOpen = false;
      },
    });
  }

  abrirAgregar(opts?: { vt_camp_tran_id?: string | number }): void {
    const pre = opts?.vt_camp_tran_id ?? this.campoId ?? '';
    this.nuevoValor = {
      vt_camp_tran_id: pre,
      vt_valor_origen: '',
      vt_valor_destino: '',
    };
    this.mostrarDialogoAgregar = true;
    this.cargarCamposTransformacion();
    this.cdRef.detectChanges();
  }
}
