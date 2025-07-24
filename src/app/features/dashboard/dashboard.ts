import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';
@Component({
  selector: 'app-dashboard',
  imports: [RouterModule,Sidebar,Navbar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  sidebarOpen = true;
  ngOnInit(): void {

  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
