import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule,RouterModule, CommonModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
email:string='';
username:string='';
name:string='';
lastname:string='';
dateOfBirth:string='';
cellphone:string='';
password:string='';
confirmPassword:string='';

constructor(private router: Router) {}
register() {
  console.log('Intentando registrar con:', this.email, this.password);
  this.router.navigate(['/login']); 
}
goToLogin() {
  this.router.navigate(['/login']); // Redirige a Register
}

}
