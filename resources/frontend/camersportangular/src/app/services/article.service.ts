import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Article } from '../core/models/article';
import { Categorie } from '../core/models/categorie';
import { Competition } from '../core/models/competition';
import { Pays } from '../core/models/pays';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends DataService<Article> {

  constructor(httpClient:HttpClient) {
      super(httpClient,environment.baseUrl+`/articles`);
    }
    getCategories(){
      return this.httpClient.get<Categorie[]>(environment.baseUrl+`/articles/categories`);
    }
    getCompetitions(){
      return this.httpClient.get<Competition[]>(environment.baseUrl+`/articles/competitions`);
    }
    getCountries(){
      return this.httpClient.get<Pays[]>(environment.baseUrl+`/articles/pays`);
    }
    getArticlesByUserId(id:number){
      return this.httpClient.get<Article[]>(environment.baseUrl+`/articles/user/${id}`);
    }
    getArticlesBySlug(slug:string){
     this.getUrlBySlug(slug).subscribe({});
      return this.httpClient.get<Article>(environment.baseUrl+`/articles/slug/${slug}`);
    }
    publicIndex(){
      //this.getUrlByCompetition().subscribe({});
      return this.httpClient.get<Article[]>(environment.baseUrl+`/articles/public`);
    }
    categorieMustReaded(categorieId:number){
      return this.httpClient.get<Article[]>(environment.baseUrl+`/articles/categorie/${categorieId}/mustreaded`);
    }
    competitionMustReaded(competitionId:number){
      return this.httpClient.get<Article[]>(environment.baseUrl+`/articles/competition/${competitionId}/mustreaded`);
    }

    private getUrlBySlug(slug: string): Observable<Article[]> {
      const baseUrl = environment.baseUrl.replaceAll('/api', '');
      return this.httpClient.get<Article[]>(`${baseUrl}/${slug}`);
    }
    private getUrlByCompetition(): Observable<Article[]> {
      const baseUrl = environment.baseUrl.replaceAll('/api', '');
      return this.httpClient.get<Article[]>(`${baseUrl}/articles/public`);
    }

}
