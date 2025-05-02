import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { MatchSheet } from '../core/models/match-sheet';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Team } from '../core/models/team';

@Injectable({
  providedIn: 'root'
})
export class MatchSheetService extends DataService<MatchSheet> {

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.baseUrl+`/matchs`);
  }
  getTeams(){
    return this.httpClient.get<Team[]>(environment.baseUrl+`/matchs/teams`);
  }
  getLastMtachSheet(){
    return this.httpClient.get<MatchSheet>(environment.baseUrl+`/matchs/last`);
  }
}
