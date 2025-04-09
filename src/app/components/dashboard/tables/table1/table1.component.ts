import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data/data.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table1',
  imports: [CommonModule],
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css']
})
export class Table1Component implements OnInit {

  public tableData: { date: string, user: string }[] = []; // Aquí almacenamos los usuarios y fechas
  public isLoading = true;
  public errorMessage = '';
  public selectedDate: string = ''; // Variable para almacenar la fecha seleccionada

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    // Puedes inicializar con la fecha de hoy
    this.selectedDate = this.getTodayDate();
    this.loadDataForSelectedDate(this.selectedDate);
  }

  // Función para obtener la fecha de hoy en formato YYYY-MM-DD
  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Función para cargar los datos de usuario y fecha para la fecha seleccionada
  loadDataForSelectedDate(date: string): void {
    this.isLoading = true;
    this.dataService.getHistoryByDate(date).subscribe({
      next: (data) => {
        this.tableData = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los datos';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  // Este método se puede invocar cuando la fecha cambia (por ejemplo, desde un calendario)
  onDateChange(newDate: string): void {
    this.selectedDate = newDate;
    this.loadDataForSelectedDate(newDate);
  }
}
