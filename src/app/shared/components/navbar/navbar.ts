import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { ButtonModule } from 'primeng/button';
Router

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, ButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

  @Input() isSidebarOpen: boolean = true;
  @Output() sidebarToggle = new EventEmitter<void>();
  router = inject(Router);
  nroPermisos: number = 0;
  menuAbierto: boolean = false;
  showUserMenu = false;


  constructor() {
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    this.sidebarToggle.emit(); // Se comunica con el padre
  }


  ngOnInit() {

  }

    reemplazarImagen(event: Event, id_usuario: string) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'UserSinFoto.svg';
  }

  cerrarSesion(): void {
    // this.authService.cerrarSesion();
  }

    toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showUserMenu = !this.showUserMenu;
  }

}
