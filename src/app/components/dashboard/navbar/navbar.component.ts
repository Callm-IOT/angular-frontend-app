import { Component,EventEmitter, Output, Input } from '@angular/core';
import { RouterModule, Router} from '@angular/router';
import { ProfileComponent } from '../profile/profile.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterModule,ProfileComponent,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Input() isSidebarOpen = false;

  isModalVisible = false;


  openModal() {
    this.isModalVisible = true;
    console.log('modal abierto: '+this.isModalVisible);
  }
  closeModal() {
    this.isModalVisible = false; // Cerrar modal
    console.log('modal cerrado1: '+this.isModalVisible);
  }

  onToggle() {
    this.toggleSidebar.emit();
    localStorage.removeItem('username');
  }
}
