import { Validators } from '@angular/forms';

import { Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ExpiredAtService } from '../../services/expired-at.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { FormBuilder, FormGroup} from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

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
  /**
   *
   */
  constructor(@Inject(PLATFORM_ID) private platformId: object) { }

  /**
   *
   */



  onLougout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.expiredAtService.updateState(this.authService.isExpired())
    this.expiredAtService.state$.subscribe({
      next:(state)=>this.isExpired=state
    });

    if (this.isExpired) this.authService.logout()
    if(isPlatformBrowser(this.platformId)){
      this.fullName = localStorage.getItem('fullname') || '';
     }

  }
}
