import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { LiveMatch } from '../core/models/live-match';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Team } from '../core/models/team';
import { MatchSheet } from '../core/models/match-sheet';

@Injectable({
  providedIn: 'root'
})
export class LiveMatchService extends DataService<LiveMatch> {

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.baseUrl+`/lives`);
  }
  getLiveMatch(matchSheet_id:number){
    return this.httpClient.get<LiveMatch[]>(environment.baseUrl+`/lives/${matchSheet_id}/matchsheets`);
  }
  getTeams(){
    return this.httpClient.get<Team[]>(environment.baseUrl+`/lives/teams`);
  }
  getLastMatchSheet(){
    return this.httpClient.get<MatchSheet>(environment.baseUrl+`/lives/matchsheets/last`);
  }

}
