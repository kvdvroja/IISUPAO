import { Component, OnInit } from '@angular/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { Table } from 'primeng/table';
import { InputIcon } from 'primeng/inputicon';
import { IconField } from 'primeng/iconfield';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';
import { Dialog } from 'primeng/dialog';
import { Toast } from 'primeng/toast';
import { ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { UsuarioI } from '../../core/interfaces/Usuario';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    ConfirmDialogModule,
    TableModule,
    ButtonModule,
    RouterModule,
    CommonModule,
    FormsModule,
    InputIcon,
    IconField,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    Dialog,
    Toast
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {
  @ViewChild('dt') dt!: Table;

  pantallaPequena = false;
  mostrarDialogoAgregar = false;
  registroExitoso = false;

  usuarios: UsuarioI[] = []; // Lista completa
  nuevoUsuario: UsuarioI = {
    usuario_id: '',
    usuario_pidm: '',
    usuario_username: '',
    usuario_email: '',
    usuario_apellido_pat: '',
    usuario_apellido_mat: '',
    usuario_fecha_actividad: '',
    usuario_usua_id: '',
    usuarios_ind_estado: ''
  };

  ngOnInit(): void {
    // Aquí podrías cargar los datos reales desde un servicio
    // this.usuarios = this.usuarioService.getUsuarios();
  }

  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(valor, 'contains');
  }

  get usuariosFiltrados(): UsuarioI[] {
    return this.usuarios;
  }

  showEditar(usuario: UsuarioI): void {
    // Lógica para editar usuario
    console.log('Editar usuario:', usuario);
  }

  AgregarUsuario(): void {
    this.mostrarDialogoAgregar = true;
    this.nuevoUsuario = {
      usuario_id: '',
      usuario_pidm: '',
      usuario_username: '',
      usuario_email: '',
      usuario_apellido_pat: '',
      usuario_apellido_mat: '',
      usuario_fecha_actividad: '',
      usuario_usua_id: '',
      usuarios_ind_estado: ''
    };
  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
  }

  guardarNuevoUsuario(): void {
    const nuevo = { ...this.nuevoUsuario };
    nuevo.usuario_id = Date.now().toString();
    nuevo.usuario_fecha_actividad = new Date().toISOString();
    nuevo.usuarios_ind_estado = 'Activo';

    this.usuarios.push(nuevo);
    this.registroExitoso = true;
    this.mostrarDialogoAgregar = false;
  }
}
