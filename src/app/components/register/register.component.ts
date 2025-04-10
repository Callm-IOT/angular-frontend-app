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

  constructor(private router: Router, private authService: AuthService) { }

  register() {
    if (
      this.email &&
      this.username &&
      this.name &&
      this.lastName &&
      this.password &&
      this.confirmPassword &&
      this.dob &&
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
            this.password, // Primero el password
            this.name,
            this.lastName,
            this.phone,
            this.username,
            this.dob
          )
          .subscribe({
            next: (response) => {
              // Limpiar los campos después del registro
              this.email = '';
              this.username = '';
              this.name = '';
              this.lastName = '';
              this.dob = '';
              this.phone = '';
              this.password = '';
              this.confirmPassword = '';
              console.log(response);

              // Redirigir al login
              this.router.navigate(['/login']);
            },
            error: (error) => {
              this.isError = true;
              if (error.error && error.error.errors) {
                this.errorMessage = error.error.errors.join(', '); // Mostrar todos los errores de forma concatenada
              } else {
                this.errorMessage = 'Error desconocido al registrar usuario';
              }
              console.error('Detalles del error:', error.error.errors);
            }
            ,
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
