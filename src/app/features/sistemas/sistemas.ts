import {
  Component,
  OnInit,
  OnChanges,
  AfterViewInit,
  ViewChild,
  inject,
  SimpleChanges,
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

import { SistemasI } from '../../core/interfaces/Sistemas';
import { SistemasS } from '../../core/services/mant/sistemas/sistemas';

import { Endpoints } from '../endpoints/endpoints';
import { Plantillas } from '../plantillas/plantillas';
import { TransformacionCampos } from '../transformacion-campos/transformacion-campos';
import { TableRowSelectEvent } from 'primeng/table';
import { PlantillaDestino } from '../plantilla-destino/plantilla-destino';

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
    FormsModule,
    Endpoints
  ],
  templateUrl: './sistemas.html',
  styleUrl: './sistemas.css',
})
export class Sistemas implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('dt') dt!: Table;
  @ViewChild('endpointsCmp', { static: false }) endpointsComponent!: Endpoints;

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
    sistema_ind_estado: '',
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

onRowSelectedEvent(ev: TableRowSelectEvent): void {
  const sistema = ev.data as SistemasI | undefined;
  if (!sistema) return;
  this.entrarADetalle(sistema);
}

  ngOnInit(): void {
    this.cargarSistemas();
  }
  ngOnChanges(_: SimpleChanges): void {}
  ngAfterViewInit(): void {}

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

  onLimpiar() {
    if (this.modo === 'lista') this.dt?.clear();
    else {
      if (this.currentStep === 'endpoints')
        this.endpointsComponent?.limpiarFormulario?.();
    }
  }

  cargarSistemas(): void {
    this.sistemasService.getAllSistemas().subscribe({
      next: (res) => {
        this.sistemas = res.result.data;
      },
      error: (err) => console.error('Error al cargar sistemas', err),
    });
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
      sistema_ind_estado: '',
    };
  }

  mapToPayload(s: any) {
    return {
      system_id: s.sistema_id,
      system_name: s.sistema_nombre,
      system_description: s.sistema_descripcion,
      system_status: s.sistema_ind_estado,
      user_id: s.sistema_usua_id,
    };
  }

  guardarNuevoSistema(): void {
    if (
      !this.nuevoSistema.sistema_nombre ||
      !this.nuevoSistema.sistema_descripcion
    )
      return;
    this.nuevoSistema.sistema_usua_id = 'ADMIN';
    this.nuevoSistema.sistema_ind_estado = 'A';
    const accion = this.editando ? 'U' : 'I';
    const payload = this.mapToPayload(this.nuevoSistema);

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

  eliminarSistema(s: SistemasI): void {
    this.confirmService.confirm({
      message: `¿Deseas eliminar el sistema "${s.sistema_nombre}"?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const payload = { system_id: s.sistema_id, user_id: 'ADMIN' };
        this.sistemasService.sistemasCrud(payload as any, 'D').subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sistema eliminado',
              detail: 'El sistema fue eliminado exitosamente.',
            });
            this.cargarSistemas();
          },
          error: () =>
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el sistema',
            }),
        });
      },
    });
  }

  // ===== Detalle / Steps internos =====
  entrarADetalle(s: SistemasI) {
    this.selectedSystem = s;
    this.modo = 'detalle';
    this.currentIndex = 0;
  }

  volverALaLista() {
    this.modo = 'lista';
    this.selectedSystem = null;
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
      if (s) this.entrarADetalle(s);
    }
    this.currentIndex = 0; // endpoints
    setTimeout(
      () => this.endpointsComponent?.AgregarEndpointT?.(sistema_id),
      0
    );
  }
}
