import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string; // <- antes: iconSvg
  title: string;
  description: string;
  color: string; // Tailwind bg-*
}

interface Stat {
  label: string;
  value: string;
  icon: string; // <- antes: iconSvg
}

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ButtonModule, CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio implements OnInit {
  isVisible = false;
  activeFeature = 0;
  router = inject(Router);
  private intervalId: any;

  // Íconos PrimeNG: https://primefaces.org/primeicons/
  features: Feature[] = [
    {
      icon: 'pi pi-cog',
      title: 'Configuración de Sistemas',
      description:
        'Gestión centralizada de todos los sistemas de integración con monitoreo y control en tiempo real.',
      color: 'bg-primary',
    },
    {
      icon: 'pi pi-key',
      title: 'Gestión de Claves API',
      description:
        'Almacenamiento seguro y rotación de claves API con controles de acceso granulares y registros de auditoría.',
      color: 'bg-secondary',
    },
    {
      icon: 'pi pi-shield',
      title: 'Sistemas de Autenticación',
      description:
        'Definición y administración de los métodos de autenticación o tokens que utilizará cada sistema.',
      color: 'bg-accent',
    },
    {
      icon: 'pi pi-database',
      title: 'Métodos de Integración',
      description:
        'Patrones de integración flexibles con soporte para REST, SOAP, webservices y conexiones en tiempo real.',
      color: 'bg-accent',
    },
  ];

  stats: Stat[] = [
    { label: 'Active Integrations', value: '150+', icon: 'pi pi-globe' },
    { label: 'API Endpoints', value: '2.5K+', icon: 'pi pi-sitemap' },
    { label: 'Security Protocols', value: '99.9%', icon: 'pi pi-lock' },
    { label: 'System Uptime', value: '24/7', icon: 'pi pi-play' },
  ];

  ngOnInit(): void {
    this.isVisible = true;
    this.intervalId = setInterval(() => {
      this.activeFeature = (this.activeFeature + 1) % this.features.length;
    }, 3000);
  }

  ngOnDestroy(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  async ingresar() {
    this.router.navigate(['/Menu']);
  }
}
