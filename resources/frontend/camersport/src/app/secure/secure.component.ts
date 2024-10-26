import {Component, OnInit} from '@angular/core';
import {TokenExpirationService} from "../share/services/token-expiration.service";
import {ProfileObservableService} from "../share/services/profile-observable.service";
import {Router} from "@angular/router";

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

}
