import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username: string = '';
  //API URL for login
  private apiUrl = 'https://tu-api.com/auth/login';
  constructor(private http: HttpClient) {}

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  //login method to authenticate the user
  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(this.apiUrl, { email, password });
  }
  //register method to register the user
  register(email: string, password: string,name:string,lastname:string,cellphone:string,username:string,dob:string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('https://tu-api.com/auth/register', { email, password,name,lastname,cellphone,username,dob });
  }
  //get a user
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`https://tu-api.com/users/${id}`);
  }

  //update a user
  updateUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }
  
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
