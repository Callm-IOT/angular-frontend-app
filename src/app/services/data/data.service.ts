import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'https://tu-api.com/datos'; // Reemplázalo con tu endpoint real

  constructor(private http: HttpClient) {}

  getData(): Observable<{ country: string, value: number }[]> {
    return this.http.get<{ country: string, value: number }[]>(this.apiUrl);
  }
}
