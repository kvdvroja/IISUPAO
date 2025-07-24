import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
Router

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,ButtonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {

@Input() isSidebarOpen: boolean = true;
@Output() sidebarToggle = new EventEmitter<void>();
  router = inject(Router);
  fotoLink: string = "";
  postulanteId: string = "";
  usuario: any;
  rol: string = "";
  title: string = "Egresados | UPAO";
  nroPermisos: number = 0;


  constructor() {
  }

toggleSidebar() {
  this.isSidebarOpen = !this.isSidebarOpen;
  this.sidebarToggle.emit(); // Se comunica con el padre
}


  ngOnInit() {
    if (localStorage.getItem('postulanteId')) {
      var postEncripted = localStorage.getItem('postulanteId');

    }
    const imgUrl = 'https://static.upao.edu.pe/upload/f/' + '000033505' + '.jpg'; //f1
    this.cargarImagen(imgUrl)
      .then((imagen) => {
        this.fotoLink = imgUrl;
      })
      .catch((error) => {
        // Se produjo un error al cargar la imagen
        this.fotoLink = 'https://static.upao.edu.pe/upload/f/sf.jpg'; //f1
      });
    /*
}else{
  this.authService.logout();
}*/

    /*var permisos = JSON.parse(localStorage.getItem("permisos"));
    this.nroPermisos =  permisos.length;
    
    this.dataService.getData().subscribe((data) =>{
      if(data){
        this.permisoActivo = data;
      }
      else{
        this.authService.logout();
      }
    })
    if(localStorage.getItem('rol')){
      this.rol = localStorage.getItem('rol');
    }*/
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

  verCuenta() {
    this.router.navigate(["IISMuro/VerCuenta"]);

  }
  cambiarPassword() {
    this.router.navigate(["Postulante/CambiarPasswordPost"]);
  }
}
