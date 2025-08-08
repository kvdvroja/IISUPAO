import { Component, OnInit, Input, computed, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Sistemas } from '../sistemas/sistemas';
import { Plantillas } from '../plantillas/plantillas';
import { TransformacionCampos } from '../transformacion-campos/transformacion-campos';

type StepItem = {
  id: string;
  title: string;
  description?: string;
  disabled?: boolean;
};

const DEFAULT_STEPS: StepItem[] = [
  {
    id: 'SISTEMAS',
    title: 'SISTEMAS',
    description: 'Gestionar y registrar sistemas',
  },
  {
    id: 'endpoints',
    title: 'ENDPOINTS',
    description: 'Configurar endpoints del sistema',
  },
  {
    id: 'PLANTILLA_INTEGRACION',
    title: 'PLANTILLA INTEGRACION',
    description: 'Definir plantilla de integración',
  },
  {
    id: 'PLANTILLA_DESTINO',
    title: 'PLANTILLA DESTINO',
    description: 'Mapear campos de destino',
  },
  {
    id: 'TRANSFORMACION_CAMPOS',
    title: 'TRANSFORMACIÓN DE CAMPOS',
    description: 'Transformar campos',
  },
  {
    id: 'TRANSFORMACION_VALORES',
    title: 'TRANSFORMACIÓN DE VALORES',
    description: 'Transformar valores',
  },
];

@Component({
  selector: 'app-menu-instructivo',
  standalone: true,
  imports: [
    RouterModule,
    Sidebar,
    Navbar,
    ButtonModule,
    TooltipModule,
    CommonModule,
    Sistemas,
    Plantillas,
    TransformacionCampos
  ],
  templateUrl: './menu-instructivo.html',
  styleUrl: './menu-instructivo.css',
})
export class MenuInstructivo implements OnInit {
  @Input() steps: StepItem[] = DEFAULT_STEPS;
  @Input() showControls = true;
  @Input() size: 'sm' | 'md' = 'md';
  @Input() variant: 'elevated' | 'flat' = 'elevated';
  @Input() progressMode: 'byStep' | 'manual' = 'byStep';
  private manualProgress = signal<number | null>(null);
  private _sidebarOpen = signal(true);
  sidebarOpen = computed(() => this._sidebarOpen());
  toggleSidebar() {
    this._sidebarOpen.set(!this._sidebarOpen());
  }
  private internalStep = signal(0);
  active = computed(() => this.internalStep());
  get padClass() {
    return this.size === 'sm' ? 'px-3 py-1.5' : 'px-4 py-2';
  }
  get textClass() {
    return this.size === 'sm' ? 'text-xs' : 'text-sm';
  }
  get progressPct(): number {
    if (this.progressMode === 'manual' && this.manualProgress() !== null) {
      return this.manualProgress()!;
    }
    const total = this.steps.length;
    if (total <= 1) return 0;
    return Math.round((this.active() / (total - 1)) * 100);
  }

  get progressWidthCalc(): string {
    return `calc(${this.progressPct}% - 0.75rem)`;
  }

  get progressWidthCss(): string {
    return `max(0px, calc(${this.progressPct}% - 0.75rem))`;
  }

  constructor(private router: Router) {}

  setActive(index: number) {
    const step = this.steps[index];
    if (!step || step.disabled) return;
    this.internalStep.set(index);
  }

  next() {
    this.setActive(Math.min(this.active() + 1, this.steps.length - 1));
  }
  prev() {
    this.setActive(Math.max(this.active() - 1, 0));
  }

  buttonStateClass(index: number, disabled: boolean): string {
    if (disabled) return 'border-border bg-muted';
    const isDone = index < this.active();
    const isActive = index === this.active();

    if (isActive) {
      return (
        'border-transparent bg-background/70 shadow-[0_1px_0_0_rgba(0,0,0,0.02)] backdrop-blur supports-[backdrop-filter]:backdrop-blur ' +
        'before:absolute before:-inset-[1.5px] before:-z-10 before:rounded-full ' +
        'before:bg-[linear-gradient(135deg,theme(colors.emerald.500/_30),theme(colors.fuchsia.500/_30))]'
      );
    }
    if (isDone) {
      return (
        'border-transparent bg-[linear-gradient(135deg,theme(colors.emerald.600/_12),theme(colors.emerald.600/_0))] ' +
        'hover:bg-[linear-gradient(135deg,theme(colors.emerald.600/_18),theme(colors.emerald.600/_0))]'
      );
    }
    return 'border-border hover:bg-muted';
  }

  badgeStateClass(index: number, disabled: boolean): string {
    if (disabled) return 'bg-muted text-foreground/60';
    const isDone = index < this.active();
    const isActive = index === this.active();
    if (isDone) return 'bg-emerald-600 text-white';
    if (isActive) return 'bg-foreground text-background';
    return 'bg-muted text-foreground/80';
  }

  iconClass(id: string): string {
    switch (id) {
      case 'SISTEMAS':
        return 'pi pi-server';
      case 'endpoints':
        return 'pi pi-sitemap';
      case 'PLANTILLA_INTEGRACION':
        return 'pi pi-code';
      case 'PLANTILLA_DESTINO':
        return 'pi pi-send';
      case 'TRANSFORMACION_CAMPOS':
        return 'pi pi-microchip';
      case 'TRANSFORMACION_VALORES':
        return 'pi pi-refresh';
      default:
        return 'pi pi-circle';
    }
  }

  private goToStepById(id: string) {
    const idx = this.steps.findIndex((s) => s.id === id);
    if (idx >= 0) this.setActive(idx);
  }

  onStepNavigate(stepId: string) {
    this.goToStepById(stepId);
  }
  onStepProgress(pct: number) {
    this.progressMode = 'manual';
    const clamp = Math.max(0, Math.min(100, Math.round(pct)));
    this.manualProgress.set(clamp);
  }
  ngOnInit(): void {}
}
