import { Component,Input,Output,EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  @Input() isVisible = false; 
  @Output() close = new EventEmitter<void>(); // Evento para cerrar el modal
  isEditable=false;
  closeModal() {
    this.isVisible = false;
    this.close.emit(); // Emitir evento de cierre
    console.log('modal cerrado: '+this.isVisible);
  }

  isEdit(){
    this.isEditable=!this.isEditable;
  }


}
