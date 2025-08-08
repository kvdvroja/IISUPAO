import { Component, OnInit, Input, computed, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Sistemas } from '../sistemas/sistemas';

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
    description: 'Manage and register systems',
  },
  {
    id: 'endpoints',
    title: 'ENDPOINTS',
    description: 'Configure system endpoints',
  },
  {
    id: 'PLANTILLA_INTEGRACION',
    title: 'PLANTILLA INTEGRACION',
    description: 'Define integration template',
  },
  {
    id: 'PLANTILLA_DESTINO',
    title: 'PLANTILLA DESTINO',
    description: 'Map destination fields',
  },
  {
    id: 'TRANSFORMACION_CAMPOS',
    title: 'TRANSFORMACIÓN DE CAMPOS',
    description: 'Transform fields',
  },
  {
    id: 'TRANSFORMACION_VALORES',
    title: 'TRANSFORMACIÓN DE VALORES',
    description: 'Transform values',
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
    // calc(% - 0.75rem) para respetar paddings como en el diseño de referencia
    return `calc(${this.progressPct}% - 0.75rem)`;
  }

    get progressWidthCss(): string {
    // evita ancho negativo al estar en 0%
    return `max(0px, calc(${this.progressPct}% - 0.75rem))`;
  }

  constructor(private router: Router) {}

  setActive(index: number) {
    const step = this.steps[index];
    if (!step || step.disabled) return;
    this.internalStep.set(index);
    // Si cambias de paso, puedes limpiar el manual si quieres:
    // this.manualProgress.set(null);
  }

  next() {
    this.setActive(Math.min(this.active() + 1, this.steps.length - 1));
  }
  prev() {
    this.setActive(Math.max(this.active() - 1, 0));
  }

  /** Estado visual del botón (contenedor) según step */
  buttonStateClass(index: number, disabled: boolean): string {
    if (disabled) return 'border-border bg-muted';
    const isDone = index < this.active();
    const isActive = index === this.active();

    if (isActive) {
      // Active: glass + gradient ring (simulado con before vía Tailwind utilities simplificadas)
      return (
        'border-transparent bg-background/70 shadow-[0_1px_0_0_rgba(0,0,0,0.02)] backdrop-blur supports-[backdrop-filter]:backdrop-blur ' +
        'before:absolute before:-inset-[1.5px] before:-z-10 before:rounded-full ' +
        'before:bg-[linear-gradient(135deg,theme(colors.emerald.500/_30),theme(colors.fuchsia.500/_30))]'
      );
    }
    if (isDone) {
      // Done: verde muy sutil + hover
      return (
        'border-transparent bg-[linear-gradient(135deg,theme(colors.emerald.600/_12),theme(colors.emerald.600/_0))] ' +
        'hover:bg-[linear-gradient(135deg,theme(colors.emerald.600/_18),theme(colors.emerald.600/_0))]'
      );
    }
    // Default
    return 'border-border hover:bg-muted';
  }

  /** Estado visual del badge (círculo) según step */
  badgeStateClass(index: number, disabled: boolean): string {
    if (disabled) return 'bg-muted text-foreground/60';
    const isDone = index < this.active();
    const isActive = index === this.active();
    if (isDone) return 'bg-emerald-600 text-white';
    if (isActive) return 'bg-foreground text-background';
    return 'bg-muted text-foreground/80';
  }

  /** Ícono genérico según id (PrimeIcons) */
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
    // activa progreso manual (o déjalo en 'byStep' y solo usa navigate)
    this.progressMode = 'manual';
    const clamp = Math.max(0, Math.min(100, Math.round(pct)));
    this.manualProgress.set(clamp);
  }

  // Opcional: navegar por rutas
  // private mapStepToRoute(id: string): string {
  //   switch (id) {
  //     case 'SISTEMAS': return '/sistemas';
  //     case 'endpoints': return '/endpoints';
  //     case 'PLANTILLA_INTEGRACION': return '/plantilla-integracion';
  //     case 'PLANTILLA_DESTINO': return '/plantilla-destino';
  //     case 'TRANSFORMACION_CAMPOS': return '/transformacion-campos';
  //     case 'TRANSFORMACION_VALORES': return '/transformacion-valores';
  //     default: return '/';
  //   }
  // }

  ngOnInit(): void {}
}
