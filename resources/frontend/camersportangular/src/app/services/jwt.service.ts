import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  DecodeToken(token:string){
    return jwtDecode(token);
  }
}
