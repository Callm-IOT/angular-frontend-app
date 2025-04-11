import { Component, Input } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { SocketService } from '../../../services/socket/socket.service';
import { Graph1Component } from '../graphs/graph1/graph1.component';
import { Table1Component } from '../tables/table1/table1.component';
import { HistoryCalendarComponent } from '../history-calendar/history-calendar.component';
import { CommonModule } from '@angular/common';
CommonModule;

@Component({
  selector: 'app-main',
  imports: [
    Graph1Component,
    Table1Component,
    CommonModule,
    HistoryCalendarComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  //routes
  @Input() dashboard: boolean = false;
  @Input() history: boolean = false;
  @Input() about: boolean = false;
  //
  access: string = '--';
  visits: string = '--';
  notifications: string = '--';

  constructor(
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  //sockets
  ngOnInit(): void {
    this.socketService.listen('acceso1').subscribe((data) => {
      this.access = data.valor ?? 0;
    });

    this.socketService.listen('acceso2').subscribe((data) => {
      this.visits = data.valor ?? 0;
    });

    this.socketService.listen('acceso3').subscribe(() => {
      this.authService.getUnreadNotifications().subscribe(
        (count) => {
          this.notifications = count.toString(); // Actualiza el contador de notificaciones
        },
        (error) => {
          console.error('Error al obtener las notificaciones', error);
        }
      );
    });
  }
}
