import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';

@Component({
  selector: 'app-history-calendar',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './history-calendar.component.html',
  styleUrl: './history-calendar.component.css',
})
export class HistoryCalendarComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],  // Incluye el plugin de interacción
    initialView: 'dayGridMonth',
    headerToolbar: {  // Configura los botones de navegación del calendario
      left: 'prev,next today',  // Botones de navegación (meses)
      center: 'title',  // Muestra el título del mes/año actual
      right: 'dayGridMonth,dayGridWeek,dayGridDay',  // Opciones para cambiar vista entre mes, semana, día
    },
    selectable: true,  // Permite seleccionar fechas
    select: this.handleDateSelect.bind(this),  // Maneja la selección de fechas
    eventClick: this.handleEventClick.bind(this),  // Maneja el clic en eventos
  };

  handleDateSelect(selectInfo: any) {
    alert('Fecha seleccionada: ' + selectInfo.startStr);  // Muestra la fecha seleccionada en un alert
  }

  handleEventClick(clickInfo: any) {
    alert('Evento: ' + clickInfo.event.title);  // Muestra el título del evento cuando se hace clic
  }
}
