import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions } from '@fullcalendar/core';
import { DataService } from '../../../services/data/data.service';

@Component({
  selector: 'app-history-calendar',
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './history-calendar.component.html',
  styleUrls: ['./history-calendar.component.css'],
})
export class HistoryCalendarComponent implements OnInit {
  dataSource: any[] = []; // Array para almacenar los datos de la API
  visitRate: number = 0; // Tasa de visitas
  selectedDate: string = ''; // Fecha seleccionada
  currentMonthImage: string = ''; // Imagen del mes actual

  constructor(private dataService: DataService) {}

  ngOnInit() {
    const today = this.getTodayDate();

    // Obtener los usuarios y sus fechas de creación
    this.dataService.getDatesAndUsers().subscribe({
      next: (data) => {
        this.dataSource = data;  // Asignar los usuarios obtenidos a dataSource
        this.updateCalendarEvents(); // Actualizar los eventos del calendario
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    });

    // Obtener tasa de visitas en tiempo real
    this.dataService.getVisitRate().subscribe((rate) => {
      this.visitRate = rate;
    });

    // Obtener datos de hoy por defecto
    this.updateDataForDate(today);
    this.updateMonthImage(today);
  }

  // Calcular la fecha actual
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Actualizar tasa de visitas y usuarios según la fecha seleccionada
  updateDataForDate(date: string): void {
    this.selectedDate = date;

    // Obtener la tasa de visitas para la fecha seleccionada
    this.dataService.getVisitRate().subscribe((rate) => {
      this.visitRate = rate;
    });

    // Obtener usuarios y fechas para el día seleccionado
    this.dataService.getHistoryByDate(date).subscribe((data) => {
      this.dataSource = data; // Actualiza la fuente de datos para la tabla
    });
  }

  // Manejar clic en una fecha del calendario
  handleEventClick(clickInfo: any) {
    const fecha = clickInfo.event.startStr; // Obtener la fecha seleccionada (YYYY-MM-DD)
    this.updateDataForDate(fecha); // Actualizar tasa de visitas y tabla de datos
  }

  // Cambiar imagen según el mes
  updateMonthImage(dateStr: string): void {
    const monthNames = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ];

    const monthIndexStr = dateStr.split('T')[0].split('-')[1]; // 'MM' de 'YYYY-MM-DD'
    const monthIndex = parseInt(monthIndexStr, 10); // Restamos 1 para ajustarlo al índice del array

    this.currentMonthImage = `../../../assets/months/${monthNames[monthIndex]}.png`; // Ruta estática de prueba
  }

  // Actualizar los eventos en el calendario
  updateCalendarEvents(): void {
    const events = this.dataSource.map((user) => ({
      title: `${user.user}`, // Nombre de usuario
      start: user.createdAt,  // Fecha de creación
      allDay: true,           // Todo el día
      description: `Usuario: ${user.user}`, // Descripción
    }));

    // Actualizar el calendario con los eventos
    this.calendarOptions.events = events;
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    selectable: true,

    eventClick: this.handleEventClick.bind(this),
    datesSet: (arg) => {
      this.updateMonthImage(arg.startStr);
    },
    events: [], // Inicialmente vacío, se actualizará con los eventos
  };
}
