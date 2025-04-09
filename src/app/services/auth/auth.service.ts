import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username: string = '';
  private apiUrlAuth = 'http://localhost:9222/api/v1/auth';
  private apiUrlUser = 'http://localhost:9222/api/v1/users';
  
  constructor(private http: HttpClient) {}

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  // Método para login
  login(username: string, password: string): Observable<{ token: string, refreshToken: string, user: User }> {
    return this.http.post<{ token: string, refreshToken: string, user: User }>(`${this.apiUrlAuth}/signin`, { username, password });
  }

  // Método para registrar un usuario
  register(email: string, password: string, name: string, lastname: string, cellphone: string, username: string, dob: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:9222/api/v1/users/create', { email, password, name, lastname, cellphone, username, dob });
  }

  // Obtener un usuario por su ID
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrlUser}/${id}`);
  }

  // Actualizar la información del usuario
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrlUser}/${id}`, user);
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

  // Obtener solo el ID del usuario
  getUserId(): string | null {
    const user = this.getUserFromStorage();
    return user ? user._id : null;
  }

  // Cerrar sesión y eliminar los datos del localStorage
  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
}
