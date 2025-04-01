import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Graph1Component } from '../graphs/graph1/graph1.component';

@Component({
  selector: 'app-main',
  imports: [Graph1Component],
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
