import { Injectable } from '@angular/core';
import {DataService} from "../data.service";
import {Administrateur} from "../../models/redacteur";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RedacteurService extends DataService<Administrateur>{

  constructor(httpClient:HttpClient) {
    super(httpClient,environment.url+`users`)
  }
}
