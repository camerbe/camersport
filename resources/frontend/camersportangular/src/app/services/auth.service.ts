import { Login } from './../../../../camersport/src/app/share/models/login.model';
import { provideClientHydration } from '@angular/platform-browser';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials } from '../core/models/credentials';
import { Observable } from 'rxjs';
import { Jwt } from '../core/models/jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseURL:string=environment.baseUrl;
  httpClient:HttpClient=inject(HttpClient);
  router:Router=inject(Router);

  login(credentials:Credentials):Observable<Jwt>{
    return this.httpClient.post<Jwt>(this.baseURL+`/auth/login`,credentials);
  }
  logout():void{
    localStorage.removeItem('expireAt');
    localStorage.removeItem('fullName');
    localStorage.clear();
    this.router.navigate(['login'])
  }
}
