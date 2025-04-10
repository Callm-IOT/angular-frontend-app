import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrlAuth = 'http://localhost:9222/api/v1/auth';
  private apiUrlUser = 'http://localhost:9222/api/v1/users';
  
  constructor(private http: HttpClient) {}

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

  // Cerrar sesión y eliminar los datos del localStorage
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
}
