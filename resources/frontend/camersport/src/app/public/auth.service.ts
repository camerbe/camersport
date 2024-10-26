import { Injectable } from '@angular/core';
import {environment} from "../share/environments/environment";
import {HttpClient} from "@angular/common/http";
import {Login} from "../share/models/login.model";

interface Credentials{
  email:string,
  password:string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl=environment.url;
  constructor(
    private httpClient:HttpClient
  ) { }

  login(credentials:Credentials){
    return this.httpClient.post<Login>(this.baseUrl+`auth/login`,credentials);
  }
  changePassword(credentials:Credentials){
    return this.httpClient.post<any>(this.baseUrl+`auth/changepassword`,credentials);
  }
}
