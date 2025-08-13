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
  
  @Input() tabFromParent: 'campos' | 'valores' | null = null;
  @Output() stepNavigate = new EventEmitter<string>();
  @Output() stepProgress = new EventEmitter<number>();
  transformacionCamposService = inject(TransformacionCampoS);
  plantillaDestinoService = inject(PlantillaDestinoS);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  pantallaPequena = false;
  mostrarDialogoAgregar = false;
  activeTab: 'campos' | 'valores' = 'campos';
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
    ct_fecha_actividad: '',
    pd_id: '',
  };

  accionesDropdown = [
    {
      label: 'Refrescar',
      icon: 'pi pi-refresh',
      command: () => {
        if (this.activeTab === 'campos') {
          this.cargarData();
        } else if (this.activeTab === 'valores') {
          this.valoresComponent?.cargarData();
        }
      },
    },
    {
      label: 'Exportar',
      icon: 'pi pi-download',
      command: () => this.exportarDatos(),
    },
  ];

  ngOnInit(): void {
    this.cargarData();
    this.cargarPlantillasDestinoOptions(); // <--- NUEVO
  }

  private cargarPlantillasDestinoOptions(): void {
    this.plantillaDestinoService.getAllPlantillas().subscribe({
      next: (res) => {
        this.plantillasDestino = res.result.data;
        this.pdOptions = this.plantillasDestino.map((pd) => ({
          label: `${pd.pd_id} - ${pd.pd_url} [${pd.pd_metodo_http}]`,
          value: String(pd.pd_id),
        }));
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error cargando Plantillas Destino', err),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabFromParent'] && this.tabFromParent) {
      this.goTab(this.tabFromParent);
    }
  }

  goTab(tab: 'campos' | 'valores', opts?: { pct?: number }) {
    this.activeTab = tab;
    this.stepNavigate.emit(
      tab === 'campos' ? 'TRANSFORMACION_CAMPOS' : 'TRANSFORMACION_VALORES'
    );
    if (opts?.pct !== undefined) this.stepProgress.emit(opts.pct);
  }

  exportarDatos(): void {}

  volver() {
    this.activeTab = 'campos';
    this.camposSeleccionado = null;
    this.modoFiltradoPorSistema = false;
    this.stepNavigate.emit('TRANSFORMACION_CAMPOS');
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
    this.dt.filterGlobal(valor, 'contains');
  }

  onBuscarGlobal(event: Event): void {
    const input = (event.target as HTMLInputElement).value;

    if (this.activeTab === 'campos') {
      this.dt.filterGlobal(input, 'contains');
    } else if (this.activeTab === 'valores') {
      this.valoresComponent?.filtrarDesdePadre(input);
    }
  }

  Agregar(): void {
    this.mostrarDialogoAgregar = true;
    this.nuevoCampo = {
      ct_campo_origen: '',
      ct_campo_destino: '',
      ct_tipo_transformacion: '',
      ct_validacion: '',
      ct_obligatorio: 'N',
      ct_usua_id: '',
      pd_id: '',
    };
    this.validacionPairs = [];
    this.newValKey = '';
    this.newValValue = '';
    this.editingValIndex = null;
  }

  agregarDesdeValores(): void {
    this.valoresComponent.mostrarDialogoAgregar = true;
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
  }

  guardarNuevo(): void {
    // Validaciones mínimas
    if (
      !this.nuevoCampo.ct_campo_origen?.trim() ||
      !this.nuevoCampo.ct_campo_destino?.trim() ||
      !this.nuevoCampo.ct_tipo_transformacion ||
      !this.nuevoCampo.pd_id
    ) {
      return;
    }

    // Construye ct_validacion a partir de los pares
    const validacionObj = this.validacionPairsToObject();
    // Si tu backend espera objeto, déjalo como objeto; si espera string, usa JSON.stringify(validacionObj)
    this.nuevoCampo.ct_validacion = Object.keys(validacionObj).length
      ? (validacionObj as any)
      : {};

    // Prepara payload sin mutar el form original
    const payload: any = { ...this.nuevoCampo };

    // Normaliza IDs numéricos si el backend los espera como number
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
    payload.ct_usua_id = 'ADMIN';
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
    this.activeTab = 'valores';
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

eliminar(): void {}
  
}
