import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isError:boolean = false;

  constructor(private router: Router, private authService: AuthService) {}
  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.isError = true;
          console.error('Error en login:', error);
          this.errorMessage = 'Credenciales incorrectas';
        },
      });
    } else {
      this.isError = true;
      this.errorMessage = 'Por favor ingresa tus datos';
    }
  }
}
