import { DataService } from '../../../../services/data/data.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-table1',
  imports: [CommonModule],
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css']
})
export class Table1Component implements OnInit, OnDestroy {

  public tableData: { date: string, access: boolean }[] = [];
  public filteredData: { date: string, access: boolean | string }[] = [];
  public isLoading = true;
  public errorMessage = '';
  public selectedDate: string = '';
  public noRecordsMessage: string = '';

  private intervalSubscription: Subscription | null = null; // Inicializado en null
  private socket: WebSocket | null = null; // Inicializado en null

  public closedRecords: { date: string, user: string, isOpen: boolean }[] = [];

  constructor(private dataService: DataService, private authService: AuthService) { }

  ngOnInit(): void {
    this.selectedDate = this.getTodayDate();
    this.loadDataForSelectedDate(this.selectedDate);

    // WebSocket directo
    this.initializeWebSocketConnection();

    // Lógica de intervalo
    this.intervalSubscription = interval(50000)
      .pipe(switchMap(() => this.authService.getClosedRecords()))
      .subscribe({
        next: (data) => {
          this.closedRecords = data;
          this.isLoading = false;
          this.checkNoRecords();
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar los registros cerrados';
          this.isLoading = false;
          console.error(error);
        }
      });
  }

  ngOnDestroy(): void {
    // Limpiar la suscripción al intervalo al destruir el componente
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }

    // Cerrar el WebSocket si está abierto
    if (this.socket) {
      this.socket.close();
    }
  }

  getTodayDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  loadDataForSelectedDate(date: string): void {
    this.isLoading = true;
    this.authService.getClosedRecords().subscribe({
      next: (data) => {
        this.closedRecords = data;
        this.tableData = data.map(record => ({
          date: new Date(record.createdAt).toLocaleString(),
          access: record.isOpen
        }));
        this.isLoading = false;
        this.checkNoRecords();
      }
    });
  }

  filterAccessRecords(data: any[]): void {
    this.filteredData = data.map(record => {
      return {
        date: record.date,
        access: record.access === false ? 'No permitido' : 'Permitido'
      };
    });
  }

  onDateChange(newDate: string): void {
    this.selectedDate = newDate;
    this.loadDataForSelectedDate(newDate);
  }

  initializeWebSocketConnection(): void {
    this.socket = new WebSocket('wss://tusocket.com/path'); // Sustituye con tu URL real

    this.socket.onopen = () => {
      console.log('Conexión WebSocket abierta');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data && data.createdAt && data.isOpen !== undefined) {
        const newRecord = {
          date: new Date(data.createdAt).toLocaleString(),
          access: data.isOpen
        };
        this.tableData.unshift(newRecord);
        this.filterAccessRecords(this.tableData);
        console.log('Nuevo registro recibido por WebSocket:', newRecord);
        this.checkNoRecords();
      }
    };

    this.socket.onerror = (error) => {
      console.error('Error en WebSocket:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket cerrado');
    };
  }

  checkNoRecords(): void {
    if (this.tableData.length === 0) {
      this.noRecordsMessage = 'No hay registros disponibles';
    } else {
      this.noRecordsMessage = '';
    }
  }
}
