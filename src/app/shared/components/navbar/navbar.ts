import { Component, OnInit, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';

Router

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
menuAbierto: boolean = false;
  showUserMenu = false;

  userId: string | null = null;
  userRoles: string[] = [];
  nombreUsuario: string | null = null;
  constructor(private router: Router) {}

  ngOnInit() {
    // const usuario = this.authService.obtenerUsuario();
    // if (usuario) {
    //   this.userId = usuario.usua_id;
    //   if (typeof usuario.rol === 'string') {
    //     this.userRoles = usuario.rol.split(',').map(r => r.trim());
    //   } else if (Array.isArray(usuario.rol)) {
    //     this.userRoles = usuario.rol;
    //   }
    //   this.nombreUsuario = usuario.nom_completo;
    // }
  }

  toggleUserMenu(event: MouseEvent): void {
    event.stopPropagation();
    this.showUserMenu = !this.showUserMenu;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    // Check if event.target is an HTMLElement and then use closest
    const target = event.target as HTMLElement;
    
    // If the click is outside the user-menu div, close the menu
    if (target && !target.closest('.user-menu')) {
      this.showUserMenu = false;
    }
  }

  irAMisProyectos() {
    if (this.userRoles.includes('AUT') || this.userRoles.includes('AUA')) {
      this.router.navigate(['/alumno/mis-proyectos']);
    } else if (this.userRoles.some(r => ['ASE', 'DIR', 'DEC', 'SEC','ADM'].includes(r))) {
      this.router.navigate(['/asesor/mis-proyectos']);
    }
  
    this.menuAbierto = false;
  }

  reemplazarImagen(event: Event, id_usuario: string) {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'UserSinFoto.svg';
  }

  cerrarSesion(): void {
    // this.authService.cerrarSesion();
    window.location.reload();
  }

  isDarkMode = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    const body = document.querySelector('body')!;
    const appRoot = document.querySelector('app-root')!;

    if (this.isDarkMode) {
      appRoot.classList.add('my-app-dark');
    } else {
      appRoot.classList.remove('my-app-dark');
    }
  }

  SoloAdmin(): boolean {
    return this.userRoles.includes('ADM');
  }
}
