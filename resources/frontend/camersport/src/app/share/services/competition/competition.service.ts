import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Competitions} from "../../models/competition";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CompetitionService extends DataService<Competitions>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`competitions`)
  }
}
