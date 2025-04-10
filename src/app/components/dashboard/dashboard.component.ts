import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [NavbarComponent, SidebarComponent, CommonModule, MainComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  isSidebarVisible = false;
  isOverlayVisible = false;
  dashboard = true;
  history = false;
  about = false;

  constructor(private authService: AuthService, private router: Router) {}

  handleOverlayToggle(visible: boolean) {
    this.isOverlayVisible = visible;
  }

  handleSidebarVisibilityChange(isVisible: boolean) {
    this.isSidebarVisible = isVisible;
  }

  //routes dashboard
  onRouteChange(route: string) {
    this.dashboard = route === 'dashboard';
    this.history = route === 'history';
    this.about = route === 'about';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
