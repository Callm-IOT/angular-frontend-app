import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    // ⚠️ Asegúrate de reemplazar la URL con la de tu servidor Socket.IO
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'], // opcional: usar solo websocket
    });
  }

  // Escuchar eventos
  listen(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }

  // Emitir eventos
  emit(eventName: string, data: any): void {
    this.socket.emit(eventName, data);
  }

  // Desconectar el socket (opcional)
  disconnect(): void {
    this.socket.disconnect();
  }

  // Reconectar (opcional)
  reconnect(): void {
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }
}
