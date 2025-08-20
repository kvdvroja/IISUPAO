import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Message } from 'primeng/message';
import { TabsModule } from 'primeng/tabs';

import { AutenticacionS } from '../../../core/services/mant/autenticacion/autenticacion';

export interface AutenticacionI {
  auth_id: number;
  auth_nombre: string;
  tipo_auth: string;
  auth_body_template: string;
  auth_headers_template: string;
  auth_params_template: string;
  auth_token_path: string;
  auth_tiempo_expira: number;
  auth_ind_estado: string;
  auth_fecha_actividad: Date;
  auth_usua_id: string;
  credenciales: string;
}

type FieldKey = keyof Pick<
  AutenticacionI,
  | 'auth_nombre'
  | 'tipo_auth'
  | 'auth_body_template'
  | 'auth_headers_template'
  | 'auth_params_template'
  | 'auth_token_path'
  | 'credenciales'
>;

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    Dialog,
    InputTextModule,
    Textarea,
    SelectModule,
    ButtonModule,
    Message,
    TabsModule,
  ],
  templateUrl: './autenticacion.html',
  styleUrl: './autenticacion.css',
})
export class Autenticacion implements OnChanges {
  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Input() endpoint: any | null = null;
  @Input() data: Partial<AutenticacionI> | null = null;

  private authSrv = inject(AutenticacionS);
  private msg = inject(MessageService);

  placeholderBody =
    '{"grant_type":"client_credentials","client_id":"{{client_id}}"}';
  placeholderHeaders =
    '{"Content-Type":"application/json","Authorization":"Bearer {{token}}"}';

  loading = false;

  // UI State
  activeTab: 'basic' | 'templates' | 'token' | 'credentials' = 'basic';
  private tabToIndex: Record<typeof this.activeTab, number> = {
    basic: 0,
    templates: 1,
    token: 2,
    credentials: 3,
  };
  private indexToTab: Record<number, typeof this.activeTab> = {
    0: 'basic',
    1: 'templates',
    2: 'token',
    3: 'credentials',
  };
  get activeIndex() {
    return this.tabToIndex[this.activeTab];
  }
  onTabIndexChange(i: number) {
    this.activeTab = this.indexToTab[i] ?? 'basic';
  }

  tipoAuthOptions = [
    { label: 'Bearer', value: 'BEARER' },
    { label: 'Basic', value: 'BASIC' },
    { label: 'API Key', value: 'API_KEY' },
    { label: 'OAuth2', value: 'OAUTH2' },
  ];
  estadosOptions = [
    { label: 'Activo', value: 'A' },
    { label: 'Inactivo', value: 'I' },
  ];

  form: Partial<AutenticacionI> = this.blankForm();

  // Errores por campo (para estilos tipo shadcn)
  errors: Record<string, string> = {};

  ngOnChanges(ch: SimpleChanges): void {
    // Reinicia el form al abrir si no hay data
    if (ch['visible'] && this.visible && !this.data) {
      this.form = this.blankForm();
      this.errors = {};
      this.activeTab = 'basic';
    }
    if (ch['data']) {
      this.form = this.data ? this.fillForm(this.data) : this.blankForm();
      this.errors = {};
      this.activeTab = 'basic';
    }
  }

  private blankForm(): Partial<AutenticacionI> {
    return {
      auth_nombre: '',
      tipo_auth: '',
      auth_body_template: '{}',
      auth_headers_template: '{}',
      auth_params_template: '{}',
      auth_token_path: '',
      auth_tiempo_expira: 3600,
      auth_ind_estado: 'A',
      credenciales: '{}',
    };
  }

  private fillForm(d: Partial<AutenticacionI>): Partial<AutenticacionI> {
    return {
      auth_id: d.auth_id,
      auth_nombre: d.auth_nombre ?? '',
      tipo_auth: d.tipo_auth ?? '',
      auth_body_template: d.auth_body_template ?? '{}',
      auth_headers_template: d.auth_headers_template ?? '{}',
      auth_params_template: d.auth_params_template ?? '{}',
      auth_token_path: d.auth_token_path ?? '',
      auth_tiempo_expira: d.auth_tiempo_expira ?? 3600,
      auth_ind_estado: d.auth_ind_estado ?? 'A',
      credenciales: d.credenciales ?? '{}',
    };
  }

  get isEdit(): boolean {
    return !!this.form.auth_id;
  }
  get disableSave(): boolean {
    return this.loading;
  }

  // Helpers de errores
  hasError(field: FieldKey | string): boolean {
    return !!this.errors[field];
  }
  clearError(field: FieldKey | string) {
    if (this.errors[field]) delete this.errors[field];
  }

  // Validaciones
  private validateRequired(): void {
    if (!this.form.auth_nombre?.trim())
      this.errors['auth_nombre'] = 'El nombre es requerido';
    if (!this.form.tipo_auth?.trim())
      this.errors['tipo_auth'] = 'El tipo de autenticación es requerido';
    if (!this.form.auth_token_path?.trim()) {
      this.errors['auth_token_path'] = 'El token path es requerido';
      if (this.activeTab !== 'token') this.activeTab = 'token';
    }
  }

  validateJSON(
    field: Extract<
      FieldKey,
      | 'auth_body_template'
      | 'auth_headers_template'
      | 'auth_params_template'
      | 'credenciales'
    >
  ): boolean {
    const raw = (this.form as any)[field];
    if (!raw || typeof raw !== 'string') {
      this.clearError(field);
      return true;
    }
    try {
      JSON.parse(raw);
      this.clearError(field);
      return true;
    } catch {
      this.errors[field] = 'JSON inválido';
      // si hay error en templates/credenciales, muestro la pestaña correspondiente
      if (field === 'credenciales') this.activeTab = 'credentials';
      else this.activeTab = 'templates';
      return false;
    }
  }

  private validateAll(): boolean {
    this.errors = {};
    this.validateRequired();

    const ok1 = this.validateJSON('auth_body_template');
    const ok2 = this.validateJSON('auth_headers_template');
    const ok3 = this.validateJSON('auth_params_template');
    const ok4 = this.validateJSON('credenciales');

    return Object.keys(this.errors).length === 0 && ok1 && ok2 && ok3 && ok4;
  }

  onCancel(): void {
    this.visibleChange.emit(false);
  }

  onSave(): void {
    if (!this.validateAll()) {
      this.msg.add({
        severity: 'warn',
        summary: 'Revisa el formulario',
        detail: 'Corrige los campos marcados.',
      });
    }
  }
}
