import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Categories} from "../../models/categorie";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategorieService extends DataService<Categories>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`categories`)
  }
}
