import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client'; // Importa socket.io-client
import { AuthService } from '../../services/auth/auth.service'; // Importa el servicio de autenticación

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private socket: Socket;
  private serverUrl = 'http://localhost:3000'; // URL para WebSocket
  private apiUrl = 'http://localhost:9222/api/v1/all-users/'; // URL de la API

  constructor(private http: HttpClient, private authService: AuthService) {
    // Conectar a WebSocket
    this.socket = io(this.serverUrl);
  }

  // Obtener usuarios y sus fechas de creación desde la API con verificación de token y rol Admin
  getDatesAndUsers(): Observable<{ user: string; createdAt: string }[]> {
    const token = this.authService.getToken();
    console.log(token);
    
    
    // Verificar si el token existe y si el usuario es Admin
    if (!token || !this.authService.isAdmin()) {
      return new Observable(observer => {
        observer.error('Acceso denegado: Usuario no autorizado');
      });
    }

    // Si el token y el rol son válidos, incluimos el token en los encabezados
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Hacemos la solicitud GET incluyendo los encabezados con el token
    return this.http.get<any[]>(this.apiUrl, { headers }).pipe(
      map((response) => {
        if (response && Array.isArray(response)) {
          return response.map(user => ({
            user: user.username,   // Filtrar por el campo de nombre de usuario
            createdAt: user.createdAt // Filtrar por la fecha de creación
          }));
        }
        return [];  // Si la respuesta no es un array válido, devolver un array vacío
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
