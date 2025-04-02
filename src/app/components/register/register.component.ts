import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { is } from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  name: string = '';
  lastname: string = '';
  dob: string = '';
  cellphone: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  isError: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    if (
      this.email ||
      this.username ||
      this.name ||
      this.lastname ||
      this.password ||
      this.confirmPassword ||
      this.dob ||
      this.cellphone
    ) {
      if (this.password !== this.confirmPassword) {
        this.isError = true;
        this.errorMessage = 'Las contraseñas no coinciden';
        this.password = '';
        this.confirmPassword = '';
      } else {
        this.authService
          .register(
            this.email,
            this.username,
            this.name,
            this.lastname,
            this.password,
            this.dob,
            this.cellphone
          )
          .subscribe({
            next: (response) => {
              this.authService.setToken(response.token);
              this.router.navigate(['/dashboard']);
            },
            error: (error) => {
              this.errorMessage = 'Error al registrar usuario';
              console.error(error);
            },
          });
      }
    } else {
      this.isError = true;
      this.errorMessage = 'Complete todos los campos';
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
