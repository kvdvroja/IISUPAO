import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { Dialog } from 'primeng/dialog';
import { Toast } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';

import { SistemasI } from '../../core/interfaces/Sistemas';
import { EndpointI } from '../../core/interfaces/Endpoint';
import { SistemasS } from '../../core/services/mant/sistemas/sistemas';

import { Endpoints } from '../endpoints/endpoints';
import { TableRowSelectEvent } from 'primeng/table';
import { ToggleSwitch } from 'primeng/toggleswitch';

type StepKey = 'endpoints' | 'integracion' | 'destino' | 'campos' | 'valores';

@Component({
  selector: 'app-sistemas',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    InputIcon,
    IconField,
    Dialog,
    Toast,
    ConfirmDialogModule,
    SplitButtonModule,
    ToggleSwitch,
    FormsModule,
    Endpoints,
  ],
  templateUrl: './sistemas.html',
  styleUrl: './sistemas.css',
})
export class Sistemas implements OnInit {
  @ViewChild('dt') dt!: Table;
  @ViewChild('endpointsCmp', { static: false }) endpointsComponent!: Endpoints;
  selectedEndpoint: EndpointI | null = null;
  endpointIdForPlantillas: string | number | null = null;

  onEndpointSeleccionado(endpoint: EndpointI): void {
    this.selectedEndpoint = endpoint;
    console.log('Endpoint seleccionado:', this.selectedEndpoint);
  }
  informacionHeader: string = '';

  modo: 'lista' | 'detalle' = 'lista';

  steps = [
    {
      key: 'endpoints' as StepKey,
      title: 'ENDPOINTS',
      desc: 'Gestión de endpoints del sistema seleccionado',
      icon: '🔗',
    },
    {
      key: 'integracion' as StepKey,
      title: 'PLANTILLA INTEGRACIÓN',
      desc: 'Definir plantilla de integración',
      icon: '🔄',
    },
    {
      key: 'destino' as StepKey,
      title: 'PLANTILLA DESTINO',
      desc: 'Mapear campos de destino',
      icon: '📤',
    },
    {
      key: 'campos' as StepKey,
      title: 'TRANSFORMACIÓN DE CAMPOS',
      desc: 'Transformar campos',
      icon: '⚙️',
    },
    {
      key: 'valores' as StepKey,
      title: 'TRANSFORMACIÓN DE VALORES',
      desc: 'Transformar valores',
      icon: '🔧',
    },
  ];
  currentIndex = 0;

  get currentStep(): StepKey {
    return this.steps[this.currentIndex].key;
  }
  get tituloStepActual(): string {
    return this.steps[this.currentIndex].title;
  }
  get descripcionStepActual(): string {
    return this.steps[this.currentIndex].desc;
  }

  get pills() {
    return this.steps;
  }

  sistemas: SistemasI[] = [];
  selectedSystem: SistemasI | null = null;

  mostrarDialogoAgregar = false;
  registroExitoso = false;
  editando = false;

  nuevoSistema: any = {
    sistema_id: '',
    sistema_nombre: '',
    sistema_descripcion: '',
    sistema_usua_id: '',
    sistema_requiere_auth: false,
  };

  accionesDropdown = [
    {
      label: 'Refrescar',
      icon: 'pi pi-refresh',
      command: () => this.onRefrescar(),
    },
    {
      label: 'Exportar',
      icon: 'pi pi-download',
      command: () => this.exportarDatos(),
    },
  ];

  sistemasService = inject(SistemasS);
  messageService = inject(MessageService);
  confirmService = inject(ConfirmationService);
  cdr = inject(ChangeDetectorRef)

  onRowSelectedEvent(ev: TableRowSelectEvent): void {
    const sistema = ev.data as SistemasI | undefined;
    if (!sistema) return;
    this.entrarADetalle(sistema);
  }

  ngOnInit(): void {
    this.cargarSistemas();
  }

  cargarSistemas(): void {
    this.sistemasService.getAllSistemas().subscribe({
      next: (res) => {
        this.sistemas = res.data;
        this.cdr.detectChanges();  // Solo si es necesario
      },
      error: (err) => console.error('Error al cargar sistemas', err),
    });
  }

  get sistemasFiltradas(): SistemasI[] {
    return this.sistemas;
  }

  onBuscarGlobal(event: Event) {
    const value = (event.target as HTMLInputElement).value || '';
    if (this.modo === 'lista') this.dt?.filterGlobal(value, 'contains');
    else {
      this.endpointsComponent?.filtrarDesdePadre?.(value);
    }
  }

  exportarDatos() {
    this.messageService.add({
      severity: 'info',
      summary: 'Exportar',
      detail: 'Funcionalidad de exportación no implementada aún.',
    });
  }

  onRefrescar() {
    if (this.modo === 'lista') this.cargarSistemas();
    else {
      if (this.currentStep === 'endpoints')
        this.endpointsComponent?.cargarEndpoints();
    }
  }

  private stepToIndex: Record<StepKey, number> = {
    endpoints: 0,
    integracion: 1,
    destino: 2,
    campos: 3,
    valores: 4,
  };

  progressPct = 0;
  indicatorIndex = 0;

  onChildNavigate = (step: StepKey) => {
    const idx = this.stepToIndex[step];
    if (idx !== undefined) this.indicatorIndex = idx;
  };

  onChildProgress = (pct: number) => {
    this.progressPct = Math.max(0, Math.min(100, pct));
  };

  onLimpiar() {
    if (this.modo === 'lista') this.dt?.clear();
    else {
      if (this.currentStep === 'endpoints')
        this.endpointsComponent?.limpiarFormulario?.();
    }
  }

  AgregarSistema(): void {
    this.mostrarDialogoAgregar = true;
    this.editando = false;
    this.limpiarFormulario();
  }

  showEditar(s: SistemasI): void {
    this.editando = true;
    this.mostrarDialogoAgregar = true;
    this.nuevoSistema = { ...s };
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
    this.editando = false;
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {
    this.nuevoSistema = {
      sistema_nombre: '',
      sistema_descripcion: '',
      sistema_usua_id: '',
      sistema_requiere_auth: false,
    };
  }

  guardarNuevoSistema(): void {
    if (
      !this.nuevoSistema.sistema_nombre ||
      !this.nuevoSistema.sistema_descripcion
    )
      return;
    this.nuevoSistema.sistema_usua_id = '000000044';
    const accion = this.editando ? 'U' : 'I';
    const payload = this.nuevoSistema;

    this.sistemasService.sistemasCrud(payload as any, accion).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: this.editando ? 'Sistema actualizado' : 'Sistema registrado',
          detail: 'Operación exitosa',
        });
        this.cerrarDialogoAgregar();
        this.cargarSistemas();
      },
      error: () =>
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo guardar el sistema',
        }),
    });
  }

  desactivarSistema(s: SistemasI | any): void {
    if (!s?.sistema_id) return;
    this.confirmService.confirm({
      key: 'sistemas-confirm',                         // 🔑
      header: 'Confirmación',
      message: `¿Deseas desactivar el sistema "${s.sistema_nombre}"?`,
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const payload = { sistema_id: s.sistema_id, sistema_usua_id: '000000044' };
        this.sistemasService.sistemasCrud(payload as any, 'D').subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sistema desactivado', detail: 'El sistema fue desactivado correctamente.' });
            if (this.selectedSystem?.sistema_id === s.sistema_id) {
              this.selectedSystem = { ...this.selectedSystem, sistema_ind_estado: 'I' } as any;
            }
            this.cerrarDialogoAgregar();
            this.cargarSistemas();
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo desactivar el sistema.' })
        });
      }
    });
  }

  eliminarSistema(s: SistemasI): void {
    this.confirmService.confirm({
      key: 'sistemas-confirm',                         // 🔑
      message: `¿Deseas eliminar el sistema "${s.sistema_nombre}"?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const payload = { sistema_id: s.sistema_id, sistema_usua_id: '000000044' };
        this.sistemasService.sistemasCrud(payload as any, 'E').subscribe({
          next: () => {
            this.messageService.add({ severity: 'success', summary: 'Sistema eliminado', detail: 'El sistema fue eliminado exitosamente.' });
            this.cargarSistemas();
          },
          error: () => this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo eliminar el sistema.' })
        });
      }
    });
  }


  entrarADetalle(s: SistemasI) {
    this.selectedSystem = s;
    this.modo = 'detalle';
    this.currentIndex = 0;
  }

  volverALaLista() {
    this.modo = 'lista';
    this.selectedSystem = null;    // Limpiar el sistema seleccionado
    this.selectedEndpoint = null;  // Limpiar el endpoint seleccionado
    this.currentIndex = 0;
  }

  goStep(key: StepKey) {
    const idx = this.steps.findIndex((st) => st.key === key);
    if (idx >= 0) this.currentIndex = idx;
  }
  nextStep() {
    this.currentIndex = Math.min(this.currentIndex + 1, this.steps.length - 1);
  }
  prevStep() {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
  }

  onNuevoEnStepActual() {
    if (this.currentStep === 'endpoints')
      this.endpointsComponent?.AgregarEndpoint?.();
  }

  agregarDesdeEndpointsT(sistema_id: string) {
    if (!this.selectedSystem || this.selectedSystem.sistema_id !== sistema_id) {
      const s = this.sistemas.find((x) => x.sistema_id === sistema_id);
    }
    setTimeout(
      () => this.endpointsComponent?.AgregarEndpointT?.(sistema_id),
      0
    );
  }

  toggleEstadoSistema(): void {
    this.nuevoSistema.sistema_ind_estado =
      this.nuevoSistema.sistema_ind_estado === 'A' ? 'I' : 'A';
  }
}
