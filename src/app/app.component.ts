import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrincipalPageComponent } from './component/principal-page/principal-page.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,PrincipalPageComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
}
