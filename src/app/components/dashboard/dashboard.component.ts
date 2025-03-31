import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
//import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent /*,SidebarComponent*/, CommonModule, MainComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isSidebarVisible = false;

  handleToggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
