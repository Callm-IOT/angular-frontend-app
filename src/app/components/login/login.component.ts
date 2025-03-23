import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
email:string='';
password:string='';

constructor(private router: Router) {}
login() {
  console.log('Intentando iniciar sesión con:', this.email, this.password);
  this.router.navigate(['/dashboard']); 
}
}
