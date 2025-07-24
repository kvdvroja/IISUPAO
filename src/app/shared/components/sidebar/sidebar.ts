import { Component, OnInit, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {
  @Input() isOpen = true;

  router = inject(Router);
  fotoLink: string = "";
  usuarioId: string = "";
  usuario: any;
  rol: string = "";
  title: string = "";
  nroPermisos: number = 0;

  ngOnInit(): void {

  }
  logout() {
    const valueToKeep = localStorage.getItem('ubigeo');
    localStorage.clear();
    if (valueToKeep !== null) {
      localStorage.setItem('ubigeo', valueToKeep);
    }
    this.router.navigate(["/Home"]);
  }
  cargarImagen(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      try {
        img.src = url;
      }
      catch (error) {
        console.log("No existe imagen " + error)
      }
      img.onload = () => {
        resolve(img); // Resuelve la promesa cuando la imagen se ha cargado con éxito
      };

      img.onerror = () => {
        reject(new Error(`No se pudo cargar la imagen en la URL: ${url}`)); // Rechaza la promesa en caso de error
      };
    });
  }
  selectPermiso() {
    let accionSelect: string = 's';
    localStorage.setItem('accionSelect', accionSelect)
  }

}
