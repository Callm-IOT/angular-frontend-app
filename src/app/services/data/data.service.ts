import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client'; // Importa socket.io-client

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private socket: Socket;
  private serverUrl = 'http://localhost:3000'; // URL del servidor WebSocket

  constructor() {
    // Conectar a WebSocket
    this.socket = io(this.serverUrl);
  }

  // Escuchar la tasa de visitas en tiempo real
  getVisitRate(): Observable<number> {
    return new Observable<number>((observer) => {
      this.socket.on('tasa-visitas', (data: number) => {
        observer.next(data); // Enviar la tasa de visitas cuando llegue por WebSocket
      });
    });
  }

  // Escuchar fechas y usuarios en tiempo real
  getDatesAndUsers(): Observable<{ date: string; user: string }[]> {
    return new Observable<{ date: string; user: string }[]>((observer) => {
      this.socket.on('fechas-usuarios', (data: { date: string; user: string }[]) => {
        observer.next(data); // Enviar las fechas y usuarios cuando lleguen por WebSocket
      });
    });
  }

  // Contabilizar accesos
  countAccesses(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.emit('contabilizar-accesos', {}, (response: any) => {
        observer.next(response); // Contabilizar accesos y devolver respuesta
      });
    });
  }

  // Contabilizar visitas
  countVisits(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.emit('contabilizar-visitas', {}, (response: any) => {
        observer.next(response); // Contabilizar visitas y devolver respuesta
      });
    });
  }

  // Contabilizar llamadas
  countCalls(): Observable<any> {
    return new Observable<any>((observer) => {
      this.socket.emit('contabilizar-llamadas', {}, (response: any) => {
        observer.next(response); // Contabilizar llamadas y devolver respuesta
      });
    });
  }

  // Obtener historial por fecha (esto puede ser un evento con datos)
  getHistoryByDate(date: string): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      this.socket.emit('obtener-historial', { fecha: date }, (data: any[]) => {
        observer.next(data); // Devolver datos del historial
      });
    });
  }
}
