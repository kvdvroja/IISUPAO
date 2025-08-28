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
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { Table } from 'primeng/table';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
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
import { ToggleSwitch } from 'primeng/toggleswitch';
import { Textarea } from 'primeng/textarea';
import { Endpoint } from '../../core/services/mant/endpoint/endpoint';
import { EndpointI } from '../../core/interfaces/Endpoint';
import { ColaS } from '../../core/services/mant/cola/cola';
import { ColaI } from '../../core/interfaces/Cola';
import { ProgramacionJob } from '../../shared/components/programacion-job/programacion-job';
export type StepKey =
  | 'endpoints'
  | 'integracion'
  | 'destino'
  | 'campos'
  | 'valores';
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
    ToggleSwitch,
    Textarea,
    ProgramacionJob,
  ],
  templateUrl: './plantillas.html',
  styleUrl: './plantillas.css',
})
export class Plantillas implements OnInit, OnChanges {
  @ViewChild('dt') dt!: Table;
  @ViewChild(PlantillaDestino) plantillasDComponent!: PlantillaDestino;
  @Input() tabFromParent: 'integracion' | 'destino' | null = null;
  @Input() endpointIdFilter: string | number | null = null;
  @ViewChild('pdCmp') pdCmp!: PlantillaDestino;
  @Output() stepNavigate = new EventEmitter<StepKey>();
  @Output() stepProgress = new EventEmitter<number>();
  ocultarTarjetaPlantillaI = false;
  endpointService = inject(Endpoint);
  colasService = inject(ColaS);
  colas: ColaI[] = [];
  selectedPlantilla: Plantilla_IntegracionI | null = null;
  colasOptions: { label: string; value: string | number }[] = [];
  endpoints: EndpointI[] = [];
  endpointsOptions: { label: string; value: string | number }[] = [];
  selectedEndpointId: string | number | null = null;
  selectedColaId: string | number | null = null;
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
  mostrarDialogoAsignarJob = false;
  activeDialogKey: string | null = null;

  plantillas: Plantilla_IntegracionI[] = [];
  plantillaParaJob: Plantilla_IntegracionI | null = null;

  // opciones de JOB (cárgalas desde tu servicio real)
  jobOptions: { label: string; value: string | number }[] = [];
  selectedJobId: string | number | null = null;

  // JSON de parámetros (opcional)
  jobParamsRawText = '';
  jobParamsRawError = false;

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

  // Modo “en bruto” / estructurado
  modoPiDataRaw = false;
  modoPiSchemaRaw = false;
  // Opcional si quieres también modo raw para pi_valida:
  modoPiValidaRaw = false;

  // Textareas para pegar JSON
  piDataRawText = '';
  piSchemaRawText = '';
  piValidaRawText = '';

  // Validaciones de JSON
  piDataRawError = false;
  piSchemaRawError = false;
  piValidaRawError = false;
  //

  opcionesTipoServicio = [
    { label: 'MANUAL', value: 'MANUAL' },
    { label: 'ONLINE', value: 'ONLINE' },
    { label: 'JOB', value: 'JOB' },
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
        this.cargarPlantillas();
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
    pi_sist_id: '',
    pi_valida: '',
    pi_transforma: '',
  };

  ngOnInit(): void {
    //this.cargarPlantillas();
  }

  onPlantillaSelected(
    data: Plantilla_IntegracionI | Plantilla_IntegracionI[] | undefined
  ): void {
    if (!data || Array.isArray(data)) return;
    this.selectedPlantilla = data;
    this.ocultarTarjetaPlantillaI = false;
    this.stepNavigate.emit('destino');

    setTimeout(
      () =>
        document
          .getElementById('destinosPorPlantilla')
          ?.scrollIntoView({ behavior: 'smooth' }),
      0
    );
  }

  limpiarSeleccionPlantilla() {
    this.selectedPlantilla = null;
    this.ocultarTarjetaPlantillaI = false;
    this.stepNavigate.emit('integracion');
  }

  ngOnChanges(): void {
    this.cargarPlantillas();
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
        this.endpoints = res.data;
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
        this.plantillas = response.data;
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
    if (this.endpointIdFilter == null || this.endpointIdFilter === '') {
      return this.plantillas;
    }
    const id = String(this.endpointIdFilter);
    return this.plantillas.filter((p) => String(p.pi_sist_orig_id) === id);
  }

  showEditar(plantilla: Plantilla_IntegracionI): void {
    this.editando = true;
    this.nuevaPlantilla = { ...plantilla };
    this.mostrarDialogoAgregar = true;
    this.clearAllDynamicFields();

    this.loadPairsFromPiData(this.nuevaPlantilla.pi_data || {});
    this.loadPairsFromPiSchema(this.nuevaPlantilla.pi_schema || {});

    try {
      this.piDataRawText = JSON.stringify(
        this.nuevaPlantilla.pi_data ?? {},
        null,
        2
      );
    } catch {
      this.piDataRawText = '';
    }
    try {
      this.piSchemaRawText = JSON.stringify(
        this.nuevaPlantilla.pi_schema ?? {},
        null,
        2
      );
    } catch {
      this.piSchemaRawText = '';
    }
    this.modoPiDataRaw = false;
    this.modoPiSchemaRaw = false;
    this.piDataRawError = false;
    this.piSchemaRawError = false;

    // Opcional pi_valida RAW
    try {
      this.piValidaRawText = JSON.stringify(
        this.nuevaPlantilla.pi_valida ?? '',
        null,
        2
      );
    } catch {
      this.piValidaRawText = '';
    }
    this.modoPiValidaRaw = false;
    this.piValidaRawError = false;

    this.cargarEndpointsOptions();
    this.cargarColasOptions();
  }

  volver() {
    this.plantillaISeleccionado = null;
    this.modoFiltradoPorSistema = false;
  }

  agregarDesdeDestino(): void {
    this.plantillasDComponent.Agregar();
  }

  onBuscarGlobal(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(input, 'contains');
  }

  AgregarPlantilla(): void {
    this.mostrarDialogoAgregar = true;
    this.editando = false;
    this.nuevaPlantilla = this.nuevaPlantillaBase();
    this.clearAllDynamicFields();
    this.selectedEndpointId = null;
    this.selectedColaId = null;

    // Reset modos y textos RAW
    this.modoPiDataRaw = false;
    this.modoPiSchemaRaw = false;
    this.modoPiValidaRaw = false;
    this.piDataRawText = '';
    this.piSchemaRawText = '';
    this.piValidaRawText = '';
    this.piDataRawError = false;
    this.piSchemaRawError = false;
    this.piValidaRawError = false;

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

    this.modoPiDataRaw = false;
    this.modoPiSchemaRaw = false;
    this.modoPiValidaRaw = false;
    this.piDataRawText = '';
    this.piSchemaRawText = '';
    this.piValidaRawText = '';
    this.piDataRawError = false;
    this.piSchemaRawError = false;
    this.piValidaRawError = false;
  }
  guardar(): void {
    if (
      !this.nuevaPlantilla.pi_codigo ||
      !this.nuevaPlantilla.pi_nombre
    )
      return;

    if (
      this.modoPiDataRaw &&
      (this.piDataRawError || !this.piDataRawText?.trim())
    )
      return;
    if (
      this.modoPiSchemaRaw &&
      (this.piSchemaRawError || !this.piSchemaRawText?.trim())
    )
      return;
    if (
      this.modoPiValidaRaw &&
      (this.piValidaRawError || !this.piValidaRawText?.trim())
    )
      return;

    const payload: any = { ...this.nuevaPlantilla };

    // pi_data
    if (this.modoPiDataRaw) {
      payload.pi_data = JSON.parse(this.piDataRawText);
    } else {
      payload.pi_data = this.pairsToObject();
    }

    // pi_schema
    if (this.modoPiSchemaRaw) {
      payload.pi_schema = JSON.parse(this.piSchemaRawText);
    } else {
      payload.pi_schema = this.schemaPairsToObject();
    }

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

  desactivarPlantilla(plantilla: Plantilla_IntegracionI): void {
    if (this.activeDialogKey === 'desactivar') return; // Evitar abrir múltiples diálogos

    this.activeDialogKey = 'desactivar'; // Asignar la clave para el diálogo de desactivación

    this.confirmService.confirm({
      key: 'plantillas-confirm',
      header: 'Confirmación',
      message: `¿Deseas desactivar la plantilla "${plantilla.pi_nombre}"?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Cambiar el estado a 'I' (Inactivo)
        plantilla.pi_ind_estado = 'I';

        // Aquí va el servicio para desactivar la plantilla
        this.plantillaIntegracionService.plantillaIntegracionCrud(plantilla, 'D').subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Plantilla desactivada',
              detail: 'La plantilla fue desactivada correctamente.',
            });
            this.cargarPlantillas(); // Recargar la lista de plantillas
          },
          error: (err) => {
            console.error('Error al desactivar la plantilla', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo desactivar la plantilla.',
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

  // Función para eliminar la plantilla
  eliminar(plantilla: Plantilla_IntegracionI): void {
    if (this.activeDialogKey === 'eliminar') return; // Evitar abrir múltiples diálogos

    this.activeDialogKey = 'eliminar'; // Asignar la clave para el diálogo de eliminación

    this.confirmService.confirm({
      key: 'plantillas-confirm',
      message: `¿Estás seguro de eliminar la plantilla "${plantilla.pi_nombre}"?`,
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Aquí va el servicio para eliminar la plantilla
        this.plantillaIntegracionService.plantillaIntegracionCrud(plantilla, 'D').subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Plantilla eliminada',
              detail: 'La plantilla fue eliminada correctamente.',
            });
            this.cargarPlantillas(); // Recargar la lista de plantillas
          },
          error: (err) => {
            console.error('Error al eliminar la plantilla', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la plantilla.',
            });
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

  verTodasLasPlantillasD(): void {
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
    } catch { }
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
    } catch { }
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
      pi_sist_id: '',
      pi_valida: '',
      pi_transforma: '',
      pi_cola_id: '',
    };
  }
  public abrirAgregarDesdeEndpoint(endpointId: string | number): void {
    this.AgregarPlantilla();
    const id = String(endpointId);
    this.cargarEndpointsOptions(id);
    this.cargarColasOptions();
  }

  agregarDestinoDesdeIntegracion(row: Plantilla_IntegracionI): void {
    const planInteId = row.pi_id;
    const sistemaId = row.pi_sist_id || row.pi_sist_orig_id; // el que corresponda en tu modelo

    this.pdCmp.abrirAgregarPreconfigurado({
      planInteId: planInteId as any,
      sistId: sistemaId as any,
    });
  }

  onChildStep(step: StepKey) {
    this.stepNavigate.emit(step);
    this.ocultarTarjetaPlantillaI = step === 'campos' || step === 'valores';
  }

  private isValidJson(text: string): boolean {
    try {
      JSON.parse(text);
      return true;
    } catch {
      return false;
    }
  }

  onTogglePiDataRaw(): void {
    // Si pasas de estructurado → bruto, precarga JSON formateado
    if (!this.modoPiDataRaw) {
      const obj = this.pairsToObject(); // ya existe
      this.piDataRawText = JSON.stringify(obj, null, 2);
    }
    this.modoPiDataRaw = !this.modoPiDataRaw;
    this.validatePiDataRaw();
  }

  onTogglePiSchemaRaw(): void {
    if (!this.modoPiSchemaRaw) {
      const obj = this.schemaPairsToObject(); // ya existe
      this.piSchemaRawText = JSON.stringify(obj, null, 2);
    }
    this.modoPiSchemaRaw = !this.modoPiSchemaRaw;
    this.validatePiSchemaRaw();
  }

  onTogglePiValidaRaw(): void {
    if (!this.modoPiValidaRaw) {
      this.piValidaRawText = this.nuevaPlantilla.pi_valida
        ? JSON.stringify(this.nuevaPlantilla.pi_valida, null, 2)
        : '';
    }
    this.modoPiValidaRaw = !this.modoPiValidaRaw;
    this.validatePiValidaRaw();
  }

  validatePiDataRaw(): void {
    this.piDataRawError = !(
      this.piDataRawText?.trim() && this.isValidJson(this.piDataRawText)
    );
  }

  validatePiSchemaRaw(): void {
    this.piSchemaRawError = !(
      this.piSchemaRawText?.trim() && this.isValidJson(this.piSchemaRawText)
    );
  }

  validatePiValidaRaw(): void {
    if (!this.modoPiValidaRaw) {
      this.piValidaRawError = false;
      return;
    }
    // Si quieres exigir JSON válido en valida raw:
    this.piValidaRawError = !(
      this.piValidaRawText?.trim() && this.isValidJson(this.piValidaRawText)
    );
  }

  abrirAsignarJob(plantilla: Plantilla_IntegracionI): void {
    this.plantillaParaJob = plantilla;
    this.mostrarDialogoAsignarJob = true;
    this.cargarJobsOptions();
  }

  validateJobParamsRaw(): void {
    if (!this.jobParamsRawText?.trim()) {
      this.jobParamsRawError = false; // vacío es permitido
      return;
    }
    try {
      JSON.parse(this.jobParamsRawText);
      this.jobParamsRawError = false;
    } catch {
      this.jobParamsRawError = true;
    }
  }

  cargarJobsOptions(): void {
    // TODO: reemplazar por tu servicio real de JOBs
    // this.jobsService.getAll().subscribe(...)
    this.jobOptions = [
      { label: 'JOB Diario (ID 101)', value: 101 },
      { label: 'JOB Semanal (ID 102)', value: 102 },
      { label: 'JOB Mensual (ID 103)', value: 103 },
    ];
  }

  guardarAsignacionJob(): void {
    if (!this.plantillaParaJob || !this.selectedJobId || this.jobParamsRawError)
      return;

    const payload = {
      pi_id: this.plantillaParaJob.pi_id,
      job_id: this.selectedJobId,
      params: this.jobParamsRawText?.trim()
        ? JSON.parse(this.jobParamsRawText)
        : null,
    };

    // TODO: llama a tu endpoint real de asignación
    // this.plantillaIntegracionService.asignarJob(payload).subscribe({
    //   next: () => { ... },
    //   error: () => { ... }
    // });

    // Por ahora, feedback inmediato:
    console.log('Asignar JOB payload:', payload);
    this.messageService.add({
      severity: 'success',
      summary: 'JOB asignado',
      detail: `Se asignó el JOB ${this.selectedJobId} a la plantilla.`,
    });
    this.mostrarDialogoAsignarJob = false;
  }
}
