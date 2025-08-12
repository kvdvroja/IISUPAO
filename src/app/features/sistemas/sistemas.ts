import { Component, OnChanges, OnInit, inject } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { Table } from 'primeng/table';
import { InputIcon } from 'primeng/inputicon';
import { ChangeDetectorRef } from '@angular/core';
import { IconField } from 'primeng/iconfield';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { Toast } from 'primeng/toast';
import { ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { SistemasI } from '../../core/interfaces/Sistemas';
import { FormsModule } from '@angular/forms';
import { SistemasS } from '../../core/services/mant/sistemas/sistemas';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Endpoints } from '../endpoints/endpoints';
import {
  EventEmitter,
  Output,
  Input,
  SimpleChanges,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-sistemas',
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
    Endpoints,
    SplitButtonModule,
  ],
  templateUrl: './sistemas.html',
  styleUrl: './sistemas.css',
})
export class Sistemas implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('endpointsCmp', { static: true }) endpointsComponent!: Endpoints;
  @Output() stepNavigate = new EventEmitter<string>();
  @Output() stepProgress = new EventEmitter<number>();
  @Input() tabFromParent: 'systems' | 'endpoints' | null = null;
  sistemasService = inject(SistemasS);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmService = inject(ConfirmationService);
  @ViewChild('dt') dt!: Table;
  pantallaPequena = false;
  mostrarSoloPendientes: boolean = false;
  mostrarDialogoAgregar: boolean = false;
  registroExitoso: boolean = false;
  sistemas!: SistemasI[];
  editando: boolean = false;
  activeTab: 'systems' | 'endpoints' = 'systems';
  sistemaSeleccionado: SistemasI | null = null;
  modoFiltradoPorSistema: boolean = false;
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
      command: () => {
        if (this.activeTab === 'systems') {
          this.cargarSistemas();
        } else if (this.activeTab === 'endpoints') {
          this.endpointsComponent?.cargarEndpoints();
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
    this.cargarSistemas();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tabFromParent'] && this.tabFromParent) {
      // navega internamente cuando el padre cambie de step
      this.goTab(this.tabFromParent);
    }
  }

  get sistemasFiltradas(): any[] {
    return this.sistemas;
  }

  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt?.filterGlobal(valor, 'contains');
  }
  onBuscarGlobal(event: Event): void {
    const input = (event.target as HTMLInputElement).value;

    if (this.activeTab === 'systems') {
      this.dt.filterGlobal(input, 'contains');
    } else if (this.activeTab === 'endpoints') {
      this.endpointsComponent?.filtrarDesdePadre(input);
    }
  }

  cargarSistemas(): void {
    this.sistemasService.getAllSistemas().subscribe({
      next: (res) => {
        this.sistemas = res.result.data;
        this.cdRef.detectChanges();
      },
      error: (err) => console.error('Error al cargar sistemas', err),
    });
  }

  AgregarSistema(): void {
    this.mostrarDialogoAgregar = true;
    this.editando = false;
    this.limpiarFormulario();
  }

  mapToPayload(sistema: any): any {
    return {
      system_id: sistema.sistema_id,
      system_name: sistema.sistema_nombre,
      system_description: sistema.sistema_descripcion,
      system_status: sistema.sistema_ind_estado,
      user_id: sistema.sistema_usua_id,
    };
  }

  volver() {
    this.activeTab = 'systems';
    this.stepNavigate.emit('SISTEMAS');
    this.sistemaSeleccionado = null;
    this.modoFiltradoPorSistema = false;
  }

  showEditar(sistema: SistemasI): void {
    this.editando = true;
    this.mostrarDialogoAgregar = true;
    this.nuevoSistema = { ...sistema };
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

  goTab(
    tab: 'systems' | 'endpoints',
    opts?: { pct?: number; byStep?: boolean }
  ) {
    this.activeTab = tab;

    // avisa al padre qué paso debe mostrarse en el menú instructivo
    this.stepNavigate.emit(tab === 'endpoints' ? 'endpoints' : 'SISTEMAS');

    // (opcional) si pasas un porcentaje, súbelo
    if (opts?.pct !== undefined) {
      this.stepProgress.emit(opts.pct); // ej. 40, 60, 80...
    }
  }

  volverASistemas(): void {
    this.activeTab = 'systems';
    this.modoFiltradoPorSistema = false;
    this.sistemaSeleccionado = null;
  }

  verEndpoints(sistema: SistemasI): void {
    this.sistemaSeleccionado = sistema;
    this.activeTab = 'endpoints';
    this.modoFiltradoPorSistema = true;
  }
  verTodosLosEndpoints(): void {
    this.activeTab = 'endpoints';
    this.stepNavigate.emit('endpoints');
    this.modoFiltradoPorSistema = false;
    this.sistemaSeleccionado = null;
  }

  abrirModalAgregarEndpoint(sistema: SistemasI): void {
    this.sistemaSeleccionado = sistema;
    this.activeTab = 'endpoints';
    this.stepNavigate.emit('endpoints');
    this.modoFiltradoPorSistema = true;
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
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo guardar el sistema',
        });
        console.error(err);
      },
    });
  }

  ngAfterViewInit(): void {
    if (this.endpointsComponent) {
    } else {
      console.error('endpointsComponent no está inicializado.');
    }
  }

  agregarDesdeEndpoints(): void {
    this.endpointsComponent.AgregarEndpoint();
  }

  agregarDesdeEndpointsT(sistema_id: string): void {
    // NO cambiamos activeTab
    this.endpointsComponent.AgregarEndpointT(sistema_id);
  }

  exportarDatos(): void {
    console.log('Exportando datos...');
  }

  eliminarSistema(sistema: SistemasI): void {
    this.confirmService.confirm({
      message: `¿Deseas eliminar el sistema "${sistema.sistema_nombre}"?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const payload = {
          system_id: sistema.sistema_id,
          user_id: 'ADMIN',
        };

        this.sistemasService.sistemasCrud(payload as any, 'D').subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Sistema eliminado',
              detail: 'El sistema fue eliminado exitosamente.',
            });
            this.cargarSistemas();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar el sistema',
            });
            console.error(err);
          },
        });
      },
    });
  }
}
