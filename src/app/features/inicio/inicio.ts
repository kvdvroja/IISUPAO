import { Component, OnInit, inject } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-inicio',
  imports: [ButtonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
    title:string = "IIS UPAO"
  title1:string = "Infraestrutura de Integración de Servicios"
    router = inject(Router);
  constructor() { }
  
  ngOnInit(): void {
    
  }

  async ingresar() {
    this.router.navigate(['/IISMuro']);
  }
}
