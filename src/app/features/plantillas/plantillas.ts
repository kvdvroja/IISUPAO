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

  activeTab: 'integracion' | 'destino' = 'integracion';
  plantillaIntegracionService = inject(PlantillaIntegracionS);
  cdRef = inject(ChangeDetectorRef);
  pantallaPequena = false;
  mostrarDialogoAgregar = false;
  registroExitoso = false;
  plantillaISeleccionado: Plantilla_IntegracionI | null = null;
  modoFiltradoPorSistema: boolean = false;

  plantillas: Plantilla_IntegracionI[] = [];

  opcionesTipoServicio = [
    { label: 'REST', value: 'REST' },
    { label: 'SOAP', value: 'SOAP' },
    { label: 'FTP', value: 'FTP' },
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

  nuevaPlantilla: Plantilla_IntegracionI = {
    pi_id: '',
    pi_codigo: '',
    pi_nombre: '',
    pi_descripcion: '',
    pi_ind_estado: '',
    pi_fecha_actividad: '',
    pi_tipo_servicio: '',
    pi_sist_orig_id: '',
    pi_data: '',
    pi_numreg_peticion: '',
    pi_schema: '',
    pi_url: '',
    pi_metodo_http: '',
    pi_sist_id: '',
    pi_cola_id: '',
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
    console.log('Editar plantilla:', plantilla);
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
    this.nuevaPlantilla = {
      pi_id: '',
      pi_codigo: '',
      pi_nombre: '',
      pi_descripcion: '',
      pi_ind_estado: '',
      pi_fecha_actividad: '',
      pi_tipo_servicio: '',
      pi_sist_orig_id: '',
      pi_data: '',
      pi_numreg_peticion: '',
      pi_schema: '',
      pi_url: '',
      pi_metodo_http: '',
      pi_sist_id: '',
      pi_cola_id: '',
      pi_valida: '',
      pi_transforma: '',
    };
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
  }

  guardarNuevaPlantilla(): void {
    const nueva = { ...this.nuevaPlantilla };
    nueva.pi_id = Date.now().toString();
    nueva.pi_fecha_actividad = new Date().toISOString();
    nueva.pi_codigo =
      'PL-' +
      Math.floor(Math.random() * 10000)
        .toString()
        .padStart(4, '0');
    nueva.pi_ind_estado = 'Activo';
    nueva.pi_valida = 'N';
    nueva.pi_transforma = 'N';
    nueva.pi_data = '{}';
    nueva.pi_numreg_peticion = '0';
    nueva.pi_schema = '{}';
    nueva.pi_sist_id = '';
    nueva.pi_cola_id = '';

    this.plantillas.push(nueva);
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = true;
  }

  verTodasLasPlantillasD(): void {
    this.activeTab = 'destino';
    this.modoFiltradoPorSistema = false;
    this.plantillaISeleccionado = null;
  }
}
