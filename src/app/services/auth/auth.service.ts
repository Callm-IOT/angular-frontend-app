import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlAuth = 'http://localhost:9222/api/v1/auth';
  private apiUrlUser = 'http://localhost:9222/api/v1/users';
  private apiUrlNotification = 'http://localhost:9222/api/v1/notifications';
  
  constructor(private http: HttpClient) {}
  //metodo para registro
  register(
    email: string,
    password: string,
    name: string,
    lastName: string,
    phone: string,
    username: string,
    dob: string,
    role: string = 'Admin'
  ): Observable<any> {
    if (!email || !password || !name || !lastName || !phone || !username || !dob) {
      console.error('Faltan datos para el registro');
      return new Observable();
    }
    return this.http.post<{ token: string, refreshToken: string, user: User }>(
      `${this.apiUrlUser}/create`,
      { email, password, name, lastName, phone, username, dob , role }
    );
  }

  // Método para login
  login(username: string, password: string): Observable<{ token: string, refreshToken: string, user: User }> {
    if (!username || !password) {
      console.error('Faltan credenciales');
    }
    return this.http.post<{ token: string, refreshToken: string, user: User }>(
      `${this.apiUrlAuth}/signin`,
      { username, password }
    );
  }

  // Guardar el token en el localStorage
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Obtener el token desde el localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Guardar el usuario completo en el localStorage
  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtener el usuario completo desde el localStorage
  getUserFromStorage(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Obtener un usuario desde la API por su ID
getUserById(userId: string): Observable<User> {
  return this.http.get<User>(`${this.apiUrlUser}/${userId}`);
}

// Actualizar un usuario en la base de datos
updateUser(userId: string, updatedUser: User): Observable<User> {
  return this.http.put<User>(`${this.apiUrlUser}/${userId}`, updatedUser);
}


  // Obtener el rol del usuario (Admin o otro)
  getRole(): string | null {
    const user = this.getUserFromStorage();
    return user ? user.role : null;
  }

  // Verificar si el usuario es Admin
  isAdmin(): boolean {
    const role = this.getRole();
    return role === 'Admin';
  }

  // obtener las notificaciones del usuario
  getUnreadNotifications(): Observable<any[]> {
    const token = this.getToken();
  
    if (!token) {
      console.error('Token no encontrado');
      return new Observable((observer) => {
        observer.next([]);
        observer.complete();
      });
    }
  
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  
    return this.http.get<any[]>(`${this.apiUrlNotification}/`, { headers });
  }
  
  

  // Cerrar sesión y eliminar los datos del localStorage
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
}
