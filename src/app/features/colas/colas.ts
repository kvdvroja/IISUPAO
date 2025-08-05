import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
import { ColaI } from '../../core/interfaces/Cola';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { ColaS } from '../../core/services/mant/cola/cola';
@Component({
  selector: 'app-colas',
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
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './colas.html',
  styleUrl: './colas.css',
})
export class Colas implements OnInit {
  @ViewChild('dt') dt!: Table;
  colasService = inject(ColaS);
  cdRef = inject(ChangeDetectorRef);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  pantallaPequena = false;
  mostrarDialogoAgregar = false;
  registroExitoso = false;
  editando = false;
  colas: any[] = [];

  nuevaCola: any = {
    cola_nombre: '',
    cola_usua_id: '',
  };

  ngOnInit(): void {
    this.cargarColas();
  }

  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt.filterGlobal(valor, 'contains');
  }

  cargarColas(): void {
  this.colasService.getAllColas().subscribe({
    next: (response) => {
      this.colas = response.result.data;
    },
    error: (err) => {
      console.error('Error cargando colas', err);
    },
  });
}

  get colasFiltradas(): ColaI[] {
    return this.colas;
  }

showEditar(cola: any): void {
  this.editando = true;  
  this.mostrarDialogoAgregar = true;

  // Solo copiar los campos que quieres enviar
  this.nuevaCola = {
    cola_id: cola.cola_id,
    cola_nombre: cola.cola_nombre,
    cola_usua_id: cola.cola_usua_id
  };
}

  // Mostrar el formulario para agregar una nueva cola
  AgregarCola(): void {
    this.mostrarDialogoAgregar = true;
    this.editando = false; // Establecer como modo de agregar
    this.limpiarFormulario();  // Limpiar el formulario para nueva cola
  }

  // Función para limpiar los campos del formulario
  limpiarFormulario(): void {
    this.nuevaCola = {
      cola_id: '',
      cola_nombre: '',
      cola_usua_id: '',
    };
  }


  cerrarDialogoAgregar(): void {
    this.mostrarDialogoAgregar = false;
    this.registroExitoso = false;
  }

  guardarNuevaCola(): void {
    if (!this.nuevaCola.cola_nombre) return;

    const accion = this.editando ? 'U' : 'I';

    // Llamar al servicio para guardar los datos (insertar o actualizar según corresponda)
    this.colasService.colasCrud(this.nuevaCola, accion).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: accion === 'I' ? 'Cola registrada' : 'Cola actualizada',
          detail: 'Operación exitosa',
        });
        this.cargarColas(); // Recargar los datos después de la operación
        this.cerrarDialogoAgregar(); // Cerrar el diálogo
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo guardar la cola',
        });
        console.error(err);
      },
    });
  }

  eliminarCola(cola: ColaI): void {
    this.confirmationService.confirm({
      message: `¿Deseas eliminar la cola con ID: ${cola.cola_id}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // Llamar al servicio con la acción de eliminar
        this.colasService.colasCrud({ cola_id: cola.cola_id } as any, 'D').subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Cola eliminada',
              detail: 'La cola fue eliminada exitosamente.',
            });
            this.cargarColas(); // Recargar los datos después de la eliminación
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'No se pudo eliminar la cola',
            });
            console.error(err);
          },
        });
      },
    });
  }
}
