import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Pays } from '../core/models/pays';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PaysService extends DataService<Pays> {

  constructor(httpClient:HttpClient) {
      super(httpClient,environment.baseUrl+`/countries`);
    }
}
