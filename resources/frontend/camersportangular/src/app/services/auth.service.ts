import {  Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials } from '../core/models/credentials';
import { Observable } from 'rxjs';
import { Jwt } from '../core/models/jwt';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL:string=environment.baseUrl;
  httpClient:HttpClient=inject(HttpClient);
  router:Router=inject(Router);
  /**
   *
   */
  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  changePassword(id:number,password:Partial<string>):Observable<User>{
    return this.httpClient.patch<User>(this.baseURL + `/register/${id}`, JSON.stringify(password));
  }
  login(credentials:Credentials):Observable<Jwt>{
    return this.httpClient.post<Jwt>(this.baseURL+`/auth/login`,credentials);
  }

  logout():void{
    // afterNextRender(()=>{

    // });
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem('expireAt');
      localStorage.removeItem('fullName');
      localStorage.clear();
    }

    this.router.navigate(['login'])
  }
  isExpired():boolean{

    if(isPlatformBrowser(this.platformId)){
      const dateNow=new Date().toLocaleString();
      const expire_At =  localStorage.getItem('expiredAt')|| '';
      // console.log(`now ${dateNow}`)
      // console.log(`Expired at ${expire_At}`)
      // console.log(`isExpired ${dateNow > expire_At}`)
      return dateNow > expire_At
    }
    return true;

  }
}
