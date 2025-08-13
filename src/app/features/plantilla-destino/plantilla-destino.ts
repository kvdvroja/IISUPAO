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
  @Input() plantillaIId!: string | null | undefined;
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
  confirmService = inject(ConfirmationService);
  plantillaIntegracionService = inject(PlantillaIntegracionS);
  pantallaPequena = false;
  plantillasI: Plantilla_IntegracionI[] = [];
  plantillasIOptions: { label: string; value: string | number }[] = [];
  sistemasOptions: { label: string; value: string }[] = [];

  sistemas: SistemasI[] = [];
  mostrarDialogoAgregar: boolean = false;
  plantillaDestinos: Plantilla_DestinoI[] = [];
  editando: boolean = false;

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
    pd_ind_estado: '',
    pd_sist_dest_id: '',
    pd_schema: '',
    pd_sist_id: '',
    pd_url: '',
    pd_metodo_http: '',
    pd_tipo_transformacion: '',
  };

  ngOnInit(): void {
    this.cargarPlantillas();
    this.cargarPlantillasIntegracion();
    this.cargarSistemasOptions();
  }

  onBuscarGlobal(event: Event): void {
    const input = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(input, 'contains');
  }

  expordarDatos(): void {}

  private cargarPlantillasIntegracion(): void {
    this.plantillaIntegracionService.getAllPlantillas().subscribe({
      next: (res) => {
        this.plantillasI = res.result.data;
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
        this.sistemas = res.result.data;
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
        this.plantillaDestinos = response.result.data;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando plantillas destino', err);
      },
    });
  }
  get datosFiltrados(): Plantilla_DestinoI[] {
    return this.plantillaDestinos;
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
      pd_id: '',
      pd_plan_inte_id: '',
      pd_priodridad: '',
      pd_ind_estado: 'A',
      pd_sist_dest_id: '',
      pd_schema: '',
      pd_sist_id: '',
      pd_url: '',
      pd_metodo_http: '',
      pd_tipo_transformacion: '',
    };
  }
  guardarNuevo(): void {
    if (
      !this.nuevo.pd_plan_inte_id ||
      !this.nuevo.pd_priodridad ||
      !this.nuevo.pd_sist_dest_id ||
      !this.nuevo.pd_url ||
      !this.nuevo.pd_metodo_http ||
      !this.nuevo.pd_tipo_transformacion
    )
      return;
    console.log('Nuevo objeto:', this.nuevo);
    if (!this.editando) {
      this.nuevo.pd_id = null;
    }

    if (this.editando && this.nuevo.pd_id) {
      this.nuevo.pd_id = Number(this.nuevo.pd_id);
    }

    const accion = this.editando ? 'U' : 'I';
    const payload = { ...this.nuevo };

    this.plantillaDestinoService
      .plantillaDestinoCrud(payload as any, accion)
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
    opts: {
      planInteId?: string | number;
      sistId?: string | number;
    } = {}
  ): void {
    this.mostrarDialogoAgregar = true;
    this.editando = false;
    this.limpiarFormulario();
    if (opts.planInteId != null)
      this.nuevo.pd_plan_inte_id = String(opts.planInteId);
    if (opts.sistId != null) this.nuevo.pd_sist_id = String(opts.sistId);

    this.cdRef.detectChanges();
  }

  agregarTransformacionCampos(row: Plantilla_DestinoI): void {
    if (!row?.pd_id) return;
    this.transfCmp?.abrirAgregarPreconfigurado({ pdId: row.pd_id });
  }
}
