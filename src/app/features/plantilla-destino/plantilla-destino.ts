import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { ButtonModule } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { SelectModule } from 'primeng/select';
import { ChangeDetectorRef } from '@angular/core';
import { Toast } from 'primeng/toast';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Plantilla_DestinoI } from '../../core/interfaces/Plantilla_Destino';
import { PlantillaDestinoS } from '../../core/services/mant/plantilla-destino/plantilla-destino';
import { Input } from '@angular/core';
import { Plantilla_IntegracionI } from '../../core/interfaces/Plantilla_Integracion';
import { PlantillaIntegracionS } from '../../core/services/mant/plantilla-integracion/plantilla-integracion';
import { SistemasI } from '../../core/interfaces/Sistemas';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SistemasS } from '../../core/services/mant/sistemas/sistemas';
import { TransformacionCampos } from '../transformacion-campos/transformacion-campos';
import { Endpoint } from '../../core/services/mant/endpoint/endpoint';
import { EndpointI } from '../../core/interfaces/Endpoint';
import { Output, EventEmitter } from '@angular/core';

export type StepKey =
  | 'endpoints'
  | 'integracion'
  | 'destino'
  | 'campos'
  | 'valores';

@Component({
  selector: 'app-plantilla-destino',
  standalone: true,
  templateUrl: './plantilla-destino.html',
  styleUrl: './plantilla-destino.css',
  imports: [
    CommonModule,
    FormsModule,
    ConfirmDialogModule,
    TableModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    Dialog,
    Toast,
    InputIcon,
    SelectModule,
    IconField,
    TransformacionCampos,
    SplitButtonModule,
  ],
})
export class PlantillaDestino implements OnInit {
  @ViewChild('dt') dt!: Table;
  @ViewChild('transfCmp') transfCmp!: TransformacionCampos;
  @Input() plantillaIId!: string | number | null | undefined;
  @Input() sistIdFromParent: string | number | null = null;
  @Output() stepNavigate = new EventEmitter<StepKey>();
  @Input() set sistemasLista(value: SistemasI[] | null | undefined) {
    if (!value) {
      this.sistemasOptions = [];
      return;
    }
    this.sistemasOptions = value.map((s) => ({
      label: `${s.sistema_id} - ${s.sistema_nombre}`,
      value: String(s.sistema_id),
    }));
  }
  plantillaDestinoService = inject(PlantillaDestinoS);
  sistemasService = inject(SistemasS);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  endpointService = inject(Endpoint);
  confirmService = inject(ConfirmationService);
  plantillaIntegracionService = inject(PlantillaIntegracionS);
  selectedDestino: Plantilla_DestinoI | null = null;
  ocultarTarjetaPlantillaD: boolean = false;
  pantallaPequena = false;
  plantillasI: Plantilla_IntegracionI[] = [];
  plantillasIOptions: { label: string; value: string | number }[] = [];
  sistemasOptions: { label: string; value: string }[] = [];

  sistemas: SistemasI[] = [];
  mostrarDialogoAgregar: boolean = false;
  plantillaDestinos: Plantilla_DestinoI[] = [];
  editando: boolean = false;

  endpoints: EndpointI[] = [];
  endpointsOptions: { label: string; value: number }[] = [];

  prioridadOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];

  httpMethodOptions = [
    { label: 'POST', value: 'POST' },
    { label: 'GET', value: 'GET' },
    { label: 'DELETE', value: 'DELETE' },
    { label: 'UPDATE', value: 'UPDATE' },
  ];

  transformacionOptions = [
    { label: 'Directa', value: 'DIRECTA' },
    { label: 'Mapeo', value: 'MAPEO' },
    { label: 'Custom', value: 'CUSTOM' },
  ];

  accionesDropdown = [
    {
      label: 'Refrescar',
      icon: 'pi pi-refresh',
      command: () => this.cargarPlantillas(),
    },
    {
      label: 'Exportar',
      icon: 'pi pi-download',
      command: () => this.expordarDatos(),
    },
  ];

  nuevo: any = {
    pd_plan_inte_id: '',
    pd_priodridad: '',
    pd_sist_dest_id: '',
    pd_schema: '',
    pd_sist_id: '',
    pd_tipo_transformacion: '',
  };

  ngOnInit(): void {
    //this.cargarPlantillas();
    //this.cargarPlantillasIntegracion();
    //this.cargarSistemasOptions();
  }

  ngOnChanges(): void {
    this.cargarPlantillas();
  }

  onBuscarGlobal(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(input, 'contains');
  }

  expordarDatos(): void {}

  private cargarPlantillasIntegracion(): void {
    this.plantillaIntegracionService.getAllPlantillas().subscribe({
      next: (res) => {
        this.plantillasI = res.data;
        this.plantillasIOptions = this.plantillasI.map((p) => ({
          label: `${p.pi_codigo ?? p.pi_id} - ${p.pi_nombre} [${
            p.pi_metodo_http
          }]`,
          value: String(p.pi_id),
        }));
        if (!this.editando && this.plantillaIId) {
          this.nuevo.pd_plan_inte_id = String(this.plantillaIId);
        }

        this.cdRef.detectChanges();
      },
      error: (err) =>
        console.error('Error cargando plantillas integración', err),
    });
  }

  private cargarSistemasOptions(): void {
    this.sistemasService.getAllSistemas().subscribe({
      next: (res) => {
        this.sistemas = res.data;
        this.sistemasOptions = this.sistemas.map((s) => ({
          label: `${s.sistema_id} - ${s.sistema_nombre}`,
          value: String(s.sistema_id),
        }));
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error cargando sistemas', err),
    });
  }

  cargarPlantillas(): void {
    this.plantillaDestinoService.getAllPlantillas().subscribe({
      next: (response) => {
        this.plantillaDestinos = response.data;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando plantillas destino', err);
      },
    });
  }
  get datosFiltrados(): Plantilla_DestinoI[] {
    if (this.plantillaIId == null || this.plantillaIId === '') {
      return this.plantillaDestinos;
    }
    const id = String(this.plantillaIId);
    return this.plantillaDestinos.filter(
      (d) => String(d.pd_plan_inte_id) === id
    );
  }

  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(valor, 'contains');
  }

  Agregar(): void {
    this.mostrarDialogoAgregar = true;
    this.editando = false;
    this.limpiarFormulario();
    if (this.plantillaIId) {
      this.nuevo.pd_plan_inte_id = String(this.plantillaIId);
    }
  }

  showEditar(row: Plantilla_DestinoI): void {
    this.editando = true;
    this.mostrarDialogoAgregar = true;
    this.nuevo = { ...row };

    if (this.nuevo.pd_sist_id) {
      this.onSistemaChange(String(this.nuevo.pd_sist_id));
    }
  }
  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
  }

  filtrarDesdePadre(valor: string): void {
    if (this.dt) {
      this.dt.filterGlobal(valor, 'contains');
    }
  }

  limpiarFormulario(): void {
    this.nuevo = {
      pd_plan_inte_id: '',
      pd_priodridad: '',
      pd_sist_dest_id: '',
      pd_schema: '',
      pd_sist_id: '',
      pd_tipo_transformacion: '',
    };
  }
  guardarNuevo(): void {
    if (
      !this.nuevo.pd_plan_inte_id ||
      !this.nuevo.pd_priodridad ||
      !this.nuevo.pd_sist_dest_id ||
      !this.nuevo.pd_tipo_transformacion
    )
      return;

    const payload: any = { ...this.nuevo };

    // normalizo tipos numéricos
    if (payload.pd_priodridad !== '' && payload.pd_priodridad != null) {
      const n = Number(payload.pd_priodridad);
      if (!Number.isNaN(n)) payload.pd_priodridad = n;
    }
    if (payload.pd_sist_dest_id !== '' && payload.pd_sist_dest_id != null) {
      const n = Number(payload.pd_sist_dest_id);
      if (!Number.isNaN(n)) payload.pd_sist_dest_id = n;
    }

    if (this.editando && payload.pd_id) {
      payload.pd_id = Number(payload.pd_id);
    }

    const accion = this.editando ? 'U' : 'I';

    this.plantillaDestinoService
      .plantillaDestinoCrud(payload, accion)
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: this.editando
              ? 'Plantilla actualizada'
              : 'Plantilla registrada',
            detail: 'Operación exitosa',
          });
          this.cerrarDialogoAgregar();
          this.cargarPlantillas();
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo guardar la plantilla destino',
          });
          console.error(err);
        },
      });
  }

  eliminar(row: Plantilla_DestinoI): void {
    this.confirmService.confirm({
      message: `¿Deseas eliminar la plantilla destino con ID: ${row.pd_id}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const payload = { pd_id: row.pd_id };

        this.plantillaDestinoService
          .plantillaDestinoCrud(payload as any, 'D')
          .subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Plantilla eliminada',
                detail: 'La plantilla destino fue eliminada exitosamente.',
              });
              this.cargarPlantillas();
            },
            error: (err) => {
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'No se pudo eliminar la plantilla destino',
              });
              console.error(err);
            },
          });
      },
    });
  }
  public abrirAgregarPreconfigurado(
    opts: { planInteId?: string | number; sistId?: string | number } = {}
  ): void {
    this.mostrarDialogoAgregar = true;
    this.editando = false;
    this.limpiarFormulario();

    // Precarga plan de integración
    if (opts.planInteId != null) {
      this.nuevo.pd_plan_inte_id = String(opts.planInteId);
      this.nuevo.pd_sist_id = String(opts.sistId);
    }

    // Carga combos (labels)
    this.cargarPlantillasIntegracion();
    this.cargarSistemasOptions();

    // sistId puede venir como sistema o como endpoint; lo resolvemos
    if (opts.sistId != null) {
      const id = String(opts.sistId);
      this.resolverSistemaDesdeSistemaOEndpoint(id);
    }

    this.cdRef.detectChanges();
  }

  agregarTransformacionCampos(row: Plantilla_DestinoI): void {
    if (!row?.pd_id) return;
    // this.selectedDestino = row; // asegura render del hijo + pdId
    setTimeout(() => {
      document
        .getElementById('camposPorDestino')
        ?.scrollIntoView({ behavior: 'smooth' });
      this.transfCmp?.abrirAgregarPreconfigurado({ pdId: row.pd_id });
    }, 0);
  }

  abrirDialogoNuevoCampo(): void {
    if (!this.selectedDestino?.pd_id) return;
    setTimeout(() => {
      this.transfCmp?.abrirAgregarPreconfigurado({
        pdId: this.selectedDestino!.pd_id,
      });
    }, 0);
  }

  onSistemaChange(sistId: string) {
    this.nuevo.pd_sist_id = String(sistId);

    this.endpointService.getAllEndpoints().subscribe({
      next: (res) => {
        const all: EndpointI[] = res.data;

        // filtra por el sistema
        this.endpoints = all.filter(
          (e: any) => String(e.se_sistema_id) === String(sistId)
        );

        // mapea opciones
        this.endpointsOptions = this.endpoints.map((e) => ({
          label: `${e.se_id} - ${e.se_nombre ?? e.se_url} [${
            e.se_metodo_http
          }]`,
          value: Number(e.se_id),
        }));

        // si estaba seleccionado un endpoint que ya no pertenece a este sistema, lo limpio
        if (this.nuevo.pd_sist_dest_id) {
          const exists = this.endpointsOptions.some(
            (o) => Number(this.nuevo.pd_sist_dest_id) === o.value
          );
          if (!exists) this.nuevo.pd_sist_dest_id = '';
        }

        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error cargando endpoints', err),
    });
  }

  onEndpointSelect(endpointId: number) {
    const ep = this.endpoints.find(
      (e) => Number(e.se_id) === Number(endpointId)
    );
    if (!ep) return;

    this.nuevo.pd_sist_dest_id = Number(endpointId);
  }

  onDestinoSelected(
    data: Plantilla_DestinoI | Plantilla_DestinoI[] | undefined
  ) {
    if (!data || Array.isArray(data)) return;
    this.selectedDestino = data;
    this.ocultarTarjetaPlantillaD = false;
    // Solo mueve el indicador a "campos"
    this.stepNavigate.emit('campos');

    setTimeout(
      () =>
        document
          .getElementById('camposPorDestino')
          ?.scrollIntoView({ behavior: 'smooth' }),
      0
    );
  }

  get pdIdAsNumber(): number | null {
    return this.selectedDestino?.pd_id != null
      ? Number(this.selectedDestino.pd_id)
      : null;
  }

  limpiarSeleccionDestino() {
    this.selectedDestino = null;
    // Vuelve el indicador a "destino"
    this.ocultarTarjetaPlantillaD = false;
    this.stepNavigate.emit('destino');
  }

  onChildStep(step: StepKey) {
    this.stepNavigate.emit(step);
    this.ocultarTarjetaPlantillaD = step === 'valores';
  }

  private resolverSistemaDesdeSistemaOEndpoint(id: string): void {
    // 1) Intento directo como sistema
    this.nuevo.pd_sist_id = String(id);
    this.onSistemaChange(this.nuevo.pd_sist_id);

    // 2) Si fue un endpointId por error, lo resuelvo a su se_sistema_id
    this.endpointService.getAllEndpoints().subscribe({
      next: (res) => {
        const all: EndpointI[] = res.data;
        const ep = all.find((e) => String(e.se_id) === String(id));
        if (ep) {
          this.nuevo.pd_sist_id = String((ep as any).se_sistema_id ?? '');
          this.onSistemaChange(this.nuevo.pd_sist_id);
          this.cdRef.detectChanges();
        }
      },
      error: (err) =>
        console.error('Error resolviendo sistema desde endpoint', err),
    });
  }
}
