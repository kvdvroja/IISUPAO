import { Component, computed, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Sistemas } from '../sistemas/sistemas';

@Component({
  selector: 'app-menu-instructivo',
  standalone: true,
  imports: [RouterModule, CommonModule, Sidebar, Navbar, Sistemas],
  templateUrl: './menu-instructivo.html',
  styleUrl: './menu-instructivo.css',
})
export class MenuInstructivo {
  private _sidebarOpen = signal(true);
  sidebarOpen = computed(() => this._sidebarOpen());
  toggleSidebar() { this._sidebarOpen.set(!this._sidebarOpen()); }
}
