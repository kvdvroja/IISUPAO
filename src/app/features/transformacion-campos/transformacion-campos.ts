import { Component, OnChanges, OnInit, inject } from '@angular/core';
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
import { SplitButtonModule } from 'primeng/splitbutton';
import { TransformacionValores } from '../transformacion-valores/transformacion-valores';
import { TransformacionCampoS } from '../../core/services/mant/transformacion-campo/transformacion-campo';
import { Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { PlantillaDestinoS } from '../../core/services/mant/plantilla-destino/plantilla-destino';
import { Plantilla_DestinoI } from '../../core/interfaces/Plantilla_Destino';
type StepKey = 'endpoints' | 'integracion' | 'destino' | 'campos' | 'valores';
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
    Toast,
    SplitButtonModule,
    TransformacionValores,
    SelectModule,
  ],
  templateUrl: './transformacion-campos.html',
  styleUrl: './transformacion-campos.css',
})
export class TransformacionCampos implements OnInit, OnChanges {
  @ViewChild('dt') dt!: Table;
  @ViewChild(TransformacionValores) valoresComponent!: TransformacionValores;
  @Input() pdId: string | number | null = null;
  @Output() stepNavigate = new EventEmitter<StepKey>();
  @Output() stepProgress = new EventEmitter<number>();
  transformacionCamposService = inject(TransformacionCampoS);
  plantillaDestinoService = inject(PlantillaDestinoS);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  pantallaPequena = false;
  mostrarDialogoAgregar = false;
  ocultarTarjetaTransformacionCampo: boolean = false;
  camposSeleccionado: Transformacion_CamposI | null = null;
  modoFiltradoPorSistema: boolean = false;
  mostrarSoloPendientes: boolean = false;
  registroExitoso: boolean = false;
  campos: Transformacion_CamposI[] = [];
  pdOptions: { label: string; value: string }[] = [];
  plantillasDestino: Plantilla_DestinoI[] = [];
  validacionPairs: Array<{ key: string; value: string }> = [];
  newValKey = '';
  newValValue = '';
  editingValIndex: number | null = null;
  campoSeleccionado: Transformacion_CamposI | null = null;
  activeDialogKey: string | null = null;

  tipoTransfOptions = [
    { label: 'DIRECTA', value: 'DIRECTA' },
    { label: 'MAPEO', value: 'MAPEO' },
    { label: 'FORMATO', value: 'FORMATO' },
  ];
  obligatorioOptions = [
    { label: 'SI', value: true },
    { label: 'NO', value: false },
  ];
  nuevoCampo: any = {
    ct_campo_origen: '',
    ct_campo_destino: '',
    ct_tipo_transformacion: '',
    ct_validacion: '',
    ct_obligatorio: '',
    ct_usua_id: '',
    pd_id: '',
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

  ngOnInit(): void {
    //this.cargarData();
    //this.cargarPlantillasDestinoOptions();
  }

  private cargarPlantillasDestinoOptions(): void {
    this.plantillaDestinoService.getAllPlantillas().subscribe({
      next: (res) => {
        this.plantillasDestino = res.data ?? [];
        this.pdOptions = this.plantillasDestino.map((pd) => ({
          label: `${pd.pd_id}`,
          value: String(pd.pd_id), // ← string
        }));
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error cargando Plantillas Destino', err),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pdId'] && this.mostrarDialogoAgregar && this.pdId != null) {
      this.nuevoCampo.pd_id = String(this.pdId); // 👈 string
      this.cdRef.detectChanges();
    }
    this.cargarData();
  }

  exportarDatos(): void {}

  volver() {
    this.camposSeleccionado = null;
    this.modoFiltradoPorSistema = false;
  }

  cargarData(): void {
    this.transformacionCamposService.getAllTransformacionCampos().subscribe({
      next: (response) => {
        this.campos = response.data;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando plantillas destino', err);
      },
    });
  }

get datosFiltrados(): Transformacion_CamposI[] {
  if (this.pdId === null || this.pdId === undefined || this.pdId === '') {
    return this.campos ?? [];
  }
  const pid = Number(this.pdId);
  if (Number.isNaN(pid)) return [];

  return (this.campos ?? []).filter((c: any) => Number(c?.pd_id) === pid);
}

  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(valor, 'contains');
  }

  onBuscarGlobal(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(input, 'contains');
  }

  Agregar(): void {
    // Asegura tener opciones antes de abrir
    if (!this.pdOptions.length) {
      this.cargarPlantillasDestinoOptions();
    }

    this.mostrarDialogoAgregar = true;

    this.nuevoCampo = {
      ct_campo_origen: '',
      ct_campo_destino: '',
      ct_tipo_transformacion: '',
      ct_validacion: '',
      ct_obligatorio: false,
      ct_usua_id: '',
      pd_id: this.pdId != null ? String(this.pdId) : '',
    };

    this.validacionPairs = [];
    this.newValKey = '';
    this.newValValue = '';
    this.editingValIndex = null;

    // En algunos casos ayuda empujar change detection tras cargar opciones
    setTimeout(() => this.cdRef.detectChanges());
  }

  agregarDesdeValores(): void {
    this.valoresComponent.mostrarDialogoAgregar = true;
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
  }

  guardarNuevo(): void {
    if (
      !this.nuevoCampo.ct_campo_origen?.trim() ||
      !this.nuevoCampo.ct_campo_destino?.trim() ||
      !this.nuevoCampo.ct_tipo_transformacion ||
      !this.nuevoCampo.pd_id
    ) {
      return;
    }

    const validacionObj = this.validacionPairsToObject();
    this.nuevoCampo.ct_validacion = Object.keys(validacionObj).length
      ? (validacionObj as any)
      : {};

    const payload: any = { ...this.nuevoCampo };
    if (
      payload.pd_id !== null &&
      payload.pd_id !== undefined &&
      payload.pd_id !== ''
    ) {
      const n = Number(payload.pd_id);
      if (!Number.isNaN(n)) payload.pd_id = n;
    }

    if (payload.ct_id === '' || payload.ct_id === undefined) {
    } else if (payload.ct_id !== null) {
      const n = Number(payload.ct_id);
      if (!Number.isNaN(n)) payload.ct_id = n; // UPDATE
    }
    payload.ct_usua_id = '000000044';
    const accion: 'I' | 'U' = payload.ct_id ? 'U' : 'I';

    this.transformacionCamposService
      .transformacionCamposCrud(payload, accion)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: accion === 'U' ? 'Campo actualizado' : 'Campo registrado',
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
            detail: 'No se pudo guardar el campo',
          });
        },
      });
  }

  showEditar(campo: Transformacion_CamposI): void {
    this.mostrarDialogoAgregar = true;
    this.nuevoCampo = { ...campo };
    this.loadPairsFromValidacion((campo as any).ct_validacion);
  }

  verTodasLosValores(): void {
    this.modoFiltradoPorSistema = false;
    this.camposSeleccionado = null;
  }
  //
  private loadPairsFromValidacion(data: any) {
    this.validacionPairs = [];
    this.newValKey = '';
    this.newValValue = '';
    this.editingValIndex = null;

    if (data == null || data === '') return;
    try {
      const obj = typeof data === 'string' ? JSON.parse(data) : data;
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        this.validacionPairs = Object.entries(obj).map(([key, val]) => ({
          key,
          value: String(val ?? ''),
        }));
      }
    } catch {
      // si vino inválido, ignoramos
    }
  }

  private validacionPairsToObject(): Record<string, string> {
    const o: Record<string, string> = {};
    for (const p of this.validacionPairs) {
      if (p.key?.trim()) o[p.key.trim()] = p.value ?? '';
    }
    return o;
  }

  addOrUpdateValidacionKV() {
    const k = this.newValKey?.trim();
    const v = this.newValValue ?? '';
    if (!k) return;

    if (this.editingValIndex !== null) {
      this.validacionPairs[this.editingValIndex] = { key: k, value: v };
      this.editingValIndex = null;
    } else {
      const idx = this.validacionPairs.findIndex((p) => p.key === k);
      if (idx >= 0) this.validacionPairs[idx] = { key: k, value: v };
      else this.validacionPairs.push({ key: k, value: v });
    }
    this.newValKey = '';
    this.newValValue = '';
  }

  editValidacionKV(i: number) {
    const it = this.validacionPairs[i];
    this.newValKey = it.key;
    this.newValValue = it.value;
    this.editingValIndex = i;
  }

  removeValidacionKV(i: number) {
    this.validacionPairs.splice(i, 1);
    if (this.editingValIndex === i) {
      this.editingValIndex = null;
      this.newValKey = '';
      this.newValValue = '';
    }
  }

  public abrirAgregarPreconfigurado(
    opts: { pdId?: string | number } = {}
  ): void {
    if (!this.pdOptions?.length) this.cargarPlantillasDestinoOptions();
    this.Agregar();
    if (opts.pdId != null) {
      this.nuevoCampo.pd_id = String(opts.pdId);
    }
    this.cdRef.detectChanges();
  }

  abrirDialogoValores(): void {
    this.valoresComponent?.abrirAgregar();
  }

desactivarCampo(campo: Transformacion_CamposI): void {
  if (this.activeDialogKey === 'desactivar') return; // Evitar abrir múltiples diálogos

  this.activeDialogKey = 'desactivar'; // Asignar la clave para el diálogo de desactivación

  this.confirmationService.confirm({
    key: 'transformacion-campo-confirm',
    header: 'Confirmación',
    message: `¿Deseas desactivar el campo "${campo.ct_campo_origen}"?`,
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      // Cambiar el estado a 'Inactivo' o el estado que corresponda
      campo.ct_obligatorio = false; // Cambiarlo a no obligatorio

      // Aquí va el servicio para desactivar el campo
      this.transformacionCamposService.transformacionCamposCrud(campo, 'D').subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Campo desactivado',
            detail: 'El campo fue desactivado correctamente.',
          });
          this.cargarData(); // Recargar la lista de campos
        },
        error: (err) => {
          console.error('Error al desactivar el campo', err);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo desactivar el campo.',
          });
        },
      });

      // Limpiar la clave del diálogo cuando se acepte
      this.activeDialogKey = null;
    },
    reject: () => {
      console.log('Desactivación cancelada');
      // Limpiar la clave del diálogo cuando se rechace
      this.activeDialogKey = null;
    },
  });
}

// Función para eliminar el campo
eliminar(campo: Transformacion_CamposI): void {
  if (this.activeDialogKey === 'eliminar') return; // Evitar abrir múltiples diálogos

  this.activeDialogKey = 'eliminar'; // Asignar la clave para el diálogo de eliminación

  this.confirmationService.confirm({
    key: 'transformacion-campo-confirm',
    message: `¿Estás seguro de eliminar el campo "${campo.ct_campo_origen}"?`,
    header: 'Confirmar eliminación',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      // Aquí va el servicio para eliminar el campo
      this.transformacionCamposService.transformacionCamposCrud(campo, 'D').subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Campo eliminado',
            detail: 'El campo fue eliminado correctamente.',
          });
          this.cargarData(); // Recargar la lista de campos
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el campo',
          });
          console.error(err);
        },
      });

      // Limpiar la clave del diálogo cuando se acepte
      this.activeDialogKey = null;
    },
    reject: () => {
      console.log('Eliminación cancelada');
      // Limpiar la clave del diálogo cuando se rechace
      this.activeDialogKey = null;
    },
  });
}

  onCampoSelected(
    row: Transformacion_CamposI | Transformacion_CamposI[] | undefined
  ) {
    if (!row || Array.isArray(row)) return;
    this.campoSeleccionado = row;
    this.stepNavigate.emit('valores');
    // opcional: hacer scroll a la tarjeta
    setTimeout(
      () =>
        document
          .getElementById('valoresPorCampo')
          ?.scrollIntoView({ behavior: 'smooth' }),
      0
    );
  }

  limpiarSeleccionCampo() {
    this.stepNavigate.emit('campos');
    this.campoSeleccionado = null;
  }

  onChildStep(step: StepKey) {
    this.stepNavigate.emit(step);
    this.ocultarTarjetaTransformacionCampo =
      step === 'campos' || step === 'valores';
  }
}
