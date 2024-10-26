import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {isPlatformBrowser} from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class TokenExpirationService {

  private checkInterval!:Subscription;

  constructor(
    private router:Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  startExpirationCheck(checkIntervalMs:number=60000){
    this.stopExpirationCheck();
    this.checkInterval=interval(checkIntervalMs).subscribe(()=>{
      this.checkTokenExpiration()
    });
  }

  stopExpirationCheck() {
    if (this.checkInterval) {
      this.checkInterval.unsubscribe();
      //this.checkInterval = null;
    }
  }

  private checkTokenExpiration() {
    let expiresAt;
    if(isPlatformBrowser(this.platformId)){
      expiresAt = localStorage.getItem('expires_at');
    }


    if(expiresAt){
      const expirationTime = new Date(expiresAt).getTime();
      const currentTime = new Date().getTime();
      if (currentTime >= expirationTime) {
        this.handleExpiredToken();
      }
    }
    else {
      this.handleExpiredToken();
    }
  }

  private handleExpiredToken() {
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem('token');
      localStorage.removeItem('expires_at');
    }

    this.router.navigate(['/login']);
  }
}
