
import { Component, inject, OnInit } from '@angular/core';
import { ExpiredAtService } from '../../services/expired-at.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  fullName!:string;
  isExpired!:boolean;
  expiredAtService: ExpiredAtService=inject(ExpiredAtService);
  authService: AuthService=inject(AuthService);


  ngOnInit(): void {
    this.expiredAtService.updateState(this.authService.isExpired())
    this.expiredAtService.state$.subscribe({
      next:(state)=>this.isExpired=state
    });
    console.log(this.isExpired)
    if (this.isExpired) this.authService.logout()
    this.fullName = localStorage.getItem('fullname') || '';
  }
}
