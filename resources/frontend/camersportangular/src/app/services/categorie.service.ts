import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Categorie } from '../core/models/categorie';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategorieService extends DataService<Categorie> {

  constructor(httpClient:HttpClient) {
      super(httpClient,environment.baseUrl+`/categories`);
    }
}
