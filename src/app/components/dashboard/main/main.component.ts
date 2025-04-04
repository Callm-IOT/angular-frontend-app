import { Component,OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { SocketService } from '../../../services/socket/socket.service';
import { Graph1Component } from '../graphs/graph1/graph1.component';
import { Table1Component } from '../tables/table1/table1.component';

@Component({
  selector: 'app-main',
  imports: [Graph1Component,Table1Component],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
})
export class MainComponent {
  username: string;
  access:number=0;
  visits:number=1;
  access2:number=0;

  constructor(private authService: AuthService, private socketService: SocketService) {
    this.username = this.authService.getUsername();
  }

  ngOnInit(): void {
    this.socketService.listen('acceso1').subscribe(data => {
      this.access = data.valor ?? 0;
    });

    this.socketService.listen('acceso2').subscribe(data => {
      this.visits = data.valor ?? 0;
    });

    this.socketService.listen('acceso3').subscribe(data => {
      this.access2 = data.valor ?? 0;
    });
  }

}
