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
  //
  username: string = '';
  password: string = '';
  //
  errorMessage: string = '';
  isError:boolean = false;

  constructor(private router: Router, private authService: AuthService) {}
  login() {
    if (this.username && this.password) {

      console.log(this.username, this.password);
      
      this.authService.login(this.username, this.password).subscribe({
        next: (response) => {
          this.authService.setToken(response.token);
          this.authService.setUser(response.user);
          this.router.navigate(['/dashboard']);
          console.log(response.token);
          console.log(response.user._id);
          
          console.log(response.user.role);
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
