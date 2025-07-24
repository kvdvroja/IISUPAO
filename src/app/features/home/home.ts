import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Navbar } from '../../shared/components/navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [Sidebar,RouterModule,Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  sidebarOpen = true;
  ngOnInit(): void {

  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
