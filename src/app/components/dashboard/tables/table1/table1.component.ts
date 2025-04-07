
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data/data.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table1',
  imports: [CommonModule],
  templateUrl: './table1.component.html',
  styleUrl: './table1.component.css'
})
export class Table1Component implements OnInit{

  public tableData: { country: string, value: number }[] = [];
  public isLoading = true;
  public errorMessage = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getData().subscribe({
      next: (data) => {
        this.tableData = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los datos';
        this.isLoading = false;
        console.error(error);
      }
    });
  }
}
