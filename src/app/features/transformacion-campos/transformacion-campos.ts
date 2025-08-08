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
  ],
  providers: [MessageService, ConfirmationService],
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
  cdRef = inject(ChangeDetectorRef);
  pantallaPequena = false;
  mostrarDialogoAgregar = false;
  activeTab: 'campos' | 'valores' = 'campos';
  camposSeleccionado: Transformacion_CamposI | null = null;
  modoFiltradoPorSistema: boolean = false;
  mostrarSoloPendientes: boolean = false;
  registroExitoso: boolean = false;
  campos: Transformacion_CamposI[] = [];

  nuevoCampo: Transformacion_CamposI = {
    ct_id: '',
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

  exportarDatos(): void {
  }

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
  }
  agregarDesdeValores(): void {
    this.valoresComponent.mostrarDialogoAgregar = true;
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
  }

  guardarNuevo(): void {
    const nuevo = { ...this.nuevoCampo };
    nuevo.ct_id = Date.now().toString();
    nuevo.ct_fecha_actividad = new Date().toISOString();
    nuevo.ct_usua_id = 'USR001';
    this.campos.push(nuevo);
    this.mostrarDialogoAgregar = false;
  }

  showEditar(campo: Transformacion_CamposI): void {
    console.log('Editar campo:', campo);
  }

  verTodasLosValores(): void {
    this.activeTab = 'valores';
    this.modoFiltradoPorSistema = false;
    this.camposSeleccionado = null;
  }
}
