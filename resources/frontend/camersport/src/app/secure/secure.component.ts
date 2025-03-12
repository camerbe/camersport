import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {TokenExpirationService} from "../share/services/token-expiration.service";
import {ProfileObservableService} from "../share/services/profile-observable.service";
import {Router} from "@angular/router";
import {AuthService} from "../public/auth.service";
import {isPlatformBrowser} from "@angular/common";

@Component({
  selector: 'app-secure',
  templateUrl: './secure.component.html',
  styleUrl: './secure.component.css'
})
export class SecureComponent  implements OnInit{

  currentProfile!:string;
  constructor(
    private tokenExpirationService: TokenExpirationService,
    private profileObservableService:ProfileObservableService,
    private authService:AuthService,
    @Inject(PLATFORM_ID) private platformId:Object,
    private router:Router
  ) {
  }

  ngOnInit(): void {
    this.tokenExpirationService.startExpirationCheck()
    this.profileObservableService.subjectProfile.subscribe({
      next:(res)=>{
        this.currentProfile=res.nom+" "+res.prenom
        if(res.role=='Admin'){
          this.router.navigate(['dashboard/user/list'])
        }

      }
    })

  }

  onLogout() {
    const token =`Bearer `+localStorage.getItem('token');
    this.authService.logout(token).subscribe({
      next:(res)=>{
        if(res.success){
          this.router.navigate(['login']);
          if(isPlatformBrowser(this.platformId)){
            localStorage.removeItem('token');
            localStorage.removeItem('expires_at');
          }

        }
      }
    })
  }
}
