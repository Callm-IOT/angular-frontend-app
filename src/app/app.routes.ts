import { Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import{ProfileComponent} from './components/dashboard/profile/profile.component';

export const routes: Routes = [
    { path: 'login', component:LoginComponent },
    {path:'register',component:RegisterComponent},
    {path:'dashboard',component:DashboardComponent},
    {path:'profile',component:ProfileComponent},
    {path:'logout',component:DashboardComponent},
    { path: '**', redirectTo: 'login' },
];
