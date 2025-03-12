import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Articles} from "../../models/article";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, Observable} from "rxjs";
import { Categories} from "../../models/categorie";
import { Competitions} from "../../models/competition";

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends DataService<Articles>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`articles`)
  }
  getCategories():Observable<Categories>{
    return this.httpClient.get<Categories>(environment.url+`articles/categories`)
  }
  getCompetitions():Observable<Competitions>{
    return this.httpClient.get<Competitions>(environment.url+`articles/competitions`)
  }
  getImage(resource:string){
    return this.httpClient.get(environment.url+`${resource}`)
      .subscribe();
  }
}
