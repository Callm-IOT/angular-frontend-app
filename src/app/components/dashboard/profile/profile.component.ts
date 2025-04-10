import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { User } from '../../../models/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  @Input() isVisible = false;

  user: User = {
   _id: '',
    username: '',
    name: '',
    lastName: '',
    dob: '',
    email: '',
    phone: '',
    role:''
  };

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const storedUser = this.authService.getUserFromStorage();

    if (storedUser) {
      this.user = storedUser;
      this.authService.getUser(storedUser._id).subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (err) => console.error('Error al cargar el usuario desde la API:', err),
      });
    } else {
      console.warn('No se encontró el usuario');
    }
  }

  saveChanges() {
    const userId = this.user._id;
    if (userId) {
      this.authService.updateUser(userId, this.user).subscribe({
        next: (updatedUser) => {
          console.log('Usuario actualizado:', updatedUser);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error('Error actualizando usuario:', err);
        },
      });
    }
  }

  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal
  isEditable = false;
  closeModal() {
    this.isVisible = false;
    this.close.emit(); // Emitir evento de cierre
    console.log('modal cerrado: ' + this.isVisible);
  }

  isEdit() {
    this.isEditable = !this.isEditable;
  }
}
