import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private username: string = '';
  //API URL for login
  private apiUrl = 'http://localhost:9222/api/v1/auth/singin';
  constructor(private http: HttpClient) {}

  setUsername(username: string) {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  //login method to authenticate the user
  login(username: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string,refreshToken:string,user:object }>('http://localhost:9222/api/v1/auth/singin', { username, password });
  }
  //register method to register the user
  register(email: string, password: string,name:string,lastname:string,cellphone:string,username:string,dob:string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>('http://localhost:9222/api/v1/users/create', { email, password,name,lastname,cellphone,username,dob });
  }
  //get a user
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`http://tu-api.com/users/${id}`);
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
