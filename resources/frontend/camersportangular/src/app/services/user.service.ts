import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { User } from '../core/models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService<User> {

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.baseUrl+`/users`);
  }
}
