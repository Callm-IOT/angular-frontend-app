import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  username: string;
  // constructor() {
  //   this.username = localStorage.getItem('username') || 'Usuario';
  // }
  constructor(private authService: AuthService) {
    this.username = this.authService.getUsername();
  }
}
