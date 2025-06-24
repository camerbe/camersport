import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Rss } from '../core/models/rss';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RssService extends DataService<Rss> {

   constructor(httpClient:HttpClient) {
      super(httpClient,environment.baseUrl+`/rss`);
  }
  getCamerRss(){
    return this.httpClient.get<Rss[]>(environment.baseUrl+`/rss/camer`);
  }
}
