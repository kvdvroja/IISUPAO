import { Component, OnInit, AfterViewInit, OnChanges } from '@angular/core';
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
import { Input } from '@angular/core';
import { Toast } from 'primeng/toast';
import { ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { EndpointI } from '../../core/interfaces/Endpoint';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ChangeDetectorRef } from '@angular/core';
import { inject } from '@angular/core';
import { SistemasI } from '../../core/interfaces/Sistemas';
import { Endpoint } from '../../core/services/mant/endpoint/endpoint';
import { Output, EventEmitter } from '@angular/core';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Plantillas } from '../plantillas/plantillas';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { AutenticacionS } from '../../core/services/mant/autenticacion/autenticacion';

export type StepKey =
  | 'endpoints'
  | 'integracion'
  | 'destino'
  | 'campos'
  | 'valores';

@Component({
  selector: 'app-endpoints',
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
    Plantillas,
    ToggleSwitch,
    SplitButtonModule,
  ],
  templateUrl: './endpoints.html',
  styleUrl: './endpoints.css',
})
export class Endpoints implements OnInit, OnChanges {
  private _sistemasLista: SistemasI[] = [];
  @ViewChild('dt') dt!: Table;
  @ViewChild('plantCmp') plantCmp!: Plantillas;
  @Input() sistemaId!: string | null | undefined;

  @Output() stepNavigate = new EventEmitter<StepKey>();
  @Output() stepProgress = new EventEmitter<number>();
  @Input() set sistemasLista(value: SistemasI[]) {
    this._sistemasLista = value;
    this.sistemasOptions = value.map((s) => ({
      label: `${s.sistema_id} - ${s.sistema_nombre}`,
      value: s.sistema_id,
    }));
  }
  selectedEndpoint: EndpointI | null = null;
  ocultarTarjetaEndpoint = false;
  endpointService = inject(Endpoint);
  authService = inject(AutenticacionS);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  pantallaPequena = false;
  mostrarSoloPendientes: boolean = false;
  mostrarDialogoAgregar: boolean = false;
  registroExitoso: boolean = false;
  endpoint: EndpointI[] = [];
  sistemasOptions: { label: string; value: string }[] = [];
  authOptions: { label: string; value: string | number }[] = [];
  opcionesTransformacion = [
    { label: 'Sí', value: true },
    { label: 'No', value: false },
  ];

  httpMethodOptions = [
    { label: 'GET', value: 'GET' },
    { label: 'POST', value: 'POST' },
    { label: 'PUT', value: 'PUT' },
    { label: 'PATCH', value: 'PATCH' },
    { label: 'DELETE', value: 'DELETE' },
    { label: 'HEAD', value: 'HEAD' },
    { label: 'OPTIONS', value: 'OPTIONS' },
  ];

  tipoOptions = [
    { label: 'NORMAL', value: 'NORM' },
    { label: 'Autenticación', value: 'AUTH' },
  ];

  nuevoEndpoint: any = {
    se_sistema_id: '',
    se_nombre: '',
    se_url: '',
    se_metodo_http: '',
    se_requiere_transformar: false,
    se_usua_id: '',
  };

  endpointParaEditar: any = {
    se_id: '',
    se_sistema_id: '',
    se_nombre: '',
    se_url: '',
    se_metodo_http: '',
    se_requiere_transformar: false,
    se_usua_id: '',
    se_ind_estado: '',
  };

  accionesDropdown = [
    {
      label: 'Refrescar',
      icon: 'pi pi-refresh',
      command: () => {
        this.cargarEndpoints;
      },
    },
    {
      label: 'Exportar',
      icon: 'pi pi-download',
      command: () => this.exportarDatos(),
    },
  ];
  ngOnInit(): void {
    //this.cargarEndpoints();
  }

  cargarAuthOptions(): void {
    this.authService.getAllAutenticacion().subscribe({
      next: (res) => {
        const rows = res?.result?.data ?? [];
        this.authOptions = rows.map((r: any) => ({
          label: `${r.auth_codigo ?? r.auth_id} - ${
            r.auth_nombre ?? ''
          }`.trim(),
          value: r.auth_id, // ajusta al campo real de tu tabla
        }));
      },
      error: (e) => console.error('Error cargando opciones de auth', e),
    });
  }

  ngOnChanges(): void {
    this.cargarEndpoints();
  }

  filtrarGlobal(event: Event) {
    const input = event.target as HTMLInputElement;
    this.dt.filterGlobal(input.value, 'contains');
  }

  exportarDatos() {}

  get endpointsFiltrados(): any[] {
    if (!this.sistemaId) return this.endpoint;
    return this.endpoint.filter(
      (endpoint) => endpoint.se_sistema_id === this.sistemaId
    );
  }

  filtrarDesdePadre(valor: string): void {
    if (this.dt) {
      this.dt.filterGlobal(valor, 'contains');
    }
  }

  onBuscarGlobal(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(input, 'contains');
  }

  cargarEndpoints(): void {
    this.endpointService.getAllEndpoints().subscribe({
      next: (response) => {
        this.endpoint = response.result.data;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando endpoints', err);
      },
    });
  }

  showEditar(endpoint: EndpointI): void {
    this.nuevoEndpoint = {
      ...endpoint,
      se_tipo: (endpoint as any).se_tipo ?? 'NORM',
      se_auth_id: (endpoint as any).se_auth_id ?? null,
      se_requiere_transformar: !!(endpoint as any).se_requiere_transformar,
    };
    this.mostrarDialogoAgregar = true;
    this.cargarAuthOptions();
  }

  onTipoChange(): void {
    if (this.nuevoEndpoint.se_tipo === 'NORM') {
      this.nuevoEndpoint.se_auth_id = null;
    }
  }

  AgregarEndpoint(): void {
    if (this.sistemaId) {
      this.nuevoEndpoint.se_sistema_id = this.sistemaId;
    }
    this.mostrarDialogoAgregar = true;
    this.cargarAuthOptions();
  }

  AgregarEndpointT(sistema_id: string): void {
    this.nuevoEndpoint.se_sistema_id = sistema_id;
    this.mostrarDialogoAgregar = true;
    this.cargarAuthOptions();
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.nuevoEndpoint = {
      se_sistema_id: '',
      se_nombre: '',
      se_url: '',
      se_metodo_http: '',
      se_requiere_transformar: false,
      se_usua_id: '',
    };
  }

guardarNuevoEndpoint(): void {
  if (
    !this.nuevoEndpoint.se_sistema_id ||
    !this.nuevoEndpoint.se_nombre ||
    !this.nuevoEndpoint.se_url ||
    !this.nuevoEndpoint.se_metodo_http ||
    !this.nuevoEndpoint.se_tipo ||
    (this.nuevoEndpoint.se_tipo === 'AUTH' && !this.nuevoEndpoint.se_auth_id)
  ) {
    return;
  }

  this.nuevoEndpoint.se_usua_id = 'ADMIN';
  this.nuevoEndpoint.se_ind_estado = this.nuevoEndpoint.se_ind_estado || 'A';

  if (this.nuevoEndpoint.se_tipo === 'NORM') {
    this.nuevoEndpoint.se_auth_id = null;
  }

  const action = this.nuevoEndpoint.se_id ? 'U' : 'I';

  this.endpointService.endpointCrud(this.nuevoEndpoint, action).subscribe({
    next: () => {
      this.messageService.add({
        severity: 'success',
        summary: action === 'I' ? 'Endpoint agregado' : 'Endpoint actualizado',
        detail: 'Operación exitosa',
      });
      this.registroExitoso = true;
      this.cargarEndpoints();
      this.cerrarDialogoAgregar();
    },
    error: (err) => {
      console.error('Error al guardar endpoint', err);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'No se pudo guardar el endpoint',
      });
    },
  });
}

  eliminarEndpoint(endpoint: any): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este endpoint?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.endpointService.endpointCrud(endpoint, 'D').subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Endpoint eliminado',
              detail: 'El endpoint fue eliminado exitosamente.',
            });
            this.cargarEndpoints();
          },
          error: (err) => {
            console.error('Error al eliminar endpoint', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un error al eliminar el endpoint.',
            });
          },
        });
      },
      reject: () => {
        console.log('Eliminación cancelada');
      },
    });
  }
  crearPlantillaIntegracion(ep: EndpointI): void {
    if (!this.plantCmp) {
      console.warn('plantCmp aún no está disponible');
      return;
    }
    this.plantCmp.abrirAgregarDesdeEndpoint(ep.se_id);
  }

  onEndpointSelected(ep: EndpointI) {
    this.selectedEndpoint = ep;
    this.ocultarTarjetaEndpoint = false;
    this.stepNavigate.emit('integracion');

    setTimeout(
      () =>
        document
          .getElementById('plantillasPorEndpoint')
          ?.scrollIntoView({ behavior: 'smooth' }),
      0
    );
  }

  limpiarSeleccion() {
    this.selectedEndpoint = null;
    this.ocultarTarjetaEndpoint = false;
    this.stepNavigate.emit('endpoints');
  }

  onChildStep(step: StepKey) {
    this.stepNavigate.emit(step);
    this.ocultarTarjetaEndpoint =
      step === 'destino' || step === 'campos' || step === 'valores';
  }

  onToggleAuth(): void {
    if (!this.nuevoEndpoint.se_requiere_auth) {
      this.nuevoEndpoint.se_auth_id = null;
    }
  }
}
