import {
  Component,
  OnChanges,
  OnInit,
  SimpleChange,
  inject,
} from '@angular/core';
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
import { Plantilla_IntegracionI } from '../../core/interfaces/Plantilla_Integracion';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ChangeDetectorRef } from '@angular/core';
import { PlantillaIntegracionS } from '../../core/services/mant/plantilla-integracion/plantilla-integracion';
import { PlantillaDestino } from '../plantilla-destino/plantilla-destino';
import { Input, Output, EventEmitter } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Endpoint } from '../../core/services/mant/endpoint/endpoint';
import { EndpointI } from '../../core/interfaces/Endpoint';
import { ColaS } from '../../core/services/mant/cola/cola';
import { ColaI } from '../../core/interfaces/Cola';

@Component({
  selector: 'app-plantillas',
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
    Toast,
    SelectModule,
    SplitButtonModule,
    PlantillaDestino,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './plantillas.html',
  styleUrl: './plantillas.css',
})
export class Plantillas implements OnInit, OnChanges {
  @ViewChild('dt') dt!: Table;
  @ViewChild(PlantillaDestino) plantillasDComponent!: PlantillaDestino;
  @Input() tabFromParent: 'integracion' | 'destino' | null = null;
  @Output() stepNavigate = new EventEmitter<string>();
  @Output() stepProgress = new EventEmitter<number>();
  endpointService = inject(Endpoint);
  colasService = inject(ColaS);
  colas: ColaI[] = [];
  colasOptions: { label: string; value: string | number }[] = [];
  endpoints: EndpointI[] = [];
  endpointsOptions: { label: string; value: string | number }[] = [];
  selectedEndpointId: string | number | null = null;
  selectedColaId: string | number | null = null;
  activeTab: 'integracion' | 'destino' = 'integracion';
  plantillaIntegracionService = inject(PlantillaIntegracionS);
  messageService = inject(MessageService);
  confirmService = inject(ConfirmationService);
  cdRef = inject(ChangeDetectorRef);
  pantallaPequena = false;
  editando: boolean = false;
  mostrarDialogoAgregar = false;
  registroExitoso = false;
  plantillaISeleccionado: Plantilla_IntegracionI | null = null;
  modoFiltradoPorSistema: boolean = false;

  plantillas: Plantilla_IntegracionI[] = [];

  //
  piDataPairs: Array<{ key: string; value: string }> = [];
  newKVKey = '';
  newKVValue = '';
  editingKVIndex: number | null = null;
  //
  //
  schemaPairs: Array<{ key: string; value: string }> = [];
  newSchemaKey = '';
  newSchemaValue = '';
  editingSchemaIndex: number | null = null;
  //

  opcionesTipoServicio = [
    { label: 'MANUAL', value: 'MANUAL' },
    { label: 'ONLINE', value: 'ONLINE' },
  ];

  opcionesValida = [
    { label: 'Productor (P)', value: 'P' },
    { label: 'Worker (W)', value: 'W' },
  ];

  opcionesTransforma = [
    { label: 'Worker (W)', value: 'W' },
    { label: 'Productor (P)', value: 'P' },
  ];

  accionesDropdown = [
    {
      label: 'Refrescar',
      icon: 'pi pi-refresh',
      command: () => {
        if (this.activeTab === 'integracion') {
          this.cargarPlantillas();
        } else if (this.activeTab === 'destino') {
          this.plantillasDComponent?.cargarPlantillas();
        }
      },
    },
    {
      label: 'Exportar',
      icon: 'pi pi-download',
      command: () => this.exportarDatos(),
    },
  ];

  nuevaPlantilla: any = {
    pi_codigo: '',
    pi_nombre: '',
    pi_descripcion: '',
    pi_tipo_servicio: '',
    pi_sist_orig_id: '',
    pi_data: '',
    pi_numreg_peticion: '',
    pi_schema: '',
    pi_url: '',
    pi_metodo_http: '',
    pi_sist_id: '',
    pi_valida: '',
    pi_transforma: '',
  };

  ngOnInit(): void {
    this.cargarPlantillas();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabFromParent'] && this.tabFromParent) {
      this.goTab(this.tabFromParent);
    }
  }

  private cargarColasOptions(): void {
    this.colasService.getAllColas().subscribe({
      next: (res) => {
        this.colas = res.result.data;
        this.colasOptions = this.colas.map((e) => ({
          label: `${e.cola_id} - ${e.cola_nombre}`,
          value: e.cola_id,
        }));
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error cargando colas', err),
    });
  }

  private cargarEndpointsOptions(preselectId?: string): void {
    this.endpointService.getAllEndpoints().subscribe({
      next: (res) => {
        this.endpoints = res.result.data;
        this.endpointsOptions = this.endpoints.map((e) => ({
          label: `${e.se_id} - ${e.se_nombre}`,
          value: String(e.se_id),
        }));

        if (preselectId) {
          this.selectedEndpointId = String(preselectId);
          this.onEndpointSelect(this.selectedEndpointId);
        } else if (this.editando && this.nuevaPlantilla?.pi_sist_orig_id) {
          this.selectedEndpointId = String(this.nuevaPlantilla.pi_sist_orig_id);
        }

        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error cargando endpoints', err),
    });
  }

  onEndpointSelect(endpointId: string | number): void {
    const id = String(endpointId);
    const ep = this.endpoints.find((e) => String(e.se_id) === id);
    if (!ep) return;

    this.selectedEndpointId = id;
    this.nuevaPlantilla.pi_url = ep.se_url || '';
    this.nuevaPlantilla.pi_metodo_http = ep.se_metodo_http || '';
    this.nuevaPlantilla.pi_sist_orig_id = String(ep.se_id);
    this.nuevaPlantilla.pi_sist_id = String((ep as any).se_sistema_id ?? '');
  }

  onColaSelect(colaId: string | number): void {
    this.selectedColaId = colaId;
    this.nuevaPlantilla.pi_cola_id = String(colaId);
  }

  cargarPlantillas(): void {
    this.plantillaIntegracionService.getAllPlantillas().subscribe({
      next: (response) => {
        this.plantillas = response.result.data;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando plantillas destino', err);
      },
    });
  }

  exportarDatos(): void {
    console.log('Exportando datos...');
  }

  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(valor, 'contains');
  }

  get plantillasFiltradas(): Plantilla_IntegracionI[] {
    return this.plantillas;
  }

  showEditar(plantilla: Plantilla_IntegracionI): void {
    this.editando = true;
    this.nuevaPlantilla = { ...plantilla };
    this.mostrarDialogoAgregar = true;

    this.clearAllDynamicFields();
    this.loadPairsFromPiData(this.nuevaPlantilla.pi_data || {});
    this.loadPairsFromPiSchema(this.nuevaPlantilla.pi_schema || {});

    this.cargarEndpointsOptions();
    this.cargarColasOptions();
  }

  volver() {
    this.activeTab = 'integracion';
    this.stepNavigate.emit('PLANTILLA_INTEGRACION');
    this.plantillaISeleccionado = null;
    this.modoFiltradoPorSistema = false;
  }

  goTab(tab: 'integracion' | 'destino', opts?: { pct?: number }) {
    this.activeTab = tab;
    this.stepNavigate.emit(
      tab === 'destino' ? 'PLANTILLA_DESTINO' : 'PLANTILLA_INTEGRACION'
    );
    if (opts?.pct !== undefined) this.stepProgress.emit(opts.pct);
  }

  agregarDesdeDestino(): void {
    this.plantillasDComponent.Agregar();
  }

  onBuscarGlobal(event: Event): void {
    const input = (event.target as HTMLInputElement).value;

    if (this.activeTab === 'integracion') {
      this.dt.filterGlobal(input, 'contains');
    } else if (this.activeTab === 'destino') {
      this.plantillasDComponent?.filtrarDesdePadre(input);
    }
  }

  AgregarPlantilla(): void {
    this.mostrarDialogoAgregar = true;
    this.editando = false;
    this.nuevaPlantilla = this.nuevaPlantillaBase();
    this.clearAllDynamicFields();
    this.selectedEndpointId = null;
    this.selectedColaId = null;
    this.cargarEndpointsOptions();
    this.cargarColasOptions();
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
    this.clearAllDynamicFields();
    this.nuevaPlantilla = this.nuevaPlantillaBase();
    this.selectedEndpointId = null;
    this.selectedColaId = null;
  }

  guardar(): void {
    if (
      !this.nuevaPlantilla.pi_codigo ||
      !this.nuevaPlantilla.pi_nombre ||
      !this.nuevaPlantilla.pi_url ||
      !this.nuevaPlantilla.pi_metodo_http
    )
      return;

    const payload: any = { ...this.nuevaPlantilla };
    payload.pi_data = this.pairsToObject();
    payload.pi_schema = this.schemaPairsToObject();

    if (
      payload.pi_numreg_peticion !== null &&
      payload.pi_numreg_peticion !== undefined &&
      payload.pi_numreg_peticion !== ''
    ) {
      const n = Number(payload.pi_numreg_peticion);
      if (!Number.isNaN(n)) payload.pi_numreg_peticion = n;
    }

    if (this.editando) {
      if (payload.pi_id !== null && payload.pi_id !== undefined) {
        payload.pi_id = isNaN(Number(payload.pi_id))
          ? payload.pi_id
          : Number(payload.pi_id);
      }
    } else {
      payload.pi_ind_estado = 'A';
      if (!payload.pi_valida) payload.pi_valida = 'W';
      if (!payload.pi_transforma) payload.pi_transforma = 'W';
    }

    const accion = this.editando ? 'U' : 'I';
    this.plantillaIntegracionService
      .plantillaIntegracionCrud(payload, accion)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: this.editando
              ? 'Plantilla actualizada'
              : 'Plantilla registrada',
            detail: 'Operación exitosa',
          });
          this.mostrarDialogoAgregar = false;
          this.registroExitoso = true;
          this.cargarPlantillas();
          console.log('RAW:', JSON.stringify(payload));
          console.log('pi_data:', JSON.stringify(payload.pi_data));
          console.log('pi_schema:', JSON.stringify(payload.pi_schema));
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo guardar la plantilla',
          });
          console.error(err);
        },
      });
  }

  eliminar(row: Plantilla_IntegracionI): void {
    this.confirmService.confirm({
      header: 'Confirmación',
      message: `¿Deseas eliminar la plantilla "${row.pi_nombre}"?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const payload: any = { pi_id: row.pi_id };
        if (payload.pi_id && !isNaN(Number(payload.pi_id)))
          payload.pi_id = Number(payload.pi_id);

        this.plantillaIntegracionService
          .plantillaIntegracionCrud(payload, 'D')
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Plantilla eliminada',
                detail: 'Se eliminó correctamente.',
              });
              this.cargarPlantillas();
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar la plantilla',
              });
              console.error(err);
            },
          });
      },
    });
  }
  verTodasLasPlantillasD(): void {
    this.activeTab = 'destino';
    this.modoFiltradoPorSistema = false;
    this.plantillaISeleccionado = null;
  }

  //
  private loadPairsFromPiData(data: any) {
    this.piDataPairs = [];
    this.resetKVUi();
    if (data == null) return;
    try {
      const obj = typeof data === 'string' ? JSON.parse(data) : data;
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        this.piDataPairs = Object.entries(obj).map(([key, value]) => ({
          key,
          value: String(value ?? ''),
        }));
      } else if (Array.isArray(obj)) {
        this.piDataPairs = obj
          .filter((x: any) => x && typeof x.key === 'string')
          .map((x: any) => ({ key: x.key, value: String(x.value ?? '') }));
      }
    } catch {}
  }

  private pairsToObject(): Record<string, string> {
    const o: Record<string, string> = {};
    for (const p of this.piDataPairs) o[p.key] = p.value;
    return o;
  }

  addOrUpdateKV() {
    const k = this.newKVKey?.trim();
    const v = this.newKVValue ?? '';
    if (!k) return;

    if (this.editingKVIndex !== null) {
      this.piDataPairs[this.editingKVIndex] = { key: k, value: v };
      this.editingKVIndex = null;
    } else {
      const idx = this.piDataPairs.findIndex((p) => p.key === k);
      if (idx >= 0) this.piDataPairs[idx] = { key: k, value: v };
      else this.piDataPairs.push({ key: k, value: v });
    }
    this.newKVKey = '';
    this.newKVValue = '';
  }

  editKV(i: number) {
    const it = this.piDataPairs[i];
    this.newKVKey = it.key;
    this.newKVValue = it.value;
    this.editingKVIndex = i;
  }

  removeKV(i: number) {
    this.piDataPairs.splice(i, 1);
    if (this.editingKVIndex === i) {
      this.editingKVIndex = null;
      this.newKVKey = '';
      this.newKVValue = '';
    }
  }
  //
  private loadPairsFromPiSchema(data: any) {
    this.schemaPairs = [];
    this.resetSchemaUi();
    if (data == null) return;
    try {
      const obj = typeof data === 'string' ? JSON.parse(data) : data;
      if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        this.schemaPairs = Object.entries(obj).map(([key, value]) => ({
          key,
          value: String(value ?? ''),
        }));
      } else if (Array.isArray(obj)) {
        this.schemaPairs = obj
          .filter((x: any) => x && typeof x.key === 'string')
          .map((x: any) => ({ key: x.key, value: String(x.value ?? '') }));
      }
    } catch {}
  }

  private schemaPairsToObject(): Record<string, string> {
    const o: Record<string, string> = {};
    for (const p of this.schemaPairs) o[p.key] = p.value;
    return o;
  }

  addOrUpdateSchemaKV() {
    const k = this.newSchemaKey?.trim();
    const v = this.newSchemaValue ?? '';
    if (!k) return;

    if (this.editingSchemaIndex !== null) {
      this.schemaPairs[this.editingSchemaIndex] = { key: k, value: v };
      this.editingSchemaIndex = null;
    } else {
      const idx = this.schemaPairs.findIndex((p) => p.key === k);
      if (idx >= 0) this.schemaPairs[idx] = { key: k, value: v };
      else this.schemaPairs.push({ key: k, value: v });
    }
    this.newSchemaKey = '';
    this.newSchemaValue = '';
  }

  editSchemaKV(i: number) {
    const it = this.schemaPairs[i];
    this.newSchemaKey = it.key;
    this.newSchemaValue = it.value;
    this.editingSchemaIndex = i;
  }

  removeSchemaKV(i: number) {
    this.schemaPairs.splice(i, 1);
    if (this.editingSchemaIndex === i) {
      this.editingSchemaIndex = null;
      this.newSchemaKey = '';
      this.newSchemaValue = '';
    }
  }
  //
  private resetKVUi(): void {
    this.newKVKey = '';
    this.newKVValue = '';
    this.editingKVIndex = null;
  }

  private resetSchemaUi(): void {
    this.newSchemaKey = '';
    this.newSchemaValue = '';
    this.editingSchemaIndex = null;
  }

  private clearAllDynamicFields(): void {
    this.piDataPairs = [];
    this.schemaPairs = [];
    this.resetKVUi();
    this.resetSchemaUi();
  }

  private nuevaPlantillaBase(): any {
    return {
      pi_codigo: '',
      pi_nombre: '',
      pi_descripcion: '',
      pi_tipo_servicio: '',
      pi_sist_orig_id: '',
      pi_data: '',
      pi_numreg_peticion: '',
      pi_schema: '',
      pi_url: '',
      pi_metodo_http: '',
      pi_sist_id: '',
      pi_valida: '',
      pi_transforma: '',
      pi_cola_id: '',
    };
  }
  public abrirAgregarDesdeEndpoint(endpointId: string | number): void {
    this.activeTab = 'integracion';
    this.AgregarPlantilla();
    const id = String(endpointId);
    this.cargarEndpointsOptions(id);
    this.cargarColasOptions();
  }
}
