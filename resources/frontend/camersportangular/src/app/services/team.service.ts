import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Team } from '../core/models/team';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends DataService<Team> {

  constructor(httpClient:HttpClient) {
        super(httpClient,environment.baseUrl+`/teams`);
  }
  
}
