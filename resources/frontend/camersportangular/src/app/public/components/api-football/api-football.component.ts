import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-api-football',
  templateUrl: './api-football.component.html',
  styleUrl: './api-football.component.css'
})
export class ApiFootballComponent implements AfterViewInit{

  @ViewChild('fixtureWidget') fixtureWidget!: ElementRef;

  ngAfterViewInit(): void {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // "YYYY-MM-DD"
    this.fixtureWidget.nativeElement.setAttribute('data-date', formattedDate);
  }

}
