import { Component,Input,Output,EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme/theme.service';

@Component({
  selector: 'app-sidebar',
  imports: [ RouterModule,CommonModule],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  @Input() isVisible: boolean = false;
  @Output() toggleOverlay = new EventEmitter<boolean>();
  constructor(private themeService: ThemeService) {}
  isDarkTheme = false;

  toggleSidebar() {
    this.isVisible = !this.isVisible;
    if (!this.isVisible) {
      this.toggleOverlay.emit(false); 
    }else{
      this.toggleOverlay.emit(true); 
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
