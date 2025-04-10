import { RouterModule} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'CallM-Official Page';
  activeRoute: string = '';
  showBubbles = true;



  constructor(private router: Router) {}

  ngOnInit():void {
    // Escuchar cambios de la ruta
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.urlAfterRedirects; 
      }
      if (event instanceof NavigationEnd) {
        this.showBubbles = !event.url.includes('dashboard'); 
      }
      
    });
  }

}
