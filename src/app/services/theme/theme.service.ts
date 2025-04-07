// src/app/theme.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root', 
})
export class ThemeService {
  
  private themeSubject = new BehaviorSubject<boolean>(false); 
  theme$ = this.themeSubject.asObservable();

  constructor() {}


  toggleTheme() {
    const currentTheme = this.themeSubject.value;
    this.themeSubject.next(!currentTheme); 
  }


  setTheme(isDark: boolean) {
    this.themeSubject.next(isDark);
  }
}
