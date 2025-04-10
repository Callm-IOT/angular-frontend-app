import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule, HttpClientModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  // Variables para el registro
  email: string = '';
  username: string = '';
  name: string = '';
  lastName: string = '';
  dob: string = '';
  phone: string = '';
  password: string = '';
  confirmPassword: string = '';
  //
  errorMessage: string = '';
  isError: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  register() {
    if (
      this.email ||
      this.username ||
      this.name ||
      this.lastName ||
      this.password ||
      this.confirmPassword ||
      this.dob ||
      this.phone
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
            this.lastName,
            this.password,
            this.dob,
            this.phone
          )
          .subscribe({
            next: (response) => {
              this.email = '';
              this.username = '';
              this.name = '';
              this.lastName = '';
              this.dob = '';
              this.phone = '';
              this.password = '';
              this.confirmPassword = '';
              console.log(response);
              
              this.router.navigate(['/login']);
            },
            error: (error) => {
              this.errorMessage = 'Error al registrar usuario';
              // Aquí imprimes más detalles sobre el error
              console.error('Detalles del error:', error.error.errors);
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
