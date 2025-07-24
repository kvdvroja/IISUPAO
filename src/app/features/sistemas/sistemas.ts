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
import { ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { SistemasI } from '../../core/interfaces/Sistemas';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-sistemas',
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
    InputGroupAddonModule
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './sistemas.html',
  styleUrl: './sistemas.css',
})
export class Sistemas implements OnInit {
  @ViewChild('dt1') dt1!: Table;
  pantallaPequena = false;
  mostrarSoloPendientes: boolean = false;
  sistemas!: SistemasI[];
  ngOnInit(): void {}
  filtrarGlobal(event: Event) {
    const valor = (event.target as HTMLInputElement).value;
    this.dt1.filterGlobal(valor, 'contains');
  }

  get sistemasFiltradas(): SistemasI[] {
    if (!this.mostrarSoloPendientes) {
      return this.sistemas;
    }

    return this.sistemas;
  }

  showEditar(sistema: any): void {}
}
