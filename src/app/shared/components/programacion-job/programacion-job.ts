import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { Dialog } from 'primeng/dialog';
import { DatePicker } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { MessageService } from 'primeng/api';

import { Programacion_JobI } from '../../../core/interfaces/Programacion_Job';
import { ProgramacionJobS } from '../../../core/services/mant/programacion-job/programacion-job';

type NewOption = 'NEW';

@Component({
  selector: 'app-programacion-job',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Dialog,
    DatePicker,
    SelectModule,
    ButtonModule,
    InputTextModule,
    Textarea,
  ],
  templateUrl: './programacion-job.html',
  styleUrl: './programacion-job.css',
})
export class ProgramacionJob implements OnChanges {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() plantilla: any | null = null;

  @Output() save = new EventEmitter<{
    mode: 'insert' | 'update';
    programacion: any;
    params: any;
  }>();
  @Output() cancel = new EventEmitter<void>();

  progSrv = inject(ProgramacionJobS);
  msg = inject(MessageService);

  isEdit = false;
  loading = false;
  private prevVisible = false;


  programaciones: any[] = [];
  selectedProgId: number | NewOption | null = null;

  jobParamsRawText = '';
  jobParamsRawError = false;

  programacion: any = {
    pj_id: 0,
    pj_pi_id: '',
    pj_dia: 'ALL',
    pj_hora: '',
    pj_tipo: 'INCLUDE',
    pj_usua_id: '',
    pj_fecha: new Date(),
    pj_frecuencia: 'DIARIA',
    pj_dia_mes: 1,
    pj_fecha_unica: new Date(),
    pj_fecha_inicio: new Date(),
    pj_fecha_fin: new Date(),
    pj_descripcion: '',
    pj_ultima_ejecucion: new Date(),
    pj_proxima_ejecucion: new Date(),
    pj_zona_horaria: 'America/Lima',
    pj_prioridad: 1,
    pj_schedule_version: 1,
  };

  private resetAll(): void {
  this.isEdit = false;
  this.loading = false;

  this.programaciones = [];
  this.selectedProgId = 'NEW';

  this.jobParamsRawText = '';
  this.jobParamsRawError = false;

  this.programacion = {
    pj_id: 0,
    pj_pi_id: '',          
    pj_dia: 'ALL',
    pj_hora: '',
    pj_tipo: 'INCLUDE',
    pj_usua_id: '000000044',
    pj_fecha: new Date(),
    pj_frecuencia: 'DIARIA',
    pj_dia_mes: 1,
    pj_fecha_unica: new Date(),
    pj_fecha_inicio: new Date(),
    pj_fecha_fin: new Date(),
    pj_descripcion: '',
    pj_ultima_ejecucion: new Date(),
    pj_proxima_ejecucion: new Date(),
    pj_zona_horaria: 'America/Lima',
    pj_prioridad: 1,
    pj_schedule_version: 1,
  };
}

  zonasHorarias = [
    { label: 'America/Lima', value: 'America/Lima' },
    { label: 'UTC', value: 'UTC' },
    { label: 'America/Bogota', value: 'America/Bogota' },
    { label: 'America/Mexico_City', value: 'America/Mexico_City' },
  ];
  frecuencias = [
    { label: 'Diaria', value: 'DIARIA' },
    { label: 'Semanal', value: 'SEMANAL' },
    { label: 'Mensual', value: 'MENSUAL' },
    { label: 'Única', value: 'UNICA' },
  ];
  diasSemana = [
    { label: 'Todos', value: 'ALL' },
    { label: 'Lunes', value: 'LUN' },
    { label: 'Martes', value: 'MAR' },
    { label: 'Miércoles', value: 'MIE' },
    { label: 'Jueves', value: 'JUE' },
    { label: 'Viernes', value: 'VIE' },
    { label: 'Sábado', value: 'SAB' },
    { label: 'Domingo', value: 'DOM' },
  ];
  tiposRegla = [
    { label: 'Incluir', value: 'INCLUDE' },
    { label: 'Excluir', value: 'EXCLUDE' },
  ];
  estadosProg = [
    { label: 'Activo', value: 'ACTIVO' },
    { label: 'Inactivo', value: 'INACTIVO' },
    { label: 'Pausado', value: 'PAUSADO' },
  ];

ngOnChanges(changes: SimpleChanges): void {
  if (changes['visible']) {
    const now = this.visible;
    if (now && this.plantilla) {
      this.refreshListForPi();
    }
    if (!now && this.prevVisible) {
      this.resetAll();
    }
    this.prevVisible = now;
  }

  if (changes['plantilla'] && this.visible && this.plantilla) {
    this.refreshListForPi();
  }
}

  private refreshListForPi(): void {
    const pj_pi_id = String(this.plantilla?.pi_id ?? '');
    if (!pj_pi_id) {
      this.isEdit = false;
      this.programaciones = [];
      this.selectedProgId = 'NEW';
      this.presetForInsert();
      return;
    }

    this.loading = true;
    this.progSrv.getAllProgramacionJob().subscribe({
      next: (res) => {
        const all = res?.result?.data ?? [];
        const rows = (all as any[])
          .filter((r) => String(r.pj_pi_id) === pj_pi_id)
          .map((r) => this.coerceFromDb(r as any))
          .sort((a, b) => Number(b.pj_id) - Number(a.pj_id));

        this.programaciones = rows;

        if (rows.length > 0) {
          this.selectedProgId = rows[0].pj_id;
          this.isEdit = true;
          this.programacion = { ...rows[0] };
        } else {
          this.selectedProgId = 'NEW';
          this.isEdit = false;
          this.presetForInsert();
        }

        this.loading = false;
      },
      error: () => {
        this.programaciones = [];
        this.selectedProgId = 'NEW';
        this.isEdit = false;
        this.presetForInsert();
        this.loading = false;
      },
    });
  }

  private coerceFromDb(row: any): any {
    const toDate = (v: any, fall: Date = new Date()) =>
      v ? new Date(v) : fall;
    return {
      ...row,
      pj_fecha: toDate((row as any).pj_fecha),
      pj_fecha_unica: (row as any).pj_fecha_unica
        ? new Date((row as any).pj_fecha_unica)
        : new Date(),
      pj_fecha_inicio: (row as any).pj_fecha_inicio
        ? new Date((row as any).pj_fecha_inicio)
        : new Date(),
      pj_fecha_fin: (row as any).pj_fecha_fin
        ? new Date((row as any).pj_fecha_fin)
        : new Date(),
      pj_ultima_ejecucion: (row as any).pj_ultima_ejecucion
        ? new Date((row as any).pj_ultima_ejecucion)
        : new Date(),
      pj_proxima_ejecucion: (row as any).pj_proxima_ejecucion
        ? new Date((row as any).pj_proxima_ejecucion)
        : new Date(),
    };
  }

  private presetForInsert(): void {
    this.jobParamsRawText = '';
    this.jobParamsRawError = false;

    this.programacion = {
      ...this.programacion,
      pj_id: 0,
      pj_pi_id: String(this.plantilla?.pi_id ?? ''),
      pj_descripcion: '',
      pj_frecuencia: 'DIARIA',
      pj_dia: 'ALL',
      pj_hora: '',
      pj_prioridad: 1,
      pj_schedule_version: 1,
    };
  }

  get programacionOptions() {
    const opts = this.programaciones.map((p) => ({
      label: this.formatProgOption(p),
      value: p.pj_id,
    }));
    return [
      { label: 'Nueva programación…', value: 'NEW' as NewOption },
      ...opts,
    ];
  }

  formatProgOption(p: any): string {
    const hhmm = p.pj_hora ? p.pj_hora.toString().slice(0, 5) : '--:--';
    let det = '';
    switch (p.pj_frecuencia) {
      case 'DIARIA':
        det = `DIARIA ${hhmm}`;
        break;
      case 'SEMANAL':
        det = `SEMANAL ${p.pj_dia} ${hhmm}`;
        break;
      case 'MENSUAL':
        det = `MENSUAL día ${p.pj_dia_mes} ${hhmm}`;
        break;
      case 'UNICA':
        det = `ÚNICA ${
          (p as any).pj_fecha_unica
            ? new Date((p as any).pj_fecha_unica).toISOString().slice(0, 10)
            : ''
        } ${hhmm}`;
        break;
    }
    return `#${p.pj_id} — ${det} — ${p.pj_tipo}`;
  }

  onChangeSelectedProg(): void {
    if (this.selectedProgId === 'NEW') {
      this.isEdit = false;
      this.presetForInsert();
      return;
    }
    const found = this.programaciones.find(
      (p) => p && Number(p.pj_id) === Number(this.selectedProgId)
    );
    if (found) {
      this.isEdit = true;
      this.programacion = { ...found };
    }
  }

  get showDiaSemana(): boolean {
    return this.programacion.pj_frecuencia === 'SEMANAL';
  }
  get showDiaMes(): boolean {
    return this.programacion.pj_frecuencia === 'MENSUAL';
  }
  get showFechaUnica(): boolean {
    return this.programacion.pj_frecuencia === 'UNICA';
  }

  onFrecuenciaChange(): void {
    if (
      this.programacion.pj_frecuencia === 'SEMANAL' &&
      !this.programacion.pj_dia
    )
      this.programacion.pj_dia = 'ALL';
    if (
      this.programacion.pj_frecuencia === 'MENSUAL' &&
      !this.programacion.pj_dia_mes
    )
      this.programacion.pj_dia_mes = 1;
    if (
      this.programacion.pj_frecuencia === 'UNICA' &&
      !this.programacion.pj_fecha_unica
    )
      this.programacion.pj_fecha_unica = new Date();
  }

  public monthDayValid(): boolean {
    const v = this.programacion.pj_dia_mes;
    return Number.isFinite(v) && v >= 1 && v <= 31;
  }

  get programacionValida(): boolean {
    const horaOk = !!this.programacion.pj_hora;
    const estadoOk = this.isEdit ? !!this.programacion.pj_ind_estado : true;

    const baseOk =
      !!this.programacion.pj_pi_id &&
      !!this.programacion.pj_frecuencia &&
      !!this.programacion.pj_tipo &&
      estadoOk &&
      !!this.programacion.pj_schedule_version &&
      horaOk;

    if (!baseOk) return false;

    switch (this.programacion.pj_frecuencia) {
      case 'DIARIA':
        return true;
      case 'SEMANAL':
        return !!this.programacion.pj_dia;
      case 'MENSUAL':
        return this.monthDayValid();
      case 'UNICA':
        return !!this.programacion.pj_fecha_unica;
      default:
        return false;
    }
  }

  get disableSave(): boolean {
    return this.loading || !this.programacionValida || this.jobParamsRawError;
  }

  private toDateOrNull(v: any): Date | null {
    if (!v) return null;
    const d = new Date(v);
    return isNaN(d.getTime()) ? null : d;
  }

  onCancel(): void {
    this.visibleChange.emit(false);
    this.cancel.emit();
  }

  onSave(): void {
    if (this.disableSave) return;

    const params = this.jobParamsRawText?.trim()
      ? JSON.parse(this.jobParamsRawText)
      : null;
    const mode: 'insert' | 'update' = this.isEdit ? 'update' : 'insert';
    const action = this.isEdit ? 'U' : 'I';
    const dbPayload = this.isEdit
      ? this.buildUpdatePayload()
      : this.buildInsertPayload();

    this.loading = true;
    this.progSrv.programacionJobCrud(dbPayload, action).subscribe({
      next: () => {
        this.msg.add({
          severity: 'success',
          summary: this.isEdit
            ? 'Programación actualizada'
            : 'Programación creada',
          detail: 'Operación exitosa.',
        });
        this.save.emit({ mode, programacion: this.programacion, params });
        this.refreshListForPi();
        this.visibleChange.emit(false);
        this.loading = false;
      },
      error: (err) => {
        this.msg.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo guardar la programación.',
        });
        console.error(err);
        this.loading = false;
      },
    });
  }
  private dateOnly(v: any): string | undefined {
    if (!v) return undefined;
    const d = new Date(v);
    if (isNaN(d.getTime())) return undefined;
    return d.toISOString().slice(0, 10);
  }

  private pruneNullish<T extends Record<string, any>>(obj: T): T {
    Object.keys(obj).forEach((k) => {
      const v = (obj as any)[k];
      if (v === null || v === undefined || v === '') delete (obj as any)[k];
    });
    return obj;
  }

  private buildInsertPayload(): any {
    const f = this.programacion;

    const p: any = {
      pj_pi_id: f.pj_pi_id,
      pj_hora: f.pj_hora,
      pj_tipo: f.pj_tipo,
      pj_usua_id: f.pj_usua_id,
      pj_frecuencia: f.pj_frecuencia,
      pj_descripcion: f.pj_descripcion,
    };

    switch (f.pj_frecuencia) {
      case 'SEMANAL':
        p.pj_dia = f.pj_dia;
        break;
      case 'MENSUAL':
        p.pj_dia_mes = f.pj_dia_mes;
        break;
      case 'UNICA':
        p.pj_fecha_unica = this.dateOnly(f.pj_fecha_unica);
        break;
    }

    const fin = this.dateOnly(f.pj_fecha_fin);
    if (fin) p.pj_fecha_fin = fin;

    return this.pruneNullish(p);
  }
  private buildUpdatePayload(): any {
    const f = this.programacion;

    const p: any = {
      pj_id: f.pj_id,
      pj_pi_id: f.pj_pi_id,
      pj_usua_id: f.pj_usua_id,
      pj_hora: f.pj_hora,
      pj_tipo: f.pj_tipo,
      pj_frecuencia: f.pj_frecuencia,
      pj_descripcion: f.pj_descripcion,
    };

    switch (f.pj_frecuencia) {
      case 'SEMANAL':
        p.pj_dia = f.pj_dia;
        break;
      case 'MENSUAL':
        p.pj_dia_mes = f.pj_dia_mes;
        break;
      case 'UNICA':
        p.pj_fecha_unica = this.dateOnly(f.pj_fecha_unica);
        break;
    }

    const fin = this.dateOnly(f.pj_fecha_fin);
    if (fin) p.pj_fecha_fin = fin;

    return this.pruneNullish(p);
  }

  onHide(): void {
  this.visibleChange.emit(false);
  this.resetAll();
  this.cancel.emit();
}
}
