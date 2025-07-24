import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
@Component({
  selector: 'app-tickets',
  imports: [RouterModule,Sidebar,Navbar],
  templateUrl: './tickets.html',
  styleUrl: './tickets.css'
})
export class Tickets implements OnInit {
  sidebarOpen = true;
  ngOnInit(): void {

  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
