import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/dashboard/profile/profile.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { HistoryCalendarComponent } from './components/dashboard/main/history-calendar/history-calendar.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'logout', component: LoginComponent },
  { path: 'main', component: MainComponent },
  {path:'history', component: HistoryCalendarComponent},
  { path: '**', redirectTo: 'login' },
];
