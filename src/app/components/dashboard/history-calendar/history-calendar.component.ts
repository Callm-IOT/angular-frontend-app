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
  styleUrl: './history-calendar.component.css',
})
export class HistoryCalendarComponent implements OnInit {
  dataSource: any[] = []; // Define un array para almacenar los datos de la API
  visitRate: number = 0;
  selectedDate: string = '';
  currentMonthImage: string = '';

  constructor(private dataService: DataService) {} // Inyecta el servicio de datos

  ngOnInit() {
    const today = this.getTodayDate();

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
      this.dataSource = data;
    });
  }

  //click en una fecha del calendario
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

    // Extraemos el mes del formato 'YYYY-MM-DDTHH:MM:SSZ'
    const monthIndexStr = dateStr.split('T')[0].split('-')[1]; // 'MM' de 'YYYY-MM-DD'

    // Asegurarnos de que monthIndexStr sea un número entre 01 y 12
    const monthIndex = parseInt(monthIndexStr, 10); // Restamos 1 para ajustarlo al índice del array

    console.log(
      'selected on calendar: ' +
        monthNames[monthIndex] +
        '\nselected on array: ' +
        monthIndex
    );

    // Asignar la imagen del mes, asegurándose de que la ruta esté correcta
    this.currentMonthImage = `../../../assets/months/${monthNames[monthIndex]}.png`; // Ruta estática de prueba
    console.log('currentMonthImage:', this.currentMonthImage);
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
  };
}
