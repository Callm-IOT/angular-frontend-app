import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import{AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router,private authService:AuthService) {}
  login() {
    if (this.email && this.password) {
      console.log('Login successful');
      localStorage.setItem('username', this.email);
      this.authService.setUsername(this.email); 
      this.router.navigate(['/dashboard']);
    }
  }
}
