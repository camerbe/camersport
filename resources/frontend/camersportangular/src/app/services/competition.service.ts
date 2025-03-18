import { Injectable } from '@angular/core';
import { Competition } from '../core/models/competition';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService extends DataService<Competition> {

   constructor(httpClient:HttpClient) {
        super(httpClient,environment.baseUrl+`/competitions`);
      }
}
