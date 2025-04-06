import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, SidebarComponent, CommonModule, MainComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isSidebarVisible = false;
  isOverlayVisible = false;
  handleOverlayToggle(visible: boolean) {
    this.isOverlayVisible = visible; 
  }

  handleSidebarVisibilityChange(isVisible: boolean) {
    this.isSidebarVisible = isVisible;
  }
}
