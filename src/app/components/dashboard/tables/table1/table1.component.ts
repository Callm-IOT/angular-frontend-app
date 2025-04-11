import { DataService } from '../../../../services/data/data.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-table1',
  imports: [CommonModule],
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css']
})
export class Table1Component implements OnInit {

  public tableData: { date: string, access: boolean }[] = []; // Aquí almacenamos las fechas y acceso
  public filteredData: { date: string, access: boolean | string }[] = []; // Para almacenar los datos filtrados
  public isLoading = true;
  public errorMessage = '';
  public selectedDate: string = ''; // Variable para almacenar la fecha seleccionada

  constructor(private dataService: DataService, private authService: AuthService) { }

  public closedRecords: { date: string, user: string, isOpen: boolean }[] = []; // Para almacenar registros cerrados

  ngOnInit(): void {
    // Inicializar con la fecha de hoy
    this.selectedDate = this.getTodayDate();
    this.loadDataForSelectedDate(this.selectedDate);

    interval(10)
      .pipe(
        switchMap(() => this.authService.getClosedRecords()) // Obtener los registros cerrados
      )
      .subscribe({
        next: (data) => {
          this.closedRecords = data; // Actualizar los registros en la tabla
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar los registros cerrados';
          this.isLoading = false;
          console.error(error);
        }
      });
  }

  // Función para obtener la fecha de hoy en formato YYYY-MM-DD
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Función para cargar los datos de fecha y acceso para la fecha seleccionada
  loadDataForSelectedDate(date: string): void {
    this.isLoading = true;
    this.authService.getClosedRecords().subscribe({
      next: (data) => {
        this.closedRecords = data;
        this.tableData = data.map(record => ({
          date: new Date(record.createdAt).toLocaleString(), // o solo .toISOString().split('T')[0] si prefieres solo la fecha
          access: record.isOpen
        }));
        this.isLoading = false;
      }
    });
  }

  // Función para filtrar los registros y reemplazar acceso false con "No permitido"
  filterAccessRecords(data: any[]): void {
    this.filteredData = data.map(record => {
      return {
        date: record.date,
        access: record.access === false ? 'No permitido' : 'Permitido'
      };
    });
  }

  // Este método se puede invocar cuando la fecha cambia (por ejemplo, desde un calendario)
  onDateChange(newDate: string): void {
    this.selectedDate = newDate;
    this.loadDataForSelectedDate(newDate);
  }
}
