import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { SocketService } from '../../../services/socket/socket.service';
import { Graph1Component } from '../graphs/graph1/graph1.component';
import { Table1Component } from '../tables/table1/table1.component';
import { HistoryCalendarComponent } from '../history-calendar/history-calendar.component';
import { CommonModule } from '@angular/common';
import { interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    Graph1Component,
    Table1Component,
    CommonModule,
    HistoryCalendarComponent,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent implements OnInit {
  // routes
  @Input() dashboard: boolean = false;
  @Input() history: boolean = false;
  @Input() about: boolean = false;

  access: string = '--';
  visits: string = '--';
  notifications: string = '--';

  constructor(
    private authService: AuthService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    // Sockets que sí usas
    this.socketService.listen('acceso1').subscribe((data) => {
      this.access = data.valor ?? '0';
    });

    interval(10) // cada 10 segundos
    .pipe(switchMap(() => this.authService.getRecordStatus()))
    .subscribe(
      (statusList) => {
        const countOpen = Array.isArray(statusList)
          ? statusList.filter(s => s === true).length
          : 0;
        this.access = countOpen.toString();
      },
      (error) => {
        console.error('Error al obtener estado de records', error);
        this.access = '0';
      }
    );
  

    // Refrescar notificaciones cada 10 segundos
    interval(10)
      .pipe(switchMap(() => this.authService.getUnreadNotifications()))
      .subscribe(
        (notifications) => {
          const unreadCount = Array.isArray(notifications) ? notifications.length : 0;
          this.notifications = unreadCount.toString();
        },
        (error) => {
          console.error('Error al obtener notificaciones', error);
          this.notifications = '0';
        }
      );

    // Carga inicial de notificaciones
    this.cargarNotificaciones();
    this.cargarEstadoRecords();

  }

  cargarNotificaciones(): void {
    this.authService.getUnreadNotifications().subscribe(
      (notifications) => {
        const unreadCount = Array.isArray(notifications) ? notifications.length : 0;
        this.notifications = unreadCount.toString();
      },
      (error) => {
        console.error('Error al obtener las notificaciones', error);
        this.notifications = '0';
      }
    );
  }

  cargarEstadoRecords(): void {
    this.authService.getRecordStatus().subscribe(
      (statusList) => {
        const countOpen = Array.isArray(statusList)
          ? statusList.filter(s => s === true).length
          : 0;
        this.access = countOpen.toString();
      },
      (error) => {
        console.error('Error al obtener estado de records', error);
        this.access = '0';
      }
    );
  }
  
}
