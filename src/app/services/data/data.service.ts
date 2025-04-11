import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client'; // Importa socket.io-client
import { AuthService } from '../../services/auth/auth.service'; // Importa el servicio de autenticación
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private socket: Socket;
  private serverUrl = 'http://localhost:3000'; // URL para WebSocket
  private apiUrl = 'http://localhost:9222/api/v1/users/all-users'; // URL de la API

  constructor(private http: HttpClient, private authService: AuthService) {
    // Conectar a WebSocket
    this.socket = io(this.serverUrl);
  }

  // Obtener usuarios y sus fechas de creación desde la API con verificación de token y rol Admin
  getDatesAndUsers(): Observable<any[]> {
    const token = this.authService.getToken();
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  
    return this.http.get<{ users: any[] }>(`${this.apiUrl}/`, { headers }).pipe(
      map((response) => {
        return response.users.map(user => ({
          user: user.username,
          createdAt: user.createdAt
        }));
      })
    );
  }
  
  

  // Escuchar la tasa de visitas en tiempo real desde WebSocket
  getVisitRate(): Observable<number> {
    return new Observable<number>((observer) => {
      this.socket.on('tasa-visitas', (data: number) => {
        observer.next(data); // Enviar la tasa de visitas cuando llegue por WebSocket
      });
    });
  }

  // Escuchar fechas y usuarios en tiempo real desde WebSocket
  getRealTimeDatesAndUsers(): Observable<{ date: string; user: string }[]> {
    return new Observable<{ date: string; user: string }[]>((observer) => {
      this.socket.on('fechas-usuarios', (data: { date: string; user: string }[]) => {
        observer.next(data); // Enviar las fechas y usuarios cuando lleguen por WebSocket
      });
    });
  }

  // Contabilizar accesos desde WebSocket
  countAccesses(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.emit('contabilizar-accesos', {}, (response: any) => {
        observer.next(response); // Contabilizar accesos y devolver respuesta
      });
    });
  }

  // Contabilizar visitas desde WebSocket
  countVisits(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.emit('contabilizar-visitas', {}, (response: any) => {
        observer.next(response); // Contabilizar visitas y devolver respuesta
      });
    });
  }

  // Contabilizar llamadas desde WebSocket
  countCalls(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.emit('contabilizar-llamadas', {}, (response: any) => {
        observer.next(response); // Contabilizar llamadas y devolver respuesta
      });
    });
  }

  // Obtener historial por fecha desde WebSocket
  getHistoryByDate(date: string): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      this.socket.emit('obtener-historial', { fecha: date }, (data: any[]) => {
        observer.next(data); // Devolver datos del historial
      });
    });
  }
}
