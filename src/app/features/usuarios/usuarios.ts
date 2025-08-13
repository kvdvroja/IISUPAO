import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
import { Usuario } from '../../core/services/mant/usuario/usuario';
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
    Toast,
    SelectModule,
  ],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.css',
})
export class Usuarios implements OnInit {

  usuarioService = inject(Usuario);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmService = inject(ConfirmationService);
  confirmationService = inject(ConfirmationService);

  @ViewChild('dt') dt!: Table;

  pantallaPequena = false;
  mostrarDialogoAgregar = false;
  registroExitoso = false;

  usuarios: UsuarioI[] = []; // Lista completa
  editando: boolean = false;
  nuevoUsuario: any = {
    usuario_id: '',
    usuario_username: '',
    usuario_email: '',
    usuario_apellido_pat: '',
    usuario_apellido_mat: '',
  };

  ngOnInit(): void {
  this.cargarUsuario();
  }

  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(valor, 'contains');
  }
 
 cargarUsuario():void{
 this.usuarioService.getAllUsuarios().subscribe(
{ next:(res) =>{
 this.usuarios = res.result.data;
 this.cdRef.detectChanges();
},
 error:(err) =>console.error('Erros al cargar usuarios',err),
});
}

  AgregarUsuario(): void {
    this.mostrarDialogoAgregar = true;
    this.editando = false;
    this.limpiarFormulario();
  }

  showEditar(usuario: UsuarioI): void {
    this.editando = true;
    this.mostrarDialogoAgregar = true;
    this.nuevoUsuario = { ...usuario }  }

  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
    this.limpiarFormulario();
  }


  limpiarFormulario(): void {
    this.nuevoUsuario = {
      usuario_id: '',
      usuario_username: '',
      usuario_email: '',
      usuario_apellido_pat: '',
      usuario_apellido_mat: ''

    };
  }

  get usuariosFiltrados(): any[] {
    return this.usuarios;
  }


guardarNuevoUsuario(): void {
  if(  !this.nuevoUsuario. usuario_id ||
        !this.nuevoUsuario. usuario_username ||
        !this.nuevoUsuario. usuario_email ||
        !this.nuevoUsuario. usuario_apellido_pat ||
        !this.nuevoUsuario. usuario_apellido_mat 
){
return;
}    if (!this.editando) {// Generación del ID
      this.nuevoUsuario.usuario_ind_estado = 'A'; 
      this.nuevoUsuario.usuario_usua_id = 'ADMIN'; 
    }

   // Si se está editando, pasamos la acción 'U' (Update), si no, 'I' (Insert)
    const action = this.editando ? 'U' : 'I';

 this.usuarioService.usuarioCrud(this.nuevoUsuario, action).subscribe({
      next: (response) => {
        console.log(
          action === 'I' ? 'Nuevo usuario agregado' : 'Usuario actualizado',
          response
        );
        this.messageService.add({
          severity: 'success',
          summary: this.editando ? 'Sistema actualizado' : 'Sistema registrado',
          detail: 'Operación exitosa',
        });
        this.registroExitoso = true;
        this.cargarUsuario();
        this.cerrarDialogoAgregar();
      },
      error: (err) => { 
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo guardar el sistema',
        });
        console.error(
          action === 'I'
            ? 'Error al agregar el usuario'
            : 'Error al actualizar el usuario',
          err
        );
      },
    });
}
  eliminarUsuario(usuario: any): void {
    this.confirmationService.confirm({
      message: '¿Estás seguro de eliminar este usuario?',
      header: 'Confirmar eliminación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usuarioService.usuarioCrud(usuario, 'D').subscribe({
          next: (response) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Usuario eliminado',
              detail: 'El usuario fue eliminado exitosamente.',
            });
            this.cargarUsuario();
          },
          error: (err) => {
            console.error('Error al eliminar el usuario', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Hubo un error al eliminar el usuario.',
            });
          },
        });
      },
      reject: () => {
        console.log('Eliminación cancelada');
      },
    });
  }
}
