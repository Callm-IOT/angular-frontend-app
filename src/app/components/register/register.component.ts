import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, RouterModule, CommonModule],
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

  constructor(private router: Router) {}

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
        console.log('Passwords do not match');
      } else {
        this.router.navigate(['/login']);
      }
    }else{
      console.log('Please fill in all fields');
    }
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
