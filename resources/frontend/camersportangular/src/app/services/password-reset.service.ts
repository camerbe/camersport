import { Injectable } from '@angular/core';
import { PasswordReset } from '../core/models/password-reset';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService  extends DataService<PasswordReset>{

  constructor(httpClient:HttpClient)
  {
    super(httpClient, environment.baseUrl + `password`);
  }
  forgot(resource:PasswordReset):Observable<any>{
    return this.httpClient.post<any>(environment.baseUrl+`/password/forgot`,resource);
  }
  resetPassword(resource:PasswordReset):Observable<any>{
    return this.httpClient.post<any>(environment.baseUrl+`/password/reset`,resource);
  }
}
